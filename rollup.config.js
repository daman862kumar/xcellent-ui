import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default [
    {
        input: './src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'es',
                exports: 'named',
            }
        ],
        plugins: [
            postcss({
                plugins: [],
                minimize: true,
            }),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
                plugins:["@babel/plugin-proposal-export-default-from"]
            }),
            external(),
            resolve(),
            terser(),
        ]
    }
];
