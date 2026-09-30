import React from 'react';
export function DepthStage({tilt=1.5,perspective=1800,children,style,height}){
const ref=React.useRef(null);const [r,setR]=React.useState({x:0,y:0});
const ok=React.useMemo(()=>typeof window!=='undefined'&&window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches,[]);
const onMove=e=>{if(!ok||!tilt)return;const b=ref.current.getBoundingClientRect();const nx=(e.clientX-b.left)/b.width-.5,ny=(e.clientY-b.top)/b.height-.5;setR({x:-ny*tilt*2,y:nx*tilt*2});};
return <div ref={ref} onMouseMove={onMove} onMouseLeave={()=>setR({x:0,y:0})} style={{position:'relative',perspective:perspective+'px',perspectiveOrigin:'50% 40%',height,...style}}>
<div style={{position:'relative',width:'100%',height:'100%',transformStyle:'preserve-3d',transform:'rotateX('+r.x.toFixed(2)+'deg) rotateY('+r.y.toFixed(2)+'deg)',transition:'transform 700ms var(--ease-out)'}}>{children}</div></div>;}
