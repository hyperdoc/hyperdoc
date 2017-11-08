'use strict'

const gulp = require('gulp')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const path = require('path')
const del = require('del')

require('./aws/gulpfile')(gulp)
require('./core/gulpfile')(gulp)

const ROOT_PATH = path.join(__dirname)

// compile TypeScript files
gulp.task('build', gulp.series(
  'core:build',
  'aws:build'
))

// prepare tests
gulp.task('pre-test', function () {
  process.chdir(ROOT_PATH)
  return gulp.src(['./{core,aws}/dist/**/*.js', '!./{core,aws}/dist/test/**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

// run tests
gulp.task('mocha', function () {
  process.chdir(ROOT_PATH)
  return gulp.src(['./{core,aws}/dist/test/**/*.spec.js'])
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

// prepare and run tests across all modules
gulp.task('test', gulp.series(
  'build',
  'pre-test',
  'mocha'
))

gulp.task('clean-root', function () {
  return del(['coverage'])
})

// clean all modules
gulp.task('clean', gulp.series(
  'core:clean',
  'aws:clean',
  'clean-root'
))