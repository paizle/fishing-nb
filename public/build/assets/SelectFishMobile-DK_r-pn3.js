import{r as c,j as t}from"./app-BlCin5dP.js";import{g as n}from"./getFishImageSrc-bMjek-YH.js";const u=({lowResSrc:s,highResSrc:o,alt:i,className:l=""})=>{const[r,a]=c.useState(!1);return t.jsxs("div",{className:`relative ${l}`,children:[r?null:t.jsx("img",{src:s,className:`low-res absolute inset-0 top-0 h-full w-full object-cover object-top transition-opacity duration-100 ${r?"opacity-0":"opacity-100"}`}),t.jsx("img",{src:o,alt:i,className:`h-full w-full object-cover object-top transition-opacity duration-100 ${r?"opacity-100":"opacity-0"}`,onLoad:()=>a(!0)})]})};function p({fishes:s=null,selectedFishId:o=null,selectFish:i=()=>null}){const[l,r]=c.useState(!0),a=c.useRef(null);return c.useEffect(()=>{if(l&&a.current&&s){if(o){const e=a.current.querySelector(`[data-id="${o}"]`);e==null||e.scrollIntoView({behavior:"smooth",inline:"center"})}r(!1)}},[l,a.current,s,o]),t.jsx("div",{className:"SelectFishMobile",ref:a,children:(s||[]).map(e=>t.jsxs("button",{"data-id":e.id,className:`fish ${o===e.id?"selected":""}`,onClick:()=>i(e.id),children:[t.jsx(u,{lowResSrc:"/images/fish-shadow.png",highResSrc:n(e.name),alt:e.name}),t.jsx("div",{className:"name",children:e.name})]},e.name))})}export{p as default};
