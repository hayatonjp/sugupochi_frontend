import axios from 'axios'

// 環境変数からAPI URLを取得
const getApiUrl = () => {
  // 本番環境では環境変数VITE_API_URLを使用
  if (import.meta.env.PROD && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // 開発環境では相対パスを使用（Viteのproxyが処理）
  return '/api'
}

// axiosのインスタンスを作成
const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// リクエストインターセプター
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('Response Error:', error)
    return Promise.reject(error)
  }
)

export default apiClient
