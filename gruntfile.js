module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        // options: {
        //   compress: true,
        //   yuicompress: true,
        //   optimization: 2
        // },
        files: {
          "public/css/main.css": "private/less/app.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['private/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};