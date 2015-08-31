+function ($) {
	'use strict';

	var Tooltip = function (element,options) {
		//设定属性
		this.type 	    = null
		this.options    = null
		this.enabled    = null
		this.timeout    = null
		this.hoverState = null
		this.$element   = null
		//初始化
		this.init('tooltip',element,options)
	}
	//设置全局常量，动画时间150ms
	Tooltip.TRANSITION_DURATION = 150;
	//默认参数
	Tooltip.DEFAULTS = {
		animate:true,        
		placement:'top',
		selector:false,
		template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger:'hover focus',
		title:'',
		delay:0,
		html:false,
		container:false,
		viewport:{
			selector:'body',
			padding:0
		}
	}
	//初始化方法
	Tooltip.prototype.init = function(type,element,options) {
		this.enabled   = true
		this.type      = type
		this.$element  = $(element)
		this.options   = this.getOptions(options);                    //获取合并后的参数
		this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)  //如果参数表里viewport存在的话就返回selector

		//判断当前元素如果是document 并且 未设置selector ，抛出错误
		if (this.$element[0] instanceof document.constructor && !this.options.selector) {
			throw new Error('window对象初始化'+this.type+'时必须指定`selector`属性')
		};

		//绑定事件
		var triggers = this.options.trigger.split(' ');

		for (var i = triggers.length - 1; i >= 0; i--) {
			var trigger = triggers[i]
			//click事件
			if (trigger == 'click') {
				this.$element.on('click' + this.type, this.options.selector, $.proxy(this.toggle,this));  //绑定toggle切换方法
			}else if (trigger != 'manual') {
				var eventIn = trigger == 'hover' ? 'mouseenter':'focusin'
				var eventOut = trigger == 'hover'? 'mouseleave':'focusout'

				this.$element.on(eventIn + '.' +this.type, this.options.selector, $.proxy(this.enter, this)); //绑定enter方法
				this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this)) //绑定leave方法
			};
		};

		this.options.selector ? (this._options = $.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()
	};
	//获取默认属性
	Tooltip.prototype.getDefaults = function() {
		return Tooltip.DEFAULTS;
	};
	//获取合并参数，合并默认，data参数，自定义参数
	Tooltip.prototype.getOptions = function(options) {
		options = $.extend({},this.getDefaults(),this.$element.data(),options);   //合并默认，data-属性和options属性
		//合并参数delay是数值的话，设置两个参数
		if (options.delay && typeof options.delay == "number") {
			options.delay = {
				show: options.delay,
				hide: options.delay
			}
		};

		return options
	};
	//获取委托参数
	Tooltip.prototype.getDelegateOptions = function() {
		var options ={}
		var defaults = this.getDefaults()
		//委托目标_options参数，
		this._options && $.each(this._options, function (key,value) {
			if (defaults[key] != value) options[key] = value;   //遍历_options，如果默认参数和_options不符，
                                                                //更新参数到options上
		});
	};
	//enter进入函数
	Tooltip.prototype.enter = function(obj) {
		//如果目标是对象的实例，就指向；如果不是获取bs.tooltip对应的对象实例
		var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.'+this.type) //obj.currentTarget获取当前点击对象
		//如果对象及对象的模板及对象模板是可视的
		if (self && self.$tip && self.$tip.is(':visible')) {
			self.hoverState ='in'            //设置参数hoverState状态为in
			return
		};
		//这个回头再看看，大致意思是如果没目标，就根据构造函数创建一个然后传给data属性bs.tooltips
		if (!self) {
			self = new this.constructor(obj.currentTarget,this.getDelegateOptions());
			$(obj.currentTarget).data('bs.' + this.type, self)
		};

		clearTimeout(self.timeout)

		self.hoverState = 'in'
		//如果delay属性不存在立刻show();
		if (!self.options.delay || !self.options.delay.show) return  self.show();
		//
		self.timeout = setTimeout(function () {
			if (self.hoverState == 'in') self.show();
		},self.options.delay.show)
	};

	Tooltip.prototype.leave = function(obj) {
		var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type)

		if (!self) {
	      	self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      	$(obj.currentTarget).data('bs.' + this.type, self)
    	}

    	clearTimeout(self.timeout)

	    self.hoverState = 'out'

	    if (!self.options.delay || !self.options.delay.hide) return self.hide()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide()
	    }, self.options.delay.hide)
	};

	Tooltip.prototype.show = function() {
		//创建事件
		var e = $.Event('show.bs.' + this.type);
		//如果
		if (this.hasContent() && this.enabled) {
			this.$element.trigger(e)
			//ownerDocument返回的是某个元素的根节点文档对象（即document对象），而documentElement 返回的就是文档根节点
			//contains申明目标是否包含在文档根节点中
			var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]); 
			//判断默认事件是否被阻止
			if (e.isDefaultPrevented() || !inDom) return
			var that = this

			var $tip = this.tip()    //获取模板

			var tipId = this.getUID(this.type) //获取随机生成的UID

			this.setContent()
			//设置id
			$tip.attr('id', tipId);
			this.$element.attr('aria-describedby', tipId); //设置aria-describedby属性

			if (this.options.animate) $tip.addClass('fade');

			var placement = typeof this.options.placement == 'function' ? 
				this.options.placement.call(this,$tip[0],this.$element[0]) :
				this.options.placement

			var autoToken = /\s?auto?\s?/i
			var autoPlace = autoToken.test(placement)
			if (autoPlace) placement = placement.replace(autoToken,'')||'top'

			//先缓存模板然后再添加样式。detach()用法参考 http://www.css88.com/jqapi-1.9/detach/
			//.detach() 方法和.remove()一样, 除了 .detach()保存所有jQuery数据和被移走的元素相关联。
			//当需要移走一个元素，不久又将该元素插入DOM时，这种方法很有用。
			$tip.detach().css({ top: 0, left: 0, display:'block' }).addClass('placement').data('bs.' + this.type, this)

			this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

			var pos         = this.getPosition()
		};
	};
	//给提示框赋值，初始化提示框的样式
	Title.prototype.setContent = function() {
		var $tip = this.tip()
		var title = this.getTitle()

		$tip.find('.tooltip-inner')[this.options.html ? 'html' :'text'](title)
		$tip.removeClass('fade in top bottom left right')
	};
	//被点击标签的title属性值转给data-original-title属性，最后删除title属性
	Tooltip.prototype.fixTitle = function() {
		var $e = this.$element
		if ($e.attr('title')||typeof ($e.attr('data-original-title')) != 'string') {
			$e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
		};
	};
	//获取title
	Tooltip.prototype.getTitle = function() {
		var title 
		var $e = this.$element
		var o = this.options

		//获取data-original-title属性，如果options.title是一个function的话，切换作用域this.$element上
		title = $e.attr('data-original-title') || (typeof o.title =='function' ? o.title.call($e[0] : o.title))  

		return title 
	};
	//随机生成UID
	Tooltip.prototype.getUID = function(prefix) {
		do prefix += ~~(Math.random()*1000000)
		while(document.getElementById(prefix))
		return prefix
	};
	//获取tooltip模板
	Tooltip.prototype.tip = function() {
		return (this.$tip = this.$tip || $(this.options.template))
	};
	//
	Tooltip.prototype.hasContent = function() {
		return this.getTitle()
	};
	Tooltip.prototype.getPosition = function($element) {
		// body...
	};
	Tooltip.prototype.enable = function() {
		this.enable = true
	};
}(jQuery);