(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{15:function(t,e,c){"use strict";c.r(e),c.d(e,"preload",(function(){return j}));var n=c(0);function l(t,e,c){const n=t.slice();return n[1]=e[c],n}function b(t){let e,c,l,b,s=t[1].title+"";return{c(){e=Object(n.q)("li"),c=Object(n.q)("a"),l=Object(n.J)(s),this.h()},l(t){e=Object(n.i)(t,"LI",{});var b=Object(n.g)(e);c=Object(n.i)(b,"A",{rel:!0,href:!0});var j=Object(n.g)(c);l=Object(n.k)(j,s),j.forEach(n.p),b.forEach(n.p),this.h()},h(){Object(n.d)(c,"rel","prefetch"),Object(n.d)(c,"href",b="blog/"+t[1].slug)},m(t,b){Object(n.z)(t,e,b),Object(n.b)(e,c),Object(n.b)(c,l)},p(t,e){1&e&&s!==(s=t[1].title+"")&&Object(n.H)(l,s),1&e&&b!==(b="blog/"+t[1].slug)&&Object(n.d)(c,"href",b)},d(t){t&&Object(n.p)(e)}}}function s(t){let e,c,s,j,o,r=t[0],O=[];for(let e=0;e<r.length;e+=1)O[e]=b(l(t,r,e));return{c(){e=Object(n.I)(),c=Object(n.q)("h1"),s=Object(n.J)("Recent posts"),j=Object(n.I)(),o=Object(n.q)("ul");for(let t=0;t<O.length;t+=1)O[t].c();this.h()},l(t){e=Object(n.j)(t),c=Object(n.i)(t,"H1",{});var l=Object(n.g)(c);s=Object(n.k)(l,"Recent posts"),l.forEach(n.p),j=Object(n.j)(t),o=Object(n.i)(t,"UL",{class:!0});var b=Object(n.g)(o);for(let t=0;t<O.length;t+=1)O[t].l(b);b.forEach(n.p),this.h()},h(){document.title="Blog",Object(n.d)(o,"class","svelte-4fatyy")},m(t,l){Object(n.z)(t,e,l),Object(n.z)(t,c,l),Object(n.b)(c,s),Object(n.z)(t,j,l),Object(n.z)(t,o,l);for(let t=0;t<O.length;t+=1)O[t].m(o,null)},p(t,[e]){if(1&e){let c;for(r=t[0],c=0;c<r.length;c+=1){const n=l(t,r,c);O[c]?O[c].p(n,e):(O[c]=b(n),O[c].c(),O[c].m(o,null))}for(;c<O.length;c+=1)O[c].d(1);O.length=r.length}},i:n.C,o:n.C,d(t){t&&Object(n.p)(e),t&&Object(n.p)(c),t&&Object(n.p)(j),t&&Object(n.p)(o),Object(n.o)(O,t)}}}function j({params:t,query:e}){return this.fetch("blog.json").then(t=>t.json()).then(t=>({posts:t}))}function o(t,e,c){let{posts:n}=e;return t.$set=t=>{"posts"in t&&c(0,n=t.posts)},[n]}class r extends n.a{constructor(t){var e;super(),document.getElementById("svelte-4fatyy-style")||((e=Object(n.q)("style")).id="svelte-4fatyy-style",e.textContent="ul.svelte-4fatyy{margin:0 0 1em 0;line-height:1.5}",Object(n.b)(document.head,e)),Object(n.y)(this,t,o,s,n.F,{posts:0})}}e.default=r}}]);