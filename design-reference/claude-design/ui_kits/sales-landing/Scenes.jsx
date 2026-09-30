const { SceneHeader, ScrollScene, DepthStage, ProductShot, Tag } = window.BoostChatDesignSystem_29c1c3;
const P = '../../assets/product/';
const clamp = v => Math.max(0, Math.min(1, v));
const ease = t => 1 - Math.pow(1 - t, 3);
const seg = (p, a, b) => ease(clamp((p - a) / (b - a)));
const lerp = (a, b, t) => a + (b - a) * t;

function useIsMobile() {
  const q = '(max-width: 820px)';
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => { const mq = window.matchMedia(q); const f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f); }, []);
  return m;
}

function useMedia(q) {
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => { const mq = window.matchMedia(q); const f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f); }, [q]);
  return m;
}
const useIsNarrow = () => useMedia('(max-width: 1100px)');

function Reveal({ children, style }) {
  const ref = React.useRef(null); const [on, setOn] = React.useState(false);
  React.useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: .15 }); io.observe(ref.current); return () => io.disconnect(); }, []);
  return <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(16px)', transition: 'opacity 700ms var(--ease-out), transform 700ms var(--ease-out)', ...style }}>{children}</div>;
}

const tf = ({ x = 0, y = 0, z = 0, s = 1, ry = 0 }) => `translate3d(${x}%, ${y}%, ${z}px) scale(${s}) rotateY(${ry}deg)`;

