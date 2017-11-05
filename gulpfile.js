'use strict'

const gulp = require('gulp')

require('./aws/gulpfile')(gulp)
require('./core/gulpfile')(gulp)

// compile TypeScript files
gulp.task('compile', gulp.series(
  'core:compile',
  'aws:compile'
))

// prepare tests
gulp.task('pre_test', function () {
  return gulp.src(['./{core,aws}/dist/**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

// run tests
gulp.task('mocha', function () {
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
