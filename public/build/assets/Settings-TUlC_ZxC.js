import{r as o,j as e}from"./app-D7cm--Ip.js";import{u as l,P as u}from"./PublicLayout-BWWHuv7A.js";import{P as d}from"./PublicNav-DopoB0Q1.js";import"./ResponsiveNavLink-qhBAGbVR.js";import"./transition-C248DujF.js";function j({}){const[,n]=o.useState(!1),a=l(),s=a.getItem("settings"),r=c=>{const t=c.currentTarget;switch(t.type){case"checkbox":s[t.name]=t.checked;break;default:s[t.name]=t.value}a.setItem("settings",s),n(i=>!i)};return e.jsxs(u,{children:[e.jsx("header",{children:e.jsx(d,{children:"Settings"})}),e.jsx("main",{children:e.jsx("div",{className:"Settings",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",onChange:r,name:"gradientBackground",checked:s.gradientBackground,value:!0}),"Gradient Background"]})})})]})}export{j as default};
