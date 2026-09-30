import React from 'react';
export function SceneHeader({eyebrow='BoostChat',title,sub,size='lg',align='left',step,style}){
const fs={xl:'clamp(40px,5.2vw,72px)',lg:'clamp(30px,3.9vw,56px)',md:'clamp(26px,2.8vw,40px)'}[size]||'clamp(30px,3.9vw,56px)';
return <header style={{textAlign:align,maxWidth:align==='center'?880:780,margin:align==='center'?'0 auto':0,...style}}>
<div style={{display:'flex',gap:10,alignItems:'center',justifyContent:align==='center'?'center':'flex-start',font:'var(--type-eyebrow)',color:'var(--text-accent)'}}>{step&&<span style={{font:'500 13px/1 var(--font-mono)',color:'var(--text-subtle)'}}>{step}</span>}<span>{eyebrow}</span></div>
<h2 style={{margin:'12px 0 0',font:'var(--fw-bold) '+fs+'/1.2 var(--font-sans)',letterSpacing:'var(--ls-display)',color:'var(--text-strong)',textWrap:'balance',wordBreak:'keep-all'}}>{title}</h2>
{sub&&<p style={{margin:'16px 0 0',font:'var(--type-lead)',color:'var(--text-muted)',letterSpacing:'var(--ls-body)',textWrap:'pretty',wordBreak:'keep-all'}}>{sub}</p>}
</header>;}
