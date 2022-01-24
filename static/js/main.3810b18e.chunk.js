(this["webpackJsonpthemed-demo-app"]=this["webpackJsonpthemed-demo-app"]||[]).push([[0],{306:function(e,t,n){e.exports=n(388)},336:function(e,t){},387:function(e,t,n){},388:function(e,t,n){"use strict";n.r(t);var a=n(32),o=n.n(a),r=n(43),c=n(0),l=n.n(c),i=n(54),u=n.n(i),m=n(55),d=n(12),s=n(28),f=n(42),b=n(271),g=n(14),p=n(4),h=n(262),E=n(265),v=n(123),O=n(270),S=n(76),j=n(264),x=n(79);x.ApiClient.instance.authentications.ApiKey.apiKey="api-87c1c819-b350-4968-8205-c858f0eaa39d",x.ApiClient.instance.defaultHeaders={};var y=new x.FeatureFlagsApi,k="production",C="leon-demo-project",F=[],A={getDemoThemeVariations:function(){return new Promise((function(e,t){F.length>0&&e(F),y.getFeatureFlag(C,"demoTheme",{env:k},(function(n,a,o){n&&(console.error("error fetching theme list",n),t()),F=a?a.variations:[],e(F)}))}))},updateDemoThemeFallthrough:function(e){return new Promise((function(t,n){var a=F.findIndex((function(t){return t.name==e}));a>-1&&y.patchFeatureFlag(C,"demoTheme",{patch:[{op:"replace",path:"/environments/".concat(k,"/fallthrough"),value:{variation:a}}]},(function(e,a,o){e&&(console.error("Error updating demoTheme flag fallthrough",e),n()),t()}))}))},getDemoSoundFlag:function(){return new Promise((function(e,t){y.getFeatureFlag(C,"demoSoundEnabled",{env:k},(function(n,a,o){n&&(console.error("error getting demoSoundEnabled flag",n),t()),e(a)}))}))},toggleDemoSoundFlag:function(e){return new Promise((function(t,n){A.patchFeatureFlag(C,"demoSoundEnabled",{patch:[{op:"replace",path:"/environments/".concat(k,"/on"),value:e}]},(function(e,a,o){e&&(console.error("Error toggling demoSoundEnabled flag",e),n()),t()}))}))},setSoundFlagSelectionTarget:function(e){return new Promise((function(t,n){y.patchFeatureFlag(C,"demoSoundEnabled",{patch:[{op:"replace",path:"/environments/".concat(k,"/rules/0/clauses/0/values"),value:[e]}]},(function(e,a,o){e&&(console.error("Error updating demoSoundEnabled flag card targeting",e),n()),t()}))}))},setSoundFlagSuitTarget:function(e){return new Promise((function(t,n){y.patchFeatureFlag(C,"demoSoundEnabled",{patch:[{op:"replace",path:"/environments/".concat(k,"/rules/1/clauses/0/values"),value:[e]}]},(function(e,a,o){e&&(console.error("Error updating demoSoundEnabled flag suit targeting",e),n()),t()}))}))}},w=A;function T(){var e,t,n=Object(c.useContext)(B),a=n.context,o=n.setContext,r=Object(g.c)(),i=r.isOpen,u=r.onOpen,m=r.onClose,f=Object(c.useState)(a.NOP),p=Object(s.a)(f,2),E=p[0],v=p[1],x=Object(c.useState)(a.NOP),y=Object(s.a)(x,2),k=y[0],C=y[1],F=Object(c.useRef)(),A=(Object(c.useRef)([]),Object(c.useRef)([])),T=Object(c.useRef)([]);return Object(c.useEffect)((function(){w.getDemoThemeVariations().then((function(e){return T.current=e})),w.getDemoSoundFlag().then((function(e){return function(e){var t,n,a="production",o=e.environments[a].rules.find((function(e){return"Selection"==e.description})),r=e.environments[a].rules.find((function(e){return"Card"==e.description})),c=null===(t=o.clauses.find((function(e){return"selection"==e.attribute})))||void 0===t?void 0:t.values[0],l=null===(n=r.clauses.find((function(e){return"suit"==e.attribute})))||void 0===n?void 0:n.values[0];v(c),C(l)}(e)})),A.current=["DIAMONDS","CLUBS","SPADES","HEARTS"]}),[]),l.a.createElement(l.a.Fragment,null,l.a.createElement(h.a,{ref:F,onClick:u},"Settings"),l.a.createElement(O.a,{isOpen:i,placement:"right",onClose:m,finalFocusRef:F},l.a.createElement(O.f,null),l.a.createElement(O.d,null,l.a.createElement(O.c,null),l.a.createElement(O.e,{borderBottomWidth:"1px"},"Settings"),l.a.createElement(O.b,null,(null===(e=a.items)||void 0===e?void 0:e.length)>0&&l.a.createElement(l.a.Fragment,null,l.a.createElement(S.b,{fontWeight:"bold"},"Item Selection"),l.a.createElement(j.a,{onChange:function(e){var t=e.target.value,n=a.ldClient.getUser();a.ldClient.identify(Object(d.a)(Object(d.a)({},n),{},{custom:Object(d.a)(Object(d.a)({},n.custom),{},{selection:t})})),o((function(e){return Object(d.a)(Object(d.a)({},e),{},{selectedItem:t})}))},value:a.selectedItem},l.a.createElement("option",{value:a.NOP},"Select a ",a.itemType),a.items.map((function(e){return l.a.createElement("option",{key:e.name,value:e.name},e.name)})))),a.demoAdmin&&l.a.createElement(l.a.Fragment,null,l.a.createElement(S.a,{mt:4,borderRadius:"md",borderWidth:1,p:3},l.a.createElement(S.b,{fontWeight:"bold",borderBottomWidth:1,pb:3},"Admin Settings"),l.a.createElement(b.g,{spacing:"24px"},T.current&&l.a.createElement(b.a,null,l.a.createElement(S.b,{fontWeight:"bold"},"App Theme"),l.a.createElement(j.a,{onChange:function(e){var t=e.target.value;w.updateDemoThemeFallthrough(t),o((function(e){return Object(d.a)(Object(d.a)({},e),{},{theme:t})}))},value:a.theme},T.current.map((function(e){return l.a.createElement("option",{key:e.name,value:e.name},e.name)})))),l.a.createElement(b.a,null,l.a.createElement(S.b,{fontWeight:"bold",borderBottomWidth:1,pb:3},"Targeting"),(null===(t=a.items)||void 0===t?void 0:t.length)>0&&l.a.createElement(l.a.Fragment,null,l.a.createElement(S.b,{fontWeight:"bold",textTransform:"capitalize"},a.itemType),l.a.createElement(j.a,{mb:3,onChange:function(e){var t=e.target.value;v(t),w.setSoundFlagSelectionTarget(t)},value:E,borderBottomWidth:1},l.a.createElement("option",{value:a.NOP},"Select a ",a.itemType),a.items.map((function(e){return l.a.createElement("option",{key:e.name,value:e.name},e.name)})))),l.a.createElement(S.b,{fontWeight:"bold"},"Suit"),l.a.createElement(j.a,{mb:3,value:k,borderBottomWidth:1,onChange:function(e){var t=e.target.value;console.log("suit selection changed",t),C(t),w.setSoundFlagSuitTarget(t)}},l.a.createElement("option",{value:a.NOP},"Select a suit"),A.current.map((function(e){return l.a.createElement("option",{key:e,value:e},e)})))))))))))}function I(e){return l.a.createElement("div",{style:{position:"fixed",zIndex:"999",top:"0px",left:"0px",width:"100%",height:"100%",color:"#ffffff",backgroundColor:e.server?"#FF0000":"#0000AA",fontFamily:"'Courier New', 'Courier New', Monaco, monospace"}},l.a.createElement("div",{style:{position:"absolute",left:"50%",top:"50%",fontSize:"14px",margin:"0",transform:"translateX(-50%) translateY(-50%)",maxWidth:"420px"}},l.a.createElement("div",{style:{textAlign:"center",marginBottom:"10px"}},l.a.createElement("span",{style:{margin:"auto",fontWeight:"bolder",fontSize:"18px"}},"LaunchDarkly")),l.a.createElement("div",null,"A problem has been detected with this application and it  has been shut down to prevent damage to your device.",l.a.createElement("br",null),l.a.createElement("br",null),"If this is the first time you've seen this, consider yourself lucky.",l.a.createElement("br",null),l.a.createElement("br",null),"If problems continue, you need LaunchDarkly feature flagging in your application ASAP.",l.a.createElement("br",null),l.a.createElement("br",null),"Technical Information: ",l.a.createElement("br",null),"*** STOP: (0xRELEASFEATURESWITHFLAGS, 0xSEPARATEDEPLOYFROMRELEASE)")))}function D(){var e,t,n=Object(g.c)(),a=n.isOpen,o=n.onOpen,r=n.onClose,i=Object(c.useContext)(B).context,u=Object(c.useState)(!1),m=Object(s.a)(u,2),d=m[0],f=m[1];function O(){f(i.demoBroken)}return l.a.createElement(l.a.Fragment,null,i.demoServerBroken&&l.a.createElement("div",null,l.a.createElement(I,{server:"true"})),d&&l.a.createElement("div",{onClick:function(e){f(!1)}},l.a.createElement(I,null)),l.a.createElement(p.d.header,{px:2,w:"full",textAlign:"center",justifyContent:"center"},l.a.createElement(b.c,{h:16,alignItems:"center",justifyContent:"space-between",textAlign:"center"},i.navLinks&&l.a.createElement(h.b,{size:"md",icon:a?l.a.createElement(v.a,null):l.a.createElement(v.b,null),"aria-label":"Open Menu",display:{md:"none"},onClick:a?r:o}),l.a.createElement(b.c,null,l.a.createElement(p.d.h1,{display:"flex",alignItems:"center",fontSize:"xl",fontWeight:"medium"},"LaunchDarkly")),l.a.createElement(b.d,{spacing:3,alignItems:"center",display:"flex"},l.a.createElement(b.d,{as:"nav",spacing:1,display:{base:"none",md:"flex"}},null===(e=i.navLinks)||void 0===e?void 0:e.map((function(e,t){return l.a.createElement(b.f,Object.assign({},0===t&&{onClick:O},{key:e,px:2,py:1,rounded:"md",_hover:{textDecoration:"none"},href:"#"}),e)}))),l.a.createElement(T,null),l.a.createElement(E.a,{htmlHeight:52,htmlWidth:38,src:i.avatar}))),a&&l.a.createElement(b.a,{pb:4,display:{md:"none"}},l.a.createElement(b.g,{as:"nav",spacing:4},null===(t=i.navLinks)||void 0===t?void 0:t.map((function(e,t){return l.a.createElement(b.f,Object.assign({},0===t&&{onClick:O},{key:e,px:2,py:1,rounded:"md",_hover:{textDecoration:"none"},href:"#"}),e)}))))))}var P=n(273),W=n.n(P);function R(){var e=Object(c.useContext)(B).context,t=Object(c.useState)(!1),n=Object(s.a)(t,2),a=n[0],o=n[1],r=Object(c.useRef)(new Audio),i=!0===e.soundEnabled&&e.clickSound.length>0;return Object(c.useEffect)((function(){i&&(r.current=new Audio(e.clickSound),r.current.addEventListener("ended",(function(){r.current.currentTime=0,o(!1)})))}),[e.soundEnabled,e.clickSound]),l.a.createElement(b.a,{textAlign:"center"},l.a.createElement(b.b,{bg:"brand.title_bg1",h:{base:"40px",md:"60px"}},l.a.createElement(p.d.h1,{fontWeight:"medium",color:"brand.title",fontSize:{base:30,md:50}},"Welcome to the ",e.soundEnabled)),l.a.createElement(b.c,{className:"heroSection",bgPosition:"center",bgRepeat:"no-repeat",bgSize:"cover",justify:"center",bgImage:e.heroImage,h:{base:"100px",md:"200px",lg:"300px"}},l.a.createElement(b.b,null,l.a.createElement(b.e,{className:"themeName",fontSize:{base:80,md:100,lg:180},letterSpacing:"tighter",fontWeight:{base:"bold",md:"extrabold "},fontStyle:"italic",color:"brand.title"},e.theme))),l.a.createElement(b.b,{bg:"brand.title_bg2",h:{base:"40px",md:"60px"},p:"6"},l.a.createElement(b.e,{fontSize:{base:30,md:50},color:"brand.title"},"Demo App!")),e.showQRCode&&l.a.createElement(b.b,{margin:3},l.a.createElement(W.a,{value:"https://cleon.github.io/themed-demo-app/"})),l.a.createElement(b.b,null,l.a.createElement(E.a,Object.assign({mt:3,height:"auto",p:0,mb:0,maxWidth:{base:"40%",md:"60%"},src:e.selectedItem!=e.NOP?e.items.find((function(t){return t.name===e.selectedItem})).image:e.defaultItemImage},i&&{onClick:function(){console.log("canPlaySound",i),i&&4===r.current.readyState&&(a||(r.current.play(),o(!0)))},cursor:"pointer"}))),i&&l.a.createElement(b.b,null,l.a.createElement(p.d.span,{lineHeight:1,fontSize:{base:20,md:30}},"Click me!")))}n(387);var B=Object(c.createContext)();var L=Object(m.withLDConsumer)()((function(e){var t=e.ldClient,n={theme:"Default",themeStyle:{colors:{brand:{title:"#ebff38",title_bg1:"#282828",title_bg2:"#1E1E1E"}},fonts:{}},heroImage:"themes/default/hero.webp",navLinks:[],itemType:"",clickSound:"themes/default/sound.mp3",defaultItemImage:"themes/default/default.png",items:[]},a=Object(m.useFlags)(),i=a.demoTheme,u=a.demoSoundEnabled,g=a.demoQRCode,p=a.demoAdmin,h=a.demoBroken,E=a.demoServerBroken,v=Object(c.useState)(n),O=Object(s.a)(v,2),S=O[0],j=O[1],x=Object(c.useState)(),y=Object(s.a)(x,2),k=y[0],C=y[1],F=Object(c.useRef)([]);function A(){return(A=Object(r.a)(o.a.mark((function e(a){var r,c,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n,!(c=F.current.find((function(e){return e.theme===a})))){e.next=6;break}r=c,e.next=14;break;case 6:if("Default"==a){e.next=13;break}return e.next=9,fetch("themes/".concat(i,"/theme.json"));case 9:return l=e.sent,e.next=12,l.json();case 12:r=e.sent;case 13:F.current.push(r);case 14:r=Object(d.a)(Object(d.a)({},r),{},{ldClient:t,avatar:t.getUser().avatar,soundEnabled:u,showQRCode:g,demoAdmin:p,selectedItem:"DEFAULT",NOP:"DEFAULT"}),C(Object(f.b)(r.themeStyle)),j((function(e){return Object(d.a)(Object(d.a)({},e),r)}));case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(c.useEffect)((function(){console.log("demoTheme flag changed",i),function(e){A.apply(this,arguments)}(i)}),[i]),Object(c.useEffect)((function(){console.log("showQRCode flag changed",g),j((function(e){return Object(d.a)(Object(d.a)({},e),{},{showQRCode:g})}))}),[g]),Object(c.useEffect)((function(){console.log("demoSoundEnabled flag changed",u),j((function(e){return Object(d.a)(Object(d.a)({},e),{},{soundEnabled:u})}))}),[u]),Object(c.useEffect)((function(){console.log("demoadmin flag changed",p),j((function(e){return Object(d.a)(Object(d.a)({},e),{},{demoAdmin:p})}))}),[p]),Object(c.useEffect)((function(){console.log("demoBroken flag changed",h),j((function(e){return Object(d.a)(Object(d.a)({},e),{},{demoBroken:h})}))}),[h]),Object(c.useEffect)((function(){console.log("demoServerBroken flag changed",E),j((function(e){return Object(d.a)(Object(d.a)({},e),{},{demoServerBroken:E})}))}),[E]),Object(c.useEffect)((function(){}),[S.theme]),Object(c.useEffect)((function(){}),[S.selectedItem]),l.a.createElement(f.a,{theme:k},l.a.createElement(B.Provider,{value:{context:S,setContext:j}},l.a.createElement(b.c,{direction:"column",w:"100%",m:"0 auto"},l.a.createElement(D,null),l.a.createElement(R,null))))}));Object(r.a)(o.a.mark((function e(){var t,n,a,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,a=n.cards[0],e.next=9,Object(m.asyncWithLDProvider)({clientSideID:"60d1cf33e50e740da22ac527",reactOptions:{useCamelCaseFlagKeys:!1},user:{key:a.code,avatar:a.image,custom:{card:a.code,suit:a.suit,face:a.value}},flags:{demoTheme:"Default",demoSoundEnabled:!1,demoQRCode:!1,demoAdmin:!1,demoBroken:!1,demoServerBroken:!1}});case 9:r=e.sent,u.a.render(l.a.createElement(r,null,l.a.createElement(L,null)),document.getElementById("root"));case 11:case"end":return e.stop()}}),e)})))()}},[[306,1,2]]]);
//# sourceMappingURL=main.3810b18e.chunk.js.map