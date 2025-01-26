import{r as T,g as pt,j as I}from"./app-Bvn6fLUK.js";import{u as ft,P as ht}from"./PublicLayout-CNV2oLiq.js";import{P as gt}from"./PublicNav-D8fwOJom.js";import mt from"./FishLimitsGrid-CJnWe7Yf.js";import"./ResponsiveNavLink-B1kqPBOg.js";import"./transition-MnBhSZ7j.js";import"./parseMySqlDate-1ZJKP2sH.js";/* empty css                */import"./useScreenOrientation-CpkSlnLv.js";import"./getFishImageSrc-bMjek-YH.js";function vt({title:t,titleId:r,...s},l){return T.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:l,"aria-labelledby":r},s),t?T.createElement("title",{id:r},t):null,T.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const It=T.forwardRef(vt);function q(t,r){if(t==null)return{};var s={};for(var l in t)if({}.hasOwnProperty.call(t,l)){if(r.includes(l))continue;s[l]=t[l]}return s}function D(){return D=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var s=arguments[r];for(var l in s)({}).hasOwnProperty.call(s,l)&&(t[l]=s[l])}return t},D.apply(null,arguments)}function Re(t,r){return Re=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(s,l){return s.__proto__=l,s},Re(t,r)}function yt(t,r){t.prototype=Object.create(r.prototype),t.prototype.constructor=t,Re(t,r)}var ke={exports:{}},St="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",bt=St,wt=bt;function We(){}function Ue(){}Ue.resetWarningCache=We;var xt=function(){function t(l,c,e,a,p,g){if(g!==wt){var C=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw C.name="Invariant Violation",C}}t.isRequired=t;function r(){return t}var s={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:r,element:t,elementType:t,instanceOf:r,node:t,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:Ue,resetWarningCache:We};return s.PropTypes=s,s};ke.exports=xt();var Ct=ke.exports;const f=pt(Ct);var S={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Te=Symbol.for("react.element"),Pe=Symbol.for("react.portal"),pe=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),he=Symbol.for("react.profiler"),ge=Symbol.for("react.provider"),me=Symbol.for("react.context"),Et=Symbol.for("react.server_context"),ve=Symbol.for("react.forward_ref"),Ie=Symbol.for("react.suspense"),ye=Symbol.for("react.suspense_list"),Se=Symbol.for("react.memo"),be=Symbol.for("react.lazy"),Ht=Symbol.for("react.offscreen"),qe;qe=Symbol.for("react.module.reference");function L(t){if(typeof t=="object"&&t!==null){var r=t.$$typeof;switch(r){case Te:switch(t=t.type,t){case pe:case he:case fe:case Ie:case ye:return t;default:switch(t=t&&t.$$typeof,t){case Et:case me:case ve:case be:case Se:case ge:return t;default:return r}}case Pe:return r}}}S.ContextConsumer=me;S.ContextProvider=ge;S.Element=Te;S.ForwardRef=ve;S.Fragment=pe;S.Lazy=be;S.Memo=Se;S.Portal=Pe;S.Profiler=he;S.StrictMode=fe;S.Suspense=Ie;S.SuspenseList=ye;S.isAsyncMode=function(){return!1};S.isConcurrentMode=function(){return!1};S.isContextConsumer=function(t){return L(t)===me};S.isContextProvider=function(t){return L(t)===ge};S.isElement=function(t){return typeof t=="object"&&t!==null&&t.$$typeof===Te};S.isForwardRef=function(t){return L(t)===ve};S.isFragment=function(t){return L(t)===pe};S.isLazy=function(t){return L(t)===be};S.isMemo=function(t){return L(t)===Se};S.isPortal=function(t){return L(t)===Pe};S.isProfiler=function(t){return L(t)===he};S.isStrictMode=function(t){return L(t)===fe};S.isSuspense=function(t){return L(t)===Ie};S.isSuspenseList=function(t){return L(t)===ye};S.isValidElementType=function(t){return typeof t=="string"||typeof t=="function"||t===pe||t===he||t===fe||t===Ie||t===ye||t===Ht||typeof t=="object"&&t!==null&&(t.$$typeof===be||t.$$typeof===Se||t.$$typeof===ge||t.$$typeof===me||t.$$typeof===ve||t.$$typeof===qe||t.getModuleId!==void 0)};S.typeOf=L;const $e=t=>typeof t=="object"&&t!=null&&t.nodeType===1,Fe=(t,r)=>(!r||t!=="hidden")&&t!=="visible"&&t!=="clip",oe=(t,r)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const s=getComputedStyle(t,null);return Fe(s.overflowY,r)||Fe(s.overflowX,r)||(l=>{const c=(e=>{if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch{return null}})(l);return!!c&&(c.clientHeight<l.scrollHeight||c.clientWidth<l.scrollWidth)})(t)}return!1},se=(t,r,s,l,c,e,a,p)=>e<t&&a>r||e>t&&a<r?0:e<=t&&p<=s||a>=r&&p>=s?e-t-l:a>r&&p<s||e<t&&p>s?a-r+c:0,Ot=t=>{const r=t.parentElement;return r??(t.getRootNode().host||null)},Rt=(t,r)=>{var s,l,c,e;if(typeof document>"u")return[];const{scrollMode:a,block:p,inline:g,boundary:C,skipOverflowHiddenElements:_}=r,b=typeof C=="function"?C:N=>N!==C;if(!$e(t))throw new TypeError("Invalid target");const P=document.scrollingElement||document.documentElement,y=[];let E=t;for(;$e(E)&&b(E);){if(E=Ot(E),E===P){y.push(E);break}E!=null&&E===document.body&&oe(E)&&!oe(document.documentElement)||E!=null&&oe(E,_)&&y.push(E)}const $=(l=(s=window.visualViewport)==null?void 0:s.width)!=null?l:innerWidth,F=(e=(c=window.visualViewport)==null?void 0:c.height)!=null?e:innerHeight,{scrollX:A,scrollY:i}=window,{height:n,width:o,top:d,right:u,bottom:m,left:h}=t.getBoundingClientRect(),{top:x,right:v,bottom:R,left:H}=(N=>{const w=window.getComputedStyle(N);return{top:parseFloat(w.scrollMarginTop)||0,right:parseFloat(w.scrollMarginRight)||0,bottom:parseFloat(w.scrollMarginBottom)||0,left:parseFloat(w.scrollMarginLeft)||0}})(t);let M=p==="start"||p==="nearest"?d-x:p==="end"?m+R:d+n/2-x+R,O=g==="center"?h+o/2-H+v:g==="end"?u+v:h-H;const j=[];for(let N=0;N<y.length;N++){const w=y[N],{height:X,width:Y,top:G,right:we,bottom:xe,left:Z}=w.getBoundingClientRect();if(a==="if-needed"&&d>=0&&h>=0&&m<=F&&u<=$&&(w===P&&!oe(w)||d>=G&&m<=xe&&h>=Z&&u<=we))return j;const J=getComputedStyle(w),Q=parseInt(J.borderLeftWidth,10),ee=parseInt(J.borderTopWidth,10),te=parseInt(J.borderRightWidth,10),ne=parseInt(J.borderBottomWidth,10);let V=0,B=0;const re="offsetWidth"in w?w.offsetWidth-w.clientWidth-Q-te:0,ie="offsetHeight"in w?w.offsetHeight-w.clientHeight-ee-ne:0,Ce="offsetWidth"in w?w.offsetWidth===0?0:Y/w.offsetWidth:0,Ee="offsetHeight"in w?w.offsetHeight===0?0:X/w.offsetHeight:0;if(P===w)V=p==="start"?M:p==="end"?M-F:p==="nearest"?se(i,i+F,F,ee,ne,i+M,i+M+n,n):M-F/2,B=g==="start"?O:g==="center"?O-$/2:g==="end"?O-$:se(A,A+$,$,Q,te,A+O,A+O+o,o),V=Math.max(0,V+i),B=Math.max(0,B+A);else{V=p==="start"?M-G-ee:p==="end"?M-xe+ne+ie:p==="nearest"?se(G,xe,X,ee,ne+ie,M,M+n,n):M-(G+X/2)+ie/2,B=g==="start"?O-Z-Q:g==="center"?O-(Z+Y/2)+re/2:g==="end"?O-we+te+re:se(Z,we,Y,Q,te+re,O,O+o,o);const{scrollLeft:_e,scrollTop:Ae}=w;V=Ee===0?0:Math.max(0,Math.min(Ae+V/Ee,w.scrollHeight-X/Ee+ie)),B=Ce===0?0:Math.max(0,Math.min(_e+B/Ce,w.scrollWidth-Y/Ce+re)),M+=Ae-V,O+=_e-B}j.push({el:w,top:V,left:B})}return j};var U=function(){return U=Object.assign||function(r){for(var s,l=1,c=arguments.length;l<c;l++){s=arguments[l];for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&(r[e]=s[e])}return r},U.apply(this,arguments)};var Dt=0;function Le(t){return typeof t=="function"?t:k}function k(){}function ze(t,r){if(t){var s=Rt(t,{boundary:r,block:"nearest",scrollMode:"if-needed"});s.forEach(function(l){var c=l.el,e=l.top,a=l.left;c.scrollTop=e,c.scrollLeft=a})}}function je(t,r,s){var l=t===r||r instanceof s.Node&&t.contains&&t.contains(r);return l}function Me(t,r){var s;function l(){s&&clearTimeout(s)}function c(){for(var e=arguments.length,a=new Array(e),p=0;p<e;p++)a[p]=arguments[p];l(),s=setTimeout(function(){s=null,t.apply(void 0,a)},r)}return c.cancel=l,c}function K(){for(var t=arguments.length,r=new Array(t),s=0;s<t;s++)r[s]=arguments[s];return function(l){for(var c=arguments.length,e=new Array(c>1?c-1:0),a=1;a<c;a++)e[a-1]=arguments[a];return r.some(function(p){return p&&p.apply(void 0,[l].concat(e)),l.preventDownshiftDefault||l.hasOwnProperty("nativeEvent")&&l.nativeEvent.preventDownshiftDefault})}}function Ke(){for(var t=arguments.length,r=new Array(t),s=0;s<t;s++)r[s]=arguments[s];return function(l){r.forEach(function(c){typeof c=="function"?c(l):c&&(c.current=l)})}}function Tt(){return String(Dt++)}function Pt(t){var r=t.isOpen,s=t.resultCount,l=t.previousResultCount;return r?s?s!==l?s+" result"+(s===1?" is":"s are")+" available, use up and down arrow keys to navigate. Press Enter key to select.":"":"No results are available.":""}function Ne(t,r){return t=Array.isArray(t)?t[0]:t,!t&&r?r:t}function Mt(t){return typeof t.type=="string"}function _t(t){return t.props}var At=["highlightedIndex","inputValue","isOpen","selectedItem","type"];function le(t){t===void 0&&(t={});var r={};return At.forEach(function(s){t.hasOwnProperty(s)&&(r[s]=t[s])}),r}function $t(t,r){return!t||!r?t:Object.keys(t).reduce(function(s,l){return s[l]=De(r,l)?r[l]:t[l],s},{})}function De(t,r){return t[r]!==void 0}function Ve(t){var r=t.key,s=t.keyCode;return s>=37&&s<=40&&r.indexOf("Arrow")!==0?"Arrow"+r:r}function He(t,r,s,l,c){var e=s.length;if(e===0)return-1;var a=e-1;(typeof t!="number"||t<0||t>a)&&(t=r>0?-1:a+1);var p=t+r;p<0?p=a:p>a&&(p=0);var g=ce(p,r<0,s,l,c);return g===-1?t>=e?-1:t:g}function ce(t,r,s,l,c){c===void 0&&(c=!1);var e=s.length;if(r){for(var a=t;a>=0;a--)if(!l(s[a],a))return a}else for(var p=t;p<e;p++)if(!l(s[p],p))return p;return c?ce(r?e-1:0,r,s,l):-1}function Be(t,r,s,l){return l===void 0&&(l=!0),s&&r.some(function(c){return c&&(je(c,t,s)||l&&je(c,s.document.activeElement,s))})}var Ft=Me(function(t){Xe(t).textContent=""},500);function Xe(t){var r=t.getElementById("a11y-status-message");return r||(r=t.createElement("div"),r.setAttribute("id","a11y-status-message"),r.setAttribute("role","status"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-relevant","additions text"),Object.assign(r.style,{border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px"}),t.body.appendChild(r),r)}function Ye(t,r){if(!(!t||!r)){var s=Xe(r);s.textContent=t,Ft(r)}}var Ge=0,Ze=1,Je=2,ae=3,ue=4,Qe=5,et=6,tt=7,nt=8,rt=9,it=10,ot=11,st=12,lt=13,at=14,ut=15,dt=16,Lt=Object.freeze({__proto__:null,blurButton:at,blurInput:it,changeInput:ot,clickButton:lt,clickItem:rt,controlledPropUpdatedSelectedItem:ut,itemMouseEnter:Je,keyDownArrowDown:ue,keyDownArrowUp:ae,keyDownEnd:nt,keyDownEnter:et,keyDownEscape:Qe,keyDownHome:tt,keyDownSpaceButton:st,mouseUp:Ze,touchEnd:dt,unknown:Ge}),jt=["refKey","ref"],Kt=["onClick","onPress","onKeyDown","onKeyUp","onBlur"],Nt=["onKeyDown","onBlur","onChange","onInput","onChangeText"],Vt=["refKey","ref"],Bt=["onMouseMove","onMouseDown","onClick","onPress","index","item"],kt=function(){var t=function(r){function s(c){var e;e=r.call(this,c)||this,e.id=e.props.id||"downshift-"+Tt(),e.menuId=e.props.menuId||e.id+"-menu",e.labelId=e.props.labelId||e.id+"-label",e.inputId=e.props.inputId||e.id+"-input",e.getItemId=e.props.getItemId||function(i){return e.id+"-item-"+i},e.items=[],e.itemCount=null,e.previousResultCount=0,e.timeoutIds=[],e.internalSetTimeout=function(i,n){var o=setTimeout(function(){e.timeoutIds=e.timeoutIds.filter(function(d){return d!==o}),i()},n);e.timeoutIds.push(o)},e.setItemCount=function(i){e.itemCount=i},e.unsetItemCount=function(){e.itemCount=null},e.isItemDisabled=function(i,n){var o=e.getItemNodeFromIndex(n);return o&&o.hasAttribute("disabled")},e.setHighlightedIndex=function(i,n){i===void 0&&(i=e.props.defaultHighlightedIndex),n===void 0&&(n={}),n=le(n),e.internalSetState(D({highlightedIndex:i},n))},e.clearSelection=function(i){e.internalSetState({selectedItem:null,inputValue:"",highlightedIndex:e.props.defaultHighlightedIndex,isOpen:e.props.defaultIsOpen},i)},e.selectItem=function(i,n,o){n=le(n),e.internalSetState(D({isOpen:e.props.defaultIsOpen,highlightedIndex:e.props.defaultHighlightedIndex,selectedItem:i,inputValue:e.props.itemToString(i)},n),o)},e.selectItemAtIndex=function(i,n,o){var d=e.items[i];d!=null&&e.selectItem(d,n,o)},e.selectHighlightedItem=function(i,n){return e.selectItemAtIndex(e.getState().highlightedIndex,i,n)},e.internalSetState=function(i,n){var o,d,u={},m=typeof i=="function";return!m&&i.hasOwnProperty("inputValue")&&e.props.onInputValueChange(i.inputValue,D({},e.getStateAndHelpers(),i)),e.setState(function(h){var x;h=e.getState(h);var v=m?i(h):i;v=e.props.stateReducer(h,v),o=v.hasOwnProperty("selectedItem");var R={};return o&&v.selectedItem!==h.selectedItem&&(d=v.selectedItem),(x=v).type||(x.type=Ge),Object.keys(v).forEach(function(H){h[H]!==v[H]&&(u[H]=v[H]),H!=="type"&&(v[H],De(e.props,H)||(R[H]=v[H]))}),m&&v.hasOwnProperty("inputValue")&&e.props.onInputValueChange(v.inputValue,D({},e.getStateAndHelpers(),v)),R},function(){Le(n)();var h=Object.keys(u).length>1;h&&e.props.onStateChange(u,e.getStateAndHelpers()),o&&e.props.onSelect(i.selectedItem,e.getStateAndHelpers()),d!==void 0&&e.props.onChange(d,e.getStateAndHelpers()),e.props.onUserAction(u,e.getStateAndHelpers())})},e.rootRef=function(i){return e._rootNode=i},e.getRootProps=function(i,n){var o,d=i===void 0?{}:i,u=d.refKey,m=u===void 0?"ref":u,h=d.ref,x=q(d,jt),v=n===void 0?{}:n,R=v.suppressRefError,H=R===void 0?!1:R;e.getRootProps.called=!0,e.getRootProps.refKey=m,e.getRootProps.suppressRefError=H;var M=e.getState(),O=M.isOpen;return D((o={},o[m]=Ke(h,e.rootRef),o.role="combobox",o["aria-expanded"]=O,o["aria-haspopup"]="listbox",o["aria-owns"]=O?e.menuId:void 0,o["aria-labelledby"]=e.labelId,o),x)},e.keyDownHandlers={ArrowDown:function(n){var o=this;if(n.preventDefault(),this.getState().isOpen){var d=n.shiftKey?5:1;this.moveHighlightedIndex(d,{type:ue})}else this.internalSetState({isOpen:!0,type:ue},function(){var u=o.getItemCount();if(u>0){var m=o.getState(),h=m.highlightedIndex,x=He(h,1,{length:u},o.isItemDisabled,!0);o.setHighlightedIndex(x,{type:ue})}})},ArrowUp:function(n){var o=this;if(n.preventDefault(),this.getState().isOpen){var d=n.shiftKey?-5:-1;this.moveHighlightedIndex(d,{type:ae})}else this.internalSetState({isOpen:!0,type:ae},function(){var u=o.getItemCount();if(u>0){var m=o.getState(),h=m.highlightedIndex,x=He(h,-1,{length:u},o.isItemDisabled,!0);o.setHighlightedIndex(x,{type:ae})}})},Enter:function(n){if(n.which!==229){var o=this.getState(),d=o.isOpen,u=o.highlightedIndex;if(d&&u!=null){n.preventDefault();var m=this.items[u],h=this.getItemNodeFromIndex(u);if(m==null||h&&h.hasAttribute("disabled"))return;this.selectHighlightedItem({type:et})}}},Escape:function(n){n.preventDefault(),this.reset(D({type:Qe},!this.state.isOpen&&{selectedItem:null,inputValue:""}))}},e.buttonKeyDownHandlers=D({},e.keyDownHandlers,{" ":function(n){n.preventDefault(),this.toggleMenu({type:st})}}),e.inputKeyDownHandlers=D({},e.keyDownHandlers,{Home:function(n){var o=this.getState(),d=o.isOpen;if(d){n.preventDefault();var u=this.getItemCount();if(!(u<=0||!d)){var m=ce(0,!1,{length:u},this.isItemDisabled);this.setHighlightedIndex(m,{type:tt})}}},End:function(n){var o=this.getState(),d=o.isOpen;if(d){n.preventDefault();var u=this.getItemCount();if(!(u<=0||!d)){var m=ce(u-1,!0,{length:u},this.isItemDisabled);this.setHighlightedIndex(m,{type:nt})}}}}),e.getToggleButtonProps=function(i){var n=i===void 0?{}:i,o=n.onClick;n.onPress;var d=n.onKeyDown,u=n.onKeyUp,m=n.onBlur,h=q(n,Kt),x=e.getState(),v=x.isOpen,R={onClick:K(o,e.buttonHandleClick),onKeyDown:K(d,e.buttonHandleKeyDown),onKeyUp:K(u,e.buttonHandleKeyUp),onBlur:K(m,e.buttonHandleBlur)},H=h.disabled?{}:R;return D({type:"button",role:"button","aria-label":v?"close menu":"open menu","aria-haspopup":!0,"data-toggle":!0},H,h)},e.buttonHandleKeyUp=function(i){i.preventDefault()},e.buttonHandleKeyDown=function(i){var n=Ve(i);e.buttonKeyDownHandlers[n]&&e.buttonKeyDownHandlers[n].call(e,i)},e.buttonHandleClick=function(i){if(i.preventDefault(),e.props.environment){var n=e.props.environment.document,o=n.body,d=n.activeElement;o&&o===d&&i.target.focus()}e.internalSetTimeout(function(){return e.toggleMenu({type:lt})})},e.buttonHandleBlur=function(i){var n=i.target;e.internalSetTimeout(function(){if(!(e.isMouseDown||!e.props.environment)){var o=e.props.environment.document.activeElement;(o==null||o.id!==e.inputId)&&o!==n&&e.reset({type:at})}})},e.getLabelProps=function(i){return D({htmlFor:e.inputId,id:e.labelId},i)},e.getInputProps=function(i){var n=i===void 0?{}:i,o=n.onKeyDown,d=n.onBlur,u=n.onChange,m=n.onInput;n.onChangeText;var h=q(n,Nt),x,v={};x="onChange";var R=e.getState(),H=R.inputValue,M=R.isOpen,O=R.highlightedIndex;if(!h.disabled){var j;v=(j={},j[x]=K(u,m,e.inputHandleChange),j.onKeyDown=K(o,e.inputHandleKeyDown),j.onBlur=K(d,e.inputHandleBlur),j)}return D({"aria-autocomplete":"list","aria-activedescendant":M&&typeof O=="number"&&O>=0?e.getItemId(O):void 0,"aria-controls":M?e.menuId:void 0,"aria-labelledby":h&&h["aria-label"]?void 0:e.labelId,autoComplete:"off",value:H,id:e.inputId},v,h)},e.inputHandleKeyDown=function(i){var n=Ve(i);n&&e.inputKeyDownHandlers[n]&&e.inputKeyDownHandlers[n].call(e,i)},e.inputHandleChange=function(i){e.internalSetState({type:ot,isOpen:!0,inputValue:i.target.value,highlightedIndex:e.props.defaultHighlightedIndex})},e.inputHandleBlur=function(){e.internalSetTimeout(function(){var i;if(!(e.isMouseDown||!e.props.environment)){var n=e.props.environment.document.activeElement,o=(n==null||(i=n.dataset)==null?void 0:i.toggle)&&e._rootNode&&e._rootNode.contains(n);o||e.reset({type:it})}})},e.menuRef=function(i){e._menuNode=i},e.getMenuProps=function(i,n){var o,d=i===void 0?{}:i,u=d.refKey,m=u===void 0?"ref":u,h=d.ref,x=q(d,Vt),v=n===void 0?{}:n,R=v.suppressRefError,H=R===void 0?!1:R;return e.getMenuProps.called=!0,e.getMenuProps.refKey=m,e.getMenuProps.suppressRefError=H,D((o={},o[m]=Ke(h,e.menuRef),o.role="listbox",o["aria-labelledby"]=x&&x["aria-label"]?void 0:e.labelId,o.id=e.menuId,o),x)},e.getItemProps=function(i){var n,o=i===void 0?{}:i,d=o.onMouseMove,u=o.onMouseDown,m=o.onClick;o.onPress;var h=o.index,x=o.item,v=x===void 0?void 0:x,R=q(o,Bt);h===void 0?(e.items.push(v),h=e.items.indexOf(v)):e.items[h]=v;var H="onClick",M=m,O=(n={onMouseMove:K(d,function(){h!==e.getState().highlightedIndex&&(e.setHighlightedIndex(h,{type:Je}),e.avoidScrolling=!0,e.internalSetTimeout(function(){return e.avoidScrolling=!1},250))}),onMouseDown:K(u,function(N){N.preventDefault()})},n[H]=K(M,function(){e.selectItemAtIndex(h,{type:rt})}),n),j=R.disabled?{onMouseDown:O.onMouseDown}:O;return D({id:e.getItemId(h),role:"option","aria-selected":e.getState().highlightedIndex===h},j,R)},e.clearItems=function(){e.items=[]},e.reset=function(i,n){i===void 0&&(i={}),i=le(i),e.internalSetState(function(o){var d=o.selectedItem;return D({isOpen:e.props.defaultIsOpen,highlightedIndex:e.props.defaultHighlightedIndex,inputValue:e.props.itemToString(d)},i)},n)},e.toggleMenu=function(i,n){i===void 0&&(i={}),i=le(i),e.internalSetState(function(o){var d=o.isOpen;return D({isOpen:!d},d&&{highlightedIndex:e.props.defaultHighlightedIndex},i)},function(){var o=e.getState(),d=o.isOpen,u=o.highlightedIndex;d&&e.getItemCount()>0&&typeof u=="number"&&e.setHighlightedIndex(u,i),Le(n)()})},e.openMenu=function(i){e.internalSetState({isOpen:!0},i)},e.closeMenu=function(i){e.internalSetState({isOpen:!1},i)},e.updateStatus=Me(function(){var i;if((i=e.props)!=null&&(i=i.environment)!=null&&i.document){var n=e.getState(),o=e.items[n.highlightedIndex],d=e.getItemCount(),u=e.props.getA11yStatusMessage(D({itemToString:e.props.itemToString,previousResultCount:e.previousResultCount,resultCount:d,highlightedItem:o},n));e.previousResultCount=d,Ye(u,e.props.environment.document)}},200);var a=e.props,p=a.defaultHighlightedIndex,g=a.initialHighlightedIndex,C=g===void 0?p:g,_=a.defaultIsOpen,b=a.initialIsOpen,P=b===void 0?_:b,y=a.initialInputValue,E=y===void 0?"":y,$=a.initialSelectedItem,F=$===void 0?null:$,A=e.getState({highlightedIndex:C,isOpen:P,inputValue:E,selectedItem:F});return A.selectedItem!=null&&e.props.initialInputValue===void 0&&(A.inputValue=e.props.itemToString(A.selectedItem)),e.state=A,e}yt(s,r);var l=s.prototype;return l.internalClearTimeouts=function(){this.timeoutIds.forEach(function(e){clearTimeout(e)}),this.timeoutIds=[]},l.getState=function(e){return e===void 0&&(e=this.state),$t(e,this.props)},l.getItemCount=function(){var e=this.items.length;return this.itemCount!=null?e=this.itemCount:this.props.itemCount!==void 0&&(e=this.props.itemCount),e},l.getItemNodeFromIndex=function(e){return this.props.environment?this.props.environment.document.getElementById(this.getItemId(e)):null},l.scrollHighlightedItemIntoView=function(){{var e=this.getItemNodeFromIndex(this.getState().highlightedIndex);this.props.scrollIntoView(e,this._menuNode)}},l.moveHighlightedIndex=function(e,a){var p=this.getItemCount(),g=this.getState(),C=g.highlightedIndex;if(p>0){var _=He(C,e,{length:p},this.isItemDisabled,!0);this.setHighlightedIndex(_,a)}},l.getStateAndHelpers=function(){var e=this.getState(),a=e.highlightedIndex,p=e.inputValue,g=e.selectedItem,C=e.isOpen,_=this.props.itemToString,b=this.id,P=this.getRootProps,y=this.getToggleButtonProps,E=this.getLabelProps,$=this.getMenuProps,F=this.getInputProps,A=this.getItemProps,i=this.openMenu,n=this.closeMenu,o=this.toggleMenu,d=this.selectItem,u=this.selectItemAtIndex,m=this.selectHighlightedItem,h=this.setHighlightedIndex,x=this.clearSelection,v=this.clearItems,R=this.reset,H=this.setItemCount,M=this.unsetItemCount,O=this.internalSetState;return{getRootProps:P,getToggleButtonProps:y,getLabelProps:E,getMenuProps:$,getInputProps:F,getItemProps:A,reset:R,openMenu:i,closeMenu:n,toggleMenu:o,selectItem:d,selectItemAtIndex:u,selectHighlightedItem:m,setHighlightedIndex:h,clearSelection:x,clearItems:v,setItemCount:H,unsetItemCount:M,setState:O,itemToString:_,id:b,highlightedIndex:a,inputValue:p,isOpen:C,selectedItem:g}},l.componentDidMount=function(){var e=this;if(!this.props.environment)this.cleanup=function(){e.internalClearTimeouts()};else{var a=function(){e.isMouseDown=!0},p=function(y){e.isMouseDown=!1;var E=Be(y.target,[e._rootNode,e._menuNode],e.props.environment);!E&&e.getState().isOpen&&e.reset({type:Ze},function(){return e.props.onOuterClick(e.getStateAndHelpers())})},g=function(){e.isTouchMove=!1},C=function(){e.isTouchMove=!0},_=function(y){var E=Be(y.target,[e._rootNode,e._menuNode],e.props.environment,!1);!e.isTouchMove&&!E&&e.getState().isOpen&&e.reset({type:dt},function(){return e.props.onOuterClick(e.getStateAndHelpers())})},b=this.props.environment;b.addEventListener("mousedown",a),b.addEventListener("mouseup",p),b.addEventListener("touchstart",g),b.addEventListener("touchmove",C),b.addEventListener("touchend",_),this.cleanup=function(){e.internalClearTimeouts(),e.updateStatus.cancel(),b.removeEventListener("mousedown",a),b.removeEventListener("mouseup",p),b.removeEventListener("touchstart",g),b.removeEventListener("touchmove",C),b.removeEventListener("touchend",_)}}},l.shouldScroll=function(e,a){var p=this.props.highlightedIndex===void 0?this.getState():this.props,g=p.highlightedIndex,C=a.highlightedIndex===void 0?e:a,_=C.highlightedIndex,b=g&&this.getState().isOpen&&!e.isOpen,P=g!==_;return b||P},l.componentDidUpdate=function(e,a){De(this.props,"selectedItem")&&this.props.selectedItemChanged(e.selectedItem,this.props.selectedItem)&&this.internalSetState({type:ut,inputValue:this.props.itemToString(this.props.selectedItem)}),!this.avoidScrolling&&this.shouldScroll(a,e)&&this.scrollHighlightedItemIntoView(),this.updateStatus()},l.componentWillUnmount=function(){this.cleanup()},l.render=function(){var e=Ne(this.props.children,k);this.clearItems(),this.getRootProps.called=!1,this.getRootProps.refKey=void 0,this.getRootProps.suppressRefError=void 0,this.getMenuProps.called=!1,this.getMenuProps.refKey=void 0,this.getMenuProps.suppressRefError=void 0,this.getLabelProps.called=!1,this.getInputProps.called=!1;var a=Ne(e(this.getStateAndHelpers()));if(!a)return null;if(this.getRootProps.called||this.props.suppressRefError)return a;if(Mt(a))return T.cloneElement(a,this.getRootProps(_t(a)))},s}(T.Component);return t.defaultProps={defaultHighlightedIndex:null,defaultIsOpen:!1,getA11yStatusMessage:Pt,itemToString:function(s){return s==null?"":String(s)},onStateChange:k,onInputValueChange:k,onUserAction:k,onChange:k,onSelect:k,onOuterClick:k,selectedItemChanged:function(s,l){return s!==l},environment:typeof window>"u"?void 0:window,stateReducer:function(s,l){return l},suppressRefError:!1,scrollIntoView:ze},t.stateChangeTypes=Lt,t}(),Wt=kt;function Ut(t,r){return r.changes}Me(function(t,r){Ye(t,r)},200);var z={itemToString:function(r){return r?String(r):""},itemToKey:function(r){return r},stateReducer:Ut,scrollIntoView:ze,environment:typeof window>"u"?void 0:window},de={environment:f.shape({addEventListener:f.func.isRequired,removeEventListener:f.func.isRequired,document:f.shape({createElement:f.func.isRequired,getElementById:f.func.isRequired,activeElement:f.any.isRequired,body:f.any.isRequired}).isRequired,Node:f.func.isRequired}),itemToString:f.func,itemToKey:f.func,stateReducer:f.func},ct=D({},de,{getA11yStatusMessage:f.func,highlightedIndex:f.number,defaultHighlightedIndex:f.number,initialHighlightedIndex:f.number,isOpen:f.bool,defaultIsOpen:f.bool,initialIsOpen:f.bool,selectedItem:f.any,initialSelectedItem:f.any,defaultSelectedItem:f.any,id:f.string,labelId:f.string,menuId:f.string,getItemId:f.func,toggleButtonId:f.string,onSelectedItemChange:f.func,onHighlightedIndexChange:f.func,onStateChange:f.func,onIsOpenChange:f.func,scrollIntoView:f.func});U(U({},ct),{items:f.array.isRequired,isItemDisabled:f.func});U(U({},z),{isItemDisabled:function(){return!1}});D({},ct,{items:f.array.isRequired,isItemDisabled:f.func,inputValue:f.string,defaultInputValue:f.string,initialInputValue:f.string,inputId:f.string,onInputValueChange:f.func});D({},z,{isItemDisabled:function(){return!1}});de.stateReducer,de.itemToKey,de.environment,f.array,f.array,f.array,f.func,f.number,f.number,f.number,f.func,f.func,f.string,f.string;z.itemToKey,z.stateReducer,z.environment;function qt({items:t=[],label:r,placeholder:s=null,onChange:l,onFocus:c}){const e=T.useRef(null),[a,p]=T.useState(!1);T.useEffect(()=>{e.current&&setTimeout(()=>{p(!0)},0)},[e.current]);const[g,C]=T.useState(!1),_=y=>{C(!1),c&&c(y),setTimeout(()=>C(!0),1)},b=y=>{C(!1)},P=y=>{console.log(y),l&&l(y)};return I.jsx(Wt,{onChange:P,itemToString:y=>y?(y==null?void 0:y.label)||y.value:"",children:({getInputProps:y,getItemProps:E,getLabelProps:$,getMenuProps:F,isOpen:A,inputValue:i,highlightedIndex:n,selectedItem:o,getRootProps:d})=>I.jsxs("div",{ref:e,className:`Combobox ${a?"init":""} ${g?"open":""}`,children:[I.jsxs("label",{...$(),children:[r,I.jsx("div",{className:"input-wrapper",...d({},{suppressRefError:!0}),children:I.jsx("input",{...y(),placeholder:s,onFocus:_,onClick:_,onBlur:b})})]}),I.jsx("ul",{className:`results ${g?"open":""}`,...F(),children:t.length&&g?t.filter(u=>!i||((u==null?void 0:u.label)||u.value).toLowerCase().includes(i.toLowerCase())).map((u,m)=>I.jsx("li",{className:`item ${n===m?"highlighted":""}`,...E({index:m,item:u,style:{fontWeight:o===u?"bold":"normal"}}),children:(u==null?void 0:u.label)||u.value},(u==null?void 0:u.label)||u.value)):null})]})})}function Oe(){const t={loading:!1,error:null,data:null},r=(e,a)=>{switch(a.type){case W.FETCH_START:return{...e,loading:!0,error:null};case W.FETCH_SUCCESS:return{...e,loading:!1,data:a.payload};case W.FETCH_FAILURE:return{...e,loading:!1,error:a.payload};default:return e}},[s,l]=T.useReducer(r,t);return{state:s,get:async e=>{l({type:W.FETCH_START});try{const a=await axios(e);return l({type:W.FETCH_SUCCESS,payload:a.data}),a}catch(a){return l({type:W.FETCH_FAILURE,payload:a.message}),a}}}}const W={FETCH_START:"FETCH_START",FETCH_SUCCESS:"FETCH_SUCCESS",FETCH_FAILURE:"FETCH_FAILURE"};function rn(){const[t,r]=T.useState(null),[s,l]=T.useState(null),[c,e]=T.useState([]),[a,p]=T.useState(null),[g,C]=T.useState(null),_=ft(),b=T.useRef(null),P=Oe(),y=Oe(),E=Oe();T.useEffect(()=>{_.set("settings",n=>n.landingPage="home")},[]),T.useEffect(()=>{P.get("/api/fishes").then(n=>r(n.data.fishes)),y.get("/api/locations").then(n=>l(n.data.locations))},[]),T.useEffect(()=>{if(b.current&&P.state.data){const n=_.get("settings",o=>o.selectedFish);n&&(p(n),b.current.querySelector(`[data-id="${n}"]`).scrollIntoView({behavior:"smooth",inline:"center"}))}},[b.current,P.state.data]);const $=n=>{let o;a===n?o=null:o=n,_.set("settings",d=>d.selectedFish=o),p(o)},F=n=>{C(n)};T.useEffect(()=>{var n;if(g){e([]);let o="/api/fishByLocation/"+g.value.locationId;o+="/"+(((n=g.value)==null?void 0:n.waterId)??0),o+="/"+(a??0),E.get(o).then(d=>{e(d.data.limits)})}},[g,a]);const A=n=>{const o=n.target,d=o.closest(".Combobox");d.addEventListener("transitionstart",()=>d.addEventListener("transitionend",()=>{var u;return(u=o.parentElement)==null?void 0:u.scrollIntoView({behavior:"smooth",block:"start"})},{once:!0}),{once:!0})},i=n=>I.jsx(I.Fragment,{children:n.split("/").map(o=>I.jsx("span",{children:o}))});return I.jsxs(ht,{className:`Home ${g?"location-selected":""}`,children:[I.jsx("header",{children:I.jsx(gt,{children:I.jsxs("h1",{className:"hero",children:["Smart ",I.jsx("span",{children:"Fish"})]})})}),I.jsxs("main",{children:[t!==null&&s!==null&&I.jsxs("div",{className:"layout",children:[I.jsx("div",{className:"header",children:g&&I.jsxs("button",{onClick:()=>C(null),className:"selected-location flex items-center gap-2",children:[I.jsx("strong",{children:i(g.label)}),I.jsx(It,{className:"w-5 h-5"})]})}),I.jsx("div",{className:"body",children:g?I.jsx(mt,{limits:c,fishes:t}):I.jsx(qt,{items:Object.keys(s).map(n=>({value:s[n],label:n})),onChange:F,onFocus:A,placeholder:"Search by river, lake or region"})})]}),I.jsx("div",{className:"logo",children:I.jsx("img",{src:"/images/logo.png"})})]}),I.jsx("footer",{children:I.jsx("div",{className:"fishes",ref:b,children:(t||[]).map(n=>I.jsxs("button",{"data-id":n.id,className:`fish ${a===n.id?"selected":""}`,onClick:()=>$(n.id),children:[I.jsx("img",{src:"/images/fish-shadow.png"}),I.jsx("div",{className:"name",children:n.name})]},n.name))})})]})}export{rn as default};
