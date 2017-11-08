'use strict'

const gulp = require('gulp')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const path = require('path')
const ts = require('gulp-typescript')
const merge = require('merge2')
const del = require('del')

const ROOT_PATH = path.join(__dirname)

// compile TypeScript code to /dist
gulp.task('compile', function () {
  process.chdir(ROOT_PATH)
  const tsProject = ts.createProject('tsconfig.json')
  const tsResult = tsProject.src()
    .pipe(tsProject())

  return merge([
    tsResult.dts.pipe(gulp.dest('dist')),
    tsResult.js.pipe(gulp.dest('dist'))
  ])
})

// copy other resources to /dist
gulp.task('copy', function () {
  return gulp.src('src/**/*.json')
    .pipe(gulp.dest('dist'))
})

// build: compile and copy resources
gulp.task('build', gulp.series(
  'compile',
  'copy'
))

// prepare tests
gulp.task('pre-test', function () {
  return gulp.src(['./dist/**/*.js', '!./dist/test/**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

// run tests
gulp.task('mocha', function () {
  return gulp.src(['./dist/test/**/*.spec.js'])
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

// prepare and run tests
gulp.task('test', gulp.series(
  'build',
  'pre-test',
  'mocha'
))

// delete working directories
gulp.task('clean', function () {
  return del(['dist/**', 'coverage/**'])
})

module.exports = function (_gulp) {
  ['compile', 'copy', 'build', 'pre-test', 'mocha', 'test', 'clean'].forEach(function (name) {
    _gulp.task('core:' + name, gulp.task(name))
  })
}
