import React from 'react';
const SIZES={sm:{h:36,px:16,fs:14},md:{h:48,px:22,fs:16},lg:{h:56,px:28,fs:17}};
const VARIANTS={
primary:{bg:'var(--accent)',fg:'#fff',bd:'transparent',hbg:'var(--accent-hover)'},
secondary:{bg:'var(--surface-raised)',fg:'var(--text-strong)',bd:'var(--border-strong)',hbg:'var(--gray-25)'},
ghost:{bg:'transparent',fg:'var(--text-accent)',bd:'transparent',hbg:'var(--accent-soft)'},
onImage:{bg:'rgba(255,255,255,.96)',fg:'var(--gray-900)',bd:'transparent',hbg:'#fff'},
dark:{bg:'var(--gray-900)',fg:'#fff',bd:'transparent',hbg:'var(--gray-800)'}};
export function Button({variant='primary',size='md',arrow=false,disabled=false,full=false,children,onClick,href,type,style}){
const [h,setH]=React.useState(false);const [p,setP]=React.useState(false);
const s=SIZES[size]||SIZES.md;const v=VARIANTS[variant]||VARIANTS.primary;
const El=href?'a':'button';
return <El href={href} type={href?undefined:(type||'button')} onClick={disabled?undefined:onClick} disabled={disabled} onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setP(false)}} onMouseDown={()=>setP(true)} onMouseUp={()=>setP(false)}
style={{display:full?'flex':'inline-flex',width:full?'100%':undefined,alignItems:'center',justifyContent:'center',gap:8,height:s.h,padding:'0 '+s.px+'px',borderRadius:'var(--radius-pill)',border:'1px solid '+v.bd,background:disabled?(variant==='primary'?'var(--accent-disabled)':'var(--gray-100)'):(h?v.hbg:v.bg),color:disabled&&variant!=='primary'?'var(--text-faint)':v.fg,font:'var(--fw-semibold) '+s.fs+'px/1 var(--font-sans)',letterSpacing:'-0.01em',cursor:disabled?'not-allowed':'pointer',textDecoration:'none',whiteSpace:'nowrap',transform:p?'scale(.98)':'none',transition:'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',boxSizing:'border-box',...style}}>
{children}{arrow&&<span aria-hidden="true" style={{display:'inline-block',transform:h?'translateX(2px)':'none',transition:'transform var(--dur-fast) var(--ease-out)'}}>→</span>}</El>;}
