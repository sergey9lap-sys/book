// Progressive enhancement: original photographs and their layout remain intact.
const photos=[...document.querySelectorAll('main img')].filter(img=>
  /assets\/live\/.*\.(webp|jpg)$/.test(img.getAttribute('src')) ||
  /passport-original\.webp$/.test(img.getAttribute('src')) || img.closest('.event-scene'));
if(photos.length && typeof HTMLDialogElement!=='undefined'){
  const dialog=document.createElement('dialog');
  dialog.className='photo-viewer';
  dialog.setAttribute('aria-label','Просмотр фотографии');
  dialog.innerHTML='<button class="photo-viewer-close" type="button" aria-label="Закрыть фотографию" autofocus><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.append(dialog);
  const image=dialog.querySelector('img'), caption=dialog.querySelector('figcaption');
  const closeButton=dialog.querySelector('button');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  let trigger, animation, closing=false, oldOverflow;
  function motion(open,keyboard){
    animation?.cancel();
    const still=reduced.matches||keyboard;
    const small=still?'none':'scale(.96)';
    animation=dialog.querySelector('figure').animate(
      open?[{opacity:0,transform:small},{opacity:1,transform:'none'}]:[{opacity:1,transform:'none'},{opacity:0,transform:small}],
      {duration:keyboard?0:reduced.matches?120:open?280:180,easing:getComputedStyle(document.documentElement).getPropertyValue('--ease').trim(),fill:'both'});
    return animation.finished.catch(()=>{});
  }
  async function close(keyboard=false){
    if(closing||!dialog.open)return;
    closing=true;
    await motion(false,keyboard);
    dialog.close();
  }
  dialog.addEventListener('close',()=>{
    document.documentElement.style.overflow=oldOverflow;
    animation?.cancel();closing=false;
    trigger?.focus({preventScroll:true});
  });
  dialog.addEventListener('cancel',event=>{event.preventDefault();close(true);});
  closeButton.addEventListener('click',event=>close(event.detail===0));
  dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
  for(const photo of photos){
    // Avoid wrapping: direct-child photo selectors define the existing album layout.
    photo.classList.add('photo-zoom');
    photo.tabIndex=0;photo.setAttribute('role','button');
    photo.setAttribute('aria-haspopup','dialog');
    photo.setAttribute('aria-label',`Увеличить фото: ${photo.alt}`);
    function open(keyboard){
      if(dialog.open||Date.now()<Number(photo.dataset.suppressZoomUntil||0))return;
      trigger=photo;
      image.alt=photo.alt;caption.textContent=photo.alt;
      image.onerror=()=>{image.onerror=null;image.src=photo.currentSrc||photo.src;};
      image.src=photo.getAttribute('src').replace(/-480\.webp$/,'-1200.webp');
      oldOverflow=document.documentElement.style.overflow;
      document.documentElement.style.overflow='hidden';
      dialog.showModal();motion(true,keyboard);
    }
    photo.addEventListener('click',event=>open(event.detail===0));
    photo.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();open(true);}
    });
  }
}
