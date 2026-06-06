import { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Bot,
  ChevronDown,
  MessageCircle,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { getApproxMemberCount, siteConfig } from "./site.config";

const HERO_VIDEO =
  "https://res.cloudinary.com/daklr2whx/video/upload/v1778592404/baby-track-video_e968wn.mp4";
const CLOUD_IMAGE =
  "https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png";
const SECOND_VIDEO =
  "https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4";

function LogoMark({ className = "inline-flex h-12 w-12" }: { className?: string }) {
  return (
    <span
      className={`${className} shrink-0 items-center justify-center`}
      aria-label="CARDZ.Game"
      role="img"
    >
      <img className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.28)]" src={`${import.meta.env.BASE_URL}cardz-game-logo.png`} alt="" />
    </span>
  );
}

function YaichiLogo({ className = "h-8 w-32" }: { className?: string }) {
  return (
    <span className={`${className} inline-flex shrink-0 items-center justify-center`} aria-label="YAICHI" role="img">
      <img
        className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.24)]"
        src={`${import.meta.env.BASE_URL}yaichi-logo.png`}
        alt=""
      />
    </span>
  );
}

function WhatsAppLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M16 3C8.83 3 3 8.83 3 16c0 2.27.59 4.49 1.7 6.44L3.2 29l6.76-1.77A12.95 12.95 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16 3Zm0 23.64c-1.95 0-3.86-.53-5.53-1.54l-.4-.24-4.02 1.05 1.08-3.9-.27-.42A10.55 10.55 0 0 1 5.36 16C5.36 10.13 10.13 5.36 16 5.36S26.64 10.13 26.64 16 21.87 26.64 16 26.64Z"
      />
      <path
        fill="#fff"
        d="M22.35 18.91c-.34-.17-2.03-1-2.35-1.12-.32-.11-.55-.17-.78.17-.23.35-.9 1.12-1.1 1.35-.2.23-.4.26-.75.09-.35-.17-1.46-.54-2.78-1.72-1.03-.92-1.72-2.05-1.92-2.4-.2-.34-.02-.53.15-.7.16-.16.34-.4.52-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.78-1.89-1.07-2.58-.28-.68-.57-.58-.78-.59h-.67c-.23 0-.6.09-.92.43-.32.35-1.21 1.18-1.21 2.89 0 1.7 1.24 3.35 1.41 3.58.17.23 2.44 3.72 5.91 5.22.83.36 1.47.57 1.97.73.83.26 1.58.22 2.18.13.67-.1 2.03-.83 2.32-1.64.29-.8.29-1.5.2-1.64-.08-.15-.31-.24-.65-.41Z"
      />
    </svg>
  );
}

function normalizePath(pathname: string) {
  // 去掉 Vite base 前缀(如 /yaichi),让 /yaichi/go/whatsapp 仍匹配 /go/whatsapp
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const stripped = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return stripped.replace(/\/+$/, "") || "/";
}

function getRedirectTarget(pathname: string) {
  const path = normalizePath(pathname);

  if (path === "/go/whatsapp") {
    return {
      label: `WhatsApp ${siteConfig.group.currentNumber} 號群`,
      url: siteConfig.whatsappUrl,
      Icon: MessageCircle,
    };
  }

  if (path === "/go/telegram") {
    return {
      label: "Telegram 備用頻道",
      url: siteConfig.telegramUrl,
      Icon: Send,
    };
  }

  return null;
}

function RedirectScreen({
  target,
}: {
  target: { label: string; url: string; Icon: typeof MessageCircle };
}) {
  const { Icon } = target;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      window.location.replace(target.url);
    }, 380);

    return () => window.clearTimeout(timeoutId);
  }, [target.url]);

  return (
    <main className="grid min-h-screen place-items-center bg-black px-6 text-center font-manrope text-white">
      <section className="w-full max-w-[420px]">
        <Icon className="mx-auto h-12 w-12" strokeWidth={1.6} aria-hidden="true" />
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-white/70">
          YAICHI x CARDZ.Game
        </p>
        <h1 className="mt-3 font-italiana text-[36px] leading-[1.02]">正在前往 {target.label}</h1>
        <p className="mx-auto mt-5 max-w-[280px] text-sm leading-7 text-white/70">
          如果瀏覽器沒有自動跳轉，可以直接按下面按鈕繼續。
        </p>
        <a
          className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-white px-6 text-sm font-bold text-black"
          href={target.url}
        >
          前往 {target.label}
        </a>
      </section>
    </main>
  );
}

