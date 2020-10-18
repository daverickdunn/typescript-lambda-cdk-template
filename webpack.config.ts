import { resolve } from 'path';
import { Configuration } from 'webpack';
import * as path from 'path';
import * as fs from 'fs';

function getHandlers(relative_path: string): { [key: string] : string }{
    // - the key is the filename only. it does not contain the file extension.
    // - the value is the path to the file
    const handlers = fs.readdirSync(path.join(__dirname, relative_path));
    return handlers.reduce((acc: any, item: string) => {
        const name = path.parse(item).name;
        if (name.endsWith('.lambda')){
            let key = name.replace('.lambda', '');
            acc[key] = relative_path + item;
        }
        return acc;
    }, {});
}

const entry = getHandlers('./src/');

const config: Configuration = {
    entry,
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options:{
                    onlyCompileBundledFiles: true,
                    compilerOptions: {
                        outDir: 'dist'
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    target: 'node',
    mode: process.env.NODE_ENV != 'production' ? 'development' : 'production',
    optimization: {
        nodeEnv: false,
    },
};

export default config;
