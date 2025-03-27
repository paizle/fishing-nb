import{r as t,j as e,c as v}from"./app-CmCeuH0m.js";import{P as L}from"./PublicLayout-Dr1nIiRV.js";import{P as T}from"./PublicNav-DLhvOQaF.js";import I from"./LocationCombobox-5RjWh_fE.js";import N from"./SelectFishMobile-Dc6Vv9tE.js";import k from"./SelectFishDesktop-BYLDRaPc.js";import H from"./FishingRestrictions-C5MxRvpp.js";import"./ResponsiveNavLink-BAhhWogd.js";import"./transition-CUh4n4UF.js";import"./index-Ii1ONB9T.js";import"./getFishImageSrc-bMjek-YH.js";import"./parseMySqlDate-BUpSl06p.js";import"./format-wWbDcfoj.js";import"./FishRestrictionsTable-BZFLz0OZ.js";import"./Tooltip-CBiTN6xg.js";function U({title:r,titleId:a,...l},i){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":a},l),r?t.createElement("title",{id:a},r):null,t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"}))}const A=t.forwardRef(U);function f(r){const a={loading:!1,error:null,data:null},l=(c,n)=>{switch(n.type){case"FETCH_START":return{...c,loading:!0,error:null};case"FETCH_SUCCESS":return{...c,loading:!1,data:n.payload};case"FETCH_FAILURE":return{...c,loading:!1,error:n.payload};default:return c}},[i,d]=t.useReducer(l,a);return{state:i,get:async c=>{d({type:"FETCH_START"});try{const n={nocache:r?Date.parse(r):null},h=await axios.get(c,{params:n});return d({type:"FETCH_SUCCESS",payload:h.data}),h}catch(n){return d({type:"FETCH_FAILURE",payload:n.message}),n}}}}function B({selectedLocation:r,onClick:a}){const l=t.useRef(null);return t.useEffect(()=>{l.current&&l.current.focus()},[l]),e.jsxs("button",{ref:l,"aria-label":"Back to search",onClick:a,className:"SelectedLocationButton",children:[e.jsx("strong",{children:r.label.split("/").map(i=>e.jsx("span",{children:i},i))}),e.jsx(A,{})]})}function Y({apiLastModified:r}){var S,E;const[a,l]=t.useState(null),[i,d]=t.useState(null),[p,c]=t.useState(null),[n,h]=t.useState(null),[s,g]=t.useState(null),x=t.useRef(null),m=v();m.setLandingPage("home");const R=f(r),b=f(r),j=f(r);t.useEffect(()=>{R.get("/api/fishes").then(o=>l(o.data.fishes)),b.get("/api/locations").then(o=>d(o.data.locations))},[]),t.useEffect(()=>{const o=m.getUserSelectedFish();o&&h(o)},[]),t.useEffect(()=>{var o;if(s){c(null);let u="/api/fishByLocation/"+s.value.regionId;u+="/"+(((o=s.value)==null?void 0:o.waterId)??0),u+="/"+(n??0),j.get(u).then(w=>{c(w.data.limits)})}},[s,n]);const F=o=>{let u;n===o?u=null:u=o,m.setUserSelectedFish(u),h(u)},C=()=>{g(null),setTimeout(()=>{x.current.click()},10)},y=o=>{g(o)};return e.jsxs(L,{className:`Home ${s?"sub-heading":""}`,children:[e.jsx("header",{children:e.jsx(T,{children:e.jsxs("h1",{className:"hero",children:["Smart ",e.jsx("span",{children:"Fish"})]})})}),e.jsxs("main",{children:[a!==null&&i!==null&&e.jsxs("div",{className:"focused-layout",children:[e.jsx("div",{className:"header",children:s&&e.jsx(B,{selectedLocation:s,onClick:C})}),e.jsxs("div",{className:"body",children:[s?e.jsx(H,{isLoading:j.state.loading,restrictions:p,regionId:(S=s==null?void 0:s.value)==null?void 0:S.regionId,waterId:(E=s==null?void 0:s.value)==null?void 0:E.waterId}):null,e.jsx(I,{className:s?"hidden":"",inputRef:x,locations:i,onChange:y})]})]}),e.jsx("div",{className:"logo",children:e.jsx("img",{src:"/images/logo.png"})})]}),e.jsx("footer",{children:m.screenOrientation.isMobile?e.jsx(N,{fishes:a,selectedFishId:n,selectFish:F}):e.jsx(k,{fishes:a,selectedFishId:n,selectFish:F})})]})}export{Y as default};
