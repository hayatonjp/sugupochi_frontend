<template>
   <div class="py-5" style="height: 100vh">
        <div v-if="!isVerified" class="d-flex justify-content-center align-items-center" tabindex="-1">
            <div class="modal-dialog d-flex justify-content-center align-items-center password-modal">
                <div class="modal-content border p-4 rounded bg-white">
                    <h4 class="text-center mb-3" style="word-break: keep-all;">{{ poll?.title }}のアンケートに<br class="br-sp"/>投票する</h4>
                    <h6 class="text-center mb-3">パスコードを入力してください</h6>
                    <input type="text" class="form-control mb-3" v-model="password" placeholder="パスコードを入力">
                    <button type="button" class="btn btn-primary" @click="verifyPassword">送信</button>
                </div>
            </div>
        </div>
        <div v-else class="container">
            <div class="poll-container">
                <div class="card border fade-in">
                    <div class="poll-header">
                        <h1 class="poll-title">{{ poll?.title }}</h1>
                        <p class="poll-description">{{ poll?.description }}</p>
                        <div class="expire-info">
                            <i class="bi bi-clock"></i>
                            <span>有効期限: {{ poll?.expires_at }}</span>
                        </div>
                    </div>

                    <form class="form" @submit.prevent="handleSubmit">
                        <input type="hidden" name="poll_id" :value="poll?.id">
                        <input type="hidden" name="poll_uuid" :value="poll?.uuid">
                        <div class="disabled" v-if="isExpired" style="font-size: 2rem;">投票期間は終了しました</div>
                        <div class="disabled" v-else-if="isVoted" style="font-size: 2rem;">投票済みです</div>
                        <div class="poll-options">
                            <div v-for="option in poll?.poll_options" :key="option.id" class="poll-option" @click="selectOption(option.id)">
                                <input type="radio" name="poll_option_id" :id="'option'+option.id" v-model="selectedOption" :value="option.id" :checked="option.id == selectedOption">
                                <label :for="'option'+option.id">{{ option.text }}</label>
                            </div>
                        </div>

                        <div class="vote-button-container">
                            <button type="submit" class="btn btn-primary vote-button" :disabled="isSubmitting || isExpired">
                                {{ isSubmitting ? '送信中...' : '投票する' }}
                            </button>
                        </div>
                    </form>
                </div>

                <div class="card poll-info-card fade-in">
                    <div class="p-4">
                        <h2 class="poll-info-title">アンケート情報</h2>
                        <ul class="poll-info-list">
                            <li class="poll-info-item">
                                <i class="bi bi-calendar-event"></i>
                                作成日: {{ jst(poll?.created_at) }}
                            </li>
                            <li class="poll-info-item">
                                <i class="bi bi-people"></i>
                                現在の投票数: {{ poll?.votes?.length }}
                            </li>
                            <li class="poll-info-item">
                                <i class="bi bi-bar-chart"></i>
                                <a :href="`/polls/${poll?.uuid}/results`" class="link" :class="!poll?.votes?.length ? 'disabled-link' : ''">結果を見る</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { jst } from '@/utils/date'
import { getVoterIdentifier } from '@/utils/localStorage'
import { getVerifiedPasscode, saveVerifiedPasscode } from '../../utils/localStorage';
export default {
    data() {
        return {
            poll: null,
            selectedOption: null,
            isVerified: false,
            isExpired: false,
            password: null,
            isVoted: false,
            isSubmitting: false,
        }
    },
    mounted() {
        const uuid = this.$route.params.uuid;
        axios.get(`/api/polls/${uuid}`)
            .then(response => {
                this.poll = response.data;
                this.isVerified = getVerifiedPasscode(response.data?.uuid) ? true : false;
                this.isExpired = new Date(response.data?.expires_at)?.toISOString() < new Date().toISOString();
                this.isVoted = getVoterIdentifier(response.data?.uuid) ? true : false;
            })
            .catch(error => {
                window.location.href = "/"
            })
    },
    methods: {
        selectOption(optionId) {
            this.selectedOption = optionId;
        },
        verifyPassword() {
            if (this.password === this.poll?.passcode) {
                saveVerifiedPasscode(this.poll?.uuid)
                this.isVerified = true;
            } else {
                alert('パスコードが正しくありません');
            }
        },
        jst(date) {
            return jst(date);
        },
        handleSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;
            axios.post(`/api/polls/${this.poll?.uuid}/vote`, {
                poll_option_id: this.selectedOption,
            })
            .then(response => {
                const voterIdentifier = response.data?.voterIdentifier;
                window.location.href = `/api/polls/${this.poll?.uuid}/vote/complete${voterIdentifier ? '?voterIdentifier=' + voterIdentifier : ''}`;
            })
            .catch(error => {
                alert('投票中にエラーが発生しました。');
            })
            .finally(() => {
                this.isSubmitting = false;
            });
        },
    },
}
</script>

<style lang="scss" scoped>
.poll {
    &-container {
        max-width: 600px;
        margin: 0 auto;
    }

    &-header {
        text-align: center;
        padding: 2rem 1rem 1rem;
    }

    &-title {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #1f2937;
    }

    &-description {
        font-size: 1.1rem;
        color: #6b7280;
        margin-bottom: 1rem;
    }

    &-options {
        padding: 1rem 2rem 2rem;
    }
    
    &-option {
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        padding: 1rem 1.25rem;
        margin-bottom: 0.75rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        background-color: #ffffff;

        &:hover {
            border-color: var(--bs-primary);
            background-color: #f9fafb;
        }

        &.selected {
            border-color: var(--bs-primary);
            background-color: var(--bs-primary-light);
        }

        input[type="radio"] {
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.75rem;
            cursor: pointer;
        }

        label {
            cursor: pointer;
            margin: 0;
            font-size: 1.1rem;
            color: #374151;
            width: 100%;
        }
    }
    
    &-info {
        &-card {
            margin-top: 2rem;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
        }

        &-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #374151;
        }

        &-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        &-item {
            display: flex;
            align-items: center;
            color: #6b7280;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;

            &:last-child {
                margin-bottom: 0;
            }

            >i {
                width: 24px;
                color: #9ca3af;
            }

            >a {
                color: var(--bs-primary);
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

.expire-info {
    display: inline-flex;
    align-items: center;
    color: #9ca3af;
    font-size: 0.875rem;
    gap: 0.25rem;

    >i {
        font-size: 1rem;
    }
}

.vote-button {
    min-width: 200px;
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;

    &-container {
        padding: 0 2rem 2rem;
        text-align: center;
    }
}

.form {
    position: relative;
}

.disabled {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    top: 0;
    left: 0;
}

.link {
    &.disabled-link {
        pointer-events: none;
        color: #9ca3af;
        cursor: not-allowed;
    }
}

.password-modal {
    width: 80%;
    max-width: 500px;
    height: 400px;
}

/* レスポンシブ */
@media (max-width: 576px) {
    .poll {
        &-header {
            padding: 1.5rem 1rem 0.5rem;
        }

        &-title {
            font-size: 1.5rem;
        }

        &-options {
            padding: 1rem;
        }
    }
    
    .vote-button-container {
        padding: 0 1rem 1.5rem;
    }
}
</style>