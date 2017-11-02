'use strict'

const gulp = require('gulp')
const install = require('gulp-install')
const istanbul = require('gulp-istanbul')
const mocha = require('gulp-mocha')
const path = require('path')

const ROOT_PATH = path.join(__dirname)
const CORE_PATH = path.join(__dirname, 'core')
const AWS_PATH = path.join(__dirname, 'aws')

// npm install across all modules
gulp.task('npm_install', function () {
  return gulp.src([path.join(AWS_PATH, 'package.json'), path.join(CORE_PATH, 'package.json')])
    .pipe(install())
})

// prepare tests across all modules
gulp.task('pre_test', function () {
  return gulp.src(['./{core,aws}/**/*.js', '!./{core,aws}/{node_modules,test}/**/*.js', '!./{core,aws}/gulpfile.js'])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

// run tests across all modules
gulp.task('mocha', function () {
  return gulp.src(['./{core,aws}/test/**/*.spec.js'])
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
})

// prepare and run tests across all modules
gulp.task('test', gulp.series(
  'npm_install',
  'pre_test',
  'mocha'
))
