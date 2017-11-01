'use strict'

const gulp = require('gulp')
const install = require('gulp-install')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const path = require('path')

const ROOT_PATH = path.join(__dirname)
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

gulp.task('pre_test', function () {
  process.chdir(ROOT_PATH)
  return gulp.src(['./{core,aws}/**/*.js', '!./{core,aws}/{node_modules,test}/**/*.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

gulp.task('mocha', function () {
  process.chdir(ROOT_PATH)
  return gulp.src(['./{core,aws}/test/**/*.spec.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

gulp.task('test', gulp.series(
  'pre_test',
  'mocha'
))
