/**
 * 使い方を3ステップで示す図。
 *
 * ArchSvg（システム構成図）とは役割が違う。あちらは「どう作られているか」を
 * 技術者に説明する図で、「LoRaゲートウェイ」「LPWA」のような抽象的な箱が並ぶ。
 * この図が答えるのは「で、私は何をすればいいのか」という、初めて見た人の問い。
 *
 * 設計の前提:
 * - 手順の文言はHTMLで書く。SVG内のテキストは物の名前（スマホ／ADREN）だけに留める。
 *   意味を運ぶ文字をSVGに閉じ込めると、拡大・読み上げ・翻訳のどれもが効かなくなる。
 * - 絵は輪郭線だけで描く。塗りや影を足すほど、何の絵か分かりにくくなる。
 * - 各SVGは role="img" と <title> を持たせ、読み上げでも手順が伝わるようにする。
 */

const INK = "var(--ink)";
const SOFT = "var(--ink-soft)";
const ACCENT = "var(--brand-accent)";
const PAPER = "var(--paper)";
const LINE = "var(--line-soft)";

/** スマートフォン。どのステップでも同じ形で描き、同一の物だと分かるようにする。 */
function Phone({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-26" y="-46" width="52" height="92" rx="7" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <rect x="-21" y="-38" width="42" height="70" rx="2" fill="#fff" stroke={LINE} />
      <line x1="-7" y1="-42" x2="7" y2="-42" stroke={SOFT} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="0" cy="38" r="3.5" fill="none" stroke={SOFT} />
    </g>
  );
}

