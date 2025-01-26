import{t as i,i as u,a as d,p as c}from"./parseMySqlDate-1ZJKP2sH.js";function f(t,n){return+i(t)<+i(n)}function g(t){var n;return{seasonStart:c(t.season_start),seasonEnd:c(t.season_end),bagLimit:t.bag_limit,minSize:t.minimum_size,maxSize:t.maximum_size,fishingMethod:l(t),tidal:p(t),water:((n=t==null?void 0:t.water)==null?void 0:n.name)??"",waterDescription:t.water_description??""}}function l(t){var e,s;let n="";return((e=t==null?void 0:t.fishing_method)==null?void 0:e.name)==="May only be angled by artificial fly or baited barbless hook with a single point"?n="Fly Fishing":n=((s=t==null?void 0:t.fishing_method)==null?void 0:s.name)??"",n}function p(t){let n="";return t.tidal_category&&(n&&(n+=" in "),n+=t.tidal_category.name+" waters"),n}function h(t){return t.reduce((n,e)=>{let s=0,r=!1;for(;!r&&s<n.length;)!n[s].waterDescription&&u(e.seasonStart,n[s].seasonStart)&&u(e.seasonEnd,n[s].seasonEnd)&&e.bagLimit===n[s].bagLimit&&e.minimumSize===n[s].minimumSize&&e.maximumSize===n[s].maximumSize&&(r=!0,e.fishingMethod!==n[s].fishingMethod&&(n[s].fishingMethod=""),e.tidal!==n[s].tidal&&(n[s].tidal="")),s++;return r||n.push(e),n},[])}function S(t){return t.sort((n,e)=>{const s=d(n.seasonStart,e.seasonStart);return s===0?e.fishingMethod||e.tidal||e.waterDescription?-1:d(e.seasonEnd,n.seasonEnd):s})}function w(t){if(!t.length)return;const n=t.reduce((e,s)=>{var o;const r=((o=s==null?void 0:s.fish)==null?void 0:o.name)??null;if(!e[r]){const a={seasonStart:null,seasonEnd:null,limits:[]};e[r]=a}return e[r].limits.push(g(s)),e},{});return Object.keys(n).forEach(e=>{n[e].limits=h(n[e].limits),n[e].limits=S(n[e].limits),n[e].limits.forEach(o=>{o.bagLimit&&(n[e].seasonStart?f(o.seasonStart,n[e].seasonStart)&&(n[e].seasonStart=o.seasonStart):n[e].seasonStart=o.seasonStart,n[e].seasonEnd&&f(o.seasonEnd,n[e].seasonEnd)||(n[e].seasonEnd=o.seasonEnd))});const s={};let r=0;for(;r<n[e].limits.length;){const o=n[e].limits[r],a=[o.fishingMethod,o.tidal,o.waterDescription].join("-");o.waterDescription&&s[a]?(s[a].group||(s[a].group=[]),s[a].group.push(o),n[e].limits.splice(r,1)):(s[a]=o,r++)}}),n}export{w as f,h as r,S as s};
