'use strict'

const gulp = require('gulp')
const install = require('gulp-install')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const path = require('path')

const CORE_PATH = path.join(__dirname, 'core')
const AWS_PATH = path.join(__dirname, 'aws')

// npm install at /core
gulp.task('install_core', function (done) {
  gulp.src(path.join(CORE_PATH, 'package.json'))
    .pipe(install())
  done()
})

// npm install at /aws
gulp.task('install_aws', function (done) {
  gulp.src(path.join(AWS_PATH, 'package.json'))
    .pipe(install())
  done()
})

// npm install across all modules
gulp.task('install', gulp.series(
  'install_core',
  'install_aws'
))

// code coverage at /core
gulp.task('coverage_core', function () {
  //process.chdir(CORE_PATH)
  return gulp.src(['core/test/**/*.spec.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

// code coverage at /aws
gulp.task('coverage_aws', function () {
  // process.chdir(AWS_PATH)
  return gulp.src(['aws/test/**/*.spec.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

// code coverage across all modules
gulp.task('coverage', gulp.series(
  'coverage_core',
  'coverage_aws'
))