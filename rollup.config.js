import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import replace from '@rollup/plugin-replace';

const extensions = ['ts', 'js']
const external = [
    'path', 
    'fs', 
    'typedi', 
    'type-graphql', 
    'koa', 
    'koa-mount', 
    'koa-graphql',
    '@mcfed/utils'
]

export default {
    input: 'src/index.ts',
    output: {
      file: 'dist/bundle.js',
      format: 'cjs',
      exports: 'auto',
      interop: 'default'
    },
    external,
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        typescript({
            tsconfig: './rollup.tsconfig.json'
        }),
        nodeResolve({
            preferBuiltins: true,
            extensions,
            mainFields: ['module', 'main'],
        }),
        commonjs({ 
            extensions: ['.js', '.ts'],
            exclude: ['node_modules/*'],
            transformMixedEsModules: true,
            dynamicRequireTargets: [
                'node_modules/*'
            ]
        }),
        json(),
        babel({
            babelHelpers: 'runtime',
            extensions,
            exclude: ['node_modules/*'],
            plugins: ['@babel/plugin-transform-runtime']
        }),
        typescriptPaths()
    ]
  };