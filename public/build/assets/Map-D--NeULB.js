import{j as r}from"./app-nZScYgf3.js";import{u as t}from"./useScreenOrientation-CfMFt69X.js";import m from"./MapMobile-BFwyc_V_.js";import o from"./MapWeb-D1dhUJeC.js";import{B as n}from"./Breadcrumb-BXxNUami.js";import{P as p}from"./PublicLayout-Bsc4SgMZ.js";import{P as u}from"./PublicNav-BaXAy9EP.js";import{u as c}from"./useLandingPage-DS4zWXN1.js";import"./NewBrunswickMap-CazmSA8G.js";import"./ResponsiveNavLink-C2KJ42QQ.js";import"./transition-DLLws_3E.js";function L({locations:a,breadcrumb:i}){const s=t();return c("location"),a=a.map(e=>(e.hasData=["Lower Saint John","Southwest","Upper Saint John"].includes(e.name),e)),r.jsxs(p,{className:"Map",children:[r.jsx("header",{className:"shadow",children:r.jsx(u,{children:r.jsx(n,{breadcrumb:i})})}),r.jsx("main",{children:s.isPortrait?r.jsx(m,{locations:a}):r.jsx(o,{locations:a})})]})}export{L as default};
