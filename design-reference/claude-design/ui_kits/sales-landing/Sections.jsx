const { SceneHeader: SSceneHeader, Button: SButton } = window.BoostChatDesignSystem_29c1c3;

const DEMO_URL = '#';        // TODO: real demo site
const VIDEO_SRC = '';        // TODO: 86s product demo (mp4/webm)
const VIDEO_POSTER = '../../assets/product/scene-01-conversation.png';

function Sec({ id, label, children, style, inner }) {
  const mobile = useIsMobile();
  return <section id={id} data-screen-label={label} style={{ padding: mobile ? '88px 20px' : '160px var(--page-gutter)', ...style }}>
    <div style={{ maxWidth: 'calc(var(--page-max) - var(--page-gutter) * 2)', margin: '0 auto', ...inner }}>{children}</div>
  </section>;
}

const br = (mobile) => mobile ? ' ' : <br />;

/* 1 — Problem */
const JOURNEY = ['시공사례 찾기', '우리 집과 비슷한지 판단', '공사 범위 고민', '문의 방법 찾기', '견적 작성'];
function Problem() {
  const m = useIsMobile();
  return <Sec id="problem" label="문제">
    <Reveal><SSceneHeader eyebrow="견적 문의 전까지" title={<>고객은 견적 문의를 남기기 전까지{br(m)}생각보다 많은 판단을 해야 합니다.</>} /></Reveal>
    <Reveal style={{ marginTop: m ? 40 : 72 }}>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(5, minmax(0,1fr))', gap: m ? 0 : 16, position: 'relative' }}>
        {JOURNEY.map((j, i) => <li key={j} style={{ display: 'flex', flexDirection: m ? 'row' : 'column', gap: m ? 16 : 18, alignItems: m ? 'center' : 'flex-start', padding: m ? '14px 0' : 0, borderTop: m && i ? '1px solid var(--border-subtle)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: m ? 'auto' : '100%' }}>
            <span style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--text-subtle)' }}>{String(i + 1).padStart(2, '0')}</span>
            {!m && <span style={{ flex: 1, height: 1, background: 'var(--border-strong)' }}></span>}
            {!m && i < JOURNEY.length - 1 && <span aria-hidden="true" style={{ color: 'var(--gray-400)', fontSize: 14, marginLeft: -4 }}>→</span>}
          </div>
          <span style={{ font: `600 ${m ? 18 : 22}px/1.35 var(--font-sans)`, letterSpacing: '-0.02em', color: 'var(--text-strong)', wordBreak: 'keep-all' }}>{j}</span>
        </li>)}
      </ol>
    </Reveal>
    <Reveal style={{ marginTop: m ? 32 : 56 }}>
      <div style={{ background: '#fff', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-window)', padding: m ? '18px 22px' : '22px 32px', display: 'flex', alignItems: 'center', gap: 16, border: '1px solid var(--blue-200)', borderRadius: m ? 'var(--radius-xl)' : 'var(--radius-pill)' }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--accent)', flex: 'none' }}></span>
        <span style={{ font: `600 ${m ? 17 : 22}px/1.4 var(--font-sans)`, letterSpacing: '-0.02em', color: 'var(--text-strong)', wordBreak: 'keep-all' }}>BoostChat은 이 과정을 <span style={{ color: 'var(--accent)' }}>하나의 대화</span> 안에서 이어줍니다.</span>
      </div>
    </Reveal>
  </Sec>;
}

