<template>
    <div class="mx-3 container-lm d-flex justify-content-center">
        <div ref="adMaxPcLeft" class="ad-max-pc"></div>
        <div class="container p-3 mx-md-4">
            <div class="row justify-content-center">
                <div class="text-center mb-4 fade-in">
                    <div ref="adMaxSpTop" class="ad-max-sp mb-4"></div>
                    <div class="success-icon">
                        <i class="bi bi-check-lg"></i>
                    </div>
                    <h1 class="h2 mb-3">アンケートを<br class="br-sp"/>作成しました！</h1>
                    <p class="text-muted">以下のリンクを共有して、<br class="br-sp"/>投票を集めましょう。</p>
                    <div class="danger-text mx-auto">
                        <p class="text-danger text-start fw-bold m-0">※このページを一度閉じたり更新するとアクセスできなくなりますので、ご注意ください。</p>
                        <p class="text-danger text-start fw-bold mb-0 mt-1">※アンケートは作成してから24時間が経過すると、非公開になります。</p>
                    </div>
                </div>

                <div class="card mb-4 fade-in p-0">
                    <div class="p-4">
                        <h5 class="mb-2">アンケート名: {{ poll?.title }}</h5>
                        <h5 class="mb-2">説明文: {{ poll?.description ?? 'なし'}}</h5>
                        <h5 class="mb-4 fw-bold">パスコード: {{ poll?.passcode }}<span style="font-size: 14px;"><br class="br-sp"/>（パスコードを投票者に共有してください）</span></h5>
                        <div class="d-flex gap-2 mb-2">
                            <p class="m-0">作成日時:</p>
                            <p class="m-0">{{ jst(poll?.created_at) }}</p>
                        </div>
                        <div class="d-flex gap-2 mb-2">
                            <p class="m-0">有効期限:</p>
                            <p class="m-0">{{ poll?.expires_at }}</p>
                        </div>
                        <div class="d-flex flex-column gap-2">
                            <div v-for="(option, index) in poll?.poll_options" :key="poll.id" class="m-0 d-flex gap-2">
                                <p class="m-0">選択肢{{ index+1 }}:</p>
                                <p class="m-0">{{ option.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mb-4 fade-in p-0">
                    <div class="p-4">
                        <h5 class="card-title mb-3">共有リンク</h5>
                        <div class="input-group share-input-group">
                            <input
                                type="text" 
                                class="form-control"
                                :value="shareUrl" 
                                readonly 
                                id="shareUrl"
                                ref="shareUrl"
                            >
                            <button class="btn btn-primary btn-copy" type="button" @click="copyToClipboard()">
                                <p class="copied" :class="isCopied ? 'visible' : ''">copied!</p>
                                <i class="bi bi-clipboard me-1"></i> <span class="btn-copy-text">コピー</span>
                            </button>
                        </div>
                        <h5 class="mt-4 mb-0">読み取りコードで共有</h5>
                        <div class="d-flex justify-content-center align-items-center mt-3">
                            <VueQrcode :value="shareUrl" :options="{ width: 300 }"></VueQrcode>
                        </div>
                    </div>
                </div>

                <div class="d-flex gap-3 justify-content-center flex-wrap fade-in p-0">
                    <a :href="`/polls/${poll?.uuid}/results`" class="btn btn-success btn-lg w-100">
                        投票画面を確認
                    </a>
                </div>
            </div>
        </div>
        <div ref="adMaxPcRight" class="ad-max-pc"></div>
    </div>
</template>

<script>
import { jst } from '@/utils/date'
import apiClient from '@/utils/axios';
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default {
    data() {
        return {
            isCopied: false,
            poll: null,
            shareUrl: null,
        }
    },
    components: {
        VueQrcode,
    },
    mounted() {
        const uuid = this.$route.params.uuid;
        apiClient.get(`/polls/${uuid}/create/complete`)
            .then(response => {
                this.poll = response.data.poll;
                this.shareUrl = response.data.shareUrl;
            })
            .catch(error => {
                console.log(error)
            });
        this.setAdMaxPcLeft();
        this.setAdMaxPcRight();
        this.setAdMaxSpTop();
    },
    methods: {
        createAdIframe(refName, scriptSrc, width = '100%', height = '100%') {
            const iframe = document.createElement('iframe');
            iframe.style.width = width;
            iframe.style.height = height;
            iframe.style.border = 'none';
            iframe.style.display = 'block';
            
            const container = this.$refs[refName];
            if (container) {                
                const html = `
                    <body style="margin: 0;">
                    <script src="${scriptSrc}"><\/script>
                    </body>
                `;

                iframe.setAttribute('srcdoc', html);
                container.innerHTML = '';
                container.appendChild(iframe);
            } else {
                console.warn(`No element found for ref "${refName}"`);
            }
        },
        setAdMaxPcLeft() {
            this.createAdIframe('adMaxPcLeft', 'https://adm.shinobi.jp/s/d0fe6271ee16a99afc25142e8bdd64bd', '160px', '100%');
        },
        setAdMaxPcRight() {
            this.createAdIframe('adMaxPcRight', 'https://adm.shinobi.jp/s/923d03c1468cce76da3777b4ddf09a24', '160px', '100%');
        },
        setAdMaxSpTop() {
            this.createAdIframe('adMaxSpTop', 'https://adm.shinobi.jp/s/80a29f375320d0ec96769d0d7033ce6d');
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.$refs.shareUrl.value)
                .then(() => {
                    this.isCopied = true
                    this.hideCopiedTxt()
                }) 
        },
        hideCopiedTxt() {
            setTimeout(() => {
                this.isCopied = false
            }, 2000)
        },
        jst(date) {
            return jst(date);
        },
    }
}
</script>

<style lang="scss" scoped>
.ad-max-pc {
    @media screen and (max-width: 1120px) {
        display: none;
    }
}
.ad-max-sp {
    width: 320px;
    height: 50px;
    display: none;
    margin: 0 auto;

    @media screen and (max-width: 1120px) {
        display: block;
    }
}
.btn-copy {
    position: relative;

    &-text {
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
}
.copied {
    display: none;
    position: absolute;
    bottom: 30px;
    left: 20px;
    color: black;

    @media screen and (max-width: 768px) {
        left: -5px;
        bottom: 25px;
    }

    &.visible {
        display: block;
    }
}
.danger-text {
    width: 100%;
}
</style>
