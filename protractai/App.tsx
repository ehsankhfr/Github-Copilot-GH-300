import React, { useState } from 'react';
import ExamResults from './components/ExamResults';
import ExamTaker from './components/ExamTaker';
import FileSelection from './components/FileSelection';
import RepoInput from './components/RepoInput';
import { generateExamFromContent, gradeShortAnswer } from './services/geminiService';
import { fetchFileContent, findMarkdownFiles } from './services/githubService';
import { AppState, Exam, QuestionType, RepoFile, UserAnswer } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.InputRepo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Data State
  const [repoFiles, setRepoFiles] = useState<RepoFile[]>([]);
  const [exam, setExam] = useState<Exam | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  // Step 1: Handle Repo URL Submission
  const handleRepoSubmit = async (owner: string, repo: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch files recursively (limit to markdown)
      const files = await findMarkdownFiles(owner, repo);
      if (files.length === 0) {
        setError("No markdown files found in this repository.");
        setIsLoading(false);
        return;
      }
      setRepoFiles(files);
      setAppState(AppState.SelectingFiles);
    } catch (e: any) {
      setError(e.message || "Failed to fetch repository.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle File Selection & Generation
  const handleGenerateExam = async (selectedFiles: RepoFile[]) => {
    setAppState(AppState.GeneratingExam); // Visual loading state within FileSelection or separate
    setIsLoading(true);
    try {
      // 1. Fetch content for selected files
      const contentPromises = selectedFiles.map(async (file) => ({
        name: file.name,
        content: await fetchFileContent(file.download_url)
      }));
      
      const contents = await Promise.all(contentPromises);

      // 2. Generate Exam via Gemini
      const generatedExam = await generateExamFromContent(contents);
      setExam(generatedExam);
      setAppState(AppState.TakingExam);
    } catch (e: any) {
      setError(e.message || "Failed to generate exam.");
      setAppState(AppState.SelectingFiles); // Go back
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Handle Exam Completion
  const handleExamSubmit = async (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setAppState(AppState.ReviewingResults);

    // Asynchronously grade short answers
    if (exam) {
        const gradedAnswers = [...answers];
        
        // Find short answers that need grading
        const gradePromises = gradedAnswers.map(async (ans, index) => {
            const question = exam.questions.find(q => q.id === ans.questionId);
            if (question && question.type === QuestionType.ShortAnswer) {
                const gradingResult = await gradeShortAnswer(question.question, question.correctAnswer, ans.answer);
                gradedAnswers[index] = { ...ans, ...gradingResult };
            } else if (question) {
                // Auto-grade MC/TF strictly for internal logic consistency
                gradedAnswers[index] = { ...ans, isCorrect: ans.answer === question.correctAnswer };
            }
            return gradedAnswers[index];
        });

        // Wait for all grading to complete then update state
        // We could do this progressively, but for simplicity we wait
        const finalGradedAnswers = await Promise.all(gradePromises);
        setUserAnswers(finalGradedAnswers);
    }
  };

  const handleRestart = () => {
    setAppState(AppState.InputRepo);
    setExam(null);
    setUserAnswers([]);
    setRepoFiles([]);
    setError(null);
  };

  const handleBackToRepo = () => {
    setAppState(AppState.InputRepo);
    setRepoFiles([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {appState === AppState.InputRepo && (
          <RepoInput 
            onRepoSubmit={handleRepoSubmit} 
            isLoading={isLoading} 
            error={error} 
          />
        )}

        {(appState === AppState.SelectingFiles || appState === AppState.GeneratingExam) && (
          <FileSelection 
            files={repoFiles} 
            onGenerate={handleGenerateExam} 
            onBack={handleBackToRepo}
            isGenerating={appState === AppState.GeneratingExam}
          />
        )}

        {appState === AppState.TakingExam && exam && (
          <ExamTaker 
            exam={exam} 
            onSubmit={handleExamSubmit} 
          />
        )}

        {appState === AppState.ReviewingResults && exam && (
          <ExamResults 
            exam={exam} 
            userAnswers={userAnswers} 
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};

export default App;