/* 4 — Demo video */
function DemoVideo() {
  const m = useIsMobile();
  const [play, setPlay] = React.useState(false);
  return <Sec id="video" label="데모 영상" style={{ paddingBottom: m ? 88 : 120 }}>
    <Reveal><SSceneHeader eyebrow="데모 영상 · 1분 26초" title={<>말보다 빠르게,{br(m)}실제 작동 모습을 확인해보세요.</>} sub={<>고객이 말을 시작하고, 사례를 보고,{br(m)}견적 문의를 남기기까지 실제 흐름입니다.</>} /></Reveal>
    <Reveal style={{ marginTop: m ? 32 : 64 }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: m ? 'var(--radius-md)' : 'var(--radius-xl)', overflow: 'hidden', background: 'var(--gray-900)', boxShadow: 'var(--shadow-float)' }}>
        {play && VIDEO_SRC ? <video src={VIDEO_SRC} poster={VIDEO_POSTER} controls autoPlay playsInline style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}></video> : <>
          <img src={VIDEO_POSTER} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.62) saturate(.9)' }} />
          <button type="button" onClick={() => setPlay(true)} aria-label="데모 영상 재생" style={{ position: 'absolute', inset: 0, background: 'none', border: 0, cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
            <span style={{ width: m ? 64 : 96, height: m ? 64 : 96, borderRadius: 999, background: 'rgba(255,255,255,.96)', display: 'grid', placeItems: 'center', boxShadow: 'var(--shadow-float)' }}>
              <span style={{ width: 0, height: 0, borderTop: `${m ? 10 : 14}px solid transparent`, borderBottom: `${m ? 10 : 14}px solid transparent`, borderLeft: `${m ? 16 : 22}px solid var(--gray-900)`, marginLeft: m ? 4 : 6 }}></span>
            </span>
          </button>
          <div style={{ position: 'absolute', left: m ? 16 : 32, bottom: m ? 14 : 28, right: m ? 16 : 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', pointerEvents: 'none' }}>
            <span style={{ font: `600 ${m ? 14 : 17}px/1.3 var(--font-sans)` }}>{play && !VIDEO_SRC ? '영상 파일 연결 예정' : '대화 → 사례 추천 → 사진 → 견적 문의'}</span>
            <span style={{ font: '500 13px/1 var(--font-mono)', background: 'rgba(16,24,40,.6)', padding: '6px 10px', borderRadius: 999 }}>1:26</span>
          </div>
        </>}
      </div>
    </Reveal>
  </Sec>;
}

/* 5 — Before / After */
const BEFORE = ['방문', '시공사례 탐색', '내 조건과 맞는지 판단', '문의 방법 찾기', '견적 양식'];
const AFTER = ['방문', '원하는 공사 말하기', '관련 사례 추천', '사진 확인', '상담', '견적 문의'];
function FlowCol({ title, steps, on }) {
  const m = useIsMobile();
  return <div style={{ background: on ? '#fff' : 'transparent', border: on ? '1px solid var(--blue-200)' : '1px solid var(--border-strong)', borderRadius: 'var(--radius-xl)', boxShadow: on ? 'var(--shadow-window)' : 'none', padding: m ? 24 : 40 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, font: 'var(--type-eyebrow)', color: on ? 'var(--text-accent)' : 'var(--text-subtle)' }}>{title}</div>
    <ol style={{ listStyle: 'none', margin: '24px 0 0', padding: 0 }}>
      {steps.map((s, i) => { const last = i === steps.length - 1; return <li key={s} style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
        <div style={{ width: 14, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ width: last ? 14 : 10, height: last ? 14 : 10, marginTop: last ? 7 : 9, borderRadius: 999, flex: 'none', background: on ? (last ? 'var(--accent)' : '#fff') : (last ? 'var(--gray-400)' : 'var(--surface-page)'), border: on ? (last ? 'none' : '2px solid var(--accent)') : (last ? 'none' : '2px solid var(--gray-400)'), boxSizing: 'border-box' }}></span>
          {!last && <span style={{ flex: 1, width: 0, borderLeft: on ? '2px solid var(--blue-200)' : '2px dashed var(--gray-300)', margin: '4px 0' }}></span>}
        </div>
        <span style={{ padding: '4px 0 18px', font: `${last ? 700 : 500} ${m ? 17 : 20}px/1.4 var(--font-sans)`, letterSpacing: '-0.02em', color: on ? (last ? 'var(--accent)' : 'var(--text-strong)') : (last ? 'var(--text-subtle)' : 'var(--text-muted)') }}>{s}</span>
      </li>; })}
    </ol>
  </div>;
}
function BeforeAfter() {
  const m = useIsMobile();
  return <Sec id="compare" label="비교">
    <Reveal><SSceneHeader eyebrow="Before / After" title={<>홈페이지를 새로 만드는 것이 아니라,{br(m)}상담까지의 흐름을 연결합니다.</>} /></Reveal>
    <Reveal style={{ marginTop: m ? 32 : 64, display: 'grid', gridTemplateColumns: m ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)', gap: m ? 16 : 32, alignItems: 'start' }}>
      <FlowCol title="기존 홈페이지" steps={BEFORE} />
      <FlowCol title="BoostChat 적용" steps={AFTER} on />
    </Reveal>
  </Sec>;
}

/* 6 — Why */
function Why() {
  const m = useIsMobile(); const n = useIsNarrow();
  const p = { font: `400 ${m ? 17 : 19}px/1.75 var(--font-sans)`, color: 'var(--text-body)', margin: 0, letterSpacing: '-0.01em', wordBreak: 'keep-all', textWrap: 'pretty' };
  return <Sec id="why" label="만든 이유" style={{ paddingTop: m ? 64 : 120 }}>
    <Reveal style={{ borderTop: '1px solid var(--border-strong)', paddingTop: m ? 32 : 56, display: 'grid', gridTemplateColumns: n ? '1fr' : 'minmax(0,1.05fr) minmax(0,1fr)', gap: m ? 28 : n ? 32 : 96 }}>
      <SSceneHeader eyebrow="만든 이유" size="md" title={<>광고로 방문자를 데려오는 것에서{br(m)}끝나지 않도록 만들었습니다.</>} />
      <div style={{ display: 'grid', gap: 24, paddingTop: n ? 0 : 30, maxWidth: 720 }}>
        <p style={p}>인테리어 업체는 블로그, 광고, SNS, 홈페이지를 통해 고객을 데려옵니다. 하지만 방문한 고객이 자기 조건에 맞는 사례를 찾고, 궁금한 점을 해결하고, 실제 문의까지 남기는 과정은 별개입니다.</p>
        <p style={{ ...p, color: 'var(--text-strong)', fontWeight: 500 }}>BoostChat은 새로운 홈페이지를 만드는 것보다 먼저, 이미 방문한 고객과 상담이 시작되는 지점을 개선하는 데서 출발했습니다.</p>
      </div>
    </Reveal>
  </Sec>;
}

/* 7 — Install paths (follows the install scene) */
function InstallPaths() {
  const m = useIsMobile();
  const items = [['A', '이미 홈페이지가 있다면', <>기존 디자인은 그대로 두고{br(m)}BoostChat만 연결합니다.</>], ['B', '홈페이지도 새로 필요하다면', <>홈페이지 제작 + BoostChat을{br(m)}함께 구축할 수 있습니다.</>]];
  return <Sec id="install-paths" label="설치 방식" style={{ paddingTop: m ? 40 : 40 }}>
    <Reveal style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)', borderTop: '1px solid var(--border-strong)' }}>
      {items.map(([k, t, d], i) => <div key={k} style={{ padding: m ? '28px 0' : '44px 48px 8px', paddingLeft: m || i === 0 ? 0 : 48, borderLeft: !m && i ? '1px solid var(--border-strong)' : 'none', borderTop: m && i ? '1px solid var(--border-strong)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 28, height: 28, borderRadius: 999, background: i ? 'var(--gray-900)' : 'var(--accent)', color: '#fff', display: 'grid', placeItems: 'center', font: '700 13px/1 var(--font-sans)' }}>{k}</span>
          <span style={{ font: 'var(--type-eyebrow)', color: 'var(--text-muted)' }}>{t}</span>
        </div>
        <div style={{ marginTop: 18, font: `700 ${m ? 22 : 30}px/1.35 var(--font-sans)`, letterSpacing: '-0.025em', color: 'var(--text-strong)', wordBreak: 'keep-all' }}>{d}</div>
      </div>)}
    </Reveal>
  </Sec>;
}

/* 8 — Live demo */
function LiveDemo() {
  const m = useIsMobile(); const n = useIsNarrow();
  return <Sec id="live" label="실제 데모">
    <div style={{ display: 'grid', gridTemplateColumns: n ? '1fr' : 'minmax(0,1fr) minmax(0,440px)', gap: m ? 36 : n ? 56 : 96, alignItems: 'center' }}>
      <Reveal>
        <SSceneHeader eyebrow="실제 데모" title="직접 고객이 되어 사용해보세요." sub="실제 인테리어 데모 홈페이지에서 이렇게 말해보세요." />
        <blockquote style={{ margin: m ? '28px 0 0' : '40px 0 0', padding: m ? '20px 22px' : '26px 32px', background: '#fff', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', font: `600 ${m ? 19 : 26}px/1.45 var(--font-sans)`, letterSpacing: '-0.02em', color: 'var(--text-strong)', wordBreak: 'keep-all' }}>“32평인데 주방과 욕실을 리모델링하고 싶어요”</blockquote>
        <div style={{ marginTop: 32 }}><SButton size="lg" arrow href={DEMO_URL} style={{ color: '#fff' }}>실제 데모 체험하기</SButton></div>
      </Reveal>
      <Reveal><img src="../../assets/product/layer-chat-widget.png" alt="데모 상담창 응답" style={{ width: '100%', display: 'block', maxWidth: 440, margin: '0 auto', transform: n ? 'none' : 'perspective(1800px) rotateY(-4deg)', filter: 'drop-shadow(0 30px 50px rgba(16,24,40,.14))' }} /></Reveal>
    </div>
  </Sec>;
}

/* 9 — Early partner */
const PARTNER = ['홈페이지 확인', '포트폴리오 연동', '상담창 세팅', '설치'];
function Partner({ onCta }) {
  const m = useIsMobile();
  return <Sec id="partner" label="초기 파트너" style={{ paddingTop: m ? 40 : 80 }}>
    <Reveal style={{ background: 'var(--surface-inverse)', borderRadius: m ? 'var(--radius-xl)' : 'var(--radius-2xl)', padding: m ? '48px 24px' : '96px 80px', textAlign: m ? 'left' : 'center', color: '#fff' }}>
      <div style={{ font: 'var(--type-eyebrow)', color: 'var(--blue-300)' }}>초기 파트너 모집</div>
      <h2 style={{ margin: '12px 0 0', font: `700 ${m ? 30 : 52}px/1.2 var(--font-sans)`, letterSpacing: 'var(--ls-display)', wordBreak: 'keep-all' }}>첫 도입 업체를 모집하고 있습니다.</h2>
      <p style={{ margin: '16px 0 0', font: 'var(--type-lead)', color: 'var(--gray-300)', wordBreak: 'keep-all' }}>초기 파트너에게는 아래 과정을 함께 진행합니다.</p>
      <ol style={{ listStyle: 'none', margin: m ? '28px 0 0' : '40px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: m ? 'flex-start' : 'center', alignItems: 'center', gap: '10px 12px' }}>
        {PARTNER.map((s, i) => <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 16px 0 8px', borderRadius: 999, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)', font: '600 15px/1 var(--font-sans)' }}>
            <span style={{ width: 24, height: 24, borderRadius: 999, display: 'inline-grid', placeItems: 'center', background: 'var(--accent)', font: '600 11px/1 var(--font-mono)' }}>{i + 1}</span>{s}</span>
          {i < PARTNER.length - 1 && <span aria-hidden="true" style={{ color: 'var(--gray-500)' }}>→</span>}
        </li>)}
      </ol>
      <div style={{ marginTop: m ? 32 : 48 }}><SButton size="lg" arrow onClick={onCta}>도입 상담 받아보기</SButton></div>
    </Reveal>
  </Sec>;
}

Object.assign(window, { Problem, DemoVideo, BeforeAfter, Why, InstallPaths, LiveDemo, Partner });
