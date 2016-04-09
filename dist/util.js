function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var Events = {
    once: function(el, type, callback){
        var typeArray = type ? type.split(' ') : [];
        var recursiveFunction = function(e){
            e.target.removeEventListener(e.type, recursiveFunction);
            return callback(e);
        };

        for (var i = typeArray.length - 1; i >= 0; i--) {
            this.on(el, typeArray[i], recursiveFunction);
        }
    },

    on: function(el, type, callback){
        if (el.addEventListener) {
            el.addEventListener(type, callback);
        }
        else {
            // IE8+ Support
            el.attachEvent('on' + type, function(){
                callback.call(el);
            });
        }
    },

    off: function(){
        if (el.removeEventListener) {
            el.removeEventListener(type, callback);
        }
        else {
            // IE8+ Support
            el.detachEvent('on' + type, callback);
        }
    }
}


/* mixin */
var WindowListenable = {

    componentDidMount: function(){
        var listeners = this.windowListeners;

        for(var eventName in listeners){
           var callback = listeners[eventName];
            Events.on(window, eventName, this[callbackName]);
        }
    },

    componentWillUnmount: function(){
        var listeners = this.windowListeners;

        for (var  eventName in listeners) {
            var callbackName = listeners[eventName];
            Events.off(window, eventName, this[callbackName]);
        }
    }
}