// Beam-search solver for Glitch Run. node solve.js <gamesDir> [chunkFrames] [levels...]
const path=require('path');
const dir=process.argv[2]; const CH=+(process.argv[3]||12);
global.window={};
const E=require(path.join(dir,'glitch-engine.js'));
global.window.GlitchEngine=E;require(path.join(dir,'glitch-levels2.js'));if(require('fs').existsSync(path.join(dir,'glitch-extra.js')))require(path.join(dir,'glitch-extra.js'));
const ACTS=[{},{l:1},{r:1},{j:1},{l:1,j:1},{r:1,j:1}];
const clone=s=>structuredClone(s);
function key(st){const p=st.p;let k=[Math.round(p.x/3),Math.round(p.y/3),Math.round(p.vx/40),Math.round(p.vy/80),p.ground?1:0,p.held?1:0,st.door].join(',');
 for(const e of st.ents)k+=e.s[0];for(const s of st.spikes)k+=(s.up>0?1:0);return k;}
function score(st){const d=st.doors[st.door];const p=st.p;const dx=Math.abs(p.x-d.x),dy=Math.abs(p.y-d.y);return st.door*5000-dx-dy*0.5;}
function solve(i,beam=+(process.env.BEAM||800),maxT=90){
 let st=E.create(i,0); let front=[{st,plan:[]}]; const seen=new Set([key(st)]);
 const maxSteps=Math.ceil(maxT/(CH/60));
 for(let d=0;d<maxSteps;d++){
  let next=[];
  for(const n of front){for(let a=0;a<ACTS.length;a++){
   const s=clone(n.st);
   for(let f=0;f<CH;f++){E.step(s,ACTS[a]);s.ev.length=0;if(s.dead||s.won)break;}
   if(s.dead)continue;
   if(s.won)return {ok:true,t:+(s.t).toFixed(1),plan:n.plan.concat(a)};
   const k=key(s);if(seen.has(k))continue;seen.add(k);
   next.push({st:s,plan:n.plan.concat(a),sc:score(s)});
  }}
  if(!next.length)return {ok:false,why:'dead end',d};
  next.sort((a,b)=>b.sc-a.sc);
  // keep best plus some random diversity
  if(next.length>beam){const top=next.slice(0,Math.floor(beam*0.7));const rest=next.slice(Math.floor(beam*0.7));for(let r=0;r<beam*0.3&&rest.length;r++){top.push(rest.splice(Math.floor(Math.random()*rest.length),1)[0]);}next=top;}
  front=next;
 }
 return {ok:false,why:'timeout'};
}
const lv=process.argv.slice(4).map(Number);const list=lv.length?lv:[...Array(E.LEVELS.length).keys()];
const out={};const t0=Date.now();
for(const i of list){const r=solve(i);out[i]=r;process.stdout.write((r.ok?'.':'X'+(i+1)+' '));}
console.log('\nfail:',Object.keys(out).filter(k=>!out[k].ok).map(k=>+k+1).join(',')||'none','  secs',((Date.now()-t0)/1000).toFixed(0));
require('fs').writeFileSync('result-'+CH+'.json',JSON.stringify(out));
