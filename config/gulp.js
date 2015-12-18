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
        cssDeep: '**/*.css',
        jadeDeep: '**/*.jade',
        imagesDeep: '**/*.{ico,png,jpg,jpeg,gif,webp,svg}',
        fontsDeep: '**/*.{eot,svg,ttf,woff,woff2}',
        swfDeep: '**/*.swf',
        mapDeep: '**/*.map'
    },
    
    paths: {
        config: CONFIG,
        tasks: TASKS,
        server: SERVER,
        test: TEST,
        client: CLIENT,
        clientJs: CLIENT + 'app/',
        clientCss: CLIENT + 'css/',
        clientViews: CLIENT + 'views/',
        clientImages: CLIENT + 'images/',
        flashCopy: CLIENT + 'vendor/zeroclipboard/',
        dist: DIST,
        distJs: DIST + 'scripts/',
        distCss: DIST + 'css/',
        distViews: DIST + 'views/',
        distImages: DIST + 'images/',
        distFonts: DIST + 'fonts/',
        distFlash: DIST + 'scripts/zeroclipboard/'
    }
};

var taskConfigs = {
    watcher: {
        watchers: [
            {
                src: [config.paths.clientJs + config.filters.jsDeep],
                tasks: ['build-app-js']
            },
            {
                src: [config.paths.clientCss + config.filters.styl],
                tasks: ['build-app-css']
            },
            {
                src: [config.paths.clientViews + config.filters.jadeDeep],
                tasks: ['build-app-views']
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