/** ADREN本体。手のひらサイズの箱であることが伝わるよう、アンテナとLEDを付ける。 */
function Module({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <line x1="14" y1="-24" x2="14" y2="-38" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="14" cy="-41" r="3" fill={INK} />
      <rect x="-24" y="-24" width="48" height="48" rx="5" fill={PAPER} stroke={INK} strokeWidth="1.6" />
      <circle cx="-12" cy="-12" r="3.5" fill={ACCENT} />
      <line x1="-13" y1="4" x2="13" y2="4" stroke={SOFT} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="-13" y1="12" x2="4" y2="12" stroke={SOFT} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

/** Bluetoothのルーン。この記号自体が「無線でつながる」の説明になる。 */
function BluetoothMark({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="17" fill="#fff" stroke={ACCENT} strokeWidth="1.4" />
      <path
        d="M-5 -4 L5 4 L0 8 L0 -8 L5 -4 L-5 4"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/**
 * 図中の物の名前。
 *
 * fontSize はビューボックス単位なので、実際の見え方は描画幅で決まる。
 * モバイル（カード幅277px前後）で 14 にすると約12.9pxまで縮み、
 * 高齢の読み手を想定したこのサイトの下限に張り付く。16 にして約15px を確保する。
 */
function ObjectLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fill={SOFT} fontSize="16" className="mono">
      {children}
    </text>
  );
}

const svgClass = "h-auto w-full";

function StepOne() {
  return (
    <svg viewBox="0 0 300 200" className={svgClass} role="img" xmlns="http://www.w3.org/2000/svg">
      <title>スマートフォンとADREN本体が、Bluetoothでつながっている図</title>
      <Phone x={72} y={88} />
      <Module x={228} y={88} />
      <line x1="104" y1="88" x2="196" y2="88" stroke={ACCENT} strokeWidth="1.4" strokeDasharray="4 5" />
      <BluetoothMark x={150} y={88} />
      <ObjectLabel x={72} y={168}>スマホ</ObjectLabel>
      <ObjectLabel x={228} y={168}>ADREN本体</ObjectLabel>
    </svg>
  );
}

function StepTwo() {
  return (
    <svg viewBox="0 0 300 200" className={svgClass} role="img" xmlns="http://www.w3.org/2000/svg">
      <title>スマートフォンのアプリから、メッセージを送っている図</title>
      <Phone x={92} y={88} />
      {/* 画面の中のチャット。いつものアプリで送るだけ、という感覚を出す */}
      <rect x="76" y="60" width="30" height="9" rx="3" fill={LINE} />
      <rect x="76" y="74" width="22" height="9" rx="3" fill={LINE} />
      <rect x="84" y="88" width="30" height="9" rx="3" fill={ACCENT} opacity="0.8" />
      <path d="M136 88 H206" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M198 80 L208 88 L198 96" fill="none" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(246 88)">
        <rect x="-30" y="-24" width="60" height="40" rx="6" fill="#fff" stroke={INK} strokeWidth="1.6" />
        <path d="M-8 16 L-2 4 L6 4 Z" fill="#fff" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        <line x1="-20" y1="-12" x2="20" y2="-12" stroke={SOFT} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="-20" y1="-2" x2="8" y2="-2" stroke={SOFT} strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <ObjectLabel x={92} y={168}>いつものアプリ</ObjectLabel>
      <ObjectLabel x={244} y={168}>安否・状況</ObjectLabel>
    </svg>
  );
}

function StepThree() {
  return (
    <svg viewBox="0 0 300 200" className={svgClass} role="img" xmlns="http://www.w3.org/2000/svg">
      <title>
        携帯電話の基地局が使えない状態でも、ADREN同士が順に中継して相手のスマートフォンへ情報が届く図
      </title>

      {/* 使えない基地局。×を重ねて「圏外」を一目で伝える */}
      <g transform="translate(150 44)">
        <path d="M0 22 L-11 -14 M0 22 L11 -14 M-7 2 H7" stroke={LINE} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <line x1="-14" y1="-16" x2="14" y2="12" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" />
        <text x="30" y="8" fill={ACCENT} fontSize="16" className="mono">
          圏外
        </text>
      </g>

      {/* 端末から端末へのバケツリレー */}
      <Module x={44} y={132} scale={0.78} />
      <Module x={150} y={132} scale={0.78} />
      <Module x={256} y={132} scale={0.78} />

      {[97, 203].map((cx) => (
        <g key={cx}>
          <line x1={cx - 30} y1="132" x2={cx + 30} y2="132" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="4 5" />
          <path
            d={`M${cx + 22} 125 L${cx + 32} 132 L${cx + 22} 139`}
            fill="none"
            stroke={ACCENT}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      <ObjectLabel x={44} y={184}>送る人</ObjectLabel>
      <ObjectLabel x={150} y={184}>近くの端末</ObjectLabel>
      <ObjectLabel x={256} y={184}>届け先</ObjectLabel>
    </svg>
  );
}

const steps = [
  {
    title: "スマホにつなぐ",
    body: "ADREN本体とスマートフォンをBluetoothで接続します。手のひらサイズの端末を持ち歩くだけで、いつものスマホが災害時の通信機になります。",
    illustration: <StepOne />,
  },
  {
    title: "いつも通り送る",
    body: "操作はアプリの画面から。安否、必要な物資、危険な場所を、普段のメッセージと同じ感覚で送ります。特別な操作は覚える必要がありません。",
    illustration: <StepTwo />,
  },
  {
    title: "電波がなくても届く",
    body: "携帯の電波が止まっていても、ADREN同士が電波を受け渡して情報を運びます。近くの端末が次の端末へ、順に相手まで届けます。",
    illustration: <StepThree />,
  },
];

export function UsageSteps() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col border border-line-soft bg-white p-6">
          <div className="flex items-baseline gap-3">
            <span className="mono text-micro tracking-[0.2em] text-brand-accent">0{index + 1}</span>
            <h3 className="mincho text-2xl">{step.title}</h3>
          </div>
          <div className="my-5 border-y border-line-soft bg-paper py-4">{step.illustration}</div>
          <p className="text-compact text-ink-soft">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
