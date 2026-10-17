/* Dated, local-only extensions to the preserved Ionic replica. No live orders or account connection. */
(() => {
  const baseRender = render;
  const basePortfolio = portfolioHome;
  const baseOpen = openDetail;
  const snapshotDate = '17 OCT 2026 SNAPSHOT';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const line = (label, value) => `<div class="rep-line"><span>${label}</span><b>${value}</b></div>`;
  const button = (label, action, cls = '') => `<button class="rep-btn ${cls}" data-replica="${action}">${label}</button>`;
  const heading = (title, subtitle = '') => `<div class="rep-heading"><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div>`;

  fundListData['All MF'] = [
    ['Nippon India Taiwan Equity Fund','Equity ・ International','99.51%','nippon','nippon-mutual'],
    ['Mirae Asset NYSE FANG+ ETF FoF','Equity ・ International','54.3%','mirae','mirae-fang'],
    ['ICICI Prudential Strategic Metal Fund','Equity ・ International','52.85%','icici','icici-strategic']
  ];
  fundListData['Ionic Recommended'] = [
    ['ICICI Prudential Silver ETF FoF-Growth','Commodities ・ Silver','26.33%','icici','icici-mutual'],
    ['TRUSTMF Small Cap Fund Regular-Growth','Equity ・ Small Cap','23.78%','trust','mutual'],
    ['Union Small Cap Fund Regular-Growth','Equity ・ Small Cap','16.56%','union','union-mutual']
  ];
  const oldFundList = renderFundList;
  renderFundList = function () { oldFundList(); if (state.mfListTab === 'All MF') app.innerHTML=app.innerHTML.replace('2150 funds','2153 funds'); };
  mutualCards = function () { const trendIcon=`<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m5 22 7-8 5 4 9-10m-6 0h6v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`; return state.mutualTab === 'Ionic Recommended' ? `<div class="simple-list">${listRow('assets/icici-logo','ICICI Prudential Silver ETF FoF-Growth','Regular · Commodities','26.33%<br><span class="meta">1Y return</span>','icici-mutual')}${listRow('assets/trustmf-logo','TRUSTMF Small Cap Fund Regular-Growth','Regular · Equity','23.78%<br><span class="meta">1Y return</span>','mutual')}${listRow('assets/union-logo','Union Small Cap Fund Regular-Growth','Regular · Equity','16.56%<br><span class="meta">1Y return</span>','union-mutual')}</div><button class="btn ghost full" style="margin-top:12px" data-open="recommended-funds">View All Recommended Funds</button>` : `<div class="simple-list"><button class="rep-trend" data-replica="trend-metal"><span class="rep-trend-icon">${trendIcon}</span><span class="rep-trend-copy"><small>TREND 1</small><b>Allocate 3–5% in Precious metals</b></span><span class="rep-trend-arrow">›</span></button><button class="rep-trend" data-replica="trend-offshore"><span class="rep-trend-icon">${trendIcon}</span><span class="rep-trend-copy"><small>TREND 2</small><b>Allocate 3–5% in Offshore Funds</b></span><span class="rep-trend-arrow">›</span></button></div>`; };

  const pmsCatalog = [
    {id:'yield',name:'Yield Enhancer',firm:'IONIC',strategy:'Fixed Income',aum:'155+',returns:'11.6%',bullets:['Income generation across the credit spectrum','Balance between risk, returns and capital preservation'],entry:'₹25L'},
    {id:'growth-fund',name:'Growth Fund',firm:'GREEN LANTERN',strategy:'Multi Cap Equity',aum:'1,250+',returns:'22.7%',bullets:['Disciplined business-first investing','Smart growth. High margin of safety'],entry:'₹25L'},
    {id:'allocate-equity',name:'Allocate Equity',firm:'IONIC',strategy:'Multi Cap Equity',aum:'55+',returns:'11.2%',bullets:['Auto pilot portfolio basis asset allocation','Equity, Fixed income and Alternates'],entry:'₹10L'},
    {id:'allocate-moderate',name:'Allocate Moderate',firm:'IONIC',strategy:'Multi Asset',aum:'90+',returns:'23.9%',bullets:['Auto pilot portfolio basis asset allocation','Equity, Fixed income and Alternates'],entry:'₹10L'},
    {id:'allocate-aggressive',name:'Allocate Aggressive',firm:'IONIC',strategy:'Multi Asset',aum:'250+',returns:'18.6%',bullets:['Auto pilot portfolio basis asset allocation','Equity, Fixed income and Alternates'],entry:'₹10L'},
    {id:'smart-alpha',name:'Smart Alpha 250',firm:'ALCHEMY',strategy:'Quant',aum:'760+',returns:'18.9%',bullets:['Quant-Driven Portfolio using 500+ signals','Optimizing Quality, Growth, and Price'],entry:'₹25L'},
    {id:'opportunities',name:'Opportunities',firm:'BUOYANT CAPITAL',strategy:'Flexi Cap',aum:'12,900+',returns:'20.8%',bullets:['Growth at Reasonable Price','Core and Satellite based Flexicap strategy'],entry:'₹25L'},
    {id:'capital-compound',name:'Capital Compounders',firm:'CARNELIAN',strategy:'Flexi Cap',aum:'2,610+',returns:'20.1%',bullets:['Concentrated Quality Growth at Reasonable Price','Focus on opportunities arising from mega trends'],entry:'₹50L'},
    {id:'core',name:'Core Fund',firm:'STALLION ASSET',strategy:'Multi Cap Equity',aum:'10,340+',returns:'28.3%',bullets:['Growth-oriented, compounding faster than the broader economy','Momentum-aware stock selection with technical entry & exit timing'],entry:'₹50L'}
  ];
  const baseExclusives = exclusivesHome;
  exclusivesHome = function () {
    const shelf = `<section class="section home-section pms-section"><div class="section-head"><div><h2>Portfolio Management Services<br>(PMS)</h2><div class="sub">Expert managed portfolios for all your financial needs</div><u class="small muted">Know more</u></div></div><div class="section-note">✦ Invest in this PMS starting ₹25L <s>₹50L</s> · <u>How?</u></div><div class="hscroll">${pmsCatalog.map(p=>product(p.name,p.firm,p.bullets[0],p.strategy,p.aum,p.returns,'₹50L',p.id,p.id==='core'?'New':undefined)).join('')}</div><button class="text-link" data-action="view-all-pms">View All 9 PMS →</button></section>`;
    return baseExclusives().replace(/<section class="section home-section pms-section">[\s\S]*?<\/section>/,shelf);
  };

  portfolioHome = function () {
    if (state.portfolioMode !== 'Imported') return basePortfolio();
    return `<div class="home-tabs"><button data-portfolio-mode="Ionic">Ionic</button><button class="active" data-portfolio-mode="Imported">Imported</button></div>
      <div class="portfolio-subtabs"><button class="active">Mutual Funds</button><button class="inactive" data-replica="import-stocks">Stocks</button></div>
      <section class="rep-portfolio-summary"><small>Your entire MF holdings: Invested via Ionic &amp; elsewhere</small><div><strong>₹2.52 L</strong><b>▼ ₹13.13 K (−4.95%)</b></div><div class="rep-summary-metrics"><span>Invested<b>₹2.65 L</b></span><span>XIRR ⓘ<b class="red">−8.27%</b></span><span>Benchmark XIRR ⓘ<b>−5.01%</b></span></div><footer><span>Last Refreshed: 14 Oct 2026 ↻</span><button data-replica="portfolio-report">Portfolio reports ↓</button></footer></section>
      <section class="rep-import-body"><div class="rep-analysis-progress"><h2>Your portfolio is only <em>50% analysed!</em></h2><div><span class="rep-done">✓</span><s>01 COMPLETE · Import Mutual Funds</s></div><div><span class="rep-current">◫</span><b>02 CURRENT · Import Stocks</b></div><p>Add stocks for a consolidated view of your investments and more accurate insights.</p>${button('Import Stocks','import-stocks','dark')}<div><span class="rep-pending">♙</span><b>03 PENDING · View Complete Portfolio Analysis</b></div></div>
      ${heading('Fund Analysis','Analyse your mutual fund portfolio')}
      <div class="rep-analysis-grid"><div class="rep-warn"><b>⌁ Underperforming</b><small>over 3Y rolling returns</small><strong>0 Funds<br>₹0</strong></div><div class="rep-warn orange"><b>↗ Outperforming but Underallocated</b><small>&lt;5% allocation funds</small><strong>0 Funds<br>₹0</strong></div><div class="rep-warn green"><b>↗ Outperforming</b><small>over 3Y rolling returns</small><strong>5 Funds<br>₹1.51L</strong></div><div class="rep-warn gray"><b>Other funds</b><small>Insufficient data for 3Y rolling returns</small><strong>3 Funds<br>₹99.95K</strong></div></div>
      <div class="rep-white-card"><h3>Unlock deeper mutual fund insights!</h3><p>See portfolio allocation and valuation insights for smarter decisions.</p>${button('View mutual fund insights','mf-insights','dark')}</div>
      ${heading('Portfolio Assessment','Discover ideal asset allocation for your risk profile')}<div class="rep-white-card rep-assessment"><div class="rep-assessment-head"><span>Assets</span><span>Current</span><span>Ideal</span></div>${[['Equity','67.2%'],['Commodity','25.8%'],['Debt','3.0%'],['Others','4.0%']].map(([n,v]) => `<div><span>${n}</span><b>${v}</b><button data-replica="risk-profile" aria-label="Complete risk profile to unlock ideal ${n}">🔒</button></div>`).join('')}${button('Complete Risk Profile','risk-profile','dark')}</div>
      ${heading('Optimise Your Taxes','Simplify your tax with comprehensive reports')}<div class="rep-white-card"><h3>Tax Loss Harvesting</h3><p>Save taxes by identifying funds which can offset your gains with losses</p>${button('Download Report','tax-report','dark')}</div><div class="rep-white-card"><h3>Realised Capital Gains</h3><div class="rep-tabs"><button class="active" data-replica="tax-advance">Advance Tax</button><button data-replica="tax-previous">Previous Years</button></div><p>Reports for capital gains and tax planning.</p>${button('Download Report','capital-gains','dark')}</div>
      ${heading('Top Holdings','Based on current fund value')}<div class="rep-white-card rep-holdings">${[['DSP Multi Asset Allocation','Hybrid · Multi Asset Allocation','₹55.26K','−₹740.62 (−1.32%)','−3.79%','−1.9%'],['Nippon India Small Cap Fund','Equity · Small Cap','₹41.69K','+₹1.69K (+4.23%)','12.23%','11.11%'],['Nippon India Silver ETF FoF','Commodities · Silver','₹34.82K','−₹8.98K (−20.50%)','−44.32%','−17.63%']].map(([n,t,v,p,x,b]) => `<div class="rep-holding"><div><b>${n}</b><small>${t}</small></div><strong>${v}<small class="${p.startsWith('+')?'green':'red'}">${p}</small></strong><footer>YOUR XIRR <b>${x}</b><span>${Number.parseFloat(x)>Number.parseFloat(b)?'&gt;':'&lt;'}</span> BENCHMARK <b>${b}</b></footer></div>`).join('')}${button('View all holdings','all-holdings')}</div>
      <section class="rep-recommended">${heading('Recommended by Ionic','Handpicked for you — expert-curated funds tailored to current market trends.')}<div class="rep-white-card">${[['ICICI Prudential Silver ETF FoF-Growth','26.33%','icici-mutual'],['TRUSTMF Small Cap Fund Regular-Growth','23.78%','mutual'],['Union Small Cap Fund Regular-Growth','16.56%','union-mutual']].map(([n,v,r]) => `<button class="rep-recommend" data-open="${r}"><b>${n}</b><strong>${v}<small>1Y return</small></strong></button>`).join('')}${button('View All Recommended Funds','recommended-funds')}</div></section>
      ${heading('Transactions','Recent Transactions')}<div class="rep-white-card">${[['8 Sept 2026','DSP Multi Asset Allocation Fund - Direct Plan','₹8K'],['7 Sept 2026','ICICI Prudential BHARAT 22 FOF - Direct Plan','₹6K'],['7 Aug 2026','Nippon India Small Cap Fund - Direct Plan','₹8K']].map(([d,n,v]) => `<div class="rep-transaction"><small>${d} · Buy</small><b>${n}</b><strong>Success<br>${v}</strong></div>`).join('')}${button('View all','transactions')}</div>
      <div class="footer-quote"><span class="small">IONIC WEALTH</span><em>Co-founders</em> in your<br> journey of wealth creation.<span class="small">#NoOneDoesItAlone</span></div></section>`;
  };

  const extraScreens = new Set(['rep-transactions','rep-mf-insights','rep-risk-intro','rep-risk-question','rep-import-otp','rep-pms-list','rep-yield','rep-pms-other','rep-smallcase','rep-sif-list','rep-sif-other','rep-us-list','rep-us-stock','rep-us-managed','rep-silver','rep-other-fund','rep-holdings']);
  render = function () { if (extraScreens.has(state.screen)) renderExtra(); else baseRender(); };
  openDetail = function (name) {
    const routes = {'yield':'rep-yield','sif-all':'rep-sif-list','icici-mutual':'rep-silver','union-mutual':'rep-other-fund','nippon-mutual':'rep-other-fund','mirae-fang':'rep-other-fund','mirae-sp500':'rep-other-fund','icici-strategic':'rep-other-fund','growth-fund':'rep-pms-other','allocate-equity':'rep-pms-other','allocate-moderate':'rep-pms-other','allocate-aggressive':'rep-pms-other','smart-alpha':'rep-pms-other','opportunities':'rep-pms-other','capital-compound':'rep-pms-other','sif-sapphire':'rep-sif-other','sif-altiva':'rep-sif-other','sif-titanium':'rep-sif-other','sif-isif':'rep-sif-other','sif-arudha':'rep-sif-other','commodity':'rep-us-managed','global-asset':'rep-us-managed'};
    if (routes[name]) { state.screen=routes[name]; state.replicaProduct=name; state.modal=''; render(); return; }
    if (['india-aif','aif','emerging-aif'].includes(name)) {state.replicaProduct=name;state.modal='rep-aif-interest';rerenderKeepScroll();return;}
    return baseOpen(name);
  };

  function frame(title, body, bottom = '') { app.innerHTML = header(title,false,title.length>29,false)+`<main class="scroll rep-screen" id="scrollRoot">${body}</main>${bottom}${state.modal?modal():''}`; }
  function cta(text, action) { return `<div class="rep-sticky">${button(text,action,'dark')}</div>`; }
  function renderExtra() {
    window.clearInterval(window.heroTimer); window.clearInterval(window.portfolioTimer);
    if (state.screen === 'rep-transactions') return renderTransactions();
    if (state.screen === 'rep-mf-insights') return renderMfInsights();
    if (state.screen === 'rep-risk-intro' || state.screen === 'rep-risk-question') return renderRisk();
    if (state.screen === 'rep-import-otp') return frame('',`<div class="rep-pad rep-otp"><h2>Enter OTP required to import your financial information</h2><p>OTP sent to your registered mobile number</p><div class="rep-otp-boxes">${Array.from({length:6},()=>'<span></span>').join('')}</div><p>Didn't receive OTP? <span>Resend OTP</span></p><small>Powered by SEBI regulated account aggregator CAMS</small><button class="rep-btn" disabled>Submit OTP</button></div>`);
    if (state.screen === 'rep-pms-list') return renderPmsList();
    if (state.screen === 'rep-yield') return renderYield();
    if (state.screen === 'rep-pms-other') return renderOtherPms();
    if (state.screen === 'rep-smallcase') return renderSmallcase();
    if (state.screen === 'rep-sif-list') return frame('Specialized Investment Funds (SIFs)',`<div class="rep-pad">${heading('Specialized Investment Funds (SIFs)','Six funds shown in the Ionic catalog. Accredited investors can invest from ₹1 lakh.')}${sifCards()}</div>`);
    if (state.screen === 'rep-sif-other') return renderOtherSif();
    if (state.screen === 'rep-us-list') return renderUsList();
    if (state.screen === 'rep-us-stock') return renderUsStock();
    if (state.screen === 'rep-us-managed') return renderUsManaged();
    if (state.screen === 'rep-silver') return renderSilver();
    if (state.screen === 'rep-other-fund') return renderOtherFund();
    if (state.screen === 'rep-holdings') return frame('Top Holdings',`<div class="rep-pad">${heading('Your mutual fund holdings','Snapshot from the imported portfolio')}${['DSP Multi Asset Allocation · ₹55.26K','Nippon India Small Cap Fund · ₹41.69K','Nippon India Silver ETF FoF · ₹34.82K'].map(v=>`<div class="rep-white-card">${v}</div>`).join('')}</div>`);
  }

  function renderTransactions() {
    const entries=[['8 Sept 2026','DSP Multi Asset Allocation Fund - Direct Plan','₹8K'],['7 Sept 2026','ICICI Prudential BHARAT 22 FOF - Direct Plan','₹6K'],['7 Aug 2026','Nippon India Small Cap Fund - Direct Plan','₹8K'],['7 Aug 2026','ICICI Prudential BHARAT 22 FOF - Direct Plan','₹6K'],['7 Aug 2026','DSP Multi Asset Allocation Fund - Direct Plan','₹8K']];
    frame('Transactions',`<div class="rep-pad"><div class="rep-tabs">${['All','Buy','Sell'].map(t=>`<button data-replica="tx-${t}" class="${state.replicaTx===t||!state.replicaTx&&t==='All'?'active':''}">${t}</button>`).join('')}</div>${state.replicaTx==='Sell'?'<p>No sell transactions in this observed snapshot.</p>':entries.map(([d,n,v])=>`<div class="rep-white-card rep-transaction"><small>${d} · Buy</small><b>${n}</b><strong>Success<br>${v}</strong></div>`).join('')}</div>`);
  }

  const underlying=[['Nippon India Silver ETF - Growth','13.82%','₹34,817.56'],['BHARAT 22 ETF - Growth','10.92%','₹27,513.20'],['HDFC Gold ETF','9.92%','₹24,975.97'],['DSP Gold ETF - Growth','2.56%','₹6,437.72'],['GOI','1.94%','₹4,895.98'],['Nifty 50','1.87%','₹4.71K'],['Hindustan Petroleum Corporation Ltd.','1.34%','₹3.38K'],['DSP NIFTY 50 Equal Weight ETF - Growth','1.18%','₹2.97K'],['HDFC Bank Ltd.','1.1%','₹2.77K'],['Jindal Steel Ltd.','1.09%','₹2.74K'],['Others','54.19%','₹1.37L']];
  function insightRows(rows,kind){return rows.map(([n,p,v],i)=>`<button class="rep-insight-row" data-replica="insight-${kind}-${i}"><span><b>${n}</b><small>${v} ﹀</small></span><strong>${p}<i style="--bar:${Math.min(parseFloat(p),100)}%"></i></strong></button>`).join('');}
  function renderMfInsights(){
    frame('Mutual Fund Insights',`<div class="rep-pad rep-insights"><small>Overall</small>${heading('Asset Allocation')}<div class="rep-white-card">${insightRows([['Equity','67.08%','₹1,68,995'],['Commodities','25.89%','₹65,215.64'],['Fixed Income','3%','₹7,565.84'],['Realestate','1.27%','₹3,190.66'],['Others','2.76%','₹6,948.07']],'allocation')}<p class="rep-footnote">*Excludes SIFs</p></div>${heading('Underlying Exposure')}<div class="rep-white-card">${insightRows(underlying.slice(0,5),'underlying')}${button('View All 11 Underlying holdings','insight-all-underlying')}</div>${heading('AMC Exposure')}<div class="rep-white-card">${insightRows([['Nippon India Mutual Fund','34.49%','₹86,892.27'],['ICICI Prudential Mutual Fund','33.66%','₹84,786.07'],['DSP Mutual Fund','21.94%','₹55,259.38'],['HDFC Mutual Fund','9.91%','₹24,975.97']],'amc')}</div>${heading('Fund Overlap')}<div class="rep-white-card">${[['ICICI Prudential Large & Mid Cap','ICICI Prudential Commodities Fund','23.4%'],['ICICI Prudential Large & Mid Cap','DSP Multi Asset Allocation Fund','9.4%'],['ICICI Prudential Large & Mid Cap','Nippon India Small Cap Fund','7.2%']].map(([a,b,p])=>`<div class="rep-overlap"><span>${a}<small>${b}</small></span><b>${p}</b></div>`).join('')}${button('View More Funds with Overlap','insight-overlap')}</div><small>Equity</small>${heading('Market Cap')}<div class="rep-white-card">${insightRows([['Large Cap','57.74%','₹79,021.28'],['Mid Cap','32.41%','₹44,356.33'],['Small Cap','9.85%','₹13,481.44']],'cap')}</div>${heading('Sector Exposure')}<div class="rep-white-card">${insightRows([['Financial','14.66%','₹26,644.94'],['Metals & Mining','11.47%','₹20,838.75'],['Energy','10.78%','₹19,590.61'],['Capital Goods','8.65%','₹15,716.65'],['Services','6.07%','₹11,037.25']],'sector')}${button('View All 17 Sectors holdings','insight-all-sectors')}<p class="rep-footnote">*Excludes international funds</p></div>${heading('Valuation')}<div class="rep-white-card"><div class="rep-valuation-head"><b>Portfolio P/E vs Nifty 50 P/E</b><span>10 Yrs</span></div><div class="rep-valuation-stats"><span>Portfolio<b>23.6</b></span><span>Avg. Nifty 50 P/E<b>23.8</b></span></div><svg class="rep-valuation-chart" viewBox="0 0 290 120" role="img" aria-label="Ten year portfolio P/E versus Nifty 50 P/E chart"><path d="M2 84L18 74 29 77 42 62 56 70 67 64 78 77 91 60 103 68 116 58 127 42 137 48 145 38 154 45 162 53 169 65 178 71 190 62 202 67 214 65 228 63 241 70 255 66 270 70 288 67" fill="none" stroke="#e9bb4e" stroke-width="2"/><path d="M2 69L288 69" fill="none" stroke="#afc5f0" stroke-dasharray="3 4"/><circle cx="288" cy="67" r="5" fill="#719af3"/></svg><div class="rep-chart-years"><span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>2026</span></div></div></div>`);
  }

  function renderPmsList() {
    frame('PMS',`<div class="rep-pad"><p class="rep-list-count">9 PMS</p>${pmsCatalog.map(p=>`<article class="rep-white-card rep-pms-card"><div class="rep-pms-entry">✦ Invest in this PMS starting ${p.entry} ${p.entry!=='₹50L'?'<s>₹50L</s>':''} <button data-replica="accredited">How?</button></div><div class="rep-pms-name"><small>${p.firm}</small><h3>${p.name}</h3></div><ul>${p.bullets.map(b=>`<li>${b}</li>`).join('')}</ul><div class="rep-pms-metrics"><div><small>Strategy</small><b>${p.strategy}</b></div><div><small>AUM (in Cr)</small><b>${p.aum}</b></div><div><small>Returns ⓘ</small><b class="green">${p.returns}</b></div></div><div class="rep-pms-footer"><span>Min. Investment<br><b>₹50L</b></span><button class="rep-btn dark" data-open="${p.id}">View More Details</button></div></article>`).join('')}</div>`);
  }

  function renderRisk() {
    if (state.screen==='rep-risk-intro') return frame('',`<div class="rep-risk-intro"><div class="rep-risk-art"><span>Risk Capacity</span><span>Risk Willingness</span><span>Risk Behaviour</span></div><small>RISK PROFILE</small><h1>Discover Your Risk Profile</h1><p>This questionnaire will help us tailor investment recommendations to your unique financial goals and risk tolerance.</p>${button('Start Now →','risk-start','dark')}</div>`);
    frame('',`<div class="rep-pad"><div class="rep-risk-steps">About You <span>Investment Objective</span><span>Investment Behaviour</span></div><small>QUESTION 1 OF 9</small><h2>How old are you?</h2>${['less than 30 years','30–45 years','45–55 years','55–60 years','Above 60 years'].map(v=>`<button class="rep-answer" data-replica="risk-answer">◯ &nbsp; ${v}</button>`).join('')}<p class="rep-footnote">The remaining questions were not observed. This local replica does not save a risk profile.</p></div>`);
  }

  function renderYield() {
    const returns=[['1 month','0.65%','−0.05%'],['3 months','3.06%','2.38%'],['6 months','5.53%','2.14%'],['1 year','10.52%','5.2%'],['Since inception','11.59%','5.77%']];
    frame('Yield Enhancer',`<div class="rep-detail"><div class="rep-product-intro"><small>IONIC · PMS</small><h1>Yield Enhancer</h1><p>Income generation across the credit spectrum with capital preservation and liquidity as stated objectives.</p><div class="rep-metrics"><div><small>Minimum</small><strong>₹50L</strong></div><div><small>AUM</small><strong>₹155Cr+</strong></div><div><small>Risk</small><strong>Moderate–High</strong></div></div><div class="rep-accredited">Accredited investors may qualify to start at ₹25L. <button data-replica="accredited">How?</button></div></div>
      ${heading('Who Should Invest','Investors seeking regular income and capital preservation over 1–3 years.')}
      ${heading('Trailing Returns','Compared with the benchmark shown in Ionic')}<div class="rep-white-card"><div class="rep-return-head"><span>Period</span><span>Yield Enhancer</span><span>Benchmark</span></div>${returns.map(([p,v,b])=>`<div class="rep-return-row"><span>${p}</span><b>${v}</b><span>${b}</span></div>`).join('')}</div>
      ${heading('Portfolio Holdings','21 holdings · top five shown')}<div class="rep-white-card">${[['Earlysalary','17%'],['Keertana Finserv','13%'],['Indel Money','13%'],['AYE Finance','7%'],['AKME Fintrade','6%']].map(([n,v])=>`<div class="rep-weight"><span>${n}</span><i style="width:${parseInt(v)*4}%"></i><b>${v}</b></div>`).join('')}</div>
      ${heading('Fund Information')}<div class="rep-white-card">${line('Inception','25 Feb 2025')}${line('Total holdings','21')}${line('Fund manager','Yajash Mehta')}</div>
      ${heading('Fee Structure')}<div class="rep-white-card">${line('₹50L–₹2.5Cr','1% fixed fee')}${line('₹2.5Cr–₹15Cr','0.75% fixed fee')}${line('Above ₹15Cr','0.5% fixed fee')}${line('Exit within 6 months','0.5% exit load')}</div><p class="rep-footnote">The live Variable Fee tab was empty when inspected. Terms and returns are dated snapshots.</p></div>`,cta('How Can I Start my Investment?','yield-interest'));
  }

  function renderOtherPms() {
    const p=pmsCatalog.find(item=>item.id===state.replicaProduct)||pmsCatalog[1];
    if (p.id==='capital-compound') return frame('Capital Compounders',`<div class="rep-detail"><div class="rep-product-intro"><small>CARNELIAN · PMS</small><h1>Capital Compounders</h1><p>Capture the “trillion-dollar India opportunity” through a long-only strategy focusing on stable earnings growth.</p><div class="rep-metrics"><div><small>Minimum</small><strong>₹50L</strong></div><div><small>AUM · Cr</small><strong>2,610+</strong></div><div><small>Since inception</small><strong>20.1%</strong></div></div></div>${heading('Who Should Invest')}<div class="rep-white-card">${line('Risk profile','Growth')}${line('Investment horizon','3 to 5 years')}${line('Financial goal','Long-term consistent returns with substantial alpha and capital protection')}</div>${heading('Trailing Returns')}<div class="rep-white-card"><div class="rep-return-head"><span>Tenure</span><span>This PMS</span><span>Benchmark</span></div>${[['6M','15.8%','1.4%'],['1Y','22.4%','4.7%'],['Since Inception','20.1%','14.9%']].map(([t,r,b])=>`<div class="rep-return-row"><span>${t}</span><b>${r}</b><span>${b}</span></div>`).join('')}</div>${heading('Investment Approach')}<div class="rep-white-card">Concentrated QGARP · proprietary CLEAR forensic framework · blend of accelerated and sustainable growth</div>${heading('Portfolio Holdings')}<div class="rep-white-card">${[['Aditya Birla Capital','9.5%'],['Laurus Labs','8.2%'],['Biocon','7%'],['ONE 97 Communications','5.4%'],['BHEL','4.2%']].map(([n,v])=>line(n,v)).join('')}</div>${heading('Fund Information')}<div class="rep-white-card">${line('Date of inception','15 May 2019')}${line('Total holdings','25–30')}${line('Max drawdown','−15.98%')}${line('Fund managers','Vikas Khemani · Manoj Bahety')}</div>${heading('Risk & Return Ratio')}<div class="rep-white-card">${line('Standard deviation','21.11')}${line('Sharpe ratio','0.81')}${line('Treynor ratio','14.72')}${line('Beta','1.17')}${line('R-square','0.77')}</div>${heading('Fee Structure')}<div class="rep-white-card">${line('Fixed fee','2.50%')}${line('Exit load','1.0% if exited before 12 months')}</div></div>`,cta('How Can I Start my Investment?','yield-interest'));
    frame(p.name,`<div class="rep-detail"><div class="rep-product-intro"><small>${p.firm} · PMS</small><h1>${p.name}</h1><div class="rep-metrics"><div><small>Minimum</small><strong>₹50L</strong></div><div><small>AUM · Cr</small><strong>${p.aum}</strong></div><div><small>Return on shelf</small><strong>${p.returns}</strong></div></div><p>${p.bullets.join('. ')}.</p></div>${heading('Strategy')}<div class="rep-white-card">${p.strategy}</div><p class="rep-footnote">The shelf return period and full detail terms have not yet been verified from this product page.</p></div>`,cta('How Can I Start my Investment?','yield-interest'));
  }

  function renderOtherSif() {
    const data={
      'sif-sapphire':['Sapphire Equity Long-Short Fund','Franklin Templeton','Quant-driven long-short equity with up to 25% short exposure.'],
      'sif-altiva':['Altiva Hybrid Long-Short Fund','Edelweiss Mutual Fund','For risk-averse and absolute-return seekers; capital stability over 2–3 years is a stated objective.'],
      'sif-titanium':['Titanium Hybrid Long Short Fund','Tata Mutual Fund','Dynamic long-short strategy with flexible exposure.'],
      'sif-isif':['iSIF Equity Ex Top 100 Long-Short Fund','ICICI Prudential Mutual Fund','Targets mid and small-cap stocks through a dynamic long-short approach.'],
      'sif-arudha':['Arudha Hybrid Long-Short Fund','Bandhan Mutual Fund','Stability-first portfolio with up to 65% in short to medium term debt instruments.']
    };
    const [name,manager,description]=data[state.replicaProduct]||data['sif-sapphire'];
    frame(name,`<div class="rep-detail"><div class="rep-product-intro"><small>BY ${manager.toUpperCase()}</small><h1>${name}</h1><p>${description}</p></div><div class="rep-white-card">${line('Standard minimum','₹10L')}${line('Accredited investor entry','From ₹1L')}</div><p class="rep-footnote">Only the shelf card was observed for this SIF. Risk, fees, holdings and full terms need the live detail.</p></div>`,cta('Invest','account-preflight'));
  }

  function renderSmallcase() {
    frame('smallcase',`<div class="rep-detail rep-smallcase"><div class="rep-product-intro"><small>IONIC RESEARCH BY ANGEL ONE</small><h1>Edge – Catalyst Model</h1><div class="rep-metrics"><div><small>Min. Amount</small><strong>₹3,00,000</strong></div><div><small>Return shown</small><strong>10.42%</strong></div><div><small>Risk</small><strong>High</strong></div></div><p class="rep-tag">Subscribers Only</p></div><div class="rep-tabs"><button data-replica="smallcase-overview" class="${state.replicaSmallcaseTab!=='weights'?'active':''}">Overview</button><button data-replica="smallcase-weights" class="${state.replicaSmallcaseTab==='weights'?'active':''}">Stocks &amp; Weights</button></div>${state.replicaSmallcaseTab==='weights'?`<div class="rep-pad">${heading('Rebalance timeline','Updated on need basis by Ionic Research by Angel One')}${[['15 Oct 2026','Weights updated'],['7 Oct 2026','Constituents updated'],['28 Sep 2026','Constituents updated']].map(([d,t])=>`<div class="rep-white-card">${d}<br><small>${t}</small></div>`).join('')}<p class="rep-footnote">Current constituents were behind a subscription in the observed flow.</p></div>`:`<div class="rep-pad"><p>Portfolio basket with value-unlocking catalysts: R&amp;D, capex, insider buys or profit and loss breakouts.</p>${heading('Performance')}<div class="rep-white-card"><strong>10.42%</strong><p>The period was not visible on the first smallcase screen.</p></div></div>`}</div>`,cta('See plans & benefits','smallcase-plans'));
  }

  const usRows={
    Stocks:[['NVIDIA Corporation','NVDA','$214.13','−1.43%','nvidia'],['Apple, Inc.','AAPL','$343.46','+0.43%','apple'],['Alphabet Inc. - Class A','GOOGL','$336.91','−2.32%','alphabet'],['Microsoft Corporation','MSFT','$529.05','−1.93%','microsoft']],
    ETFs:[['Defiance DT 2X','MRNX','$200.15','+8.48%','etf-mrnx'],['Lake Superior','LKSPR','$1.50','0.00%','etf-lkspr'],['2X SUI ETF','SUIL','$10.43','+4.40%','etf-suil']],
    UCITS:[['World Energy UCITS','Equity','$38.83','+50.15% 1Y','ucits-world'],['Latin American Equity','Equity','$26.10','+42.86% 1Y','ucits-latin'],['5G Connectivity UCITS','Equity','$31.82','+39.81% 1Y','ucits-5g']]
  };
  const usIndustries={
    Defence:[['Space Exploration Technologies','SPCX','$146.03','−1.74%','spcx'],['General Electric Company','GE','$313.83','+0.59%','ge'],['RTX Corp','RTX','$193.92','+3.73%','rtx'],['AIRBUS SE - UNSP ADR','EADSY','$58.53','+6.28%','eads'],['Boeing Company, The','BA','$190.21','+0.78%','boeing']],
    Semiconductor:[['NVIDIA Corporation','NVDA','$214.13','−1.43%','nvidia'],['Taiwan Semiconductor','TSM','$412.61','−2.28%','tsm'],['Broadcom Inc.','AVGO','$328.75','−4.52%','avgo'],['SK HYNIX INC - ADR','SKHY','$136.49','−6.58%','skhy'],['Micron Technology Inc.','MU','$878.84','−5.63%','mu']],
    'Oil & Energy':[['Exxon Mobil Corp.','XOM','$178.98','+2.46%','xom'],['Chevron Corporation','CVX','$224.99','+2.59%','cvx'],['SHELL PLC - ADS','SHEL','$106.66','+3.00%','shel'],['TotalEnergies SE','TTE','$91.34','+3.22%','tte'],['ConocoPhillips','COP','$146.51','+3.37%','cop']],
    Banking:[['JPMorgan Chase & Co.','JPM','$339.72','+1.25%','jpm'],['Bank of America Corp.','BAC','$51.23','−0.91%','bac'],['CHINA CONSTRUCTION BANK','CICHY','$20.03','−8.62%','cichy'],['HSBC Holdings plc','HSBC','$94.57','+0.03%','hsbc'],['Royal Bank of Canada','RY','$197.80','+0.57%','ry']],
    Biotech:[['AbbVie Inc','ABBV','$285.42','+0.71%','abbv'],['Amgen Inc.','AMGN','$432.49','−0.35%','amgn'],['Gilead Sciences Inc.','GILD','$156.19','−0.75%','gild'],['Vertex Pharmaceuticals','VRTX','$499.74','−1.77%','vrtx'],['Moderna, Inc.','MRNA','$218.01','−7.82%','mrna']],
    Software:[['Microsoft Corporation','MSFT','$529.05','−1.93%','microsoft'],['Palantir Technologies Inc','PLTR','$186.03','−7.22%','pltr'],['Oracle Corp.','ORCL','$128.23','−4.64%','orcl'],['Palo Alto Networks, Inc.','PANW','$342','−7.63%','panw'],['SAP SE','SAP','$224.29','−0.32%','sap']],
    Pharma:[['Eli Lilly and Company','LLY','$1,257.03','+0.43%','lly'],['Johnson & Johnson','JNJ','$255.56','+0.90%','jnj'],['Merck & Co. Inc.','MRK','$145.95','+0.52%','mrk'],['Roche Holding AG','RHHBY','$53.07','+6.69%','rhhby'],['Novartis AG','NVS','$150.62','+0.16%','nvs'],['ASTRAZENECA PLC','AZN','$165.41','−0.76%','azn'],['Novo Nordisk A/S','NVO','$38.83','−0.99%','nvo']]
  };
  const usIndustryRows=Object.values(usIndustries).flat();
  globalCards = function () {
    if(state.globalTab==='Managed Portfolios') return [['BlackRock Smart Beta','Moderate','27.41%','blackrock','A long-term strategy investing across persistent drivers of return.'],['The Commodity & Energy','Aggressive','8.90%','commodity','Exposure to industrial metals, energy infrastructure and uranium.'],['The Global Asset Allocation','Aggressive','12.43%','global-asset','A global multi-asset portfolio rotating across markets.'],['All Weather','Conservative','3.68%','all-weather','A diversified portfolio designed for changing market conditions.']].map(([n,r,v,o,d])=>`<article class="global-card rep-global-card"><h3>${n}</h3><p class="rep-global-desc">${d}</p><div class="rep-global-stats"><div><small>Risk Tolerance</small><b>${r} <span class="rep-risk-bars" aria-hidden="true">▂▅▇</span></b></div><div class="rep-global-return"><small>1Y Return</small><b>+${v}</b></div></div><div class="rep-global-foot"><div><small>Min. Investment</small><b>$100</b></div><button class="btn" data-open="${o}">View Details</button></div></article>`).join('');
    return `<div class="ucits-card">${(usRows[state.globalTab]||usRows.Stocks).map(([n,t,v,p,r])=>`<button class="rep-us-row" data-replica="us-${r}"><span class="rep-us-symbol">${n[0]}</span><span><b>${n}</b><small>${t}</small></span><strong>${v}<small class="${p.startsWith('+')?'green':'red'}">${p}</small></strong></button>`).join('')}${button('View All','us-list')}</div>`;
  };
  function renderUsList() {
    if (state.replicaUsExplore) {
      const industry=state.replicaIndustry||'Defence';
      const rows=usIndustries[industry]||[];
      const sector=industry==='Oil & Energy'?'Energy':industry==='Banking'?'Financials':['Biotech','Pharma'].includes(industry)?'Health Care':industry==='Defence'?'Industrials':'Information Technology';
      const listing=(state.replicaIndustryFull?rows:rows.slice(0,5)).map(([n,t,v,p,r])=>`<button class="rep-us-row" data-replica="us-${r}"><span class="rep-us-symbol">${n[0]}</span><span><b>${n}</b><small>${t} · ${sector}</small></span><strong>${v}<small class="${p.startsWith('+')?'green':'red'}">${p}</small></strong></button>`).join('');
      if(state.replicaIndustryFull){frame('Global Stocks',`<div class="rep-pad"><p class="rep-breadcrumb">Exclusives › Global › ${industry} Stocks</p>${heading(industry+' Stocks')}<p>Stocks <span style="float:right">Market Cap ↕</span></p><div class="rep-white-card">${listing}</div><input class="rep-search" aria-label="Search stocks" placeholder="Search stocks"></div>`);return;}
      frame('Global Stocks',`<div class="rep-pad"><p class="rep-breadcrumb">Exclusives › Global</p>${heading('Explore by Industry')}<div class="rep-tabs">${Object.keys(usIndustries).map(t=>`<button data-replica="us-industry-${t}" class="${industry===t?'active':''}">${t}</button>`).join('')}</div><div class="rep-white-card">${listing}${button('View All','us-category-all')}</div>${heading('Managed Portfolios')}<div class="rep-white-card">${[['BlackRock Smart Beta','27.41%','blackrock'],['The Commodity & Energy','8.90%','commodity'],['The Global Asset Allocation','12.43%','global-asset'],['All Weather','3.68%','all-weather']].map(([n,v,r])=>`<button class="rep-recommend" data-open="${r}"><b>${n}</b><strong>${v}<small>1Y return</small></strong></button>`).join('')}</div><p class="rep-footnote">Quotes captured from Ionic on 17 Oct 2026. Offered and managed by Vested Finance, Inc.</p></div>`);return;
    }
    const tab=state.globalTab; frame('Go Global with US Stocks',`<div class="rep-pad"><div class="rep-tabs">${['Managed Portfolios','Stocks','ETFs','UCITS'].map(t=>`<button data-replica="us-tab-${t}" class="${t===tab?'active':''}">${t}</button>`).join('')}</div>${tab==='Managed Portfolios'?`<div class="rep-white-card">${globalCards()}</div>`:(usRows[tab]||usRows.Stocks).map(([n,t,v,p,r])=>`<button class="rep-us-row rep-white-card" data-replica="us-${r}"><span class="rep-us-symbol">${n[0]}</span><span><b>${n}</b><small>${t}</small></span><strong>${v}<small class="${p.startsWith('+')?'green':'red'}">${p}</small></strong></button>`).join('')}<p class="rep-footnote">Prices and historical returns are snapshots. Offered and managed by Vested Finance, Inc.</p></div>`);
  }
  function renderUsStock() {
    const stock=Object.values(usRows).flat().concat(usIndustryRows).find(row=>row[4]===state.replicaStock)||usRows.Stocks[0];
    const [name,ticker,price]=stock;
    frame(name,`<div class="rep-detail"><div class="rep-product-intro"><small>${ticker} · US stock</small><h1>${name}</h1><strong class="rep-big-number">${price}</strong><p>Quote observed 17 Oct 2026. Historical price, not a live feed.</p></div>${state.replicaStock==='nvidia'?`${heading('Financials','Quarterly revenue, net profit and operating cash flow')}<div class="rep-white-card rep-bars"><i style="height:39%"></i><i style="height:50%"></i><i style="height:65%"></i><i style="height:77%"></i><i style="height:95%"></i></div>${heading('Key Metrics')}<div class="rep-white-card">${line('Return on equity','110.11%')}${line('Return on assets','60.22%')}${line('Dividend yield','0.12%')}${line('Free cash flow','$102.72B')}</div>`:''}${heading('Peer Comparison')}<p class="rep-footnote">The live Ionic detail includes peers and financial tabs. Complete detail data was observed only for NVIDIA.</p></div>`,cta('Invest Now','vested-preflight'));
  }

  function renderUsManaged() {
    const data=state.replicaProduct==='global-asset'?['The Global Asset Allocation','12.43%','Aggressive']:['The Commodity & Energy','8.90%','Aggressive'];
    frame(data[0],`<div class="rep-detail"><div class="rep-product-intro"><small>MANAGED PORTFOLIO · VESTED</small><h1>${data[0]}</h1><div class="rep-metrics"><div><small>Minimum</small><strong>$100</strong></div><div><small>1Y return</small><strong>${data[1]}</strong></div><div><small>Risk</small><strong>${data[2]}</strong></div></div></div><p class="rep-footnote">Only the product card was supplied. Fees, underlying holdings and live performance need the current Vested detail.</p></div>`,cta('Invest Now','vested-preflight'));
  }

  function renderSilver() {
    frame('ICICI Prudential Silver ETF FoF-Growth',`<div class="rep-detail"><div class="rep-product-intro"><small>COMMODITIES · SILVER</small><h1>ICICI Prudential Silver ETF FoF-Growth</h1><strong class="rep-big-number">₹31.26</strong><p>NAV on 16 Oct 2026 · +1.12% 1D</p></div>${heading('Fund Overview')}<div class="rep-white-card">${line('Minimum investment','₹100')}${line('AUM','₹6,180 Cr')}${line('Created on','2 Feb 2022')}${line('Fund ranking','#13 / 16 in Silver')}${line('Risk level','High')}</div>${heading('Returns','Trailing returns')}<div class="rep-white-card">${line('6 months','−16.2%')}${line('1 year','26.3%')}${line('3 year CAGR','40.8%')}${line('All-time CAGR','27.4%')}${line('Category 1 year','30.2%')}</div>${heading('Asset Allocation')}<div class="rep-white-card">${line('Commodity','98.9%')}${line('Other','1.1%')}${line('Main holding','ICICI Pru Silver ETF-G · 99.96%')}</div>${heading('Fund Information')}<div class="rep-white-card">${line('Expense ratio','0.66%')}${line('Exit load','1% if redeemed within 15 days')}${line('Lock-in','None')}</div><p class="rep-footnote">This is a dated screenshot replica. Past performance is not a forecast.</p></div>`,cta('Invest Now','account-preflight'));
  }
  function renderOtherFund() {
    const titles={'union-mutual':'Union Small Cap Fund Regular-Growth','nippon-mutual':'Nippon India Taiwan Equity Fund','mirae-fang':'Mirae Asset NYSE FANG+ ETF FoF','mirae-sp500':'Mirae Asset S&P 500 Top 50 ETF','icici-strategic':'ICICI Prudential Strategic Metal Fund'};
    const title=titles[state.replicaProduct]||'Mutual fund'; frame(title,`<div class="rep-detail"><div class="rep-product-intro"><small>MUTUAL FUND</small><h1>${title}</h1></div><div class="rep-white-card">${line('Product data','Open the live Ionic app to verify current NAV, fee and holdings.')}</div><p class="rep-footnote">A complete detail capture for this fund was not available. The replica does not invent figures.</p></div>`,cta('Invest Now','account-preflight'));
  }

  const oldModal=modal;
  modal=function(){
    if(state.modal==='rep-insight-sheet'){
      const kind=state.replicaInsightKind;
      const title=kind==='all-underlying'?'All Underlying':kind==='all-sectors'?'All Sector Holdings':kind==='overlap'?'Funds with Overlap':kind==='detail'?state.replicaInsightTitle:'Portfolio exposure';
      const body=kind==='all-underlying'?underlying.map(([n,p,v])=>`<div class="rep-report-option">${n}<span>${p}<br>${v}</span></div>`).join(''):kind==='detail'?`<div class="rep-report-option">${state.replicaInsightTitle}<span>${state.replicaInsightValue}</span></div><p class="rep-footnote">The live app expands this item to the contributing funds. That account-level drilldown was not captured for this entry.</p>`:'<p class="rep-footnote">Only the summary entries captured from the live app are available in this local snapshot.</p>';
      return `<div class="overlay" data-replica="close-modal"><div class="sheet rep-insight-sheet" data-action="noop"><div class="sheet-handle"></div><h2>${title}</h2>${body}</div></div>`;
    }
    if(state.modal==='rep-reports')return `<div class="overlay" data-replica="close-modal"><div class="sheet rep-report-sheet" data-action="noop"><div class="sheet-handle"></div><h2>Download Mutual Funds Reports</h2><div class="rep-report-option">Insights <span>PDF</span></div><div class="rep-report-option">Fund analysis <span>PDF</span></div><div class="rep-report-option">Holdings <span>XLS &nbsp; PDF</span></div><p class="rep-footnote">Reports in this local replica are a dated visual record, not downloadable account files.</p></div></div>`;
    if(state.modal==='rep-smallcase-plans')return `<div class="overlay" data-replica="close-modal"><div class="sheet" data-action="noop"><div class="sheet-handle"></div><h2>Plans &amp; benefits</h2><p>Get access to constituents and rebalance updates for Edge – Catalyst Model.</p><p>One-click orders · rebalance updates · SIPs</p><div class="rep-plan">₹7,080 for 6 months</div><div class="rep-plan">₹11,800 for 1 year</div>${button('Close','close-modal','dark')}</div></div>`;
    if(state.modal==='rep-vested')return `<div class="overlay" data-replica="close-modal"><div class="sheet" data-action="noop"><div class="sheet-handle"></div><h2>Continue to Vested</h2><p>Ionic asks to share your email address and phone number with Vested. Holdings, portfolio value, PAN and bank details stay with Ionic.</p><p>The replica stops before consent or data transfer.</p>${button('Not now','close-modal','dark')}</div></div>`;
    if(state.modal==='rep-accredited')return `<div class="overlay" data-replica="close-modal"><div class="sheet" data-action="noop"><div class="sheet-handle"></div><h2>Accredited investor entry</h2><p>The live app advertises ₹25L for qualifying accredited investors; the standard Yield Enhancer minimum is ₹50L.</p>${button('Close','close-modal','dark')}</div></div>`;
    if(state.modal==='rep-yield-interest')return `<div class="overlay" data-replica="close-modal"><div class="sheet" data-action="noop"><div class="sheet-handle"></div><h2>Want to learn more about Yield Enhancer?</h2><p>An Ionic investment expert will reach out within 24 hours and explain the product and transaction.</p><p>This local replica does not submit an interest request.</p>${button('Not Now','close-modal','dark')}</div></div>`;
    if(state.modal==='rep-aif-interest')return `<div class="overlay" data-replica="close-modal"><div class="sheet" data-action="noop"><div class="sheet-handle"></div><h2>Want to learn more about this AIF?</h2><p>The live app says an investment expert will reach out within 24 hours to explain the product and help with the transaction.</p><p>This local replica does not submit an interest request.</p>${button('Not Now','close-modal','dark')}</div></div>`;
    return oldModal();
  };

  document.addEventListener('click', event => {
    const custom=event.target.closest('[data-replica]'); const action=event.target.closest('[data-action]'); const open=event.target.closest('[data-open]');
    const key=custom?.dataset.replica;
    const intercept=key||action&&['risk-profile','global-explore','view-all-pms','cta','back'].includes(action.dataset.action)||open&&open.dataset.open==='sif-all';
    if(!intercept)return;
    if(action?.dataset.action==='cta'&&!['edge','rep-yield','rep-silver','rep-us-stock'].includes(state.screen))return;
    if(action?.dataset.action==='back'&&!extraScreens.has(state.screen))return;
    event.preventDefault();event.stopImmediatePropagation();
    if(key==='close-modal'){state.modal='';return render();}
    if(key?.startsWith('tx-')){state.replicaTx=key.slice(3);return render();}
    if(key?.startsWith('us-tab-')){state.globalTab=key.slice(7);return render();}
    if(key?.startsWith('us-industry-')){state.replicaIndustry=key.slice(12);state.replicaIndustryFull=false;return render();}
    if(key==='us-category-all'){state.replicaIndustryFull=true;return render();}
    if(key?.startsWith('us-')){state.replicaStock=key.slice(3);state.screen='rep-us-stock';return render();}
    if(key==='smallcase-weights'||key==='smallcase-overview'){state.replicaSmallcaseTab=key==='smallcase-weights'?'weights':'overview';return render();}
    if(key==='smallcase-plans'){state.modal='rep-smallcase-plans';return render();}
    if(key==='vested-preflight'){state.modal='rep-vested';return render();}
    if(key==='yield-interest'){state.modal='rep-yield-interest';return render();}
    if(key==='accredited'){state.modal='rep-accredited';return render();}
    if(key==='account-preflight'){state.modal='account';return render();}
    if(key==='transactions'){state.screen='rep-transactions';state.replicaTx='All';return render();}
    if(key==='mf-insights'){state.screen='rep-mf-insights';state.modal='';return render();}
    if(key==='insight-all-underlying'||key==='insight-all-sectors'||key==='insight-overlap'){state.replicaInsightKind=key==='insight-all-underlying'?'all-underlying':key==='insight-all-sectors'?'all-sectors':'overlap';state.modal='rep-insight-sheet';return render();}
    if(key?.startsWith('insight-')){const row=event.target.closest('.rep-insight-row');state.replicaInsightKind='detail';state.replicaInsightTitle=row?.querySelector('b')?.textContent||'Portfolio exposure';state.replicaInsightValue=row?.querySelector('strong')?.textContent||'';state.modal='rep-insight-sheet';return render();}
    if(key==='all-holdings'){state.screen='rep-holdings';return render();}
    if(key==='risk-profile'||action?.dataset.action==='risk-profile'){state.screen='rep-risk-intro';state.modal='';return render();}
    if(key==='risk-start'){state.screen='rep-risk-question';return render();}
    if(key==='risk-answer'){return;}
    if(key==='us-list'||action?.dataset.action==='global-explore'){state.screen='rep-us-list';state.replicaUsExplore=!!action;state.replicaIndustryFull=false;state.globalTab=state.globalTab||'Stocks';return render();}
    if(key==='recommended-funds'){state.screen='fund-list';state.mfListTab='Ionic Recommended';state.mfQuery='';return render();}
    if(open?.dataset.open==='sif-all'){state.screen='rep-sif-list';return render();}
    if(action?.dataset.action==='view-all-pms'){state.screen='rep-pms-list';state.modal='';return render();}
    if(action?.dataset.action==='cta'&&state.screen==='edge'){state.screen='rep-smallcase';return render();}
    if(action?.dataset.action==='back'){if(state.screen==='rep-us-list'&&state.replicaIndustryFull){state.replicaIndustryFull=false;return render();}const from=state.screen;state.screen='home';state.homeTab=['rep-transactions','rep-mf-insights','rep-holdings','rep-risk-intro','rep-risk-question','rep-import-otp'].includes(from)?'portfolio':'exclusives';state.modal='';return render();}
    if(key==='portfolio-report'){state.modal='rep-reports';return render();}
    if(key==='import-stocks'){state.screen='rep-import-otp';state.modal='';return render();}
    if(key==='otp-info'){return;}
    if(['tax-report','capital-gains','trend-metal','trend-offshore'].includes(key)){state.modal='unseen';state.unseenName='This account action was not completed in the live walkthrough';return render();}
  },true);
  const syncClock = () => { if(app.dataset)app.dataset.clock = new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Kolkata'}).format(new Date()); };
  syncClock(); window.setInterval(syncClock,60000);
  let mouseSwipe = null;
  let blockSwipeClickUntil = 0;
  document.addEventListener('pointerdown', e => {
    const rail=e.target.closest('.hscroll,.global-tabs,.rep-tabs,.fund-list-tabs');
    if(!rail||e.pointerType!=='mouse'||e.button!==0)return;
    mouseSwipe={rail,x:e.clientX,left:rail.scrollLeft,moved:false};
  },true);
  document.addEventListener('pointermove', e => {
    if(!mouseSwipe)return;
    const dx=e.clientX-mouseSwipe.x;
    if(Math.abs(dx)>5){mouseSwipe.moved=true;mouseSwipe.rail.scrollLeft=mouseSwipe.left-dx;mouseSwipe.rail.classList.add('mouse-swiping');e.preventDefault();}
  },true);
  document.addEventListener('pointerup', e => {
    if(!mouseSwipe)return;
    const dx=e.clientX-mouseSwipe.x;
    if(Math.abs(dx)>5){mouseSwipe.moved=true;mouseSwipe.rail.scrollLeft=mouseSwipe.left-dx;}
    if(mouseSwipe.moved)blockSwipeClickUntil=Date.now()+1000;
    mouseSwipe.rail.classList.remove('mouse-swiping');mouseSwipe=null;
  },true);
  document.addEventListener('click', e => {
    if(Date.now()>blockSwipeClickUntil)return;
    if(e.target.closest('.hscroll,.global-tabs,.rep-tabs,.fund-list-tabs')){e.preventDefault();e.stopImmediatePropagation();blockSwipeClickUntil=0;}
  },true);
  document.addEventListener('mousedown', e => {
    const rail=e.target.closest('.hscroll,.global-tabs,.rep-tabs,.fund-list-tabs');
    if(!rail||e.button!==0||mouseSwipe)return;
    mouseSwipe={rail,x:e.clientX,left:rail.scrollLeft,moved:false};
  },true);
  document.addEventListener('mousemove', e => {
    if(!mouseSwipe||!(e.buttons&1))return;
    const dx=e.clientX-mouseSwipe.x;
    if(Math.abs(dx)>5){mouseSwipe.moved=true;mouseSwipe.rail.scrollLeft=mouseSwipe.left-dx;mouseSwipe.rail.classList.add('mouse-swiping');e.preventDefault();}
  },true);
  document.addEventListener('mouseup', e => {
    if(!mouseSwipe)return;
    const dx=e.clientX-mouseSwipe.x;
    if(Math.abs(dx)>5){mouseSwipe.moved=true;mouseSwipe.rail.scrollLeft=mouseSwipe.left-dx;blockSwipeClickUntil=Date.now()+1000;}
    mouseSwipe.rail.classList.remove('mouse-swiping');mouseSwipe=null;
  },true);
  render();
})();
