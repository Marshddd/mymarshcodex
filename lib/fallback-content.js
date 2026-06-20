import seed from '@/data/db.json';

export const fallbackCourses = seed.courses || [];
export const fallbackQuizzes = seed.quizzes || [];

export function withFallbackCourses(data) {
  if (!Array.isArray(data) || data.length === 0) return fallbackCourses;

  const merged = fallbackCourses.map((fallbackCourse) => {
    const course = data.find((item) => String(item.id) === String(fallbackCourse.id));
    if (!course) return fallbackCourse;

    const lessons = Array.isArray(course.lessons) && course.lessons.length >= (fallbackCourse.lessons || []).length
      ? course.lessons
      : fallbackCourse.lessons;

    return {
      ...fallbackCourse,
      ...course,
      lessons
    };
  });

  const extraCourses = data.filter(
    (course) => !fallbackCourses.some((fallbackCourse) => String(fallbackCourse.id) === String(course.id))
  );

  return [...merged, ...extraCourses];
}

export function withFallbackQuizzes(data) {
  if (!Array.isArray(data) || data.length === 0) return fallbackQuizzes;

  const merged = fallbackQuizzes.map((fallbackQuiz) => {
    const quiz = data.find((item) => String(item.id) === String(fallbackQuiz.id));
    if (!quiz) return fallbackQuiz;

    const questions = Array.isArray(quiz.questions) && quiz.questions.length >= (fallbackQuiz.questions || []).length
      ? quiz.questions
      : fallbackQuiz.questions;

    return {
      ...fallbackQuiz,
      ...quiz,
      questions
    };
  });

  const extraQuizzes = data.filter(
    (quiz) => !fallbackQuizzes.some((fallbackQuiz) => String(fallbackQuiz.id) === String(quiz.id))
  );

  return [...merged, ...extraQuizzes];
}

export function findFallbackCourse(id) {
  return fallbackCourses.find((course) => String(course.id) === String(id)) || null;
}

export function withFallbackCourse(course, id) {
  const fallbackCourse = findFallbackCourse(id ?? course?.id);
  if (!course) return fallbackCourse;
  if (!fallbackCourse) return course;

  return {
    ...fallbackCourse,
    ...course,
    lessons: Array.isArray(course.lessons) && course.lessons.length >= (fallbackCourse.lessons || []).length
      ? course.lessons
      : fallbackCourse.lessons
  };
}

export function findFallbackQuiz(id) {
  return fallbackQuizzes.find((quiz) => String(quiz.id) === String(id)) || null;
}

export function withFallbackQuiz(quiz, id) {
  const fallbackQuiz = findFallbackQuiz(id ?? quiz?.id);
  if (!quiz) return fallbackQuiz;
  if (!fallbackQuiz) return quiz;

  return {
    ...fallbackQuiz,
    ...quiz,
    questions: Array.isArray(quiz.questions) && quiz.questions.length >= (fallbackQuiz.questions || []).length
      ? quiz.questions
      : fallbackQuiz.questions
  };
}
