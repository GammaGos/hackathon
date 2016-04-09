var yuantu = (function(undefined) {

	var yuan = {};
	yuan.clone = function(obj, attrs) {
		var cloned = {};
		attrs.forEach(function(attr) {
			if (obj.hasOwnProperty(attr)) {
				cloned[attr] = obj[attr];
			}
		});
		return cloned;
	};

	var agent = {};
	var proxy = {};
	var TU = {};

	proxy._SERVICES = [ 'AMap.Driving', 'AMap.Geocoder' ];
	proxy.require = (function() {

		var _ME = {};

		var _Module = function(name) {
			this.name = name;
			this.status = 'nothing';

			this._listeners = {};
		};

		_Module.prototype.on = function(eventName, fn) {
			if (!this._listeners[eventName]) {
				this._listeners[eventName] = [];
			}
			this._listeners[eventName].push(fn);
		};

		_Module.prototype.fire = function(eventName, data) {
			var listeners = this._listeners[eventName];
			if (listeners) {
				listeners.forEach(function(fn) {
					fn(data);
				});
				this._listeners = [];
			}
		};

		_ME.modules = {};

		_ME.get = function(name) {
			if (!_ME.modules[name]) {
				_ME.modules[name] = new _Module(name);
			}
			return _ME.modules[name];
		};

		_ME.load = function(name, callback) {
			var module = _ME.get(name);
			var onready = function() {
				callback(module.export);
			};

			switch(module.status) {
				case 'ready':
					onready();
					break;

				case 'loading':
					module.on('ready', onready);
					break;

				case 'nothing':
					module.on('ready', onready);
					AMap.service(name, function() {
						module.status = 'ready';
						module.export = eval(name);
						module.fire('ready');
					});
					break;

				default:
			}
		};

		return function(/*name, name, callback*/) {
			var names = [], callback, modules = [], count, counter = 0;

			count = arguments.length - 1;
			callback = arguments[count];
			for (var i = 0; i < count; i++) names.push(arguments[i]);

			names.forEach(function(name) {
				_ME.load(name, function(module) {
					var i = names.indexOf(name);
					modules[i] = module;
					counter++;
					if (counter == count) {
						callback && callback.apply(null, modules);
					}
				});
			});
		};
	})();

	agent.addMarker = function(options, callback) {
		// TODO: 参数检测

		var _do = function() {
			var config = yuan.clone(options, [
				'icon',
				'map',
				'position'
				]);
			var marker = new AMap.Marker(config);
			callback && callback(marker);
		};

		if (options.address) {
			var point = {
				city: options.city,
				address: options.address
			};
			agent.queryLocation(point, function(loc) {
				options.position = loc;
				_do();
			});
		}
		else {
			_do();
		}
	};

	agent.queryLocation = function(options, callback) {
		if (options instanceof AMap.LngLat) {
			callback(options);
		}
		else if (options.location) {
			callback(options.location);
		}
		else if (options.address) {
			proxy.require('AMap.Geocoder', function(Geocoder) {
				var config = yuan.clone(options, [
					'city'
					]);
				var geocoder = new AMap.Geocoder(config);
				geocoder.getLocation(options.address, function(status, result) {
					var loc = result.geocodes[0].location;
					callback(loc);
				});
			})
		}
		else {
			throw 'Invalid conditions to confirm the location.';
		}
	};

	agent.queryLocations = function(options, callback) {
		var locs = [], count = options.length, counter = 0;
		options.forEach(function(point, index) {
			agent.queryLocation(point, function(loc) {
				locs[index] = loc;
				counter++;
				if (counter == count) callback(locs);
			});
		});
	};

	agent.addLine = function(options, callback) {
		agent.queryLocations(options.points, function(locs) {
			var config = yuan.clone(options, [
				'geodesic',
				'isOutline',
				'outlineColor',
				'map',
				'strokeColor',
				'strokeDasharray',
				'strokeOpacity',
				'strokeStyle',
				'strokeWeight'
				]);
			config.path = locs;
			var line = new AMap.Polyline(config);
			line.show();
			callback && callback(line);
		});
	};

	agent.addPath = function(options, callback) {
		var serviceName = options.type ? options.type : 'AMap.Driving';
		proxy.require(serviceName);
		agent.queryLocations(options.points, function(locs) {
			proxy.require(serviceName, function(Service) {
				var config = yuan.clone(options, [
					'hideMarkers',
					'map'
					]);
				var serv = new Service(config);
				serv.search.bind(serv).apply(null, locs);
				callback && callback(serv);
			});
		});
	};

	agent.initMap = function(options) {
		var config = yuan.clone(options, [
			'center',
			'resizeEnable',
			'zoom'
			]);
		var map = new AMap.Map(options.container, config);

		if (options.plugins) {
			map.plugin(options.plugins, function() {
				options.plugins.forEach(function(name) {
					var Plugin = eval(name);
					var ctrl = new Plugin();
					map.addControl(ctrl);
				})
			});
		}

		return map;
	};

	// 基类
	// 在子类构造函数中执行 new MapBase(this) 继承
	var MapBase = function(instance) {
		this._eventQueue = {};
		this._statusQueue = {};
		this._status = {};

		for (var i in this) {
			instance[i] = this[i];
		}
	};

	// 注册事件响应函数
	MapBase.prototype.on = function(eventName, fn) {
		if (!this._eventQueue[eventName]) this._eventQueue[eventName] = [];
		this._eventQueue[eventName].push(fn);
	};

	// 触发事件，执行此前注册的事件响应函数
	MapBase.prototype.fire = function(eventName, data) {
		if (this._eventQueue[eventName]) {
			this._eventQueue[eventName].forEach(function(fn) {
				fn.call(null, data);
			});
			// 重置队列
			this._eventQueue[eventName] = [];
		}
	};

	// 如果状态为真，则直接执行函数
	// 如果状态非真，则挂起函数直至状态为真时执行
	MapBase.prototype.until = function(statusName, fn) {
		if (this._status[statusName]) return fn() && undefined;

		if (!this._statusQueue[statusName]) this._statusQueue[statusName] = [];
		this._statusQueue[statusName].push(fn);
	};

	// 状态置真
	MapBase.prototype.set = function(statusName) {
		this._status[statusName] = true;
		if (this._statusQueue[statusName]) {
			this._statusQueue[statusName].forEach(function(fn) {
				fn.call(null);
			});
			// 重置队列
			this._statusQueue[statusName] = [];
		}
	};

	MapBase.prototype.attachTo = function(map) {
		var that = this;
		this.until('ready', function() {
			that._instance.setMap(map._instance);
		});
	};

	MapBase.prototype.detach = function() {
		var that = this;
		this.until('ready', function() {
			that._instance.setMap(null);
		});
	};

	var MapGroup = function(instances) {
		this._instances = instances;
		this._statusQueue = {};
	};

	MapGroup.prototype.until = function(statusName, fn) {
		var count = this._instances.length, counter = 0;
		this._instances.forEach(function(instance) {
			instance.until(statusName, function() {
				if (++counter == count) fn();
			});
		});
	};

	TU.Map = function(options) {
		this._instance = agent.initMap({
			container: options.container,
			plugins: [ 'AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation' ]
		});
	};
	TU.Map.prototype.active = function() {
		TU.current = this;
	};

	TU.Map.prototype.moveTo = function(marker) {
		var that = this;
		marker.until('ready', function() {
			that._instance.setCenter(marker._instance.getPosition());
		});
	};

	TU.Marker = function(options) {
		new MapBase(this);
		var that = this;

		// @temp
		options.icon = './img/dot01.png';

		var config = yuan.clone(options, [ 'icon', 'address', 'location' ]);
		agent.addMarker(config, function(marker) {
			that._instance = marker;
			that.set('ready');
		});

		TU.current && this.attachTo(TU.current);
	};

	TU.Marker.prototype.focus = function() {
		var map = this._instance.getMap();
		if (map) {
			map.setCenter(this._instance.getPosition());
			this._instance.setAnimation('AMAP_ANIMATION_DROP');
		}
	};

	TU.Marker.prototype.queryCity = function(callback) {
		var that = this;
		this.until('ready', function() {
			proxy.require('AMap.Geocoder', function(Geocoder) {
				var geocoder = new AMap.Geocoder();
				geocoder.getAddress(that._instance.getPosition(), function(status, result) {
					var addr = result.regeocode.addressComponent;
					var city = addr.city ? addr.city : addr.province;
					callback(city);
				});
			});
		});
	};

	TU.Marker.prototype.highlight = function() {

	};

	TU.Line = function(start, end) {
		new MapBase(this);
		var that = this;
		var markers = [ start, end ];
		var group = new MapGroup(markers);
		group.until('ready', function() {
			var points = [];
			markers.forEach(function(marker) {
				points.push(marker._instance.getPosition());
			});
			agent.addLine({
				geodesic: true,
				strokeStyle: 'dashed',
				strokeDasharray: [10,2,2,2],
				points: points,
			}, function(line) {
				that._instance = line;
				that.set('ready');
			});
		});

		TU.current && this.attachTo(TU.current);
	};

	TU.Line.prototype.focus = function() {
		var that = this;
		this.until('ready', function() {
			var map = that._instance.getMap();
			if (map) {
				map.setFitView(that._instance);
			}
		});
	};

	TU.Line.prototype.highligh = function(on) {
		on = (on !== false);

		var OPTIONS_HIGHLIGHT = {
			isOutline: true,
			outlineColor: '#0000ff'
		};
		var OPTIONS_NORMAL = {
			isOutline: false
		};

		var that = this;
		var map = this._instance.getMap();
		if (on) {
			that._instance.setOptions(OPTIONS_NORMAL);
		}
		else if (map) {
			map.setFitView(this._instance);
			this._instance.setOptions(OPTIONS_HIGHLIGHT);
		}
	};

	TU.Path = function(start, end) {
		new MapBase(this);
		this.attachTo = null;
		this.detach = null;

		var that = this;
		var markers = [ start, end ];
		var group = new MapGroup(markers);
		group.until('ready', function() {
			var points = [];
			markers.forEach(function(marker) {
				points.push(marker._instance.getPosition());
			});
			that._points = points;
			var config = {
				map: markers[0]._instance.getMap(),
				type: 'AMap.Driving',
				hideMarkers: true,
				points: points,
			};
			agent.addPath(config, function(path) {
				that._instance = path;
				that.set('ready');
			});
		});
	};

	TU.Path.prototype.clear = function() {
		var that = this;
		this.until('ready', function() {
			that._instance.clear();
		});
	};

	TU.Path.prototype.search = function() {
		var that = this;
		this.until('ready', function() {
			that._instance.search();
		});
	};

	return TU;
})();
