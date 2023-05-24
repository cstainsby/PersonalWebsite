const express = require("express");
const path = require("path");
const sass = require('node-sass');
const fs = require('fs');

const app = express();

// SCSS compilation
const compileSCSS = () => {
  const result = sass.renderSync({
    file: 'scss/styles.scss',
    outputStyle: 'compressed' // Change to 'expanded' if you prefer unminified CSS
  });

  fs.writeFileSync('styles.css', result.css);
};

// Watch SCSS files for changes and recompile
const watchSCSS = () => {
  fs.watch('scss', { recursive: true }, (eventType, filename) => {
    if (filename.endsWith('.scss')) {
      compileSCSS();
      console.log(`Compiled ${filename}`);
    }
  });
};

// Serve static files from the "public" directory
app.use(express.static('.', {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.js')) {
          res.set('Content-Type', 'application/javascript');
        }
      }
}));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"))
});

app.listen(process.env.PORT || 80,
    () => console.log("Server has been started..."))

// Compile SCSS on server start
compileSCSS();

// Watch SCSS for changes in development mode
if (process.env.NODE_ENV === 'development') {
  watchSCSS();
}