/* Scene definitions — positions are % of the original capture frame so layers line up exactly */
const SCENES = [
  { id: 'talk', rail: '대화', ar: 1400 / 790, mobile: 'scene-09-install.png',
    title: '방문자가 평소 말투로 상담을 시작합니다.', sub: '평수 · 공사 범위 · 스타일을 대화 속에서 이해합니다.',
    layers: p => [
      { src: 'layer-site-hero.png', l: 1.43, t: 4.56, w: 60.7, elev: 'window', st: { transform: tf({ z: lerp(0, -50, seg(p, .1, .6)) }), filter: `blur(${lerp(0, 1.2, seg(p, .3, .7))}px)` } },
      { src: 'layer-chat-welcome.png', l: 61.4, t: 1.27, w: 35.7, elev: 'none', r: 'none', st: { transform: tf({ z: 30 }), opacity: 1 - seg(p, .3, .5) } },
      { src: 'layer-chat-widget.png', l: 61.4, t: 1.27, w: 35.7, elev: 'none', r: 'none', st: { transform: tf({ z: lerp(30, 50, seg(p, .3, .6)), y: lerp(2, 0, seg(p, .3, .6)) }), opacity: seg(p, .3, .5) } },
    ] },
  { id: 'recommend', rail: '사례 추천', ar: 1400 / 790, mobile: 'scene-02-portfolio.png',
    title: '조건에 맞는 우리 업체 시공 사례를 바로 보여줍니다.', sub: '지역 · 평형 · 공사 범위가 비슷한 사례를 카드로 추천합니다.',
    layers: p => [
      { src: 'layer-site-full.png', l: 1.43, t: 4.56, w: 89.1, elev: 'window', st: { transform: tf({ z: lerp(0, -70, seg(p, .1, .6)) }), filter: `blur(${lerp(0, 1.5, seg(p, .2, .6))}px)` } },
      { src: 'layer-portfolio-card.png', l: 62.9, t: 30.6, w: 28.9, elev: 'float', r: 'lg', st: { transform: tf({ y: lerp(18, 0, seg(p, .1, .55)), z: lerp(0, 70, seg(p, .1, .55)) }), opacity: seg(p, .05, .35) } },
    ] },
  { id: 'viewer', rail: '사례 뷰어', ar: 1400 / 790, mobile: 'scene-03-viewer.png',
    title: '상담창을 떠나지 않고 사례를 크게 봅니다.', sub: '사진과 평형 · 공사 범위 · 스타일 정보를 한 화면에서 확인합니다.',
    layers: p => [
      { src: 'layer-site-full.png', l: 1.43, t: 4.56, w: 89.1, elev: 'window', st: { transform: tf({ z: -80 }), filter: `blur(${lerp(0, 3, seg(p, .05, .45))}px) brightness(${lerp(1, .42, seg(p, .05, .45))})` } },
      { src: 'layer-viewer-modal.png', l: 14.6, t: 9.7, w: 62.7, elev: 'float', r: 'md', st: { transform: tf({ s: lerp(.86, 1, seg(p, .1, .55)), z: lerp(-40, 20, seg(p, .1, .55)) }), opacity: seg(p, .05, .3) } },
      { src: 'layer-viewer-card.png', l: 71.9, t: 8, w: 34.4, elev: 'float', r: 'lg', st: { transform: tf({ x: lerp(10, 0, seg(p, .45, .8)), z: 80 }), opacity: seg(p, .45, .7) } },
    ] },
  { id: 'photos', rail: '사진', ar: 2, mobile: 'scene-04-photos.png',
    title: '사진을 넘기며 시공 결과를 확인합니다.', sub: '한 사례의 여러 사진을 상담 중에 바로 넘겨 봅니다.',
    layers: p => [
      { src: 'photo-sink.png', l: 67.7, t: 2.1, w: 30.7, elev: 'window', r: 'md', st: { transform: tf({ x: lerp(-150, 0, seg(p, .15, .6)), y: lerp(30, 0, seg(p, .15, .6)), z: lerp(-80, 10, seg(p, .15, .6)) }), opacity: seg(p, .1, .3) } },
      { src: 'photo-bath.png', l: 67.7, t: 52.4, w: 30.7, elev: 'window', r: 'md', st: { transform: tf({ x: lerp(-150, 0, seg(p, .25, .7)), y: lerp(-70, 0, seg(p, .25, .7)), z: lerp(-80, 10, seg(p, .25, .7)) }), opacity: seg(p, .2, .4) } },
      { src: 'photo-kitchen.png', l: 1.43, t: 2.1, w: 64.3, elev: 'float', r: 'lg', st: { transform: tf({ x: lerp(12, 0, seg(p, .1, .6)), s: lerp(1.04, 1, seg(p, .1, .6)), z: 20 }) } },
    ] },
  { id: 'memory', rail: '맥락 기억', ar: 1400 / 790, mobile: 'scene-05-memory.png',
    title: '처음부터 다시 설명할 필요가 없습니다.', sub: '앞서 말한 지역 · 면적 · 공사 범위를 기억하고 견적 상담을 이어갑니다.',
    tags: ['대구', '아파트 · 공급 32평', '주방 · 욕실', '화이트'],
    layers: p => [
      { src: 'layer-site-full.png', l: 1.43, t: 4.56, w: 89.1, elev: 'window', st: { transform: tf({ z: -70 }), filter: `blur(${lerp(0, 2, seg(p, .1, .5))}px)` } },
      { src: 'layer-chat-memory.png', l: 61.4, t: 1.27, w: 35.7, elev: 'none', r: 'none', st: { transform: tf({ z: lerp(0, 50, seg(p, .1, .5)) }) } },
    ] },
  { id: 'inquiry', rail: '견적 문의', ar: 1400 / 790, mobile: 'scene-06-inquiry.png',
    title: '대화가 견적 문의로 이어집니다.', sub: '상담창 안에서 이름 · 연락처 · 문의 내용을 바로 남깁니다.',
    layers: p => [
      { src: 'layer-site-hero.png', l: 1.43, t: 4.56, w: 60.7, elev: 'window', st: { transform: tf({ z: -60 }), filter: `blur(${lerp(0, 2, seg(p, .1, .5))}px)` } },
      { src: 'layer-chat-form.png', l: 61.4, t: 1.27, w: 35.7, elev: 'none', r: 'none', st: { transform: tf({ z: lerp(0, 60, seg(p, .1, .5)), x: lerp(0, -12, seg(p, .1, .6)) }) } },
    ] },
  { id: 'owner', rail: '관리 화면', ar: 1400 / 760, eyebrow: 'BoostChat · 사업자 관리 화면', mobile: 'scene-07-dashboard.png',
    title: '들어온 문의는 한눈에 정리됩니다.', sub: <>고객에게 다시 처음부터 물어보기 전에,<br />어떤 공사를 원하는지 먼저 확인하고 연락할 수 있습니다.</>,
    note: '화면 속 문의는 촬영용 데모 데이터입니다.',
    layers: p => [
      { src: 'layer-dashboard.png', l: 1.43, t: 2.1, w: 89.1, elev: 'window', st: { transform: tf({ z: lerp(0, -70, seg(p, .1, .55)) }), filter: `blur(${lerp(0, 1.5, seg(p, .2, .6))}px)` } },
      { src: 'layer-inquiry-card.png', l: 10, t: 10.4, w: 84.5, elev: 'float', r: 'lg', st: { transform: tf({ y: lerp(10, 0, seg(p, .1, .55)), z: lerp(0, 70, seg(p, .1, .55)) }), opacity: seg(p, .05, .35) } },
    ] },
];

