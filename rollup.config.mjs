import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/datatable.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/datatable.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/datatable.umd.js',
      format: 'umd',
      name: 'DataTable' 
    }
  ],
  plugins: [resolve(), commonjs()]
};
