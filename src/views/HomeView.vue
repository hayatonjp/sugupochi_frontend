<template>
    <div class="container text-center">
        <div ref="adMaxSpTop" class="ad-max-sp d-flex d-sm-none justify-content-center align-items-center mb-3"></div>
        <h1 class="fw-bold text-center mb-3 title">すぐポチアンケ</h1>
        <h3 class="mb-3 mb-md-5 sub-title">たった1分で、アンケート作成。<br class="br-sp">登録不要</h3>
        <div class="d-flex justify-content-center align-items-center mb-4" style="aspect-ratio: 3 / 1; width: 100%;">
            <img src="/images/mv.svg" alt="すぐポチアンケ" class="mv">
        </div>
        <div class="border p-4 w-100 rounded bg-white">
            <h5 class="text-start"><i class="bi bi-card-list"></i> すぐポチアンケの特徴</h5>
            <ul class="m-0 point">
                <li class="text-start">会員登録やログインは不要で、すぐにアンケートを作成できます。</li>
                <li class="text-start">個人情報の登録が不要なので、安心してご利用いただけます。</li>
                <li class="text-start">回答結果はグラフで表示され、視覚的に分かりやすく把握できます。</li>
                <li class="text-start">作成したアンケートは24時間後に非公開になります。</li>
                <li class="text-start">リンク1つでアンケートを共有、簡単に投票できます。</li>
                <li class="text-start">誹謗中傷や不適切な内容を含むアンケートは、削除される場合があります。</li>
            </ul>
        </div>
        <a href="/polls/create" class="btn btn-primary p-4 my-4 fw-bold fs-4 rounded-3 w-100">今すぐアンケートを作成</a>
    </div>
</template>

<script>
export default {
    mounted() {
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
        setAdMaxPcTop() {
            this.createAdIframe('adMaxPcTop', 'https://adm.shinobi.jp/s/dbb067b88d321d66255f4e0f55bcef59', '728px', '90px');
        },
        setAdMaxSpTop() {
            this.createAdIframe('adMaxSpTop', 'https://adm.shinobi.jp/s/63b6a73ff93e6ac8e3e8febba49c4965', '320px', '50px');
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
.title {
    font-size: 4rem;

    @media screen and (max-width: 768px) {
        font-size: 2.5rem;
        line-height: 1.5;
    }
}
.mv {
    width: 80%;
    max-width: 450px;
}
.point {
    padding: 0 0 0 20px;

    >li {
        @media screen and (max-width: 540px) {
            font-size: 0.9rem;
        }
    }
}
.sub-title {
    @media screen and (max-width: 768px) {
        font-size: 1.5rem;
        line-height: 1.5;
    }
    @media screen and (max-width: 540px) {
        font-size: 1.3rem;
    }
}
</style>
