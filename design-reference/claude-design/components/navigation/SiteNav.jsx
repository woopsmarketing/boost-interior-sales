import React from 'react';
export function SiteNav({links=[],cta='도입 상담 신청',onCta,active,solid=false,style}){
return <nav style={{display:'flex',alignItems:'center',gap:32,height:64,padding:'0 var(--page-gutter)',background:solid?'rgba(241,242,244,.86)':'transparent',backdropFilter:solid?'saturate(1.4) blur(14px)':undefined,WebkitBackdropFilter:solid?'saturate(1.4) blur(14px)':undefined,borderBottom:solid?'1px solid var(--border-subtle)':'1px solid transparent',transition:'background var(--dur-base) var(--ease-out), border-color var(--dur-base)',boxSizing:'border-box',...style}}>
<a href="#top" style={{font:'800 20px/1 var(--font-sans)',letterSpacing:'-0.03em',color:'var(--accent)',textDecoration:'none'}}>BoostChat</a>
<div style={{display:'flex',gap:28,marginLeft:'auto'}}>{links.map(l=><a key={l.href} href={l.href} style={{font:'500 15px/1 var(--font-sans)',color:active===l.href?'var(--text-strong)':'var(--text-muted)',textDecoration:'none'}}>{l.label}</a>)}</div>
{cta&&<button type="button" onClick={onCta} style={{height:40,padding:'0 18px',borderRadius:999,border:0,background:'var(--accent)',color:'#fff',font:'600 14px/1 var(--font-sans)',cursor:'pointer'}}>{cta}</button>}
</nav>;}
