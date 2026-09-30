/* @ds-bundle: {"format":4,"namespace":"BoostChatDesignSystem_29c1c3","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DepthStage","sourcePath":"components/depth/DepthStage.jsx"},{"name":"ProductShot","sourcePath":"components/depth/ProductShot.jsx"},{"name":"ScrollScene","sourcePath":"components/depth/ScrollScene.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"SceneHeader","sourcePath":"components/layout/SceneHeader.jsx"},{"name":"SiteNav","sourcePath":"components/navigation/SiteNav.jsx"},{"name":"StoryRail","sourcePath":"components/navigation/StoryRail.jsx"}],"sourceHashes":{"components/core/Button.jsx":"4e0c2aa2ce64","components/core/Tag.jsx":"1b118c10f7ae","components/depth/DepthStage.jsx":"5f5368759b0b","components/depth/ProductShot.jsx":"be030c2bec9e","components/depth/ScrollScene.jsx":"a5e1ed7b6bc4","components/forms/Field.jsx":"a0e0341dbf58","components/layout/SceneHeader.jsx":"8ee67e0420a0","components/navigation/SiteNav.jsx":"7b8ed5e2f536","components/navigation/StoryRail.jsx":"bfc8cd420c28","ui_kits/sales-landing/Closing.jsx":"7b6b4b263efc","ui_kits/sales-landing/Hero.jsx":"d45d947bc52a","ui_kits/sales-landing/Scenes.jsx":"c220f615b14a","ui_kits/sales-landing/Sections.jsx":"c11f6e240ae7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BoostChatDesignSystem_29c1c3 = window.BoostChatDesignSystem_29c1c3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    h: 36,
    px: 16,
    fs: 14
  },
  md: {
    h: 48,
    px: 22,
    fs: 16
  },
  lg: {
    h: 56,
    px: 28,
    fs: 17
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--accent)',
    fg: '#fff',
    bd: 'transparent',
    hbg: 'var(--accent-hover)'
  },
  secondary: {
    bg: 'var(--surface-raised)',
    fg: 'var(--text-strong)',
    bd: 'var(--border-strong)',
    hbg: 'var(--gray-25)'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--text-accent)',
    bd: 'transparent',
    hbg: 'var(--accent-soft)'
  },
  onImage: {
    bg: 'rgba(255,255,255,.96)',
    fg: 'var(--gray-900)',
    bd: 'transparent',
    hbg: '#fff'
  },
  dark: {
    bg: 'var(--gray-900)',
    fg: '#fff',
    bd: 'transparent',
    hbg: 'var(--gray-800)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  disabled = false,
  full = false,
  children,
  onClick,
  href,
  type,
  style
}) {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const El = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(El, {
    href: href,
    type: href ? undefined : type || 'button',
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: {
      display: full ? 'flex' : 'inline-flex',
      width: full ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: s.h,
      padding: '0 ' + s.px + 'px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid ' + v.bd,
      background: disabled ? variant === 'primary' ? 'var(--accent-disabled)' : 'var(--gray-100)' : h ? v.hbg : v.bg,
      color: disabled && variant !== 'primary' ? 'var(--text-faint)' : v.fg,
      font: 'var(--fw-semibold) ' + s.fs + 'px/1 var(--font-sans)',
      letterSpacing: '-0.01em',
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      transform: p ? 'scale(.98)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      boxSizing: 'border-box',
      ...style
    }
  }, children, arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      transform: h ? 'translateX(2px)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-out)'
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  tone = 'neutral',
  size = 'md',
  children,
  style
}) {
  const t = {
    neutral: {
      bg: 'var(--gray-100)',
      fg: 'var(--text-body)'
    },
    accent: {
      bg: 'var(--accent-soft)',
      fg: 'var(--blue-700)'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--text-body)',
      bd: 'var(--border-strong)'
    },
    inverse: {
      bg: 'var(--gray-900)',
      fg: '#fff'
    }
  }[tone] || {};
  const s = size === 'sm' ? {
    h: 26,
    px: 10,
    fs: 12
  } : {
    h: 32,
    px: 13,
    fs: 14
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: s.h,
      padding: '0 ' + s.px + 'px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      border: t.bd ? '1px solid ' + t.bd : 'none',
      font: 'var(--fw-medium) ' + s.fs + 'px/1 var(--font-sans)',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/depth/DepthStage.jsx
try { (() => {
function DepthStage({
  tilt = 1.5,
  perspective = 1800,
  children,
  style,
  height
}) {
  const ref = React.useRef(null);
  const [r, setR] = React.useState({
    x: 0,
    y: 0
  });
  const ok = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const onMove = e => {
    if (!ok || !tilt) return;
    const b = ref.current.getBoundingClientRect();
    const nx = (e.clientX - b.left) / b.width - .5,
      ny = (e.clientY - b.top) / b.height - .5;
    setR({
      x: -ny * tilt * 2,
      y: nx * tilt * 2
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onMouseMove: onMove,
    onMouseLeave: () => setR({
      x: 0,
      y: 0
    }),
    style: {
      position: 'relative',
      perspective: perspective + 'px',
      perspectiveOrigin: '50% 40%',
      height,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transform: 'rotateX(' + r.x.toFixed(2) + 'deg) rotateY(' + r.y.toFixed(2) + 'deg)',
      transition: 'transform 700ms var(--ease-out)'
    }
  }, children));
}
Object.assign(__ds_scope, { DepthStage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/depth/DepthStage.jsx", error: String((e && e.message) || e) }); }

// components/depth/ProductShot.jsx
try { (() => {
function ProductShot({
  src,
  alt = '',
  z = 0,
  x = 0,
  y = 0,
  scale = 1,
  rotate = 0,
  blur = 0,
  opacity = 1,
  elevation = 'window',
  radius = 'lg',
  frame = false,
  absolute = true,
  style,
  imgStyle
}) {
  const sh = {
    none: 'none',
    window: 'var(--shadow-window)',
    float: 'var(--shadow-float)',
    device: 'var(--shadow-device)'
  }[elevation];
  const rad = radius === 'none' ? 0 : 'var(--radius-' + radius + ')';
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      position: absolute ? 'absolute' : 'relative',
      margin: 0,
      transform: 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) scale(' + scale + ') rotate(' + rotate + 'deg)',
      filter: blur ? 'blur(' + blur + 'px)' : undefined,
      opacity,
      transition: 'transform var(--dur-slow) var(--ease-out), filter var(--dur-slow) var(--ease-out), opacity var(--dur-slow) var(--ease-out)',
      willChange: 'transform',
      borderRadius: rad,
      boxShadow: sh,
      overflow: 'hidden',
      background: frame ? '#fff' : undefined,
      border: frame ? '1px solid var(--border-subtle)' : undefined,
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    draggable: "false",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      ...imgStyle
    }
  }));
}
Object.assign(__ds_scope, { ProductShot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/depth/ProductShot.jsx", error: String((e && e.message) || e) }); }

// components/depth/ScrollScene.jsx
try { (() => {
function ScrollScene({
  length = 200,
  children,
  style,
  stickyStyle,
  id
}) {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      const total = b.height - window.innerHeight;
      const v = total > 0 ? Math.min(1, Math.max(0, -b.top / total)) : 0;
      setP(v);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    ref: ref,
    style: {
      position: 'relative',
      height: length + 'vh',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
      ...stickyStyle
    }
  }, typeof children === 'function' ? children(p) : children));
}
Object.assign(__ds_scope, { ScrollScene });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/depth/ScrollScene.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
  type = 'text',
  required = false,
  hint,
  error,
  name,
  style
}) {
  const [f, setF] = React.useState(false);
  const El = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 14px/1.3 var(--font-sans)',
      color: 'var(--text-strong)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      marginLeft: 4
    }
  }, "*")), /*#__PURE__*/React.createElement(El, {
    name: name,
    type: multiline ? undefined : type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: multiline ? 4 : undefined,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      height: multiline ? undefined : 52,
      padding: multiline ? '14px 16px' : '0 16px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (error ? 'var(--danger)' : f ? 'var(--border-focus)' : 'var(--border-strong)'),
      boxShadow: f ? '0 0 0 4px rgba(50,131,255,.12)' : 'none',
      background: '#fff',
      font: '400 16px/1.5 var(--font-sans)',
      color: 'var(--text-strong)',
      outline: 'none',
      resize: multiline ? 'vertical' : undefined,
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
      boxSizing: 'border-box',
      width: '100%'
    }
  }), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: error ? 'var(--danger)' : 'var(--text-subtle)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/layout/SceneHeader.jsx
