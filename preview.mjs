import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'public');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.ttf':'font/ttf','.woff2':'font/woff2','.json':'application/json'};
const port=Number(process.env.PORT||4385);
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/book'||url.pathname.startsWith('/book/')){
   res.writeHead(302,{Location:(url.pathname.slice(5)||'/')+url.search});res.end();return;
  }
  let p=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(p!==root&&!p.startsWith(root+path.sep))throw Error('Invalid path');
  if((await stat(p)).isDirectory())p=path.join(p,'index.html');
  const data=await readFile(p);
  res.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Страница не найдена');}
}).listen(port,'127.0.0.1',()=>console.log(`Book preview: http://127.0.0.1:${port}/`));
