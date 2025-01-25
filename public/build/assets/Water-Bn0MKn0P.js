import{r as i,j as s}from"./app-kGfqBWgu.js";import{f as y}from"./WaterTransformers-CwKseSpa.js";import{f as g,c as h}from"./parseMySqlDate-CERvkhiN.js";import{T as F,F as w}from"./Tooltip-DXmS03Wp.js";import{P as R}from"./PublicLayout-lJaVzO2A.js";import{B as D}from"./Breadcrumb-BqhUvAey.js";import{P as L}from"./PublicNav-C0kRm3q5.js";import{u as E}from"./useScreenOrientation-CeycFIh4.js";import"./ResponsiveNavLink-CWCBWMcd.js";import"./transition-B8BCO3Tg.js";function $({title:d,titleId:l,...t},a){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":l},t),d?i.createElement("title",{id:l},d):null,i.createElement("path",{fillRule:"evenodd",d:"M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z",clipRule:"evenodd"}))}const z=i.forwardRef($);function Z({limits:d,breadcrumb:l}){const t=y(d),a=E(),x=i.useRef(null),[c,v]=i.useState({}),N=e=>{if(console.log(e),e.defaultPrevented)return;const r=e.currentTarget.value;v(n=>{const o=JSON.parse(JSON.stringify(n));return o[r]=!(o!=null&&o[r]),o})},u=(e,r=!1)=>s.jsxs(s.Fragment,{children:[s.jsxs("span",{children:[g(e.seasonStart,a.isMobile?h.displayDayMonthShortFormat:h.displayDayMonthFormat)," "]}),s.jsxs("span",{children:["-"," ",g(e.seasonEnd,a.isMobile?h.displayDayMonthShortFormat:h.displayDayMonthFormat),r?",":""]})]}),m=e=>e.waterDescription?s.jsx("em",{className:"water-description",children:j(e,!1)}):null,j=(e,r=!0)=>{if(r&&e.waterDescription)return"";let n=e.fishingMethod;return e.tidal&&(n&&(n+=" in "),n+=e.tidal),n||(n+=e.water),n+=" "+e.waterDescription,n},b=e=>{const r=(e==null?void 0:e.minSize)??"N/A";return e.bagLimit===0?s.jsx("span",{className:"invalid",children:r}):r},S=e=>{const r=(e==null?void 0:e.maxSize)??"N/A";return e.bagLimit===0?s.jsx("span",{className:"invalid",children:r}):r},M=e=>e.bagLimit===null?s.jsx("span",{className:"text-md leading-4",children:"∞"}):e.bagLimit,p=(e,r=!1)=>s.jsxs("div",{className:`limit ${r?"group":""} ${e.group?"group-start":""}`,children:[s.jsxs("div",{className:"season-exception",children:[s.jsx("span",{className:"date-span",children:u(e,e.group||r)}),s.jsxs("em",{className:"exception",children:[" ",j(e)]})]}),s.jsx("div",{children:M(e)}),s.jsx("div",{children:b(e)}),s.jsx("div",{children:S(e)})]}),f=(e,r=!1)=>e.map((n,o)=>n!=null&&n.group?s.jsxs(s.Fragment,{children:[p(n),f(n.group,!0),m(n)]}):s.jsxs(s.Fragment,{children:[p(n,r),r?null:m(n)]}));return s.jsxs(R,{children:[s.jsx("header",{children:s.jsx(L,{children:s.jsx(D,{breadcrumb:l})})}),s.jsx("main",{children:s.jsx("div",{className:"Water",children:s.jsxs("div",{className:"fish-grid",ref:x,children:[s.jsxs("div",{className:"header",children:[s.jsxs("div",{className:"column-header date-range",children:[!a.isMobile&&s.jsx(s.Fragment,{children:"Fish/Season/"}),"Restrictions"]}),s.jsx("div",{className:"column-header",children:"Bag Limit"}),s.jsxs("div",{className:"column-header",children:[a.isMobile?"Min.":"Minimum"," ","Size"]}),s.jsxs("div",{className:"column-header",children:[a.isMobile?"Max.":"Maximum"," ","Size"]})]}),s.jsx("div",{className:"body",children:Object.keys(t??{}).map((e,r)=>s.jsxs("div",{className:"fish-row-container",children:[s.jsxs("button",{onClick:N,value:e,className:`fish-name ${r%2===0?"even":"odd"} ${c!=null&&c[e]?"open":""}`,children:[s.jsxs("div",{className:"fish-season",children:[s.jsxs("strong",{children:[s.jsx(z,{className:"open-indicator"}),e]}),s.jsxs("em",{children:["(",u(t[e]),")"]})]}),s.jsx("div",{className:"flex",children:t[e].limits.length>1?s.jsx(F,{message:"Some Restrictions",containerRef:x,children:s.jsx(w,{className:"alert"})}):null})]}),s.jsx("div",{className:`limits ${r%2===0?"even":"odd"} ${c!=null&&c[e]?"open":""}`,children:f(t[e].limits)})]},e))})]})})})]})}export{Z as default};
