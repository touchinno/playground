(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{445:function(e,t,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var c=r.apply(null,a);c&&e.push(c)}else if("object"===o)for(var i in a)n.call(a,i)&&a[i]&&e.push(i)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},446:function(e,t,n){"use strict";n.d(t,"n",function(){return c}),n.d(t,"g",function(){return i}),n.d(t,"e",function(){return s}),n.d(t,"k",function(){return u}),n.d(t,"l",function(){return l}),n.d(t,"m",function(){return d}),n.d(t,"r",function(){return p}),n.d(t,"p",function(){return b}),n.d(t,"o",function(){return h}),n.d(t,"c",function(){return v}),n.d(t,"a",function(){return g}),n.d(t,"b",function(){return y}),n.d(t,"j",function(){return j}),n.d(t,"d",function(){return w}),n.d(t,"q",function(){return E}),n.d(t,"i",function(){return N}),n.d(t,"h",function(){return C}),n.d(t,"f",function(){return T});var a,r=n(3),o=n.n(r);function c(e){document.body.style.paddingRight=e>0?e+"px":null}function i(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function s(){var e=function(){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}(),t=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=t?parseInt(t.style.paddingRight||0,10):0;document.body.clientWidth<window.innerWidth&&c(n+e)}function u(e,t){return void 0===e&&(e=""),void 0===t&&(t=a),t?e.split(" ").map(function(e){return t[e]||e}).join(" "):e}function l(e,t){var n={};return Object.keys(e).forEach(function(a){-1===t.indexOf(a)&&(n[a]=e[a])}),n}function d(e,t){for(var n,a=Array.isArray(t)?t:[t],r=a.length,o={};r>0;)o[n=a[r-=1]]=e[n];return o}var f={};function p(e){f[e]||("undefined"!==typeof console&&console.error(e),f[e]=!0)}var m="object"===typeof window&&window.Element||function(){};var b=o.a.oneOfType([o.a.string,o.a.func,function(e,t,n){if(!(e[t]instanceof m))return new Error("Invalid prop `"+t+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")},o.a.shape({current:o.a.any})]),h=o.a.oneOfType([o.a.func,o.a.string,o.a.shape({$$typeof:o.a.symbol,render:o.a.func}),o.a.arrayOf(o.a.oneOfType([o.a.func,o.a.string,o.a.shape({$$typeof:o.a.symbol,render:o.a.func})]))]),v={Fade:150,Collapse:350,Modal:300,Carousel:600},g=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],y={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},j={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},w=!("undefined"===typeof window||!window.document||!window.document.createElement);function O(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}function E(e){var t=typeof e;if("number"===t)return e;if("symbol"===t||"object"===t&&"[object Symbol]"===O(e))return NaN;if(N(e)){var n="function"===typeof e.valueOf?e.valueOf():e;e=N(n)?""+n:n}if("string"!==t)return 0===e?e:+e;e=e.replace(/^\s+|\s+$/g,"");var a=/^0b[01]+$/i.test(e);return a||/^0o[0-7]+$/i.test(e)?parseInt(e.slice(2),a?2:8):/^[-+]0x[0-9a-f]+$/i.test(e)?NaN:+e}function N(e){var t=typeof e;return null!=e&&("object"===t||"function"===t)}function x(e){if(function(e){return!(!e||"object"!==typeof e)&&"current"in e}(e))return e.current;if(function(e){if(!N(e))return!1;var t=O(e);return"[object Function]"===t||"[object AsyncFunction]"===t||"[object GeneratorFunction]"===t||"[object Proxy]"===t}(e))return e();if("string"===typeof e&&w){var t=document.querySelectorAll(e);if(t.length||(t=document.querySelectorAll("#"+e)),!t.length)throw new Error("The target '"+e+"' could not be identified in the dom, tip: check spelling");return t}return e}function k(e){return null!==e&&(Array.isArray(e)||w&&"number"===typeof e.length)}function C(e,t){var n=x(e);return t?k(n)?n:null===n?[]:[n]:k(n)?n[0]:n}var T=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},447:function(e,t,n){"use strict";function a(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}n.d(t,"a",function(){return a})},448:function(e,t,n){"use strict";function a(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}n.d(t,"a",function(){return a})},449:function(e,t,n){"use strict";function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}n.d(t,"a",function(){return a})},454:function(e,t,n){"use strict";var a=n(56),r=n(447),o=n(449),c=n(448),i=n(2),s=n.n(i),u=n(3),l=n.n(u),d=n(445),f=n.n(d),p=n(446),m={active:l.a.bool,"aria-label":l.a.string,block:l.a.bool,color:l.a.string,disabled:l.a.bool,outline:l.a.bool,tag:p.o,innerRef:l.a.oneOfType([l.a.object,l.a.func,l.a.string]),onClick:l.a.func,size:l.a.string,children:l.a.node,className:l.a.string,cssModule:l.a.object,close:l.a.bool},b=function(e){function t(t){var n;return(n=e.call(this,t)||this).onClick=n.onClick.bind(Object(o.a)(n)),n}Object(c.a)(t,e);var n=t.prototype;return n.onClick=function(e){if(!this.props.disabled)return this.props.onClick?this.props.onClick(e):void 0;e.preventDefault()},n.render=function(){var e=this.props,t=e.active,n=e["aria-label"],o=e.block,c=e.className,i=e.close,u=e.cssModule,l=e.color,d=e.outline,m=e.size,b=e.tag,h=e.innerRef,v=Object(r.a)(e,["active","aria-label","block","className","close","cssModule","color","outline","size","tag","innerRef"]);i&&"undefined"===typeof v.children&&(v.children=s.a.createElement("span",{"aria-hidden":!0},"\xd7"));var g="btn"+(d?"-outline":"")+"-"+l,y=Object(p.k)(f()(c,{close:i},i||"btn",i||g,!!m&&"btn-"+m,!!o&&"btn-block",{active:t,disabled:this.props.disabled}),u);v.href&&"button"===b&&(b="a");var j=i?"Close":null;return s.a.createElement(b,Object(a.a)({type:"button"===b&&v.onClick?"button":void 0},v,{className:y,ref:h,onClick:this.onClick,"aria-label":n||j}))},t}(s.a.Component);b.propTypes=m,b.defaultProps={color:"secondary",tag:"button"},t.a=b},458:function(e,t,n){"use strict";n.d(t,"d",function(){return o}),n.d(t,"a",function(){return i}),n.d(t,"c",function(){return s}),n.d(t,"b",function(){return u}),n.d(t,"e",function(){return l});var a=n(459),r=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=new Headers(e);if(n&&localStorage.getItem(a.a)){var o=function(e){if(!e)return{username:""};return{username:e.substring(0,e.indexOf("&")),token:e.substring(e.indexOf("&")+1)}}(localStorage.getItem(a.a));r.append("Authorization","Bearer "+(o.token||""))}var c={headers:r};return t=Object.assign({},c,t),console.debug(t.url,t),fetch(t.url,t).then(function(e){return e.json().then(function(t){return e.ok?t:Promise.reject(t)})}).catch(function(e){throw 401===e.status&&(localStorage.removeItem(a.a),window.location.replace("/playground/")),e})};function o(e,t){return e+"&"+t}function c(){var e=new URL(a.b);return window.location.protocol+"//"+window.location.host+e.pathname}function i(e){return r({"Content-Type":"application/x-www-form-urlencoded"},{url:c()+"/authenticate",method:"POST",body:Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&")},!1)}function s(e,t){return null!=e&&-1!==(e.roles||[]).indexOf(t)}function u(e,t){return r({},{url:a.c+"https://api.dictionaryapi.dev/api/v2/entries/"+encodeURIComponent(e)+"/"+encodeURIComponent(t),method:"GET"},!1)}function l(e,t,n){return r({"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8","X-Naver-Client-Id":"VWeFHcSBRHPp7iRY8fAU","X-Naver-Client-Secret":"bghRympbEx"},{url:a.c+"https://openapi.naver.com/v1/papago/n2mt",method:"POST",body:"source="+encodeURIComponent(e)+"&target="+encodeURIComponent(t)+"&text="+encodeURIComponent(n)},!1)}},459:function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return o});var a="http://127.0.0.1:7778/api",r="https://analytics.voluto.net/api/proxy/me?url=",o="accessToken"},464:function(e,t,n){"use strict";var a=n(56),r=n(447),o=n(2),c=n.n(o),i=n(3),s=n.n(i),u=n(445),l=n.n(u),d=n(446),f={tag:d.o,fluid:s.a.oneOfType([s.a.bool,s.a.string]),className:s.a.string,cssModule:s.a.object},p=function(e){var t=e.className,n=e.cssModule,o=e.fluid,i=e.tag,s=Object(r.a)(e,["className","cssModule","fluid","tag"]),u="container";!0===o?u="container-fluid":o&&(u="container-"+o);var f=Object(d.k)(l()(t,u),n);return c.a.createElement(i,Object(a.a)({},s,{className:f}))};p.propTypes=f,p.defaultProps={tag:"div"},t.a=p},465:function(e,t,n){"use strict";var a=n(56),r=n(447),o=n(2),c=n.n(o),i=n(3),s=n.n(i),u=n(445),l=n.n(u),d=n(446),f=s.a.oneOfType([s.a.number,s.a.string]),p={tag:d.o,noGutters:s.a.bool,className:s.a.string,cssModule:s.a.object,form:s.a.bool,xs:f,sm:f,md:f,lg:f,xl:f},m={tag:"div",widths:["xs","sm","md","lg","xl"]},b=function(e){var t=e.className,n=e.cssModule,o=e.noGutters,i=e.tag,s=e.form,u=e.widths,f=Object(r.a)(e,["className","cssModule","noGutters","tag","form","widths"]),p=[];u.forEach(function(t,n){var a=e[t];if(delete f[t],a){var r=!n;p.push(r?"row-cols-"+a:"row-cols-"+t+"-"+a)}});var m=Object(d.k)(l()(t,o?"no-gutters":null,s?"form-row":"row",p),n);return c.a.createElement(i,Object(a.a)({},f,{className:m}))};b.propTypes=p,b.defaultProps=m,t.a=b},466:function(e,t,n){"use strict";var a=n(56),r=n(447),o=n(2),c=n.n(o),i=n(3),s=n.n(i),u=n(445),l=n.n(u),d=n(446),f=s.a.oneOfType([s.a.number,s.a.string]),p=s.a.oneOfType([s.a.bool,s.a.number,s.a.string,s.a.shape({size:s.a.oneOfType([s.a.bool,s.a.number,s.a.string]),order:f,offset:f})]),m={tag:d.o,xs:p,sm:p,md:p,lg:p,xl:p,className:s.a.string,cssModule:s.a.object,widths:s.a.array},b={tag:"div",widths:["xs","sm","md","lg","xl"]},h=function(e,t,n){return!0===n||""===n?e?"col":"col-"+t:"auto"===n?e?"col-auto":"col-"+t+"-auto":e?"col-"+n:"col-"+t+"-"+n},v=function(e){var t=e.className,n=e.cssModule,o=e.widths,i=e.tag,s=Object(r.a)(e,["className","cssModule","widths","tag"]),u=[];o.forEach(function(t,a){var r=e[t];if(delete s[t],r||""===r){var o=!a;if(Object(d.i)(r)){var c,i=o?"-":"-"+t+"-",f=h(o,t,r.size);u.push(Object(d.k)(l()(((c={})[f]=r.size||""===r.size,c["order"+i+r.order]=r.order||0===r.order,c["offset"+i+r.offset]=r.offset||0===r.offset,c)),n))}else{var p=h(o,t,r);u.push(p)}}}),u.length||u.push("col");var f=Object(d.k)(l()(t,u),n);return c.a.createElement(i,Object(a.a)({},s,{className:f}))};v.propTypes=m,v.defaultProps=b,t.a=v},509:function(e,t,n){"use strict";var a=n(56),r=n(447),o=n(2),c=n.n(o),i=n(3),s=n.n(i),u=n(445),l=n.n(u),d=n(446),f={tag:d.o,inverse:s.a.bool,color:s.a.string,body:s.a.bool,outline:s.a.bool,className:s.a.string,cssModule:s.a.object,innerRef:s.a.oneOfType([s.a.object,s.a.string,s.a.func])},p=function(e){var t=e.className,n=e.cssModule,o=e.color,i=e.body,s=e.inverse,u=e.outline,f=e.tag,p=e.innerRef,m=Object(r.a)(e,["className","cssModule","color","body","inverse","outline","tag","innerRef"]),b=Object(d.k)(l()(t,"card",!!s&&"text-white",!!i&&"card-body",!!o&&(u?"border":"bg")+"-"+o),n);return c.a.createElement(f,Object(a.a)({},m,{className:b,ref:p}))};p.propTypes=f,p.defaultProps={tag:"div"},t.a=p},510:function(e,t,n){"use strict";var a=n(56),r=n(447),o=n(2),c=n.n(o),i=n(3),s=n.n(i),u=n(445),l=n.n(u),d=n(446),f={tag:d.o,className:s.a.string,cssModule:s.a.object,innerRef:s.a.oneOfType([s.a.object,s.a.string,s.a.func])},p=function(e){var t=e.className,n=e.cssModule,o=e.innerRef,i=e.tag,s=Object(r.a)(e,["className","cssModule","innerRef","tag"]),u=Object(d.k)(l()(t,"card-body"),n);return c.a.createElement(i,Object(a.a)({},s,{className:u,ref:o}))};p.propTypes=f,p.defaultProps={tag:"div"},t.a=p},576:function(e,t,n){"use strict";n.r(t);var a=n(472),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=n(473),i=n(140),s=n(141),u=n(143),l=n(142),d=n(144),f=n(57),p=n(2),m=n.n(p),b=n(464),h=n(465),v=n(466),g=n(56),y=n(447),j=n(3),w=n.n(j),O=n(445),E=n.n(O),N=n(446),x={tag:N.o,className:w.a.string,cssModule:w.a.object},k=function(e){var t=e.className,n=e.cssModule,a=e.tag,r=Object(y.a)(e,["className","cssModule","tag"]),o=Object(N.k)(E()(t,"card-group"),n);return m.a.createElement(a,Object(g.a)({},r,{className:o}))};k.propTypes=x,k.defaultProps={tag:"div"};var C=k,T=n(509),R=n(510),S=n(556),M=n(474),I=n(475),P=n(453),A=n(476),U=n(557),z=n(454),$=n(458),G=n(459),F=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).handleChange=function(){var e=Object(c.a)(r.a.mark(function e(t){var a,c,i;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.target,c="checkbox"===a.type?a.checked:a.value,i=a.name,e.next=5,n.setState(o({},i,c));case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.state={username:"",password:"",validate:{}},n.handleChange=n.handleChange.bind(Object(f.a)(Object(f.a)(n))),n.handleSubmit=n.handleSubmit.bind(Object(f.a)(Object(f.a)(n))),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"validate",value:function(e){var t=this.state.validate;e.target.value&&e.target.value.trim().length>0?t[e.target.name]="Y":t[e.target.name]="N",this.setState({validate:t})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n=!0,a=this.state.validate;Object.keys(a).forEach(function(e){"Y"!==a[e]&&(n=!1)}),n&&Object($.a)({username:this.state.username,password:this.state.password}).then(function(e){localStorage.setItem(G.a,Object($.d)(t.state.username,e.token)),t.props.onLogin(),a.error="N",t.setState({validate:a}),t.props.history.push("/")}).catch(function(e){e.status,a.error="Y",t.setState({validate:a})})}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{className:"app flex-row align-items-center"},m.a.createElement(b.a,null,m.a.createElement(h.a,{className:"justify-content-center"},m.a.createElement(v.a,{md:"8"},m.a.createElement(C,null,m.a.createElement(T.a,{className:"p-4"},m.a.createElement(R.a,null,m.a.createElement(S.a,{onSubmit:function(t){return e.handleSubmit(t)}},m.a.createElement("h1",null,"Login"),m.a.createElement("p",{className:"text-muted"},"Sign In to your account"),m.a.createElement(M.a,{className:"mb-3"},m.a.createElement(I.a,{addonType:"prepend"},m.a.createElement(P.a,null,m.a.createElement("i",{className:"icon-user"}))),m.a.createElement(A.a,{type:"text",name:"username",placeholder:"Username",autoComplete:"username",value:this.state.username,valid:"Y"===this.state.validate.username,invalid:"N"===this.state.validate.username,onChange:function(t){e.validate(t),e.handleChange(t)}}),m.a.createElement(U.a,{invalid:!0},"Please input a correct username.")),m.a.createElement(M.a,{className:"mb-4"},m.a.createElement(I.a,{addonType:"prepend"},m.a.createElement(P.a,null,m.a.createElement("i",{className:"icon-lock"}))),m.a.createElement(A.a,{type:"password",name:"password",placeholder:"Password",autoComplete:"current-password",value:this.state.password,valid:"N"===this.state.validate.error,invalid:"Y"===this.state.validate.error,onChange:this.handleChange}),m.a.createElement(U.a,{invalid:!0},"Can't login, please input correct username/password!")),m.a.createElement(h.a,null,m.a.createElement(v.a,{xs:"6"},m.a.createElement(z.a,{color:"primary",className:"px-4"},"Login")),m.a.createElement(v.a,{xs:"6",className:"text-right"}))))))))))}}]),t}(p.Component);t.default=F}}]);
//# sourceMappingURL=7.e185167f.chunk.js.map