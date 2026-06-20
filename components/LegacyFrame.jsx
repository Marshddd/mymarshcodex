'use client';

const routeMap = {
  home: '',
  learn: '#courses',
  quiz: '#quiz-list',
  login: '#login',
  register: '#register',
  profile: '#profile',
  admin: '#admin',
  about: '#about',
  myCourses: '#my-courses'
};

export default function LegacyFrame({ page = 'home' }) {
  const hash = routeMap[page] || '';

  return (
    <iframe
      className="legacy-frame"
      src={`/mycodes/index.html${hash}`}
      title="Backend Mastery"
    />
  );
}
