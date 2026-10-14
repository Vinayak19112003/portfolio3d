import { build } from 'esbuild';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
const bundle = new URL('../node_modules/.cache/portfolio-prerender.mjs', import.meta.url);
await build({stdin:{contents:'export {default as App} from "./App"; export {projects} from "./data/projects";',resolveDir:process.cwd(),loader:'tsx'},outfile:bundle.pathname,bundle:true,platform:'node',format:'esm',jsx:'automatic',external:['react','react-dom','react-dom/server','lucide-react']});
const { App, projects } = await import(bundle.href);
const template = await readFile('dist/index.html','utf8');
const origin='https://www.vinayakdeshmuk.in';
const escape = text => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const pages=[{path:'/',title:'Vinayak Deshmuk — Digital experiences & moving stories',description:'Independent creative technologist building thoughtful websites, cinematic films, and intelligent workflows. Explore selected work and start a conversation.'},{path:'/open-source/',title:'Open-source contributions — Vinayak Deshmuk',description:'Selected merged contributions to Pylint, PDM, Narwhals, River, NodeSecure, and SpoonOS, with direct pull-request evidence and community features.'},...projects.map(p=>({path:`/work/${p.id}/`,title:`${p.title} — Vinayak Deshmuk`,description:p.description,poster:p.poster})),{path:'/404',title:'Page not found — Vinayak Deshmuk',description:'Return to Vinayak Deshmuk’s selected work.'}];
for(const page of pages){
 let html=template.replace(/<div id="root">[\s\S]*?<!--app-end-->/,`<div id="root">${renderToString(createElement(App,{initialPath:page.path}))}</div><!--app-end-->`)
 .replace(/<title>[^<]*<\/title>/,`<title>${escape(page.title)}</title>`)
 .replace(/(<meta\s+name="description"\s+content=")[^"]*/,'$1'+escape(page.description))
 .replace(/(<meta\s+property="og:title"\s+content=")[^"]*/,'$1'+escape(page.title))
 .replace(/(<meta\s+property="og:description"\s+content=")[^"]*/,'$1'+escape(page.description))
 .replace(/(<meta\s+property="og:url"\s+content=")[^"]*/,'$1'+origin+page.path)
 .replace(/(<link rel="canonical" href=")[^"]*/,'$1'+origin+page.path);
 if(page.path !== '/' && page.path !== '/work/tracereel/') html=html.replace(/<link rel="preload" href="\/images\/tracereel-showcase.jpg" as="image"\s*\/>/,'');
 if(page.poster) html=html.replace(/(<meta\s+property="og:image"\s+content=")[^"]*/,'$1'+origin+page.poster);
 if(page.path==='/404') html=html.replace('</head>','<meta name="robots" content="noindex" /></head>');
 const directory=page.path==='/404'?'dist':`dist${page.path}`;
 await mkdir(directory,{recursive:true});
 await writeFile(`${directory}${directory.endsWith('/')?'':'/'}${page.path==='/404'?'404.html':'index.html'}`,html);
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p=>p.path!=='/404').map(p=>`  <url><loc>${origin}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
await rm(bundle);
console.log(`Prerendered ${pages.length} pages with individual metadata.`);
