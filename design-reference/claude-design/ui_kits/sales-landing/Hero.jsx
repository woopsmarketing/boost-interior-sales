const { SceneHeader: HSceneHeader, Button: HButton, DepthStage: HDepthStage, ProductShot: HProductShot } = window.BoostChatDesignSystem_29c1c3;

const FLOW = ['대화', '관련 사례', '사진', '상담', '견적 문의'];

function FlowLine({ active }) {
  return <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 12px' }}>
    {FLOW.map((f, i) => <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 14px 0 8px', borderRadius: 999, background: i === active ? 'var(--text-strong)' : '#fff', color: i === active ? '#fff' : 'var(--text-body)', boxShadow: i === active ? 'none' : 'var(--shadow-hairline)', font: '600 14px/1 var(--font-sans)', transition: 'background 400ms var(--ease-out), color 400ms var(--ease-out)' }}>
        <span style={{ width: 22, height: 22, borderRadius: 999, display: 'inline-grid', placeItems: 'center', background: i === active ? 'var(--accent)' : 'var(--gray-100)', color: i === active ? '#fff' : 'var(--text-subtle)', font: '600 11px/1 var(--font-mono)', transition: 'background 400ms' }}>{i + 1}</span>{f}</span>
      {i < FLOW.length - 1 && <span aria-hidden="true" style={{ color: 'var(--gray-400)', fontSize: 14 }}>→</span>}
    </li>)}
  </ol>;
}

function Hero({ onCta }) {
  const mobile = useIsMobile();
  const [active, setActive] = React.useState(0);
  const [y, setY] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % FLOW.length), 1800); return () => clearInterval(t); }, []);
  React.useEffect(() => { if (mobile) return; const f = () => setY(window.scrollY); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, [mobile]);
  const k = Math.min(1, y / 700);
  const P = window.KIT_ASSETS;
  return <section id="top" data-screen-label="01 Hero" style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: mobile ? '104px 20px 24px' : '148px var(--page-gutter) 80px', boxSizing: 'border-box' }}>
    <HSceneHeader size="xl" eyebrow="BoostChat · 인테리어 · 리모델링 업체를 위한 AI 상담" title={<>홈페이지까지 찾아온 고객,<br />견적 문의까지 자연스럽게<br />이어지고 있나요?</>} sub={<>고객이 원하는 공사를 말하면 관련 시공사례를 찾아주고,{mobile ? ' ' : <br />}사진을 보며 상담한 뒤 견적 문의까지 연결합니다.</>} style={{ maxWidth: 980 }} />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
      <HButton size="lg" arrow onClick={onCta}>도입 상담 신청</HButton>
      <HButton size="lg" variant="secondary" href="#talk">작동 방식 보기</HButton>
    </div>
    <p style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '18px 0 0', font: '500 14px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}><span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)' }}></span>기존 인테리어 홈페이지에도 설치할 수 있습니다.</p>
    <div style={{ marginTop: 40 }}><FlowLine active={active} /></div>
    {mobile ? <img src={P + 'scene-02-portfolio.png'} alt="" style={{ width: '100%', display: 'block', marginTop: 36, borderRadius: 12 }} /> :
      <div style={{ marginTop: 72, aspectRatio: String(1400 / 790), position: 'relative' }}>
        <HDepthStage height="100%">
          <HProductShot src={P + 'layer-site-full.png'} style={{ left: '1.43%', top: '4.56%', width: '89.1%', transition: 'none', transform: `translate3d(0, ${-k * 30}px, ${-k * 60}px)` }} />
          <HProductShot src={P + 'layer-portfolio-card.png'} elevation="float" style={{ left: '62.9%', top: '30.6%', width: '28.9%', transition: 'none', transform: `translate3d(0, ${-k * 80}px, ${40 + k * 40}px)` }} />
        </HDepthStage>
      </div>}
  </section>;
}

Object.assign(window, { Hero, FlowLine });
