module.exports.tasks = {

	/**
	 * ftp deploy 
	 * https://www.npmjs.com/package/grunt-ftp-deploy
	 */
	bake: {
	  build: {
	    files: {
			'index.html' : 'index_base.html',
			'section/index.html' : 'section/index_section.html'
			}
		}
	},

	'ftp-deploy': {
			  build: {
			    auth: {
			      host: 'server.com',
			      port: 21,
			      authKey: 'key1'
			    },
			    src: '<%=config.distDir%>',
			    dest: '/html/uploadTest/',
			    exclusions: ['<%=config.distDir%>/**/.DS_Store', '<%=config.distDir%>/**/Thumbs.db', 'path/to/dist/tmp']
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
