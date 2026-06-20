import seed from '@/data/db.json';

export const fallbackCourses = seed.courses || [];
export const fallbackQuizzes = seed.quizzes || [];

export function withFallbackCourses(data) {
  return Array.isArray(data) && data.length > 0 ? data : fallbackCourses;
}

export function withFallbackQuizzes(data) {
  return Array.isArray(data) && data.length > 0 ? data : fallbackQuizzes;
}

export function findFallbackCourse(id) {
  return fallbackCourses.find((course) => String(course.id) === String(id)) || null;
}

export function findFallbackQuiz(id) {
  return fallbackQuizzes.find((quiz) => String(quiz.id) === String(id)) || null;
}
