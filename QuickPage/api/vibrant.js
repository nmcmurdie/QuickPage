!function t(r,o,i){function n(a,h){if(!o[a]){if(!r[a]){var s="function"==typeof require&&require;if(!h&&s)return s(a,!0);if(e)return e(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=o[a]={exports:{}};r[a][0].call(c.exports,function(t){var o=r[a][1][t];return n(o||t)},c,c.exports,t,r,o,i)}return o[a].exports}for(var e="function"==typeof require&&require,a=0;a<i.length;a++)n(i[a]);return n}({1:[function(t,r,o){if(!i)var i={map:function(t,r){var o={};return r?t.map(function(t,i){return o.index=i,r.call(o,t)}):t.slice()},naturalOrder:function(t,r){return t<r?-1:t>r?1:0},sum:function(t,r){var o={};return t.reduce(r?function(t,i,n){return o.index=n,t+r.call(o,i)}:function(t,r){return t+r},0)},max:function(t,r){return Math.max.apply(null,r?i.map(t,r):t)}};var n=function(){var t=5,r=8-t,o=1e3,n=.75;function e(r,o,i){return(r<<2*t)+(o<<t)+i}function a(t){var r=[],o=!1;function i(){r.sort(t),o=!0}return{push:function(t){r.push(t),o=!1},peek:function(t){return o||i(),void 0===t&&(t=r.length-1),r[t]},pop:function(){return o||i(),r.pop()},size:function(){return r.length},map:function(t){return r.map(t)},debug:function(){return o||i(),r}}}function h(t,r,o,i,n,e,a){var h=this;h.r1=t,h.r2=r,h.g1=o,h.g2=i,h.b1=n,h.b2=e,h.histo=a}function s(){this.vboxes=new a(function(t,r){return i.naturalOrder(t.vbox.count()*t.vbox.volume(),r.vbox.count()*r.vbox.volume())})}function u(t,r){if(r.count()){var o=r.r2-r.r1+1,n=r.g2-r.g1+1,a=r.b2-r.b1+1,h=i.max([o,n,a]);if(1==r.count())return[r.copy()];var s,u,c,p,f=0,l=[],A=[];if(h==o)for(s=r.r1;s<=r.r2;s++){for(p=0,u=r.g1;u<=r.g2;u++)for(c=r.b1;c<=r.b2;c++)p+=t[e(s,u,c)]||0;f+=p,l[s]=f}else if(h==n)for(s=r.g1;s<=r.g2;s++){for(p=0,u=r.r1;u<=r.r2;u++)for(c=r.b1;c<=r.b2;c++)p+=t[e(u,s,c)]||0;f+=p,l[s]=f}else for(s=r.b1;s<=r.b2;s++){for(p=0,u=r.r1;u<=r.r2;u++)for(c=r.g1;c<=r.g2;c++)p+=t[e(u,c,s)]||0;f+=p,l[s]=f}return l.forEach(function(t,r){A[r]=f-t}),T(h==o?"r":h==n?"g":"b")}function T(t){var o,i,n,e,a,h=t+"1",u=t+"2",c=0;for(s=r[h];s<=r[u];s++)if(l[s]>f/2){for(n=r.copy(),e=r.copy(),a=(o=s-r[h])<=(i=r[u]-s)?Math.min(r[u]-1,~~(s+i/2)):Math.max(r[h],~~(s-1-o/2));!l[a];)a++;for(c=A[a];!c&&l[a-1];)c=A[--a];return n[u]=a,e[h]=n[u]+1,[n,e]}}}return h.prototype={volume:function(t){var r=this;return r._volume&&!t||(r._volume=(r.r2-r.r1+1)*(r.g2-r.g1+1)*(r.b2-r.b1+1)),r._volume},count:function(t){var r=this,o=r.histo;if(!r._count_set||t){var i,n,a,h=0;for(i=r.r1;i<=r.r2;i++)for(n=r.g1;n<=r.g2;n++)for(a=r.b1;a<=r.b2;a++)h+=o[e(i,n,a)]||0;r._count=h,r._count_set=!0}return r._count},copy:function(){var t=this;return new h(t.r1,t.r2,t.g1,t.g2,t.b1,t.b2,t.histo)},avg:function(r){var o=this,i=o.histo;if(!o._avg||r){var n,a,h,s,u=0,c=1<<8-t,p=0,f=0,l=0;for(a=o.r1;a<=o.r2;a++)for(h=o.g1;h<=o.g2;h++)for(s=o.b1;s<=o.b2;s++)u+=n=i[e(a,h,s)]||0,p+=n*(a+.5)*c,f+=n*(h+.5)*c,l+=n*(s+.5)*c;o._avg=u?[~~(p/u),~~(f/u),~~(l/u)]:[~~(c*(o.r1+o.r2+1)/2),~~(c*(o.g1+o.g2+1)/2),~~(c*(o.b1+o.b2+1)/2)]}return o._avg},contains:function(t){var o=this,i=t[0]>>r;return gval=t[1]>>r,bval=t[2]>>r,i>=o.r1&&i<=o.r2&&gval>=o.g1&&gval<=o.g2&&bval>=o.b1&&bval<=o.b2}},s.prototype={push:function(t){this.vboxes.push({vbox:t,color:t.avg()})},palette:function(){return this.vboxes.map(function(t){return t.color})},size:function(){return this.vboxes.size()},map:function(t){for(var r=this.vboxes,o=0;o<r.size();o++)if(r.peek(o).vbox.contains(t))return r.peek(o).color;return this.nearest(t)},nearest:function(t){for(var r,o,i,n=this.vboxes,e=0;e<n.size();e++)((o=Math.sqrt(Math.pow(t[0]-n.peek(e).color[0],2)+Math.pow(t[1]-n.peek(e).color[1],2)+Math.pow(t[2]-n.peek(e).color[2],2)))<r||void 0===r)&&(r=o,i=n.peek(e).color);return i},forcebw:function(){var t=this.vboxes;t.sort(function(t,r){return i.naturalOrder(i.sum(t.color),i.sum(r.color))});var r=t[0].color;r[0]<5&&r[1]<5&&r[2]<5&&(t[0].color=[0,0,0]);var o=t.length-1,n=t[o].color;n[0]>251&&n[1]>251&&n[2]>251&&(t[o].color=[255,255,255])}},{quantize:function(c,p){if(!c.length||p<2||p>256)return!1;var f,l,A,T,v,g,_=(f=c,g=new Array(1<<3*t),f.forEach(function(t){A=t[0]>>r,T=t[1]>>r,v=t[2]>>r,l=e(A,T,v),g[l]=(g[l]||0)+1}),g);_.forEach(function(){});var M,b,d,w,y,R,I,S,U,L,N=(M=_,y=1e6,R=0,I=1e6,S=0,U=1e6,L=0,c.forEach(function(t){b=t[0]>>r,d=t[1]>>r,w=t[2]>>r,b<y?y=b:b>R&&(R=b),d<I?I=d:d>S&&(S=d),w<U?U=w:w>L&&(L=w)}),new h(y,R,I,S,U,L,M)),m=new a(function(t,r){return i.naturalOrder(t.count(),r.count())});function x(t,r){for(var i,n=1,e=0;e<o;)if((i=t.pop()).count()){var a=u(_,i),h=a[0],s=a[1];if(!h)return;if(t.push(h),s&&(t.push(s),n++),n>=r)return;if(e++>o)return}else t.push(i),e++}m.push(N),x(m,n*p);for(var V=new a(function(t,r){return i.naturalOrder(t.count()*t.volume(),r.count()*r.volume())});m.size();)V.push(m.pop());x(V,p-V.size());for(var E=new s;V.size();)E.push(V.pop());return E}}}();r.exports=n.quantize},{}],2:[function(t,r,o){(function(){var r,o,i,n=function(t,r){return function(){return t.apply(r,arguments)}},e=[].slice;window.Swatch=o=function(){function t(t,r){this.rgb=t,this.population=r}return t.prototype.hsl=void 0,t.prototype.rgb=void 0,t.prototype.population=1,t.yiq=0,t.prototype.getHsl=function(){return this.hsl?this.hsl:this.hsl=i.rgbToHsl(this.rgb[0],this.rgb[1],this.rgb[2])},t.prototype.getPopulation=function(){return this.population},t.prototype.getRgb=function(){return this.rgb},t.prototype.getHex=function(){return"#"+((1<<24)+(this.rgb[0]<<16)+(this.rgb[1]<<8)+this.rgb[2]).toString(16).slice(1,7)},t.prototype.getTitleTextColor=function(){return this._ensureTextColors(),this.yiq<200?"#fff":"#000"},t.prototype.getBodyTextColor=function(){return this._ensureTextColors(),this.yiq<150?"#fff":"#000"},t.prototype._ensureTextColors=function(){if(!this.yiq)return this.yiq=(299*this.rgb[0]+587*this.rgb[1]+114*this.rgb[2])/1e3},t}(),window.Vibrant=i=function(){function i(t,i,e){var a,h,s,u,c,p,f,l,A,T;this.swatches=n(this.swatches,this),void 0===i&&(i=64),void 0===e&&(e=5),p=new r(t);try{for(A=p.getImageData().data,l=p.getPixelCount(),a=[],c=0;c<l;)T=A[(f=4*c)+0],u=A[f+1],h=A[f+2],A[f+3]>=125&&(T>250&&u>250&&h>250||a.push([T,u,h])),c+=e;s=this.quantize(a,i),this._swatches=s.vboxes.map(function(t){return new o(t.color,t.vbox.count())}),this.maxPopulation=this.findMaxPopulation,this.generateVarationColors(),this.generateEmptySwatches()}finally{p.removeCanvas()}}return i.prototype.quantize=t("quantize"),i.prototype._swatches=[],i.prototype.TARGET_DARK_LUMA=.26,i.prototype.MAX_DARK_LUMA=.45,i.prototype.MIN_LIGHT_LUMA=.55,i.prototype.TARGET_LIGHT_LUMA=.74,i.prototype.MIN_NORMAL_LUMA=.3,i.prototype.TARGET_NORMAL_LUMA=.5,i.prototype.MAX_NORMAL_LUMA=.7,i.prototype.TARGET_MUTED_SATURATION=.3,i.prototype.MAX_MUTED_SATURATION=.4,i.prototype.TARGET_VIBRANT_SATURATION=1,i.prototype.MIN_VIBRANT_SATURATION=.35,i.prototype.WEIGHT_SATURATION=3,i.prototype.WEIGHT_LUMA=6,i.prototype.WEIGHT_POPULATION=1,i.prototype.VibrantSwatch=void 0,i.prototype.MutedSwatch=void 0,i.prototype.DarkVibrantSwatch=void 0,i.prototype.DarkMutedSwatch=void 0,i.prototype.LightVibrantSwatch=void 0,i.prototype.LightMutedSwatch=void 0,i.prototype.HighestPopulation=0,i.prototype.generateVarationColors=function(){return this.VibrantSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.LightVibrantSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.DarkVibrantSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_VIBRANT_SATURATION,this.MIN_VIBRANT_SATURATION,1),this.MutedSwatch=this.findColorVariation(this.TARGET_NORMAL_LUMA,this.MIN_NORMAL_LUMA,this.MAX_NORMAL_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION),this.LightMutedSwatch=this.findColorVariation(this.TARGET_LIGHT_LUMA,this.MIN_LIGHT_LUMA,1,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION),this.DarkMutedSwatch=this.findColorVariation(this.TARGET_DARK_LUMA,0,this.MAX_DARK_LUMA,this.TARGET_MUTED_SATURATION,0,this.MAX_MUTED_SATURATION)},i.prototype.generateEmptySwatches=function(){var t;if(void 0===this.VibrantSwatch&&void 0!==this.DarkVibrantSwatch&&((t=this.DarkVibrantSwatch.getHsl())[2]=this.TARGET_NORMAL_LUMA,this.VibrantSwatch=new o(i.hslToRgb(t[0],t[1],t[2]),0)),void 0===this.DarkVibrantSwatch&&void 0!==this.VibrantSwatch)return(t=this.VibrantSwatch.getHsl())[2]=this.TARGET_DARK_LUMA,this.DarkVibrantSwatch=new o(i.hslToRgb(t[0],t[1],t[2]),0)},i.prototype.findMaxPopulation=function(){var t,r,o,i,n;for(o=0,t=0,r=(i=this._swatches).length;t<r;t++)n=i[t],o=Math.max(o,n.getPopulation());return o},i.prototype.findColorVariation=function(t,r,o,i,n,e){var a,h,s,u,c,p,f,l,A;for(u=void 0,c=0,a=0,h=(p=this._swatches).length;a<h;a++)f=(l=p[a]).getHsl()[1],s=l.getHsl()[2],f>=n&&f<=e&&s>=r&&s<=o&&!this.isAlreadySelected(l)&&(A=this.createComparisonValue(f,i,s,t,l.getPopulation(),this.HighestPopulation),(void 0===u||A>c)&&(u=l,c=A));return u},i.prototype.createComparisonValue=function(t,r,o,i,n,e){return this.weightedMean(this.invertDiff(t,r),this.WEIGHT_SATURATION,this.invertDiff(o,i),this.WEIGHT_LUMA,n/e,this.WEIGHT_POPULATION)},i.prototype.invertDiff=function(t,r){return 1-Math.abs(t-r)},i.prototype.weightedMean=function(){var t,r,o,i,n;for(i=1<=arguments.length?e.call(arguments,0):[],r=0,o=0,t=0;t<i.length;)r+=i[t]*(n=i[t+1]),o+=n,t+=2;return r/o},i.prototype.swatches=function(){return{Vibrant:this.VibrantSwatch,Muted:this.MutedSwatch,DarkVibrant:this.DarkVibrantSwatch,DarkMuted:this.DarkMutedSwatch,LightVibrant:this.LightVibrantSwatch,LightMuted:this.LightMuted}},i.prototype.isAlreadySelected=function(t){return this.VibrantSwatch===t||this.DarkVibrantSwatch===t||this.LightVibrantSwatch===t||this.MutedSwatch===t||this.DarkMutedSwatch===t||this.LightMutedSwatch===t},i.rgbToHsl=function(t,r,o){var i,n,e,a,h,s;if(t/=255,r/=255,o/=255,n=void 0,s=void 0,e=((a=Math.max(t,r,o))+(h=Math.min(t,r,o)))/2,a===h)n=s=0;else{switch(i=a-h,s=e>.5?i/(2-a-h):i/(a+h),a){case t:n=(r-o)/i+(r<o?6:0);break;case r:n=(o-t)/i+2;break;case o:n=(t-r)/i+4}n/=6}return[n,s,e]},i.hslToRgb=function(t,r,o){var i,n,e,a,h,s;return s=void 0,n=void 0,i=void 0,e=function(t,r,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?t+6*(r-t)*o:o<.5?r:o<2/3?t+(r-t)*(2/3-o)*6:t},0===r?s=n=i=o:(s=e(a=2*o-(h=o<.5?o*(1+r):o+r-o*r),h,t+1/3),n=e(a,h,t),i=e(a,h,t-1/3)),[255*s,255*n,255*i]},i}(),window.CanvasImage=r=function(){function t(t){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=t.width,this.height=this.canvas.height=t.height,this.context.drawImage(t,0,0,this.width,this.height)}return t.prototype.clear=function(){return this.context.clearRect(0,0,this.width,this.height)},t.prototype.update=function(t){return this.context.putImageData(t,0,0)},t.prototype.getPixelCount=function(){return this.width*this.height},t.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},t.prototype.removeCanvas=function(){return this.canvas.parentNode.removeChild(this.canvas)},t}()}).call(this)},{quantize:1}]},{},[2]);