try { (() => {
function SceneHeader({
  eyebrow = 'BoostChat',
  title,
  sub,
  size = 'lg',
  align = 'left',
  step,
  style
}) {
  const fs = {
    xl: 'clamp(40px,5.2vw,72px)',
    lg: 'clamp(30px,3.9vw,56px)',
    md: 'clamp(26px,2.8vw,40px)'
  }[size] || 'clamp(30px,3.9vw,56px)';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      textAlign: align,
      maxWidth: align === 'center' ? 880 : 780,
      margin: align === 'center' ? '0 auto' : 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      font: 'var(--type-eyebrow)',
      color: 'var(--text-accent)'
    }
  }, step && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1 var(--font-mono)',
      color: 'var(--text-subtle)'
    }
  }, step), /*#__PURE__*/React.createElement("span", null, eyebrow)), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '12px 0 0',
      font: 'var(--fw-bold) ' + fs + '/1.2 var(--font-sans)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--text-strong)',
      textWrap: 'balance',
      wordBreak: 'keep-all'
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      font: 'var(--type-lead)',
      color: 'var(--text-muted)',
      letterSpacing: 'var(--ls-body)',
      textWrap: 'pretty',
      wordBreak: 'keep-all'
    }
  }, sub));
}
Object.assign(__ds_scope, { SceneHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SceneHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteNav.jsx
try { (() => {
function SiteNav({
  links = [],
  cta = '도입 상담 신청',
  onCta,
  active,
  solid = false,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      height: 64,
      padding: '0 var(--page-gutter)',
      background: solid ? 'rgba(241,242,244,.86)' : 'transparent',
      backdropFilter: solid ? 'saturate(1.4) blur(14px)' : undefined,
      WebkitBackdropFilter: solid ? 'saturate(1.4) blur(14px)' : undefined,
      borderBottom: solid ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base)',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      font: '800 20px/1 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--accent)',
      textDecoration: 'none'
    }
  }, "BoostChat"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      marginLeft: 'auto'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    style: {
      font: '500 15px/1 var(--font-sans)',
      color: active === l.href ? 'var(--text-strong)' : 'var(--text-muted)',
      textDecoration: 'none'
    }
  }, l.label))), cta && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCta,
    style: {
      height: 40,
      padding: '0 18px',
      borderRadius: 999,
      border: 0,
      background: 'var(--accent)',
      color: '#fff',
      font: '600 14px/1 var(--font-sans)',
      cursor: 'pointer'
    }
  }, cta));
}
Object.assign(__ds_scope, { SiteNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/StoryRail.jsx
try { (() => {
function StoryRail({
  steps = [],
  current = 0,
  onSelect,
  orientation = 'vertical',
  style
}) {
  const v = orientation === 'vertical';
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: v ? 'column' : 'row',
      gap: v ? 14 : 6,
      ...style
    }
  }, steps.map((s, i) => {
    const on = i === current,
      done = i < current;
    return /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onSelect && onSelect(i),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'none',
        border: 0,
        padding: 0,
        cursor: 'pointer',
        font: (on ? '600 ' : '500 ') + '13px/1.2 var(--font-sans)',
        color: on ? 'var(--text-strong)' : 'var(--text-faint)',
        transition: 'color var(--dur-base)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: v ? on ? 22 : 10 : on ? 28 : 14,
        height: 3,
        borderRadius: 2,
        background: on ? 'var(--accent)' : done ? 'var(--gray-400)' : 'var(--gray-300)',
        transition: 'width var(--dur-base) var(--ease-out), background var(--dur-base)'
      }
    }), v && /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: on ? 1 : .9
      }
    }, s)));
  }));
}
Object.assign(__ds_scope, { StoryRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/StoryRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sales-landing/Closing.jsx
try { (() => {
const {
  Button: CButton,
  Field: CField,
  SceneHeader: CSceneHeader
} = window.BoostChatDesignSystem_29c1c3;
function Closing() {
  const mobile = useIsMobile();
  const narrow = useIsNarrow();
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    company: '',
    phone: '',
    site: '',
    note: ''
  });
  const [err, setErr] = React.useState({});
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));
  const submit = e => {
    e.preventDefault();
    const x = {};
    if (!form.company) x.company = '업체명을 입력해 주세요.';
    if (!form.phone) x.phone = '연락처를 입력해 주세요.';
    setErr(x);
    if (!Object.keys(x).length) setSent(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    "data-screen-label": "\uB3C4\uC785 \uC0C1\uB2F4",
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: mobile ? '96px 20px 64px' : '160px var(--page-gutter) 120px',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: narrow ? '1fr' : 'minmax(0,1fr) minmax(0,520px)',
      gap: mobile ? 40 : narrow ? 48 : 96,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CSceneHeader, {
    eyebrow: "\uB3C4\uC785 \uC0C1\uB2F4",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "\uADC0\uC0AC \uD648\uD398\uC774\uC9C0\uC5D0\uB3C4", mobile ? ' ' : /*#__PURE__*/React.createElement("br", null), "\uC801\uC6A9\uD560 \uC218 \uC788\uB294\uC9C0 \uD655\uC778\uD574\uBCF4\uC138\uC694."),
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\uD604\uC7AC \uD648\uD398\uC774\uC9C0\uB97C \uAC04\uB2E8\uD788 \uD655\uC778\uD55C \uB4A4", mobile ? ' ' : /*#__PURE__*/React.createElement("br", null), "\uC801\uC6A9 \uAC00\uB2A5\uD55C \uBC29\uC2DD\uC744 \uC548\uB0B4\uD574\uB4DC\uB9BD\uB2C8\uB2E4.")
  })), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-window)',
      padding: mobile ? 24 : 36,
      display: 'grid',
      gap: 18
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 0',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 24px/1.3 var(--font-sans)',
      color: 'var(--text-strong)'
    }
  }, "\uC2E0\uCCAD\uC774 \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-muted)',
      margin: '10px 0 24px'
    }
  }, "\uD655\uC778 \uD6C4 ", form.phone, "\uB85C \uC5F0\uB77D\uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/React.createElement(CButton, {
    variant: "secondary",
    onClick: () => {
      setSent(false);
      setForm({
        company: '',
        phone: '',
        site: '',
        note: ''
      });
    }
  }, "\uB2E4\uC2DC \uC791\uC131")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CField, {
    label: "\uC5C5\uCCB4\uBA85",
    required: true,
    placeholder: "\uBD80\uC2A4\uD2B8 \uC778\uD14C\uB9AC\uC5B4",
    value: form.company,
    onChange: set('company'),
    error: err.company
  }), /*#__PURE__*/React.createElement(CField, {
    label: "\uC5F0\uB77D\uCC98",
    required: true,
    type: "tel",
    placeholder: "010-1234-5678",
    value: form.phone,
    onChange: set('phone'),
    error: err.phone
  }), /*#__PURE__*/React.createElement(CField, {
    label: "\uD648\uD398\uC774\uC9C0 \uC8FC\uC18C",
    type: "url",
    placeholder: "https://",
    value: form.site,
    onChange: set('site'),
    hint: "\uC124\uCE58 \uAC00\uB2A5 \uC5EC\uBD80\uB97C \uBBF8\uB9AC \uD655\uC778\uD569\uB2C8\uB2E4."
  }), /*#__PURE__*/React.createElement(CField, {
    label: "\uBB38\uC758 \uB0B4\uC6A9",
    multiline: true,
    placeholder: "\uC5B4\uB5A4 \uC810\uC774 \uAD81\uAE08\uD558\uC2E0\uAC00\uC694?",
    value: form.note,
    onChange: set('note')
  }), /*#__PURE__*/React.createElement(CButton, {
    type: "submit",
    size: "lg",
    full: true
  }, "\uB3C4\uC785 \uC0C1\uB2F4 \uC2E0\uCCAD"))));
}
function Footer() {
  const mobile = useIsMobile();
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: mobile ? '28px 20px' : '32px var(--page-gutter)',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 18px/1 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--accent)'
    }
  }, "BoostChat"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-subtle)'
    }
  }, "\uD654\uBA74 \uC18D \uC5C5\uCCB4 \xB7 \uBB38\uC758\uB294 \uCD2C\uC601\uC6A9 \uB370\uBAA8 \uB370\uC774\uD130\uC785\uB2C8\uB2E4.")));
}
Object.assign(window, {
  Closing,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sales-landing/Closing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sales-landing/Hero.jsx
try { (() => {
const {
  SceneHeader: HSceneHeader,
  Button: HButton,
  DepthStage: HDepthStage,
  ProductShot: HProductShot
} = window.BoostChatDesignSystem_29c1c3;
const FLOW = ['대화', '관련 사례', '사진', '상담', '견적 문의'];
function FlowLine({
  active
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '10px 12px'
    }
  }, FLOW.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 36,
      padding: '0 14px 0 8px',
      borderRadius: 999,
      background: i === active ? 'var(--text-strong)' : '#fff',
      color: i === active ? '#fff' : 'var(--text-body)',
      boxShadow: i === active ? 'none' : 'var(--shadow-hairline)',
      font: '600 14px/1 var(--font-sans)',
      transition: 'background 400ms var(--ease-out), color 400ms var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 999,
      display: 'inline-grid',
      placeItems: 'center',
      background: i === active ? 'var(--accent)' : 'var(--gray-100)',
      color: i === active ? '#fff' : 'var(--text-subtle)',
      font: '600 11px/1 var(--font-mono)',
      transition: 'background 400ms'
    }
  }, i + 1), f), i < FLOW.length - 1 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--gray-400)',
      fontSize: 14
    }
  }, "\u2192"))));
}
function Hero({
  onCta
}) {
  const mobile = useIsMobile();
  const [active, setActive] = React.useState(0);
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % FLOW.length), 1800);
    return () => clearInterval(t);
  }, []);
  React.useEffect(() => {
    if (mobile) return;
    const f = () => setY(window.scrollY);
    f();
    window.addEventListener('scroll', f, {
      passive: true
    });
    return () => window.removeEventListener('scroll', f);
  }, [mobile]);
  const k = Math.min(1, y / 700);
  const P = window.KIT_ASSETS;
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    "data-screen-label": "01 Hero",
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: mobile ? '104px 20px 24px' : '148px var(--page-gutter) 80px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(HSceneHeader, {
    size: "xl",
    eyebrow: "BoostChat \xB7 \uC778\uD14C\uB9AC\uC5B4 \xB7 \uB9AC\uBAA8\uB378\uB9C1 \uC5C5\uCCB4\uB97C \uC704\uD55C AI \uC0C1\uB2F4",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "\uD648\uD398\uC774\uC9C0\uAE4C\uC9C0 \uCC3E\uC544\uC628 \uACE0\uAC1D,", /*#__PURE__*/React.createElement("br", null), "\uACAC\uC801 \uBB38\uC758\uAE4C\uC9C0 \uC790\uC5F0\uC2A4\uB7FD\uAC8C", /*#__PURE__*/React.createElement("br", null), "\uC774\uC5B4\uC9C0\uACE0 \uC788\uB098\uC694?"),
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\uACE0\uAC1D\uC774 \uC6D0\uD558\uB294 \uACF5\uC0AC\uB97C \uB9D0\uD558\uBA74 \uAD00\uB828 \uC2DC\uACF5\uC0AC\uB840\uB97C \uCC3E\uC544\uC8FC\uACE0,", mobile ? ' ' : /*#__PURE__*/React.createElement("br", null), "\uC0AC\uC9C4\uC744 \uBCF4\uBA70 \uC0C1\uB2F4\uD55C \uB4A4 \uACAC\uC801 \uBB38\uC758\uAE4C\uC9C0 \uC5F0\uACB0\uD569\uB2C8\uB2E4."),
    style: {
      maxWidth: 980
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(HButton, {
    size: "lg",
    arrow: true,
    onClick: onCta
  }, "\uB3C4\uC785 \uC0C1\uB2F4 \uC2E0\uCCAD"), /*#__PURE__*/React.createElement(HButton, {
    size: "lg",
    variant: "secondary",
    href: "#talk"
  }, "\uC791\uB3D9 \uBC29\uC2DD \uBCF4\uAE30")), /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: '18px 0 0',
      font: '500 14px/1.4 var(--font-sans)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: 'var(--accent)'
    }
  }), "\uAE30\uC874 \uC778\uD14C\uB9AC\uC5B4 \uD648\uD398\uC774\uC9C0\uC5D0\uB3C4 \uC124\uCE58\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(FlowLine, {
    active: active
  })), mobile ? /*#__PURE__*/React.createElement("img", {
    src: P + 'scene-02-portfolio.png',
    alt: "",
    style: {
      width: '100%',
      display: 'block',
      marginTop: 36,
      borderRadius: 12
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 72,
      aspectRatio: String(1400 / 790),
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(HDepthStage, {
    height: "100%"
  }, /*#__PURE__*/React.createElement(HProductShot, {
    src: P + 'layer-site-full.png',
    style: {
      left: '1.43%',
      top: '4.56%',
      width: '89.1%',
      transition: 'none',
      transform: `translate3d(0, ${-k * 30}px, ${-k * 60}px)`
    }
  }), /*#__PURE__*/React.createElement(HProductShot, {
    src: P + 'layer-portfolio-card.png',
    elevation: "float",
    style: {
      left: '62.9%',
      top: '30.6%',
      width: '28.9%',
      transition: 'none',
      transform: `translate3d(0, ${-k * 80}px, ${40 + k * 40}px)`
    }
  }))));
}
Object.assign(window, {
  Hero,
  FlowLine
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sales-landing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sales-landing/Scenes.jsx
try { (() => {
const {
  SceneHeader,
  ScrollScene,
  DepthStage,
  ProductShot,
  Tag
} = window.BoostChatDesignSystem_29c1c3;
const P = '../../assets/product/';
const clamp = v => Math.max(0, Math.min(1, v));
const ease = t => 1 - Math.pow(1 - t, 3);
const seg = (p, a, b) => ease(clamp((p - a) / (b - a)));
const lerp = (a, b, t) => a + (b - a) * t;
function useIsMobile() {
  const q = '(max-width: 820px)';
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(q);
    const f = () => setM(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return m;
}
function useMedia(q) {
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(q);
    const f = () => setM(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, [q]);
  return m;
}
const useIsNarrow = () => useMedia('(max-width: 1100px)');
function Reveal({
  children,
  style
}) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, {
      threshold: .15
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(16px)',
      transition: 'opacity 700ms var(--ease-out), transform 700ms var(--ease-out)',
      ...style
    }
  }, children);
}
const tf = ({
  x = 0,
  y = 0,
  z = 0,
  s = 1,
  ry = 0
}) => `translate3d(${x}%, ${y}%, ${z}px) scale(${s}) rotateY(${ry}deg)`;

/* Scene definitions — positions are % of the original capture frame so layers line up exactly */
const SCENES = [{
  id: 'talk',
  rail: '대화',
  ar: 1400 / 790,
  mobile: 'scene-09-install.png',
  title: '방문자가 평소 말투로 상담을 시작합니다.',
  sub: '평수 · 공사 범위 · 스타일을 대화 속에서 이해합니다.',
  layers: p => [{
    src: 'layer-site-hero.png',
    l: 1.43,
    t: 4.56,
    w: 60.7,
    elev: 'window',
    st: {
      transform: tf({
        z: lerp(0, -50, seg(p, .1, .6))
      }),
      filter: `blur(${lerp(0, 1.2, seg(p, .3, .7))}px)`
    }
  }, {
    src: 'layer-chat-welcome.png',
    l: 61.4,
    t: 1.27,
    w: 35.7,
    elev: 'none',
    r: 'none',
    st: {
      transform: tf({
        z: 30
      }),
      opacity: 1 - seg(p, .3, .5)
    }
  }, {
    src: 'layer-chat-widget.png',
    l: 61.4,
    t: 1.27,
    w: 35.7,
    elev: 'none',
    r: 'none',
    st: {
      transform: tf({
        z: lerp(30, 50, seg(p, .3, .6)),
        y: lerp(2, 0, seg(p, .3, .6))
      }),
      opacity: seg(p, .3, .5)
    }
  }]
}, {
  id: 'recommend',
  rail: '사례 추천',
  ar: 1400 / 790,
  mobile: 'scene-02-portfolio.png',
  title: '조건에 맞는 우리 업체 시공 사례를 바로 보여줍니다.',
  sub: '지역 · 평형 · 공사 범위가 비슷한 사례를 카드로 추천합니다.',
  layers: p => [{
    src: 'layer-site-full.png',
    l: 1.43,
    t: 4.56,
    w: 89.1,
    elev: 'window',
    st: {
      transform: tf({
        z: lerp(0, -70, seg(p, .1, .6))
      }),
      filter: `blur(${lerp(0, 1.5, seg(p, .2, .6))}px)`
    }
  }, {
    src: 'layer-portfolio-card.png',
    l: 62.9,
    t: 30.6,
    w: 28.9,
    elev: 'float',
    r: 'lg',
    st: {
      transform: tf({
        y: lerp(18, 0, seg(p, .1, .55)),
        z: lerp(0, 70, seg(p, .1, .55))
      }),
      opacity: seg(p, .05, .35)
    }
  }]
}, {
  id: 'viewer',
  rail: '사례 뷰어',
  ar: 1400 / 790,
  mobile: 'scene-03-viewer.png',
  title: '상담창을 떠나지 않고 사례를 크게 봅니다.',
  sub: '사진과 평형 · 공사 범위 · 스타일 정보를 한 화면에서 확인합니다.',
  layers: p => [{
    src: 'layer-site-full.png',
    l: 1.43,
    t: 4.56,
    w: 89.1,
    elev: 'window',
    st: {
      transform: tf({
        z: -80
      }),
      filter: `blur(${lerp(0, 3, seg(p, .05, .45))}px) brightness(${lerp(1, .42, seg(p, .05, .45))})`
    }
  }, {
    src: 'layer-viewer-modal.png',
    l: 14.6,
    t: 9.7,
    w: 62.7,
    elev: 'float',
    r: 'md',
    st: {
      transform: tf({
        s: lerp(.86, 1, seg(p, .1, .55)),
        z: lerp(-40, 20, seg(p, .1, .55))
      }),
      opacity: seg(p, .05, .3)
    }
  }, {
    src: 'layer-viewer-card.png',
    l: 71.9,
    t: 8,
    w: 34.4,
    elev: 'float',
    r: 'lg',
    st: {
      transform: tf({
        x: lerp(10, 0, seg(p, .45, .8)),
        z: 80
      }),
      opacity: seg(p, .45, .7)
    }
  }]
}, {
  id: 'photos',
  rail: '사진',
  ar: 2,
  mobile: 'scene-04-photos.png',
  title: '사진을 넘기며 시공 결과를 확인합니다.',
  sub: '한 사례의 여러 사진을 상담 중에 바로 넘겨 봅니다.',
  layers: p => [{
    src: 'photo-sink.png',
    l: 67.7,
    t: 2.1,
    w: 30.7,
    elev: 'window',
    r: 'md',
    st: {
      transform: tf({
        x: lerp(-150, 0, seg(p, .15, .6)),
        y: lerp(30, 0, seg(p, .15, .6)),
        z: lerp(-80, 10, seg(p, .15, .6))
      }),
      opacity: seg(p, .1, .3)
    }
  }, {
    src: 'photo-bath.png',
    l: 67.7,
    t: 52.4,
    w: 30.7,
    elev: 'window',
    r: 'md',
    st: {
      transform: tf({
        x: lerp(-150, 0, seg(p, .25, .7)),
        y: lerp(-70, 0, seg(p, .25, .7)),
        z: lerp(-80, 10, seg(p, .25, .7))
      }),
      opacity: seg(p, .2, .4)
    }
  }, {
    src: 'photo-kitchen.png',
    l: 1.43,
    t: 2.1,
    w: 64.3,
    elev: 'float',
    r: 'lg',
    st: {
      transform: tf({
        x: lerp(12, 0, seg(p, .1, .6)),
        s: lerp(1.04, 1, seg(p, .1, .6)),
        z: 20
      })
    }
  }]
}, {
  id: 'memory',
  rail: '맥락 기억',
  ar: 1400 / 790,
  mobile: 'scene-05-memory.png',
  title: '처음부터 다시 설명할 필요가 없습니다.',
  sub: '앞서 말한 지역 · 면적 · 공사 범위를 기억하고 견적 상담을 이어갑니다.',
  tags: ['대구', '아파트 · 공급 32평', '주방 · 욕실', '화이트'],
  layers: p => [{
    src: 'layer-site-full.png',
    l: 1.43,
    t: 4.56,
    w: 89.1,
    elev: 'window',
    st: {
      transform: tf({
        z: -70
      }),
      filter: `blur(${lerp(0, 2, seg(p, .1, .5))}px)`
    }
  }, {
    src: 'layer-chat-memory.png',
    l: 61.4,
    t: 1.27,
    w: 35.7,
    elev: 'none',
    r: 'none',
    st: {
      transform: tf({
        z: lerp(0, 50, seg(p, .1, .5))
      })
    }
  }]
}, {
  id: 'inquiry',
  rail: '견적 문의',
  ar: 1400 / 790,
  mobile: 'scene-06-inquiry.png',
  title: '대화가 견적 문의로 이어집니다.',
  sub: '상담창 안에서 이름 · 연락처 · 문의 내용을 바로 남깁니다.',
  layers: p => [{
    src: 'layer-site-hero.png',
    l: 1.43,
    t: 4.56,
    w: 60.7,
    elev: 'window',
    st: {
      transform: tf({
        z: -60
      }),
      filter: `blur(${lerp(0, 2, seg(p, .1, .5))}px)`
    }
  }, {
    src: 'layer-chat-form.png',
    l: 61.4,
    t: 1.27,
    w: 35.7,
    elev: 'none',
    r: 'none',
    st: {
      transform: tf({
        z: lerp(0, 60, seg(p, .1, .5)),
        x: lerp(0, -12, seg(p, .1, .6))
      })
    }
  }]
}, {
  id: 'owner',
  rail: '관리 화면',
  ar: 1400 / 760,
  eyebrow: 'BoostChat · 사업자 관리 화면',
  mobile: 'scene-07-dashboard.png',
  title: '들어온 문의는 한눈에 정리됩니다.',
  sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\uACE0\uAC1D\uC5D0\uAC8C \uB2E4\uC2DC \uCC98\uC74C\uBD80\uD130 \uBB3C\uC5B4\uBCF4\uAE30 \uC804\uC5D0,", /*#__PURE__*/React.createElement("br", null), "\uC5B4\uB5A4 \uACF5\uC0AC\uB97C \uC6D0\uD558\uB294\uC9C0 \uBA3C\uC800 \uD655\uC778\uD558\uACE0 \uC5F0\uB77D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."),
  note: '화면 속 문의는 촬영용 데모 데이터입니다.',
  layers: p => [{
    src: 'layer-dashboard.png',
    l: 1.43,
    t: 2.1,
    w: 89.1,
    elev: 'window',
    st: {
      transform: tf({
        z: lerp(0, -70, seg(p, .1, .55))
      }),
      filter: `blur(${lerp(0, 1.5, seg(p, .2, .6))}px)`
    }
  }, {
    src: 'layer-inquiry-card.png',
    l: 10,
    t: 10.4,
    w: 84.5,
    elev: 'float',
    r: 'lg',
    st: {
      transform: tf({
        y: lerp(10, 0, seg(p, .1, .55)),
        z: lerp(0, 70, seg(p, .1, .55))
      }),
      opacity: seg(p, .05, .35)
    }
  }]
}];
function Layer({
  L
}) {
  return /*#__PURE__*/React.createElement(ProductShot, {
    src: P + L.src,
    elevation: L.elev,
    radius: L.r || 'lg',
    style: {
      left: L.l + '%',
      top: L.t + '%',
      width: L.w + '%',
      transition: 'none',
      ...L.st
    }
  });
}
function Visual({
  s,
  p
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: `min(100%, calc((100vh - 330px) * ${s.ar}))`,
      aspectRatio: String(s.ar),
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(DepthStage, {
    height: "100%"
  }, s.layers(p).map((L, i) => /*#__PURE__*/React.createElement(Layer, {
    key: i,
    L: L
  })), s.tags && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '44%',
      top: '28%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 12,
      transform: 'translateZ(90px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px/1 var(--font-sans)',
      color: 'var(--text-subtle)',
      opacity: seg(p, .2, .35)
    }
  }, "\uAE30\uC5B5\uD55C \uC870\uAC74"), s.tags.map((t, i) => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    tone: i === 0 ? 'accent' : 'neutral',
    style: {
      background: i === 0 ? 'var(--accent-soft)' : '#fff',
      boxShadow: 'var(--shadow-md)',
      opacity: seg(p, .25 + i * .1, .4 + i * .1),
      transform: `translateX(${lerp(16, 0, seg(p, .25 + i * .1, .45 + i * .1))}px)`
    }
  }, t)))));
}
function StoryScene({
  s,
  index,
  total,
  onProgress
}) {
  const mobile = useIsMobile();
  const step = String(index + 2).padStart(2, '0') + ' / ' + String(total + 1).padStart(2, '0');
  if (mobile) return /*#__PURE__*/React.createElement("section", {
    id: s.id,
    "data-screen-label": s.rail,
    style: {
      padding: '72px 20px 0'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SceneHeader, {
    size: "md",
    step: step,
    eyebrow: s.eyebrow,
    title: s.title,
    sub: s.sub
  })), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: P + s.mobile,
    alt: "",
    style: {
      width: '100%',
      display: 'block',
      borderRadius: 12
    }
  })), s.note && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-subtle)',
      margin: '12px 0 0'
    }
  }, s.note));
  return /*#__PURE__*/React.createElement(ScrollScene, {
    id: s.id,
    length: 210
  }, p => {
    onProgress && onProgress(index, p);
    return /*#__PURE__*/React.createElement("div", {
      "data-screen-label": s.rail,
      style: {
        maxWidth: 'var(--page-max)',
        margin: '0 auto',
        padding: '104px var(--page-gutter) 0',
        boxSizing: 'border-box',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        opacity: seg(p, 0, .12) * .3 + .7
      }
    }, /*#__PURE__*/React.createElement(SceneHeader, {
      step: step,
      eyebrow: s.eyebrow,
      title: s.title,
      sub: s.sub
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 48,
        flex: 1,
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement(Visual, {
      s: s,
      p: p
    })), s.note && /*#__PURE__*/React.createElement("p", {
      style: {
        position: 'absolute',
        right: 'var(--page-gutter)',
        bottom: 24,
        font: 'var(--type-caption)',
        color: 'var(--text-subtle)',
        margin: 0
      }
    }, s.note));
  });
}
function MobileScene({
  index,
  total
}) {
  const mobile = useIsMobile();
  const step = String(index + 2).padStart(2, '0') + ' / ' + String(total + 1).padStart(2, '0');
  const head = /*#__PURE__*/React.createElement(SceneHeader, {
    size: mobile ? 'md' : 'lg',
    step: step,
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "\uBAA8\uBC14\uC77C\uC5D0\uC11C\uB3C4", /*#__PURE__*/React.createElement("br", null), "\uBC14\uB85C \uC0C1\uB2F4\uD569\uB2C8\uB2E4."),
    sub: "\uD734\uB300\uD3F0\uC5D0\uC11C\uB294 \uC0C1\uB2F4\uCC3D\uACFC \uC0AC\uB840 \uBDF0\uC5B4\uAC00 \uD654\uBA74 \uC804\uCCB4\uB85C \uC5F4\uB9BD\uB2C8\uB2E4."
  });
  if (mobile) return /*#__PURE__*/React.createElement("section", {
    id: "mobile",
    "data-screen-label": "\uBAA8\uBC14\uC77C",
    style: {
      padding: '72px 20px 0'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, head), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: P + 'scene-08-mobile.png',
    alt: "",
    style: {
      width: '100%',
      display: 'block'
    }
  })));
  return /*#__PURE__*/React.createElement(ScrollScene, {
    id: "mobile",
    length: 190
  }, p => /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "\uBAA8\uBC14\uC77C",
    style: {
      maxWidth: 'var(--page-max)',
      margin: '0 auto',
      padding: '64px var(--page-gutter) 0',
      boxSizing: 'border-box',
      height: '100%',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,.8fr) minmax(0,1fr)',
      alignItems: 'center',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, head), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'min(82vh, 760px)',
      aspectRatio: '860/830',
      justifySelf: 'end',
      maxWidth: '100%'
    }
  }, /*#__PURE__*/React.createElement(DepthStage, {
    height: "100%",
    perspective: 1400
  }, /*#__PURE__*/React.createElement(ProductShot, {
    src: P + 'layer-phone-chat.png',
    elevation: "none",
    radius: "none",
    style: {
      left: '1.9%',
      top: '1.9%',
      width: '44.2%',
      transition: 'none',
      transform: tf({
        y: lerp(6, 0, seg(p, .05, .5)),
        ry: lerp(10, 5, seg(p, .05, .6)),
        z: lerp(-40, 0, seg(p, .05, .5))
      }),
      filter: 'drop-shadow(0 30px 40px rgba(16,24,40,.18))'
    }
  }), /*#__PURE__*/React.createElement(ProductShot, {
    src: P + 'layer-phone-viewer.png',
    elevation: "none",
    radius: "none",
    style: {
      left: '52%',
      top: '1.9%',
      width: '44.2%',
      transition: 'none',
      transform: tf({
        y: lerp(14, 0, seg(p, .15, .65)),
        ry: lerp(-10, -5, seg(p, .15, .7)),
        z: lerp(-40, 30, seg(p, .15, .65))
      }),
      opacity: seg(p, .1, .35),
      filter: 'drop-shadow(0 30px 40px rgba(16,24,40,.18))'
    }
  })))));
}
function InstallScene({
  index,
  total,
  onProgress
}) {
  const s = {
    id: 'install',
    rail: '설치',
    ar: 1400 / 790,
    mobile: 'scene-09-install.png',
    title: '우리 홈페이지에 AI 상담창이 붙습니다.',
    sub: '기존 홈페이지는 그대로 두고, 방문자는 버튼 하나로 바로 상담을 시작합니다.',
    layers: p => [{
      src: 'layer-site-hero.png',
      l: 1.43,
      t: 4.56,
      w: 60.7,
      elev: 'window',
      st: {
        transform: tf({
          x: lerp(24, 0, seg(p, .1, .55)),
          z: lerp(20, -30, seg(p, .1, .6))
        })
      }
    }, {
      src: 'layer-chat-welcome.png',
      l: 61.4,
      t: 1.27,
      w: 35.7,
      elev: 'none',
      r: 'none',
      st: {
        transform: tf({
          x: lerp(-20, 0, seg(p, .3, .7)),
          y: lerp(8, 0, seg(p, .3, .7)),
          z: lerp(-40, 40, seg(p, .3, .7))
        }),
        opacity: seg(p, .3, .55)
      }
    }]
  };
  return /*#__PURE__*/React.createElement(StoryScene, {
    s: s,
    index: index,
    total: total,
    onProgress: onProgress
  });
}
Object.assign(window, {
  useMedia,
  useIsNarrow,
  SCENES,
  StoryScene,
  MobileScene,
  InstallScene,
  useIsMobile,
  Reveal,
  seg,
  lerp,
  KIT_ASSETS: P
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sales-landing/Scenes.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sales-landing/Sections.jsx
try { (() => {
const {
  SceneHeader: SSceneHeader,
  Button: SButton
} = window.BoostChatDesignSystem_29c1c3;
const DEMO_URL = '#'; // TODO: real demo site
const VIDEO_SRC = ''; // TODO: 86s product demo (mp4/webm)
const VIDEO_POSTER = '../../assets/product/scene-01-conversation.png';
function Sec({
  id,
  label,
  children,
  style,
  inner
}) {
  const mobile = useIsMobile();
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    "data-screen-label": label,
    style: {
      padding: mobile ? '88px 20px' : '160px var(--page-gutter)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'calc(var(--page-max) - var(--page-gutter) * 2)',
      margin: '0 auto',
      ...inner
    }
  }, children));
}
const br = mobile => mobile ? ' ' : /*#__PURE__*/React.createElement("br", null);

/* 1 — Problem */
const JOURNEY = ['시공사례 찾기', '우리 집과 비슷한지 판단', '공사 범위 고민', '문의 방법 찾기', '견적 작성'];
function Problem() {
  const m = useIsMobile();
  return /*#__PURE__*/React.createElement(Sec, {
    id: "problem",
    label: "\uBB38\uC81C"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SSceneHeader, {
    eyebrow: "\uACAC\uC801 \uBB38\uC758 \uC804\uAE4C\uC9C0",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "\uACE0\uAC1D\uC740 \uACAC\uC801 \uBB38\uC758\uB97C \uB0A8\uAE30\uAE30 \uC804\uAE4C\uC9C0", br(m), "\uC0DD\uAC01\uBCF4\uB2E4 \uB9CE\uC740 \uD310\uB2E8\uC744 \uD574\uC57C \uD569\uB2C8\uB2E4.")
  })), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginTop: m ? 40 : 72
    }
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gridTemplateColumns: m ? '1fr' : 'repeat(5, minmax(0,1fr))',
      gap: m ? 0 : 16,
      position: 'relative'
    }
  }, JOURNEY.map((j, i) => /*#__PURE__*/React.createElement("li", {
    key: j,
    style: {
      display: 'flex',
      flexDirection: m ? 'row' : 'column',
      gap: m ? 16 : 18,
      alignItems: m ? 'center' : 'flex-start',
      padding: m ? '14px 0' : 0,
      borderTop: m && i ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: m ? 'auto' : '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1 var(--font-mono)',
      color: 'var(--text-subtle)'
    }
  }, String(i + 1).padStart(2, '0')), !m && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-strong)'
    }
  }), !m && i < JOURNEY.length - 1 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--gray-400)',
      fontSize: 14,
      marginLeft: -4
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 ${m ? 18 : 22}px/1.35 var(--font-sans)`,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      wordBreak: 'keep-all'
    }
  }, j))))), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginTop: m ? 32 : 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-window)',
      padding: m ? '18px 22px' : '22px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      border: '1px solid var(--blue-200)',
      borderRadius: m ? 'var(--radius-xl)' : 'var(--radius-pill)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: 'var(--accent)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 ${m ? 17 : 22}px/1.4 var(--font-sans)`,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      wordBreak: 'keep-all'
    }
  }, "BoostChat\uC740 \uC774 \uACFC\uC815\uC744 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\uD558\uB098\uC758 \uB300\uD654"), " \uC548\uC5D0\uC11C \uC774\uC5B4\uC90D\uB2C8\uB2E4."))));
}

