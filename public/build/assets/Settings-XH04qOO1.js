import{r as o,j as e}from"./app-nZScYgf3.js";import{u as l,P as d}from"./PublicLayout-Bsc4SgMZ.js";import{P as u}from"./PublicNav-BaXAy9EP.js";import"./ResponsiveNavLink-C2KJ42QQ.js";import"./transition-DLLws_3E.js";function j({}){const[,n]=o.useState(!1),a=l(),s=a.getItem("settings"),r=c=>{const t=c.currentTarget;switch(t.type){case"checkbox":s[t.name]=t.checked;break;default:s[t.name]=t.value}a.setItem("settings",s),n(i=>!i)};return e.jsxs(d,{children:[e.jsx("header",{className:"shadow",children:e.jsx(u,{children:"Settings"})}),e.jsx("main",{children:e.jsx("div",{className:"Settings",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",onChange:r,name:"gradientBackground",checked:s.gradientBackground,value:!0}),"Gradient Background"]})})})]})}export{j as default};
