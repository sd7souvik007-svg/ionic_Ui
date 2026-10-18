/* Shared presentation shell for the proposal and its captured detail screens. */
(()=>{
 const screen=document.querySelector('.phone,.app-shell');
 if(!screen)return;
 const frame=document.createElement('div');frame.className='device-frame';
 const top=document.createElement('div');top.className='device-top';top.setAttribute('aria-hidden','true');
 top.innerHTML='<span class="device-camera"></span>';
 const bottom=document.createElement('div');bottom.className='device-bottom';bottom.setAttribute('aria-hidden','true');
 screen.before(frame);frame.append(top,screen,bottom);
})();
