import{r as d,R as Re,j as X}from"./app-BcfCYjP3.js";import{P as c}from"./index-Cd7445Tf.js";function wt({title:e,titleId:t,...r},i){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":t},r),e?d.createElement("title",{id:t},e):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const Ct=d.forwardRef(wt);function be(e,t){if(e==null)return{};var r={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.includes(i))continue;r[i]=e[i]}return r}function M(){return M=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)({}).hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},M.apply(null,arguments)}var ke={exports:{}},b={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ye;function Et(){if(Ye)return b;Ye=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),n=Symbol.for("react.profiler"),o=Symbol.for("react.provider"),u=Symbol.for("react.context"),s=Symbol.for("react.server_context"),a=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),y=Symbol.for("react.suspense_list"),S=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),E=Symbol.for("react.offscreen"),O;O=Symbol.for("react.module.reference");function v(l){if(typeof l=="object"&&l!==null){var L=l.$$typeof;switch(L){case e:switch(l=l.type,l){case r:case n:case i:case m:case y:return l;default:switch(l=l&&l.$$typeof,l){case s:case u:case a:case x:case S:case o:return l;default:return L}}case t:return L}}}return b.ContextConsumer=u,b.ContextProvider=o,b.Element=e,b.ForwardRef=a,b.Fragment=r,b.Lazy=x,b.Memo=S,b.Portal=t,b.Profiler=n,b.StrictMode=i,b.Suspense=m,b.SuspenseList=y,b.isAsyncMode=function(){return!1},b.isConcurrentMode=function(){return!1},b.isContextConsumer=function(l){return v(l)===u},b.isContextProvider=function(l){return v(l)===o},b.isElement=function(l){return typeof l=="object"&&l!==null&&l.$$typeof===e},b.isForwardRef=function(l){return v(l)===a},b.isFragment=function(l){return v(l)===r},b.isLazy=function(l){return v(l)===x},b.isMemo=function(l){return v(l)===S},b.isPortal=function(l){return v(l)===t},b.isProfiler=function(l){return v(l)===n},b.isStrictMode=function(l){return v(l)===i},b.isSuspense=function(l){return v(l)===m},b.isSuspenseList=function(l){return v(l)===y},b.isValidElementType=function(l){return typeof l=="string"||typeof l=="function"||l===r||l===n||l===i||l===m||l===y||l===E||typeof l=="object"&&l!==null&&(l.$$typeof===x||l.$$typeof===S||l.$$typeof===o||l.$$typeof===u||l.$$typeof===a||l.$$typeof===O||l.getModuleId!==void 0)},b.typeOf=v,b}var Ze;function Rt(){return Ze||(Ze=1,ke.exports=Et()),ke.exports}Rt();const Je=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Qe=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",ye=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const r=getComputedStyle(e,null);return Qe(r.overflowY,t)||Qe(r.overflowX,t)||(i=>{const n=(o=>{if(!o.ownerDocument||!o.ownerDocument.defaultView)return null;try{return o.ownerDocument.defaultView.frameElement}catch{return null}})(i);return!!n&&(n.clientHeight<i.scrollHeight||n.clientWidth<i.scrollWidth)})(e)}return!1},xe=(e,t,r,i,n,o,u,s)=>o<e&&u>t||o>e&&u<t?0:o<=e&&s<=r||u>=t&&s>=r?o-e-i:u>t&&s<r||o<e&&s>r?u-t+n:0,Mt=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},Ot=(e,t)=>{var r,i,n,o;if(typeof document>"u")return[];const{inline:u,boundary:s,skipOverflowHiddenElements:a}=t,m=typeof s=="function"?s:j=>j!==s;if(!Je(e))throw new TypeError("Invalid target");const y=document.scrollingElement||document.documentElement,S=[];let x=e;for(;Je(x)&&m(x);){if(x=Mt(x),x===y){S.push(x);break}x!=null&&x===document.body&&ye(x)&&!ye(document.documentElement)||x!=null&&ye(x,a)&&S.push(x)}const E=(i=(r=window.visualViewport)==null?void 0:r.width)!=null?i:innerWidth,O=(o=(n=window.visualViewport)==null?void 0:n.height)!=null?o:innerHeight,{scrollX:v,scrollY:l}=window,{height:L,width:C,top:Y,right:D,bottom:I,left:R}=e.getBoundingClientRect(),{top:B,right:N,left:_}=(j=>{const w=window.getComputedStyle(j);return{top:parseFloat(w.scrollMarginTop)||0,right:parseFloat(w.scrollMarginRight)||0,bottom:parseFloat(w.scrollMarginBottom)||0,left:parseFloat(w.scrollMarginLeft)||0}})(e);let Z=Y-B,V=u==="center"?R+C/2-_+N:u==="end"?D+N:R-_;const le=[];for(let j=0;j<S.length;j++){const w=S[j],{height:ae,width:ee,top:ge,right:se,bottom:me,left:te}=w.getBoundingClientRect();if(Y>=0&&R>=0&&I<=O&&D<=E&&(w===y&&!ye(w)||Y>=ge&&I<=me&&R>=te&&D<=se))return le;const ne=getComputedStyle(w),g=parseInt(ne.borderLeftWidth,10),f=parseInt(ne.borderTopWidth,10),h=parseInt(ne.borderRightWidth,10),p=parseInt(ne.borderBottomWidth,10);let k=0,T=0;const K="offsetWidth"in w?w.offsetWidth-w.clientWidth-g-h:0,$="offsetHeight"in w?w.offsetHeight-w.clientHeight-f-p:0,H="offsetWidth"in w?w.offsetWidth===0?0:ee/w.offsetWidth:0,P="offsetHeight"in w?w.offsetHeight===0?0:ae/w.offsetHeight:0;if(y===w)k=xe(l,l+O,O,f,p,l+Z,l+Z+L,L),T=u==="start"?V:u==="center"?V-E/2:u==="end"?V-E:xe(v,v+E,E,g,h,v+V,v+V+C,C),k=Math.max(0,k+l),T=Math.max(0,T+v);else{k=xe(ge,me,ae,f,p+$,Z,Z+L,L),T=u==="start"?V-te-g:u==="center"?V-(te+ee/2)+K/2:u==="end"?V-se+h+K:xe(te,se,ee,g,h+K,V,V+C,C);const{scrollLeft:A,scrollTop:re}=w;k=P===0?0:Math.max(0,Math.min(re+k/P,w.scrollHeight-ae/P+$)),T=H===0?0:Math.max(0,Math.min(A+T/H,w.scrollWidth-ee/H+K)),Z+=re-k,V+=A-T}le.push({el:w,top:k,left:T})}return le};var oe=function(){return oe=Object.assign||function(t){for(var r,i=1,n=arguments.length;i<n;i++){r=arguments[i];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},oe.apply(this,arguments)};var Dt=0;function rt(){}function St(e,t){if(e){var r=Ot(e,{boundary:t});r.forEach(function(i){var n=i.el,o=i.top,u=i.left;n.scrollTop=o,n.scrollLeft=u})}}function _e(e,t,r){var i=e===t||t instanceof r.Node&&e.contains&&e.contains(t);return i}function it(e,t){var r;function i(){r&&clearTimeout(r)}function n(){for(var o=arguments.length,u=new Array(o),s=0;s<o;s++)u[s]=arguments[s];i(),r=setTimeout(function(){r=null,e.apply(void 0,u)},t)}return n.cancel=i,n}function q(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(i){for(var n=arguments.length,o=new Array(n>1?n-1:0),u=1;u<n;u++)o[u-1]=arguments[u];return t.some(function(s){return s&&s.apply(void 0,[i].concat(o)),i.preventDownshiftDefault||i.hasOwnProperty("nativeEvent")&&i.nativeEvent.preventDownshiftDefault})}}function we(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(i){t.forEach(function(n){typeof n=="function"?n(i):n&&(n.current=i)})}}function kt(){return String(Dt++)}function Te(e,t){return!e||!t?e:Object.keys(e).reduce(function(r,i){return r[i]=ut(t,i)?t[i]:e[i],r},{})}function ut(e,t){return e[t]!==void 0}function Tt(e){var t=e.key,r=e.keyCode;return r>=37&&r<=40&&t.indexOf("Arrow")!==0?"Arrow"+t:t}function Ce(e,t,r,i,n){var o=r.length;if(o===0)return-1;var u=o-1;(typeof e!="number"||e<0||e>u)&&(e=t>0?-1:u+1);var s=e+t;s<0?s=u:s>u&&(s=0);var a=Me(s,t<0,r,i,n);return a===-1?e>=o?-1:e:a}function Me(e,t,r,i,n){n===void 0&&(n=!1);var o=r.length;if(t){for(var u=e;u>=0;u--)if(!i(r[u],u))return u}else for(var s=e;s<o;s++)if(!i(r[s],s))return s;return n?Me(t?o-1:0,t,r,i):-1}function et(e,t,r,i){return i===void 0&&(i=!0),r&&t.some(function(n){return n&&(_e(n,e,r)||i&&_e(n,r.document.activeElement,r))})}var Vt=it(function(e){ot(e).textContent=""},500);function ot(e){var t=e.getElementById("a11y-status-message");return t||(t=e.createElement("div"),t.setAttribute("id","a11y-status-message"),t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions text"),Object.assign(t.style,{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px"}),e.body.appendChild(t),t)}function Kt(e,t){if(!(!e||!t)){var r=ot(t);r.textContent=e,Vt(t)}}function Ht(e){var t=e==null?void 0:e.getElementById("a11y-status-message");t&&t.remove()}var lt={highlightedIndex:-1,isOpen:!1,selectedItem:null,inputValue:""};function Lt(e,t,r){var i=e.props,n=e.type,o={};Object.keys(t).forEach(function(u){Pt(u,e,t,r),r[u]!==t[u]&&(o[u]=r[u])}),i.onStateChange&&Object.keys(o).length&&i.onStateChange(M({type:n},o))}function Pt(e,t,r,i){var n=t.props,o=t.type,u="on"+He(e)+"Change";n[u]&&i[e]!==void 0&&i[e]!==r[e]&&n[u](M({type:o},i))}function $t(e,t){return t.changes}var tt=it(function(e,t){Kt(e,t)},200),At=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"?d.useLayoutEffect:d.useEffect,Bt="useId"in Re?function(t){var r=t.id,i=t.labelId,n=t.menuId,o=t.getItemId,u=t.toggleButtonId,s=t.inputId,a="downshift-"+Re.useId();r||(r=a);var m=d.useRef({labelId:i||r+"-label",menuId:n||r+"-menu",getItemId:o||function(y){return r+"-item-"+y},toggleButtonId:u||r+"-toggle-button",inputId:s||r+"-input"});return m.current}:function(t){var r=t.id,i=r===void 0?"downshift-"+kt():r,n=t.labelId,o=t.menuId,u=t.getItemId,s=t.toggleButtonId,a=t.inputId,m=d.useRef({labelId:n||i+"-label",menuId:o||i+"-menu",getItemId:u||function(y){return i+"-item-"+y},toggleButtonId:s||i+"-toggle-button",inputId:a||i+"-input"});return m.current};function jt(e,t,r,i){var n,o;if(e===void 0){if(t===void 0)throw new Error(i);n=r[t],o=t}else o=t===void 0?r.indexOf(e):t,n=e;return[n,o]}function He(e){return""+e.slice(0,1).toUpperCase()+e.slice(1)}function at(e){var t=d.useRef(e);return t.current=e,t}function Ft(e,t,r,i){var n=d.useRef(),o=d.useRef(),u=d.useCallback(function(E,O){o.current=O,E=Te(E,O.props);var v=e(E,O),l=O.props.stateReducer(E,M({},O,{changes:v}));return l},[e]),s=d.useReducer(u,t,r),a=s[0],m=s[1],y=at(t),S=d.useCallback(function(E){return m(M({props:y.current},E))},[y]),x=o.current;return d.useEffect(function(){var E=Te(n.current,x==null?void 0:x.props),O=x&&n.current&&!i(E,a);O&&Lt(x,E,a),n.current=a},[a,x,i]),[a,S]}var de={itemToString:function(t){return t?String(t):""},itemToKey:function(t){return t},stateReducer:$t,scrollIntoView:St,environment:typeof window>"u"?void 0:window};function G(e,t,r){r===void 0&&(r=lt);var i=e["default"+He(t)];return i!==void 0?i:r[t]}function fe(e,t,r){r===void 0&&(r=lt);var i=e[t];if(i!==void 0)return i;var n=e["initial"+He(t)];return n!==void 0?n:G(e,t,r)}function Wt(e){var t=fe(e,"selectedItem"),r=fe(e,"isOpen"),i=Gt(e),n=fe(e,"inputValue");return{highlightedIndex:i<0&&t&&r?e.items.findIndex(function(o){return e.itemToKey(o)===e.itemToKey(t)}):i,isOpen:r,selectedItem:t,inputValue:n}}function he(e,t,r){var i=e.items,n=e.initialHighlightedIndex,o=e.defaultHighlightedIndex,u=e.isItemDisabled,s=e.itemToKey,a=t.selectedItem,m=t.highlightedIndex;return i.length===0?-1:n!==void 0&&m===n&&!u(i[n],n)?n:o!==void 0&&!u(i[o],o)?o:a?i.findIndex(function(y){return s(a)===s(y)}):r<0&&!u(i[i.length-1],i.length-1)?i.length-1:r>0&&!u(i[0],0)?0:-1}function qt(e,t,r){var i=d.useRef({isMouseDown:!1,isTouchMove:!1,isTouchEnd:!1});return d.useEffect(function(){if(!e)return rt;var n=r.map(function(y){return y.current});function o(){i.current.isTouchEnd=!1,i.current.isMouseDown=!0}function u(y){i.current.isMouseDown=!1,et(y.target,n,e)||t()}function s(){i.current.isTouchEnd=!1,i.current.isTouchMove=!1}function a(){i.current.isTouchMove=!0}function m(y){i.current.isTouchEnd=!0,!i.current.isTouchMove&&!et(y.target,n,e,!1)&&t()}return e.addEventListener("mousedown",o),e.addEventListener("mouseup",u),e.addEventListener("touchstart",s),e.addEventListener("touchmove",a),e.addEventListener("touchend",m),function(){e.removeEventListener("mousedown",o),e.removeEventListener("mouseup",u),e.removeEventListener("touchstart",s),e.removeEventListener("touchmove",a),e.removeEventListener("touchend",m)}},[r,e,t]),i.current}var Nt=function(){return rt};function Ut(e,t,r,i){i===void 0&&(i={});var n=i.document,o=Le();d.useEffect(function(){if(!(!e||o||!n)){var u=e(t);tt(u,n)}},r),d.useEffect(function(){return function(){tt.cancel(),Ht(n)}},[n])}function zt(e){var t=e.highlightedIndex,r=e.isOpen,i=e.itemRefs,n=e.getItemNodeFromIndex,o=e.menuElement,u=e.scrollIntoView,s=d.useRef(!0);return At(function(){t<0||!r||!Object.keys(i.current).length||(s.current===!1?s.current=!0:u(n(t),o))},[t]),s}function nt(e,t,r){var i;r===void 0&&(r=!0);var n=((i=e.items)==null?void 0:i.length)&&t>=0;return M({isOpen:!1,highlightedIndex:-1},n&&M({selectedItem:e.items[t],isOpen:G(e,"isOpen"),highlightedIndex:G(e,"highlightedIndex")},r&&{inputValue:e.itemToString(e.items[t])}))}function Xt(e,t){return e.isOpen===t.isOpen&&e.inputValue===t.inputValue&&e.highlightedIndex===t.highlightedIndex&&e.selectedItem===t.selectedItem}function Le(){var e=Re.useRef(!0);return Re.useEffect(function(){return e.current=!1,function(){e.current=!0}},[]),e.current}function Ve(e){var t=G(e,"highlightedIndex");return t>-1&&e.isItemDisabled(e.items[t],t)?-1:t}function Gt(e){var t=fe(e,"highlightedIndex");return t>-1&&e.isItemDisabled(e.items[t],t)?-1:t}var Ee={environment:c.shape({addEventListener:c.func.isRequired,removeEventListener:c.func.isRequired,document:c.shape({createElement:c.func.isRequired,getElementById:c.func.isRequired,activeElement:c.any.isRequired,body:c.any.isRequired}).isRequired,Node:c.func.isRequired}),itemToString:c.func,itemToKey:c.func,stateReducer:c.func},st=M({},Ee,{getA11yStatusMessage:c.func,highlightedIndex:c.number,defaultHighlightedIndex:c.number,initialHighlightedIndex:c.number,isOpen:c.bool,defaultIsOpen:c.bool,initialIsOpen:c.bool,selectedItem:c.any,initialSelectedItem:c.any,defaultSelectedItem:c.any,id:c.string,labelId:c.string,menuId:c.string,getItemId:c.func,toggleButtonId:c.string,onSelectedItemChange:c.func,onHighlightedIndexChange:c.func,onStateChange:c.func,onIsOpenChange:c.func,scrollIntoView:c.func});function Yt(e,t,r){var i=t.type,n=t.props,o;switch(i){case r.ItemMouseMove:o={highlightedIndex:t.disabled?-1:t.index};break;case r.MenuMouseLeave:o={highlightedIndex:-1};break;case r.ToggleButtonClick:case r.FunctionToggleMenu:o={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:he(n,e,0)};break;case r.FunctionOpenMenu:o={isOpen:!0,highlightedIndex:he(n,e,0)};break;case r.FunctionCloseMenu:o={isOpen:!1};break;case r.FunctionSetHighlightedIndex:o={highlightedIndex:n.isItemDisabled(n.items[t.highlightedIndex],t.highlightedIndex)?-1:t.highlightedIndex};break;case r.FunctionSetInputValue:o={inputValue:t.inputValue};break;case r.FunctionReset:o={highlightedIndex:Ve(n),isOpen:G(n,"isOpen"),selectedItem:G(n,"selectedItem"),inputValue:G(n,"inputValue")};break;default:throw new Error("Reducer called without proper action type.")}return M({},e,o)}oe(oe({},st),{items:c.array.isRequired,isItemDisabled:c.func});oe(oe({},de),{isItemDisabled:function(){return!1}});var Pe=0,$e=1,Ae=2,Be=3,je=4,Fe=5,We=6,qe=7,Ne=8,Oe=9,Ue=10,ct=11,dt=12,ze=13,ft=14,ht=15,gt=16,mt=17,vt=18,Xe=19,pt=20,It=21,Ge=22,bt=Object.freeze({__proto__:null,ControlledPropUpdatedSelectedItem:Ge,FunctionCloseMenu:mt,FunctionOpenMenu:gt,FunctionReset:It,FunctionSelectItem:Xe,FunctionSetHighlightedIndex:vt,FunctionSetInputValue:pt,FunctionToggleMenu:ht,InputBlur:Oe,InputChange:Ne,InputClick:Ue,InputKeyDownArrowDown:Pe,InputKeyDownArrowUp:$e,InputKeyDownEnd:je,InputKeyDownEnter:qe,InputKeyDownEscape:Ae,InputKeyDownHome:Be,InputKeyDownPageDown:We,InputKeyDownPageUp:Fe,ItemClick:ze,ItemMouseMove:dt,MenuMouseLeave:ct,ToggleButtonClick:ft});function Zt(e){var t=Wt(e),r=t.selectedItem,i=t.inputValue;return i===""&&r&&e.defaultInputValue===void 0&&e.initialInputValue===void 0&&e.inputValue===void 0&&(i=e.itemToString(r)),M({},t,{inputValue:i})}M({},st,{items:c.array.isRequired,isItemDisabled:c.func,inputValue:c.string,defaultInputValue:c.string,initialInputValue:c.string,inputId:c.string,onInputValueChange:c.func});function Jt(e,t,r,i){var n=d.useRef(),o=Ft(e,t,r,i),u=o[0],s=o[1],a=Le();return d.useEffect(function(){if(ut(t,"selectedItem")){if(!a){var m=t.itemToKey(t.selectedItem)!==t.itemToKey(n.current);m&&s({type:Ge,inputValue:t.itemToString(t.selectedItem)})}n.current=u.selectedItem===n.current?t.selectedItem:u.selectedItem}},[u.selectedItem,t.selectedItem]),[Te(u,t),s]}var Qt=M({},de,{isItemDisabled:function(){return!1}});function _t(e,t){var r,i=t.type,n=t.props,o=t.altKey,u;switch(i){case ze:u={isOpen:G(n,"isOpen"),highlightedIndex:Ve(n),selectedItem:n.items[t.index],inputValue:n.itemToString(n.items[t.index])};break;case Pe:e.isOpen?u={highlightedIndex:Ce(e.highlightedIndex,1,n.items,n.isItemDisabled,!0)}:u={highlightedIndex:o&&e.selectedItem==null?-1:he(n,e,1),isOpen:n.items.length>=0};break;case $e:e.isOpen?o?u=nt(n,e.highlightedIndex):u={highlightedIndex:Ce(e.highlightedIndex,-1,n.items,n.isItemDisabled,!0)}:u={highlightedIndex:he(n,e,-1),isOpen:n.items.length>=0};break;case qe:u=nt(n,e.highlightedIndex);break;case Ae:u=M({isOpen:!1,highlightedIndex:-1},!e.isOpen&&{selectedItem:null,inputValue:""});break;case Fe:u={highlightedIndex:Ce(e.highlightedIndex,-10,n.items,n.isItemDisabled,!0)};break;case We:u={highlightedIndex:Ce(e.highlightedIndex,10,n.items,n.isItemDisabled,!0)};break;case Be:u={highlightedIndex:Me(0,!1,n.items,n.isItemDisabled)};break;case je:u={highlightedIndex:Me(n.items.length-1,!0,n.items,n.isItemDisabled)};break;case Oe:u=M({isOpen:!1,highlightedIndex:-1},e.highlightedIndex>=0&&((r=n.items)==null?void 0:r.length)&&t.selectItem&&{selectedItem:n.items[e.highlightedIndex],inputValue:n.itemToString(n.items[e.highlightedIndex])});break;case Ne:u={isOpen:!0,highlightedIndex:Ve(n),inputValue:t.inputValue};break;case Ue:u={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:he(n,e,0)};break;case Xe:u={selectedItem:t.selectedItem,inputValue:n.itemToString(t.selectedItem)};break;case Ge:u={inputValue:t.inputValue};break;default:return Yt(e,t,bt)}return M({},e,u)}var en=["onMouseLeave","refKey","ref"],tn=["item","index","refKey","ref","onMouseMove","onMouseDown","onClick","onPress","disabled"],nn=["onClick","onPress","refKey","ref"],rn=["onKeyDown","onChange","onInput","onBlur","onChangeText","onClick","refKey","ref"];Ke.stateChangeTypes=bt;function Ke(e){e===void 0&&(e={});var t=M({},Qt,e),r=t.items,i=t.scrollIntoView,n=t.environment,o=t.getA11yStatusMessage,u=Jt(_t,t,Zt,Xt),s=u[0],a=u[1],m=s.isOpen,y=s.highlightedIndex,S=s.selectedItem,x=s.inputValue,E=d.useRef(null),O=d.useRef({}),v=d.useRef(null),l=d.useRef(null),L=Le(),C=Bt(t),Y=d.useRef(),D=at({state:s,props:t}),I=d.useCallback(function(g){return O.current[C.getItemId(g)]},[C]);Ut(o,s,[m,y,S,x],n);var R=zt({menuElement:E.current,highlightedIndex:y,isOpen:m,itemRefs:O,scrollIntoView:i,getItemNodeFromIndex:I});d.useEffect(function(){var g=fe(t,"isOpen");g&&v.current&&v.current.focus()},[]),d.useEffect(function(){L||(Y.current=r.length)});var B=qt(n,d.useCallback(function(){D.current.state.isOpen&&a({type:Oe,selectItem:!1})},[a,D]),d.useMemo(function(){return[E,l,v]},[E.current,l.current,v.current])),N=Nt();d.useEffect(function(){m||(O.current={})},[m]),d.useEffect(function(){var g;!m||!(n!=null&&n.document)||!(v!=null&&(g=v.current)!=null&&g.focus)||n.document.activeElement!==v.current&&v.current.focus()},[m,n]);var _=d.useMemo(function(){return{ArrowDown:function(f){f.preventDefault(),a({type:Pe,altKey:f.altKey})},ArrowUp:function(f){f.preventDefault(),a({type:$e,altKey:f.altKey})},Home:function(f){D.current.state.isOpen&&(f.preventDefault(),a({type:Be}))},End:function(f){D.current.state.isOpen&&(f.preventDefault(),a({type:je}))},Escape:function(f){var h=D.current.state;(h.isOpen||h.inputValue||h.selectedItem||h.highlightedIndex>-1)&&(f.preventDefault(),a({type:Ae}))},Enter:function(f){var h=D.current.state;!h.isOpen||f.which===229||(f.preventDefault(),a({type:qe}))},PageUp:function(f){D.current.state.isOpen&&(f.preventDefault(),a({type:Fe}))},PageDown:function(f){D.current.state.isOpen&&(f.preventDefault(),a({type:We}))}}},[a,D]),Z=d.useCallback(function(g){return M({id:C.labelId,htmlFor:C.inputId},g)},[C]),V=d.useCallback(function(g,f){var h,p=g===void 0?{}:g,k=p.onMouseLeave,T=p.refKey,K=T===void 0?"ref":T,$=p.ref,H=be(p,en),P=f===void 0?{}:f;return P.suppressRefError,M((h={},h[K]=we($,function(A){E.current=A}),h.id=C.menuId,h.role="listbox",h["aria-labelledby"]=H&&H["aria-label"]?void 0:""+C.labelId,h.onMouseLeave=q(k,function(){a({type:ct})}),h),H)},[a,N,C]),le=d.useCallback(function(g){var f,h,p=g===void 0?{}:g,k=p.item,T=p.index,K=p.refKey,$=K===void 0?"ref":K,H=p.ref,P=p.onMouseMove,A=p.onMouseDown,re=p.onClick;p.onPress;var ie=p.disabled,De=be(p,tn);ie!==void 0&&console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled prop from useCombobox.');var F=D.current,ve=F.props,pe=F.state,Ie=jt(k,T,ve.items,"Pass either item or index to getItemProps!"),Se=Ie[0],W=Ie[1],ue=ve.isItemDisabled(Se,W),U="onClick",J=re,z=function(){B.isTouchEnd||W===pe.highlightedIndex||(R.current=!1,a({type:dt,index:W,disabled:ue}))},Q=function(){a({type:ze,index:W})},yt=function(xt){return xt.preventDefault()};return M((f={},f[$]=we(H,function(ce){ce&&(O.current[C.getItemId(W)]=ce)}),f["aria-disabled"]=ue,f["aria-selected"]=W===pe.highlightedIndex,f.id=C.getItemId(W),f.role="option",f),!ue&&(h={},h[U]=q(J,Q),h),{onMouseMove:q(P,z),onMouseDown:q(A,yt)},De)},[a,C,D,B,R]),j=d.useCallback(function(g){var f,h=g===void 0?{}:g,p=h.onClick;h.onPress;var k=h.refKey,T=k===void 0?"ref":k,K=h.ref,$=be(h,nn),H=D.current.state,P=function(){a({type:ft})};return M((f={},f[T]=we(K,function(A){l.current=A}),f["aria-controls"]=C.menuId,f["aria-expanded"]=H.isOpen,f.id=C.toggleButtonId,f.tabIndex=-1,f),!$.disabled&&M({},{onClick:q(p,P)}),$)},[a,D,C]),w=d.useCallback(function(g,f){var h,p=g===void 0?{}:g,k=p.onKeyDown,T=p.onChange,K=p.onInput,$=p.onBlur;p.onChangeText;var H=p.onClick,P=p.refKey,A=P===void 0?"ref":P,re=p.ref,ie=be(p,rn),De=f===void 0?{}:f;De.suppressRefError;var F=D.current.state,ve=function(z){var Q=Tt(z);Q&&_[Q]&&_[Q](z)},pe=function(z){a({type:Ne,inputValue:z.target.value})},Ie=function(z){if(n!=null&&n.document&&F.isOpen&&!B.isMouseDown){var Q=z.relatedTarget===null&&n.document.activeElement!==n.document.body;a({type:Oe,selectItem:!Q})}},Se=function(){a({type:Ue})},W="onChange",ue={};if(!ie.disabled){var U;ue=(U={},U[W]=q(T,K,pe),U.onKeyDown=q(k,ve),U.onBlur=q($,Ie),U.onClick=q(H,Se),U)}return M((h={},h[A]=we(re,function(J){v.current=J}),h["aria-activedescendant"]=F.isOpen&&F.highlightedIndex>-1?C.getItemId(F.highlightedIndex):"",h["aria-autocomplete"]="list",h["aria-controls"]=C.menuId,h["aria-expanded"]=F.isOpen,h["aria-labelledby"]=ie&&ie["aria-label"]?void 0:C.labelId,h.autoComplete="off",h.id=C.inputId,h.role="combobox",h.value=F.inputValue,h),ue,ie)},[a,C,n,_,D,B,N]),ae=d.useCallback(function(){a({type:ht})},[a]),ee=d.useCallback(function(){a({type:mt})},[a]),ge=d.useCallback(function(){a({type:gt})},[a]),se=d.useCallback(function(g){a({type:vt,highlightedIndex:g})},[a]),me=d.useCallback(function(g){a({type:Xe,selectedItem:g})},[a]),te=d.useCallback(function(g){a({type:pt,inputValue:g})},[a]),ne=d.useCallback(function(){a({type:It})},[a]);return{getItemProps:le,getLabelProps:Z,getMenuProps:V,getInputProps:w,getToggleButtonProps:j,toggleMenu:ae,openMenu:ge,closeMenu:ee,setHighlightedIndex:se,setInputValue:te,selectItem:me,reset:ne,highlightedIndex:y,isOpen:m,selectedItem:S,inputValue:x}}Ee.stateReducer,Ee.itemToKey,Ee.environment,c.array,c.array,c.array,c.func,c.number,c.number,c.number,c.func,c.func,c.string,c.string;de.itemToKey,de.stateReducer,de.environment;function an({className:e="",placeholder:t,inputRef:r,locations:i={},onChange:n,onFocus:o,onBlur:u}){const[s,a]=d.useState(""),m=r||d.useRef(null);d.useEffect(()=>{if(m.current)return o&&m.current.addEventListener("focus",o),u&&m.current.addEventListener("blur",u),()=>{var I,R;(I=m==null?void 0:m.current)==null||I.removeEventListener("focus",o),(R=m==null?void 0:m.current)==null||R.removeEventListener("blur",u)}},[m]);const S=(Object.entries(i??{}).map(([I,R])=>({value:R,label:I}))??[]).filter(I=>un(I,s)),{isOpen:x,getLabelProps:E,getMenuProps:O,getInputProps:v,highlightedIndex:l,getItemProps:L,selectedItem:C}=Ke({inputValue:s,items:S,itemToString(I){return I?I.label:""},onInputValueChange(I){const{stateChangeTypes:R}=Ke;I.type===R.ItemClick||I.type===R.InputKeyDownEnter||I.type===R.InputBlur?n(I.selectedItem):I.type===R.InputChange?a(I.inputValue):n(I.selectedItem)}}),Y=()=>{a("")},D=I=>{const R=I.target,B=R.closest(".LocationCombobox");B.addEventListener("transitionstart",()=>B.addEventListener("transitionend",()=>{var N;return(N=R.parentElement)==null?void 0:N.scrollIntoView({behavior:"smooth",block:"start"})},{once:!0}),{once:!0})};return X.jsxs("div",{className:`LocationCombobox ${e||""}`,children:[X.jsxs("div",{className:"input",...E(),children:[X.jsx("input",{placeholder:t,value:s,...v({ref:m}),onFocus:D}),X.jsx("button",{"aria-label":"Clear Search input",type:"button",onClick:Y,children:X.jsx(Ct,{})})]}),X.jsx("ul",{className:x?"open":"",...O(),children:x&&S.map((I,R)=>X.jsx("li",{className:`${C===I?"selected":""} ${R===l?"highlighted":""}`,...L({item:I,index:R}),children:X.jsx("span",{children:I.label})},I.value.regionId+"-"+I.value.waterId))})]})}const un=(e,t)=>{if(!t)return!0;const r=t.split(" ").map(n=>n.toLowerCase()),i=e.label.split(" ").map(n=>n.toLowerCase());return r.every(n=>i.some(o=>o.includes(n)))};export{an as default};
