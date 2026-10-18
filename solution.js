/* Proposed Exclusives experience. Historical fixtures; no order submission. */
let motionPaused = matchMedia('(prefers-reduced-motion: reduce)').matches;
let motionFrame = 0;
let lanes = [];
let returnFocus;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const industries = {NVDA:'AI & chips',AAPL:'Devices & services',GOOGL:'Search & cloud',MSFT:'Software & cloud',TSM:'Chip manufacturing',AVGO:'Chips & infrastructure',XOM:'Oil & energy',CVX:'Oil & energy',JPM:'Banking',BAC:'Banking'};
function smallCard(s, copy=false) {
  const selected=state.compare.includes(s.ticker);
  return '<article class="discovery-card"'+(copy?' aria-hidden="true"':'')+'><button class="card-open" data-buy="'+s.ticker+'"'+(copy?' tabindex="-1"':'')+' aria-label="View '+s.name+'">'+
  '<span class="card-heading">'+stockLogo(s)+'<span><b>'+s.name+'</b><small>'+s.ticker+'</small></span></span><span class="business">'+industries[s.ticker]+'</span><span class="card-price">'+s.price+'</span><span class="card-move '+(s.move.startsWith('+')?'up':'down')+'">'+s.move+' <small>day</small></span></button><button class="card-compare '+(selected?'selected':'')+'" data-compare="'+s.ticker+'"'+(copy?' tabindex="-1"':'')+' aria-pressed="'+selected+'">'+(selected?'✓ Selected':'+ Compare')+'</button></article>';
}
renderStocks=function(){
  cancelAnimationFrame(motionFrame);
  const q=state.query.trim().toLowerCase();
  const all=stocks.filter(s=>(state.filter==='all'||s.filters.includes(state.filter))&&(!q||[s.name,s.ticker,s.sector,industries[s.ticker]].some(x=>x.toLowerCase().includes(q))));
  const moving=!q&&state.filter==='all';
  $('stockList').className=moving?'discovery-rails':'discovery-grid';
  if(moving){
    const groups=[all.slice(0,5),all.slice(5)];
    $('stockList').innerHTML=groups.map((g,i)=>'<div class="stock-rail" aria-label="'+(i?'More US companies':'US companies')+'"><div class="rail-track">'+[0,1,2].map(n=>'<div class="rail-group">'+g.map(s=>smallCard(s,n!==1)).join('')+'</div>').join('')+'</div></div>').join('');
    lanes=[...document.querySelectorAll('.stock-rail')].map((el,i)=>{
      const width=el.querySelector('.rail-group').getBoundingClientRect().width;
      el.scrollLeft=width;let drag=null,interacting=false,resumeAt=0;
      el.addEventListener('pointerdown',e=>{interacting=true;resumeAt=Infinity;if(e.pointerType==='mouse'){drag={x:e.clientX,left:el.scrollLeft,moved:false};el.setPointerCapture(e.pointerId);}});
      el.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(e.clientX-drag.x)>5){drag.moved=true;el.scrollLeft=drag.left-(e.clientX-drag.x);e.preventDefault();}});
      const end=()=>{if(drag?.moved)el.dataset.dragged='yes';drag=null;interacting=false;resumeAt=performance.now()+900;};
      el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);el.addEventListener('lostpointercapture',()=>{if(interacting)end()});
      el.addEventListener('wheel',()=>{resumeAt=performance.now()+900},{passive:true});
      el.addEventListener('scroll',()=>{if(interacting||performance.now()<resumeAt)lane.position=el.scrollLeft},{passive:true});
      el.addEventListener('click',e=>{if(el.dataset.dragged){e.preventDefault();e.stopImmediatePropagation();delete el.dataset.dragged;}},true);
      const lane={el,width,position:width,direction:i===0?-1:1,held:now=>interacting||now<resumeAt};return lane;
    });
    let previous=performance.now();
    const animate=now=>{
      const seconds=Math.min((now-previous)/1000,.05); previous=now;
      if(!motionPaused&&!reducedMotion.matches&&!document.hidden&&$('overlay').hidden){
        lanes.forEach(lane=>{
          const {el,direction}=lane;
          if(!el.getClientRects().length)return;
          const width=el.querySelector('.rail-group').getBoundingClientRect().width;
          if(!width)return;
          if(lane.width!==width){lane.width=width;lane.position=width;el.scrollLeft=width;}
          if(lane.held(now)||el.querySelector(':focus-visible')){lane.position=el.scrollLeft;return;}
          lane.position+=direction*14*seconds;
          if(lane.position<width*.35)lane.position+=width;
          if(lane.position>width*1.65)lane.position-=width;
          el.scrollLeft=lane.position;
        });
      } else lanes.forEach(lane=>{lane.position=lane.el.scrollLeft;});
      motionFrame=requestAnimationFrame(animate);
    };motionFrame=requestAnimationFrame(animate);
  } else $('stockList').innerHTML=all.length?all.map(s=>smallCard(s)).join(''):'<p class="empty">No companies match. Try another name or sector.</p>';
  $('motionToggle').hidden=!moving;
  $('compareTrigger').hidden=state.compare.length===0;
  $('compareTrigger').disabled=state.compare.length<2;
  $('compareCount').textContent=state.compare.length+'/2';
  syncMotion();
};
function syncMotion(){const b=$('motionToggle');b.textContent=motionPaused?'▶ Play cards':'Ⅱ Pause cards';b.setAttribute('aria-pressed',String(motionPaused));}
$('motionToggle').onclick=()=>{motionPaused=!motionPaused;syncMotion();};
reducedMotion.addEventListener('change',e=>{motionPaused=e.matches;syncMotion();});
openSheet=function(title,body,action='Close',onAction=null){
  returnFocus=document.activeElement;
  $('sheetContent').innerHTML='<h2 id="sheetTitle">'+title+'</h2>'+body+'<button class="primary" id="sheetAction">'+action+'</button><button class="secondary" id="sheetDismiss">Back to Exclusives</button>';
  $('overlay').hidden=false;
  $('sheetAction').onclick=onAction||closeSheet;$('sheetDismiss').onclick=closeSheet;
  $('closeSheet').focus();
};
closeSheet=function(){$('overlay').hidden=true;if(returnFocus?.isConnected)returnFocus.focus();};
$('closeSheet').onclick=closeSheet;
document.addEventListener('keydown',e=>{
  if($('overlay').hidden||e.key!=='Tab')return;
  const els=[...$('overlay').querySelectorAll('button,a,input,select')].filter(el=>!el.disabled);
  if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus();}
  else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus();}
});
stockDetail=function(ticker){
  const s=stocks.find(x=>x.ticker===ticker);
  openSheet(s.name, '<div class="detail-company">'+stockLogo(s)+'<span>'+s.ticker+' · '+s.sector+'</span></div><div class="detail-price">'+s.price+'<span class="'+(s.move.startsWith('+')?'up':'down')+'">'+s.move+' day</span></div><p class="capture-label">Share price captured 17 Oct 2026 · USD</p><h3>What you would own</h3><p>A fraction of one company. You choose the dollar amount; your ownership moves with the share price.</p><div class="sheet-facts"><div><span>Fractional order</span><b>From $1</b></div><div><span>Currency</span><b>US dollar</b></div><div><span>Account & funding</span><b>Via Vested</b></div></div><div class="risk-line"><b>What could affect your money</b><p>Company performance, market falls and USD/INR changes. Capital is at risk.</p></div><details><summary>Fees & getting started</summary><p>US account setup and funding are required. Transfer and currency conversion charges are separate from the $1 order. Confirm the live quote and full charges with the provider.</p></details>',
  'View account setup',()=>openSheet('Your US investing account','<p>US investing is provided through Vested. Here is what you will need before placing an order.</p><ol class="setup-steps"><li><b>Verify your account</b><span>Complete the provider’s identity checks.</span></li><li><b>Fund in US dollars</b><span>Review the exchange rate and transfer charges.</span></li><li><b>Review your order</b><span>Check the live price, fractional shares and total cost.</span></li></ol><p class="step-note">Interactive prototype. Account setup and transactions are not connected.</p>','Back to '+s.ticker,()=>stockDetail(ticker)));
};
funds[1].type='Regular · Commodity / Silver';
renderOther=function(){
  document.querySelectorAll('[data-product]').forEach(b=>{const a=b.dataset.product===state.product;b.classList.toggle('active',a);b.setAttribute('aria-selected',a)});
  let html='';
  if(state.product==='funds')html='<div class="fund-intro">Ionic’s fund selection <span>1Y return · historical</span></div>'+funds.map((f,i)=>'<button class="fund-tile" data-fund="'+i+'"><img src="assets/'+['trustmf-logo.png','icici-logo.png','union-logo.png'][i]+'" alt=""><span><b>'+f.name+'</b><small>'+f.type+'</small></span><strong>'+f.ret+'<small>View fund ›</small></strong></button>').join('');
  else if(state.product==='managed')html='<article class="managed-card"><div class="managed-symbol">B</div><small>VESTED · MANAGED PORTFOLIO</small><h3>BlackRock Smart Beta</h3><p>A portfolio of US factor ETFs, with ongoing rebalancing.</p><div class="other-metrics"><div><small>Minimum</small><b>$100</b></div><div><small>1Y return*</small><b class="up">25.21%</b></div><div><small>Annual AUM fee</small><b>1%</b></div></div><p class="small-risk">Moderate risk · USD exposure · *Historical</p><button class="other-cta" data-detail="managed">View portfolio →</button></article>';
  else html='<article class="managed-card"><img class="basket-symbol" src="assets/edge-logo.png" alt=""><small>IONIC RESEARCH</small><h3>Edge · Catalyst Model</h3><p>Research-led exposure to mid and small-cap Indian stocks.</p><div class="other-metrics"><div><small>Stocks</small><b>20–25</b></div><div><small>Risk</small><b>High</b></div><div><small>Annual fee</small><b>₹10K + GST</b></div></div><p class="small-risk">Captured minimum ₹3L · confirm current eligibility</p><button class="other-cta" data-detail="edge">View basket →</button></article>';
  $('otherContent').innerHTML=html;
};
fundSheet=function(i){
 const f=funds[i];
 openSheet(f.name,'<p>'+f.type+' · Growth</p><div class="detail-price">'+f.ret+'<span>1Y historical return</span></div><p class="capture-label">Supplied Ionic screen · not a forecast</p><div class="sheet-facts"><div><span>Plan</span><b>Regular</b></div><div><span>Exposure</span><b>'+(i===1?'Silver':'Small-cap equity')+'</b></div><div><span>Expense ratio</span><b>Not available in capture</b></div></div><div class="risk-line"><b>'+(i===1?'Commodity concentration':'Small-cap concentration')+'</b><p>'+(i===1?'Silver prices can move sharply. This fund adds exposure to a single commodity.':'Smaller companies can have sharp price swings and lower liquidity.')+'</p></div><details open><summary>Before choosing this fund</summary><p>Review the current expense ratio, exit load, riskometer and overlap with your holdings. Minimum investment and current availability must be checked in the fund documents.</p></details>','Browse fund catalogue',()=>location.href='./app.html?section=funds');
};
$('jumpFunds').onclick=()=>{state.product='funds';renderOther();$('other').scrollIntoView({behavior:'smooth'});};
$('jumpGlobal').onclick=()=>{$('discover').scrollIntoView({behavior:'smooth'});};
$('jumpMore').onclick=()=>document.querySelector('.catalogue').scrollIntoView({behavior:'smooth'});
renderStocks();renderOther();
document.addEventListener('click',e=>{
 const target=e.target.closest('[data-detail]');
 if(!target)return;
 e.preventDefault();e.stopImmediatePropagation();
 if(target.dataset.detail==='managed'){
   openSheet('BlackRock Smart Beta','<p>Managed US portfolio · Vested</p><div class="detail-price">25.21%<span>1Y historical return</span></div><p class="capture-label">Supplied Ionic screen · not a forecast</p><div class="sheet-facts"><div><span>Minimum investment</span><b>$100</b></div><div><span>Annual AUM fee</span><b>1%</b></div><div><span>1Y volatility</span><b>13.27%</b></div><div><span>Risk in source</span><b>Moderate</b></div></div><h3>What is inside</h3><p>US factor ETFs with exposure to minimum volatility, value, size, momentum and quality.</p><div class="risk-line"><b>Equity and currency risk</b><p>A diversified portfolio can still fall in value. Your rupee outcome also depends on USD/INR.</p></div><details><summary>Funding & charges</summary><p>US account verification and funding are required. Check current management, transfer and FX charges before an order.</p></details>','View portfolio details',()=>location.href='./app.html?section=product&item=blackrock');
 }else{
   openSheet('Edge · Catalyst Model','<p>Ionic Research · Indian stock basket</p><div class="sheet-facts"><div><span>Captured minimum</span><b>₹3 lakh</b></div><div><span>Stocks</span><b>20–25</b></div><div><span>Risk · horizon</span><b>High · 1–3 years</b></div><div><span>Annual research fee</span><b>₹10,000 + GST</b></div><div><span>Six-month research fee</span><b>₹6,000 + GST</b></div></div><div class="risk-line"><b>Mid and small-cap exposure</b><p>Prices can fluctuate sharply. The research subscription is separate from the amount invested in stocks.</p></div><p class="capture-label">Minimum and fees are from the supplied app screen. Confirm current terms and brokerage charges before subscribing.</p>','View basket details',()=>location.href='./app.html?section=product&item=edge');
 }
},true);

