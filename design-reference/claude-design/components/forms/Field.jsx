import React from 'react';
export function Field({label,placeholder,value,onChange,multiline=false,type='text',required=false,hint,error,name,style}){
const [f,setF]=React.useState(false);const El=multiline?'textarea':'input';
return <label style={{display:'flex',flexDirection:'column',gap:8,...style}}>
{label&&<span style={{font:'600 14px/1.3 var(--font-sans)',color:'var(--text-strong)'}}>{label}{required&&<span style={{color:'var(--accent)',marginLeft:4}}>*</span>}</span>}
<El name={name} type={multiline?undefined:type} value={value} onChange={onChange} placeholder={placeholder} rows={multiline?4:undefined} onFocus={()=>setF(true)} onBlur={()=>setF(false)}
style={{height:multiline?undefined:52,padding:multiline?'14px 16px':'0 16px',borderRadius:'var(--radius-md)',border:'1px solid '+(error?'var(--danger)':f?'var(--border-focus)':'var(--border-strong)'),boxShadow:f?'0 0 0 4px rgba(50,131,255,.12)':'none',background:'#fff',font:'400 16px/1.5 var(--font-sans)',color:'var(--text-strong)',outline:'none',resize:multiline?'vertical':undefined,transition:'border-color var(--dur-fast), box-shadow var(--dur-fast)',boxSizing:'border-box',width:'100%'}}/>
{(error||hint)&&<span style={{font:'var(--type-caption)',color:error?'var(--danger)':'var(--text-subtle)'}}>{error||hint}</span>}
</label>;}
