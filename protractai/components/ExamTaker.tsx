import React, { useState, useEffect } from 'react';
import { Exam, Question, QuestionType, UserAnswer } from '../types';
import { Clock, CheckCircle2, Circle, ChevronRight, ChevronLeft, Flag } from 'lucide-react';

interface ExamTakerProps {
  exam: Exam;
  onSubmit: (answers: UserAnswer[]) => void;
}

const ExamTaker: React.FC<ExamTakerProps> = ({ exam, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Calculate estimated time: 1.5 mins per MC, 3 mins per Short Answer
  useEffect(() => {
    let totalSeconds = 0;
    exam.questions.forEach(q => {
      totalSeconds += q.type === QuestionType.MultipleChoice ? 90 : 180;
    });
    // Set a cap or min
    totalSeconds = Math.max(300, Math.min(totalSeconds, 3600)); // Min 5 mins, Max 60 mins
    setTimeLeft(totalSeconds);
    setHasStarted(true);
  }, [exam]);

  useEffect(() => {
    if (!hasStarted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [exam.questions[currentQuestionIndex].id]: answer
    }));
  };

  const handleSubmit = () => {
    const formattedAnswers: UserAnswer[] = exam.questions.map(q => ({
      questionId: q.id,
      answer: answers[q.id] || ""
    }));
    onSubmit(formattedAnswers);
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((Object.keys(answers).length) / exam.questions.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 min-h-screen flex flex-col">
      {/* Header / Top Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 sticky top-4 z-20 shadow-2xl shadow-black/50">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-white truncate max-w-md">{exam.title}</h1>
            <p className="text-slate-500 text-sm">Question {currentQuestionIndex + 1} of {exam.questions.length}</p>
          </div>
          <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg ${timeLeft < 60 ? 'bg-red-500/10 text-red-400 animate-pulse' : 'bg-slate-800 text-indigo-400'}`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 shadow-xl flex-1 animate-in slide-in-from-right-4 duration-300">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20 uppercase tracking-wider">
              {currentQuestion.type === QuestionType.MultipleChoice ? 'Multiple Choice' : currentQuestion.type === QuestionType.TrueFalse ? 'True / False' : 'Short Answer'}
            </span>
            <h2 className="text-2xl font-medium text-slate-100 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="space-y-4">
            {(currentQuestion.type === QuestionType.MultipleChoice || currentQuestion.type === QuestionType.TrueFalse) ? (
              <div className="grid grid-cols-1 gap-4">
                {(currentQuestion.options || (currentQuestion.type === QuestionType.TrueFalse ? ["True", "False"] : [])).map((option, idx) => {
                   const isSelected = answers[currentQuestion.id] === option;
                   return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 group flex items-center gap-4 ${
                        isSelected 
                          ? 'bg-indigo-600/10 border-indigo-500 text-indigo-100 shadow-inner' 
                          : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-500 group-hover:border-slate-400'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className="text-lg">{option}</span>
                    </button>
                   );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full h-48 bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-lg resize-none"
                />
                <p className="text-sm text-slate-500 text-right">
                  {(answers[currentQuestion.id] || '').length} characters
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-auto pb-8">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-xl font-medium text-slate-400 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          {currentQuestionIndex === exam.questions.length - 1 ? (
             <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Finish Exam
              <Flag className="w-5 h-5 fill-current" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamTaker;
