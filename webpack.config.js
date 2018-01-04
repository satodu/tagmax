const webpack = require('webpack');
const path = require('path');
 
module.exports = {
    entry: {
        tagmax : ['./frontend/less/general.less'],
        campaigntags: [
            './frontend/ts/campaign/switch.ts',
            './frontend/less/campaign.less',
            //'./frontend/ts/campaign/gaform.ts',
            './frontend/ts/campaign/atInternet.ts',
            './frontend/ts/campaign/concatModule.ts'],
        vendor: [
            './frontend/ts/vendor.ts',
            './frontend/js/requests.js' 
        ],
        angular :[
            './frontend/ts/angular.ts'
        ],
        auth : [
            './frontend/less/auth.less'
        ],
        user : [
            './frontend/less/general.less',
            './frontend/less/user.less',
            './frontend/ts/user.ts'
        ],
        companies : [
            './frontend/ts/companies.ts'
        ],
        campaigns : [
            './frontend/ts/campaigns.ts'
        ]
    },
    output: {
        filename: './public/javascript/[name].js'
    },
     resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules : [
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.json$/, loader: "json-loader"},
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.css$/,  loader: "style-loader!css-loader" },
            { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader' },
            { test: /\.less$/, use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "less-loader" }]},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
        }),
    ],
    watch : true
};