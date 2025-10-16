import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TermView from '../views/TermView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import ContactView from '../views/ContactView.vue'
import PollCreateView from '../views/polls/CreateView.vue'
import PollShowView from '../views/polls/ShowView.vue'
import PollResultView from '../views/polls/ResultView.vue'
import PollCreateCompleteView from '../views/polls/CreateCompleteView.vue'
import PollVoteCompleteView from '../views/polls/VoteCompleteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermView
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/polls/create',
      name: 'polls.create',
      component: PollCreateView
    },
    {
      path: '/polls/:uuid/complete',
      name: 'polls.create.complete',
      component: PollCreateCompleteView
    },
    {
      path: '/polls/:uuid/results',
      name: 'polls.results',
      component: PollResultView
    },
    {
      path: '/polls/:uuid/vote/complete',
      name: 'polls.vote.complete',
      component: PollVoteCompleteView
    },
    {
      path: '/polls/:uuid',
      name: 'polls.show',
      component: PollShowView
    }
  ],
})

export default router
