/* The mock demonstrates a source-linked AI explainer with prepared content. */
function aiFlower(){return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3c6 0 7 8 10 11s11 4 11 10-8 7-11 10-4 11-10 11-7-8-10-11S3 30 3 24s8-7 11-10S18 3 24 3Z" fill="#638cf2"/><path d="M24 14c3 5 5 7 10 10-5 3-7 5-10 10-3-5-5-7-10-10 5-3 7-5 10-10Z" fill="white"/></svg>'}
const cardBeforeAi=smallCard;
smallCard=function(s,copy=false){
 const html=cardBeforeAi(s,copy);
 const ai='<button class="card-ai" data-ai-stock="'+s.ticker+'"'+(copy?' tabindex="-1"':'')+' aria-label="AI deep dive for '+safeText(s.name)+'">'+aiFlower()+'<span>AI deep dive</span></button>';
 return html.replace(/(<button class="card-compare[\s\S]*?<\/button>)(<\/article>)$/,'<div class="card-actions">'+ai+'$1</div>$2');
};
const otherBeforeAi=renderOther;
renderOther=function(){
 otherBeforeAi();
 if(state.product!=='funds')return;
 document.querySelectorAll('.fund-tile').forEach((tile,i)=>{
  const wrap=document.createElement('div');wrap.className='fund-entry';tile.before(wrap);wrap.append(tile);
  const button=document.createElement('button');button.className='fund-ai';button.dataset.aiFund=i;button.setAttribute('aria-label','AI deep dive for '+funds[i].name);button.innerHTML=aiFlower()+'<span>AI deep dive</span>';wrap.append(button);
  tile.querySelector('strong small').style.visibility='hidden';
 });
};
const stockBeforeAi=stockDetail;
stockDetail=function(ticker){stockBeforeAi(ticker);addDetailAi('stock',ticker)};
const fundBeforeAi=fundSheet;
fundSheet=function(i){fundBeforeAi(i);addDetailAi('fund',i)};
function addDetailAi(type,id){
 const button=document.createElement('button');button.className='detail-ai';button.dataset[type==='stock'?'aiStock':'aiFund']=id;button.innerHTML=aiFlower()+'<span><b>AI deep dive</b><small>Strengths, risks and '+(type==='stock'?'company direction':'fund approach')+'</small></span><span aria-hidden="true">›</span>';
 $('sheetContent').querySelector('.capture-label').after(button);
}
let activeAi=null;
function aiInsightHtml(topic='all'){
 const {type,id}=activeAi,p=type==='stock'?aiResearch.stocks[id]:aiResearch.funds[id];
 const topics=[['upside','What makes it interesting',p.upside],['risk','What could go wrong',p.risk],['direction',type==='stock'?'The company’s direction':'The fund’s approach',p.direction]];
 return topics.filter(([key])=>topic==='all'||topic===key).map(([key,title,body])=>'<section class="ai-insight ai-'+key+'"><span class="ai-section-label">'+(key==='upside'?'THE APPEAL':key==='risk'?'THE TRADE-OFF':'THE DIRECTION')+'</span><h3>'+title+'</h3><p>'+safeText(body)+'</p></section>').join('');
}
function openAi(type,id){
 const aiOrigin=document.activeElement;const aiAnchor=aiOrigin&&!aiOrigin.closest('#sheetContent')?aiOrigin:returnFocus;
 activeAi={type,id};const p=type==='stock'?aiResearch.stocks[id]:aiResearch.funds[id];const name=type==='stock'?stocks.find(s=>s.ticker===id).name:funds[id].name;
 const body='<div class="ai-brand">'+aiFlower()+'<span><b>Ionic AI</b><small>Understand the investment</small></span><span class="ai-preview">Preview</span></div><p class="ai-summary">'+safeText(p.summary)+'</p><div class="ai-topics" aria-label="Deep dive topics">'+[['all','Overview'],['upside','Strengths'],['risk','Risks'],['direction',type==='stock'?'Vision':'Approach']].map(([key,label])=>'<button data-ai-topic="'+key+'" aria-pressed="'+(key==='all')+'">'+label+'</button>').join('')+'</div><div id="aiInsights" aria-live="polite">'+aiInsightHtml()+'</div><div class="ai-check"><b>Before you decide</b><p>'+safeText(p.check||'A strong business can still be an expensive investment. Check the current valuation and results, how this holding fits your portfolio, and the full USD funding and FX costs.')+'</p></div><details class="ai-sources"><summary>Sources & how this preview works</summary><a href="'+p.source+'" target="_blank" rel="noopener noreferrer">'+safeText(p.sourceLabel)+' ↗</a><p>Prepared explanation for this prototype, not a live AI response. Source links checked 18 Oct 2026. Company plans can change; this is not a return forecast or a personalised recommendation.</p></details>';
 openSheet(name+' · AI deep dive',body,type==='stock'?'View stock details':'View fund details',()=>type==='stock'?stockDetail(id):fundSheet(id));
 if(aiAnchor?.isConnected)returnFocus=aiAnchor;
 $('overlay').classList.add('ai-open');$('sheetContent').parentElement.scrollTop=0;
}
const closeBeforeAi=closeSheet;
closeSheet=function(){closeBeforeAi();$('overlay').classList.remove('ai-open')};
$('closeSheet').onclick=closeSheet;
document.addEventListener('click',e=>{
 const stock=e.target.closest('[data-ai-stock]'),fund=e.target.closest('[data-ai-fund]'),topic=e.target.closest('[data-ai-topic]');
 if(stock){e.preventDefault();openAi('stock',stock.dataset.aiStock)}
 if(fund){e.preventDefault();openAi('fund',Number(fund.dataset.aiFund))}
 if(topic){document.querySelectorAll('[data-ai-topic]').forEach(b=>b.setAttribute('aria-pressed',b===topic));$('aiInsights').innerHTML=aiInsightHtml(topic.dataset.aiTopic)}
});
renderStocks();renderOther();
