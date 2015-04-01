module.exports=function (grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		//压缩js
		uglify:{
			options:{
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build:{
				src:'source/<%=pkg.name %>.js',
				dest:'build/<%=pkg.name%>.min.js'
			}
		}
		// copy:{
		// 	build:{
		// 		cwd:'source',
		// 		src:['**'],
		// 		dest:'build',
		// 		expand:true
		// 	}
		// }
		// less:{
		// 	dist:{
		// 		files:{
		// 			"build/css/main.css":"source/less/main.less"
		// 		}
		// 	}
		// },
		// watch:{
		// 	less:{
		// 		files:'source/**/*.less',
		// 		tasks:'less'
		// 	}
		// }
	});
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default',['less']);
	grunt.registerTask('copy',['copy:build']);
	grunt.registerTask('yasuo', ['uglify']);
}