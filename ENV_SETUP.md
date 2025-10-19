# 環境変数設定ガイド

## 開発環境での設定

### 1. `.env.local`ファイルの作成
プロジェクトルートに`.env.local`ファイルを作成し、以下の内容を追加してください：

```env
# 開発環境用のAPI URL
VITE_API_URL=http://localhost:5757
```

### 2. 開発サーバーの起動
```bash
npm run dev
```

## 本番環境（Cloudflare Pages）での設定

### 1. Cloudflare Pagesダッシュボードでの環境変数設定
1. Cloudflare Pagesのダッシュボードにアクセス
2. プロジェクトの設定ページに移動
3. 「環境変数」セクションで以下の変数を追加：
   - **変数名**: `VITE_API_URL`
   - **値**: 実際のバックエンドAPIのURL（例: `https://api.yourdomain.com`）

### 2. ビルドとデプロイ
```bash
npm run build
```

## 設定の確認

### API URLの動作確認
- **開発環境**: `http://localhost:5757` にプロキシされる
- **本番環境**: 設定した環境変数`VITE_API_URL`の値が使用される

### ログでの確認
ブラウザの開発者ツールのコンソールで以下のログが表示されます：
- `API Request: POST /polls`
- `API Response: 200 /polls`

## トラブルシューティング

### 405エラーが発生する場合
1. `public/_redirects`ファイルのAPI URLが正しいか確認
2. Cloudflare Pagesの環境変数`VITE_API_URL`が設定されているか確認
3. バックエンドAPIが正しく動作しているか確認

### CORSエラーが発生する場合
1. `public/_headers`ファイルが正しく配置されているか確認
2. バックエンドAPIでCORS設定が適切に行われているか確認
