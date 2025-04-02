const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Map-DFazQKdh.js","assets/app-qgmEBhhY.js","assets/app-l4988D9n.css","assets/Map-BpnQcFGz.css"])))=>i.map(i=>d[i]);
import{r as s,j as e,u as b,_ as T}from"./app-qgmEBhhY.js";import{P as I}from"./PublicLayout-BkOHBGwz.js";import"./ResponsiveNavLink-Dkyc1BMV.js";import N from"./LocationCombobox-CWgKg79W.js";import k from"./SelectFishMobile-avxtdSLY.js";import U from"./SelectFishDesktop-CRsKy9Nu.js";import{L as A,F as H}from"./FishingRestrictions-6KpOiAGT.js";import{P}from"./PublicNav-CV2vgnDV.js";import"./transition-B7NeMBtk.js";import"./index-CZRUkRAZ.js";import"./getFishImageSrc-bMjek-YH.js";import"./FishRestrictionsTable-Ce52-gE6.js";function B({title:o,titleId:r,...a},l){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:l,"aria-labelledby":r},a),o?s.createElement("title",{id:r},o):null,s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"}))}const D=s.forwardRef(B);function f(o){const r={loading:!1,error:null,data:null},a=(i,t)=>{switch(t.type){case"FETCH_START":return{...i,loading:!0,error:null};case"FETCH_SUCCESS":return{...i,loading:!1,data:t.payload};case"FETCH_FAILURE":return{...i,loading:!1,error:t.payload};default:return i}},[l,c]=s.useReducer(a,r);return{state:l,get:async i=>{c({type:"FETCH_START"});try{const t={nocache:o?Date.parse(o):null},h=await axios.get(i,{params:t});return c({type:"FETCH_SUCCESS",payload:h.data}),h}catch(t){return c({type:"FETCH_FAILURE",payload:t.message}),t}}}}function M({selectedLocation:o,onClick:r}){const a=s.useRef(null);return s.useEffect(()=>{a.current&&a.current.focus()},[a]),e.jsxs("button",{ref:a,"aria-label":"Back to search",onClick:r,className:"SelectedLocationButton",children:[e.jsx("strong",{children:o.label.split("/").map(l=>e.jsx("span",{children:l},l))}),e.jsx(D,{})]})}function O({apiLastModified:o,selectedLocation:r,selectedFish:a,selectFish:l,children:c}){const[u,i]=s.useState(null),t=b(),h=f(o);return s.useEffect(()=>{h.get("/api/fishes").then(p=>i(p.data.fishes))},[]),e.jsxs(I,{className:`SmartFishLayout ${r?"sub-heading":""}`,children:[e.jsx("header",{children:e.jsx(P,{children:e.jsxs("h1",{className:"hero",children:["Smart ",e.jsx("span",{children:"Fish"})]})})}),e.jsx("main",{children:c}),e.jsx("footer",{children:t.screenOrientation.isMobile?e.jsx(k,{fishes:u,selectedFishId:a,selectFish:l}):e.jsx(U,{fishes:u,selectedFishId:a,selectFish:l})})]})}const z=s.lazy(()=>T(()=>import("./Map-DFazQKdh.js"),__vite__mapDeps([0,1,2,3])));function te({apiLastModified:o}){var E,y;const[r,a]=s.useState(null),[l,c]=s.useState(null),[u,i]=s.useState(null),[t,h]=s.useState(null),[p,x]=s.useState(null),[S,g]=s.useState(!1),j=s.useRef(null),m=b();m.setLandingPage("home"),f(o);const C=f(o),F=f(o);s.useState(()=>{x(m.getUserSelectedRegion())},[]);const R=n=>{m.setUserSelectedRegion(n),x(n),g(!1)};s.useEffect(()=>{C.get("/api/locations").then(n=>a(n.data.locations))},[]),s.useEffect(()=>{const n=m.getUserSelectedFish();n&&i(n)},[]),s.useEffect(()=>{var n;if(t){c(null);let d="/api/fishByLocation/"+t.value.regionId;d+="/"+(((n=t.value)==null?void 0:n.waterId)??0),d+="/"+(u??0),F.get(d).then(_=>{c(_.data.limits)})}},[t,u]);const w=n=>{let d;u===n?d=null:d=n,m.setUserSelectedFish(d),i(d)},L=()=>{h(null),setTimeout(()=>{j.current.click()},10)},v=n=>{h(n)};return e.jsxs(O,{selectedLocation:t,selectedFish:u,selectFish:w,children:[S&&e.jsx(s.Suspense,{fallback:e.jsx("div",{className:"loading",children:e.jsx(A,{})}),children:e.jsx(z,{apiLastModified:o,locations:r,selectRegion:R,setShowMap:g})}),!S&&r!==null&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"focused-layout",children:[e.jsx("div",{className:"header",children:t&&e.jsx(M,{selectedLocation:t,onClick:L})}),e.jsxs("div",{className:"body",children:[t?e.jsx(H,{isLoading:F.state.loading,restrictions:l,regionId:(E=t==null?void 0:t.value)==null?void 0:E.regionId,waterId:(y=t==null?void 0:t.value)==null?void 0:y.waterId}):null,e.jsx(N,{className:t?"hidden":"",inputRef:j,locations:r,selectedRegion:p,selectRegion:R,onChange:v,setShowMap:g})]})]}),e.jsx("div",{className:"logo",children:e.jsx("img",{src:"/images/logo.png"})})]})]})}export{te as default};
