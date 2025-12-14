import React, { useState } from 'react';
    import { FileText, CheckSquare, Square, Play, RefreshCw, FolderOpen } from 'lucide-react';
    import { RepoFile } from '../types';
    
    interface FileSelectionProps {
      files: RepoFile[];
      onGenerate: (selectedFiles: RepoFile[]) => void;
      onBack: () => void;
      isGenerating: boolean;
    }
    
    const FileSelection: React.FC<FileSelectionProps> = ({ files, onGenerate, onBack, isGenerating }) => {
      const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set(files.map(f => f.path)));
    
      const toggleFile = (path: string) => {
        const newSet = new Set(selectedPaths);
        if (newSet.has(path)) {
          newSet.delete(path);
        } else {
          newSet.add(path);
        }
        setSelectedPaths(newSet);
      };
    
      const toggleAll = () => {
        if (selectedPaths.size === files.length) {
          setSelectedPaths(new Set());
        } else {
          setSelectedPaths(new Set(files.map(f => f.path)));
        }
      };
    
      const handleGenerate = () => {
        const selected = files.filter(f => selectedPaths.has(f.path));
        onGenerate(selected);
      };
    
      if (isGenerating) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Analyzing Repository</h2>
              <p className="text-slate-400">Gemini is reading your notes and constructing an exam...</p>
            </div>
          </div>
        );
      }
    
      return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FolderOpen className="text-indigo-400" />
                Select Study Materials
              </h2>
              <p className="text-slate-400 mt-1">Found {files.length} markdown files. Choose what to include.</p>
            </div>
            <button 
              onClick={onBack}
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Change Repo
            </button>
          </div>
    
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl mb-8">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
              <button 
                onClick={toggleAll}
                className="flex items-center gap-3 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {selectedPaths.size === files.length ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                {selectedPaths.size === files.length ? 'Unselect All' : 'Select All'}
              </button>
              <span className="text-sm text-slate-500">
                {selectedPaths.size} selected
              </span>
            </div>
            
            <div className="max-h-[50vh] overflow-y-auto divide-y divide-slate-800/50">
              {files.map((file) => (
                <div 
                  key={file.path}
                  onClick={() => toggleFile(file.path)}
                  className={`p-4 flex items-center gap-4 cursor-pointer transition-colors hover:bg-slate-800/50 ${selectedPaths.has(file.path) ? 'bg-indigo-500/5' : ''}`}
                >
                  <div className={`text-slate-500 ${selectedPaths.has(file.path) ? 'text-indigo-500' : ''}`}>
                    {selectedPaths.has(file.path) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                  </div>
                  <FileText className="w-5 h-5 text-slate-600" />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${selectedPaths.has(file.path) ? 'text-indigo-200' : 'text-slate-300'}`}>
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{file.path}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
    
          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={selectedPaths.size === 0}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-900/20 transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              Generate Exam
            </button>
          </div>
        </div>
      );
    };
    
    export default FileSelection;
    