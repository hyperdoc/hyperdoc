'use strict'

const gulp = require('gulp')
const install = require('gulp-install')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const path = require('path')

const ROOT_PATH = path.join(__dirname)

// npm install
gulp.task('install', function (done) {
  gulp.src(path.join(ROOT_PATH, 'package.json'))
    .pipe(install())
  done()
})

// prepare tests
gulp.task('pre_test', function () {
  return gulp.src(['./**/*.js', '!./{node_modules,test}/**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

// run tests
gulp.task('mocha', function () {
  return gulp.src(['./test/**/*.spec.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

// prepare and run tests
gulp.task('test', gulp.series(
  'pre_test',
  'mocha'
))
