# 🃏 Blackjack (21) - Cyberpunk Casino

ブラウザで遊べるブラックジャック（21）ゲーム。サイバーパンク・ネオンノワールのテーマで、未来的なカジノの雰囲気を楽しめます。

![Blackjack Game](https://img.shields.io/badge/Game-Blackjack-00d9ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎮 ゲーム概要

プレイヤー vs ディーラーの対戦形式で、21に近づけることを目指すクラシックなカードゲームです。

### ゲームルール

- **目的**: ディーラーより21に近い数字を目指す（21を超えるとバースト＝負け）
- **ディーラールール**: 17以上でスタンド（S17ルール採用）
- **ブラックジャック**: Ace + 10点札の2枚で21（最初の配布時のみ）
- **カードの点数**:
  - Ace: 1または11（バーストしない最大値を自動選択）
  - 絵札（J, Q, K）: 10点
  - その他: 数字通り

### 操作方法

1. **START GAME**: ゲームを開始
2. **HIT**: カードを1枚引く
3. **STAND**: カードを引くのをやめてディーラーのターンへ
4. **NEW ROUND**: 次のラウンドを開始

## 🎨 デザインコンセプト

**サイバーパンク・ネオンカジノ**

- 深い暗闇をベースにしたダークテーマ
- エレクトリックブルー、ネオンピンク、サイバーパープルのアクセント
- カードとボタンに光るネオンの縁取り
- 六角形グリッドパターンの背景
- 滑らかなアニメーションとグローエフェクト

## 🚀 公開URL

**GitHub Pages**: [https://YOUR_USERNAME.github.io/blackjack-game/](https://YOUR_USERNAME.github.io/blackjack-game/)

## 💻 ローカル実行方法

### 前提条件

- Node.js 22.x以上
- pnpm

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/blackjack-game.git
cd blackjack-game

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

ブラウザで `http://localhost:3000` を開いてゲームをプレイできます。

### ビルド

```bash
# 本番用ビルド
pnpm build

# ビルド結果のプレビュー
pnpm preview
```

## 🛠️ 技術スタック

- **フレームワーク**: React 19
- **言語**: TypeScript 5.6
- **スタイリング**: Tailwind CSS 4
- **アニメーション**: Framer Motion
- **ルーティング**: Wouter
- **ビルドツール**: Vite 7
- **UIコンポーネント**: shadcn/ui

## 📁 プロジェクト構成

```
blackjack-game/
├── client/
│   ├── public/          # 静的ファイル
│   └── src/
│       ├── components/  # Reactコンポーネント
│       │   ├── Card.tsx           # カード表示
│       │   ├── GameTable.tsx      # ゲームテーブル
│       │   └── GameControls.tsx   # 操作ボタン
│       ├── lib/
│       │   └── blackjack.ts       # ゲームロジック
│       ├── pages/
│       │   └── Home.tsx           # メインゲーム画面
│       ├── App.tsx      # ルーティング
│       ├── main.tsx     # エントリーポイント
│       └── index.css    # グローバルスタイル
├── package.json
└── README.md
```

## 🎯 実装済み機能

- ✅ 52枚デッキのランダム配札
- ✅ Aceの1/11自動計算
- ✅ Hit/Stand操作
- ✅ ディーラーの自動カード引き（17以上でスタンド）
- ✅ ブラックジャック判定
- ✅ バースト判定
- ✅ 引き分け（Push）判定
- ✅ 勝敗統計表示（勝ち/負け/引き分け/勝率）
- ✅ New Roundで連続プレイ
- ✅ レスポンシブデザイン
- ✅ カード配布アニメーション
- ✅ ネオングローエフェクト

## 📝 受入基準チェックリスト

- [x] 52枚デッキでランダム配札できる
- [x] Aを1/11として正しく計算できる
- [x] Hit/Standで進行し、ディーラーが17以上まで引く
- [x] ブラックジャック・Bust・Pushを含め勝敗が正しく表示される
- [x] New Roundで次ラウンドを開始できる
- [x] GitHub Pagesで公開されている

## 📄 ライセンス

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🙏 謝辞

このプロジェクトは100日チャレンジの一環として作成されました。

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
