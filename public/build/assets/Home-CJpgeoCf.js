import{r as P,g as pt,j as b}from"./app-BlCin5dP.js";import{u as ft,P as ht}from"./PublicLayout-B2muosjr.js";import{P as gt}from"./PublicNav-DCpg6EQN.js";import{u as mt}from"./useLandingPage-DNkGrQch.js";import{u as vt}from"./useScreenOrientation-ChwaDZo1.js";import It from"./SelectFishMobile-DK_r-pn3.js";import yt from"./SelectFishDesktop-B9jOkCef.js";import St from"./FishingRestrictions-Dmnj4u7e.js";import"./ResponsiveNavLink-1tUNdxNk.js";import"./transition-CLTS3ZAc.js";import"./getFishImageSrc-bMjek-YH.js";import"./parseMySqlDate-DjqKqIUd.js";import"./format-CU-xZK7a.js";import"./FishRestrictionsTable-09Uf5d6X.js";function bt({title:t,titleId:n,...o},l){return P.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:l,"aria-labelledby":n},o),t?P.createElement("title",{id:n},t):null,P.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const wt=P.forwardRef(bt);function q(t,n){if(t==null)return{};var o={};for(var l in t)if({}.hasOwnProperty.call(t,l)){if(n.includes(l))continue;o[l]=t[l]}return o}function D(){return D=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var l in o)({}).hasOwnProperty.call(o,l)&&(t[l]=o[l])}return t},D.apply(null,arguments)}function Re(t,n){return Re=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,l){return o.__proto__=l,o},Re(t,n)}function xt(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,Re(t,n)}var Be={exports:{}},Ct="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Et=Ct,Ht=Et;function We(){}function Ue(){}Ue.resetWarningCache=We;var Ot=function(){function t(l,d,e,u,f,g){if(g!==Ht){var E=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw E.name="Invariant Violation",E}}t.isRequired=t;function n(){return t}var o={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:n,element:t,elementType:t,instanceOf:n,node:t,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:Ue,resetWarningCache:We};return o.PropTypes=o,o};Be.exports=Ot();var Rt=Be.exports;const h=pt(Rt);var w={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Te=Symbol.for("react.element"),Pe=Symbol.for("react.portal"),pe=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),he=Symbol.for("react.profiler"),ge=Symbol.for("react.provider"),me=Symbol.for("react.context"),Dt=Symbol.for("react.server_context"),ve=Symbol.for("react.forward_ref"),Ie=Symbol.for("react.suspense"),ye=Symbol.for("react.suspense_list"),Se=Symbol.for("react.memo"),be=Symbol.for("react.lazy"),Tt=Symbol.for("react.offscreen"),qe;qe=Symbol.for("react.module.reference");function j(t){if(typeof t=="object"&&t!==null){var n=t.$$typeof;switch(n){case Te:switch(t=t.type,t){case pe:case he:case fe:case Ie:case ye:return t;default:switch(t=t&&t.$$typeof,t){case Dt:case me:case ve:case be:case Se:case ge:return t;default:return n}}case Pe:return n}}}w.ContextConsumer=me;w.ContextProvider=ge;w.Element=Te;w.ForwardRef=ve;w.Fragment=pe;w.Lazy=be;w.Memo=Se;w.Portal=Pe;w.Profiler=he;w.StrictMode=fe;w.Suspense=Ie;w.SuspenseList=ye;w.isAsyncMode=function(){return!1};w.isConcurrentMode=function(){return!1};w.isContextConsumer=function(t){return j(t)===me};w.isContextProvider=function(t){return j(t)===ge};w.isElement=function(t){return typeof t=="object"&&t!==null&&t.$$typeof===Te};w.isForwardRef=function(t){return j(t)===ve};w.isFragment=function(t){return j(t)===pe};w.isLazy=function(t){return j(t)===be};w.isMemo=function(t){return j(t)===Se};w.isPortal=function(t){return j(t)===Pe};w.isProfiler=function(t){return j(t)===he};w.isStrictMode=function(t){return j(t)===fe};w.isSuspense=function(t){return j(t)===Ie};w.isSuspenseList=function(t){return j(t)===ye};w.isValidElementType=function(t){return typeof t=="string"||typeof t=="function"||t===pe||t===he||t===fe||t===Ie||t===ye||t===Tt||typeof t=="object"&&t!==null&&(t.$$typeof===be||t.$$typeof===Se||t.$$typeof===ge||t.$$typeof===me||t.$$typeof===ve||t.$$typeof===qe||t.getModuleId!==void 0)};w.typeOf=j;const Fe=t=>typeof t=="object"&&t!=null&&t.nodeType===1,$e=(t,n)=>(!n||t!=="hidden")&&t!=="visible"&&t!=="clip",oe=(t,n)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const o=getComputedStyle(t,null);return $e(o.overflowY,n)||$e(o.overflowX,n)||(l=>{const d=(e=>{if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch{return null}})(l);return!!d&&(d.clientHeight<l.scrollHeight||d.clientWidth<l.scrollWidth)})(t)}return!1},se=(t,n,o,l,d,e,u,f)=>e<t&&u>n||e>t&&u<n?0:e<=t&&f<=o||u>=n&&f>=o?e-t-l:u>n&&f<o||e<t&&f>o?u-n+d:0,Pt=t=>{const n=t.parentElement;return n??(t.getRootNode().host||null)},Mt=(t,n)=>{var o,l,d,e;if(typeof document>"u")return[];const{scrollMode:u,block:f,inline:g,boundary:E,skipOverflowHiddenElements:M}=n,O=typeof E=="function"?E:N=>N!==E;if(!Fe(t))throw new TypeError("Invalid target");const _=document.scrollingElement||document.documentElement,y=[];let H=t;for(;Fe(H)&&O(H);){if(H=Pt(H),H===_){y.push(H);break}H!=null&&H===document.body&&oe(H)&&!oe(document.documentElement)||H!=null&&oe(H,M)&&y.push(H)}const A=(l=(o=window.visualViewport)==null?void 0:o.width)!=null?l:innerWidth,$=(e=(d=window.visualViewport)==null?void 0:d.height)!=null?e:innerHeight,{scrollX:F,scrollY:r}=window,{height:s,width:i,top:a,right:p,bottom:m,left:c}=t.getBoundingClientRect(),{top:I,right:v,bottom:S,left:x}=(N=>{const C=window.getComputedStyle(N);return{top:parseFloat(C.scrollMarginTop)||0,right:parseFloat(C.scrollMarginRight)||0,bottom:parseFloat(C.scrollMarginBottom)||0,left:parseFloat(C.scrollMarginLeft)||0}})(t);let T=f==="start"||f==="nearest"?a-I:f==="end"?m+S:a+s/2-I+S,R=g==="center"?c+i/2-x+v:g==="end"?p+v:c-x;const K=[];for(let N=0;N<y.length;N++){const C=y[N],{height:X,width:Y,top:Z,right:we,bottom:xe,left:G}=C.getBoundingClientRect();if(u==="if-needed"&&a>=0&&c>=0&&m<=$&&p<=A&&(C===_&&!oe(C)||a>=Z&&m<=xe&&c>=G&&p<=we))return K;const J=getComputedStyle(C),Q=parseInt(J.borderLeftWidth,10),ee=parseInt(J.borderTopWidth,10),te=parseInt(J.borderRightWidth,10),ne=parseInt(J.borderBottomWidth,10);let V=0,k=0;const re="offsetWidth"in C?C.offsetWidth-C.clientWidth-Q-te:0,ie="offsetHeight"in C?C.offsetHeight-C.clientHeight-ee-ne:0,Ce="offsetWidth"in C?C.offsetWidth===0?0:Y/C.offsetWidth:0,Ee="offsetHeight"in C?C.offsetHeight===0?0:X/C.offsetHeight:0;if(_===C)V=f==="start"?T:f==="end"?T-$:f==="nearest"?se(r,r+$,$,ee,ne,r+T,r+T+s,s):T-$/2,k=g==="start"?R:g==="center"?R-A/2:g==="end"?R-A:se(F,F+A,A,Q,te,F+R,F+R+i,i),V=Math.max(0,V+r),k=Math.max(0,k+F);else{V=f==="start"?T-Z-ee:f==="end"?T-xe+ne+ie:f==="nearest"?se(Z,xe,X,ee,ne+ie,T,T+s,s):T-(Z+X/2)+ie/2,k=g==="start"?R-G-Q:g==="center"?R-(G+Y/2)+re/2:g==="end"?R-we+te+re:se(G,we,Y,Q,te+re,R,R+i,i);const{scrollLeft:_e,scrollTop:Ae}=C;V=Ee===0?0:Math.max(0,Math.min(Ae+V/Ee,C.scrollHeight-X/Ee+ie)),k=Ce===0?0:Math.max(0,Math.min(_e+k/Ce,C.scrollWidth-Y/Ce+re)),T+=Ae-V,R+=_e-k}K.push({el:C,top:V,left:k})}return K};var U=function(){return U=Object.assign||function(n){for(var o,l=1,d=arguments.length;l<d;l++){o=arguments[l];for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&(n[e]=o[e])}return n},U.apply(this,arguments)};var _t=0;function je(t){return typeof t=="function"?t:B}function B(){}function ze(t,n){if(t){var o=Mt(t,{boundary:n,block:"nearest",scrollMode:"if-needed"});o.forEach(function(l){var d=l.el,e=l.top,u=l.left;d.scrollTop=e,d.scrollLeft=u})}}function Ke(t,n,o){var l=t===n||n instanceof o.Node&&t.contains&&t.contains(n);return l}function Me(t,n){var o;function l(){o&&clearTimeout(o)}function d(){for(var e=arguments.length,u=new Array(e),f=0;f<e;f++)u[f]=arguments[f];l(),o=setTimeout(function(){o=null,t.apply(void 0,u)},n)}return d.cancel=l,d}function L(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return function(l){for(var d=arguments.length,e=new Array(d>1?d-1:0),u=1;u<d;u++)e[u-1]=arguments[u];return n.some(function(f){return f&&f.apply(void 0,[l].concat(e)),l.preventDownshiftDefault||l.hasOwnProperty("nativeEvent")&&l.nativeEvent.preventDownshiftDefault})}}function Le(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return function(l){n.forEach(function(d){typeof d=="function"?d(l):d&&(d.current=l)})}}function At(){return String(_t++)}function Ft(t){var n=t.isOpen,o=t.resultCount,l=t.previousResultCount;return n?o?o!==l?o+" result"+(o===1?" is":"s are")+" available, use up and down arrow keys to navigate. Press Enter key to select.":"":"No results are available.":""}function Ne(t,n){return t=Array.isArray(t)?t[0]:t,!t&&n?n:t}function $t(t){return typeof t.type=="string"}function jt(t){return t.props}var Kt=["highlightedIndex","inputValue","isOpen","selectedItem","type"];function le(t){t===void 0&&(t={});var n={};return Kt.forEach(function(o){t.hasOwnProperty(o)&&(n[o]=t[o])}),n}function Lt(t,n){return!t||!n?t:Object.keys(t).reduce(function(o,l){return o[l]=De(n,l)?n[l]:t[l],o},{})}function De(t,n){return t[n]!==void 0}function Ve(t){var n=t.key,o=t.keyCode;return o>=37&&o<=40&&n.indexOf("Arrow")!==0?"Arrow"+n:n}function He(t,n,o,l,d){var e=o.length;if(e===0)return-1;var u=e-1;(typeof t!="number"||t<0||t>u)&&(t=n>0?-1:u+1);var f=t+n;f<0?f=u:f>u&&(f=0);var g=ce(f,n<0,o,l,d);return g===-1?t>=e?-1:t:g}function ce(t,n,o,l,d){d===void 0&&(d=!1);var e=o.length;if(n){for(var u=t;u>=0;u--)if(!l(o[u],u))return u}else for(var f=t;f<e;f++)if(!l(o[f],f))return f;return d?ce(n?e-1:0,n,o,l):-1}function ke(t,n,o,l){return l===void 0&&(l=!0),o&&n.some(function(d){return d&&(Ke(d,t,o)||l&&Ke(d,o.document.activeElement,o))})}var Nt=Me(function(t){Xe(t).textContent=""},500);function Xe(t){var n=t.getElementById("a11y-status-message");return n||(n=t.createElement("div"),n.setAttribute("id","a11y-status-message"),n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.setAttribute("aria-relevant","additions text"),Object.assign(n.style,{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px"}),t.body.appendChild(n),n)}function Ye(t,n){if(!(!t||!n)){var o=Xe(n);o.textContent=t,Nt(n)}}var Ze=0,Ge=1,Je=2,ue=3,ae=4,Qe=5,et=6,tt=7,nt=8,rt=9,it=10,ot=11,st=12,lt=13,ut=14,at=15,dt=16,Vt=Object.freeze({__proto__:null,blurButton:ut,blurInput:it,changeInput:ot,clickButton:lt,clickItem:rt,controlledPropUpdatedSelectedItem:at,itemMouseEnter:Je,keyDownArrowDown:ae,keyDownArrowUp:ue,keyDownEnd:nt,keyDownEnter:et,keyDownEscape:Qe,keyDownHome:tt,keyDownSpaceButton:st,mouseUp:Ge,touchEnd:dt,unknown:Ze}),kt=["refKey","ref"],Bt=["onClick","onPress","onKeyDown","onKeyUp","onBlur"],Wt=["onKeyDown","onBlur","onChange","onInput","onChangeText"],Ut=["refKey","ref"],qt=["onMouseMove","onMouseDown","onClick","onPress","index","item"],zt=function(){var t=function(n){function o(d){var e;e=n.call(this,d)||this,e.id=e.props.id||"downshift-"+At(),e.menuId=e.props.menuId||e.id+"-menu",e.labelId=e.props.labelId||e.id+"-label",e.inputId=e.props.inputId||e.id+"-input",e.getItemId=e.props.getItemId||function(r){return e.id+"-item-"+r},e.items=[],e.itemCount=null,e.previousResultCount=0,e.timeoutIds=[],e.internalSetTimeout=function(r,s){var i=setTimeout(function(){e.timeoutIds=e.timeoutIds.filter(function(a){return a!==i}),r()},s);e.timeoutIds.push(i)},e.setItemCount=function(r){e.itemCount=r},e.unsetItemCount=function(){e.itemCount=null},e.isItemDisabled=function(r,s){var i=e.getItemNodeFromIndex(s);return i&&i.hasAttribute("disabled")},e.setHighlightedIndex=function(r,s){r===void 0&&(r=e.props.defaultHighlightedIndex),s===void 0&&(s={}),s=le(s),e.internalSetState(D({highlightedIndex:r},s))},e.clearSelection=function(r){e.internalSetState({selectedItem:null,inputValue:"",highlightedIndex:e.props.defaultHighlightedIndex,isOpen:e.props.defaultIsOpen},r)},e.selectItem=function(r,s,i){s=le(s),e.internalSetState(D({isOpen:e.props.defaultIsOpen,highlightedIndex:e.props.defaultHighlightedIndex,selectedItem:r,inputValue:e.props.itemToString(r)},s),i)},e.selectItemAtIndex=function(r,s,i){var a=e.items[r];a!=null&&e.selectItem(a,s,i)},e.selectHighlightedItem=function(r,s){return e.selectItemAtIndex(e.getState().highlightedIndex,r,s)},e.internalSetState=function(r,s){var i,a,p={},m=typeof r=="function";return!m&&r.hasOwnProperty("inputValue")&&e.props.onInputValueChange(r.inputValue,D({},e.getStateAndHelpers(),r)),e.setState(function(c){var I;c=e.getState(c);var v=m?r(c):r;v=e.props.stateReducer(c,v),i=v.hasOwnProperty("selectedItem");var S={};return i&&v.selectedItem!==c.selectedItem&&(a=v.selectedItem),(I=v).type||(I.type=Ze),Object.keys(v).forEach(function(x){c[x]!==v[x]&&(p[x]=v[x]),x!=="type"&&(v[x],De(e.props,x)||(S[x]=v[x]))}),m&&v.hasOwnProperty("inputValue")&&e.props.onInputValueChange(v.inputValue,D({},e.getStateAndHelpers(),v)),S},function(){je(s)();var c=Object.keys(p).length>1;c&&e.props.onStateChange(p,e.getStateAndHelpers()),i&&e.props.onSelect(r.selectedItem,e.getStateAndHelpers()),a!==void 0&&e.props.onChange(a,e.getStateAndHelpers()),e.props.onUserAction(p,e.getStateAndHelpers())})},e.rootRef=function(r){return e._rootNode=r},e.getRootProps=function(r,s){var i,a=r===void 0?{}:r,p=a.refKey,m=p===void 0?"ref":p,c=a.ref,I=q(a,kt),v=s===void 0?{}:s,S=v.suppressRefError,x=S===void 0?!1:S;e.getRootProps.called=!0,e.getRootProps.refKey=m,e.getRootProps.suppressRefError=x;var T=e.getState(),R=T.isOpen;return D((i={},i[m]=Le(c,e.rootRef),i.role="combobox",i["aria-expanded"]=R,i["aria-haspopup"]="listbox",i["aria-owns"]=R?e.menuId:void 0,i["aria-labelledby"]=e.labelId,i),I)},e.keyDownHandlers={ArrowDown:function(s){var i=this;if(s.preventDefault(),this.getState().isOpen){var a=s.shiftKey?5:1;this.moveHighlightedIndex(a,{type:ae})}else this.internalSetState({isOpen:!0,type:ae},function(){var p=i.getItemCount();if(p>0){var m=i.getState(),c=m.highlightedIndex,I=He(c,1,{length:p},i.isItemDisabled,!0);i.setHighlightedIndex(I,{type:ae})}})},ArrowUp:function(s){var i=this;if(s.preventDefault(),this.getState().isOpen){var a=s.shiftKey?-5:-1;this.moveHighlightedIndex(a,{type:ue})}else this.internalSetState({isOpen:!0,type:ue},function(){var p=i.getItemCount();if(p>0){var m=i.getState(),c=m.highlightedIndex,I=He(c,-1,{length:p},i.isItemDisabled,!0);i.setHighlightedIndex(I,{type:ue})}})},Enter:function(s){if(s.which!==229){var i=this.getState(),a=i.isOpen,p=i.highlightedIndex;if(a&&p!=null){s.preventDefault();var m=this.items[p],c=this.getItemNodeFromIndex(p);if(m==null||c&&c.hasAttribute("disabled"))return;this.selectHighlightedItem({type:et})}}},Escape:function(s){s.preventDefault(),this.reset(D({type:Qe},!this.state.isOpen&&{selectedItem:null,inputValue:""}))}},e.buttonKeyDownHandlers=D({},e.keyDownHandlers,{" ":function(s){s.preventDefault(),this.toggleMenu({type:st})}}),e.inputKeyDownHandlers=D({},e.keyDownHandlers,{Home:function(s){var i=this.getState(),a=i.isOpen;if(a){s.preventDefault();var p=this.getItemCount();if(!(p<=0||!a)){var m=ce(0,!1,{length:p},this.isItemDisabled);this.setHighlightedIndex(m,{type:tt})}}},End:function(s){var i=this.getState(),a=i.isOpen;if(a){s.preventDefault();var p=this.getItemCount();if(!(p<=0||!a)){var m=ce(p-1,!0,{length:p},this.isItemDisabled);this.setHighlightedIndex(m,{type:nt})}}}}),e.getToggleButtonProps=function(r){var s=r===void 0?{}:r,i=s.onClick;s.onPress;var a=s.onKeyDown,p=s.onKeyUp,m=s.onBlur,c=q(s,Bt),I=e.getState(),v=I.isOpen,S={onClick:L(i,e.buttonHandleClick),onKeyDown:L(a,e.buttonHandleKeyDown),onKeyUp:L(p,e.buttonHandleKeyUp),onBlur:L(m,e.buttonHandleBlur)},x=c.disabled?{}:S;return D({type:"button",role:"button","aria-label":v?"close menu":"open menu","aria-haspopup":!0,"data-toggle":!0},x,c)},e.buttonHandleKeyUp=function(r){r.preventDefault()},e.buttonHandleKeyDown=function(r){var s=Ve(r);e.buttonKeyDownHandlers[s]&&e.buttonKeyDownHandlers[s].call(e,r)},e.buttonHandleClick=function(r){if(r.preventDefault(),e.props.environment){var s=e.props.environment.document,i=s.body,a=s.activeElement;i&&i===a&&r.target.focus()}e.internalSetTimeout(function(){return e.toggleMenu({type:lt})})},e.buttonHandleBlur=function(r){var s=r.target;e.internalSetTimeout(function(){if(!(e.isMouseDown||!e.props.environment)){var i=e.props.environment.document.activeElement;(i==null||i.id!==e.inputId)&&i!==s&&e.reset({type:ut})}})},e.getLabelProps=function(r){return D({htmlFor:e.inputId,id:e.labelId},r)},e.getInputProps=function(r){var s=r===void 0?{}:r,i=s.onKeyDown,a=s.onBlur,p=s.onChange,m=s.onInput;s.onChangeText;var c=q(s,Wt),I,v={};I="onChange";var S=e.getState(),x=S.inputValue,T=S.isOpen,R=S.highlightedIndex;if(!c.disabled){var K;v=(K={},K[I]=L(p,m,e.inputHandleChange),K.onKeyDown=L(i,e.inputHandleKeyDown),K.onBlur=L(a,e.inputHandleBlur),K)}return D({"aria-autocomplete":"list","aria-activedescendant":T&&typeof R=="number"&&R>=0?e.getItemId(R):void 0,"aria-controls":T?e.menuId:void 0,"aria-labelledby":c&&c["aria-label"]?void 0:e.labelId,autoComplete:"off",value:x,id:e.inputId},v,c)},e.inputHandleKeyDown=function(r){var s=Ve(r);s&&e.inputKeyDownHandlers[s]&&e.inputKeyDownHandlers[s].call(e,r)},e.inputHandleChange=function(r){e.internalSetState({type:ot,isOpen:!0,inputValue:r.target.value,highlightedIndex:e.props.defaultHighlightedIndex})},e.inputHandleBlur=function(){e.internalSetTimeout(function(){var r;if(!(e.isMouseDown||!e.props.environment)){var s=e.props.environment.document.activeElement,i=(s==null||(r=s.dataset)==null?void 0:r.toggle)&&e._rootNode&&e._rootNode.contains(s);i||e.reset({type:it})}})},e.menuRef=function(r){e._menuNode=r},e.getMenuProps=function(r,s){var i,a=r===void 0?{}:r,p=a.refKey,m=p===void 0?"ref":p,c=a.ref,I=q(a,Ut),v=s===void 0?{}:s,S=v.suppressRefError,x=S===void 0?!1:S;return e.getMenuProps.called=!0,e.getMenuProps.refKey=m,e.getMenuProps.suppressRefError=x,D((i={},i[m]=Le(c,e.menuRef),i.role="listbox",i["aria-labelledby"]=I&&I["aria-label"]?void 0:e.labelId,i.id=e.menuId,i),I)},e.getItemProps=function(r){var s,i=r===void 0?{}:r,a=i.onMouseMove,p=i.onMouseDown,m=i.onClick;i.onPress;var c=i.index,I=i.item,v=I===void 0?void 0:I,S=q(i,qt);c===void 0?(e.items.push(v),c=e.items.indexOf(v)):e.items[c]=v;var x="onClick",T=m,R=(s={onMouseMove:L(a,function(){c!==e.getState().highlightedIndex&&(e.setHighlightedIndex(c,{type:Je}),e.avoidScrolling=!0,e.internalSetTimeout(function(){return e.avoidScrolling=!1},250))}),onMouseDown:L(p,function(N){N.preventDefault()})},s[x]=L(T,function(){e.selectItemAtIndex(c,{type:rt})}),s),K=S.disabled?{onMouseDown:R.onMouseDown}:R;return D({id:e.getItemId(c),role:"option","aria-selected":e.getState().highlightedIndex===c},K,S)},e.clearItems=function(){e.items=[]},e.reset=function(r,s){r===void 0&&(r={}),r=le(r),e.internalSetState(function(i){var a=i.selectedItem;return D({isOpen:e.props.defaultIsOpen,highlightedIndex:e.props.defaultHighlightedIndex,inputValue:e.props.itemToString(a)},r)},s)},e.toggleMenu=function(r,s){r===void 0&&(r={}),r=le(r),e.internalSetState(function(i){var a=i.isOpen;return D({isOpen:!a},a&&{highlightedIndex:e.props.defaultHighlightedIndex},r)},function(){var i=e.getState(),a=i.isOpen,p=i.highlightedIndex;a&&e.getItemCount()>0&&typeof p=="number"&&e.setHighlightedIndex(p,r),je(s)()})},e.openMenu=function(r){e.internalSetState({isOpen:!0},r)},e.closeMenu=function(r){e.internalSetState({isOpen:!1},r)},e.updateStatus=Me(function(){var r;if((r=e.props)!=null&&(r=r.environment)!=null&&r.document){var s=e.getState(),i=e.items[s.highlightedIndex],a=e.getItemCount(),p=e.props.getA11yStatusMessage(D({itemToString:e.props.itemToString,previousResultCount:e.previousResultCount,resultCount:a,highlightedItem:i},s));e.previousResultCount=a,Ye(p,e.props.environment.document)}},200);var u=e.props,f=u.defaultHighlightedIndex,g=u.initialHighlightedIndex,E=g===void 0?f:g,M=u.defaultIsOpen,O=u.initialIsOpen,_=O===void 0?M:O,y=u.initialInputValue,H=y===void 0?"":y,A=u.initialSelectedItem,$=A===void 0?null:A,F=e.getState({highlightedIndex:E,isOpen:_,inputValue:H,selectedItem:$});return F.selectedItem!=null&&e.props.initialInputValue===void 0&&(F.inputValue=e.props.itemToString(F.selectedItem)),e.state=F,e}xt(o,n);var l=o.prototype;return l.internalClearTimeouts=function(){this.timeoutIds.forEach(function(e){clearTimeout(e)}),this.timeoutIds=[]},l.getState=function(e){return e===void 0&&(e=this.state),Lt(e,this.props)},l.getItemCount=function(){var e=this.items.length;return this.itemCount!=null?e=this.itemCount:this.props.itemCount!==void 0&&(e=this.props.itemCount),e},l.getItemNodeFromIndex=function(e){return this.props.environment?this.props.environment.document.getElementById(this.getItemId(e)):null},l.scrollHighlightedItemIntoView=function(){{var e=this.getItemNodeFromIndex(this.getState().highlightedIndex);this.props.scrollIntoView(e,this._menuNode)}},l.moveHighlightedIndex=function(e,u){var f=this.getItemCount(),g=this.getState(),E=g.highlightedIndex;if(f>0){var M=He(E,e,{length:f},this.isItemDisabled,!0);this.setHighlightedIndex(M,u)}},l.getStateAndHelpers=function(){var e=this.getState(),u=e.highlightedIndex,f=e.inputValue,g=e.selectedItem,E=e.isOpen,M=this.props.itemToString,O=this.id,_=this.getRootProps,y=this.getToggleButtonProps,H=this.getLabelProps,A=this.getMenuProps,$=this.getInputProps,F=this.getItemProps,r=this.openMenu,s=this.closeMenu,i=this.toggleMenu,a=this.selectItem,p=this.selectItemAtIndex,m=this.selectHighlightedItem,c=this.setHighlightedIndex,I=this.clearSelection,v=this.clearItems,S=this.reset,x=this.setItemCount,T=this.unsetItemCount,R=this.internalSetState;return{getRootProps:_,getToggleButtonProps:y,getLabelProps:H,getMenuProps:A,getInputProps:$,getItemProps:F,reset:S,openMenu:r,closeMenu:s,toggleMenu:i,selectItem:a,selectItemAtIndex:p,selectHighlightedItem:m,setHighlightedIndex:c,clearSelection:I,clearItems:v,setItemCount:x,unsetItemCount:T,setState:R,itemToString:M,id:O,highlightedIndex:u,inputValue:f,isOpen:E,selectedItem:g}},l.componentDidMount=function(){var e=this;if(!this.props.environment)this.cleanup=function(){e.internalClearTimeouts()};else{var u=function(){e.isMouseDown=!0},f=function(y){e.isMouseDown=!1;var H=ke(y.target,[e._rootNode,e._menuNode],e.props.environment);!H&&e.getState().isOpen&&e.reset({type:Ge},function(){return e.props.onOuterClick(e.getStateAndHelpers())})},g=function(){e.isTouchMove=!1},E=function(){e.isTouchMove=!0},M=function(y){var H=ke(y.target,[e._rootNode,e._menuNode],e.props.environment,!1);!e.isTouchMove&&!H&&e.getState().isOpen&&e.reset({type:dt},function(){return e.props.onOuterClick(e.getStateAndHelpers())})},O=this.props.environment;O.addEventListener("mousedown",u),O.addEventListener("mouseup",f),O.addEventListener("touchstart",g),O.addEventListener("touchmove",E),O.addEventListener("touchend",M),this.cleanup=function(){e.internalClearTimeouts(),e.updateStatus.cancel(),O.removeEventListener("mousedown",u),O.removeEventListener("mouseup",f),O.removeEventListener("touchstart",g),O.removeEventListener("touchmove",E),O.removeEventListener("touchend",M)}}},l.shouldScroll=function(e,u){var f=this.props.highlightedIndex===void 0?this.getState():this.props,g=f.highlightedIndex,E=u.highlightedIndex===void 0?e:u,M=E.highlightedIndex,O=g&&this.getState().isOpen&&!e.isOpen,_=g!==M;return O||_},l.componentDidUpdate=function(e,u){De(this.props,"selectedItem")&&this.props.selectedItemChanged(e.selectedItem,this.props.selectedItem)&&this.internalSetState({type:at,inputValue:this.props.itemToString(this.props.selectedItem)}),!this.avoidScrolling&&this.shouldScroll(u,e)&&this.scrollHighlightedItemIntoView(),this.updateStatus()},l.componentWillUnmount=function(){this.cleanup()},l.render=function(){var e=Ne(this.props.children,B);this.clearItems(),this.getRootProps.called=!1,this.getRootProps.refKey=void 0,this.getRootProps.suppressRefError=void 0,this.getMenuProps.called=!1,this.getMenuProps.refKey=void 0,this.getMenuProps.suppressRefError=void 0,this.getLabelProps.called=!1,this.getInputProps.called=!1;var u=Ne(e(this.getStateAndHelpers()));if(!u)return null;if(this.getRootProps.called||this.props.suppressRefError)return u;if($t(u))return P.cloneElement(u,this.getRootProps(jt(u)))},o}(P.Component);return t.defaultProps={defaultHighlightedIndex:null,defaultIsOpen:!1,getA11yStatusMessage:Ft,itemToString:function(o){return o==null?"":String(o)},onStateChange:B,onInputValueChange:B,onUserAction:B,onChange:B,onSelect:B,onOuterClick:B,selectedItemChanged:function(o,l){return o!==l},environment:typeof window>"u"?void 0:window,stateReducer:function(o,l){return l},suppressRefError:!1,scrollIntoView:ze},t.stateChangeTypes=Vt,t}(),Xt=zt;function Yt(t,n){return n.changes}Me(function(t,n){Ye(t,n)},200);var z={itemToString:function(n){return n?String(n):""},itemToKey:function(n){return n},stateReducer:Yt,scrollIntoView:ze,environment:typeof window>"u"?void 0:window},de={environment:h.shape({addEventListener:h.func.isRequired,removeEventListener:h.func.isRequired,document:h.shape({createElement:h.func.isRequired,getElementById:h.func.isRequired,activeElement:h.any.isRequired,body:h.any.isRequired}).isRequired,Node:h.func.isRequired}),itemToString:h.func,itemToKey:h.func,stateReducer:h.func},ct=D({},de,{getA11yStatusMessage:h.func,highlightedIndex:h.number,defaultHighlightedIndex:h.number,initialHighlightedIndex:h.number,isOpen:h.bool,defaultIsOpen:h.bool,initialIsOpen:h.bool,selectedItem:h.any,initialSelectedItem:h.any,defaultSelectedItem:h.any,id:h.string,labelId:h.string,menuId:h.string,getItemId:h.func,toggleButtonId:h.string,onSelectedItemChange:h.func,onHighlightedIndexChange:h.func,onStateChange:h.func,onIsOpenChange:h.func,scrollIntoView:h.func});U(U({},ct),{items:h.array.isRequired,isItemDisabled:h.func});U(U({},z),{isItemDisabled:function(){return!1}});D({},ct,{items:h.array.isRequired,isItemDisabled:h.func,inputValue:h.string,defaultInputValue:h.string,initialInputValue:h.string,inputId:h.string,onInputValueChange:h.func});D({},z,{isItemDisabled:function(){return!1}});de.stateReducer,de.itemToKey,de.environment,h.array,h.array,h.array,h.func,h.number,h.number,h.number,h.func,h.func,h.string,h.string;z.itemToKey,z.stateReducer,z.environment;function Zt({items:t=[],label:n,placeholder:o=null,onChange:l,onFocus:d}){const e=P.useRef(null),[u,f]=P.useState(!1);P.useEffect(()=>{e.current&&setTimeout(()=>{f(!0)},0)},[e.current]);const[g,E]=P.useState(!1),M=y=>{E(!1),d&&d(y),setTimeout(()=>E(!0),1)},O=y=>{E(!1)},_=y=>{console.log(y),l&&l(y)};return b.jsx(Xt,{onChange:_,itemToString:y=>y?(y==null?void 0:y.label)||y.value:"",children:({getInputProps:y,getItemProps:H,getLabelProps:A,getMenuProps:$,isOpen:F,inputValue:r,highlightedIndex:s,selectedItem:i,getRootProps:a})=>{const p=c=>{if(!r)return!0;const I=r.split(" ").map(S=>S.toLowerCase()),v=c.label.split(" ").map(S=>S.toLowerCase());return I.every(S=>v.some(x=>x.includes(S)))},m=t.filter(p);return b.jsxs("div",{ref:e,className:`Combobox ${u?"init":""} ${g?"open":""}`,children:[b.jsxs("label",{...A(),children:[n,b.jsx("div",{className:"input-wrapper",...a({},{suppressRefError:!0}),children:b.jsx("input",{...y(),placeholder:o,onFocus:M,onClick:M,onBlur:O})})]}),b.jsx("ul",{className:`results ${g?"open":""}`,...$(),children:m.length&&g?m.map((c,I)=>b.jsx("li",{className:`item ${s===I?"highlighted":""}`,...H({index:I,item:c,style:{fontWeight:i===c?"bold":"normal"}}),children:(c==null?void 0:c.label)||c.value},(c==null?void 0:c.label)||c.value)):b.jsx("li",{className:"item",children:"(no results)"})})]})}})}function Oe(){const t={loading:!1,error:null,data:null},n=(e,u)=>{switch(u.type){case W.FETCH_START:return{...e,loading:!0,error:null};case W.FETCH_SUCCESS:return{...e,loading:!1,data:u.payload};case W.FETCH_FAILURE:return{...e,loading:!1,error:u.payload};default:return e}},[o,l]=P.useReducer(n,t);return{state:o,get:async e=>{l({type:W.FETCH_START});try{const u=await axios(e);return l({type:W.FETCH_SUCCESS,payload:u.data}),u}catch(u){return l({type:W.FETCH_FAILURE,payload:u.message}),u}}}}const W={FETCH_START:"FETCH_START",FETCH_SUCCESS:"FETCH_SUCCESS",FETCH_FAILURE:"FETCH_FAILURE"};function pn(){var r,s;const[t,n]=P.useState(null),[o,l]=P.useState(null),[d,e]=P.useState([]),[u,f]=P.useState(null),[g,E]=P.useState(null),M=ft();mt("home");const O=vt(),_=Oe(),y=Oe(),H=Oe();P.useEffect(()=>{_.get("/api/fishes").then(i=>n(i.data.fishes)),y.get("/api/locations").then(i=>l(i.data.locations))},[]),P.useEffect(()=>{const i=M.get("settings",a=>a.selectedFish);i&&f(i)},[]);const A=i=>{let a;u===i?a=null:a=i,M.set("settings",p=>p.selectedFish=a),f(a)},$=i=>{E(i)};P.useEffect(()=>{var i;if(g){console.log(g),e([]);let a="/api/fishByLocation/"+g.value.regionId;a+="/"+(((i=g.value)==null?void 0:i.waterId)??0),a+="/"+(u??0),H.get(a).then(p=>{e(p.data.limits)})}},[g,u]);const F=i=>{const a=i.target,p=a.closest(".Combobox");p.addEventListener("transitionstart",()=>p.addEventListener("transitionend",()=>{var m;return(m=a.parentElement)==null?void 0:m.scrollIntoView({behavior:"smooth",block:"start"})},{once:!0}),{once:!0})};return b.jsxs(ht,{className:`Home ${g?"location-selected":""}`,children:[b.jsx("header",{children:b.jsx(gt,{children:b.jsxs("h1",{className:"hero",children:["Smart ",b.jsx("span",{children:"Fish"})]})})}),b.jsxs("main",{children:[t!==null&&o!==null&&b.jsxs("div",{className:"layout",children:[b.jsx("div",{className:"header",children:g&&b.jsxs("button",{onClick:()=>E(null),className:"selected-location flex items-center gap-2",children:[b.jsx("strong",{children:g.label.split("/").map(i=>b.jsx("span",{children:i},i))}),b.jsx(wt,{className:"h-5 w-5"})]})}),b.jsx("div",{className:"body",children:g?b.jsx(St,{restrictions:d,regionId:(r=g==null?void 0:g.value)==null?void 0:r.regionId,waterId:(s=g==null?void 0:g.value)==null?void 0:s.waterId}):b.jsx(Zt,{items:Object.keys(o).map(i=>({value:o[i],label:i})),onChange:$,onFocus:F,placeholder:"Search by river, lake or region"})})]}),b.jsx("div",{className:"logo",children:b.jsx("img",{src:"/images/logo.png"})})]}),b.jsx("footer",{children:O.isMobile?b.jsx(It,{fishes:t,selectedFishId:u,selectFish:A}):b.jsx(yt,{fishes:t,selectedFishId:u,selectFish:A})})]})}export{pn as default};
