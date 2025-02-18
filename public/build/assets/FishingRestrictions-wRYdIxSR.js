import{j as o,r as u}from"./app-DcVFl9p3.js";import{F as g,P as m}from"./FishRestrictionsTable-B49B66A2.js";import{p as h,c as p}from"./parseMySqlDate-DjqKqIUd.js";import{g as f}from"./getFishImageSrc-bMjek-YH.js";import"./format-CU-xZK7a.js";import"./useScreenOrientation-DZ87e03B.js";class l{constructor(t){Object.assign(this,l.convertToFishingRestriction(t))}static convertToFishingRestriction(t){var e,s,i,n;return{id:t.id,seasonStart:h(t.season_start),seasonEnd:h(t.season_end),bagLimit:t.bag_limit,hookLimit:t.hook_limit,minSize:t.minimum_size,maxSize:t.maximum_size,fishingMethod:l.formatFishingMethod(t),tidal:((e=t==null?void 0:t.tidal_category)==null?void 0:e.name)??"",water:((s=t==null?void 0:t.water)==null?void 0:s.name)??"",watersCategory:((i=t==null?void 0:t.waters_category)==null?void 0:i.name)??"",boundary:((n=t==null?void 0:t.boundary_category)==null?void 0:n.name)??"",waterDescription:t.water_description??""}}static sortBySeasonAndGenerality(t){return t.sort((e,s)=>{let i=null;return!i&&e.fishingMethod&&(i=e.fishingMethod.localeCompare(s.fishingMethod)),i||(i=p(e.seasonStart,s.seasonStart)),!i&&e.boundary&&(i=s.boundary.localeCompare(e.boundary)),i||(e.water||e.fishingMethod||e.tidal||e.waterDescription?1:p(s.seasonEnd,e.seasonEnd))})}static formatFishingMethod(t){var s,i;let e="";return((s=t==null?void 0:t.fishing_method)==null?void 0:s.name)==="May only be angled by artificial fly or baited barbless hook with a single point"?e="Fly Fishing":e=((i=t==null?void 0:t.fishing_method)==null?void 0:i.name)??"",e}static setupGroups(t,e){Object.keys(t).forEach(s=>{const i={};let n=0;for(;n<t[s].restrictions.length;){const d=t[s].restrictions[n],c=e.map(r=>d[r]).join("-");i[c]?(i[c].group||(i[c].group=[]),i[c].group.push(d),t[s].restrictions.splice(n,1)):(i[c]=d,n++)}})}static sortRestrictions(t){Object.keys(t).forEach(e=>{t[e].restrictions=l.sortBySeasonAndGenerality(t[e].restrictions)})}}function y(a){if(!(a!=null&&a.length))return;const t=a.reduce((e,s)=>{var n;const i=((n=s==null?void 0:s.fish)==null?void 0:n.name)??null;return e[i]||(e[i]={restrictions:[]}),e[i].restrictions.push(l.convertToFishingRestriction(s)),e},{});return l.sortRestrictions(t),l.setupGroups(t,["fishingMethod","tidal","waterDescription","water","boundary","watersCategory"]),t}function b({className:a=""}){return o.jsxs("svg",{className:`LoadingSpinner -ml-1 mr-3 h-5 w-5 animate-spin ${a}`,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[o.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),o.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})}function x({isLoading:a,restrictions:t,locationId:e,waterId:s}){const[i,n]=u.useState([]),d=y(t);u.useEffect(()=>{let r=[];e===6&&r.push("boundary"),s&&r.push("watersCategory"),n(r)},[e,s]);const c=()=>a?o.jsx("div",{className:"loading",children:o.jsx(b,{})}):t?t.length===0?o.jsx("div",{className:"no-results",children:"(no results)"}):Object.keys(d??{}).map(r=>o.jsx(g,{fishName:r,fishImageSrc:f(r),restrictions:d[r].restrictions,hiddenFields:i},r)):null;return o.jsx("div",{className:"FishingRestrictions",children:c()})}x.propTypes={isLoading:m.bool,restrictions:m.arrayOf(m.object),regionId:m.number.isRequired,waterId:m.number};export{x as default};
