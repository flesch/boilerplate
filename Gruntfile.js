module.exports = function(grunt) {

  grunt.initConfig({

    uglify: {
      all: {
        files: {
          'public/js/application.js': ['src/js/jquery-1.10.2.js', 'src/js/bootstrap.js', 'src/js/application.js']
        }
      }
    },
    
    cssmin: {
      all: {
        files: {
          'public/css/application.css': ['src/css/bootstrap.css', 'src/css/application.css']
        }
      }
    },    

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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('server', ['cssmin:all', 'uglify:all', 'express:dev', 'watch']);

};
