import React from 'react';
export function ScrollScene({length=200,children,style,stickyStyle,id}){
const ref=React.useRef(null);const [p,setP]=React.useState(0);
React.useEffect(()=>{let raf=0;const tick=()=>{raf=0;const el=ref.current;if(!el)return;const b=el.getBoundingClientRect();const total=b.height-window.innerHeight;const v=total>0?Math.min(1,Math.max(0,-b.top/total)):0;setP(v);};
const on=()=>{if(!raf)raf=requestAnimationFrame(tick)};tick();window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);return()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);cancelAnimationFrame(raf)}},[]);
return <section id={id} ref={ref} style={{position:'relative',height:length+'vh',...style}}><div style={{position:'sticky',top:0,height:'100vh',overflow:'hidden',...stickyStyle}}>{typeof children==='function'?children(p):children}</div></section>;}
