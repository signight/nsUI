module.exports=function (grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		//合并js
		concat:{
			options:{
				//定义一个用于插入合并输出文件之间的字符
				separator: ';'
			},
			dist:{
				//用于连接的文件
				src:['source/**/*.js'],
				//返回的JS文件位置
				dest:'build/js/<%=pkg.name%>.js'
			}
		},
		//压缩js
		uglify:{
			options:{
				//生成一个banner注释并插入到输出文件的顶部
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build:{
				src:'source/<%=pkg.name %>.js',
				dest:'build/<%=pkg.name%>.min.js'
			}
		},
		//合并压缩CSS
		cssmin:{
			combine:{
				files:{
					'dist/x.css':'build/*.css'
				}
			},
			minify:{
				expand:true,
				cwd:'css/',
				src:['*.css','!*.min.css'],
				dest:'css/',
				ext:'.min.css'
			}
		},
		copy: {
	      	build: {
		        src: 'source/*',
    			dest: 'build/',
	      	}
	    },
		clean: {
		  	build: {
		    	src: ["build/**/*"]
		  }
		},
		less:{
			build:{
				files:{
					"build/css/main.css":"source/less/main.less"
				}
			}
		},
		watch:{
			less:{
				files:'source/**/*.less',
				tasks:'less'
			}
		}
	});
	require('load-grunt-tasks')(grunt);
	grunt.registerTask('default',['less']);
	grunt.registerTask('copy',['copy:build']);
	grunt.registerTask('yasuo', ['uglify']);
	grunt.registerTask('cssyasuo',['cssmin:combine']);
	grunt.registerTask('clean',['clean']);
}