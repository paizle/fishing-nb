import{r as o,j as t}from"./app-DHDDhxRc.js";import{u as n,B as m}from"./Breadcrumb-B2R_h-4r.js";import u from"./MapMobile-CaTEnwwC.js";import p from"./MapWeb-pLT5Dlus.js";import{u as c,P as f}from"./PublicLayout-DyYn7qF8.js";import{P as x}from"./PublicNav-B6fPUg7k.js";import"./NewBrunswickMap-uFVzCtx2.js";import"./ResponsiveNavLink-CQq5Il3L.js";import"./transition-BeM7JSPX.js";function E({locations:r,breadcrumb:a}){const i=n(),s=c();return o.useEffect(()=>{const e=s.getItem("settings");e.landingPage="location",s.setItem("settings",e)},[]),r=r.map(e=>(e.hasData=["Lower Saint John","Southwest"].includes(e.name),e)),t.jsxs(f,{children:[t.jsx("header",{children:t.jsx(x,{children:t.jsx(m,{breadcrumb:a})})}),t.jsx("main",{children:i.isPortrait?t.jsx(u,{locations:r}):t.jsx(p,{locations:r})})]})}export{E as default};
