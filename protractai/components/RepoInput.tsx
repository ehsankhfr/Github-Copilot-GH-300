import React, { useState } from 'react';
import { Github, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';
import { parseRepoUrl } from '../services/githubService';

interface RepoInputProps {
  onRepoSubmit: (owner: string, repo: string) => void;
  isLoading: boolean;
  error: string | null;
}

const RepoInput: React.FC<RepoInputProps> = ({ onRepoSubmit, isLoading, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseRepoUrl(url);
    if (parsed) {
      onRepoSubmit(parsed.owner, parsed.repo);
    } else {
      // You might want to handle invalid URL UI here locally too, but the parent handles general errors
      alert("Please enter a valid GitHub repository URL (e.g., https://github.com/facebook/react)");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto px-4 fade-in">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
            <BookOpen className="w-12 h-12 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
          ProtractAI
        </h1>
        <p className="text-slate-400 text-lg max-w-lg mx-auto">
          Transform any public GitHub documentation into an intelligent, interactive exam to test your knowledge.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Github className="h-6 w-6 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
        </div>
        <input
          type="url"
          required
          className="block w-full pl-12 pr-32 py-5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-lg shadow-xl shadow-indigo-900/5"
          placeholder="https://github.com/owner/repository"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Start
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-300 w-full animate-pulse">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm text-slate-500 w-full">
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="block text-indigo-400 font-semibold mb-1">Select Files</span>
          Parse Markdown files recursively
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="block text-indigo-400 font-semibold mb-1">AI Generation</span>
          Gemini creates tailored questions
        </div>
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <span className="block text-indigo-400 font-semibold mb-1">Auto Grading</span>
          Instant feedback & scoring
        </div>
      </div>
    </div>
  );
};

export default RepoInput;
