const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rp=n=>"Rp"+n.toLocaleString("id-ID");
const C=["#2a3cff","#ff5a7a","#10a58a","#f2a516","#7a4dff","#18255f"];
const S={
h:'<path d="M26 74V62a34 34 0 0 1 68 0v12" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><rect x="15" y="68" width="22" height="36" rx="10" fill="#fff"/><rect x="83" y="68" width="22" height="36" rx="10" fill="#fff"/>',
e:'<g fill="#fff"><circle cx="38" cy="46" r="15"/><rect x="44" y="50" width="9" height="40" rx="4.5"/><circle cx="82" cy="46" r="15"/><rect x="67" y="50" width="9" height="40" rx="4.5"/></g>',
s:'<rect x="28" y="12" width="64" height="96" rx="14" fill="#fff"/><circle cx="60" cy="36" r="9" fill="currentColor"/><circle cx="60" cy="76" r="20" fill="currentColor"/><circle cx="60" cy="76" r="7" fill="#fff"/>',
o:'<path d="M28 28c-10 34 4 66 32 66s42-32 32-66" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="28" cy="28" r="11" fill="#fff"/><circle cx="92" cy="28" r="11" fill="#fff"/>'};
const CAT={h:"Headphones",e:"Earbuds",s:"Speakers",o:"Open-ear"};
const P=[
["Core One ANC","h",1490000,1890000,4.8],["Studio Lite","h",649000,0,4.4],["Bass Run Headset","h",429000,0,4.2],
["Pod Z2","e",349000,449000,4.6],["Pod Pro ANC","e",899000,0,4.7],["Pod Mini","e",199000,0,4.3],
["Boom Box Pro","s",699000,999000,4.5],["Pocket Cube","s",249000,0,4.4],["Room Tower","s",1299000,0,4.9],
["AirFlow Open-Ear","o",549000,0,4.7],["Rock Open-Ear","o",729000,0,4.5],["OpenBeat ENC","o",599000,749000,4.4]
].map((a,i)=>({id:i,name:a[0],cat:a[1],price:a[2],old:a[3],r:a[4],c:C[i%6]}));

const card=p=>`<article class="card"><div class="art" style="background:${p.c}"><svg viewBox="0 0 120 120" style="color:${p.c}" aria-hidden="true">${S[p.cat]}</svg>${p.old?`<span class="tag">-${Math.round(100-p.price/p.old*100)}%</span>`:""}</div><div class="info"><h3>${p.name}</h3><div class="meta">★ ${p.r} &nbsp; ${CAT[p.cat]}</div><div class="row"><div class="price">${rp(p.price)}${p.old?`<s>${rp(p.old)}</s>`:""}</div><button class="btn" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add</button></div></div></article>`;
$("#top").innerHTML=[0,4,6,9].map(i=>card(P[i])).join("");
let cat="all";
const shop=()=>{$("#grid").innerHTML=P.filter(p=>cat==="all"||p.cat===cat).map(card).join("")};shop();
$("#chips").onclick=e=>{const b=e.target.closest("button");if(!b)return;cat=b.dataset.c;$$("#chips button").forEach(x=>x.setAttribute("aria-pressed",x===b));shop()};

const cart={};
function paint(){
  const ids=Object.keys(cart).filter(i=>cart[i]>0);
  $("#count").textContent=ids.reduce((s,i)=>s+cart[i],0);
  $("#lines").innerHTML=ids.length?ids.map(i=>`<li><div><b>${P[i].name}</b><br>${rp(P[i].price)}</div><div class="qty"><button data-q="${i}" data-d="-1" aria-label="Remove one">−</button>${cart[i]}<button data-q="${i}" data-d="1" aria-label="Add one">+</button></div></li>`).join(""):"<li>Your cart is empty. Add something from Products.</li>";
  $("#total").textContent=rp(ids.reduce((s,i)=>s+P[i].price*cart[i],0));
}
function drawer(o){$("#cart").classList.toggle("open",o);$("#cart").inert=!o;$("#scrim").classList.toggle("on",o);if(o)$("#close").focus();else $("#open").focus()}
document.addEventListener("click",e=>{
  const a=e.target.closest("[data-add]"),q=e.target.closest("[data-q]");
  if(a){cart[a.dataset.add]=(cart[a.dataset.add]||0)+1;paint()}
  if(q){cart[q.dataset.q]+=+q.dataset.d;paint()}
});
$("#open").onclick=()=>drawer(true);$("#close").onclick=$("#scrim").onclick=()=>drawer(false);
document.addEventListener("keydown",e=>{if(e.key==="Escape")drawer(false)});
$("#pay").onclick=()=>{$("#note").textContent=$("#count").textContent==="0"?"Add a product first.":"This is a demo store, so checkout is not connected yet."};
paint();

const PAGES=["home","products","about","deals","membership"];
function route(){
  const h=location.hash.slice(1),pg=PAGES.includes(h)?h:"home";
  $$("[data-page]").forEach(s=>s.classList.toggle("on",s.dataset.page===pg));
  $$("nav a").forEach(a=>a.setAttribute("aria-current",a.hash==="#"+pg?"page":"false"));
  document.title=(pg==="home"?"":pg[0].toUpperCase()+pg.slice(1)+" – ")+"Noisecore";
  scrollTo(0,0);
}
addEventListener("hashchange",route);route();

$("#mf").onsubmit=e=>{
  e.preventDefault();
  const v=id=>$("#"+id).value.trim();
  const rules=[
    ["name",v("name").length>=3,"Enter your name (at least 3 characters)."],
    ["email",/^\S+@\S+\.\S+$/.test(v("email")),"Enter a valid email, like nama@mail.com."],
    ["dob",v("dob")&&new Date(v("dob"))<new Date(),"Enter your date of birth."],
    ["password",/^(?=.*\d).{8,}$/.test($("#password").value),"Password needs 8+ characters and at least one number."],
    ["terms",$("#terms").checked,"Accept the terms and conditions to continue."]
  ];
  const bad=rules.find(r=>!r[1]);
  $("#err").textContent=bad?bad[2]:"";
  if(bad){$("#"+bad[0]).focus();return}
  $("#okname").textContent=v("name");$("#mf").hidden=true;$("#ok").hidden=false;
};

const cv=$("#wave"),cx=cv.getContext("2d"),rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
let noise=1,target=1,t=0;
$("#anc").onclick=function(){const on=target===1;target=on?0:1;this.setAttribute("aria-pressed",on);this.textContent="Noise cancelling: "+(on?"on":"off")};
function draw(){
  requestAnimationFrame(draw);
  if(!cv.offsetParent)return;
  const d=devicePixelRatio||1,w=cv.width=cv.clientWidth*d,h=cv.height=cv.clientHeight*d;
  noise+=(target-noise)*.06;if(!rm)t+=.02;
  cx.clearRect(0,0,w,h);
  for(let k=0;k<4;k++){
    cx.beginPath();
    for(let x=0;x<=w;x+=6){
      const u=x/w,base=h*.5+Math.sin(u*9+t)*h*.12;
      const n=(Math.sin(u*40+t*3+k*2)+Math.sin(u*97-t*5+k)+Math.sin(u*23+t*7-k))*h*.06*noise;
      cx.lineTo(x,k===3?base:base+n*(k+1)/2);
    }
    cx.strokeStyle=k===3?"#ff5a7a":"rgba(255,255,255,.28)";cx.lineWidth=(k===3?5:2)*d;cx.stroke();
  }
}
draw();
