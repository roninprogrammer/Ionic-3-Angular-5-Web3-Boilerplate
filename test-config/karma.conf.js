var webpackConfig = require('./webpack.test.js');

module.exports = function(config) {
  var _config = {
    basePath: '../',

    frameworks: ['jasmine'],

    files: [
      {
        pattern: './test-config/karma-test-shim.js',
        watched: true
      },
      {
        pattern: './src/assets/**/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      },
      'src/**/*.spec.*'
    ],

    proxies: {
      '/assets/': './src/assets/'
    },

    preprocessors: {
      './test-config/karma-test-shim.js': ['webpack'],
      './src/**/*.spec.*':['webpack','coverage']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: false
    },

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },

    reporters: config.coverage ? ['kjhtml', 'dots','coverage','coverage-istanbul'] : ['kjhtml', 'dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  };

  config.set(_config);
};