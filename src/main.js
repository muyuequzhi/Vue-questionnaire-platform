import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import NewHome from './components/edit/Home'
import NewQuestionare from './components/edit/New'
import Questionare from './components/questionare/Questionare'
import Edit from './components/edit/Edit'

Vue.use(VueRouter)
let router = new VueRouter()
router.map({
  '/new-home': {
    component: NewHome,
    subRoutes: {
      '/': {
        component: NewQuestionare
      },
      '/edit': {
        component: Edit
      }
    }
  },
  '/questionare': {
    component: Questionare
  }
})
router.redirect({
  '/': '/questionare'
})
router.start(App, 'body')
