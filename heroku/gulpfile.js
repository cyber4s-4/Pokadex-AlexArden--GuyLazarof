const gulp = require("gulp");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const { exec } = require("child_process");
const webpackConfig = require("./webpack.config.js");
const log = require('fancy-log');

// Start server
gulp.task("server", (cb) => {
  exec("node dist/tsc/server/server.js", () => cb()); 
  log('Listening on localhost:3000');   
});

// Removes previous dist
gulp.task("clean", () => {
  return gulp.src("./dist", { allowEmpty: true }).pipe(clean());
});

// Creates js bundle from several js files
gulp.task("bundle", () => {
  return webpack(webpackConfig).pipe(gulp.dest("./dist/tsc/client/js"));
});

// Converts scss to css
gulp.task("scss", () => {
  return gulp
    .src("./src/client/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./dist/tsc/client"));
});

// Transfers index
gulp.task("index", () => {
  return gulp
    .src(["./src/client/*.html", "./src/client/favicon.ico"])
    .pipe(gulp.dest("./dist/tsc/client"));
});

// Transfers data.json
gulp.task("data123", () => {
  return gulp
    .src(["./src/server/data.json"])
    .pipe(gulp.dest("./dist/tsc/server"));
});

// Transfers client js files
gulp.task("img", () => {
  return gulp
    .src(["./src/client/img/*"])
    .pipe(gulp.dest("./dist/tsc/client/img"));
});

// Watch scss files
gulp.task("watch-scss", () => {
  return gulp.watch("./src/client/*.scss", gulp.series("scss"));
});

// Watch html files
gulp.task("watch-html", () => {
  return gulp.watch(["./src/client/*.html"], gulp.series("index"));
});

// Watch tsc files
gulp.task("watch-tsc", () => {
  return gulp.watch("./dist/tsc/client/js/*.js", gulp.series("bundle"));
});

// Initial ts compile
gulp.task("tsc", (cb) => {
  exec("tsc", () => cb());
});

// Watch ts files and recompile
gulp.task("tsc-w", () => {
  const tsc = exec("tsc -w --preserveWatchOutput --pretty");

  tsc.stdout.on("data", (data) => console.log(data));
  tsc.stderr.on("data", (data) => console.error(data));

  tsc.on("close", (code) => console.log(`tsc exited with code ${code}`));
});

// Start express
gulp.task("express", () => {
  const tsc = exec("nodemon --watch ./src/server ./src/server/server.ts");
  tsc.stdout.on("data", (data) => console.log(data));
  tsc.stderr.on("data", (data) => console.error(data));
});

// Build all
gulp.task(
  "build",
  gulp.series("clean", "scss", "index", "data123", "img", "tsc", "bundle")  
);

// Heroku copy dist files
gulp.task("heroku-copy-dist", () => {
  return gulp
    .src(
      [
        "./dist/tsc/client/index.html",
        "./dist/tsc/client/styles.css",
        "./dist/tsc/client/favicon.ico",
      ],
      { allowEmpty: true }
    )
    .pipe(gulp.dest("./deploy/dist/tsc/client"));
});

// Heroku copy js-client files
gulp.task("heroku-copy-jsClient", () => {
  return gulp
    .src(["./dist/tsc/client/js/*.js", "./dist/tsc/client/js/*.js.map"], {
      allowEmpty: true,
    })
    .pipe(gulp.dest("./deploy/dist/tsc/client/js"));
});

// Heroku copy images
gulp.task("heroku-copy-images", () => {
  return gulp
    .src(["./dist/tsc/client/img/*"], { allowEmpty: true })
    .pipe(gulp.dest("./deploy/dist/tsc/client/img"));
});

// Heroku copy root files
gulp.task("heroku-copy-root", () => {
  return gulp
    .src(["./package.json", "./package-lock.json", "./Procfile"], {
      allowEmpty: true,
    })
    .pipe(gulp.dest("./deploy"));
});

//heroku server
gulp.task("heroku-copy-server", () => {
  return gulp
    .src(["./dist/tsc/server/*.js*"], {
      allowEmpty: true,
    })
    .pipe(gulp.dest("./deploy/dist/tsc/server"));
});

//heroku server
gulp.task("heroku-copy-servers", () => {
  return gulp
    .src(["./dist/tsc/server/data.json"], {
      allowEmpty: true,
    })
    .pipe(gulp.dest("./deploy/dist/tsc/server"));
});

// Heroku clean files
gulp.task("heroku-clean", () => {
  return gulp
    .src(
      [
        "./deploy/Procfile",
        "./deploy/package.json",
        "./deploy/package-lock.json",
        "./deploy/dist",
      ],
      { allowEmpty: true }
    )
    .pipe(clean());
});

// Heroku deploy
gulp.task(
  "deploy",
  gulp.series(
    "heroku-clean",
    "build",
    "heroku-copy-root",
    "heroku-copy-dist",
    "heroku-copy-images",
    "heroku-copy-server",
    "heroku-copy-servers",
    "heroku-copy-jsClient"
  )
);

// Run all (without express)
gulp.task(
  "dev",
  gulp.series(
    "build", 
    gulp.parallel("watch-scss", "watch-html", "watch-tsc", "tsc-w")   
  )
);

// Run all together
gulp.task(
  "default",
  gulp.series(
    "build",
    gulp.parallel("watch-scss", "watch-html", "watch-tsc", "tsc-w", "server")   
  )
);
