import{r as s,j as o}from"./app-DN3OowiO.js";import{g as u}from"./getFishImageSrc-bMjek-YH.js";const m=({lowResSrc:n,highResSrc:l,alt:t,className:i=""})=>{const[a,c]=s.useState(!1);return o.jsxs("div",{className:`relative ${i}`,children:[a?null:o.jsx("img",{src:n,className:`low-res absolute inset-0 top-0 h-full w-full object-cover object-top transition-opacity duration-100 ${a?"opacity-0":"opacity-100"}`}),o.jsx("img",{src:l,alt:t,className:`h-full w-full object-cover object-top transition-opacity duration-100 ${a?"opacity-100":"opacity-0"}`,onLoad:()=>c(!0)})]})},j=s.memo(function({fishes:l=null,selectedFishId:t=null,selectFish:i=()=>null}){const[a,c]=s.useState(!0),r=s.useRef(null);return s.useEffect(()=>{a&&r.current&&l&&(t&&setTimeout(()=>{const e=r.current.querySelector(`[data-id="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",inline:"center"})}),c(!1))},[a,r.current,l,t]),o.jsx("div",{className:"SelectFishMobile",ref:r,role:"listbox","aria-label":"Select a fish",children:(l||[]).map(e=>o.jsxs("button",{role:"option","aria-selected":t===e.id,"data-id":e.id,className:`fish ${t===e.id?"selected":""}`,onClick:()=>i(e.id),children:[o.jsx(m,{lowResSrc:"/images/fish-shadow.png",highResSrc:u(e.name),alt:e.name}),o.jsx("div",{className:"name",children:e.name})]},e.name))})});export{j as default};
