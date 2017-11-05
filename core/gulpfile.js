'use strict'

const gulp = require('gulp')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const path = require('path')
const ts = require('gulp-typescript')
const merge = require('merge2')

const ROOT_PATH = path.join(__dirname)

// compile TypeScript code into /dist
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

// prepare tests
gulp.task('pre_test', function () {
  return gulp.src(['./dist/**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

// run tests
gulp.task('mocha', function () {
  return gulp.src(['./test/**/*.spec.js'])
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

// prepare and run tests
gulp.task('test', gulp.series(
  'pre_test',
  'mocha'
))

module.exports = function (_gulp) {
  ['compile', 'pre_test', 'mocha', 'test'].forEach(function (name) {
    _gulp.task('core:' + name, gulp.task(name))
  })
}
