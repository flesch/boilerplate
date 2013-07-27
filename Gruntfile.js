module.exports = function(grunt) {

  grunt.initConfig({

    express: {
      dev: {
        options: {
          script: 'server.js',
          node_env: 'development'
        }
      }
    },

    watch: {
      express: {
        files: ['*.js'],
        tasks: ['express:dev'],
        options: { nospawn:true }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('server', ['express:dev', 'watch']);

};
