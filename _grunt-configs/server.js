module.exports.tasks = {



	'ftp-deploy': {
			  build: {
			    auth: {
			      host: 'server.com',
			      port: 21,
			      authKey: 'key1'
			    },
			    src: '<%=config.distDir%>',
			    dest: '/html/uploadTe',
			    exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
			  }
		},

	/**
	 * browserSync
	 * http://www.browsersync.io/docs/options/
	 * http://www.browsersync.io/docs/grunt/
	 */


	browserSync: {
		serve: {
			bsFiles: {
				src: [
					'<%=config.distDir%>/**/*.*',
					'**/*.html'
				]
			},
			options: {
				watchTask: true,
				server: './'
			}
		},

		styleguide: {
			bsFiles: {
				src: [
					'<%=config.distDir%>/**/*.*',
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
