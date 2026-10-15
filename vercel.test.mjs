import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('standalone Vercel build serves site at domain root and preserves old route redirects',async()=>{
 const config=JSON.parse(await readFile(new URL('./vercel.json',import.meta.url),'utf8'));
 assert.equal(config.outputDirectory,'dist');
 assert.equal(config.framework,null);
 assert.equal(config.buildCommand,'npm run build');
 assert.ok(config.redirects.some(r=>r.source==='/book/:path*'&&r.destination==='/:path*'));
 const italy=await readFile(new URL('./public/italy/index.html',import.meta.url),'utf8');
 assert.match(italy,/<base href="\/">/);
 assert.doesNotMatch(italy,/<base href="\/book\//);
 const main=await readFile(new URL('./public/index.html',import.meta.url),'utf8');
 assert.match(main,/35Vu3FnlHEaj5C-T3T898Q/);
 assert.match(main,/jz5rphMXq0uM4AYTCUEX2w/);
 assert.equal((main.match(/method="get" target="_blank" rel="noopener noreferrer"/g)||[]).length,3);
});
