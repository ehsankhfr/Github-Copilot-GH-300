import { GoogleGenAI, Type } from "@google/genai";
import { Exam, QuestionType } from "../types";

// Initialize Gemini Client
// Note: We use process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Schema for Exam Generation
const examSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A creative title for the exam based on the content" },
    description: { type: Type.STRING, description: "A brief summary of what this exam covers" },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          type: { type: Type.STRING, enum: [QuestionType.MultipleChoice, QuestionType.ShortAnswer, QuestionType.TrueFalse] },
          question: { type: Type.STRING },
          options: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Provide 4 options for multiple choice. Leave empty for short answer."
          },
          correctAnswer: { type: Type.STRING, description: "The correct option for MC/TF, or a grading key/rubric for Short Answer." },
          explanation: { type: Type.STRING, description: "Explanation of why the answer is correct." }
        },
        required: ["id", "type", "question", "correctAnswer"]
      }
    }
  },
  required: ["title", "questions"]
};

// Schema for Grading Short Answers
const gradingSchema = {
  type: Type.OBJECT,
  properties: {
    isCorrect: { type: Type.BOOLEAN },
    score: { type: Type.INTEGER, description: "Score from 0 to 100 indicating accuracy" },
    feedback: { type: Type.STRING, description: "Constructive feedback explaining what was missed or done well." }
  },
  required: ["score", "feedback", "isCorrect"]
};

export const generateExamFromContent = async (contents: {name: string, content: string}[]): Promise<Exam> => {
  const model = "gemini-2.5-flash";
  
  // Combine contents into a single prompt context, truncating if absolutely massive, 
  // but Gemini 1.5/2.5 Flash has a large window so we are usually safe with typical repos.
  let combinedContext = "Study Material:\n\n";
  contents.forEach(file => {
    combinedContext += `--- FILE: ${file.name} ---\n${file.content}\n\n`;
  });

  const prompt = `
    You are an expert professor and exam proctor. 
    Analyze the following markdown notes from a repository.
    Create a comprehensive exam to test a student's understanding of the core concepts, syntax, and logic presented in these files.
    
    Mix the question types:
    The exam is comprised of approximately 60 scored multiple-choice questions, plus an additional 10-15 pretest items that do not count towards the final score, but vary by exam.

    Assessed on this exam:
    - Domain 1: Responsible AI 7%
    - Domain 2: GitHub Copilot plans and features 31%
    - Domain 3: How GitHub Copilot works and handles data 15%
    - Domain 4: Prompt crafting and Prompt engineering 9%
    - Domain 5: Developer use cases for AI 14%
    - Domain 6: Testing with GitHub Copilot 9%
    - Domain 7: Privacy fundamentals and context exclusions 15%
    
    Ensure the questions are challenging but fair based ONLY on the provided text.
    Generate at least 10 questions.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: prompt }, { text: combinedContext }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: examSchema,
        temperature: 0.3, // Lower temperature for more factual questions
      }
    });

    if (!response.text) {
        throw new Error("No response from AI");
    }

    const examData = JSON.parse(response.text) as Exam;
    return examData;
  } catch (error) {
    console.error("Exam generation failed:", error);
    throw new Error("Failed to generate exam. The repository might be too large or empty.");
  }
};

export const gradeShortAnswer = async (question: string, rubric: string, userAnswer: string): Promise<{ score: number; feedback: string }> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    You are a grading assistant.
    Question: "${question}"
    Correct Answer / Rubric: "${rubric}"
    Student Answer: "${userAnswer}"
    
    Grade the student's answer. Be strict but fair.
    Provide a score (0-100) and feedback.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: gradingSchema
      }
    });

    if (!response.text) {
        return { score: 0, feedback: "Error grading answer." };
    }

    const result = JSON.parse(response.text);
    return { score: result.score, feedback: result.feedback };
  } catch (error) {
    console.error("Grading failed:", error);
    return { score: 0, feedback: "Could not reach grading server." };
  }
};
