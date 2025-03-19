import{r as c,R as Re,j as X}from"./app-DN3OowiO.js";import{P as d}from"./index-VuWwlP3F.js";function Ct({title:e,titleId:t,...r},i){return c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:i,"aria-labelledby":t},r),e?c.createElement("title",{id:t},e):null,c.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const Et=c.forwardRef(Ct);function be(e,t){if(e==null)return{};var r={};for(var i in e)if({}.hasOwnProperty.call(e,i)){if(t.includes(i))continue;r[i]=e[i]}return r}function O(){return O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)({}).hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},O.apply(null,arguments)}var Te={exports:{}},b={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ze;function Ot(){if(Ze)return b;Ze=1;var e=Symbol.for("react.element"),t=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),n=Symbol.for("react.profiler"),o=Symbol.for("react.provider"),u=Symbol.for("react.context"),s=Symbol.for("react.server_context"),a=Symbol.for("react.forward_ref"),v=Symbol.for("react.suspense"),g=Symbol.for("react.suspense_list"),T=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),w=Symbol.for("react.offscreen"),R;R=Symbol.for("react.module.reference");function p(l){if(typeof l=="object"&&l!==null){var L=l.$$typeof;switch(L){case e:switch(l=l.type,l){case r:case n:case i:case v:case g:return l;default:switch(l=l&&l.$$typeof,l){case s:case u:case a:case x:case T:case o:return l;default:return L}}case t:return L}}}return b.ContextConsumer=u,b.ContextProvider=o,b.Element=e,b.ForwardRef=a,b.Fragment=r,b.Lazy=x,b.Memo=T,b.Portal=t,b.Profiler=n,b.StrictMode=i,b.Suspense=v,b.SuspenseList=g,b.isAsyncMode=function(){return!1},b.isConcurrentMode=function(){return!1},b.isContextConsumer=function(l){return p(l)===u},b.isContextProvider=function(l){return p(l)===o},b.isElement=function(l){return typeof l=="object"&&l!==null&&l.$$typeof===e},b.isForwardRef=function(l){return p(l)===a},b.isFragment=function(l){return p(l)===r},b.isLazy=function(l){return p(l)===x},b.isMemo=function(l){return p(l)===T},b.isPortal=function(l){return p(l)===t},b.isProfiler=function(l){return p(l)===n},b.isStrictMode=function(l){return p(l)===i},b.isSuspense=function(l){return p(l)===v},b.isSuspenseList=function(l){return p(l)===g},b.isValidElementType=function(l){return typeof l=="string"||typeof l=="function"||l===r||l===n||l===i||l===v||l===g||l===w||typeof l=="object"&&l!==null&&(l.$$typeof===x||l.$$typeof===T||l.$$typeof===o||l.$$typeof===u||l.$$typeof===a||l.$$typeof===R||l.getModuleId!==void 0)},b.typeOf=p,b}var Je;function Rt(){return Je||(Je=1,Te.exports=Ot()),Te.exports}Rt();const Qe=e=>typeof e=="object"&&e!=null&&e.nodeType===1,_e=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",xe=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const r=getComputedStyle(e,null);return _e(r.overflowY,t)||_e(r.overflowX,t)||(i=>{const n=(o=>{if(!o.ownerDocument||!o.ownerDocument.defaultView)return null;try{return o.ownerDocument.defaultView.frameElement}catch{return null}})(i);return!!n&&(n.clientHeight<i.scrollHeight||n.clientWidth<i.scrollWidth)})(e)}return!1},we=(e,t,r,i,n,o,u,s)=>o<e&&u>t||o>e&&u<t?0:o<=e&&s<=r||u>=t&&s>=r?o-e-i:u>t&&s<r||o<e&&s>r?u-t+n:0,Mt=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},St=(e,t)=>{var r,i,n,o;if(typeof document>"u")return[];const{inline:u,boundary:s,skipOverflowHiddenElements:a}=t,v=typeof s=="function"?s:j=>j!==s;if(!Qe(e))throw new TypeError("Invalid target");const g=document.scrollingElement||document.documentElement,T=[];let x=e;for(;Qe(x)&&v(x);){if(x=Mt(x),x===g){T.push(x);break}x!=null&&x===document.body&&xe(x)&&!xe(document.documentElement)||x!=null&&xe(x,a)&&T.push(x)}const w=(i=(r=window.visualViewport)==null?void 0:r.width)!=null?i:innerWidth,R=(o=(n=window.visualViewport)==null?void 0:n.height)!=null?o:innerHeight,{scrollX:p,scrollY:l}=window,{height:L,width:E,top:G,right:M,bottom:_,left:y}=e.getBoundingClientRect(),{top:S,right:F,left:P}=(j=>{const C=window.getComputedStyle(j);return{top:parseFloat(C.scrollMarginTop)||0,right:parseFloat(C.scrollMarginRight)||0,bottom:parseFloat(C.scrollMarginBottom)||0,left:parseFloat(C.scrollMarginLeft)||0}})(e);let Z=G-S,V=u==="center"?y+E/2-P+F:u==="end"?M+F:y-P;const le=[];for(let j=0;j<T.length;j++){const C=T[j],{height:ae,width:ee,top:me,right:se,bottom:pe,left:te}=C.getBoundingClientRect();if(G>=0&&y>=0&&_<=R&&M<=w&&(C===g&&!xe(C)||G>=me&&_<=pe&&y>=te&&M<=se))return le;const ne=getComputedStyle(C),m=parseInt(ne.borderLeftWidth,10),f=parseInt(ne.borderTopWidth,10),h=parseInt(ne.borderRightWidth,10),I=parseInt(ne.borderBottomWidth,10);let D=0,k=0;const K="offsetWidth"in C?C.offsetWidth-C.clientWidth-m-h:0,B="offsetHeight"in C?C.offsetHeight-C.clientHeight-f-I:0,H="offsetWidth"in C?C.offsetWidth===0?0:ee/C.offsetWidth:0,$="offsetHeight"in C?C.offsetHeight===0?0:ae/C.offsetHeight:0;if(g===C)D=we(l,l+R,R,f,I,l+Z,l+Z+L,L),k=u==="start"?V:u==="center"?V-w/2:u==="end"?V-w:we(p,p+w,w,m,h,p+V,p+V+E,E),D=Math.max(0,D+l),k=Math.max(0,k+p);else{D=we(me,pe,ae,f,I+B,Z,Z+L,L),k=u==="start"?V-te-m:u==="center"?V-(te+ee/2)+K/2:u==="end"?V-se+h+K:we(te,se,ee,m,h+K,V,V+E,E);const{scrollLeft:A,scrollTop:re}=C;D=$===0?0:Math.max(0,Math.min(re+D/$,C.scrollHeight-ae/$+B)),k=H===0?0:Math.max(0,Math.min(A+k/H,C.scrollWidth-ee/H+K)),Z+=re-D,V+=A-k}le.push({el:C,top:D,left:k})}return le};var oe=function(){return oe=Object.assign||function(t){for(var r,i=1,n=arguments.length;i<n;i++){r=arguments[i];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},oe.apply(this,arguments)};var Dt=0;function it(){}function kt(e,t){if(e){var r=St(e,{boundary:t});r.forEach(function(i){var n=i.el,o=i.top,u=i.left;n.scrollTop=o,n.scrollLeft=u})}}function et(e,t,r){var i=e===t||t instanceof r.Node&&e.contains&&e.contains(t);return i}function ut(e,t){var r;function i(){r&&clearTimeout(r)}function n(){for(var o=arguments.length,u=new Array(o),s=0;s<o;s++)u[s]=arguments[s];i(),r=setTimeout(function(){r=null,e.apply(void 0,u)},t)}return n.cancel=i,n}function q(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(i){for(var n=arguments.length,o=new Array(n>1?n-1:0),u=1;u<n;u++)o[u-1]=arguments[u];return t.some(function(s){return s&&s.apply(void 0,[i].concat(o)),i.preventDownshiftDefault||i.hasOwnProperty("nativeEvent")&&i.nativeEvent.preventDownshiftDefault})}}function Ce(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(i){t.forEach(function(n){typeof n=="function"?n(i):n&&(n.current=i)})}}function Tt(){return String(Dt++)}function Ve(e,t){return!e||!t?e:Object.keys(e).reduce(function(r,i){return r[i]=ot(t,i)?t[i]:e[i],r},{})}function ot(e,t){return e[t]!==void 0}function Vt(e){var t=e.key,r=e.keyCode;return r>=37&&r<=40&&t.indexOf("Arrow")!==0?"Arrow"+t:t}function Ee(e,t,r,i,n){var o=r.length;if(o===0)return-1;var u=o-1;(typeof e!="number"||e<0||e>u)&&(e=t>0?-1:u+1);var s=e+t;s<0?s=u:s>u&&(s=0);var a=Me(s,t<0,r,i,n);return a===-1?e>=o?-1:e:a}function Me(e,t,r,i,n){n===void 0&&(n=!1);var o=r.length;if(t){for(var u=e;u>=0;u--)if(!i(r[u],u))return u}else for(var s=e;s<o;s++)if(!i(r[s],s))return s;return n?Me(t?o-1:0,t,r,i):-1}function tt(e,t,r,i){return i===void 0&&(i=!0),r&&t.some(function(n){return n&&(et(n,e,r)||i&&et(n,r.document.activeElement,r))})}var Kt=ut(function(e){lt(e).textContent=""},500);function lt(e){var t=e.getElementById("a11y-status-message");return t||(t=e.createElement("div"),t.setAttribute("id","a11y-status-message"),t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-relevant","additions text"),Object.assign(t.style,{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px"}),e.body.appendChild(t),t)}function Ht(e,t){if(!(!e||!t)){var r=lt(t);r.textContent=e,Kt(t)}}function Lt(e){var t=e==null?void 0:e.getElementById("a11y-status-message");t&&t.remove()}var at={highlightedIndex:-1,isOpen:!1,selectedItem:null,inputValue:""};function Pt(e,t,r){var i=e.props,n=e.type,o={};Object.keys(t).forEach(function(u){$t(u,e,t,r),r[u]!==t[u]&&(o[u]=r[u])}),i.onStateChange&&Object.keys(o).length&&i.onStateChange(O({type:n},o))}function $t(e,t,r,i){var n=t.props,o=t.type,u="on"+Le(e)+"Change";n[u]&&i[e]!==void 0&&i[e]!==r[e]&&n[u](O({type:o},i))}function Ft(e,t){return t.changes}var nt=ut(function(e,t){Ht(e,t)},200),Bt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"?c.useLayoutEffect:c.useEffect,At="useId"in Re?function(t){var r=t.id,i=t.labelId,n=t.menuId,o=t.getItemId,u=t.toggleButtonId,s=t.inputId,a="downshift-"+Re.useId();r||(r=a);var v=c.useRef({labelId:i||r+"-label",menuId:n||r+"-menu",getItemId:o||function(g){return r+"-item-"+g},toggleButtonId:u||r+"-toggle-button",inputId:s||r+"-input"});return v.current}:function(t){var r=t.id,i=r===void 0?"downshift-"+Tt():r,n=t.labelId,o=t.menuId,u=t.getItemId,s=t.toggleButtonId,a=t.inputId,v=c.useRef({labelId:n||i+"-label",menuId:o||i+"-menu",getItemId:u||function(g){return i+"-item-"+g},toggleButtonId:s||i+"-toggle-button",inputId:a||i+"-input"});return v.current};function jt(e,t,r,i){var n,o;if(e===void 0){if(t===void 0)throw new Error(i);n=r[t],o=t}else o=t===void 0?r.indexOf(e):t,n=e;return[n,o]}function Le(e){return""+e.slice(0,1).toUpperCase()+e.slice(1)}function st(e){var t=c.useRef(e);return t.current=e,t}function Wt(e,t,r,i){var n=c.useRef(),o=c.useRef(),u=c.useCallback(function(w,R){o.current=R,w=Ve(w,R.props);var p=e(w,R),l=R.props.stateReducer(w,O({},R,{changes:p}));return l},[e]),s=c.useReducer(u,t,r),a=s[0],v=s[1],g=st(t),T=c.useCallback(function(w){return v(O({props:g.current},w))},[g]),x=o.current;return c.useEffect(function(){var w=Ve(n.current,x==null?void 0:x.props),R=x&&n.current&&!i(w,a);R&&Pt(x,w,a),n.current=a},[a,x,i]),[a,T]}var de={itemToString:function(t){return t?String(t):""},itemToKey:function(t){return t},stateReducer:Ft,scrollIntoView:kt,environment:typeof window>"u"?void 0:window};function Y(e,t,r){r===void 0&&(r=at);var i=e["default"+Le(t)];return i!==void 0?i:r[t]}function fe(e,t,r){r===void 0&&(r=at);var i=e[t];if(i!==void 0)return i;var n=e["initial"+Le(t)];return n!==void 0?n:Y(e,t,r)}function Nt(e){var t=fe(e,"selectedItem"),r=fe(e,"isOpen"),i=Gt(e),n=fe(e,"inputValue");return{highlightedIndex:i<0&&t&&r?e.items.findIndex(function(o){return e.itemToKey(o)===e.itemToKey(t)}):i,isOpen:r,selectedItem:t,inputValue:n}}function he(e,t,r){var i=e.items,n=e.initialHighlightedIndex,o=e.defaultHighlightedIndex,u=e.isItemDisabled,s=e.itemToKey,a=t.selectedItem,v=t.highlightedIndex;return i.length===0?-1:n!==void 0&&v===n&&!u(i[n],n)?n:o!==void 0&&!u(i[o],o)?o:a?i.findIndex(function(g){return s(a)===s(g)}):r<0&&!u(i[i.length-1],i.length-1)?i.length-1:r>0&&!u(i[0],0)?0:-1}function qt(e,t,r){var i=c.useRef({isMouseDown:!1,isTouchMove:!1,isTouchEnd:!1});return c.useEffect(function(){if(!e)return it;var n=r.map(function(g){return g.current});function o(){i.current.isTouchEnd=!1,i.current.isMouseDown=!0}function u(g){i.current.isMouseDown=!1,tt(g.target,n,e)||t()}function s(){i.current.isTouchEnd=!1,i.current.isTouchMove=!1}function a(){i.current.isTouchMove=!0}function v(g){i.current.isTouchEnd=!0,!i.current.isTouchMove&&!tt(g.target,n,e,!1)&&t()}return e.addEventListener("mousedown",o),e.addEventListener("mouseup",u),e.addEventListener("touchstart",s),e.addEventListener("touchmove",a),e.addEventListener("touchend",v),function(){e.removeEventListener("mousedown",o),e.removeEventListener("mouseup",u),e.removeEventListener("touchstart",s),e.removeEventListener("touchmove",a),e.removeEventListener("touchend",v)}},[r,e,t]),i.current}var Ut=function(){return it};function zt(e,t,r,i){i===void 0&&(i={});var n=i.document,o=Pe();c.useEffect(function(){if(!(!e||o||!n)){var u=e(t);nt(u,n)}},r),c.useEffect(function(){return function(){nt.cancel(),Lt(n)}},[n])}function Xt(e){var t=e.highlightedIndex,r=e.isOpen,i=e.itemRefs,n=e.getItemNodeFromIndex,o=e.menuElement,u=e.scrollIntoView,s=c.useRef(!0);return Bt(function(){t<0||!r||!Object.keys(i.current).length||(s.current===!1?s.current=!0:u(n(t),o))},[t]),s}function rt(e,t,r){var i;r===void 0&&(r=!0);var n=((i=e.items)==null?void 0:i.length)&&t>=0;return O({isOpen:!1,highlightedIndex:-1},n&&O({selectedItem:e.items[t],isOpen:Y(e,"isOpen"),highlightedIndex:Y(e,"highlightedIndex")},r&&{inputValue:e.itemToString(e.items[t])}))}function Yt(e,t){return e.isOpen===t.isOpen&&e.inputValue===t.inputValue&&e.highlightedIndex===t.highlightedIndex&&e.selectedItem===t.selectedItem}function Pe(){var e=Re.useRef(!0);return Re.useEffect(function(){return e.current=!1,function(){e.current=!0}},[]),e.current}function Ke(e){var t=Y(e,"highlightedIndex");return t>-1&&e.isItemDisabled(e.items[t],t)?-1:t}function Gt(e){var t=fe(e,"highlightedIndex");return t>-1&&e.isItemDisabled(e.items[t],t)?-1:t}var Oe={environment:d.shape({addEventListener:d.func.isRequired,removeEventListener:d.func.isRequired,document:d.shape({createElement:d.func.isRequired,getElementById:d.func.isRequired,activeElement:d.any.isRequired,body:d.any.isRequired}).isRequired,Node:d.func.isRequired}),itemToString:d.func,itemToKey:d.func,stateReducer:d.func},ct=O({},Oe,{getA11yStatusMessage:d.func,highlightedIndex:d.number,defaultHighlightedIndex:d.number,initialHighlightedIndex:d.number,isOpen:d.bool,defaultIsOpen:d.bool,initialIsOpen:d.bool,selectedItem:d.any,initialSelectedItem:d.any,defaultSelectedItem:d.any,id:d.string,labelId:d.string,menuId:d.string,getItemId:d.func,toggleButtonId:d.string,onSelectedItemChange:d.func,onHighlightedIndexChange:d.func,onStateChange:d.func,onIsOpenChange:d.func,scrollIntoView:d.func});function Zt(e,t,r){var i=t.type,n=t.props,o;switch(i){case r.ItemMouseMove:o={highlightedIndex:t.disabled?-1:t.index};break;case r.MenuMouseLeave:o={highlightedIndex:-1};break;case r.ToggleButtonClick:case r.FunctionToggleMenu:o={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:he(n,e,0)};break;case r.FunctionOpenMenu:o={isOpen:!0,highlightedIndex:he(n,e,0)};break;case r.FunctionCloseMenu:o={isOpen:!1};break;case r.FunctionSetHighlightedIndex:o={highlightedIndex:n.isItemDisabled(n.items[t.highlightedIndex],t.highlightedIndex)?-1:t.highlightedIndex};break;case r.FunctionSetInputValue:o={inputValue:t.inputValue};break;case r.FunctionReset:o={highlightedIndex:Ke(n),isOpen:Y(n,"isOpen"),selectedItem:Y(n,"selectedItem"),inputValue:Y(n,"inputValue")};break;default:throw new Error("Reducer called without proper action type.")}return O({},e,o)}oe(oe({},ct),{items:d.array.isRequired,isItemDisabled:d.func});oe(oe({},de),{isItemDisabled:function(){return!1}});var $e=0,Fe=1,Be=2,Ae=3,je=4,We=5,Ne=6,qe=7,Ue=8,Se=9,ze=10,dt=11,ft=12,Xe=13,ht=14,gt=15,mt=16,pt=17,vt=18,Ye=19,It=20,yt=21,Ge=22,bt=Object.freeze({__proto__:null,ControlledPropUpdatedSelectedItem:Ge,FunctionCloseMenu:pt,FunctionOpenMenu:mt,FunctionReset:yt,FunctionSelectItem:Ye,FunctionSetHighlightedIndex:vt,FunctionSetInputValue:It,FunctionToggleMenu:gt,InputBlur:Se,InputChange:Ue,InputClick:ze,InputKeyDownArrowDown:$e,InputKeyDownArrowUp:Fe,InputKeyDownEnd:je,InputKeyDownEnter:qe,InputKeyDownEscape:Be,InputKeyDownHome:Ae,InputKeyDownPageDown:Ne,InputKeyDownPageUp:We,ItemClick:Xe,ItemMouseMove:ft,MenuMouseLeave:dt,ToggleButtonClick:ht});function Jt(e){var t=Nt(e),r=t.selectedItem,i=t.inputValue;return i===""&&r&&e.defaultInputValue===void 0&&e.initialInputValue===void 0&&e.inputValue===void 0&&(i=e.itemToString(r)),O({},t,{inputValue:i})}O({},ct,{items:d.array.isRequired,isItemDisabled:d.func,inputValue:d.string,defaultInputValue:d.string,initialInputValue:d.string,inputId:d.string,onInputValueChange:d.func});function Qt(e,t,r,i){var n=c.useRef(),o=Wt(e,t,r,i),u=o[0],s=o[1],a=Pe();return c.useEffect(function(){if(ot(t,"selectedItem")){if(!a){var v=t.itemToKey(t.selectedItem)!==t.itemToKey(n.current);v&&s({type:Ge,inputValue:t.itemToString(t.selectedItem)})}n.current=u.selectedItem===n.current?t.selectedItem:u.selectedItem}},[u.selectedItem,t.selectedItem]),[Ve(u,t),s]}var _t=O({},de,{isItemDisabled:function(){return!1}});function en(e,t){var r,i=t.type,n=t.props,o=t.altKey,u;switch(i){case Xe:u={isOpen:Y(n,"isOpen"),highlightedIndex:Ke(n),selectedItem:n.items[t.index],inputValue:n.itemToString(n.items[t.index])};break;case $e:e.isOpen?u={highlightedIndex:Ee(e.highlightedIndex,1,n.items,n.isItemDisabled,!0)}:u={highlightedIndex:o&&e.selectedItem==null?-1:he(n,e,1),isOpen:n.items.length>=0};break;case Fe:e.isOpen?o?u=rt(n,e.highlightedIndex):u={highlightedIndex:Ee(e.highlightedIndex,-1,n.items,n.isItemDisabled,!0)}:u={highlightedIndex:he(n,e,-1),isOpen:n.items.length>=0};break;case qe:u=rt(n,e.highlightedIndex);break;case Be:u=O({isOpen:!1,highlightedIndex:-1},!e.isOpen&&{selectedItem:null,inputValue:""});break;case We:u={highlightedIndex:Ee(e.highlightedIndex,-10,n.items,n.isItemDisabled,!0)};break;case Ne:u={highlightedIndex:Ee(e.highlightedIndex,10,n.items,n.isItemDisabled,!0)};break;case Ae:u={highlightedIndex:Me(0,!1,n.items,n.isItemDisabled)};break;case je:u={highlightedIndex:Me(n.items.length-1,!0,n.items,n.isItemDisabled)};break;case Se:u=O({isOpen:!1,highlightedIndex:-1},e.highlightedIndex>=0&&((r=n.items)==null?void 0:r.length)&&t.selectItem&&{selectedItem:n.items[e.highlightedIndex],inputValue:n.itemToString(n.items[e.highlightedIndex])});break;case Ue:u={isOpen:!0,highlightedIndex:Ke(n),inputValue:t.inputValue};break;case ze:u={isOpen:!e.isOpen,highlightedIndex:e.isOpen?-1:he(n,e,0)};break;case Ye:u={selectedItem:t.selectedItem,inputValue:n.itemToString(t.selectedItem)};break;case Ge:u={inputValue:t.inputValue};break;default:return Zt(e,t,bt)}return O({},e,u)}var tn=["onMouseLeave","refKey","ref"],nn=["item","index","refKey","ref","onMouseMove","onMouseDown","onClick","onPress","disabled"],rn=["onClick","onPress","refKey","ref"],un=["onKeyDown","onChange","onInput","onBlur","onChangeText","onClick","refKey","ref"];He.stateChangeTypes=bt;function He(e){e===void 0&&(e={});var t=O({},_t,e),r=t.items,i=t.scrollIntoView,n=t.environment,o=t.getA11yStatusMessage,u=Qt(en,t,Jt,Yt),s=u[0],a=u[1],v=s.isOpen,g=s.highlightedIndex,T=s.selectedItem,x=s.inputValue,w=c.useRef(null),R=c.useRef({}),p=c.useRef(null),l=c.useRef(null),L=Pe(),E=At(t),G=c.useRef(),M=st({state:s,props:t}),_=c.useCallback(function(m){return R.current[E.getItemId(m)]},[E]);zt(o,s,[v,g,T,x],n);var y=Xt({menuElement:w.current,highlightedIndex:g,isOpen:v,itemRefs:R,scrollIntoView:i,getItemNodeFromIndex:_});c.useEffect(function(){var m=fe(t,"isOpen");m&&p.current&&p.current.focus()},[]),c.useEffect(function(){L||(G.current=r.length)});var S=qt(n,c.useCallback(function(){M.current.state.isOpen&&a({type:Se,selectItem:!1})},[a,M]),c.useMemo(function(){return[w,l,p]},[w.current,l.current,p.current])),F=Ut();c.useEffect(function(){v||(R.current={})},[v]),c.useEffect(function(){var m;!v||!(n!=null&&n.document)||!(p!=null&&(m=p.current)!=null&&m.focus)||n.document.activeElement!==p.current&&p.current.focus()},[v,n]);var P=c.useMemo(function(){return{ArrowDown:function(f){f.preventDefault(),a({type:$e,altKey:f.altKey})},ArrowUp:function(f){f.preventDefault(),a({type:Fe,altKey:f.altKey})},Home:function(f){M.current.state.isOpen&&(f.preventDefault(),a({type:Ae}))},End:function(f){M.current.state.isOpen&&(f.preventDefault(),a({type:je}))},Escape:function(f){var h=M.current.state;(h.isOpen||h.inputValue||h.selectedItem||h.highlightedIndex>-1)&&(f.preventDefault(),a({type:Be}))},Enter:function(f){var h=M.current.state;!h.isOpen||f.which===229||(f.preventDefault(),a({type:qe}))},PageUp:function(f){M.current.state.isOpen&&(f.preventDefault(),a({type:We}))},PageDown:function(f){M.current.state.isOpen&&(f.preventDefault(),a({type:Ne}))}}},[a,M]),Z=c.useCallback(function(m){return O({id:E.labelId,htmlFor:E.inputId},m)},[E]),V=c.useCallback(function(m,f){var h,I=m===void 0?{}:m,D=I.onMouseLeave,k=I.refKey,K=k===void 0?"ref":k,B=I.ref,H=be(I,tn),$=f===void 0?{}:f;return $.suppressRefError,O((h={},h[K]=Ce(B,function(A){w.current=A}),h.id=E.menuId,h.role="listbox",h["aria-labelledby"]=H&&H["aria-label"]?void 0:""+E.labelId,h.onMouseLeave=q(D,function(){a({type:dt})}),h),H)},[a,F,E]),le=c.useCallback(function(m){var f,h,I=m===void 0?{}:m,D=I.item,k=I.index,K=I.refKey,B=K===void 0?"ref":K,H=I.ref,$=I.onMouseMove,A=I.onMouseDown,re=I.onClick;I.onPress;var ie=I.disabled,De=be(I,nn);ie!==void 0&&console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled prop from useCombobox.');var W=M.current,ve=W.props,Ie=W.state,ye=jt(D,k,ve.items,"Pass either item or index to getItemProps!"),ke=ye[0],N=ye[1],ue=ve.isItemDisabled(ke,N),U="onClick",J=re,z=function(){S.isTouchEnd||N===Ie.highlightedIndex||(y.current=!1,a({type:ft,index:N,disabled:ue}))},Q=function(){a({type:Xe,index:N})},xt=function(wt){return wt.preventDefault()};return O((f={},f[B]=Ce(H,function(ce){ce&&(R.current[E.getItemId(N)]=ce)}),f["aria-disabled"]=ue,f["aria-selected"]=N===Ie.highlightedIndex,f.id=E.getItemId(N),f.role="option",f),!ue&&(h={},h[U]=q(J,Q),h),{onMouseMove:q($,z),onMouseDown:q(A,xt)},De)},[a,E,M,S,y]),j=c.useCallback(function(m){var f,h=m===void 0?{}:m,I=h.onClick;h.onPress;var D=h.refKey,k=D===void 0?"ref":D,K=h.ref,B=be(h,rn),H=M.current.state,$=function(){a({type:ht})};return O((f={},f[k]=Ce(K,function(A){l.current=A}),f["aria-controls"]=E.menuId,f["aria-expanded"]=H.isOpen,f.id=E.toggleButtonId,f.tabIndex=-1,f),!B.disabled&&O({},{onClick:q(I,$)}),B)},[a,M,E]),C=c.useCallback(function(m,f){var h,I=m===void 0?{}:m,D=I.onKeyDown,k=I.onChange,K=I.onInput,B=I.onBlur;I.onChangeText;var H=I.onClick,$=I.refKey,A=$===void 0?"ref":$,re=I.ref,ie=be(I,un),De=f===void 0?{}:f;De.suppressRefError;var W=M.current.state,ve=function(z){var Q=Vt(z);Q&&P[Q]&&P[Q](z)},Ie=function(z){a({type:Ue,inputValue:z.target.value})},ye=function(z){if(n!=null&&n.document&&W.isOpen&&!S.isMouseDown){var Q=z.relatedTarget===null&&n.document.activeElement!==n.document.body;a({type:Se,selectItem:!Q})}},ke=function(){a({type:ze})},N="onChange",ue={};if(!ie.disabled){var U;ue=(U={},U[N]=q(k,K,Ie),U.onKeyDown=q(D,ve),U.onBlur=q(B,ye),U.onClick=q(H,ke),U)}return O((h={},h[A]=Ce(re,function(J){p.current=J}),h["aria-activedescendant"]=W.isOpen&&W.highlightedIndex>-1?E.getItemId(W.highlightedIndex):"",h["aria-autocomplete"]="list",h["aria-controls"]=E.menuId,h["aria-expanded"]=W.isOpen,h["aria-labelledby"]=ie&&ie["aria-label"]?void 0:E.labelId,h.autoComplete="off",h.id=E.inputId,h.role="combobox",h.value=W.inputValue,h),ue,ie)},[a,E,n,P,M,S,F]),ae=c.useCallback(function(){a({type:gt})},[a]),ee=c.useCallback(function(){a({type:pt})},[a]),me=c.useCallback(function(){a({type:mt})},[a]),se=c.useCallback(function(m){a({type:vt,highlightedIndex:m})},[a]),pe=c.useCallback(function(m){a({type:Ye,selectedItem:m})},[a]),te=c.useCallback(function(m){a({type:It,inputValue:m})},[a]),ne=c.useCallback(function(){a({type:yt})},[a]);return{getItemProps:le,getLabelProps:Z,getMenuProps:V,getInputProps:C,getToggleButtonProps:j,toggleMenu:ae,openMenu:me,closeMenu:ee,setHighlightedIndex:se,setInputValue:te,selectItem:pe,reset:ne,highlightedIndex:g,isOpen:v,selectedItem:T,inputValue:x}}Oe.stateReducer,Oe.itemToKey,Oe.environment,d.array,d.array,d.array,d.func,d.number,d.number,d.number,d.func,d.func,d.string,d.string;de.itemToKey,de.stateReducer,de.environment;function dn({className:e="",placeholder:t,inputRef:r,locations:i={},onChange:n,exportState:o=()=>{}}){const[u,s]=c.useState(""),[a,v]=c.useReducer(ln,on);c.useEffect(()=>{o(a)},[a]);const g=r||c.useRef(null);c.useEffect(()=>{if(g.current){const y=()=>v({type:ge.FOCUS,payload:!0}),S=()=>v({type:ge.FOCUS,payload:!1});return g.current.addEventListener("focus",y),g.current.addEventListener("blur",S),()=>{var F,P;(F=g==null?void 0:g.current)==null||F.removeEventListener("focus",y),(P=g==null?void 0:g.current)==null||P.removeEventListener("blur",S)}}},[g]);const x=(Object.entries(i??{}).map(([y,S])=>({value:S,label:y}))??[]).filter(y=>an(y,u)),{isOpen:w,getLabelProps:R,getMenuProps:p,getInputProps:l,highlightedIndex:L,getItemProps:E,selectedItem:G}=He({inputValue:u,items:x,itemToString(y){return y?y.label:""},onInputValueChange(y){const{stateChangeTypes:S}=He;y.type===S.ItemClick||y.type===S.InputKeyDownEnter?n(y.selectedItem):s(y.inputValue)}});c.useEffect(()=>{a.isOpen!==w&&v({type:ge.OPEN,payload:w})},[w]);const M=()=>{s("")},_=y=>{const S=y.target,F=S.closest(".LocationCombobox");F.addEventListener("transitionstart",()=>F.addEventListener("transitionend",()=>{var P;return(P=S.parentElement)==null?void 0:P.scrollIntoView({behavior:"smooth",block:"start"})},{once:!0}),{once:!0})};return X.jsxs("div",{className:`LocationCombobox ${e||""}`,children:[X.jsxs("div",{className:"input",...R(),children:[X.jsx("input",{placeholder:t,value:u,...l({ref:g}),onFocus:_}),X.jsx("button",{"aria-label":"Clear Search input",type:"button",onClick:M,children:X.jsx(Et,{})})]}),X.jsx("ul",{className:w?"open":"",...p(),children:w&&x.map((y,S)=>X.jsx("li",{className:`${G===y?"selected":""} ${S===L?"highlighted":""}`,...E({item:y,index:S}),children:X.jsx("span",{children:y.label})},y.value.regionId+"-"+y.value.waterId))})]})}const on={hasFocus:!1,isOpen:!1},ge={FOCUS:"FOCUS",OPEN:"OPEN"};function ln(e,t){switch(t.type){case ge.FOCUS:return{...e,hasFocus:t.payload};case ge.OPEN:return{...e,isOpen:t.payload};default:return e}}const an=(e,t)=>{if(!t)return!0;const r=t.split(" ").map(n=>n.toLowerCase()),i=e.label.split(" ").map(n=>n.toLowerCase());return r.every(n=>i.some(o=>o.includes(n)))};export{dn as default};
