<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="d-flex justify-content-between align-items-center py-2 px-4 bg-white border fixed-top">
    <a href="/" class="text-reset text-decoration-none fs-4">すぐポチアンケ</a>
    <button type="button" class="btn btn-link text-reset text-decoration-none border cursor-pointer" data-bs-toggle="modal" data-bs-target="#howto_modal">使い方</button>
  </header>
  <main class="main">
    <RouterView />
  </main>
  <footer class="d-flex flex-column flex-column text-light">
      <div class="d-flex flex-column flex-md-row gap-4 gap-md-5 justify-content-between p-4 p-md-5 footer-right">
          <div>
              <p class="text-light mb-0 mb-md-2" style="font-size: 24px;">すぐポチアンケ</p>
              <small>たった1分で、アンケート作成。登録不要</small><br>
              <small>画像素材はCanvaおよびAI生成ツールを使用して作成されています。</small>
          </div>
          <div class="d-flex flex-column flex-md-row gap-4 gap-md-5 justify-content-end">
              <div class="d-flex flex-column">
                  <p class="fw-bold mb-2 mb-md-3" style="font-size: 18px;">サービス</p>
                  <a href="/contact" class="m-0 text-reset underline-hover">お問い合わせ</a>
              </div>
              <div class="d-flex flex-column">
                  <p class="fw-bold mb-2 mb-md-3" style="font-size: 18px;">法的情報</p>
                  <a href="/terms" class="mb-1 text-reset underline-hover">利用規約</a>
                  <a href="/privacy" class="m-0 text-reset underline-hover">プライバシーポリシー</a>
              </div>
          </div>
      </div>
      <div class="text-center border-top border-secondary p-3 p-md-4">
          <small>
              &copy; 2025 すぐポチアンケ All rights reserved.
          </small>
      </div>
  </footer>
</template>

<style scoped></style>
