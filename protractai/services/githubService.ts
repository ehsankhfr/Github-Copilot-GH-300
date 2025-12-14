import { RepoFile } from '../types';

const GITHUB_API_BASE = 'https://api.github.com/repos';

export const parseRepoUrl = (url: string): { owner: string; repo: string } | null => {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const fetchRepoContents = async (owner: string, repo: string, path: string = ''): Promise<RepoFile[]> => {
  const response = await fetch(`${GITHUB_API_BASE}/${owner}/${repo}/contents/${path}`);
  if (!response.ok) {
    throw new Error('Failed to fetch repository contents. Please check the URL and ensure the repo is public.');
  }
  const data = await response.json();
  
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item: any) => ({
    name: item.name,
    path: item.path,
    download_url: item.download_url,
    type: item.type
  }));
};

export const fetchFileContent = async (downloadUrl: string): Promise<string> => {
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch file content');
  }
  return await response.text();
};

// Helper to recursively find markdown files (simplified to 2 levels deep to avoid API limits in this demo)
export const findMarkdownFiles = async (owner: string, repo: string, path: string = '', depth: number = 0): Promise<RepoFile[]> => {
  if (depth > 2) return []; // Limit depth for safety

  try {
    const items = await fetchRepoContents(owner, repo, path);
    let mdFiles: RepoFile[] = [];

    for (const item of items) {
      if (item.type === 'file' && item.name.toLowerCase().endsWith('.md')) {
        mdFiles.push(item);
      } else if (item.type === 'dir') {
        // Small delay to be nice to the API
        await new Promise(r => setTimeout(r, 100)); 
        const subFiles = await findMarkdownFiles(owner, repo, item.path, depth + 1);
        mdFiles = [...mdFiles, ...subFiles];
      }
    }
    return mdFiles;
  } catch (error) {
    console.warn(`Could not fetch path ${path}:`, error);
    return [];
  }
};
