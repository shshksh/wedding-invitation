const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const p2=n=>String(n).padStart(2,'0'),WD=['일','월','화','수','목','금','토'];
const D=new Date(C.date),Y=D.getFullYear(),M=D.getMonth(),h=D.getHours();
const ds=`${Y}년 ${M+1}월 ${D.getDate()}일`,ts=`${h<12?'오전':'오후'} ${h%12||12}:${p2(D.getMinutes())}`;
C.dt={short:`${ds} ${ts}`,long:`${ds} ${WD[D.getDay()]}요일 ${ts}`,vol:`VOL. ${String(Y).slice(2)} — NO. ${p2(M+1)}`,code:`${String(Y).slice(2)} ${p2(M+1)} ${p2(D.getDate())}`,ym:`${Y}. ${p2(M+1)}`};
$$('[data-t]').forEach(e=>e.textContent=e.dataset.t.split('.').reduce((o,k)=>o[k],C));
if(C.hero)$('.hero').style.setProperty('--photo',`url('${new URL(C.hero,location.href).href}')`);
if(C.map){const m=$('.map');m.style.background=`url('${C.map}') center/cover`;m.innerHTML=''}
$$('.pp').forEach((e,i)=>{const u=[C.groom,C.bride][i].photo;if(u)e.style.background=`url('${u}') center/cover`});
$$('[data-tel]').forEach(a=>a.href='tel:'+C[a.dataset.tel].tel);
$('#nv').href=C.links.naver;$('#kk').href=C.links.kakao;

/* 바코드 */
let sd=(D.getTime()/6e4|0)%2147483646+1,bx=0,k=0,br='';const rnd=()=>(sd=sd*16807%2147483647)/2147483647;
while(bx<100){const w=1+(rnd()*3|0);if(k++%2==0)br+=`<rect x="${bx}" width="${w}" height="40"/>`;bx+=w}
$('#bc').innerHTML=br;

/* 갤러리 + 라이트박스 */
const gc=['#e8dcc6','#d9c7b0','#efe3d3','#cdb8a0','#e3d5c0','#d4c2ac'];
const gb=i=>C.gallery[i]?`url('${C.gallery[i]}') center/cover`:`linear-gradient(135deg,${gc[i]},#f6efe2)`;
$('.gal').innerHTML=gc.map((_,i)=>`<div class="rv z" data-i="${i}" style="background:${gb(i)}">${C.gallery[i]?'':'<span>'+(i+1)+'</span>'}</div>`).join('');
const lb=$('#lb'),lv=$('#lb div');let gi=0;
const show=i=>{gi=(i+6)%6;lv.style.background=gb(gi);lb.classList.add('on')};
$('.gal').onclick=e=>{const t=e.target.closest('[data-i]');if(t)show(+t.dataset.i)};
lb.onclick=e=>{const r=e.clientX/innerWidth;r<.3?show(gi-1):r>.7?show(gi+1):lb.classList.remove('on')};

/* 달력 + 카운트다운 */
const f=new Date(Y,M,1).getDay(),n=new Date(Y,M+1,0).getDate();
let c=WD.map((w,i)=>`<b class="${i?'':'su'}">${w}</b>`).join('')+'<i></i>'.repeat(f);
for(let d=1;d<=n;d++)c+=`<span class="${(f+d-1)%7?'':'su'} ${d==D.getDate()?'w':''}">${d}</span>`;
$('.cal').innerHTML=c;
const tick=()=>{const t=Math.max(0,D-Date.now())/1e3|0,v=[t/86400|0,t/3600%24|0,t/60%60|0,t%60];
  $$('.cd b').forEach((b,i)=>b.textContent=p2(v[i]));
  $('#dn').innerHTML=t?`${C.groom.name.slice(1)} ♥ ${C.bride.name.slice(1)}의 결혼식이<br><b style="color:var(--gold);font-weight:500">${v[0]}일</b> 남았습니다.`:'오늘, 결혼합니다 ♥'};
tick();setInterval(tick,1e3);

