module.exports=function (grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		meta: {
            basePath: '',
            srcPath: 'source/sass/',
            deployPath: 'build/css/'
        },
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
			options:{
				banner: '/* 压缩后的扩展样式表 */'
			},
			minify: {
			    expand: true,        // 启用下面的选项
			    cwd: 'build/css/',    // 指定待压缩的文件路径
			    src: ['*.css', '!*.min.css'],    // 匹配相对于cwd目录下的所有css文件(排除.min.css文件)
			    dest: 'public/css/',    // 生成的压缩文件存放的路径
			    ext: '.min.css'        // 生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
		  	}
		},
		copy: {
			dev:{
				src:'build/*',
				dest:'public/'
			},
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
		sass:{
			build:{
				files:{
					'<%= meta.deployPath %>main.css': '<%= meta.srcPath %>main.scss'
				},
				options: {
                    sourcemap: 'auto'
                }
			}
		},
		less:{
			dev:{
				files:{
					"public/css/main.css":"source/less/main.less"
				}
			},
			build:{
				files:{
					"build/css/main.css":"source/less/main.less"
				}
			}
		},
		connect:{
			site1:{
				options:{
					port:8080,
					protocal:"http",  //默认为http协议，可选"http"或"https"
					hostname:"*",	  //默认就是这个值，可配置为本机某个 IP，localhost 或域名
					//livereload:35729,  //声明给 watch 监听的端口，允许无刷新调试
					//directory:        //设置允许访问的路径。
					//keepalive:false   //保持长连接，默认为false
					base:{                        //默认为Gruntfile.js的同路径，可以定义为3种类型，1#字符串:"public"，设置根目录；2#数组:['public','www-root'],
						path:".",                 //设定允许访问的路径；3#对象类型:{ path: 'public', options: { maxAge: 1000*60*5 } },设置默认访问路径和生命时长。
						options:{
							index:"index.html"
						}
					},
					open:true            //默认为false，设置成true表示自动打开网页 http:// ,更多设置参考官方文档     			
				}
			}
		},
		watch:{
			sass:{
				files:'source/sass/**/*.scss',
				tasks:'sass'
			},
			less:{
				files:'source/**/*.less',
				tasks:'less:dev'
			}
		}
	});
	require('load-grunt-tasks')(grunt);                               
	grunt.registerTask('default',['less','connect:site1','watch']);
	grunt.registerTask('watchSass',['watch:sass']);
	grunt.registerTask('dev',['watch:less']);
	grunt.registerTask('copy',['copy:build']);
	grunt.registerTask('yasuo', ['uglify']);
	grunt.registerTask('cssgo',['sass','cssmin']);
	grunt.registerTask('remove',['clean']);                        //不要把任务名和方法名重名，会报错的 比如：grunt.registerTask('clean',['clean']); 
}