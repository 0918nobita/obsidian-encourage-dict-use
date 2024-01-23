import { defineConfig } from '@rspack/cli';

const config = defineConfig({
    context: import.meta.dirname,
    entry: './src/main.ts',
    output: {
        filename: 'main.js',
        libraryTarget: 'commonjs',
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts'],
        tsConfigPath: './tsconfig.json',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'builtin:swc-loader',
            },
        ],
    },
    externals: {
        obsidian: 'obsidian',
    },
});

export default config;
