import{j as r,S as o}from"./app-CLyy3tIZ.js";import{u as a}from"./useScreenOrientation-DTaq6zsM.js";import n from"./MapMobile-dqORfqw3.js";import m from"./MapWeb-BOdBBuJb.js";import{B as p}from"./Breadcrumb-CXTHotR0.js";import{P as u}from"./PublicLayout-DXCyzmDH.js";import"./NewBrunswickMap-JUl5ck2-.js";function c({locations:e,breadcrumb:s}){console.log(s),e=e.map(t=>(t.hasData=["Lower Saint John","Southwest"].includes(t.name),t));const i=a();return r.jsxs(u,{children:[r.jsx(o,{title:"Fishing Regulations"}),r.jsx("header",{children:r.jsx(p,{breadcrumb:s})}),r.jsx("main",{children:i.isPortrait?r.jsx(n,{locations:e}):r.jsx(m,{locations:e})})]})}export{c as default};
