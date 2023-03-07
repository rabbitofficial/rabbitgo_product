import request from '@/utils/request'

export function getCourseList() {
  return request({
    url: 'app_data/courses/courseList',
    method: 'get'
  })
}

export function createCourse(data) {
  return request({
    url: 'app_data/courses/createCourse',
    method: 'post',
    data
  })
}

export function editCourse(data) {
  return request({
    url: 'app_data/courses/editCourse',
    method: 'post',
    data
  })
}

export function deteleCourse(data) {
  return request({
    url: 'app_data/courses/deteleCourse',
    method: 'post',
    data
  })
}

// lesson
export function getLessonList(data) {
  return request({
    url: 'app_data/courses/lessonList',
    method: 'post',
    data
  })
}

export function createLesson(data) {
  return request({
    url: 'app_data/courses/createLesson',
    method: 'post',
    data
  })
}

export function editLesson(data) {
  return request({
    url: 'app_data/courses/editLesson',
    method: 'post',
    data
  })
}

export function deleteLesson(data) {
  return request({
    url: 'app_data/courses/deleteLesson',
    method: 'post',
    data
  })
}

// quiz
export function getQuiz() {
  return request({
    url: 'app_data/courses/getQuiz',
    method: 'post'
  })
}

export function getQuizAns() {
  return request({
    url: 'app_data/courses/getQuizAns',
    method: 'post'
  })
}

export function createQuiz(data) {
  return request({
    url: 'app_data/courses/createQuiz',
    method: 'post',
    data
  })
}

export function editQuiz(data) {
  return request({
    url: 'app_data/courses/editQuiz',
    method: 'post',
    data
  })
}

export function deteleQuiz(data) {
  return request({
    url: 'app_data/courses/deteleQuiz',
    method: 'post',
    data
  })
}
