import{j as r}from"./app-mVeZBTl1.js";import{u as m}from"./useScreenOrientation-B8yJaPhD.js";import o from"./MapMobile-Cb9kKH2r.js";import s from"./MapWeb-CYp9Oy-M.js";import{B as n}from"./Breadcrumb-C6hNknGO.js";import{P as p}from"./PublicLayout-Du4siIcy.js";import{P as u}from"./PublicNav-BB5j33Kz.js";import{u as f}from"./useLandingPage-BgHHx24U.js";import"./NewBrunswickMap-CTgPbAWA.js";import"./ResponsiveNavLink-CE0UvYEP.js";import"./transition-BC5NgB_D.js";function g({locations:e,breadcrumb:i}){const t=m();return f("location"),e=e.map(a=>(a.hasData=["Lower Saint John","Southwest","Upper Saint John"].includes(a.name),a)),r.jsxs(p,{className:"Map",children:[r.jsx("header",{children:r.jsx(u,{children:r.jsx(n,{breadcrumb:i})})}),r.jsx("main",{children:t.isPortrait?r.jsx(o,{locations:e}):r.jsx(s,{locations:e})})]})}export{g as default};
