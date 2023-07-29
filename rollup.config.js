import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
// import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
    input: {
        index: 'src/index.js',
    },
    output: {
        format: 'iife',
        dir: 'assets',
        name: "DropImages",
        assetFileNames: '[name][extname]',
        // globals: {
        //     stream: 'stream',
        //     events: 'events',
        //     buffer: 'buffer',
        //     util: 'util',
        // }
    },
    plugins: [
        commonjs(),
        nodeResolve(),
        scss({
            output: 'styles.css',
        }),
        // nodePolyfills()
    ],
};
