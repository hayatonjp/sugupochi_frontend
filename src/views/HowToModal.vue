<template>
    <div class="modal py-5 d-block modal-bg" id="howto_modal" tabindex="-1" aria-labelledby="howto_modal_label" @click.self="() => $emit('close')">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="howto_modal_label">すぐポチアンケの使い方</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body overflow-auto p-4">
                    <h4 class="my-3 fw-bold">アンケート作成者側</h4>
                    <ol class="p-0 m-0">
                        <li>
                            <span class="fw-bold fs-5">アンケートの作成</span>
                            <p class="my-0">トップページから「今すぐアンケートを作成」ボタンをクリックします。登録不要で、すぐにアンケート作成画面が表示されます。</p>
                            <div class="border rounded p-1 mt-2">
                                <img src="/images/howto1.jpg?20250525-2" alt="アンケートの作成" class="img-fluid">
                            </div>
                        </li>
                        <li>
                            <span class="fw-bold fs-5">アンケート項目の入力</span><br>
                            <p class="my-0">必要項目を記入後、「アンケート作成」ボタンをクリックすると、アンケートが作成されます。</p>
                            <div class="border rounded p-1 mt-2">
                                <img src="/images/howto2.jpg?20250525-2" alt="アンケート項目の入力" class="img-fluid">
                            </div>
                        </li>
                        <li>
                            <span class="fw-bold fs-5">アンケート作成完了！</span><br>
                            <p class="my-0">
                                アンケートが作成されると、パスコードと共有リンクが表示されます。
                                投票画面で認証するパスコードと投票画面の共有リンクを投票者にシェアしましょう。
                            </p>
                            <div class="border rounded p-1 mt-2">
                                <img src="/images/howto3.jpg?20250525-2" alt="アンケート作成完了" class="img-fluid">
                            </div>
                        </li>
                    </ol>
                    <h4 class="mt-5 mb-3 fw-bold">投票者側</h4>
                    <ol class="p-0 m-0">
                        <li>
                            <span class="fw-bold fs-5">パスコードの入力</span><br>
                            <p class="my-0">
                                投票画面に遷移すると、パスコードの入力画面が表示されます。
                                アンケート作成者から共有されたパスコードを入力してください。
                            </p>
                            <div class="border rounded p-1 mt-2">
                                <img src="/images/howto4.jpg?20250525-2" alt="パスコードの入力" class="img-fluid">
                            </div>
                        </li>
                        <li>
                            <span class="fw-bold fs-5">投票する</span><br>
                            <p class="my-0">
                                選択肢を選択し、「投票する」ボタンをクリックします。
                            </p>
                            <div class="border rounded p-1 mt-2">
                                <img src="/images/howto5.jpg?20250525-2" alt="投票する" class="img-fluid">
                            </div>
                        </li>
                        <li>
                            <span class="fw-bold fs-5">投票完了！</span><br>
                            <p class="my-0">
                                投票が完了したら、投票結果を確認することができます。
                            </p>
                            <div class="border rounded p-1 mt-2">
                                <img src="/images/howto6.jpg?20250525-2" alt="投票完了" class="img-fluid">
                            </div>
                        </li>
                        <li>
                            <span class="fw-bold fs-5">投票結果を見る</span><br>
                            <p class="my-0">
                                投票結果画面にて、投票結果をグラフで確認することができます。
                            </p>
                            <div class="border rounded p-1 mt-2">
                                <img src="/images/howto7.jpg?20250525-2" alt="投票結果を見る" class="img-fluid">
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
ol {
    counter-reset:number; /*数字をリセット*/
    list-style-type: none!important; /*数字を一旦消す*/
    padding:0.5em;
}

ol li {
    position: relative;
    padding-left: 30px;
    line-height: 2rem;
    padding: 0.5em 0.5em 0.5em 30px;

    &:not(:first-child) {
        margin-top: 1.5rem;
    }
}

ol li:before{
    /* 以下数字をつける */
    position: absolute;
    counter-increment: number;
    content: counter(number);
    /*以下数字のデザイン変える*/
    display:inline-block;
    background: #5c9ee7;
    color: white;
    font-family: 'Avenir','Arial Black','Arial',sans-serif;
    font-weight:bold;
    font-size: 15px;
    border-radius: 50%;
    left: 0;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    /*以下 上下中央寄せのため*/
    top: 24px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
.modal-bg {
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-body {
    height: 600px;

    @media screen and (max-width: 768px) {
        height: 500px;
    }
}
</style>