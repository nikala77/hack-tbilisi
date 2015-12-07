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
        clientJs: CLIENT + 'javascript/',
        clientCss: CLIENT + 'css/',
        clientImages: CLIENT + 'images/',
        clientFonts: CLIENT + 'fonts/',
        clientAccountCss: CLIENT + 'css/banner/account/',
        clientAccountJs: CLIENT + 'javascript/banner/account/',
        clientDashboardCss: CLIENT + 'css/banner/dashboard/',
        clientDashboardJs: CLIENT + 'javascript/banner/dashboard/',
        clientEditorCss: CLIENT + 'css/banner/editor/',
        clientEditorJs: CLIENT + 'javascript/banner/editor/',
        vendor: CLIENT + 'vendor/',
        dist: DIST,
        distCss: DIST + 'css/',
        distJs: DIST + 'scripts/',
        distImages: DIST + 'images/',
        distFonts: DIST + 'fonts/',
        distAccountCss: DIST + 'css/banner/account/',
        distAccountJs: DIST + 'scripts/banner/account/',
        distDashboardCss: DIST + 'css/banner/dashboard/',
        distDashboardJs: DIST + 'scripts/banner/dashboard/',
        distEditorCss: DIST + 'css/banner/editor/',
        distEditorJs: DIST + 'scripts/banner/editor/',
    }
};

var taskConfigs = {
    watcher: {
        watchers: [
            {
                src: [config.paths.clientAccountJs + config.filters.jsDeep],
                tasks: ['build-banner-account-js']
            },
            {
                src: [config.paths.clientAccountCss + config.filters.lessDeep],
                tasks: ['build-banner-account-css']
            },
            {
                src: [config.paths.clientDashboardJs + config.filters.jsDeep],
                tasks: ['build-banner-dashboard-js']
            },
            {
                src: [config.paths.clientDashboardCss + config.filters.lessDeep],
                tasks: ['build-banner-dashboard-css']
            },
            {
                src: [config.paths.clientEditorJs + config.filters.jsDeep],
                tasks: ['build-banner-editor-js']
            },
            {
                src: [config.paths.clientEditorCss + config.filters.lessDeep],
                tasks: ['build-banner-editor-css']
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
