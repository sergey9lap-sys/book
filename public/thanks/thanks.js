const invite=document.querySelector('#telegram-invite');
const copy=document.querySelector('#copy-invite');
const status=document.querySelector('#copy-status');
if(invite&&copy&&navigator.clipboard?.writeText){
 copy.hidden=false;
 copy.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(invite.href);status.textContent='Приглашение скопировано';}
  catch{status.textContent='Не получилось скопировать. Нажмите и удерживайте кнопку «Присоединиться к группе», чтобы скопировать ссылку.';}
 });
}
