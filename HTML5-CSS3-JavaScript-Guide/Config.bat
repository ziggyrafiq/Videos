@echo "Ziggy Rafiq Consulting gulpfile.js created and required plugins and packages coded"
@echo off
echo. > gulpfile.js
echo const { src, dest, parallel, series, watch } = require("gulp"); >> gulpfile.js
echo const browsersync = require("browser-sync").create(); >> gulpfile.js
echo const autoprefixer = require("gulp-autoprefixer"); >> gulpfile.js
echo const cacheBust = require("gulp-cache-bust"); >> gulpfile.js
echo const changed = require("gulp-changed"); >> gulpfile.js
echo const clean = require("gulp-clean"); >> gulpfile.js
echo const concat = require("gulp-concat"); >> gulpfile.js
echo const cssnano = require("gulp-cssnano"); >> gulpfile.js
echo const imagemin = require("gulp-image-optimization"); >> gulpfile.js
echo const order = require("gulp-order"); >> gulpfile.js
echo const rename = require("gulp-rename"); >> gulpfile.js
echo const sass = require("gulp-sass")(require("sass")); >> gulpfile.js
echo const sourcemaps = require("gulp-sourcemaps"); >> gulpfile.js
echo const uglify = require("gulp-uglify"); >> gulpfile.js