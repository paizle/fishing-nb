import{j as r}from"./app-BCCgJSTG.js";import{u as m}from"./useScreenOrientation-fWIRY6s0.js";import s from"./MapMobile-XSmgTcPU.js";import o from"./MapWeb-BPJ5QVsk.js";import{B as n}from"./Breadcrumb-AeRunBv2.js";import{P as p}from"./PublicLayout-BnsZs5HR.js";import{P as u}from"./PublicNav-ChgCrQTb.js";import{u as f}from"./useLandingPage-BISuTH3d.js";import"./NewBrunswickMap-CWXxMUdi.js";import"./ResponsiveNavLink-B60kLsft.js";import"./transition-CWVjSYOA.js";function g({locations:e,breadcrumb:i}){const t=m();return f("location"),e=e.map(a=>(a.hasData=["Lower Saint John","Southwest"].includes(a.name),a)),r.jsxs(p,{className:"Map",children:[r.jsx("header",{children:r.jsx(u,{children:r.jsx(n,{breadcrumb:i})})}),r.jsx("main",{children:t.isPortrait?r.jsx(s,{locations:e}):r.jsx(o,{locations:e})})]})}export{g as default};
