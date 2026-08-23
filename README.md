# adphone-lp

災害時オフライン通信基盤**「アドフォン」**のコーポレート／製品ランディングサイト。

**公開URL: https://adphone-lp.vercel.app**

通信インフラが途絶えた被災地で、安否・物資・危険情報をつなぎ続ける通信基盤 — という
文章では伝わりにくい技術を、自治体・防災機関の担当者に一目で理解してもらうことを目的にしている。

---

## このサイトの設計上の狙い

**「BLEメッシュで情報が広がる」を、文字ではなく動きで見せる。**

中心となるのが `src/components/OkinawaMeshMap/` の伝播アニメーションで、
沖縄本島に配置したノード群をグラフとして持ち、発信源から**幅優先探索（BFS）でホップ数マップを構築**、
ホップ距離に比例した遅延（既定 420ms/hop）でノードを順に点灯させる。

既製の地図ライブラリでは「1ホップずつ、隣へ、隣へと伝わっていく」という
メッシュネットワークの本質が表現できないため、自前で実装している。

| ファイル | 役割 |
|---|---|
| `useNodeGraph.js` | ノード座標から到達可能距離で隣接リスト（グラフ）を構築 |
| `usePropagation.js` | BFSでホップ数を算出し、点灯スケジュールを生成 |
| `index.jsx` | SVG描画・アニメーション・インタラクション |
| `constants.js` | ノード配置・距離しきい値などのパラメータ |

---

## 技術スタック

| 領域 | 採用 | 理由 |
|---|---|---|
| フレームワーク | Next.js 16（App Router） | 静的配信で十分な速度を出しつつ、将来のCMS化・APIルート追加の余地を残すため |
| 言語 | TypeScript 5 | — |
| スタイル | Tailwind CSS v4 | デザイントークンを CSS 変数で持ち、`globals.css` に集約 |
| UI | shadcn/ui（Radix UI ベース） | アクセシビリティを持つ非スタイル済みコンポーネントを土台にし、見た目は自前で作るため |
| アニメーション | Framer Motion | 伝播アニメの時間制御 |
| ホスティング | Vercel | — |

---

## セットアップ

要件: Node.js 20 以上

```bash
npm install
npm run dev      # http://localhost:3000
```

その他のコマンド:

```bash
npm run build    # 本番ビルド
npm run start    # ビルド成果物をローカルで起動
npm run lint     # ESLint
```

環境変数は不要（外部APIに依存しない静的サイト）。

---

## ディレクトリ構成

```
app/                       # App Router（各ページ）
  page.tsx                 # トップ
  product/page.tsx         # 製品
  usecases/page.tsx        # ユースケース
  technology/page.tsx      # 技術
  about/page.tsx           # 会社情報
  contact/page.tsx         # お問い合わせ
  globals.css              # デザイントークン（配色・タイポグラフィ・装飾）
components/
  site/                    # サイト固有のパーツ（Nav / Footer / PageHero / ArchSvg など）
  ui/                      # shadcn/ui 由来のプリミティブ
src/components/
  OkinawaMeshMap/          # 伝播アニメーション（上記）
public/                    # 静的アセット
```

---

## 既知の課題

- コンポーネントの置き場所が `components/` と `src/components/` に分かれている。
  `OkinawaMeshMap` を `components/` 配下へ寄せて統一したい。
- `OkinawaMeshMap` のみ JavaScript（`.jsx` / `.js`）で、他は TypeScript。型付けが未了。
- 掲載文言がすべてハードコードのため、文言更新にデプロイが必要。CMS化を検討中。

---

## 関連リポジトリ

- アプリ本体（React Native / BLEメッシュ通信）: `Okinawa-Rewave/adphone`