function BrandLockup() {
  return (
    <div className="pointer-events-auto inline-flex max-w-[calc(100vw-40px)] items-center gap-3 rounded-full border border-white/12 bg-black/18 px-3 py-2 shadow-[0_18px_46px_rgba(0,0,0,0.22)] backdrop-blur-md md:gap-4 md:px-4 md:py-3">
      <LogoMark className="inline-flex h-[42px] w-[74px] md:h-16 md:w-[112px]" />
      <span className="h-8 w-px bg-white/24 md:h-10" aria-hidden="true" />
      <YaichiLogo className="h-[26px] w-[104px] md:h-10 md:w-40" />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen w-full flex-shrink-0 overflow-hidden">
      <video
        className="absolute inset-0 z-10 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.36),rgba(0,0,0,0.2)_38%,rgba(0,0,0,0.78))]" />

      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute left-[20px] top-[24px] md:left-[64px] md:top-[64px]">
          <BrandLockup />
        </div>

        <div className="absolute bottom-[132px] left-[20px] right-[20px] text-left md:bottom-[164px] md:left-auto md:right-[64px] md:max-w-[1200px] md:text-right">
          <div className="mb-[26px] flex max-w-[286px] flex-col gap-[12px] text-[12px] font-normal leading-[1.62] text-white/76 md:hidden">
            <p>新手必入 TCG 社區。掃 QR 後只要一按，就直接進入 WhatsApp 主群。</p>
            <p>Telegram 只作備用，防止失聯；主社群焦點永遠是 WhatsApp。</p>
          </div>

          <h1 className="font-italiana text-[32px] leading-[1.06] text-white md:text-[96px] md:leading-[88px]">
            <span className="hidden md:block">
              The Largest
              <br />
              TCG Community
              <br />
              Starts From
              <br />
              WhatsApp.
            </span>
            <span className="block md:hidden">
              PTCG Community
              <br />
              WhatsApp Group 04
              <br />
              First.
            </span>
          </h1>
        </div>

        <div className="absolute left-[64px] top-[326px] hidden w-full max-w-[320px] flex-col gap-[24px] text-[14px] font-normal leading-relaxed text-white/78 md:flex">
          <p>
            WhatsApp 是主入口。前三個社群已爆滿，每群約 2,000 人，目前排到第 4 號群。
          </p>
          <p>
            CARDZ.Game 將開包關鍵結果寫入區塊鏈紀錄，讓不可篡改和公平公正成為產品本身的一部分。
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionBadge({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[22px] border border-black/10 bg-[#fff5e8] px-4 py-4 text-left text-[#240505] shadow-[0_18px_48px_rgba(80,0,0,0.18)]">
      <Icon className="mb-3 h-5 w-5 text-[#FF0000]" strokeWidth={1.9} aria-hidden="true" />
      <h3 className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#240505]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-6 text-[#4a1712]">{body}</p>
    </div>
  );
}

function SecondSection({
  cloudYDesktop,
  cloudYMobile,
  approxMembers,
}: {
  cloudYDesktop: ReturnType<typeof useTransform<number, number>>;
  cloudYMobile: ReturnType<typeof useTransform<number, number>>;
  approxMembers: string;
}) {
  const communityFacts = [
    ["主入口", `WhatsApp ${siteConfig.group.currentNumber} 號群`],
    ["社群規模", `前三群已滿 · ${approxMembers}+ 成員估算`],
    ["群組容量", "每個 WhatsApp 群約 2,000 人"],
    [siteConfig.offer.label, siteConfig.offer.text],
  ];

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col bg-[#FF0000]">
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-[100] hidden w-full -translate-y-1/2 md:block"
        style={{ y: cloudYDesktop }}
      >
        <img className="block h-auto w-full" src={CLOUD_IMAGE} alt="" referrerPolicy="no-referrer" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-[100] block w-full -translate-y-1/2 md:hidden"
        style={{ y: cloudYMobile }}
      >
        <img className="block h-auto w-full" src={CLOUD_IMAGE} alt="" referrerPolicy="no-referrer" />
      </motion.div>

      <div className="flex flex-1 flex-col items-center pt-[112px] pb-[132px] md:pt-[400px] md:pb-24">
        <div className="relative z-20 mx-auto flex h-auto w-full max-w-[900px] flex-col items-center px-6 text-center md:px-8">
          <LogoMark className="inline-flex h-20 w-[140px]" />

          <p className="mx-auto mt-8 mb-[28px] max-w-[440px] text-[15px] font-semibold leading-[1.72] tracking-[0.04em] text-[#260505] md:text-[16px]">
            所有社群資料集中在這裡：WhatsApp 主群、Telegram 備用、CARDZ.Game 透明開包科技、AI 百科全書、新會員優惠。
          </p>

          <div className="font-marck text-[104px] leading-none text-[#fff4e1] drop-shadow-[0_10px_24px_rgba(80,0,0,0.28)] md:text-[120px]">
            Group 04
          </div>

          <div className="mt-7 w-full rounded-[30px] border border-black/10 bg-[#fff5e8] p-5 text-left text-[#240505] shadow-[0_24px_70px_rgba(80,0,0,0.2)] md:p-7">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#FF0000]">
              YAICHI x CARDZ.Game Community
            </p>
            <h2 className="mt-3 font-italiana text-[38px] leading-[1.02] text-[#240505] md:text-[58px]">
              WhatsApp 4 號群開放中
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#4a1712] md:text-[16px]">
              前三個 WhatsApp 群已經爆滿。每個群組約 2,000 人，現在排到第 4 號群，代表現有成員估算已達 {approxMembers}+。
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              {communityFacts.map(([label, value]) => (
                <div className="border-t border-[#240505]/12 pt-3" key={label}>
                  <span className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FF0000]">
                    {label}
                  </span>
                  <strong className="mt-1 block text-[15px] leading-6 text-[#240505]">{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid w-full grid-cols-1 gap-3 md:grid-cols-3">
            <SectionBadge
              icon={ShieldCheck}
              title="On-chain Records"
              body={`${siteConfig.technologyFeature.body} ${siteConfig.technologyFeature.points.join("、")}。`}
            />
            <SectionBadge
              icon={Bot}
              title="TCG AI Encyclopedia"
              body={`${siteConfig.aiFeature.body} 重點包括 ${siteConfig.aiFeature.points.join("、")}。`}
            />
            <SectionBadge
              icon={Users}
              title="Backup Channel"
              body="Telegram 是備用頻道，用來防止失聯；真正主入口仍然是 WhatsApp。"
            />
          </div>

          <div className="mt-6 flex w-full flex-col gap-3 md:flex-row md:justify-center">
            <a
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#240505] px-6 text-sm font-extrabold text-[#fff5e8]"
              href={`${import.meta.env.BASE_URL}go/whatsapp`}
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
              加入 WhatsApp {siteConfig.group.currentNumber} 號群
            </a>
            <a
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#240505]/35 px-6 text-sm font-bold text-[#240505]"
              href={`${import.meta.env.BASE_URL}go/telegram`}
            >
              <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Telegram 備用
            </a>
          </div>

          <p className="mx-auto mt-7 max-w-[560px] text-[13px] font-semibold leading-6 text-[#260505]">
            {siteConfig.technologyFeature.note}
          </p>
        </div>
      </div>

      <div className="relative w-full shrink-0">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-[100px] w-full bg-gradient-to-b from-[#FF0000] to-transparent" />
        <video
          className="block h-auto w-full object-contain"
          src={SECOND_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: containerRef });
  const cloudYDesktop = useTransform(scrollY, [0, 300], [0, -100]);
  const cloudYMobile = useTransform(scrollY, [0, 300], [0, -24]);
  const approxMembers = getApproxMemberCount().toLocaleString("en-US");
  const redirectTarget = useMemo(
    () => getRedirectTarget(typeof window === "undefined" ? "/" : window.location.pathname),
    [],
  );

  if (redirectTarget) {
    return <RedirectScreen target={redirectTarget} />;
  }

  return (
    <main
      ref={containerRef}
      className="relative h-screen overflow-y-auto overflow-x-hidden bg-black font-manrope"
    >
      <HeroSection />
      <SecondSection
        cloudYDesktop={cloudYDesktop}
        cloudYMobile={cloudYMobile}
        approxMembers={approxMembers}
      />
      <div className="mobile-sticky-cta fixed bottom-4 left-4 right-4 z-[120]">
        <div className="pointer-events-none mb-2 flex justify-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/38 px-3 py-1.5 text-[11px] font-bold text-white/86 shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-md">
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
            往下拉有更詳細資料
          </span>
        </div>
        <a
          className="flex min-h-[68px] items-center justify-center gap-3 rounded-full bg-[#20d466] px-4 text-black shadow-[0_14px_40px_rgba(0,0,0,0.32)]"
          href={`${import.meta.env.BASE_URL}go/whatsapp`}
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#16c85a] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
            <WhatsAppLogo className="h-6 w-6" />
          </span>
          <span className="min-w-0 text-left">
            <span className="block text-[15px] font-extrabold leading-[1.08]">
              立刻加入 WhatsApp {siteConfig.group.currentNumber} 號群
            </span>
            <span className="mt-1 block text-[11px] font-bold leading-[1.15] text-black/70">
              1、2、3 號群共 6,000 人已爆滿
            </span>
          </span>
        </a>
      </div>
    </main>
  );
}
