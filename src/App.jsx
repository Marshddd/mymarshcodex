import React, { useState } from 'react';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import LessonList from './pages/LessonList';
import LessonContent from './pages/LessonContent';
import PreTest from './pages/PreTest';
import AdminAccount from './pages/AdminAccount';
import EditAdminInfo from './pages/EditAdminInfo';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState({ name: 'Max', role: 'User', avatar: 'MA' });
  const [selectedLessonId, setSelectedLessonId] = useState(1);

  const navigate = (page, options = {}) => {
    if (options.lessonId) setSelectedLessonId(options.lessonId);
    setCurrentPage(page);
  };

  switch (currentPage) {
    case 'login':
      return <Login onNavigate={navigate} onLogin={setUser} />;
    case 'register':
      return <Register onNavigate={navigate} />;
    case 'user-profile':
      return <UserProfile user={user} onNavigate={navigate} />;
    case 'lesson-list':
      return <LessonList user={user} onNavigate={navigate} />;
    case 'lesson-content':
      return <LessonContent user={user} lessonId={selectedLessonId} onNavigate={navigate} />;
    case 'pre-test':
      return <PreTest user={user} onNavigate={navigate} />;
    case 'admin-account':
      return <AdminAccount user={user} onNavigate={navigate} />;
    case 'edit-admin-info':
      return <EditAdminInfo user={user} onNavigate={navigate} />;
    default:
      return <Homepage onNavigate={navigate} />;
  }
}

export default App;
