export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-20 py-8 mobile:px-5 mobile:py-7">
        <span className="text-[18px] leading-none font-extrabold tracking-[-0.03em] text-accent">BoostChat</span>
        <p className="m-0 text-[13px] leading-[1.5] text-muted">화면 속 업체 · 문의는 촬영용 데모 데이터입니다.</p>
      </div>
    </footer>
  );
}
