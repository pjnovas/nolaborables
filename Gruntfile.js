
module.exports = function(grunt) {
  grunt.initConfig({

    express: {
      test: {
        options: {
          script: './app.js',
          node_env: 'test'
        }
      }
    },

    mochacov: {
      options: {
        files: 'tests/**/*.js',
        ui: 'bdd',
        colors: true
      },
      unit: {
        options: {
          reporter: 'spec'
        }
      },
    }

  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-cov');

  grunt.registerTask("default", ['express:test', 'mochacov:unit']);

};
