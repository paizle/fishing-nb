import{j as s}from"./app-0_S-QqPL.js";import{P as f}from"./PublicLayout-BJOdgFQo.js";import{P as x}from"./PublicNav-C7CNGHoV.js";import{f as l,c as h}from"./format-CU-xZK7a.js";import{p as m}from"./parseMySqlDate-DjqKqIUd.js";import{g as j}from"./getFishImageSrc-bMjek-YH.js";import{r as g,s as y}from"./WaterTransformers-FuMK5fJJ.js";import{B as v}from"./Breadcrumb-dNpHOkxO.js";import"./ResponsiveNavLink-DYDyJSxR.js";import"./transition-DSgcLifr.js";import"./useScreenOrientation-DnlgmW3h.js";function _(r){return r=g(r),r=y(r),b(r)}function b(r){return r.reduce((i,n)=>{const t=n.location.name;return i.hasOwnProperty(t)||(i[t]=[]),i[t].push(n),i},{})}function k({fish:r,limits:c,breadcrumb:i}){const n=_(c);console.log(n);const t=e=>{let a=[];return e.water&&a.push(e.water.name),!e.water&&e.waters_category&&a.push(e.waters_category.name),e.water_description||(a.length&&a.push(": "),e.boundary&&a.push(e.boundary.name),e.tidal_category&&(a.length&&a.push(", "),a.push(e.tidal_category.name+" waters"))),e.fishing_method&&(e.water_description||a.push(": "),e.fishing_method.name==="May only be angled by artificial fly or baited barbless hook with a single point"?a.push(": Fly Fishing"):a.push(": "+e.fishing_method.name)),s.jsx(s.Fragment,{children:a.map(d=>s.jsx("span",{className:"extra",children:d}))})},p=e=>{let a=[];return e.water_description&&(e.boundary&&a.push(e.boundary.name),e.tidal_category&&a.push(", "+e.tidal_category.name+" waters"),e.water_description&&a.push(" "+e.water_description)),s.jsx(s.Fragment,{children:a.map(d=>s.jsx("span",{className:"extra",children:d}))})};function u(e){return e.group.map(a=>o(a))}function o(e,a=!1){return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"",children:[a?"true":null," ",t(e)]}),s.jsx("div",{children:e.minimum_size}),s.jsx("div",{children:e.maximum_size}),s.jsx("div",{children:e.bag_limit}),s.jsx("div",{children:l(m(e.season_start),h.displayDayMonthShortFormat)}),s.jsx("div",{children:l(m(e.season_end),h.displayDayMonthShortFormat)})]})}return s.jsxs(f,{className:"Fish",children:[s.jsx("header",{children:s.jsx(x,{children:s.jsx(v,{breadcrumb:i})})}),s.jsxs("main",{children:[s.jsx("img",{className:"fish-image",src:j(r.name)}),s.jsxs("div",{className:"fish-limit-grid",children:[s.jsxs("header",{className:"header",children:[s.jsx("div",{children:"Restrictions"}),s.jsx("div",{children:"Min Size"}),s.jsx("div",{children:"Max Size"}),s.jsx("div",{children:"Bag Limit"}),s.jsx("div",{children:"Season Start"}),s.jsx("div",{children:"Season End"})]}),s.jsx("div",{className:"body",children:Object.keys(n).map(e=>s.jsxs("div",{className:"location-group",children:[s.jsx("div",{className:"location-name",children:e}),n[e].map((a,d)=>s.jsxs("div",{className:`row ${d%2?"even":"odd"}`,children:[o(a),a.group?u(a):null,a.water_description?s.jsx("div",{className:"water-description",children:p(a)}):null]}))]}))})]})]})]})}export{k as default};