function Layer({ L }) {
  return <ProductShot src={P + L.src} elevation={L.elev} radius={L.r || 'lg'} style={{ left: L.l + '%', top: L.t + '%', width: L.w + '%', transition: 'none', ...L.st }} />;
}

function Visual({ s, p }) {
  return <div style={{ width: `min(100%, calc((100vh - 330px) * ${s.ar}))`, aspectRatio: String(s.ar), position: 'relative' }}>
    <DepthStage height="100%">
      {s.layers(p).map((L, i) => <Layer key={i} L={L} />)}
      {s.tags && <div style={{ position: 'absolute', left: '44%', top: '28%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, transform: 'translateZ(90px)' }}>
        <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--text-subtle)', opacity: seg(p, .2, .35) }}>기억한 조건</span>
        {s.tags.map((t, i) => <Tag key={t} tone={i === 0 ? 'accent' : 'neutral'} style={{ background: i === 0 ? 'var(--accent-soft)' : '#fff', boxShadow: 'var(--shadow-md)', opacity: seg(p, .25 + i * .1, .4 + i * .1), transform: `translateX(${lerp(16, 0, seg(p, .25 + i * .1, .45 + i * .1))}px)` }}>{t}</Tag>)}
      </div>}
    </DepthStage>
  </div>;
}

function StoryScene({ s, index, total, onProgress }) {
  const mobile = useIsMobile();
  const step = String(index + 2).padStart(2, '0') + ' / ' + String(total + 1).padStart(2, '0');
  if (mobile) return <section id={s.id} data-screen-label={s.rail} style={{ padding: '72px 20px 0' }}>
    <Reveal><SceneHeader size="md" step={step} eyebrow={s.eyebrow} title={s.title} sub={s.sub} /></Reveal>
    <Reveal style={{ marginTop: 28 }}><img src={P + s.mobile} alt="" style={{ width: '100%', display: 'block', borderRadius: 12 }} /></Reveal>
    {s.note && <p style={{ font: 'var(--type-caption)', color: 'var(--text-subtle)', margin: '12px 0 0' }}>{s.note}</p>}
  </section>;
  return <ScrollScene id={s.id} length={210}>{p => {
    onProgress && onProgress(index, p);
    return <div data-screen-label={s.rail} style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '104px var(--page-gutter) 0', boxSizing: 'border-box', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ opacity: seg(p, 0, .12) * .3 + .7 }}><SceneHeader step={step} eyebrow={s.eyebrow} title={s.title} sub={s.sub} /></div>
      <div style={{ marginTop: 48, flex: 1, minHeight: 0 }}><Visual s={s} p={p} /></div>
      {s.note && <p style={{ position: 'absolute', right: 'var(--page-gutter)', bottom: 24, font: 'var(--type-caption)', color: 'var(--text-subtle)', margin: 0 }}>{s.note}</p>}
    </div>;
  }}</ScrollScene>;
}