/* Category catalogue uses the same captured offerings as the preserved app. */
const companyLogos={AVGO:'broadcom.svg',BAC:'bankofamerica.svg',JPM:'jpmorganchase.svg',MSFT:'microsoft.png',TSM:'tsmc.png',XOM:'exxonmobil.png',CVX:'chevron.png'};
stocks.forEach(s=>{if(companyLogos[s.ticker])s.logo=companyLogos[s.ticker]});
const safeText=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const strategyLink=(id,label='View details')=>'<a class="strategy-cta" href="./app.html?section=product&item='+encodeURIComponent(id)+'">'+label+' <span>→</span></a>';
function strategyCatalogue(){
 const card=(badge,name,firm,body,facts,id)=>'<article class="strategy-card"><div class="strategy-provider"><span>'+badge+'</span><small>'+safeText(firm)+'</small></div><h3>'+safeText(name)+'</h3><p>'+safeText(body)+'</p><dl>'+facts.map(([k,v])=>'<div><dt>'+k+'</dt><dd>'+safeText(v)+'</dd></div>').join('')+'</dl>'+strategyLink(id)+'</article>';
 const pms=strategyData.pms.map(p=>card('PMS',p.name,p.firm,p.bullets[0],[['Strategy',p.strategy],['AUM · ₹ Cr',p.aum],['Return shown*',p.returns],['Standard minimum','₹50L']],p.id)).join('');
 const aif=Object.entries(strategyData.aif).map(([id,p])=>card('AIF',p.name,p.theme,p.points[0],[['Liquidity',p.liquidity],['AUM',p.aum],['Return shown*',p.return],['Standard minimum',p.minimum]],id)).join('');
 const sif=strategyData.sif.map(([name,firm,a,b,id])=>card('SIF',name,firm,a,[['Standard minimum','₹10L'],['Approach',name.includes('Equity')?'Equity long-short':'Hybrid long-short']],id)).join('');
 $('flagship').innerHTML='<div class="strategy-intro"><span class="eyebrow">PRIVATE WEALTH</span><h2>Specialist managers.<br>More ways to invest.</h2><p>Explore PMS, alternative investments and specialised funds.</p></div><nav class="strategy-jumps" aria-label="Jump to strategy type"><button data-strategy-jump="pms">PMS <small>9</small></button><button data-strategy-jump="aif">AIF <small>3</small></button><button data-strategy-jump="sif">SIF <small>6</small></button></nav><section class="strategy-section" id="strategy-pms"><header><span>01 / PMS</span><h2>Portfolio management</h2><p>A manager builds and manages your portfolio.</p></header>'+pms+'</section><section class="strategy-section" id="strategy-aif"><header><span>02 / AIF</span><h2>Alternative investments</h2><p>Indian and global strategies beyond traditional funds.</p></header>'+aif+'</section><section class="strategy-section" id="strategy-sif"><header><span>03 / SIF</span><h2>Specialised funds</h2><p>Explore equity and hybrid long-short approaches.</p></header>'+sif+'</section><p class="strategy-source">*Figures from supplied Ionic captures; periods differ or are unspecified. Returns are not comparable forecasts. Eligibility, costs and current terms apply. Accredited entry may differ from standard minimums.</p>';
}
let activeCategory='stocks';
const categoryOrder=['stocks','funds','flagship'];
const categoryHeroes={
 stocks:{overline:'IONIC GLOBAL',title:'Own a piece of<br>the world.',pill:'US stock orders from <b>$1*</b>',image:'global-phone.webp',alt:'Global investing preview'},
 funds:{overline:'FUNDS & BASKETS',title:'Expert selection.<br>Your investment.',pill:'Mutual funds · Managed portfolios · Baskets',image:'hero-tiles-v2.webp',alt:'Stack of investment cards'},
 flagship:{overline:'PRIVATE WEALTH',title:'Private Wealth.<br>More possibilities.',pill:'PMS · AIF · SIF',image:'sif-hero.webp',alt:'Specialised investment strategy artwork'}
};
function updateHero(view){
 const h=categoryHeroes[view],hero=document.querySelector('.hero');hero.dataset.category=view;
 hero.setAttribute('aria-label',h.overline+' — swipe to change investment category');
 hero.innerHTML='<div class="hero-copy"><span class="hero-overline">'+h.overline+(view==='flagship'?' <em class="flagship-tag hero-flagship"><i></i>Flagship</em>':'')+'</span><h1>'+h.title+'</h1><span class="hero-min">'+h.pill+'</span></div><img src="assets/'+h.image+'" alt="'+h.alt+'"><div class="hero-controls"><button data-hero-step="-1" aria-label="Previous category">‹</button><div class="hero-pagination">'+categoryOrder.map((key,i)=>'<button data-hero-category="'+key+'" class="'+(key===view?'on':'')+'" aria-label="'+['US stocks','Funds and baskets','Private Wealth'][i]+'" aria-pressed="'+(key===view)+'"></button>').join('')+'</div><button data-hero-step="1" aria-label="Next category">›</button></div>';
}
function showCategory(view){
 activeCategory=view;sessionStorage.setItem('ionic-category',view);
 Object.entries({stocks:'discover',funds:'other',flagship:'flagship'}).forEach(([key,id])=>$(id).hidden=key!==view);
 [['jumpGlobal','stocks'],['jumpFunds','funds'],['jumpMore','flagship']].forEach(([id,key])=>{$(id).classList.toggle('selected',key===view);$(id).setAttribute('aria-pressed',key===view)});
 updateHero(view);$('scroll').scrollTop=0;
}
$('jumpGlobal').onclick=()=>showCategory('stocks');
$('jumpFunds').onclick=()=>showCategory('funds');
$('jumpMore').onclick=()=>showCategory('flagship');
$('menu').onclick=()=>showCategory('flagship');
$('headerSearch').onclick=()=>{showCategory('stocks');$('stockSearch').focus()};
document.addEventListener('click',e=>{
 const jump=e.target.closest('[data-strategy-jump]');if(jump)$('strategy-'+jump.dataset.strategyJump).scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth',block:'start'});
 const category=e.target.closest('[data-hero-category]');if(category)showCategory(category.dataset.heroCategory);
 const step=e.target.closest('[data-hero-step]');if(step)showCategory(categoryOrder[(categoryOrder.indexOf(activeCategory)+Number(step.dataset.heroStep)+3)%3]);
});
let heroPointer=null;
const hero=document.querySelector('.hero');hero.style.touchAction='pan-y';
hero.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;heroPointer={x:e.clientX,y:e.clientY};hero.setPointerCapture(e.pointerId)});
hero.addEventListener('pointerup',e=>{if(!heroPointer)return;const dx=e.clientX-heroPointer.x,dy=e.clientY-heroPointer.y;heroPointer=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.4)showCategory(categoryOrder[(categoryOrder.indexOf(activeCategory)+(dx<0?1:2))%3])});
hero.addEventListener('pointercancel',()=>heroPointer=null);
strategyCatalogue();renderStocks();
const savedCategory=sessionStorage.getItem('ionic-category');showCategory(categoryOrder.includes(savedCategory)?savedCategory:'stocks');