/* 계좌 + 복사 + 공유 */
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._);t._=setTimeout(()=>t.classList.remove('on'),1800)};
const copy=async s=>{try{await navigator.clipboard.writeText(s)}catch(e){const a=document.createElement('textarea');a.value=s;document.body.append(a);a.select();document.execCommand('copy');a.remove()}toast('복사되었습니다')};
['groom','bride'].forEach(k=>$('#acc-'+k).innerHTML=C.acc[k].map(([w,b,no])=>`<div class="ar"><div><small>${w}</small><br>${b} ${no}</div><button class="btn" data-c="${no}">복사</button></div>`).join(''));
document.addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(b)copy(b.dataset.c)});
$('#cp').onclick=()=>copy(location.href);
$('#sh').onclick=async()=>{try{await navigator.share({title:document.title,url:location.href})}catch(e){if(e.name!=='AbortError')copy(location.href)}};

/* 스크롤 인터랙션 */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.15});
$$('.lines p').forEach((e,i)=>{e.classList.add('rv');e.style.setProperty('--d',i*.2+'s')});
$$('.gal div').forEach((e,i)=>e.style.setProperty('--d',(i%3)*.12+'s'));
$$('.rv').forEach(e=>io.observe(e));
const bg=$('.bg'),hd=$('#hd'),pb=$('#pb');
const sc=()=>{const y=scrollY,H=innerHeight;
  if(y<H*1.3){bg.style.transform=`translateY(${y*.25}px) scale(${1+y/H*.08})`;hd.style.transform=`translateY(${y*.2}px)`;hd.style.opacity=Math.max(0,1-y/H*1.2)}
  pb.style.transform=`scaleX(${y/Math.max(1,document.documentElement.scrollHeight-H)})`};
addEventListener('scroll',sc,{passive:true});sc();

/* 눈송이 + 꽃잎 + 터치 효과 */
const cv=$('#fx'),g=cv.getContext('2d'),R=Math.min(devicePixelRatio||1,2);let w,hh;
const rs=()=>{w=innerWidth;hh=innerHeight;cv.width=w*R;cv.height=hh*R;g.setTransform(R,0,0,R,0,0)};rs();addEventListener('resize',rs);
const rd=(a,b)=>a+Math.random()*(b-a);
const mk=top=>{const s=Math.random()<.55;return{t:s?0:1,x:rd(0,w),y:top?-12:rd(0,hh),r:s?rd(1.5,3.5):rd(5,9),vy:rd(.4,1.1),ph:rd(0,6.28),sp:rd(.01,.025),rot:rd(0,6.28),vr:rd(-.02,.02),a:rd(.6,.95)}};
const P=Array.from({length:42},()=>mk(0));let B=[];
const petal=(x,y,r,rot,col)=>{g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=col;g.beginPath();g.ellipse(0,0,r,r*.55,0,0,6.283);g.fill();g.restore()};
g.textAlign='center';
const loop=()=>{g.clearRect(0,0,w,hh);
  for(const p of P){p.y+=p.vy;p.ph+=p.sp;p.x+=Math.sin(p.ph)*.6;p.rot+=p.vr;if(p.y>hh+12)Object.assign(p,mk(1));
    g.globalAlpha=p.a;
    if(p.t==0){g.shadowColor='rgba(150,130,100,.5)';g.shadowBlur=4;g.fillStyle='#fff';g.beginPath();g.arc(p.x,p.y,p.r,0,6.283);g.fill();g.shadowBlur=0}
    else petal(p.x,p.y,p.r,p.rot,'#f0cfc6')}
  for(const b of B){b.life--;b.x+=b.vx;b.y+=b.vy;b.vy+=.08;b.vx*=.98;b.rot+=b.vr;g.globalAlpha=Math.max(0,b.life/50);
    if(b.h){g.fillStyle='#d9a398';g.font=b.r*2.4+'px serif';g.fillText('♥',b.x,b.y)}else petal(b.x,b.y,b.r,b.rot,'#f3d3ca')}
  B=B.filter(b=>b.life>0);g.globalAlpha=1;requestAnimationFrame(loop)};
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
  loop();
  addEventListener('pointerdown',e=>{
    const r=document.createElement('div');r.className='rp';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.append(r);setTimeout(()=>r.remove(),700);
    for(let i=0;i<12;i++){const a=rd(0,6.28),s=rd(1.5,4.5);B.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,r:rd(4,8),rot:rd(0,6),vr:rd(-.2,.2),life:50,h:i%3==0})}
  });
}
