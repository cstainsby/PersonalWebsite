const sass = require('node-sass');
const fs = require('fs');

const result = sass.renderSync({
  file: 'scss/styles.scss',
  outputStyle: 'compressed' // Change to 'expanded' if you prefer unminified CSS
});

fs.writeFileSync('styles.css', result.css);

fs.watch('scss', { recursive: true }, (eventType, filename) => {
    if (filename.endsWith('.scss')) {
      const result = sass.renderSync({
        file: `scss/${filename}`,
        outputStyle: 'compressed' // Change to 'expanded' if you prefer unminified CSS
      });
  
      fs.writeFileSync(`public/${filename.replace('.scss', '.css')}`, result.css);
      console.log(`Compiled ${filename}`);
    }
  });
  