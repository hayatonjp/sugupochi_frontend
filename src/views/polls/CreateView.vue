<template>
    <div class="container-lm d-flex justify-content-center">
        <div ref="adMaxPcLeft" class="ad-max-pc"></div>
        <div class="container p-3 mx-md-4">
            <div class="alert alert-info" v-if="errors.length">
                <ul class="m-0">
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
            </div>
            <div ref="adMaxSpTop" class="ad-max-sp"></div>
            <form class="mb-3" @submit.prevent="handleSubmit">
                <h1 class="text-center mt-2">アンケート作成</h1>
                <div class="mb-3">
                    <label for="title" class="form-label">タイトル*</label>
                    <input name="title" type="text" class="form-control" id="title" v-model="title" placeholder="タイトルを入力してください" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">説明文（任意）</label>
                    <textarea name="description" class="form-control" id="description" v-model="description" placeholder="説明文を入力してください" rows="6"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">選択肢*</label>
                    <div v-for="option in pollOptions" :key="option.id" class="d-flex gap-2">
                        <input name="options[]" type="text" class="form-control mb-2" v-model="option.text" placeholder="選択肢を入力してください" required>
                        <button v-if="option.id > 2" type="button" class="btn btn-danger mb-2" style="width: 80px;" @click="deleteOption(option)">削除</button>
                    </div>
                    <button type="button" class="btn btn-secondary mb-2" @click="addOption">選択肢を追加</button>
                </div>
                <div class="mb-3">
                    <label class="form-label">有効期限（最長の期限は当日の23:59までで、未設定の場合は作成してから10分後が期限となります。）</label>
                    <input type="datetime-local" name="expires_at" v-model="expiresAt" class="form-control"
                        min="{{ \Carbon\Carbon::today()->format('Y-m-d') }}T00:00"
                        max="{{ \Carbon\Carbon::today()->format('Y-m-d') }}T23:59">
                </div>
                <div class="mb-3">
                    <label class="form-label">パスコード（投票画面で入力してもらうコードです。未設定の場合は自動で設定されます。）</label>
                    <input name="passcode" type="text" class="form-control" id="passcode" v-model="passcode" placeholder="パスコードを入力してください">
                </div>
                <button type="submit" class="btn btn-primary w-100" style="height: 50px;" :disabled="isSubmitting">
                    {{ isSubmitting ? '送信中...' : 'アンケート作成' }}
                </button>
                <div class="border-top border-4 pt-2 mt-4 br-sp"></div>
            </form>
            <div ref="adMaxSpBottom" class="ad-max-sp"></div>
        </div>
        <div ref="adMaxPcRight" class="ad-max-pc"></div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        errorsJson: { type: String, required: false },
    },
    mounted() {
        this.setAdMaxPcLeft();
        this.setAdMaxPcRight();
        this.setAdMaxSpTop();
        this.setAdMaxSpBottom();
    },
    data() {
        return {
            title: '',
            description: '',
            pollOptions: this.initOptions(),
            expiresAt: null,
            passcode: null,
            errors: JSON.parse(this.errorsJson ?? '[]'),
            isSubmitting: false,
        }
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
            this.createAdIframe('adMaxPcLeft', 'https://adm.shinobi.jp/s/fdb16babd29607f2a685c38c89451a9c', '160px', '100%');
        },
        setAdMaxPcRight() {
            this.createAdIframe('adMaxPcRight', 'https://adm.shinobi.jp/s/95776d4cbfd83297df59375250dfd210', '160px', '100%');
        },
        setAdMaxSpTop() {
            this.createAdIframe('adMaxSpTop', 'https://adm.shinobi.jp/s/3f4627d07e072b049f328838e12a42ed');
        },
        setAdMaxSpBottom() {
            this.createAdIframe('adMaxSpBottom', 'https://adm.shinobi.jp/s/9eb4179c1a514d7fa65027d3e623a304');
        },
        initOptions() {
            return [
                { id: 1, text: '' },
                { id: 2, text: '' },
            ]
        },
        addOption() {
            this.pollOptions.push({ id: this.pollOptions.length + 1, text: '' });
        },
        deleteOption(option) {
            this.pollOptions.splice(this.pollOptions.indexOf(option), 1);
        },
        handleSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;
            
            axios.post('/api/polls', {
                title: this.title,
                description: this.description,
                options: this.pollOptions.map(option => option.text),
                expires_at: this.expiresAt,
                passcode: this.passcode,
            })
            .then(response => {
                window.location.href = `/polls/${response.data.pollUuid}/create/complete`;
            })
            .catch(error => {
                console.log(error)
                if (error.response && error.response.data && error.response.data.errors) {
                    this.errors = Object.values(error.response.data.errors).flat();
                } else {
                    this.errors = ['アンケートの作成中にエラーが発生しました。'];
                }
            })
            .finally(() => {
                this.isSubmitting = false;
            });
        },
    },
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
</style>