import{j as r}from"./app-odsY8-e7.js";import{u as o}from"./useScreenOrientation-BcjjGvAy.js";import m from"./MapMobile-BAHrfl8U.js";import a from"./MapWeb-B3QaWc0x.js";import{P as n,B as p}from"./PublicNav-D-VW9zfl.js";import{P as u}from"./PublicLayout-CYY72ayM.js";import"./NewBrunswickMap-HA8KE3Om.js";import"./ResponsiveNavLink-BijXVtAs.js";import"./transition-DfZiEm31.js";function b({locations:e,breadcrumb:i}){console.log(i),e=e.map(t=>(t.hasData=["Lower Saint John","Southwest"].includes(t.name),t));const s=o();return r.jsxs(u,{children:[r.jsx("header",{children:r.jsx(n,{children:r.jsx(p,{breadcrumb:i})})}),r.jsx("main",{children:s.isPortrait?r.jsx(m,{locations:e}):r.jsx(a,{locations:e})})]})}export{b as default};
