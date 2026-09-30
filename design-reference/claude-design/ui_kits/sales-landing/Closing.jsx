const { Button: CButton, Field: CField, SceneHeader: CSceneHeader } = window.BoostChatDesignSystem_29c1c3;

function Closing() {
  const mobile = useIsMobile(); const narrow = useIsNarrow();
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ company: '', phone: '', site: '', note: '' });
  const [err, setErr] = React.useState({});
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = e => { e.preventDefault(); const x = {}; if (!form.company) x.company = '업체명을 입력해 주세요.'; if (!form.phone) x.phone = '연락처를 입력해 주세요.'; setErr(x); if (!Object.keys(x).length) setSent(true); };
  return <section id="contact" data-screen-label="도입 상담" style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: mobile ? '96px 20px 64px' : '160px var(--page-gutter) 120px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) minmax(0,520px)', gap: mobile ? 40 : narrow ? 48 : 96, alignItems: 'start' }}>
    <div>
      <CSceneHeader eyebrow="도입 상담" title={<>귀사 홈페이지에도{mobile ? ' ' : <br />}적용할 수 있는지 확인해보세요.</>} sub={<>현재 홈페이지를 간단히 확인한 뒤{mobile ? ' ' : <br />}적용 가능한 방식을 안내해드립니다.</>} />
    </div>
    <form onSubmit={submit} style={{ background: '#fff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-window)', padding: mobile ? 24 : 36, display: 'grid', gap: 18 }}>
      {sent ? <div style={{ padding: '48px 0', textAlign: 'center' }}>
        <div style={{ font: '700 24px/1.3 var(--font-sans)', color: 'var(--text-strong)' }}>신청이 접수되었습니다.</div>
        <p style={{ font: 'var(--type-body)', color: 'var(--text-muted)', margin: '10px 0 24px' }}>확인 후 {form.phone}로 연락드리겠습니다.</p>
        <CButton variant="secondary" onClick={() => { setSent(false); setForm({ company: '', phone: '', site: '', note: '' }); }}>다시 작성</CButton>
      </div> : <>
        <CField label="업체명" required placeholder="부스트 인테리어" value={form.company} onChange={set('company')} error={err.company} />
        <CField label="연락처" required type="tel" placeholder="010-1234-5678" value={form.phone} onChange={set('phone')} error={err.phone} />
        <CField label="홈페이지 주소" type="url" placeholder="https://" value={form.site} onChange={set('site')} hint="설치 가능 여부를 미리 확인합니다." />
        <CField label="문의 내용" multiline placeholder="어떤 점이 궁금하신가요?" value={form.note} onChange={set('note')} />
        <CButton type="submit" size="lg" full>도입 상담 신청</CButton>
      </>}
    </form>
  </section>;
}

function Footer() {
  const mobile = useIsMobile();
  return <footer style={{ borderTop: '1px solid var(--border-subtle)' }}><div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: mobile ? '28px 20px' : '32px var(--page-gutter)', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ font: '800 18px/1 var(--font-sans)', letterSpacing: '-0.03em', color: 'var(--accent)' }}>BoostChat</span>
    <span style={{ font: 'var(--type-caption)', color: 'var(--text-subtle)' }}>화면 속 업체 · 문의는 촬영용 데모 데이터입니다.</span>
  </div></footer>;
}

Object.assign(window, { Closing, Footer });