function MobileScene({ index, total }) {
  const mobile = useIsMobile();
  const step = String(index + 2).padStart(2, '0') + ' / ' + String(total + 1).padStart(2, '0');
  const head = <SceneHeader size={mobile ? 'md' : 'lg'} step={step} title={<>모바일에서도<br />바로 상담합니다.</>} sub="휴대폰에서는 상담창과 사례 뷰어가 화면 전체로 열립니다." />;
  if (mobile) return <section id="mobile" data-screen-label="모바일" style={{ padding: '72px 20px 0' }}><Reveal>{head}</Reveal><Reveal style={{ marginTop: 28 }}><img src={P + 'scene-08-mobile.png'} alt="" style={{ width: '100%', display: 'block' }} /></Reveal></section>;
  return <ScrollScene id="mobile" length={190}>{p => <div data-screen-label="모바일" style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '64px var(--page-gutter) 0', boxSizing: 'border-box', height: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,.8fr) minmax(0,1fr)', alignItems: 'center', gap: 48 }}>
    <div>{head}</div>
    <div style={{ height: 'min(82vh, 760px)', aspectRatio: '860/830', justifySelf: 'end', maxWidth: '100%' }}>
      <DepthStage height="100%" perspective={1400}>
        <ProductShot src={P + 'layer-phone-chat.png'} elevation="none" radius="none" style={{ left: '1.9%', top: '1.9%', width: '44.2%', transition: 'none', transform: tf({ y: lerp(6, 0, seg(p, .05, .5)), ry: lerp(10, 5, seg(p, .05, .6)), z: lerp(-40, 0, seg(p, .05, .5)) }), filter: 'drop-shadow(0 30px 40px rgba(16,24,40,.18))' }} />
        <ProductShot src={P + 'layer-phone-viewer.png'} elevation="none" radius="none" style={{ left: '52%', top: '1.9%', width: '44.2%', transition: 'none', transform: tf({ y: lerp(14, 0, seg(p, .15, .65)), ry: lerp(-10, -5, seg(p, .15, .7)), z: lerp(-40, 30, seg(p, .15, .65)) }), opacity: seg(p, .1, .35), filter: 'drop-shadow(0 30px 40px rgba(16,24,40,.18))' }} />
      </DepthStage>
    </div>
  </div>}</ScrollScene>;
}

function InstallScene({ index, total, onProgress }) {
  const s = { id: 'install', rail: '설치', ar: 1400 / 790, mobile: 'scene-09-install.png', title: '우리 홈페이지에 AI 상담창이 붙습니다.', sub: '기존 홈페이지는 그대로 두고, 방문자는 버튼 하나로 바로 상담을 시작합니다.',
    layers: p => [
      { src: 'layer-site-hero.png', l: 1.43, t: 4.56, w: 60.7, elev: 'window', st: { transform: tf({ x: lerp(24, 0, seg(p, .1, .55)), z: lerp(20, -30, seg(p, .1, .6)) }) } },
      { src: 'layer-chat-welcome.png', l: 61.4, t: 1.27, w: 35.7, elev: 'none', r: 'none', st: { transform: tf({ x: lerp(-20, 0, seg(p, .3, .7)), y: lerp(8, 0, seg(p, .3, .7)), z: lerp(-40, 40, seg(p, .3, .7)) }), opacity: seg(p, .3, .55) } },
    ] };
  return <StoryScene s={s} index={index} total={total} onProgress={onProgress} />;
}

Object.assign(window, { useMedia, useIsNarrow, SCENES, StoryScene, MobileScene, InstallScene, useIsMobile, Reveal, seg, lerp, KIT_ASSETS: P });
