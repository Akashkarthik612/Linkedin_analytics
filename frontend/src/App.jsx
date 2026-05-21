import { createContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useFolders } from './hooks/useFolders';
import { usePosts } from './hooks/usePosts';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PostList } from './components/PostList/PostList';
import { Editor } from './components/Editor/Editor';
import { AIAssistant } from './components/AIAssistant/AIAssistant';
import HomePage from './pages/HomePage';

export const AppContext = createContext(null);

function MainApp() {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedPostId, setSelectedPostId]     = useState(null);
  const [mode, setMode]                         = useState('idle');

  const { folders, refetch: refetchFolders } = useFolders();
  const { posts, refetch: refetchPosts }     = usePosts(selectedFolderId);

  function openNewFolder() { setSelectedPostId(null); setMode('newFolder'); }
  function openNewPost()   { setSelectedPostId(null); setMode('newPost'); }
  function openPost(postId){ setSelectedPostId(postId); setMode('post'); }
  function selectFolder(folderId) {
    setSelectedFolderId(folderId);
    setSelectedPostId(null);
    setMode('idle');
  }

  const ctx = {
    folders, refetchFolders, selectedFolderId, selectFolder,
    posts, refetchPosts, selectedPostId,
    mode, setMode, openNewFolder, openNewPost, openPost,
  };

  return (
    <AppContext.Provider value={ctx}>
      <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: 'var(--bg-app)' }}>
        <Sidebar />
        <Editor />
        <PostList />
        <AIAssistant />
      </div>
    </AppContext.Provider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/"    element={<HomePage />} />
      <Route path="/app" element={<MainApp />} />
      <Route path="*"    element={<Navigate to="/" replace />} />
    </Routes>
  );
}
