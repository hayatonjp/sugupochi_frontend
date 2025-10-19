<template>
<div class="complete-container">
    <div class="text-center mb-5 fade-in">
        <div class="success-icon">
            <i class="bi bi-check-lg"></i>
        </div>
        <h1 class="h2 mb-3">投票が完了しました！</h1>
        <a :href="`/polls/${$route.params.uuid}/results`" class="btn btn-primary mb-5">
            投票結果を見る
        </a>
        <div class="border-top border-3 pt-5 w-md-50 w-100 d-flex mx-auto"></div>
        <div ref="adMaxPc" class="ad-max-pc d-flex justify-content-center"></div>
    </div>
</div>
</template>

<script>
import apiClient from '@/utils/axios';
import { getVoterIdentifier, saveVoterIdentifier } from '@/utils/localStorage'
export default {
    data() {
        return {
            poll: null,
            voterIdentifier: null,
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
        setAdMaxPc() {
            this.createAdIframe('adMaxPc', 'https://adm.shinobi.jp/s/6e630318c426ca1ff31e6ecdc7a458a9', '300px', '250px');
        },
    },
    async mounted() {
        const uuid = this.$route.params.uuid;
        await apiClient.get(`/polls/${uuid}/vote/complete`)
            .then(response => {
                this.poll = response.data;
                this.voterIdentifier = getVoterIdentifier(response.data?.uuid);
            })
            .catch(error => {
                window.location.href = "/";
            });
            
        this.setAdMaxPc();
        if (!getVoterIdentifier(uuid)) {
            saveVoterIdentifier(uuid)
        }
    },
}
</script>

<style scoped>
    .progress-container {
        margin: 10px 0;
    }

    .progress-bar {
        width: 100%;
        height: 20px;
        background-color: #e9ecef;
        border-radius: 10px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background-color: #007bff;
        transition: width 0.3s ease-out;
    }

    .progress-text {
        text-align: right;
        margin-top: 5px;
        font-weight: 500;
    }

    .chart { 
        max-width: 600px;
        margin: 0 auto
    }
    :root {
        --bs-primary: #4f46e5;
        --bs-primary-rgb: 79, 70, 229;
    }
    
    body {
        background-color: #f8f9fa;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    
    .btn-primary {
        background-color: var(--bs-primary);
        border-color: var(--bs-primary);
    }
    
    .btn-primary:hover {
        background-color: #4338ca;
        border-color: #4338ca;
    }
    
    .text-primary {
        color: var(--bs-primary) !important;
    }
    
    .navbar-brand {
        font-weight: 700;
        font-size: 1.5rem;
    }
    
    .complete-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }
    
    .success-icon {
        width: 80px;
        height: 80px;
        background-color: #d1fae5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
    }
    
    .success-icon i {
        font-size: 2.5rem;
        color: #059669;
    }
    
    .result-card {
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        margin-bottom: 2rem;
        padding: 1.5rem;
    }
    
    .chart-container {
        position: relative;
        height: 300px;
        margin: 1rem 0;
    }
    
    .option-item {
        display: flex;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .option-item:last-child {
        border-bottom: none;
    }
    
    .option-text {
        width: 150px;
        font-weight: 500;
    }
    
    .option-votes {
        color: #6b7280;
        margin-right: 1rem;
        min-width: 60px;
        text-align: right;
    }
    
    .option-percentage {
        font-weight: 600;
        color: var(--bs-primary);
        min-width: 60px;
        text-align: right;
    }
    
    .progress-bar-container {
        flex: 1;
        margin: 0 1rem;
    }
    
    .progress {
        height: 8px;
        background-color: #e5e7eb;
    }
    
    .progress-bar {
        background-color: var(--bs-primary);
        transition: width 0.6s ease;
    }
    
    .your-vote-indicator {
        display: inline-block;
        background-color: #fef3c7;
        color: #92400e;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        margin-left: 8px;
    }
    
    .share-section {
        background-color: #f9fafb;
        border-radius: 12px;
        padding: 1.5rem;
    }
    
    .share-input-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .social-buttons {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .stat-item {
        text-align: center;
        padding: 1rem;
        border-right: 1px solid #e5e7eb;
    }
    
    .stat-item:last-child {
        border-right: none;
    }
    
    .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--bs-primary);
    }
    
    .stat-label {
        color: #6b7280;
        font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
        .option-item {
            flex-wrap: wrap;
        }
        
        .option-text {
            width: 100%;
            margin-bottom: 0.5rem;
        }
        
        .progress-bar-container {
            width: 100%;
            margin: 0.5rem 0;
        }
        
        .stat-item {
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .stat-item:last-child {
            border-bottom: none;
        }
    }
</style>
