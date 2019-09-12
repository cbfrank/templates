import * as webpack from "webpack";
import * as path from "path";
declare var __dirname;

function createConfig(isProd: boolean, watch: boolean): webpack.Configuration {
    return {
        entry: "./ClientApp/app.tsx",
        output: {
            path: path.resolve(__dirname, "./wwwroot/dist/javascripts"),
            publicPath: "/dist/javascripts/", //this is required if the output js fila are splited into chunk, this url is the chunk js files path to the html page
            filename: "react-app.js"
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            //can use either 'awesome-typescript-loader' or "ts-loader", 'awesome-typescript-loader' will compiler ts file in memeory so no js file is generated (finnally, js will be bundle with webpack)
                            loader: "ts-loader",
                            options: { onlyCompileBundledFiles: true }
                        }
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    //include: path.join(__dirname, "node_modules"),
                    use: [
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                modules: true,
                                namedExport: true,
                                camelCase: true
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".json", ".css"]
        },
        plugins: [],
        externals: {
            jquery: "jQuery",
            bootstrap: "bootstrap"
        },
        devtool: isProd ? "cheap-module-source-map" as any : "cheap-module-eval-source-map",
        watch: watch,
        watchOptions: {
            ignored: ["node_modules"]
        }
    };
}

export default (env, options) => {
    //console.log(`webpack env: ${JSON.stringify(env, null, 4)}`);
    //console.log(`webpack options: ${JSON.stringify(options, null, 4)}`);
    const config = createConfig(options.mode !== "development", options.watch ? true : false);
    console.log(`options.mode is ${options.mode}`);
    console.log(`config.devtool is ${config.devtool}`);
    return config;
};