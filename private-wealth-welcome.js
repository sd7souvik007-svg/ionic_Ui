/* A short, skippable Private Wealth welcome, contained by the existing phone shell. */
(()=>{
 const phone=document.querySelector('.phone');
 const intro=document.createElement('section');intro.id='privateWealthWelcome';intro.className='pw-intro';intro.hidden=true;intro.setAttribute('role','dialog');intro.setAttribute('aria-modal','true');intro.setAttribute('aria-labelledby','pwWelcomeTitle');
 intro.innerHTML='<div class="pw-brand">IONIC <span>PRIVATE WEALTH</span></div><button class="pw-skip" type="button">Skip <span aria-hidden="true">↗</span></button><div class="pw-welcome-content"><div class="pw-emblem" aria-hidden="true"><i class="pw-ring pw-ring-one"></i><i class="pw-ring pw-ring-two"></i><i class="pw-ring pw-ring-three"></i><span class="pw-flower">'+aiFlower()+'</span><span class="pw-orbit-dot"></span></div><span class="pw-eyebrow">A DIFFERENT PERSPECTIVE</span><h2 id="pwWelcomeTitle">Welcome to<br>the inner circle.</h2><div class="pw-divider" aria-hidden="true"></div><p>Specialist investment strategies.<br>Brought together by Ionic.</p><span class="pw-products">PMS <i>·</i> AIF <i>·</i> SIF</span></div><div class="pw-welcome-bottom"><button class="pw-enter" type="button">Explore Private Wealth <span aria-hidden="true">→</span></button><div class="pw-progress" aria-hidden="true"><i></i></div></div>';
 phone.append(intro);
 let timer=null,origin=null,inertState=[];
 function stopAutomatic(){clearTimeout(timer);timer=null;intro.classList.add('pw-manual')}
 function finishWelcome(restoreFocus=true){
  if(intro.hidden)return;
  clearTimeout(timer);timer=null;
  const close=()=>{intro.hidden=true;intro.classList.remove('pw-playing','pw-manual','pw-leaving');inertState.forEach(([el,value])=>el.inert=value);inertState=[];if(restoreFocus&&origin?.isConnected)origin.focus({preventScroll:true})};
  if(restoreFocus&&!matchMedia('(prefers-reduced-motion: reduce)').matches){intro.classList.add('pw-leaving');timer=setTimeout(close,220)}else close();
 }
 function beginWelcome(){
  if(!intro.hidden)return;
  origin=document.querySelector('[data-pw-exit]');
  inertState=[...phone.children].filter(el=>el!==intro).map(el=>[el,el.inert]);inertState.forEach(([el])=>el.inert=true);
  intro.hidden=false;intro.classList.remove('pw-manual');intro.classList.add('pw-playing');
  intro.querySelector('.pw-skip').focus({preventScroll:true});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setTimeout(()=>finishWelcome(),3200);
  else intro.classList.add('pw-manual');
 }
 const focusBar=document.createElement('nav');focusBar.className='pw-focus-bar';focusBar.setAttribute('aria-label','Private Wealth navigation');focusBar.innerHTML='<button data-pw-exit type="button"><span aria-hidden="true">‹</span> Back to Exclusives</button><span>PRIVATE WEALTH <small>PMS · AIF · SIF</small></span>';
 document.querySelector('.quick-nav').after(focusBar);
 function focusPrivate(enabled){phone.classList.toggle('private-mode',enabled)}
 focusPrivate(activeCategory==='flagship');
 const transition=document.createElement('section');transition.className='category-transition';transition.id='categoryTransition';transition.hidden=true;transition.setAttribute('role','dialog');transition.setAttribute('aria-modal','true');transition.setAttribute('aria-labelledby','categoryTransitionTitle');phone.append(transition);
 let shortTimer=null,shortInert=[],completeShort=null,lastBrowse=activeCategory==='flagship'?'stocks':activeCategory;
 function playTransition(view,done,leaving=false){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){done();return}
  if(!transition.hidden)return;
  const contents=leaving?{label:'IONIC EXCLUSIVES',title:view==='portfolio'?'Your portfolio':'Back to Exclusives',sub:'Your next choice, in one place.',image:'global-horizon.webp'}:view==='funds'?{label:'FUNDS & BASKETS',title:'Expert selection.\nYour investment.',sub:'Explore funds, portfolios and baskets.',image:'hero-tiles-v2.webp'}:{label:'IONIC GLOBAL',title:'A world of\npossibilities.',sub:'Explore US stocks.',image:'global-phone.webp'};
  transition.dataset.kind=leaving?'exit':view;
  transition.innerHTML='<button class="category-skip" type="button">Skip</button><div class="category-transition-art"><img src="assets/'+contents.image+'" alt=""></div><span class="category-transition-label">'+contents.label+'</span><h2 id="categoryTransitionTitle">'+contents.title.replace('\n','<br>')+'</h2><p>'+contents.sub+'</p><span class="category-transition-line" aria-hidden="true"></span>';
  shortInert=[...phone.children].filter(el=>el!==transition).map(el=>[el,el.inert]);shortInert.forEach(([el])=>el.inert=true);
  completeShort=()=>{clearTimeout(shortTimer);transition.hidden=true;shortInert.forEach(([el,value])=>el.inert=value);shortInert=[];completeShort=null;done()};
  transition.hidden=false;transition.querySelector('button').onclick=()=>completeShort?.();transition.querySelector('button').focus({preventScroll:true});shortTimer=setTimeout(()=>completeShort?.(),leaving?900:1000);
 }
 const changeCategory=showCategory;
 showCategory=function(view){
  const previous=activeCategory;
  if(view==='flagship'){if(previous!=='flagship')lastBrowse=previous;changeCategory(view);focusPrivate(true);if(previous!=='flagship')beginWelcome();return}
  const reveal=()=>{changeCategory(view);focusPrivate(false);lastBrowse=view;document.getElementById(view==='funds'?'jumpFunds':'jumpGlobal').focus({preventScroll:true})};
  if(previous==='flagship'){finishWelcome(false);playTransition(view,reveal,true)}
  else if(previous!==view)playTransition(view,reveal);
  else reveal();
 };
 document.getElementById('jumpMore').onclick=()=>{showCategory('flagship');beginWelcome()};
 focusBar.querySelector('button').onclick=()=>showCategory(lastBrowse);
 document.getElementById('exclusivesNav').onclick=()=>{if(activeCategory==='flagship')showCategory(lastBrowse);else document.getElementById('scroll').scrollTo({top:0,behavior:'smooth'})};
 document.getElementById('portfolioNav').onclick=()=>{if(activeCategory==='flagship')playTransition('portfolio',()=>location.href='./app.html?section=portfolio',true);else location.href='./app.html?section=portfolio'};
 document.addEventListener('keydown',e=>{if(transition.hidden)return;if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();completeShort?.()}else if(e.key==='Tab'){e.preventDefault();transition.querySelector('button').focus()}},true);
 intro.querySelector('.pw-skip').onclick=()=>finishWelcome();intro.querySelector('.pw-enter').onclick=()=>finishWelcome();
 intro.addEventListener('pointerdown',stopAutomatic);
 document.addEventListener('keydown',e=>{
  if(intro.hidden)return;
  stopAutomatic();
  if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();finishWelcome();return}
  if(e.key==='Tab'){
   const first=intro.querySelector('.pw-skip'),last=intro.querySelector('.pw-enter');
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
  }
 },true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&!intro.hidden)stopAutomatic()});
})();
