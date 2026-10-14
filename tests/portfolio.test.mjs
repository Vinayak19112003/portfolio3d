import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { buildSync } from 'esbuild';
import { JSDOM } from 'jsdom';
const require = createRequire(import.meta.url);
buildSync({entryPoints:['App.tsx'],outfile:'node_modules/.cache/portfolio-ui-test.cjs',bundle:true,platform:'node',format:'cjs',jsx:'automatic',external:['react','react-dom','react-dom/client']});
const React = require('react');
const { act } = React;
const App = require('../node_modules/.cache/portfolio-ui-test.cjs').default;

test('prerendered homepage hydrates, navigation works, and enquiry prepares an email without submitting',async()=>{
 const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'https://www.vinayakdeshmuk.in/'});
 for(const key of ['window','document','navigator','HTMLElement','HTMLInputElement','HTMLTextAreaElement','HTMLSelectElement','FormData','Event','MouseEvent'])Object.defineProperty(globalThis,key,{value:dom.window[key],configurable:true,writable:true});
 globalThis.IS_REACT_ACT_ENVIRONMENT=true;
 const {renderToString}=require('react-dom/server');
 const {hydrateRoot}=require('react-dom/client');
 const errors=[];
 document.getElementById('root').innerHTML=renderToString(React.createElement(App,{initialPath:'/'}));
 let root;
 await act(async()=>{root=hydrateRoot(document.getElementById('root'),React.createElement(App),{onRecoverableError:e=>errors.push(e.message)});});
 assert.deepEqual(errors,[]);
 assert.equal(document.querySelectorAll('.feature').length,5);
 assert.deepEqual([...document.querySelectorAll('.work-leads .feature h3')].map(el=>el.textContent),['TraceReel','Meet Neo']);
 assert.ok(document.querySelector('.support-grid .feature-groom-room'));
 assert.equal(document.querySelector('.work-leads .feature-groom-room'),null);
 assert.equal(document.querySelectorAll('img[src="/images/groom-interface.jpg"]').length,1, 'Groom Room preview appears once on the homepage');
 assert.equal(document.querySelectorAll('h1').length,1);
 assert.equal(document.querySelector('script[src="https://www.instagram.com/embed.js"]'),null);
 const paths=new Set([...document.querySelectorAll('.feature-art')].map(a=>a.getAttribute('href')));
 assert.equal(paths.size,5);
 for(const a of document.querySelectorAll('a[href^="#"], a[href^="/#"]'))assert.ok(document.getElementById(a.hash.slice(1)),a.href);
 for(const a of document.querySelectorAll('a[target="_blank"]'))assert.match(a.rel,/noopener/);
 assert.doesNotMatch(document.body.textContent,/TradeZend|Polymarket|History.?s Minds|win rate/i);
 const click=async el=>{assert.ok(el);await act(async()=>el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true})));};
 await click(document.querySelector('.menu-toggle'));
 assert.equal(document.querySelector('.menu-toggle').getAttribute('aria-expanded'),'true');
 await click(document.querySelector('#site-navigation a[href="/#work"]'));
 assert.equal(document.querySelector('.menu-toggle').getAttribute('aria-expanded'),'false');
 document.querySelector('[name="name"]').value='Test Client';
 document.querySelector('[name="email"]').value='client@example.com';
 document.querySelector('[name="service"]').value='Video editing or brand film';
 document.querySelector('[name="brief"]').value='A finished promotional film for our new website.';
 await act(async()=>document.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));
 const email=document.querySelector('.prepared-brief a');
 assert.match(email.href,/^mailto:vinayak19112003@gmail.com/);
 assert.match(new URL(email.href).searchParams.get('body'),/Test Client/);
 assert.match(document.querySelector('.form-note').textContent,/does not submit or store/);
 await click(document.querySelector('.copy-button'));
 assert.match(document.querySelector('[role="status"]').textContent,/Copy is unavailable/);
 await act(async()=>{const s=document.querySelector('[name="service"]');s.value='Website or application';s.dispatchEvent(new Event('change',{bubbles:true}));});
 assert.equal(document.querySelector('.prepared-brief'),null);
 await act(async()=>root.unmount());
 dom.window.close();
});

test('direct project routes hydrate and load only the correct Instagram reel on request',async()=>{
 const {renderToString}=require('react-dom/server');
 const {hydrateRoot}=require('react-dom/client');
 for(const [id,title,reel] of [['neo-film','Meet Neo','DeeDdWPo_aR'],['branzyne-film','Branzyne — Brand Promo','Ded3kOWTovl'],['groom-room','Groom Room by Asha'],['tracereel','TraceReel'],['mathlens','MathLens']]){
  const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:`https://www.vinayakdeshmuk.in/work/${id}/`});
  for(const key of ['window','document','navigator','HTMLElement','Event','MouseEvent'])Object.defineProperty(globalThis,key,{value:dom.window[key],configurable:true,writable:true});
  document.getElementById('root').innerHTML=renderToString(React.createElement(App,{initialPath:`/work/${id}/`}));
  const errors=[];let root;
  await act(async()=>{root=hydrateRoot(document.getElementById('root'),React.createElement(App),{onRecoverableError:e=>errors.push(e.message)});});
  assert.deepEqual(errors,[]);
  assert.equal(document.querySelector('h1').textContent,title);
  if(id==='tracereel') assert.equal(document.querySelector('.case-actions a').href,'https://trace-to-smooth-showcase.lovable.app/');
  assert.equal(document.querySelector('.back-link').getAttribute('href'),'/#work');
  assert.equal(document.querySelector('video'),null);
  assert.equal(document.querySelector('a[download]'),null);
  assert.equal(document.querySelector('script[src="https://www.instagram.com/embed.js"]'),null);
  if(reel){
   const url=`https://www.instagram.com/reel/${reel}/`;
   assert.equal(document.querySelector('.instagram-link a').href,url);
   await act(async()=>document.querySelector('.film-load').dispatchEvent(new MouseEvent('click',{bubbles:true})));
   assert.equal(document.querySelector('.instagram-media').dataset.instgrmPermalink,url);
   assert.equal(document.querySelectorAll('script[src="https://www.instagram.com/embed.js"]').length,1);
   document.querySelector('script[src="https://www.instagram.com/embed.js"]').dispatchEvent(new Event('error'));
   assert.equal(document.querySelector('.instagram-link a').href,url);
   assert.equal(document.querySelector('.instagram-media a').href,url);
  }
  await act(async()=>root.unmount());
  assert.equal(document.querySelector('.instagram-reel'),null);
  dom.window.close();
 }
});

test('public media references exist and private repositories are excluded',()=>{
 const data=readFileSync('data/projects.ts','utf8');
 const app=readFileSync('App.tsx','utf8');
 for(const match of (data+app).matchAll(/['"]\/(images|media)\/([^'"]+)['"]/g))assert.ok(existsSync('public/'+match[1]+'/'+match[2]),match[0]);
 assert.doesNotMatch(data,/github\.com\/Vinayak19112003\/(branzyne|plato-reels|agent-video-studio|happy-paws-slots)/i);
 assert.doesNotMatch(data,/\/media\/.*\.mp4/);
});
