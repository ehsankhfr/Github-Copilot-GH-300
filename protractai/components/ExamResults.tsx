import { AlertCircle, Award, CheckCircle, ChevronDown, ChevronUp, RefreshCcw, XCircle } from 'lucide-react';
import React from 'react';
import { Exam, QuestionType, UserAnswer } from '../types';

interface ExamResultsProps {
  exam: Exam;
  userAnswers: UserAnswer[];
  onRestart: () => void;
}

const ExamResults: React.FC<ExamResultsProps> = ({ exam, userAnswers, onRestart }) => {
  // Calculate raw score for auto-gradable questions
  const totalQuestions = exam.questions.length;
  let correctCount = 0;
  let pendingCount = 0;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const calculateGrade = () => {
    let scoreSum = 0;
    
    exam.questions.forEach(q => {
      const uAnswer = userAnswers.find(a => a.questionId === q.id);
      if (!uAnswer) return;

      if (q.type === QuestionType.ShortAnswer) {
        // Use the AI score if available, otherwise assume 0 until graded (or display pending)
        if (uAnswer.score !== undefined) {
          scoreSum += uAnswer.score;
        } else {
            pendingCount++;
        }
      } else if (q.type === QuestionType.MultipleSelect) {
        // Multi-select: compare arrays
        const userAnswerArray = Array.isArray(uAnswer.answer) ? uAnswer.answer : [];
        const correctAnswerArray = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
        
        // Check if arrays match (order-independent)
        const userSet = new Set(userAnswerArray.map(a => a.toString()));
        const correctSet = new Set(correctAnswerArray.map(a => a.toString()));
        
        if (userSet.size === correctSet.size && [...userSet].every(a => correctSet.has(a))) {
          scoreSum += 100;
          correctCount++;
        }
      } else {
        // Single answer check for MC/TF
        if (uAnswer.answer === q.correctAnswer) {
          scoreSum += 100; // Normalized to 100
          correctCount++;
        }
      }
    });

    if (pendingCount === totalQuestions) return 0; // Avoid division by zero if all pending
    return Math.round(scoreSum / totalQuestions);
  };

  const finalScore = calculateGrade();
  
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  const toggleExpand = (id: number) => {
      setExpandedId(expandedId === id ? null : id);
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
          <Award className={`w-16 h-16 ${getScoreColor(finalScore)}`} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Exam Results</h1>
        <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
          {pendingCount > 0 ? "Pending..." : `${finalScore}%`}
        </div>
        <p className="text-slate-400">
            {pendingCount > 0 
                ? "AI is currently grading your short answers..." 
                : finalScore >= 80 ? "Excellent work! You've mastered this material." 
                : finalScore >= 60 ? "Good job, but there's room for improvement." 
                : "Keep studying! Review the material and try again."}
        </p>
      </div>

      <div className="space-y-6">
        {exam.questions.map((q, index) => {
          const userAnswer = userAnswers.find(a => a.questionId === q.id);
          
          // Calculate if answer is correct
          let isCorrect = false;
          if (q.type === QuestionType.ShortAnswer) {
            isCorrect = userAnswer?.isCorrect || false;
          } else if (q.type === QuestionType.MultipleSelect) {
            const userAnswerArray = Array.isArray(userAnswer?.answer) ? userAnswer.answer : [];
            const correctAnswerArray = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
            const userSet = new Set(userAnswerArray.map(a => a.toString()));
            const correctSet = new Set(correctAnswerArray.map(a => a.toString()));
            isCorrect = userSet.size === correctSet.size && [...userSet].every(a => correctSet.has(a));
          } else {
            isCorrect = userAnswer?.answer === q.correctAnswer;
          }
          
          const isPending = q.type === QuestionType.ShortAnswer && userAnswer?.score === undefined;
          
          return (
            <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-slate-800/30 transition-colors flex gap-4"
                onClick={() => toggleExpand(q.id)}
              >
                <div className="flex-shrink-0 mt-1">
                  {isPending ? (
                    <div className="w-6 h-6 rounded-full border-2 border-yellow-500/50 border-t-yellow-500 animate-spin" />
                  ) : isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : q.type === QuestionType.ShortAnswer && (userAnswer?.score || 0) > 50 ? (
                     <CheckCircle className="w-6 h-6 text-yellow-500" /> // Partial credit visual
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-slate-200 pr-4">
                      <span className="text-slate-500 mr-2">Q{index + 1}.</span>
                      {q.question}
                    </h3>
                    {expandedId === q.id ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                  </div>
                  
                  {/* Short Summary Line */}
                  {!expandedId && (
                     <p className={`mt-2 text-sm truncate ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {q.type === QuestionType.ShortAnswer 
                            ? (isPending ? "Grading..." : `Score: ${userAnswer?.score}/100`) 
                            : `Your Answer: ${Array.isArray(userAnswer?.answer) ? userAnswer.answer.join(', ') : userAnswer?.answer}`}
                     </p>
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === q.id && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/50 bg-slate-900/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Your Answer</span>
                            <p className="text-slate-300 whitespace-pre-wrap">
                              {Array.isArray(userAnswer?.answer) 
                                ? userAnswer.answer.length > 0 ? userAnswer.answer.join(', ') : "(No selections)"
                                : userAnswer?.answer || "(No Answer)"}
                            </p>
                        </div>
                        <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                             <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                {q.type === QuestionType.ShortAnswer ? "Rubric / Key Points" : "Correct Answer"}
                             </span>
                            <p className="text-indigo-300 whitespace-pre-wrap">
                              {Array.isArray(q.correctAnswer) 
                                ? q.correctAnswer.join(', ') 
                                : q.correctAnswer}
                            </p>
                        </div>
                    </div>
                    
                    {q.explanation && (
                        <div className="mt-4 p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg">
                             <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2 flex items-center gap-2">
                                <AlertCircle className="w-3 h-3" /> Explanation
                             </span>
                            <p className="text-slate-300 text-sm">{q.explanation}</p>
                        </div>
                    )}

                    {/* AI Feedback for Short Answer */}
                    {q.type === QuestionType.ShortAnswer && userAnswer?.feedback && (
                         <div className="mt-4 p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">AI Feedback</span>
                            <p className="text-slate-300 text-sm italic">"{userAnswer.feedback}"</p>
                       </div>
                    )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onRestart}
          className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-8 rounded-xl transition-all flex items-center gap-2 border border-slate-700"
        >
          <RefreshCcw className="w-5 h-5" />
          Start New Exam
        </button>
      </div>
    </div>
  );
};

export default ExamResults;
