# すぐポチアンケ - フロントエンド

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3?style=flat&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> たった1分で、アンケート作成。登録不要の簡単アンケートサービス

## 📋 概要

「すぐポチアンケ」は、ユーザー登録不要で簡単にアンケートを作成・共有できるWebアプリケーションです。シンプルな操作で投票機能付きのアンケートを素早く作成し、QRコードやURLで簡単に共有できます。

## ✨ 主な機能

### 🎯 アンケート作成
- **簡単作成**: タイトル、説明文、選択肢を入力するだけでアンケート作成
- **有効期限設定**: 当日の指定時間まで投票可能
- **パスコード保護**: 任意でパスコードを設定して投票者を制限
- **リアルタイムバリデーション**: 入力内容の即座な検証

### 🗳️ 投票機能
- **ワンクリック投票**: 選択肢をクリックするだけで投票完了
- **重複投票防止**: 同一ブラウザからの重複投票を防止
- **パスコード認証**: 設定されたパスコードでアクセス制御

### 📊 結果表示
- **リアルタイム集計**: 投票結果をリアルタイムで表示
- **視覚的チャート**: 円グラフ・棒グラフでの結果表示
- **詳細統計**: 投票数、最終投票日時、残り時間などの詳細情報

### 🔗 共有機能
- **QRコード生成**: アンケートURLのQRコードを自動生成
- **URL共有**: 簡単なURLでアンケートを共有
- **モバイル対応**: スマートフォンでも快適に利用可能

## 🛠️ 技術スタック

### フロントエンド
- **Vue.js 3.5.22** - プログレッシブJavaScriptフレームワーク
- **Vite 7.1.7** - 高速ビルドツール
- **Vue Router 4.5.1** - クライアントサイドルーティング
- **Bootstrap 5.3.0** - CSSフレームワーク
- **Bootstrap Icons** - アイコンライブラリ

### チャート・UI
- **Chart.js 4.5.1** - データビジュアライゼーション
- **Vue ChartJS 5.3.2** - Vue.js用Chart.jsラッパー
- **PrimeVue 4.4.1** - Vue.js用UIコンポーネント
- **Vue QRCode 2.0.0** - QRコード生成

### 開発ツール
- **ESLint** - コード品質管理
- **Prettier** - コードフォーマッター
- **Sass** - CSSプリプロセッサ

## 🚀 セットアップ

### 前提条件
- Node.js 20.19.0 以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-username/sugupochi_frontend.git
cd sugupochi_frontend

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 環境変数の設定

#### 開発環境
`.env.local`ファイルを作成：

```env
VITE_API_URL=http://localhost:5757
```

#### 本番環境（Cloudflare Pages）
環境変数`VITE_API_URL`にバックエンドAPIのURLを設定

詳細は[ENV_SETUP.md](./ENV_SETUP.md)を参照してください。

## 📜 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# コードのリント
npm run lint

# コードのフォーマット
npm run format
```

## 📁 プロジェクト構造

```
src/
├── assets/          # スタイルシート、画像などの静的アセット
├── components/      # 再利用可能なVueコンポーネント
├── router/          # Vue Routerの設定
├── utils/           # ユーティリティ関数
│   ├── axios.js     # APIクライアント設定
│   ├── colorPalette.js # チャート用カラーパレット
│   ├── date.js      # 日付処理ユーティリティ
│   └── localStorage.js # ローカルストレージ管理
└── views/           # ページコンポーネント
    ├── polls/       # アンケート関連ページ
    │   ├── CreateView.vue      # アンケート作成
    │   ├── CreateCompleteView.vue # 作成完了
    │   ├── ShowView.vue        # 投票ページ
    │   ├── VoteCompleteView.vue # 投票完了
    │   └── ResultView.vue      # 結果表示
    ├── ContactView.vue         # お問い合わせ
    ├── HomeView.vue           # トップページ
    ├── PrivacyView.vue        # プライバシーポリシー
    └── TermView.vue           # 利用規約
```

## 🌐 デプロイ

### Cloudflare Pages

1. **リポジトリの接続**
   - Cloudflare PagesダッシュボードでGitリポジトリを接続

2. **ビルド設定**
   - ビルドコマンド: `npm run build`
   - ビルド出力ディレクトリ: `dist`

3. **環境変数の設定**
   - `VITE_API_URL`: バックエンドAPIのURL

4. **カスタムドメインの設定**（オプション）
   - 独自ドメインの設定

### その他のホスティングサービス

- **Vercel**: `npm run build`でビルド、`dist`をデプロイ
- **Netlify**: 同様に`dist`フォルダをデプロイ
- **GitHub Pages**: GitHub Actionsでビルド・デプロイ

## 🔧 設定ファイル

### Cloudflare Pages用設定

- `public/_redirects`: APIルートのリダイレクト設定
- `public/_headers`: CORSヘッダー設定

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 📞 サポート

- **お問い合わせ**: [Contact Page](/contact)
- **Issues**: [GitHub Issues](https://github.com/your-username/sugupochi_frontend/issues)

## 🙏 謝辞

- 画像素材はCanvaおよびAI生成ツールを使用して作成されています
- オープンソースコミュニティの皆様に感謝いたします

---

**すぐポチアンケ** - 簡単・高速・安全なアンケートサービス