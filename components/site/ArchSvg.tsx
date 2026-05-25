type ArchSvgProps = {
  dark?: boolean;
};

export function ArchSvg({ dark }: ArchSvgProps) {
  const stroke = dark ? "rgba(255,255,255,0.75)" : "#1a1f2e";
  const soft = dark ? "rgba(255,255,255,0.45)" : "#4a5060";
  const bg = dark ? "rgba(255,255,255,0.02)" : "#ffffff";

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 1200 420" className="h-auto min-w-[900px] w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="420" fill={bg} />
        <line x1="200" y1="210" x2="450" y2="210" stroke={soft} strokeDasharray="5 5" />
        <line x1="600" y1="210" x2="850" y2="210" stroke={soft} strokeDasharray="5 5" />
        <line x1="980" y1="210" x2="1120" y2="210" stroke={soft} strokeDasharray="5 5" />

        <g transform="translate(130, 210)">
          <circle r="78" fill="none" stroke={soft} strokeDasharray="2 4" />
          <rect x="-20" y="-35" width="20" height="32" rx="3" fill="none" stroke={stroke} />
          <rect x="3" y="-30" width="20" height="32" rx="3" fill="none" stroke={stroke} />
          <rect x="-8" y="3" width="20" height="32" rx="3" fill="none" stroke={stroke} />
          <text x="0" y="98" fill={stroke} textAnchor="middle" className="mono" fontSize="12">
            スマートフォン群
          </text>
        </g>

        <g transform="translate(520, 210)">
          <rect x="-56" y="-45" width="112" height="90" rx="2" fill="none" stroke={stroke} strokeWidth="1.5" />
          <rect x="-42" y="-26" width="62" height="4" fill={soft} />
          <rect x="-42" y="-14" width="48" height="4" fill={soft} />
          <circle cx="34" cy="24" r="4" fill="#c8362d" />
          <text x="0" y="98" fill={stroke} textAnchor="middle" className="mono" fontSize="12">
            LoRaゲートウェイ
          </text>
        </g>

        <g transform="translate(900, 210)">
          <circle r="60" fill="none" stroke="#c8362d" strokeDasharray="3 4" />
          <circle r="34" fill="none" stroke="#e85e54" />
          <text x="0" y="4" fill="#c8362d" textAnchor="middle" className="mono" fontSize="12">
            LPWA
          </text>
          <text x="0" y="98" fill={stroke} textAnchor="middle" className="mono" fontSize="12">
            広域メッシュ
          </text>
        </g>

        <g transform="translate(1130, 210)">
          <polygon points="0,-38 -32,14 32,14" fill="none" stroke={stroke} />
          <rect x="-18" y="14" width="36" height="24" fill="none" stroke={stroke} />
          <text x="0" y="90" fill={stroke} textAnchor="middle" className="mono" fontSize="12">
            他避難所
          </text>
        </g>
      </svg>
    </div>
  );
}
