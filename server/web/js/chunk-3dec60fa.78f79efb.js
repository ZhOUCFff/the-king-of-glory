(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3dec60fa"],{"2e78":function(t,e,n){},"5a0c":function(t,e,n){!function(e,n){t.exports=n()}(0,(function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",a="month",u="quarter",c="year",o=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},h={s:l,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+l(r,2,"0")+":"+l(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,a),i=e-r<0,s=t.clone().add(n+(i?-1:1),a);return Number(-(n+(e-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(o){return{M:a,y:c,w:s,d:i,h:r,m:n,s:e,ms:t,Q:u}[o]||String(o||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$="en",p={};p[$]=d;var v=function(t){return t instanceof D},m=function(t,e,n){var r;if(!t)return $;if("string"==typeof t)p[t]&&(r=t),e&&(p[t]=e,r=t);else{var i=t.name;p[i]=t,r=i}return n||($=r),r},y=function(t,e,n){if(v(t))return t.clone();var r=e?"string"==typeof e?{format:e,pl:n}:e:{};return r.date=t,new D(r)},g=h;g.l=m,g.i=v,g.w=function(t,e){return y(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var D=function(){function l(t){this.$L=this.$L||m(t.locale,null,!0),this.parse(t)}var h=l.prototype;return h.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(o);if(r)return n?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(e)}(t),this.init()},h.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},h.$utils=function(){return g},h.isValid=function(){return!("Invalid Date"===this.$d.toString())},h.isSame=function(t,e){var n=y(t);return this.startOf(e)<=n&&n<=this.endOf(e)},h.isAfter=function(t,e){return y(t)<this.startOf(e)},h.isBefore=function(t,e){return this.endOf(e)<y(t)},h.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},h.year=function(t){return this.$g(t,"$y",c)},h.month=function(t){return this.$g(t,"$M",a)},h.day=function(t){return this.$g(t,"$W",i)},h.date=function(t){return this.$g(t,"$D","date")},h.hour=function(t){return this.$g(t,"$H",r)},h.minute=function(t){return this.$g(t,"$m",n)},h.second=function(t){return this.$g(t,"$s",e)},h.millisecond=function(e){return this.$g(e,"$ms",t)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(t,u){var o=this,f=!!g.u(u)||u,l=g.p(t),h=function(t,e){var n=g.w(o.$u?Date.UTC(o.$y,e,t):new Date(o.$y,e,t),o);return f?n:n.endOf(i)},d=function(t,e){return g.w(o.toDate()[t].apply(o.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),o)},$=this.$W,p=this.$M,v=this.$D,m="set"+(this.$u?"UTC":"");switch(l){case c:return f?h(1,0):h(31,11);case a:return f?h(1,p):h(0,p+1);case s:var y=this.$locale().weekStart||0,D=($<y?$+7:$)-y;return h(f?v-D:v+(6-D),p);case i:case"date":return d(m+"Hours",0);case r:return d(m+"Minutes",1);case n:return d(m+"Seconds",2);case e:return d(m+"Milliseconds",3);default:return this.clone()}},h.endOf=function(t){return this.startOf(t,!1)},h.$set=function(s,u){var o,f=g.p(s),l="set"+(this.$u?"UTC":""),h=(o={},o[i]=l+"Date",o.date=l+"Date",o[a]=l+"Month",o[c]=l+"FullYear",o[r]=l+"Hours",o[n]=l+"Minutes",o[e]=l+"Seconds",o[t]=l+"Milliseconds",o)[f],d=f===i?this.$D+(u-this.$W):u;if(f===a||f===c){var $=this.clone().set("date",1);$.$d[h](d),$.init(),this.$d=$.set("date",Math.min(this.$D,$.daysInMonth())).toDate()}else h&&this.$d[h](d);return this.init(),this},h.set=function(t,e){return this.clone().$set(t,e)},h.get=function(t){return this[g.p(t)]()},h.add=function(t,u){var o,f=this;t=Number(t);var l=g.p(u),h=function(e){var n=y(f);return g.w(n.date(n.date()+Math.round(e*t)),f)};if(l===a)return this.set(a,this.$M+t);if(l===c)return this.set(c,this.$y+t);if(l===i)return h(1);if(l===s)return h(7);var d=(o={},o[n]=6e4,o[r]=36e5,o[e]=1e3,o)[l]||1,$=this.$d.getTime()+t*d;return g.w($,this)},h.subtract=function(t,e){return this.add(-1*t,e)},h.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,a=this.$m,u=this.$M,c=i.weekdays,o=i.months,l=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},h=function(t){return g.s(s%12||12,t,"0")},d=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:u+1,MM:g.s(u+1,2,"0"),MMM:l(i.monthsShort,u,o,3),MMMM:o[u]||o(this,n),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:l(i.weekdaysMin,this.$W,c,2),ddd:l(i.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(s),HH:g.s(s,2,"0"),h:h(1),hh:h(2),a:d(s,a,!0),A:d(s,a,!1),m:String(a),mm:g.s(a,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(f,(function(t,e){return e||$[t]||r.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(t,o,f){var l,h=g.p(o),d=y(t),$=6e4*(d.utcOffset()-this.utcOffset()),p=this-d,v=g.m(this,d);return v=(l={},l[c]=v/12,l[a]=v,l[u]=v/3,l[s]=(p-$)/6048e5,l[i]=(p-$)/864e5,l[r]=p/36e5,l[n]=p/6e4,l[e]=p/1e3,l)[h]||p,f?v:g.a(v)},h.daysInMonth=function(){return this.endOf(a).$D},h.$locale=function(){return p[this.$L]},h.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=m(t,e,!0);return r&&(n.$L=r),n},h.clone=function(){return g.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},l}();return y.prototype=D.prototype,y.extend=function(t,e){return t(e,D,y),y},y.locale=m,y.isDayjs=v,y.unix=function(t){return y(1e3*t)},y.en=p[$],y.Ls=p,y}))},"67ed":function(t,e,n){"use strict";var r=n("2e78"),i=n.n(r);i.a},fa20:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.ArticleData?n("div",{staticClass:"article"},[n("top-bar",{staticClass:"article-nav"}),n("div",{staticClass:"title d-flex pr5"},[n("i",{staticClass:"arrow-l",on:{click:function(e){return t.$router.back()}}}),n("strong",{staticClass:"flex1 fs13 t-ellipsis",staticStyle:{color:"#4394e4"}},[t._v(t._s(t.ArticleData.title))]),n("span",{staticStyle:{color:"#9fa0a0"}},[t._v(t._s(t._f("date")(t.ArticleData.updatedAt)))])]),n("div",{staticClass:"content",domProps:{innerHTML:t._s(t.ArticleData.content)}}),n("div",{staticClass:"related"},[t._m(0),n("div",{staticClass:"pb20"},t._l(t.ArticleData.related,(function(e,r){return n("div",{key:r,staticClass:"d-flex pb5 fs14",on:{click:function(n){return t.relatedClick(e._id)}}},[n("span",{staticClass:"flex1 t-ellipsis pr20"},[t._v(t._s(e.title))]),n("span",{staticClass:"fs13",staticStyle:{color:"#9fa0a0"}},[t._v(t._s(t._f("date")(e.updatedAt)))])])})),0)])],1):t._e()},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"d-flex ai-center"},[n("span",{staticClass:"icon-related"}),n("strong",{staticClass:"fs14 flex1",staticStyle:{color:"#4394e4"}},[t._v("相关资讯")])])}],s=(n("96cf"),n("1da1")),a=n("1bab");function u(t){return Object(a["a"])({url:"/article/".concat(t)})}var c=n("5a0c"),o=n.n(c),f=n("3750"),l={name:"Article",props:{id:{type:String}},filters:{date:function(t){return o()(t).format("YYYY-MM-DD")}},components:{TopBar:f["a"]},watch:{id:function(){this.getArticleById()}},data:function(){return{ArticleData:null}},methods:{getArticleById:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u(this.id);case 2:if(e=t.sent,e){t.next=5;break}return t.abrupt("return");case 5:this.ArticleData=e.data;case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),relatedClick:function(t){this.$router.push("/article/".concat(t))}},created:function(){this.getArticleById()}},h=l,d=(n("67ed"),n("2877")),$=Object(d["a"])(h,r,i,!1,null,null,null);e["default"]=$.exports}}]);
//# sourceMappingURL=chunk-3dec60fa.78f79efb.js.map