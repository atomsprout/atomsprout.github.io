import{c as v,n as k,g as $,f as C}from"../assets/renderer-B5cvKkH_.js";const E=[{name:"Reading habit",family:"small",label:"Reading habit · sample check-ins",source:t=>`const accent = "${t}";
const days = Array.from({ length: 49 }, (_, i) => i % 5 !== 1 || i >= 37);
$render(
  <vstack spacing="8" padding="14" frame="max" background="#f1f8f4">
    <text font="headline">Read every day</text>
    <hstack spacing="3">
      {Array.from({ length: 7 }, (_, week) => <vstack spacing="3">
        {days.slice(week * 7, week * 7 + 7).map(done =>
          <rect frame="14,8" corner="2" color={done ? accent : "#dfe8e2"} />)}
      </vstack>)}
    </hstack>
    <text font="caption" color={accent}>12 day streak</text>
  </vstack>
);`},{name:"Weather",family:"small",label:"Weather · sample forecast",source:t=>`const accent = "${t}";
const forecast = { city: "London", temperature: "18°" };
$render(
  <vstack alignment="leading" spacing="8" padding="18" frame="max" background="#f1f8f4">
    <text font="caption" color={accent}>{forecast.city}</text>
    <icon systemName="cloud.sun.fill" size="28" color={accent} />
    <text font="largeTitle">{forecast.temperature}</text>
    <text font="caption">Partly cloudy</text>
  </vstack>
);`},{name:"Countdown",family:"small",label:"Countdown · sample event",source:t=>`const accent = "${t}";
const trip = { name: "Next adventure", days: 18 };
$render(
  <vstack alignment="leading" spacing="8" padding="18" frame="max" background="#f1f8f4">
    <icon systemName="airplane" size="24" color={accent} />
    <spacer />
    <text font="largeTitle" color={accent}>{trip.days} days</text>
    <text font="caption">{trip.name}</text>
  </vstack>
);`}],p=["#258557","#5468cf","#bd6633"],m=document.getElementById("hero-source"),i=document.getElementById("hero-preview"),g=document.getElementById("hero-status"),N=document.getElementById("hero-open"),h=new URL("studio/",document.baseURI);let y=0,f=0,d=0;const b=v({sandboxURL:new URL("sandbox.html",h),assetBaseURL:new URL("runtime/",h),startupTimeoutMilliseconds:1e4});function A(t){m.replaceChildren();const n=/("[^"\n]*"|\b(?:const|true|false)\b|\$render|<\/?[a-z]+|\b\d+\b)/g;let a=0;for(const c of t.matchAll(n)){m.append(document.createTextNode(t.slice(a,c.index)));const r=c[0],e=document.createElement(r===`"${p[f]}"`?"button":"span");e.textContent=r,e.className=r.startsWith('"')?"syntax-string":"syntax-keyword",e.tagName==="BUTTON"&&(e.type="button",e.className+=" theme-token",e.style.setProperty("--swatch",p[f]),e.setAttribute("aria-label","Change widget color"),e.addEventListener("click",()=>{f=(f+1)%p.length,x(!0)})),m.append(e),a=c.index+r.length}m.append(document.createTextNode(t.slice(a)))}async function x(t=!1){const n=++d,a=E[y],c=a.source(p[f]);A(c),t&&m.querySelector("button").focus({preventScroll:!0}),document.querySelectorAll("[data-hero-example]").forEach((s,o)=>{s.setAttribute("aria-pressed",String(o===y))});const r=k(`Homepage ${a.name}`,c),e=$(r);if(e.error)throw new Error(e.error);const w=btoa(String.fromCharCode(...e.bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");N.href=`${h}#sw-preview=v1.${w}`,g.textContent="Rendering JSX…",i.setAttribute("aria-busy","true");try{await b.ready;const s=await b.execute({files:r,manifest:e.manifest,environments:{"widget-size":a.family}});if(n!==d)return;if(s.error||!s.tree)throw new Error(s.error?.message??"No widget output.");const o=await C(s.tree,{family:a.family,profile:"iphone-393",appearance:"light"});if(n!==d)return;const u=a.family==="medium"?.61:1,l=document.createElement("div");l.className="hero-widget-frame",l.style.width=`${o.size.width*u}px`,l.style.height=`${o.size.height*u}px`,o.element.style.transformOrigin="top left",o.element.style.transform=`scale(${u})`,l.append(o.element),i.replaceChildren(l),i.setAttribute("aria-label",a.label),i.dataset.example=a.name,g.textContent=a.label}catch{if(n!==d)return;i.textContent="Preview unavailable. Open this example in Web Studio to try it.",g.textContent="The browser could not render the preview."}finally{n===d&&i.setAttribute("aria-busy","false")}}document.querySelectorAll("[data-hero-example]").forEach((t,n)=>{t.addEventListener("click",()=>{y=n,x()})});x();
