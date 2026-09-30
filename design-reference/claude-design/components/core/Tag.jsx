import React from 'react';
export function Tag({tone='neutral',size='md',children,style}){
const t={neutral:{bg:'var(--gray-100)',fg:'var(--text-body)'},accent:{bg:'var(--accent-soft)',fg:'var(--blue-700)'},outline:{bg:'transparent',fg:'var(--text-body)',bd:'var(--border-strong)'},inverse:{bg:'var(--gray-900)',fg:'#fff'}}[tone]||{};
const s=size==='sm'?{h:26,px:10,fs:12}:{h:32,px:13,fs:14};
return <span style={{display:'inline-flex',alignItems:'center',height:s.h,padding:'0 '+s.px+'px',borderRadius:'var(--radius-pill)',background:t.bg,color:t.fg,border:t.bd?'1px solid '+t.bd:'none',font:'var(--fw-medium) '+s.fs+'px/1 var(--font-sans)',whiteSpace:'nowrap',boxSizing:'border-box',...style}}>{children}</span>;}
