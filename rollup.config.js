import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";

export default {
    input: {
        index: 'src/index.js',
    },
    output: {
        format: 'iife',
        dir: 'assets',
        name: "DropImages",
        assetFileNames: '[name][extname]',
    },
    plugins: [
        commonjs(),
        nodeResolve(),
        scss({
            fileName: 'styles.css',
            outputStyle: 'compressed',
            output: true,
            dir: 'styles',
        }),
    ],
};
