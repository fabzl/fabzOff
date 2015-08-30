module.exports.tasks = {

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */
	browserSync: {
		serve: {
			bsFiles: {
				src: [
					'<%=config.css.distDir%>/*.css',
					'<%=config.js.distDir%>/*.js',
					'**/*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: './'
				}
			}
		},


		styleguide: {
			bsFiles: {
				src: [
					'<%= config.distDir%>/**/*.*',
					'*.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: './',
					index: 'styleguide/index.html'
				}
			}
		}
	}
};
