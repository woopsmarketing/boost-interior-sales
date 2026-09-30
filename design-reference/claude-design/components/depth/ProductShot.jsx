import React from 'react';
export function ProductShot({src,alt='',z=0,x=0,y=0,scale=1,rotate=0,blur=0,opacity=1,elevation='window',radius='lg',frame=false,absolute=true,style,imgStyle}){
const sh={none:'none',window:'var(--shadow-window)',float:'var(--shadow-float)',device:'var(--shadow-device)'}[elevation];
const rad=radius==='none'?0:'var(--radius-'+radius+')';
return <figure style={{position:absolute?'absolute':'relative',margin:0,transform:'translate3d('+x+'px,'+y+'px,'+z+'px) scale('+scale+') rotate('+rotate+'deg)',filter:blur?'blur('+blur+'px)':undefined,opacity,transition:'transform var(--dur-slow) var(--ease-out), filter var(--dur-slow) var(--ease-out), opacity var(--dur-slow) var(--ease-out)',willChange:'transform',borderRadius:rad,boxShadow:sh,overflow:'hidden',background:frame?'#fff':undefined,border:frame?'1px solid var(--border-subtle)':undefined,...style}}>
<img src={src} alt={alt} draggable="false" style={{display:'block',width:'100%',height:'auto',...imgStyle}}/></figure>;}
