let regeneratorRuntime = require("regenerator-runtime");!function(r,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("url")):"function"==typeof define&&define.amd?define(["url"],e):(r=r||self)["uni-crazy-router"]=e(r.url)}(this,function(m){"use strict";function t(r){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function c(r,e,t,n,a,o,u){try{var i=r[o](u),c=i.value}catch(r){return void t(r)}i.done?e(c):Promise.resolve(c).then(n,a)}function v(i){return function(){var r=this,u=arguments;return new Promise(function(e,t){var n=i.apply(r,u);function a(r){c(n,e,t,a,o,"next",r)}function o(r){c(n,e,t,a,o,"throw",r)}a(void 0)})}}function a(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function e(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function n(a){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?e(Object(o),!0).forEach(function(r){var e,t,n;n=o[t=r],t in(e=a)?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(r){Object.defineProperty(a,r,Object.getOwnPropertyDescriptor(o,r))})}return a}function i(r,e){null!=e&&e<=r.length||(e=r.length);for(var t=0,n=Array(e);t<e;t++)n[t]=r[t];return n}function s(r){if("undefined"==typeof Symbol||null==r[Symbol.iterator]){if(Array.isArray(r)||(r=function(r,e){if(r){if("string"==typeof r)return i(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?i(r,e):void 0}}(r))){var e=0,t=function(){};return{s:t,n:function(){return e<r.length?{done:!1,value:r[e++]}:{done:!0}},e:function(r){throw r},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a,o=!0,u=!1;return{s:function(){n=r[Symbol.iterator]()},n:function(){var r=n.next();return o=r.done,r},e:function(r){u=!0,a=r},f:function(){try{o||null==n.return||n.return()}finally{if(u)throw a}}}}m=m&&Object.prototype.hasOwnProperty.call(m,"default")?m.default:m;var b=[],o=[],h=[],d={allowAction:!0,routerParams:null,passedParams:null,current:{},afterNotNext:null},g=!1;function u(r,e){var t=r.indexOf(e);r.splice(t,1)}function P(){return r.apply(this,arguments)}function r(){return(r=v(regeneratorRuntime.mark(function r(e,t,n){var a,o,u,i,c;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:o=function(){d.afterNotNext=null,a=!1},a=!0,u=s(e),r.prev=3,u.s();case 5:if((i=u.n()).done){r.next=14;break}return c=i.value,r.next=9,c(t,n,o);case 9:if(a)return r.abrupt("return",!1);r.next=11;break;case 11:a=!0;case 12:r.next=5;break;case 14:r.next=19;break;case 16:r.prev=16,r.t0=r.catch(3),u.e(r.t0);case 19:return r.prev=19,u.f(),r.finish(19);case 22:return r.abrupt("return",!0);case 23:case"end":return r.stop()}},r,null,[[3,16,19,22]])}))).apply(this,arguments)}function w(r,e,t){r.forEach(function(r){r(e,t)})}function f(r){var e=d[r];return d[r]=null,e}function x(r,e){return"object"===t(r[e])&&(d[e]=n({},r[e])),r}function O(){var r=d.afterNotNext;d.afterNotNext=null,"function"==typeof r&&r()}function j(){return l.apply(this,arguments)}function l(){return(l=v(regeneratorRuntime.mark(function r(e,t,n){var a;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e;case 3:return 1===(a=r.sent).length&&(d.allowAction=!0,w(h,t,n)),r.abrupt("return",a);case 8:return r.prev=8,r.t0=r.catch(0),r.abrupt("return",Error(r.t0));case 11:case"end":return r.stop()}},r,null,[[0,8]])}))).apply(this,arguments)}function k(){var r=getCurrentPages();return r[r.length-1].route}function p(){var r=getCurrentPages();return r[r.length-1]}function y(){var r=p();return{url:k(),routeParams:r.$routeParams,passedParams:r.$passedParams}}function S(){g&&(d.allowAction=!0),g=!1}function A(e){var t=uni[e];uni[e]=function(r){return function(t,n,r){var a=this,o=n.fail,e=n.success,u=n.complete;if(!d.allowAction){var i="动作被拦截，因为已经有一个正在执行的路由动作";return o||e||u?n.fail&&n.fail({errMsg:i}):[{errMsg:i}]}g=d.allowAction=!1;var c,s=k();if("navigateBack"===r){var f=n.delta,l=void 0===f?1:f,p=getCurrentPages().length-1-l;p<0&&(p=0),c=getCurrentPages()[p].route}else c=m.resolve(s,n.url).replace(/^\/([^\/])/,"$1").replace(/([^?]+)\?[\s\S]*/,"$1");var y={url:c,routeParams:n.routeParams,passedParams:n.passedParams,jumpType:r};return o||e||u?(n.fail=function(){if(d.allowAction=!0,w(h,y,d.current),o){for(var r=arguments.length,e=Array(r),t=0;t<r;t++)e[t]=arguments[t];return o.apply(a,e)}},void v(regeneratorRuntime.mark(function r(){return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,P(b,y,d.current);case 2:if(r.sent){r.next=6;break}return n.fail({errMsg:"beforeEach中没有使用next"}),O(),r.abrupt("return");case 6:t.call(uni,x(x(n,"routeParams"),"passedParams")),g=!0;case 8:case"end":return r.stop()}},r)}))()):v(regeneratorRuntime.mark(function r(){var e;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,P(b,y,d.current);case 2:if(r.sent){r.next=6;break}return d.allowAction=!0,O(),r.abrupt("return",[{errMsg:"beforeEach中没有使用next"}]);case 6:return e=t.call(uni,x(x(n,"routeParams"),"passedParams")),g=!0,r.abrupt("return",j(e,y,d.current));case 9:case"end":return r.stop()}},r)}))()}(t,r,e)}}return new(function(){function r(){!function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r)}var e,t,n;return e=r,(t=[{key:"beforeEach",value:function(r){return b.push(r),function(){u(b,r)}}},{key:"afterEach",value:function(r){return o.push(r),function(){u(o,r)}}},{key:"onError",value:function(r){return h.push(r),function(){u(h,r)}}},{key:"afterNotNext",value:function(r){return d.afterNotNext=r,this}},{key:"install",value:function(r){return r.mixin({onLoad:function(){S(),p().$routeParams=this.$routeParams=f("routeParams")},onShow:function(){try{k()}catch(r){return}S(),p().$passedParams=this.$passedParams=f("passedParams"),w(o,y(),d.current),d.current=y()}}),A("navigateTo"),A("redirectTo"),A("reLaunch"),A("switchTab"),A("navigateBack"),this}}])&&a(e.prototype,t),n&&a(e,n),r}())});