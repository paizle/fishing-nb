import{r,j as e,x as j}from"./app-B8I1jQG5.js";import{P as p}from"./PublicLayout-B77Wcp63.js";import{B as w}from"./Breadcrumb-DVWKmk8q.js";import{P as N}from"./PublicNav-B44SWTaI.js";import"./ResponsiveNavLink-D9CMqMkX.js";import"./transition-BBoEq_KG.js";function C({waters:o,breadcrumb:u}){const d=o,[a,n]=r.useState([]),[i,h]=r.useState(""),t=r.useRef(null),m=r.useRef(null);r.useEffect(()=>{t.current&&t.current.focus()},[t.current]);const x=s=>{const l=s.target.value;if(h(l),l.length){const f=d.filter(c=>c.water?c.water.name.toLowerCase().includes(l.trim().toLowerCase()):!1);n(f)}else n([])};return e.jsxs(p,{children:[e.jsx("header",{className:"shadow",children:e.jsx(N,{children:e.jsx(w,{breadcrumb:u})})}),e.jsx("main",{children:e.jsx("div",{className:"Region",children:e.jsxs("div",{className:"autocomplete",children:[e.jsx("header",{children:e.jsxs("label",{children:[e.jsx("span",{children:"Search by Waters"}),e.jsx("input",{ref:t,onChange:x,placeholder:'hint: Try searching "lake" or "stream"'})]})}),e.jsx("div",{className:`results ${a.length||i?"has-results":null}`,children:e.jsx("ul",{ref:m,className:"",children:a.length?a.map(s=>e.jsx("li",{children:e.jsx(j,{href:route("location.water",{id:s.water.id}),children:s.water.name})},s.water.id)):i&&e.jsx("div",{className:"p-4",children:"(no results)"})})})]})})})]})}export{C as default};
