import{r as w,j as o}from"./app-DmLRYQp3.js";import{i as g,p as l,a as x,b as j,f as S,c as h}from"./parseMySqlDate-CERvkhiN.js";/* empty css                */import{u as E}from"./useScreenOrientation-D0YYU_ze.js";function D(r){var n,s,a,c;return{id:r.id,seasonStart:l(r.season_start),seasonEnd:l(r.season_end),bagLimit:r.bag_limit,minSize:r.minimum_size,maxSize:r.maximum_size,fishingMethod:F(r),tidal:((n=r==null?void 0:r.tidal_category)==null?void 0:n.name)??"",water:((s=r==null?void 0:r.water)==null?void 0:s.name)??"",watersCategory:((a=r==null?void 0:r.waters_category)==null?void 0:a.name)??"",boundary:((c=r==null?void 0:r.boundary)==null?void 0:c.name)??"",waterDescription:r.water_description??""}}function F(r){var s,a;let n="";return((s=r==null?void 0:r.fishing_method)==null?void 0:s.name)==="May only be angled by artificial fly or baited barbless hook with a single point"?n="Fly Fishing":n=((a=r==null?void 0:r.fishing_method)==null?void 0:a.name)??"",n}function m(r){return r.reduce((n,s)=>{let a=0,c=!1;for(;!c&&a<n.length;)!n[a].waterDescription&&x(s.seasonStart,n[a].seasonStart)&&x(s.seasonEnd,n[a].seasonEnd)&&s.bagLimit===n[a].bagLimit&&s.minimumSize===n[a].minimumSize&&s.maximumSize===n[a].maximumSize&&(c=!0,s.fishingMethod!==n[a].fishingMethod&&(n[a].fishingMethod=""),s.tidal!==n[a].tidal&&(n[a].tidal="")),a++;return c||n.push(s),n},[])}function L(r){return r.sort((n,s)=>{const a=j(n.seasonStart,s.seasonStart);return a===0?s.fishingMethod||s.tidal||s.waterDescription?-1:j(s.seasonEnd,n.seasonEnd):a})}function z(r){if(!r.length)return;const n=r.reduce((s,a)=>{var d;const c=((d=a==null?void 0:a.fish)==null?void 0:d.name)??null;if(!s[c]){const i={seasonStart:null,seasonEnd:null,limits:[]};s[c]=i}return s[c].limits.push(D(a)),s},{});return Object.keys(n).forEach(s=>{n[s].limits=m(n[s].limits),n[s].limits=L(n[s].limits),n[s].limits.forEach(d=>{d.bagLimit&&(n[s].seasonStart?g(d.seasonStart,n[s].seasonStart)&&(n[s].seasonStart=d.seasonStart):n[s].seasonStart=d.seasonStart,n[s].seasonEnd&&g(d.seasonEnd,n[s].seasonEnd)||(n[s].seasonEnd=d.seasonEnd))});const a={};let c=0;for(;c<n[s].limits.length;){const d=n[s].limits[c],i=[d.fishingMethod,d.tidal,d.waterDescription].join("-");d.waterDescription&&a[i]?(a[i].group||(a[i].group=[]),a[i].group.push(d),n[s].limits.splice(c,1)):(a[i]=d,c++)}}),n}function A({limits:r}){const n=z(r),s=E(),a=w.useRef(null),c=(e,t=!1)=>o.jsxs(o.Fragment,{children:[o.jsxs("span",{children:[S(e.seasonStart,s.isMobile?h.displayDayMonthShortFormat:h.displayDayMonthFormat)," "]}),o.jsxs("span",{children:["-"," ",S(e.seasonEnd,s.isMobile?h.displayDayMonthShortFormat:h.displayDayMonthFormat),t?",":""]})]}),d=e=>e.waterDescription?o.jsx("em",{className:"group-water-description",children:i(e)}):null,i=e=>{let t="";return!e.water&&e.watersCategory&&(t+=e.watersCategory+": "),e.tidal&&(t+=e.tidal),e.boundary&&(t+=e.tidal?", ":"",t+=t?" ":"",t+=e.boundary),e.waterDescription&&!e.water&&(t+=e.boundary),e.water&&(t=e.water+(t?": ":" ")+t),e.fishingMethod&&(t=e.fishingMethod+" in "+t),e.waterDescription&&(t+=t?" ":"",t+=e.waterDescription)," "+t},y=e=>{const t=(e==null?void 0:e.minSize)??"N/A";return e.bagLimit===0?o.jsx("span",{className:"invalid",children:t}):t},b=e=>{const t=(e==null?void 0:e.maxSize)??"N/A";return e.bagLimit===0?o.jsx("span",{className:"invalid",children:t}):t},M=e=>e.bagLimit===null?o.jsx("span",{className:"text-md leading-4",children:"∞"}):e.bagLimit,p=(e,t=!1)=>o.jsxs("div",{className:`limit ${t&&!e.group?"sub-group":""}`,children:[o.jsxs("div",{className:"season-exception",children:[o.jsx("span",{className:"date-span",children:c(e,e.group||t)}),!t&&o.jsx("em",{className:"water-description",children:i(e)})]}),o.jsx("div",{children:M(e)}),o.jsx("div",{children:y(e)}),o.jsx("div",{children:b(e)})]}),f=(e,t=!1)=>e.map((u,v)=>u!=null&&u.group?o.jsxs(o.Fragment,{children:[p(u,!0),f(u.group,!0),d(u)]}):o.jsx(o.Fragment,{children:p(u,t)}));return o.jsxs("div",{className:"FishLimitsGrid",ref:a,children:[o.jsxs("div",{className:"header",children:[o.jsxs("div",{className:"column-header date-range",children:[!s.isMobile&&o.jsx(o.Fragment,{children:"Fish/Season/"}),"Restrictions"]}),o.jsx("div",{className:"column-header",children:"Bag Limit"}),o.jsxs("div",{className:"column-header",children:[s.isMobile?"Min.":"Minimum"," ","Size"]}),o.jsxs("div",{className:"column-header",children:[s.isMobile?"Max.":"Maximum"," ","Size"]})]}),o.jsx("div",{className:"body",children:Object.keys(n??{}).map((e,t)=>o.jsxs("div",{className:"fish-row-container",children:[o.jsx("div",{className:`fish-name ${t%2===0?"even":"odd"}`,children:o.jsx("div",{className:"fish-season",children:o.jsx("strong",{children:e})})}),o.jsx("div",{className:`limits ${t%2===0?"even":"odd"}`,children:f(n[e].limits)})]},e))})]})}export{A as default};
