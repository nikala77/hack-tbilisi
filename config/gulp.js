var _    = require('lodash');
var argv = require('yargs').argv;

var CONFIG = './config';
var TASKS  = './tasks';
var SERVER = './server/';
var TEST   = './test/';
var CLIENT = './client/';
var DIST   = './public/';

var config = {
    args: {
        isNotProduction: argv.production !== true,
        isProduction: argv.production === true
    },
    
    filters: {
        jsDeep: '**/*.js',
        styl: '*.styl',
        lessDeep: '**/*.less',
        cssDeep: '**/*.css',
        jadeDeep: '**/*.jade',
        imagesDeep: '**/*.{ico,png,jpg,jpeg,gif,webp,svg}',
        fontsDeep: '**/*.{otf,eot,svg,ttf,woff,woff2}',
        swfDeep: '**/*.swf',
        mapDeep: '**/*.map'
    },
    
    paths: {
        config: CONFIG,
        tasks: TASKS,
        server: SERVER,
        test: TEST,
        client: CLIENT,
        clientJs: CLIENT + 'javascript/',
        clientCss: CLIENT + 'css/',
        clientImages: CLIENT + 'images/',
        clientFonts: CLIENT,
        clientBannerCss: CLIENT + 'css/banner/',
        clientBannerJs: CLIENT + 'javascript/banner/',
        vendor: CLIENT + 'vendor/',
        dist: DIST,
        distCss: DIST + 'css/',
        distJs: DIST + 'scripts/',
        distImages: DIST + 'images/',
        distFonts: DIST + 'fonts/',
        distBannerCss: DIST + 'css/banner/',
        distBannerJS: DIST + 'scripts/banner/',
    }
};

var taskConfigs = {
    watcher: {
        watchers: [
            {
                src: [config.paths.clientBannerJs + config.filters.jsDeep],
                tasks: ['build-banner-js']
            },
            {
                src: [config.paths.clientBannerCss + config.filters.lessDeep],
                tasks: ['build-banner-css']
            },
            {
                src: [config.paths.clientImages + config.filters.imagesDeep],
                tasks: ['build-app-img']
            }
        ]
    },
    coverage: {
        successPercent: 58
    }
};

_.assign(config, taskConfigs);

module.exports = config;
