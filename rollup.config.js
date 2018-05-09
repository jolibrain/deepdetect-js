import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import babel from "rollup-plugin-babel";

export default {
  input: 'src/dd.js',
  output: {
    file: 'dist/deepdetect-browser.min.js',
    format: 'iife',
    name: 'deepdetect',
    footer: '/* DeepDetect JS Client - https://github.com/jolibrain/deepdetect-js */'
  },
  plugins: [
    resolve({ jsnext: true, preferBuiltins: true, browser: true }),
    uglify(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ["env", { "modules": false }]
      ],
      plugins: [
        'external-helpers'
      ]
    })
  ]
};
