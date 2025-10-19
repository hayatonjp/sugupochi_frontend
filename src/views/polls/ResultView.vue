<template>
<div class="complete-container">
    <h1 class="text-center">{{ poll?.title }}の投票結果</h1>
    <h5>投票時間: 残り{{ remainingTime  }}</h5>
    <div class="card p-4 mt-2 fade-in">
        <h2 class="h4 mb-3">投票結果グラフ</h2>
        <div class="disabled" v-if="totalVotes <= 0"></div>
        <div class="d-flex gap-2">
            <button class="btn mb-3" :class="showChart == 'bar' ? 'btn-primary' : 'border'" @click="showBarChart" :disabled="totalVotes == 0">
                棒グラフ
            </button>
            <button class="btn mb-3"  :class="showChart == 'pie' ? 'btn-primary' : 'border'" @click="showPieChart" :disabled="totalVotes == 0">
                円グラフ
            </button>
        </div>
        <div class="chart d-flex justify-content-center align-items-center">
            <Pie v-if="showChart == 'pie'" :data="pieData" :options="pieOptions" height="400"/>
            <Bar v-if="showChart == 'bar'" :data="barData" :options="barOptions" height="400"/>
        </div>

        <div class="mt-4">
            <div v-for="(data, index) in progressData" :key="index" class="mb-2">
                <p class="m-0">{{ data.label }}</p>
                <ProgressBar :value="data.value"></ProgressBar>
            </div>
        </div>
    </div>
    <div class="card p-4 mt-4 fade-in">
        <h2 class="h4 mb-2 text-center">{{ poll?.title }}</h2>
        <p class="text-muted m-0 text-center">{{ poll?.description }}</p>
        
        <div class="row">
            <div>
                <div class="stat-item">
                    <div class="stat-value">{{ totalVotes }}</div>
                    <div class="stat-label">総投票数</div>
                </div>
                <div class="stat-item py-0">
                    <div class="stat-value">{{ isExpired ? '投票終了' : lastVoteDate }}</div>
                    <div class="stat-label">最終投票</div>
                </div>
            </div>
        </div>
    </div>

    <a :href="`/polls/${poll?.uuid}`" v-if="!isExpired" class="btn btn-success btn-lg w-100 mt-4">投票する</a>
    <a href="/polls/create" class="btn btn-primary w-100 mt-2 btn-lg">新しいアンケートを作成する</a>
</div>
</template>

<script>
import { Chart as ChartJS, Title, ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'
import { generateColorPalette } from '@/utils/colorPalette'
import ProgressBar from 'primevue/progressbar';
import axios from 'axios';
import { jst } from '@/utils/date'
ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend)
export default {
    components: {
        Pie,
        Bar,
        ProgressBar,
    },
    data() {
        return {
            poll: null, 
            progressData: [],
            pieData: {
                labels: [],
                datasets: []
            },
            pieOptions: [],
            barData: {
                labels: [],
                datasets: []
            },
            barOptions: [],
            showChart: 'bar',
            totalVotes: 0,
            lastVoteDate: 'なし',
            remainingTime: '',
            isExpired: false,
        }
    },
    async mounted() {
        const uuid = this.$route.params.uuid;
        await axios.get(`/api/polls/${uuid}/results`)
            .then(response => {
                this.poll = response.data;
                this.totalVotes = response.data?.votes?.length;
                this.lastVoteDate = response.data?.votes?.length ? jst(response.data?.votes[response.data?.votes.length -1 ].created_at) : 'なし';
                this.remainingTime = response.data?.remainingTime;
                this.isExpired = response.data?.isExpired;
                this.pieData = {
                    labels: this.setLabels(response.data?.poll_options),
                    datasets: [
                        {
                            backgroundColor: generateColorPalette(response.data?.poll_options.length),
                            data: this.setDatasets(response.data?.poll_options),
                        }
                    ]
                };
                this.barData = {
                    labels: this.setLabels(response.data?.poll_options),
                    datasets: [
                        {
                            label: '投票数',
                            backgroundColor: '#42A5F5',
                            data: this.setDatasets(response.data?.poll_options),
                        }
                    ]
                };
                this.progressData = this.setProgressData(response.data?.poll_options);
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        initProgressData(pollOptions) {
            return pollOptions?.map(option => ({
                label: option.text,
                value: 0,
            }));
        },
        setProgressData(pollOptions) {
            return pollOptions?.map(option => ({
                label: option.text + `（${option.votes?.length ?? 0 }票）` + Math.round((option.votes?.length / this.totalVotes || 0) * 100) + '%',
                value: Math.round((option.votes?.length / this.totalVotes) * 100),
            }));
        },
        setLabels(pollOptions) {
            return pollOptions?.map(option => option.text)
        },
        setDatasets(pollOptions) {
            return pollOptions?.map(option => option.votes?.length)
        },
        showBarChart() {
            this.showChart = 'bar'
        },
        showPieChart() {
            this.showChart = 'pie'
        },
        animateValue(targetValue) {
            const startValue = this.animatedValue;
            const startTime = performance.now();
            const duration = this.duration;

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                
                this.animatedValue = startValue + (targetValue - startValue) * easeProgress;
                this.animatedWidth = this.animatedValue;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        },
    },
}
</script>

<style lang="scss" scoped>
.chart { 
    margin: 0 auto
}

.complete-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.stat {
    &-item {
        text-align: center;
        padding: 1rem;
    }
    
    &-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--bs-primary);
    }

    &-label {
        color: #6b7280;
        font-size: 0.875rem;
    }
}

.disabled {
    position: absolute;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &::after {
        content: '未投票';
        color: white;
        font-size: 3rem;
    }
}
</style>
    