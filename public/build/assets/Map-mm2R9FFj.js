import{j as r}from"./app-0ndMER8L.js";import{u as i}from"./useScreenOrientation-CI_aCMKE.js";import t from"./MapMobile-BTNg6GRc.js";import o from"./MapWeb-CzWp2MRU.js";import{B as p}from"./Breadcrumb-DvPqMUIM.js";import{P as n}from"./PublicLayout-CqDr5A-l.js";import{P as u}from"./PublicNav-C9pJnXdw.js";import{u as d}from"./useLandingPage-7SEC3ODy.js";import"./NewBrunswickMap-yveRLCN9.js";import"./ResponsiveNavLink-CsKfJl-D.js";import"./transition-DZabKXCt.js";function B({locations:a,breadcrumb:e}){const m=i();return d("location"),a=a.map(s=>(s.hasData=s.has_data,s)),r.jsxs(n,{className:"Map",children:[r.jsx("header",{className:"shadow",children:r.jsx(u,{children:r.jsx(p,{breadcrumb:e})})}),r.jsx("main",{children:m.isPortrait?r.jsx(t,{locations:a}):r.jsx(o,{locations:a})})]})}export{B as default};
