 
const { src, dest, parallel, series, watch } = require("gulp"); 
const browsersync = require("browser-sync").create(); 
const autoprefixer = require("gulp-autoprefixer"); 
const cacheBust = require("gulp-cache-bust"); 
const changed = require("gulp-changed"); 
const clean = require("gulp-clean"); 
const concat = require("gulp-concat"); 
const cssnano = require("gulp-cssnano"); 
const imagemin = require("gulp-image-optimization"); 
const order = require("gulp-order"); 
const rename = require("gulp-rename"); 
const sass = require("gulp-sass")(require("sass")); 
const sourcemaps = require("gulp-sourcemaps"); 
const uglify = require("gulp-uglify"); 

const filePaths = {
    scss:{
        src:{
            scssDevPath:"Src/Styles/SCSS/**/*.scss",
            cssDevPath:"Src/Styles/CSS/"
        },
        dist: "./Dist/Styles/CSS/",
    },
    js:{
        src:"Src/Scripts/**/*.js",
        dist:"./Dist/Scripts/",
        file:"App-Scripts.js"
    },
    fonts:{
        src:"Src/Styles/Fonts/**/*",
        dist:"./Dist/Styles/Fonts/",
    },
    icons:{
        src:"Src/Styles/Icons/**/*",
        dist:"./Dist/Styles/Icons/",
    },
    data:{
        src:"Src/Styles/Data/**/*.json",
        dist:"./Dist/Data/",
    },
    image:{
        src:"Src/Images/**/*",
        dist:"./Dist/Images/",
    },
    html5:{
        src:"Src/**/*.html",
        dist:"./Dist/",
        file:"Index.html"
    },
    portNumber:3040

}

async function clear(){
    await src(filePaths.scss.src.cssDevPath,
        filePaths.scss.dist,
        { read: false })
        .pipe(clean())
    console.log("CSS Files have been Cleaned");
}

async function css(){

    await src(filePaths.scss.src.scssDevPath)
        .pipe(changed(filePaths.scss.src.scssDevPath))
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(clean(filePaths.scss.src.cssDevPath))
        // .pipe(clean(filePaths.scss.dist))
     .pipe(dest(filePaths.scss.src.cssDevPath))
        // .pipe(rename({
        //    extname: '.min.css'
        // }))
        // .pipe(cssnano())
     
        .pipe(dest(filePaths.scss.dist))
        // .pipe(clean(filePaths.scss.plugin))
       // .pipe(dest(filePaths.scss.plugin))
    console.log("SCSS Files Compiled and Build into CSS File App-Styles.css");
}
 
async function js() {
 

    await src(filePaths.js.src)
        .pipe(order([           
            "alert-hello.js"
            
        ]))
        .pipe(changed(filePaths.js.src))
     
        .pipe(concat(filePaths.js.file))
        //.pipe(dest('./Dist/Scripts/'))
        .pipe(clean(filePaths.js.dist))
        .pipe(dest(filePaths.js.dist))
         console.log("JavaScript Files Compiled and Build into Scripts Folder File App-Scripts.js");
};

async function fonts (){
    await src(filePaths.fonts.src)
        // .pipe(clean(filePaths.fonts.dist))
        .pipe(dest(filePaths.fonts.dist))
        // .pipe(clean(filePaths.fonts.plugin))
        //.pipe(dest(filePaths.fonts.plugin))
        console.log("Fonts Files Coppied to Fonts Folder in Dist");
};

async function icons (){
    await src(filePaths.icons.src)
        // .pipe(clean(filePaths.icons.dist))
        .pipe(dest(filePaths.icons.dist))
        // .pipe(clean(filePaths.icons.plugin))
       // .pipe(dest(filePaths.icons.plugin))
        console.log("Icons Files Coppied to Icons Folder in Dist");
};

async function data() {
    await src(filePaths.data.src)
        // .pipe(clean(filePaths.data.dist))
        // .pipe(clean(filePaths.data.plugin))
        .pipe(dest(filePaths.data.dist))
        //.pipe(dest(filePaths.data.plugin))
    console.log("Data Json Files Coppied to Data Folder in Dist");
};

async function html5() {
    await src(filePaths.html5.src)
        // .pipe(cacheBust({type: "timestamp"}))
        // .pipe(clean(filePaths.html5.dist))
        // .pipe(clean(filePaths.html5.plugin))
        .pipe(dest(filePaths.html5.dist))
        //.pipe(dest(filePaths.html5.plugin))
        console.log("HTML Files build with Cache Buster for CSS and JavaScript and move to Dist Folder");
};

async function images() {
    await src(filePaths.image.src)
        // .pipe(clean(filePaths.image.dist))
        // .pipe(clean(filePaths.image.plugin))
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest(filePaths.image.dist))
       // .pipe(dest(filePaths.image.plugin))
        console.log("Images file compress and move to Image folder in Dist");
};

async function browserSync() {
    browsersync.init({
        server: {
            baseDir: filePaths.html5.dist ,
            files: filePaths.html5.file
        },
        port: filePaths.portNumber
    });
}


async function watchFiles() {
  await  watch(filePaths.scss.src.scssDevPath, css);
  await watch(filePaths.js.src, js);
  await watch(filePaths.image.src, images);
  await watch(filePaths.data.src, data);
  await watch(filePaths.html5.src, html5);
  await watch(filePaths.fonts.src, fonts);
  await watch(filePaths.icons.src, icons);
}

exports.watch = parallel(watchFiles,browserSync);
exports.build = series(clear, parallel(js, css, data, html5,fonts,icons),browserSync);