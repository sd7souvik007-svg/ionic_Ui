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
  clearTimeout(timer);timer=null;intro.hidden=true;intro.classList.remove('pw-playing','pw-manual');
  inertState.forEach(([el,value])=>el.inert=value);inertState=[];
  if(restoreFocus&&origin?.isConnected)origin.focus({preventScroll:true});
 }
 function beginWelcome(){
  if(!intro.hidden)return;
  origin=document.getElementById('jumpMore');
  inertState=[...phone.children].filter(el=>el!==intro).map(el=>[el,el.inert]);inertState.forEach(([el])=>el.inert=true);
  intro.hidden=false;intro.classList.remove('pw-manual');intro.classList.add('pw-playing');
  intro.querySelector('.pw-skip').focus({preventScroll:true});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setTimeout(()=>finishWelcome(),3200);
  else intro.classList.add('pw-manual');
 }
 const changeCategory=showCategory;
 showCategory=function(view){const previous=activeCategory;if(view!=='flagship')finishWelcome(false);changeCategory(view);if(view==='flagship'&&previous!=='flagship')beginWelcome()};
 document.getElementById('jumpMore').onclick=()=>{showCategory('flagship');beginWelcome()};
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
