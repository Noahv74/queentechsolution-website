// Adds extra traps to every level, keeping only those the solver can still beat at 0.2 s input.
// node gen.js <gamesDir> <from> <to> <seed>  -> writes extra-<from>.json
const path=require('path'),fs=require('fs');
const dir=process.argv[2],from=+process.argv[3],to=+process.argv[4];let seed=+(process.argv[5]||7)+from;
global.window={};const E=require(path.join(dir,'glitch-engine.js'));window.GlitchEngine=E;require(path.join(dir,'glitch-levels2.js'));
const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
const CH=12,ACTS=[{},{l:1},{r:1},{j:1},{l:1,j:1},{r:1,j:1}];
function key(st){const p=st.p;let k=[Math.round(p.x/3),Math.round(p.y/3),Math.round(p.vx/40),Math.round(p.vy/80),p.ground?1:0,p.held?1:0,st.door].join(',');for(const e of st.ents)k+=e.s[0];for(const s of st.spikes)k+=(s.up>0?1:0);return k;}
function score(st){const d=st.doors[st.door],p=st.p;return st.door*5000-Math.abs(p.x-d.x)-Math.abs(p.y-d.y)*0.5;}
function solve(i,beam=700,maxT=80){let st=E.create(i,0),front=[{st}],seen=new Set([key(st)]);
 for(let d=0;d<Math.ceil(maxT/(CH/60));d++){let next=[];
  for(const n of front)for(const a of ACTS){const s=structuredClone(n.st);for(let f=0;f<CH;f++){E.step(s,a);s.ev.length=0;if(s.dead||s.won)break;}
   if(s.dead)continue;if(s.won)return s.t;const k=key(s);if(seen.has(k))continue;seen.add(k);next.push({st:s,sc:score(s)});}
  if(!next.length)return 0;next.sort((a,b)=>b.sc-a.sc);
  if(next.length>beam){const top=next.slice(0,beam*0.7|0),rest=next.slice(beam*0.7|0);for(let r=0;r<beam*0.3&&rest.length;r++)top.push(rest.splice(rnd()*rest.length|0,1)[0]);next=top;}
  front=next;}return 0;}
function setc(map,c,r,ch){map[r]=map[r].slice(0,c)+ch+map[r].slice(c+1);}
function candidates(L){const m=L.map,P=[];let pc=0;m.forEach((row)=>{const i=row.indexOf('P');if(i>=0)pc=i;});
 const doorCols=L.doors.map(d=>d[0]);
 for(let r=2;r<17;r++)for(let c=2;c<30;c++){
  if(Math.abs(c-pc)<4||doorCols.some(x=>Math.abs(x-c)<3))continue;
  if(m[r][c]!=='.'||m[r+1][c]!=='#')continue;
  P.push({t:'h',c,r});                                        // hidden spike on the floor
  if(m[r+1][c+1]==='#'&&r+1<17&&m[r][c+1]==='.')P.push({t:'f',c,r:r+1});  // floor that falls (2 tiles)
  let top=r-1;while(top>1&&m[top][c]==='.')top--; if(top>=1&&m[top][c]==='#'&&r-top>=4)P.push({t:'d',c,r:top+1}); // ceiling spike
 }return P;}
const out={};
for(let i=from;i<=to;i++){const L=E.LEVELS[i],orig=L.map.slice(),added=[];const base=solve(i);
 if(!base){console.log('L'+(i+1)+' unsolvable before');continue;}
 const want=i<10?1:2; let tries=0; const C=candidates(L);
 while(added.length<want&&tries<10&&C.length){tries++;const k=C.splice(rnd()*C.length|0,1)[0];const save=L.map.slice();
  if(k.t==='f'){setc(L.map,k.c,k.r,'f');setc(L.map,k.c+1,k.r,'f');}else setc(L.map,k.c,k.r,k.t);
  const t=solve(i);if(t){added.push(k);}else L.map=save;}
 out[i]=added.map(k=>k.t==='f'?[[k.c,k.r,'f'],[k.c+1,k.r,'f']]:[[k.c,k.r,k.t]]).flat();
 console.log('L'+(i+1),'added',added.map(k=>k.t+'@'+k.c+','+k.r).join(' '),'tries',tries);
}
fs.writeFileSync('extra-'+from+'.json',JSON.stringify(out));
