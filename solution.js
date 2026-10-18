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
      el.scrollLeft=width;let drag=null;
      el.addEventListener('pointerdown',e=>{motionPaused=true;syncMotion();if(e.pointerType==='mouse')drag={x:e.clientX,left:el.scrollLeft,moved:false};});
      el.addEventListener('pointermove',e=>{if(!drag)return;if(Math.abs(e.clientX-drag.x)>5){drag.moved=true;el.scrollLeft=drag.left-(e.clientX-drag.x);e.preventDefault();}});
      const end=()=>{if(drag?.moved)el.dataset.dragged='yes';drag=null;};
      el.addEventListener('pointerup',end);el.addEventListener('pointerleave',end);
      el.addEventListener('click',e=>{if(el.dataset.dragged){e.preventDefault();e.stopImmediatePropagation();delete el.dataset.dragged;}},true);
      return {el,width,position:width,direction:i===0?-1:1};
    });
    let previous=performance.now();
    const animate=now=>{
      const seconds=Math.min((now-previous)/1000,.05); previous=now;
      if(!motionPaused&&!reducedMotion.matches&&!document.hidden&&$('overlay').hidden){
        lanes.forEach(lane=>{
          const {el,width,direction}=lane;
          if(el.matches(':hover')||el.matches(':focus-within')){lane.position=el.scrollLeft;return;}
          lane.position+=direction*9*seconds;
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
  returnFocus=document.activeElement; motionPaused=true;syncMotion();
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
