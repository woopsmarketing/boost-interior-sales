import React from 'react';
export function StoryRail({steps=[],current=0,onSelect,orientation='vertical',style}){
const v=orientation==='vertical';
return <ol style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:v?'column':'row',gap:v?14:6,...style}}>{steps.map((s,i)=>{const on=i===current,done=i<current;return <li key={i}><button type="button" onClick={()=>onSelect&&onSelect(i)} style={{display:'flex',alignItems:'center',gap:12,background:'none',border:0,padding:0,cursor:'pointer',font:(on?'600 ':'500 ')+'13px/1.2 var(--font-sans)',color:on?'var(--text-strong)':'var(--text-faint)',transition:'color var(--dur-base)'}}>
<span style={{width:v?(on?22:10):(on?28:14),height:3,borderRadius:2,background:on?'var(--accent)':done?'var(--gray-400)':'var(--gray-300)',transition:'width var(--dur-base) var(--ease-out), background var(--dur-base)'}}></span>{v&&<span style={{opacity:on?1:.9}}>{s}</span>}</button></li>})}</ol>;}
