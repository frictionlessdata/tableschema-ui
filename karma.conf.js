const webpackConfig = require('./webpack.config.js')


// Webpack

delete webpackConfig.entry
delete webpackConfig.resolve
webpackConfig.externals = {
  'cheerio': 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
}


// Karma

const karmaConfig = (config) => {
  config.set({
    singleRun: true,
    browsers: ['jsdom'],
    frameworks: ['mocha'],
    files: ['test/karma.opts'],
    reporters: ['spec'],
    preprocessors: {
      'test/karma.opts': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
  })
}


// System

module.exports = karmaConfig
