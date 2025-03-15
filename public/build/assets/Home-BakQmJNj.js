import{r as c,R as Re,j as E,c as Ct}from"./app-B8I1jQG5.js";import{P as Et}from"./PublicLayout-B77Wcp63.js";import{P as Rt}from"./PublicNav-B44SWTaI.js";import{P as d}from"./FishRestrictionsTable-BGZVhGJ1.js";import St from"./SelectFishMobile-DH-T-sqY.js";import Mt from"./SelectFishDesktop-Bm3lcHtd.js";import Ot from"./FishingRestrictions-D1N1O-IM.js";import"./ResponsiveNavLink-D9CMqMkX.js";import"./transition-BBoEq_KG.js";import"./format-wWbDcfoj.js";import"./Tooltip-8fv9hhnT.js";import"./getFishImageSrc-bMjek-YH.js";import"./parseMySqlDate-BUpSl06p.js";function Dt({title:e,titleId:t,...r},i){return c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":t},r),e?c.createElement("title",{id:t},e):null,c.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"}))}const kt=c.forwardRef(Dt);function Tt({title:e,titleId:t,...r},i){return c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":t},r),e?c.createElement("title",{id:t},e):null,c.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const Ht=c.forwardRef(Tt);function be(e,t){if(e==null)return{};var r={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.includes(i))continue;r[i]=e[i]}return r}function O(){return O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)({}).hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},O.apply(null,arguments)}var ke={exports:{}},w={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ye;function Vt(){if(Ye)return w;Ye=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),n=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),o=Symbol.for("react.context"),s=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),I=Symbol.for("react.suspense_list"),D=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),R=Symbol.for("react.offscreen"),M;M=Symbol.for("react.module.reference");function v(a){if(typeof a=="object"&&a!==null){var F=a.$$typeof;switch(F){case e:switch(a=a.type,a){case r:case n:case i:case f:case I:return a;default:switch(a=a&&a.$$typeof,a){case s:case o:case l:case y:case D:case u:return a;default:return F}}case t:return F}}}return w.ContextConsumer=o,w.ContextProvider=u,w.Element=e,w.ForwardRef=l,w.Fragment=r,w.Lazy=y,w.Memo=D,w.Portal=t,w.Profiler=n,w.StrictMode=i,w.Suspense=f,w.SuspenseList=I,w.isAsyncMode=function(){return!1},w.isConcurrentMode=function(){return!1},w.isContextConsumer=function(a){return v(a)===o},w.isContextProvider=function(a){return v(a)===u},w.isElement=function(a){return typeof a=="object"&&a!==null&&a.$$typeof===e},w.isForwardRef=function(a){return v(a)===l},w.isFragment=function(a){return v(a)===r},w.isLazy=function(a){return v(a)===y},w.isMemo=function(a){return v(a)===D},w.isPortal=function(a){return v(a)===t},w.isProfiler=function(a){return v(a)===n},w.isStrictMode=function(a){return v(a)===i},w.isSuspense=function(a){return v(a)===f},w.isSuspenseList=function(a){return v(a)===I},w.isValidElementType=function(a){return typeof a=="string"||typeof a=="function"||a===r||a===n||a===i||a===f||a===I||a===R||typeof a=="object"&&a!==null&&(a.$$typeof===y||a.$$typeof===D||a.$$typeof===u||a.$$typeof===o||a.$$typeof===l||a.$$typeof===M||a.getModuleId!==void 0)},w.typeOf=v,w}var Ze;function Ft(){return Ze||(Ze=1,ke.exports=Vt()),ke.exports}Ft();const Je=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Qe=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",ye=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const r=getComputedStyle(e,null);return Qe(r.overflowY,t)||Qe(r.overflowX,t)||(i=>{const n=(u=>{if(!u.ownerDocument||!u.ownerDocument.defaultView)return null;try{return u.ownerDocument.defaultView.frameElement}catch{return null}})(i);return!!n&&(n.clientHeight<i.scrollHeight||n.clientWidth<i.scrollWidth)})(e)}return!1},xe=(e,t,r,i,n,u,o,s)=>u<e&&o>t||u>e&&o<t?0:u<=e&&s<=r||o>=t&&s>=r?u-e-i:o>t&&s<r||u<e&&s>r?o-t+n:0,Kt=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},jt=(e,t)=>{var r,i,n,u;if(typeof document>"u")return[];const{inline:o,boundary:s,skipOverflowHiddenElements:l}=t,f=typeof s=="function"?s:N=>N!==s;if(!Je(e))throw new TypeError("Invalid target");const I=document.scrollingElement||document.documentElement,D=[];let y=e;for(;Je(y)&&f(y);){if(y=Kt(y),y===I){D.push(y);break}y!=null&&y===document.body&&ye(y)&&!ye(document.documentElement)||y!=null&&ye(y,l)&&D.push(y)}const R=(i=(r=window.visualViewport)==null?void 0:r.width)!=null?i:innerWidth,M=(u=(n=window.visualViewport)==null?void 0:n.height)!=null?u:innerHeight,{scrollX:v,scrollY:a}=window,{height:F,width:h,top:k,right:S,bottom:B,left:W}=e.getBoundingClientRect(),{top:x,right:V,left:_}=(N=>{const C=window.getComputedStyle(N);return{top:parseFloat(C.scrollMarginTop)||0,right:parseFloat(C.scrollMarginRight)||0,bottom:parseFloat(C.scrollMarginBottom)||0,left:parseFloat(C.scrollMarginLeft)||0}})(e);let Z=k-x,K=o==="center"?W+h/2-_+V:o==="end"?S+V:W-_;const se=[];for(let N=0;N<D.length;N++){const C=D[N],{height:le,width:ee,top:ge,right:ae,bottom:me,left:te}=C.getBoundingClientRect();if(k>=0&&W>=0&&B<=M&&S<=R&&(C===I&&!ye(C)||k>=ge&&B<=me&&W>=te&&S<=ae))return se;const ne=getComputedStyle(C),p=parseInt(ne.borderLeftWidth,10),g=parseInt(ne.borderTopWidth,10),m=parseInt(ne.borderRightWidth,10),b=parseInt(ne.borderBottomWidth,10);let T=0,H=0;const j="offsetWidth"in C?C.offsetWidth-C.clientWidth-p-m:0,$="offsetHeight"in C?C.offsetHeight-C.clientHeight-g-b:0,L="offsetWidth"in C?C.offsetWidth===0?0:ee/C.offsetWidth:0,P="offsetHeight"in C?C.offsetHeight===0?0:le/C.offsetHeight:0;if(I===C)T=xe(a,a+M,M,g,b,a+Z,a+Z+F,F),H=o==="start"?K:o==="center"?K-R/2:o==="end"?K-R:xe(v,v+R,R,p,m,v+K,v+K+h,h),T=Math.max(0,T+a),H=Math.max(0,H+v);else{T=xe(ge,me,le,g,b+$,Z,Z+F,F),H=o==="start"?K-te-p:o==="center"?K-(te+ee/2)+j/2:o==="end"?K-ae+m+j:xe(te,ae,ee,p,m+j,K,K+h,h);const{scrollLeft:A,scrollTop:re}=C;T=P===0?0:Math.max(0,Math.min(re+T/P,C.scrollHeight-le/P+$)),H=L===0?0:Math.max(0,Math.min(A+H/L,C.scrollWidth-ee/L+j)),Z+=re-T,K+=A-H}se.push({el:C,top:T,left:H})}return se};var ue=function(){return ue=Object.assign||function(t){for(var r,i=1,n=arguments.length;i<n;i++){r=arguments[i];for(var u in r)Object.prototype.hasOwnProperty.call(r,u)&&(t[u]=r[u])}return t},ue.apply(this,arguments)};var Lt=0;function it(){}function Pt(e,t){if(e){var r=jt(e,{boundary:t});r.forEach(function(i){var n=i.el,u=i.top,o=i.left;n.scrollTop=u,n.scrollLeft=o})}}function et(e,t,r){var i=e===t||t instanceof r.Node&&e.contains&&e.contains(t);return i}function ot(e,t){var r;function i(){r&&clearTimeout(r)}function n(){for(var u=arguments.length,o=new Array(u),s=0;s<u;s++)o[s]=arguments[s];i(),r=setTimeout(function(){r=null,e.apply(void 0,o)},t)}return n.cancel=i,n}function z(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(i){for(var n=arguments.length,u=new Array(n>1?n-1:0),o=1;o<n;o++)u[o-1]=arguments[o];return t.some(function(s){return s&&s.apply(void 0,[i].concat(u)),i.preventDownshiftDefault||i.hasOwnProperty("nativeEvent")&&i.nativeEvent.preventDownshiftDefault})}}function we(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(i){t.forEach(function(n){typeof n=="function"?n(i):n&&(n.current=i)})}}function $t(){return String(Lt++)}function He(e,t){return!e||!t?e:Object.keys(e).reduce(function(r,i){return r[i]=ut(t,i)?t[i]:e[i],r},{})}function ut(e,t){return e[t]!==void 0}function At(e){var t=e.key,r=e.keyCode;return r>=37&&r<=40&&t.indexOf("Arrow")!==0?"Arrow"+t:t}function Ce(e,t,r,i,n){var u=r.length;if(u===0)return-1;var o=u-1;(typeof e!="number"||e<0||e>o)&&(e=t>0?-1:o+1);var s=e+t;s<0?s=o:s>o&&(s=0);var l=Se(s,t<0,r,i,n);return l===-1?e>=u?-1:e:l}function Se(e,t,r,i,n){n===void 0&&(n=!1);var u=r.length;if(t){for(var o=e;o>=0;o--)if(!i(r[o],o))return o}else for(var s=e;s<u;s++)if(!i(r[s],s))return s;return n?Se(t?u-1:0,t,r,i):-1}function tt(e,t,r,i){return i===void 0&&(i=!0),r&&t.some(function(n){return n&&(et(n,e,r)||i&&et(n,r.document.activeElement,r))})}var Bt=ot(function(e){st(e).textContent=""},500);function st(e){var t=e.getElementById("a11y-status-message");return t||(t=e.createElement("div"),t.setAttribute("id","a11y-status-message"),t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions text"),Object.assign(t.style,{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px"}),e.body.appendChild(t),t)}function Wt(e,t){if(!(!e||!t)){var r=st(t);r.textContent=e,Bt(t)}}function Nt(e){var t=e==null?void 0:e.getElementById("a11y-status-message");t&&t.remove()}var lt={highlightedIndex:-1,isOpen:!1,selectedItem:null,inputValue:""};function Ut(e,t,r){var i=e.props,n=e.type,u={};Object.keys(t).forEach(function(o){qt(o,e,t,r),r[o]!==t[o]&&(u[o]=r[o])}),i.onStateChange&&Object.keys(u).length&&i.onStateChange(O({type:n},u))}function qt(e,t,r,i){var n=t.props,u=t.type,o="on"+Ke(e)+"Change";n[o]&&i[e]!==void 0&&i[e]!==r[e]&&n[o](O({type:u},i))}function zt(e,t){return t.changes}var nt=ot(function(e,t){Wt(e,t)},200),_t=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"?c.useLayoutEffect:c.useEffect,Xt="useId"in Re?function(t){var r=t.id,i=t.labelId,n=t.menuId,u=t.getItemId,o=t.toggleButtonId,s=t.inputId,l="downshift-"+Re.useId();r||(r=l);var f=c.useRef({labelId:i||r+"-label",menuId:n||r+"-menu",getItemId:u||function(I){return r+"-item-"+I},toggleButtonId:o||r+"-toggle-button",inputId:s||r+"-input"});return f.current}:function(t){var r=t.id,i=r===void 0?"downshift-"+$t():r,n=t.labelId,u=t.menuId,o=t.getItemId,s=t.toggleButtonId,l=t.inputId,f=c.useRef({labelId:n||i+"-label",menuId:u||i+"-menu",getItemId:o||function(I){return i+"-item-"+I},toggleButtonId:s||i+"-toggle-button",inputId:l||i+"-input"});return f.current};function Gt(e,t,r,i){var n,u;if(e===void 0){if(t===void 0)throw new Error(i);n=r[t],u=t}else u=t===void 0?r.indexOf(e):t,n=e;return[n,u]}function Ke(e){return""+e.slice(0,1).toUpperCase()+e.slice(1)}function at(e){var t=c.useRef(e);return t.current=e,t}function Yt(e,t,r,i){var n=c.useRef(),u=c.useRef(),o=c.useCallback(function(R,M){u.current=M,R=He(R,M.props);var v=e(R,M),a=M.props.stateReducer(R,O({},M,{changes:v}));return a},[e]),s=c.useReducer(o,t,r),l=s[0],f=s[1],I=at(t),D=c.useCallback(function(R){return f(O({props:I.current},R))},[I]),y=u.current;return c.useEffect(function(){var R=He(n.current,y==null?void 0:y.props),M=y&&n.current&&!i(R,l);M&&Ut(y,R,l),n.current=l},[l,y,i]),[l,D]}var de={itemToString:function(t){return t?String(t):""},itemToKey:function(t){return t},stateReducer:zt,scrollIntoView:Pt,environment:typeof window>"u"?void 0:window};function Y(e,t,r){r===void 0&&(r=lt);var i=e["default"+Ke(t)];return i!==void 0?i:r[t]}function fe(e,t,r){r===void 0&&(r=lt);var i=e[t];if(i!==void 0)return i;var n=e["initial"+Ke(t)];return n!==void 0?n:Y(e,t,r)}function Zt(e){var t=fe(e,"selectedItem"),r=fe(e,"isOpen"),i=rn(e),n=fe(e,"inputValue");return{highlightedIndex:i<0&&t&&r?e.items.findIndex(function(u){return e.itemToKey(u)===e.itemToKey(t)}):i,isOpen:r,selectedItem:t,inputValue:n}}function he(e,t,r){var i=e.items,n=e.initialHighlightedIndex,u=e.defaultHighlightedIndex,o=e.isItemDisabled,s=e.itemToKey,l=t.selectedItem,f=t.highlightedIndex;return i.length===0?-1:n!==void 0&&f===n&&!o(i[n],n)?n:u!==void 0&&!o(i[u],u)?u:l?i.findIndex(function(I){return s(l)===s(I)}):r<0&&!o(i[i.length-1],i.length-1)?i.length-1:r>0&&!o(i[0],0)?0:-1}function Jt(e,t,r){var i=c.useRef({isMouseDown:!1,isTouchMove:!1,isTouchEnd:!1});return c.useEffect(function(){if(!e)return it;var n=r.map(function(I){return I.current});function u(){i.current.isTouchEnd=!1,i.current.isMouseDown=!0}function o(I){i.current.isMouseDown=!1,tt(I.target,n,e)||t()}function s(){i.current.isTouchEnd=!1,i.current.isTouchMove=!1}function l(){i.current.isTouchMove=!0}function f(I){i.current.isTouchEnd=!0,!i.current.isTouchMove&&!tt(I.target,n,e,!1)&&t()}return e.addEventListener("mousedown",u),e.addEventListener("mouseup",o),e.addEventListener("touchstart",s),e.addEventListener("touchmove",l),e.addEventListener("touchend",f),function(){e.removeEventListener("mousedown",u),e.removeEventListener("mouseup",o),e.removeEventListener("touchstart",s),e.removeEventListener("touchmove",l),e.removeEventListener("touchend",f)}},[r,e,t]),i.current}var Qt=function(){return it};function en(e,t,r,i){i===void 0&&(i={});var n=i.document,u=je();c.useEffect(function(){if(!(!e||u||!n)){var o=e(t);nt(o,n)}},r),c.useEffect(function(){return function(){nt.cancel(),Nt(n)}},[n])}function tn(e){var t=e.highlightedIndex,r=e.isOpen,i=e.itemRefs,n=e.getItemNodeFromIndex,u=e.menuElement,o=e.scrollIntoView,s=c.useRef(!0);return _t(function(){t<0||!r||!Object.keys(i.current).length||(s.current===!1?s.current=!0:o(n(t),u))},[t]),s}function rt(e,t,r){var i;r===void 0&&(r=!0);var n=((i=e.items)==null?void 0:i.length)&&t>=0;return O({isOpen:!1,highlightedIndex:-1},n&&O({selectedItem:e.items[t],isOpen:Y(e,"isOpen"),highlightedIndex:Y(e,"highlightedIndex")},r&&{inputValue:e.itemToString(e.items[t])}))}function nn(e,t){return e.isOpen===t.isOpen&&e.inputValue===t.inputValue&&e.highlightedIndex===t.highlightedIndex&&e.selectedItem===t.selectedItem}function je(){var e=Re.useRef(!0);return Re.useEffect(function(){return e.current=!1,function(){e.current=!0}},[]),e.current}function Ve(e){var t=Y(e,"highlightedIndex");return t>-1&&e.isItemDisabled(e.items[t],t)?-1:t}function rn(e){var t=fe(e,"highlightedIndex");return t>-1&&e.isItemDisabled(e.items[t],t)?-1:t}var Ee={environment:d.shape({addEventListener:d.func.isRequired,removeEventListener:d.func.isRequired,document:d.shape({createElement:d.func.isRequired,getElementById:d.func.isRequired,activeElement:d.any.isRequired,body:d.any.isRequired}).isRequired,Node:d.func.isRequired}),itemToString:d.func,itemToKey:d.func,stateReducer:d.func},ct=O({},Ee,{getA11yStatusMessage:d.func,highlightedIndex:d.number,defaultHighlightedIndex:d.number,initialHighlightedIndex:d.number,isOpen:d.bool,defaultIsOpen:d.bool,initialIsOpen:d.bool,selectedItem:d.any,initialSelectedItem:d.any,defaultSelectedItem:d.any,id:d.string,labelId:d.string,menuId:d.string,getItemId:d.func,toggleButtonId:d.string,onSelectedItemChange:d.func,onHighlightedIndexChange:d.func,onStateChange:d.func,onIsOpenChange:d.func,scrollIntoView:d.func});function on(e,t,r){var i=t.type,n=t.props,u;switch(i){case r.ItemMouseMove:u={highlightedIndex:t.disabled?-1:t.index};break;case r.MenuMouseLeave:u={highlightedIndex:-1};break;case r.ToggleButtonClick:case r.FunctionToggleMenu:u={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:he(n,e,0)};break;case r.FunctionOpenMenu:u={isOpen:!0,highlightedIndex:he(n,e,0)};break;case r.FunctionCloseMenu:u={isOpen:!1};break;case r.FunctionSetHighlightedIndex:u={highlightedIndex:n.isItemDisabled(n.items[t.highlightedIndex],t.highlightedIndex)?-1:t.highlightedIndex};break;case r.FunctionSetInputValue:u={inputValue:t.inputValue};break;case r.FunctionReset:u={highlightedIndex:Ve(n),isOpen:Y(n,"isOpen"),selectedItem:Y(n,"selectedItem"),inputValue:Y(n,"inputValue")};break;default:throw new Error("Reducer called without proper action type.")}return O({},e,u)}ue(ue({},ct),{items:d.array.isRequired,isItemDisabled:d.func});ue(ue({},de),{isItemDisabled:function(){return!1}});var Le=0,Pe=1,$e=2,Ae=3,Be=4,We=5,Ne=6,Ue=7,qe=8,Me=9,ze=10,dt=11,ft=12,_e=13,ht=14,gt=15,mt=16,pt=17,vt=18,Xe=19,It=20,bt=21,Ge=22,yt=Object.freeze({__proto__:null,ControlledPropUpdatedSelectedItem:Ge,FunctionCloseMenu:pt,FunctionOpenMenu:mt,FunctionReset:bt,FunctionSelectItem:Xe,FunctionSetHighlightedIndex:vt,FunctionSetInputValue:It,FunctionToggleMenu:gt,InputBlur:Me,InputChange:qe,InputClick:ze,InputKeyDownArrowDown:Le,InputKeyDownArrowUp:Pe,InputKeyDownEnd:Be,InputKeyDownEnter:Ue,InputKeyDownEscape:$e,InputKeyDownHome:Ae,InputKeyDownPageDown:Ne,InputKeyDownPageUp:We,ItemClick:_e,ItemMouseMove:ft,MenuMouseLeave:dt,ToggleButtonClick:ht});function un(e){var t=Zt(e),r=t.selectedItem,i=t.inputValue;return i===""&&r&&e.defaultInputValue===void 0&&e.initialInputValue===void 0&&e.inputValue===void 0&&(i=e.itemToString(r)),O({},t,{inputValue:i})}O({},ct,{items:d.array.isRequired,isItemDisabled:d.func,inputValue:d.string,defaultInputValue:d.string,initialInputValue:d.string,inputId:d.string,onInputValueChange:d.func});function sn(e,t,r,i){var n=c.useRef(),u=Yt(e,t,r,i),o=u[0],s=u[1],l=je();return c.useEffect(function(){if(ut(t,"selectedItem")){if(!l){var f=t.itemToKey(t.selectedItem)!==t.itemToKey(n.current);f&&s({type:Ge,inputValue:t.itemToString(t.selectedItem)})}n.current=o.selectedItem===n.current?t.selectedItem:o.selectedItem}},[o.selectedItem,t.selectedItem]),[He(o,t),s]}var ln=O({},de,{isItemDisabled:function(){return!1}});function an(e,t){var r,i=t.type,n=t.props,u=t.altKey,o;switch(i){case _e:o={isOpen:Y(n,"isOpen"),highlightedIndex:Ve(n),selectedItem:n.items[t.index],inputValue:n.itemToString(n.items[t.index])};break;case Le:e.isOpen?o={highlightedIndex:Ce(e.highlightedIndex,1,n.items,n.isItemDisabled,!0)}:o={highlightedIndex:u&&e.selectedItem==null?-1:he(n,e,1),isOpen:n.items.length>=0};break;case Pe:e.isOpen?u?o=rt(n,e.highlightedIndex):o={highlightedIndex:Ce(e.highlightedIndex,-1,n.items,n.isItemDisabled,!0)}:o={highlightedIndex:he(n,e,-1),isOpen:n.items.length>=0};break;case Ue:o=rt(n,e.highlightedIndex);break;case $e:o=O({isOpen:!1,highlightedIndex:-1},!e.isOpen&&{selectedItem:null,inputValue:""});break;case We:o={highlightedIndex:Ce(e.highlightedIndex,-10,n.items,n.isItemDisabled,!0)};break;case Ne:o={highlightedIndex:Ce(e.highlightedIndex,10,n.items,n.isItemDisabled,!0)};break;case Ae:o={highlightedIndex:Se(0,!1,n.items,n.isItemDisabled)};break;case Be:o={highlightedIndex:Se(n.items.length-1,!0,n.items,n.isItemDisabled)};break;case Me:o=O({isOpen:!1,highlightedIndex:-1},e.highlightedIndex>=0&&((r=n.items)==null?void 0:r.length)&&t.selectItem&&{selectedItem:n.items[e.highlightedIndex],inputValue:n.itemToString(n.items[e.highlightedIndex])});break;case qe:o={isOpen:!0,highlightedIndex:Ve(n),inputValue:t.inputValue};break;case ze:o={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:he(n,e,0)};break;case Xe:o={selectedItem:t.selectedItem,inputValue:n.itemToString(t.selectedItem)};break;case Ge:o={inputValue:t.inputValue};break;default:return on(e,t,yt)}return O({},e,o)}var cn=["onMouseLeave","refKey","ref"],dn=["item","index","refKey","ref","onMouseMove","onMouseDown","onClick","onPress","disabled"],fn=["onClick","onPress","refKey","ref"],hn=["onKeyDown","onChange","onInput","onBlur","onChangeText","onClick","refKey","ref"];Fe.stateChangeTypes=yt;function Fe(e){e===void 0&&(e={});var t=O({},ln,e),r=t.items,i=t.scrollIntoView,n=t.environment,u=t.getA11yStatusMessage,o=sn(an,t,un,nn),s=o[0],l=o[1],f=s.isOpen,I=s.highlightedIndex,D=s.selectedItem,y=s.inputValue,R=c.useRef(null),M=c.useRef({}),v=c.useRef(null),a=c.useRef(null),F=je(),h=Xt(t),k=c.useRef(),S=at({state:s,props:t}),B=c.useCallback(function(p){return M.current[h.getItemId(p)]},[h]);en(u,s,[f,I,D,y],n);var W=tn({menuElement:R.current,highlightedIndex:I,isOpen:f,itemRefs:M,scrollIntoView:i,getItemNodeFromIndex:B});c.useEffect(function(){var p=fe(t,"isOpen");p&&v.current&&v.current.focus()},[]),c.useEffect(function(){F||(k.current=r.length)});var x=Jt(n,c.useCallback(function(){S.current.state.isOpen&&l({type:Me,selectItem:!1})},[l,S]),c.useMemo(function(){return[R,a,v]},[R.current,a.current,v.current])),V=Qt();c.useEffect(function(){f||(M.current={})},[f]),c.useEffect(function(){var p;!f||!(n!=null&&n.document)||!(v!=null&&(p=v.current)!=null&&p.focus)||n.document.activeElement!==v.current&&v.current.focus()},[f,n]);var _=c.useMemo(function(){return{ArrowDown:function(g){g.preventDefault(),l({type:Le,altKey:g.altKey})},ArrowUp:function(g){g.preventDefault(),l({type:Pe,altKey:g.altKey})},Home:function(g){S.current.state.isOpen&&(g.preventDefault(),l({type:Ae}))},End:function(g){S.current.state.isOpen&&(g.preventDefault(),l({type:Be}))},Escape:function(g){var m=S.current.state;(m.isOpen||m.inputValue||m.selectedItem||m.highlightedIndex>-1)&&(g.preventDefault(),l({type:$e}))},Enter:function(g){var m=S.current.state;!m.isOpen||g.which===229||(g.preventDefault(),l({type:Ue}))},PageUp:function(g){S.current.state.isOpen&&(g.preventDefault(),l({type:We}))},PageDown:function(g){S.current.state.isOpen&&(g.preventDefault(),l({type:Ne}))}}},[l,S]),Z=c.useCallback(function(p){return O({id:h.labelId,htmlFor:h.inputId},p)},[h]),K=c.useCallback(function(p,g){var m,b=p===void 0?{}:p,T=b.onMouseLeave,H=b.refKey,j=H===void 0?"ref":H,$=b.ref,L=be(b,cn),P=g===void 0?{}:g;return P.suppressRefError,O((m={},m[j]=we($,function(A){R.current=A}),m.id=h.menuId,m.role="listbox",m["aria-labelledby"]=L&&L["aria-label"]?void 0:""+h.labelId,m.onMouseLeave=z(T,function(){l({type:dt})}),m),L)},[l,V,h]),se=c.useCallback(function(p){var g,m,b=p===void 0?{}:p,T=b.item,H=b.index,j=b.refKey,$=j===void 0?"ref":j,L=b.ref,P=b.onMouseMove,A=b.onMouseDown,re=b.onClick;b.onPress;var ie=b.disabled,Oe=be(b,dn);ie!==void 0&&console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled prop from useCombobox.');var U=S.current,pe=U.props,ve=U.state,Ie=Gt(T,H,pe.items,"Pass either item or index to getItemProps!"),De=Ie[0],q=Ie[1],oe=pe.isItemDisabled(De,q),X="onClick",J=re,G=function(){x.isTouchEnd||q===ve.highlightedIndex||(W.current=!1,l({type:ft,index:q,disabled:oe}))},Q=function(){l({type:_e,index:q})},xt=function(wt){return wt.preventDefault()};return O((g={},g[$]=we(L,function(ce){ce&&(M.current[h.getItemId(q)]=ce)}),g["aria-disabled"]=oe,g["aria-selected"]=q===ve.highlightedIndex,g.id=h.getItemId(q),g.role="option",g),!oe&&(m={},m[X]=z(J,Q),m),{onMouseMove:z(P,G),onMouseDown:z(A,xt)},Oe)},[l,h,S,x,W]),N=c.useCallback(function(p){var g,m=p===void 0?{}:p,b=m.onClick;m.onPress;var T=m.refKey,H=T===void 0?"ref":T,j=m.ref,$=be(m,fn),L=S.current.state,P=function(){l({type:ht})};return O((g={},g[H]=we(j,function(A){a.current=A}),g["aria-controls"]=h.menuId,g["aria-expanded"]=L.isOpen,g.id=h.toggleButtonId,g.tabIndex=-1,g),!$.disabled&&O({},{onClick:z(b,P)}),$)},[l,S,h]),C=c.useCallback(function(p,g){var m,b=p===void 0?{}:p,T=b.onKeyDown,H=b.onChange,j=b.onInput,$=b.onBlur;b.onChangeText;var L=b.onClick,P=b.refKey,A=P===void 0?"ref":P,re=b.ref,ie=be(b,hn),Oe=g===void 0?{}:g;Oe.suppressRefError;var U=S.current.state,pe=function(G){var Q=At(G);Q&&_[Q]&&_[Q](G)},ve=function(G){l({type:qe,inputValue:G.target.value})},Ie=function(G){if(n!=null&&n.document&&U.isOpen&&!x.isMouseDown){var Q=G.relatedTarget===null&&n.document.activeElement!==n.document.body;l({type:Me,selectItem:!Q})}},De=function(){l({type:ze})},q="onChange",oe={};if(!ie.disabled){var X;oe=(X={},X[q]=z(H,j,ve),X.onKeyDown=z(T,pe),X.onBlur=z($,Ie),X.onClick=z(L,De),X)}return O((m={},m[A]=we(re,function(J){v.current=J}),m["aria-activedescendant"]=U.isOpen&&U.highlightedIndex>-1?h.getItemId(U.highlightedIndex):"",m["aria-autocomplete"]="list",m["aria-controls"]=h.menuId,m["aria-expanded"]=U.isOpen,m["aria-labelledby"]=ie&&ie["aria-label"]?void 0:h.labelId,m.autoComplete="off",m.id=h.inputId,m.role="combobox",m.value=U.inputValue,m),oe,ie)},[l,h,n,_,S,x,V]),le=c.useCallback(function(){l({type:gt})},[l]),ee=c.useCallback(function(){l({type:pt})},[l]),ge=c.useCallback(function(){l({type:mt})},[l]),ae=c.useCallback(function(p){l({type:vt,highlightedIndex:p})},[l]),me=c.useCallback(function(p){l({type:Xe,selectedItem:p})},[l]),te=c.useCallback(function(p){l({type:It,inputValue:p})},[l]),ne=c.useCallback(function(){l({type:bt})},[l]);return{getItemProps:se,getLabelProps:Z,getMenuProps:K,getInputProps:C,getToggleButtonProps:N,toggleMenu:le,openMenu:ge,closeMenu:ee,setHighlightedIndex:ae,setInputValue:te,selectItem:me,reset:ne,highlightedIndex:I,isOpen:f,selectedItem:D,inputValue:y}}Ee.stateReducer,Ee.itemToKey,Ee.environment,d.array,d.array,d.array,d.func,d.number,d.number,d.number,d.func,d.func,d.string,d.string;de.itemToKey,de.stateReducer,de.environment;const gn=(e,t)=>{if(!t)return!0;const r=t.split(" ").map(n=>n.toLowerCase()),i=e.label.split(" ").map(n=>n.toLowerCase());return r.every(n=>i.some(u=>u.includes(n)))};function mn({className:e="",placeholder:t,inputRef:r,items:i=[],onChange:n}){const[u,o]=c.useState(""),s=r||c.useRef(null),l=(i??[]).filter(h=>gn(h,u)),{isOpen:f,getLabelProps:I,getMenuProps:D,getInputProps:y,highlightedIndex:R,getItemProps:M,selectedItem:v}=Fe({inputValue:u,items:l,itemToString(h){return h?h.label:""},onInputValueChange(h){const{stateChangeTypes:k}=Fe;h.type===k.ItemClick||h.type===k.InputKeyDownEnter?n(h.selectedItem):o(h.inputValue)}}),a=()=>{o("")},F=h=>{const k=h.target,S=k.closest(".Combobox");S.addEventListener("transitionstart",()=>S.addEventListener("transitionend",()=>{var B;return(B=k.parentElement)==null?void 0:B.scrollIntoView({behavior:"smooth",block:"start"})},{once:!0}),{once:!0})};return E.jsxs("div",{className:`Combobox ${e||""}`,children:[E.jsxs("div",{className:"input",...I(),children:[E.jsx("input",{placeholder:t,value:u,...y({ref:s}),onFocus:F}),E.jsx("button",{"aria-label":"Clear Search input",type:"button",onClick:a,children:E.jsx(Ht,{})})]}),E.jsx("ul",{className:f?"open":"",...D(),children:f&&l.map((h,k)=>E.jsx("li",{className:`${v===h?"selected":""} ${k===R?"highlighted":""}`,...M({item:h,index:k}),children:E.jsx("span",{children:h.label})},h.value.regionId+"-"+h.value.waterId))})]})}function Te(e){const t={loading:!1,error:null,data:null},r=(o,s)=>{switch(s.type){case"FETCH_START":return{...o,loading:!0,error:null};case"FETCH_SUCCESS":return{...o,loading:!1,data:s.payload};case"FETCH_FAILURE":return{...o,loading:!1,error:s.payload};default:return o}},[i,n]=c.useReducer(r,t);return{state:i,get:async o=>{n({type:"FETCH_START"});try{const s={nocache:e?Date.parse(e):null},l=await axios.get(o,{params:s});return n({type:"FETCH_SUCCESS",payload:l.data}),l}catch(s){return n({type:"FETCH_FAILURE",payload:s.message}),s}}}}function Dn({apiLastModified:e}){var B,W;const[t,r]=c.useState(null),[i,n]=c.useState(null),[u,o]=c.useState(null),[s,l]=c.useState(null),[f,I]=c.useState(null),D=Ct();D.setLandingPage("home");const y=Te(e),R=Te(e),M=Te(e),v=c.useRef(null);c.useEffect(()=>{y.get("/api/fishes").then(x=>{r(x.data.fishes)}),R.get("/api/locations").then(x=>n(x.data.locations))},[]),c.useEffect(()=>{const x=D.getUserSelectedFish();x&&l(x)},[]);const a=x=>{let V;s===x?V=null:V=x,D.setUserSelectedFish(V),l(V)},F=()=>{k.find(x=>{if(!x.value.waterId&&x.value.regionId===f.value.regionId)return x}),I(null),setTimeout(()=>{S.current.click()},10)};c.useEffect(()=>{var x;if(f){o(null);let V="/api/fishByLocation/"+f.value.regionId;V+="/"+(((x=f.value)==null?void 0:x.waterId)??0),V+="/"+(s??0),M.get(V).then(_=>{o(_.data.limits)})}},[f,s]),c.useEffect(()=>{f&&v.current.focus()},[f]);const h=c.memo(Rt),k=c.useMemo(()=>Object.entries(i??{}).map(([x,V])=>({value:V,label:x})),[i]),S=c.useRef(null);return E.jsxs(Et,{className:`Home ${f?"location-selected":""}`,children:[E.jsx("header",{className:`${f?"":"shadow"}`,children:E.jsx(h,{children:E.jsxs("h1",{className:"hero",children:["Smart ",E.jsx("span",{children:"Fish"})]})})}),E.jsxs("main",{children:[t!==null&&i!==null&&E.jsxs("div",{className:"focused-layout",children:[E.jsx("div",{className:"header",children:f&&E.jsxs("button",{ref:v,onClick:()=>F(),className:"selected-location flex items-center gap-2",children:[E.jsx("strong",{children:f.label.split("/").map(x=>E.jsx("span",{children:x},x))}),E.jsx(kt,{})]})}),E.jsxs("div",{className:"body",children:[f?E.jsx(Ot,{isLoading:M.state.loading,restrictions:u,regionId:(B=f==null?void 0:f.value)==null?void 0:B.regionId,waterId:(W=f==null?void 0:f.value)==null?void 0:W.waterId}):null,E.jsx(mn,{className:f?"hidden":"",inputRef:S,items:k,placeholder:"Search by river, lake or region",onChange:x=>{I(x)}})]})]}),E.jsx("div",{className:"logo",children:E.jsx("img",{src:"/images/logo.png"})})]}),E.jsx("footer",{children:D.screenOrientation.isMobile?E.jsx(St,{fishes:t,selectedFishId:s,selectFish:a}):E.jsx(Mt,{fishes:t,selectedFishId:s,selectFish:a})})]})}export{Dn as default};