/* 4 — Demo video */
function DemoVideo() {
  const m = useIsMobile();
  const [play, setPlay] = React.useState(false);
  return /*#__PURE__*/React.createElement(Sec, {
    id: "video",
    label: "\uB370\uBAA8 \uC601\uC0C1",
    style: {
      paddingBottom: m ? 88 : 120
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SSceneHeader, {
    eyebrow: "\uB370\uBAA8 \uC601\uC0C1 \xB7 1\uBD84 26\uCD08",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "\uB9D0\uBCF4\uB2E4 \uBE60\uB974\uAC8C,", br(m), "\uC2E4\uC81C \uC791\uB3D9 \uBAA8\uC2B5\uC744 \uD655\uC778\uD574\uBCF4\uC138\uC694."),
    sub: /*#__PURE__*/React.createElement(React.Fragment, null, "\uACE0\uAC1D\uC774 \uB9D0\uC744 \uC2DC\uC791\uD558\uACE0, \uC0AC\uB840\uB97C \uBCF4\uACE0,", br(m), "\uACAC\uC801 \uBB38\uC758\uB97C \uB0A8\uAE30\uAE30\uAE4C\uC9C0 \uC2E4\uC81C \uD750\uB984\uC785\uB2C8\uB2E4.")
  })), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginTop: m ? 32 : 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16 / 9',
      borderRadius: m ? 'var(--radius-md)' : 'var(--radius-xl)',
      overflow: 'hidden',
      background: 'var(--gray-900)',
      boxShadow: 'var(--shadow-float)'
    }
  }, play && VIDEO_SRC ? /*#__PURE__*/React.createElement("video", {
    src: VIDEO_SRC,
    poster: VIDEO_POSTER,
    controls: true,
    autoPlay: true,
    playsInline: true,
    style: {
      width: '100%',
      height: '100%',
      display: 'block',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: VIDEO_POSTER,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'brightness(.62) saturate(.9)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPlay(true),
    "aria-label": "\uB370\uBAA8 \uC601\uC0C1 \uC7AC\uC0DD",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'none',
      border: 0,
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: m ? 64 : 96,
      height: m ? 64 : 96,
      borderRadius: 999,
      background: 'rgba(255,255,255,.96)',
      display: 'grid',
      placeItems: 'center',
      boxShadow: 'var(--shadow-float)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 0,
      height: 0,
      borderTop: `${m ? 10 : 14}px solid transparent`,
      borderBottom: `${m ? 10 : 14}px solid transparent`,
      borderLeft: `${m ? 16 : 22}px solid var(--gray-900)`,
      marginLeft: m ? 4 : 6
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: m ? 16 : 32,
      bottom: m ? 14 : 28,
      right: m ? 16 : 32,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 ${m ? 14 : 17}px/1.3 var(--font-sans)`
    }
  }, play && !VIDEO_SRC ? '영상 파일 연결 예정' : '대화 → 사례 추천 → 사진 → 견적 문의'), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px/1 var(--font-mono)',
      background: 'rgba(16,24,40,.6)',
      padding: '6px 10px',
      borderRadius: 999
    }
  }, "1:26"))))));
}

/* 5 — Before / After */
const BEFORE = ['방문', '시공사례 탐색', '내 조건과 맞는지 판단', '문의 방법 찾기', '견적 양식'];
const AFTER = ['방문', '원하는 공사 말하기', '관련 사례 추천', '사진 확인', '상담', '견적 문의'];
function FlowCol({
  title,
  steps,
  on
}) {
  const m = useIsMobile();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: on ? '#fff' : 'transparent',
      border: on ? '1px solid var(--blue-200)' : '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: on ? 'var(--shadow-window)' : 'none',
      padding: m ? 24 : 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      font: 'var(--type-eyebrow)',
      color: on ? 'var(--text-accent)' : 'var(--text-subtle)'
    }
  }, title), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: '24px 0 0',
      padding: 0
    }
  }, steps.map((s, i) => {
    const last = i === steps.length - 1;
    return /*#__PURE__*/React.createElement("li", {
      key: s,
      style: {
        display: 'flex',
        gap: 16,
        alignItems: 'stretch'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: last ? 14 : 10,
        height: last ? 14 : 10,
        marginTop: last ? 7 : 9,
        borderRadius: 999,
        flex: 'none',
        background: on ? last ? 'var(--accent)' : '#fff' : last ? 'var(--gray-400)' : 'var(--surface-page)',
        border: on ? last ? 'none' : '2px solid var(--accent)' : last ? 'none' : '2px solid var(--gray-400)',
        boxSizing: 'border-box'
      }
    }), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        width: 0,
        borderLeft: on ? '2px solid var(--blue-200)' : '2px dashed var(--gray-300)',
        margin: '4px 0'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '4px 0 18px',
        font: `${last ? 700 : 500} ${m ? 17 : 20}px/1.4 var(--font-sans)`,
        letterSpacing: '-0.02em',
        color: on ? last ? 'var(--accent)' : 'var(--text-strong)' : last ? 'var(--text-subtle)' : 'var(--text-muted)'
      }
    }, s));
  })));
}
function BeforeAfter() {
  const m = useIsMobile();
  return /*#__PURE__*/React.createElement(Sec, {
    id: "compare",
    label: "\uBE44\uAD50"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SSceneHeader, {
    eyebrow: "Before / After",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "\uD648\uD398\uC774\uC9C0\uB97C \uC0C8\uB85C \uB9CC\uB4DC\uB294 \uAC83\uC774 \uC544\uB2C8\uB77C,", br(m), "\uC0C1\uB2F4\uAE4C\uC9C0\uC758 \uD750\uB984\uC744 \uC5F0\uACB0\uD569\uB2C8\uB2E4.")
  })), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginTop: m ? 32 : 64,
      display: 'grid',
      gridTemplateColumns: m ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)',
      gap: m ? 16 : 32,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(FlowCol, {
    title: "\uAE30\uC874 \uD648\uD398\uC774\uC9C0",
    steps: BEFORE
  }), /*#__PURE__*/React.createElement(FlowCol, {
    title: "BoostChat \uC801\uC6A9",
    steps: AFTER,
    on: true
  })));
}

/* 6 — Why */
function Why() {
  const m = useIsMobile();
  const n = useIsNarrow();
  const p = {
    font: `400 ${m ? 17 : 19}px/1.75 var(--font-sans)`,
    color: 'var(--text-body)',
    margin: 0,
    letterSpacing: '-0.01em',
    wordBreak: 'keep-all',
    textWrap: 'pretty'
  };
  return /*#__PURE__*/React.createElement(Sec, {
    id: "why",
    label: "\uB9CC\uB4E0 \uC774\uC720",
    style: {
      paddingTop: m ? 64 : 120
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      borderTop: '1px solid var(--border-strong)',
      paddingTop: m ? 32 : 56,
      display: 'grid',
      gridTemplateColumns: n ? '1fr' : 'minmax(0,1.05fr) minmax(0,1fr)',
      gap: m ? 28 : n ? 32 : 96
    }
  }, /*#__PURE__*/React.createElement(SSceneHeader, {
    eyebrow: "\uB9CC\uB4E0 \uC774\uC720",
    size: "md",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "\uAD11\uACE0\uB85C \uBC29\uBB38\uC790\uB97C \uB370\uB824\uC624\uB294 \uAC83\uC5D0\uC11C", br(m), "\uB05D\uB098\uC9C0 \uC54A\uB3C4\uB85D \uB9CC\uB4E4\uC5C8\uC2B5\uB2C8\uB2E4.")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 24,
      paddingTop: n ? 0 : 30,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: p
  }, "\uC778\uD14C\uB9AC\uC5B4 \uC5C5\uCCB4\uB294 \uBE14\uB85C\uADF8, \uAD11\uACE0, SNS, \uD648\uD398\uC774\uC9C0\uB97C \uD1B5\uD574 \uACE0\uAC1D\uC744 \uB370\uB824\uC635\uB2C8\uB2E4. \uD558\uC9C0\uB9CC \uBC29\uBB38\uD55C \uACE0\uAC1D\uC774 \uC790\uAE30 \uC870\uAC74\uC5D0 \uB9DE\uB294 \uC0AC\uB840\uB97C \uCC3E\uACE0, \uAD81\uAE08\uD55C \uC810\uC744 \uD574\uACB0\uD558\uACE0, \uC2E4\uC81C \uBB38\uC758\uAE4C\uC9C0 \uB0A8\uAE30\uB294 \uACFC\uC815\uC740 \uBCC4\uAC1C\uC785\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...p,
      color: 'var(--text-strong)',
      fontWeight: 500
    }
  }, "BoostChat\uC740 \uC0C8\uB85C\uC6B4 \uD648\uD398\uC774\uC9C0\uB97C \uB9CC\uB4DC\uB294 \uAC83\uBCF4\uB2E4 \uBA3C\uC800, \uC774\uBBF8 \uBC29\uBB38\uD55C \uACE0\uAC1D\uACFC \uC0C1\uB2F4\uC774 \uC2DC\uC791\uB418\uB294 \uC9C0\uC810\uC744 \uAC1C\uC120\uD558\uB294 \uB370\uC11C \uCD9C\uBC1C\uD588\uC2B5\uB2C8\uB2E4."))));
}

/* 7 — Install paths (follows the install scene) */
function InstallPaths() {
  const m = useIsMobile();
  const items = [['A', '이미 홈페이지가 있다면', /*#__PURE__*/React.createElement(React.Fragment, null, "\uAE30\uC874 \uB514\uC790\uC778\uC740 \uADF8\uB300\uB85C \uB450\uACE0", br(m), "BoostChat\uB9CC \uC5F0\uACB0\uD569\uB2C8\uB2E4.")], ['B', '홈페이지도 새로 필요하다면', /*#__PURE__*/React.createElement(React.Fragment, null, "\uD648\uD398\uC774\uC9C0 \uC81C\uC791 + BoostChat\uC744", br(m), "\uD568\uAED8 \uAD6C\uCD95\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.")]];
  return /*#__PURE__*/React.createElement(Sec, {
    id: "install-paths",
    label: "\uC124\uCE58 \uBC29\uC2DD",
    style: {
      paddingTop: m ? 40 : 40
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      display: 'grid',
      gridTemplateColumns: m ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)',
      borderTop: '1px solid var(--border-strong)'
    }
  }, items.map(([k, t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      padding: m ? '28px 0' : '44px 48px 8px',
      paddingLeft: m || i === 0 ? 0 : 48,
      borderLeft: !m && i ? '1px solid var(--border-strong)' : 'none',
      borderTop: m && i ? '1px solid var(--border-strong)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 999,
      background: i ? 'var(--gray-900)' : 'var(--accent)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      font: '700 13px/1 var(--font-sans)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-eyebrow)',
      color: 'var(--text-muted)'
    }
  }, t)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      font: `700 ${m ? 22 : 30}px/1.35 var(--font-sans)`,
      letterSpacing: '-0.025em',
      color: 'var(--text-strong)',
      wordBreak: 'keep-all'
    }
  }, d)))));
}

/* 8 — Live demo */
function LiveDemo() {
  const m = useIsMobile();
  const n = useIsNarrow();
  return /*#__PURE__*/React.createElement(Sec, {
    id: "live",
    label: "\uC2E4\uC81C \uB370\uBAA8"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: n ? '1fr' : 'minmax(0,1fr) minmax(0,440px)',
      gap: m ? 36 : n ? 56 : 96,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(SSceneHeader, {
    eyebrow: "\uC2E4\uC81C \uB370\uBAA8",
    title: "\uC9C1\uC811 \uACE0\uAC1D\uC774 \uB418\uC5B4 \uC0AC\uC6A9\uD574\uBCF4\uC138\uC694.",
    sub: "\uC2E4\uC81C \uC778\uD14C\uB9AC\uC5B4 \uB370\uBAA8 \uD648\uD398\uC774\uC9C0\uC5D0\uC11C \uC774\uB807\uAC8C \uB9D0\uD574\uBCF4\uC138\uC694."
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: m ? '28px 0 0' : '40px 0 0',
      padding: m ? '20px 22px' : '26px 32px',
      background: '#fff',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-md)',
      font: `600 ${m ? 19 : 26}px/1.45 var(--font-sans)`,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      wordBreak: 'keep-all'
    }
  }, "\u201C32\uD3C9\uC778\uB370 \uC8FC\uBC29\uACFC \uC695\uC2E4\uC744 \uB9AC\uBAA8\uB378\uB9C1\uD558\uACE0 \uC2F6\uC5B4\uC694\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(SButton, {
    size: "lg",
    arrow: true,
    href: DEMO_URL,
    style: {
      color: '#fff'
    }
  }, "\uC2E4\uC81C \uB370\uBAA8 \uCCB4\uD5D8\uD558\uAE30"))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/product/layer-chat-widget.png",
    alt: "\uB370\uBAA8 \uC0C1\uB2F4\uCC3D \uC751\uB2F5",
    style: {
      width: '100%',
      display: 'block',
      maxWidth: 440,
      margin: '0 auto',
      transform: n ? 'none' : 'perspective(1800px) rotateY(-4deg)',
      filter: 'drop-shadow(0 30px 50px rgba(16,24,40,.14))'
    }
  }))));
}

/* 9 — Early partner */
const PARTNER = ['홈페이지 확인', '포트폴리오 연동', '상담창 세팅', '설치'];
function Partner({
  onCta
}) {
  const m = useIsMobile();
  return /*#__PURE__*/React.createElement(Sec, {
    id: "partner",
    label: "\uCD08\uAE30 \uD30C\uD2B8\uB108",
    style: {
      paddingTop: m ? 40 : 80
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      background: 'var(--surface-inverse)',
      borderRadius: m ? 'var(--radius-xl)' : 'var(--radius-2xl)',
      padding: m ? '48px 24px' : '96px 80px',
      textAlign: m ? 'left' : 'center',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-eyebrow)',
      color: 'var(--blue-300)'
    }
  }, "\uCD08\uAE30 \uD30C\uD2B8\uB108 \uBAA8\uC9D1"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '12px 0 0',
      font: `700 ${m ? 30 : 52}px/1.2 var(--font-sans)`,
      letterSpacing: 'var(--ls-display)',
      wordBreak: 'keep-all'
    }
  }, "\uCCAB \uB3C4\uC785 \uC5C5\uCCB4\uB97C \uBAA8\uC9D1\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      font: 'var(--type-lead)',
      color: 'var(--gray-300)',
      wordBreak: 'keep-all'
    }
  }, "\uCD08\uAE30 \uD30C\uD2B8\uB108\uC5D0\uAC8C\uB294 \uC544\uB798 \uACFC\uC815\uC744 \uD568\uAED8 \uC9C4\uD589\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: m ? '28px 0 0' : '40px 0 0',
      padding: 0,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: m ? 'flex-start' : 'center',
      alignItems: 'center',
      gap: '10px 12px'
    }
  }, PARTNER.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 16px 0 8px',
      borderRadius: 999,
      background: 'rgba(255,255,255,.08)',
      border: '1px solid rgba(255,255,255,.14)',
      font: '600 15px/1 var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 999,
      display: 'inline-grid',
      placeItems: 'center',
      background: 'var(--accent)',
      font: '600 11px/1 var(--font-mono)'
    }
  }, i + 1), s), i < PARTNER.length - 1 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--gray-500)'
    }
  }, "\u2192")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: m ? 32 : 48
    }
  }, /*#__PURE__*/React.createElement(SButton, {
    size: "lg",
    arrow: true,
    onClick: onCta
  }, "\uB3C4\uC785 \uC0C1\uB2F4 \uBC1B\uC544\uBCF4\uAE30"))));
}
Object.assign(window, {
  Problem,
  DemoVideo,
  BeforeAfter,
  Why,
  InstallPaths,
  LiveDemo,
  Partner
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sales-landing/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DepthStage = __ds_scope.DepthStage;

__ds_ns.ProductShot = __ds_scope.ProductShot;

__ds_ns.ScrollScene = __ds_scope.ScrollScene;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.SceneHeader = __ds_scope.SceneHeader;

__ds_ns.SiteNav = __ds_scope.SiteNav;

__ds_ns.StoryRail = __ds_scope.StoryRail;

})();
