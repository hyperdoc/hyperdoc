'use strict'

const gulp = require('gulp')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const path = require('path')

require('./aws/gulpfile')(gulp)
require('./core/gulpfile')(gulp)

const ROOT_PATH = path.join(__dirname)

// compile TypeScript files
gulp.task('compile', gulp.series(
  'core:compile',
  'aws:compile'
))

// prepare tests
gulp.task('pre_test', function () {
  process.chdir(ROOT_PATH)
  return gulp.src(['./{core,aws}/dist/**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

// run tests
gulp.task('mocha', function () {
  process.chdir(ROOT_PATH)
  return gulp.src(['./{core,aws}/test/**/*.spec.js'])
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

// prepare and run tests across all modules
gulp.task('test', gulp.series(
  'compile',
  'pre_test',
  'mocha'
))
