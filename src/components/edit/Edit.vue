<template lang="html">
  <div class="qn-wrap">
    <div class="qn">
      <header class="header">
        <input type="text" class="title" placeholder="填写问卷标题" value="{{title}}" v-model="title">
      </header>
      <div class="body">
        <div class="body-wrap">
          <ol v-if="questions.length !== 0" class="questions">
            <li
              is="question"
              v-for="(qIndex, q) in questions"
              track-by="$index"
              :q-index="qIndex"
              :question="q"
              class="question {{ q.type }}">
            </li>
          </ol>
          <div class="tools">
            <div class="toolbar">
              <span class="btn" @click="addQuestion('radio')"><span class="iconfont">&#xe64e;</span>单选题</span>
              <span class="btn" @click="addQuestion('checkbox')"><span class="iconfont">&#xe64a;</span>多选题</span>
              <span class="btn" @click="addQuestion('text')"><span class="iconfont">&#xe64b;</span>文本题</span>
            </div>
            <div class="add-btn"><span class="iconfont">&#xe60f;</span>添加问题</div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="pick-date">
          <span class="msg">问卷截止日期</span>
          <calendar v-ref:date-picker></calendar>
        </div>
        <div class="operation">
          <span class="btn" @click="saveBtnHandler">保存问卷</span>
          <span class="btn" @click="publicBtnHandler">发布问卷</span>
        </div>
      </footer>
    </div>
  </div>
  <alert :show.sync="showAlert" placement="top" duration="3000" type="warning" width="400px" dismissable>
    <strong>您正在离开当前页面 ...</strong>
    <p>需要先保存问卷吗？</p>
  </alert>
  <modal
    :show.sync="showModal"
    cancel-text="取消"
    ok-text="确定"
    :callback="modalCallback"
    title="提示" >
    <div slot="modal-body">
      <div>你的问卷尚未保存，确定要放弃保存此问卷吗？</div>
    </div>
  </modal>
</template>

<script>
import Question from './Question'
import Calendar from '../common/Calendar'
import Alert from '../common/Alert'
import Modal from '../common/Modal'
export default {
  data () {
    let qnEditing = window.localStorage.getItem('qn-editing') ? JSON.parse(window.localStorage.getItem('qn-editing')) : []
    let obj = {}
    let defaults = {
      title: '',
      questions: [],
      canHideOptionPanel: true,
      showAlert: false,
      public: false,
      showModal: false,
      routerCanDeactivate: false,
      expires: ''
    }
    if (qnEditing.length !== 0) {
      Object.assign(obj, defaults, qnEditing)
    } else {
      Object.assign(obj, defaults, { qnId: this.createID() })
    }
    return obj
  },
  computed: {
    questionaire () {
      return {
        title: this.title,
        questions: this.questions,
        expires: this.expires,
        public: this.public,
        qnId: this.qnId
      }
    }
  },
  methods: {
    saveData () {
      let data = window.localStorage.getItem('pf-all-qn') ? JSON.parse(window.localStorage.getItem('pf-all-qn')) : []
      let isEdit = false
      let editQnId = -1
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].qnId === this.questionaire.qnId) {
          isEdit = true
          editQnId = i
        }
      }
      if (isEdit) {
        data.splice(editQnId, 1)
        this.clearEditingData()
      }
      data.push(this.questionaire)
      window.localStorage.setItem('pf-all-qn', JSON.stringify(data))
    },
    addQuestion (type) {
      let option = {
        title: '问题题目',
        type: type
      }
      if (type !== 'text') {
        option.answers = [
          {
            value: '选项1',
            showOptionTools: false,
            canHideOptionPanel: true
          },
          {
            value: '选项2',
            showOptionTools: false,
            canHideOptionPanel: true
          }
        ]
      } else {
        option.required = false
        option.text = ''
      }
      this.questions.push(option)
    },
    transposition (arr, oldIndex, newIndex) {
      let value = arr.splice(oldIndex, 1)[0]
      arr.splice(newIndex, 0, value)
    },
    modalCallback () {
      this.canDeactivate = true
      this.clearEditingData()
      this.$route.router.go({ path: '/questionare' })
    },
    saveBtnHandler () {
      this.saveData()
      this.canDeactivate = true
      this.$route.router.go({ path: '/questionare' })
    },
    publicBtnHandler () {
      this.public = true
      this.saveBtnHandler()
    },
    createID () {
      let thisId = Number(window.localStorage.getItem('qn-id')) || 0
      let nextId = thisId + 1
      window.localStorage.setItem('qn-id', nextId)
      return thisId
    },
    clearEditingData () {
      window.localStorage.removeItem('qn-editing')
    }
  },
  ready () {
    this.$refs.datePicker.$els.datePicker.value = this.expires
  },
  components: {
    Question,
    Calendar,
    Alert,
    Modal
  },
  events: {
    'change-option-value': function (qIndex, oIndex, value) {
      this.questions[qIndex].answers[oIndex].value = value
    },
    'change-question-title': function (qIndex, value) {
      this.questions[qIndex].title = value
    },
    'show-option-tools': function (qIndex, oIndex) {
      this.questions[qIndex].answers[oIndex].showOptionTools = true
    },
    'hide-option-tools': function (qIndex, oIndex) {
      if (this.questions[qIndex].answers[oIndex]) {
        if (this.questions[qIndex].answers[oIndex].canHideOptionPanel) {
          this.questions[qIndex].answers[oIndex].showOptionTools = false
        }
      }
    },
    'question-pos-change': function (oldIndex, newIndex) {
      this.transposition(this.questions, oldIndex, newIndex)
    },
    'add-option': function (qIndex) {
      this.questions[qIndex].answers.push({
        value: '选项' + (this.questions[qIndex].answers.length + 1),
        showOptionTools: false,
        canHideOptionPanel: true
      })
    },
    'delete-option': function (qIndex, oIndex) {
      this.questions[qIndex].answers.splice(oIndex, 1)
    },
    'lock-panel': function (qIndex, oIndex) {
      this.questions[qIndex].answers[oIndex].canHideOptionPanel = false
    },
    'unlock-panel': function (qIndex, oIndex) {
      this.questions[qIndex].answers[oIndex].canHideOptionPanel = true
    },
    'delete-question': function (qIndex) {
      this.questions.splice(qIndex, 1)
    },
    'copy-question': function (qIndex) {
      let newQ = Object.assign({}, this.questions[qIndex])
      this.questions.push(newQ)
    },
    'change-text-required': function (qIndex, required) {
      this.questions[qIndex].required = required
    },
    'option-pos-change': function (qIndex, oOldIndex, oNewIndex) {
      this.questions[qIndex].answers[oOldIndex].canHideOptionPanel = true
      this.questions[qIndex].answers[oOldIndex].showOptionTools = false
      this.transposition(this.questions[qIndex].answers, oOldIndex, oNewIndex)
    },
    'date-change': function (dateValue) {
      this.expires = dateValue
    }
  },
  route: {
    canReuse () {
      console.log('canReuse')
    },
    canDeactivate () {
      if (!this.canDeactivate) {
        this.showModal = true
        return false
      }
      return true
    },
    deactivate () {
      console.log('deactivate')
    },
    canActivate () {
      console.log('canActivate')
    },
    activate () {
      console.log('activate')
    }
  }
}
</script>
<style lang="scss">
@import "../../scss/base";
@import "../../scss/helpers/mixins";
.qn-wrap {
  padding: 3rem 6rem;
  border-top: 1px solid $line-color;
  background: $bg-gray;
  height: 100%;
  overflow: auto;
  @at-root {
    .qn {
      background-color: #fff;
      border-radius: .4rem;
      box-shadow: .1rem .1rem .4rem 0 #aaa;
      display: inline-block;
      width: 100%;
      .header {
        @include placeholder-style {
          text-align: center;
        };
        text-align: center;
        .title {
          text-align: center;
          width: 80%;
          outline: none;
          padding: 0 1rem;
          margin: 2rem auto;
          border: 1px solid transparent;
          font-size: $font-size-lg;
          line-height: 3rem;
          &:focus {
            border-color: $light-black;
            background: $bg-yellow;
          }
        }
      }
      .body {
        padding: 0 1rem;
        .body-wrap {
          border-top: 1px solid $line-color;
          border-bottom: 1px solid $line-color;
          margin-bottom: 2rem;
          @at-root .questions {
            padding: 2rem 0;
          }
          .tools {
            text-align: center;
            border-radius: 0;
            margin: 1rem auto;
            border: 1px solid $gray;
            &:hover {
              .toolbar {
                height: 4.4rem;
              }
              .add-btn {
                background: $light-gray;
              }
            }
            @at-root .toolbar {
              height: 0;
              overflow: hidden;
              transition: height .3s ease;
              .btn {
                @include button(.5rem, .2rem, $light-black);
                margin: 1rem .5rem;
                display: inline-block;
                line-height: 1.8rem;
                .iconfont {
                  margin-right: .3rem;
                }
              }
            }
            @at-root .add-btn {
              .iconfont {
                margin-right: .5rem;
              }
              background: $bg-gray;
              cursor: pointer;
              font-size: $font-size-default;
              color: $light-black;
              line-height: 3;
              width: 100%;
            }
          }
        }
      }
      .footer {
        padding: 0 1.5rem 1.5rem;
      }
    }
  }
  .footer {
    display: flex;
    .pick-date {
      display: inline-block;
      .msg {
        margin-right: 1rem;
      }
    }
    .operation {
      flex-grow: 1;
      text-align: right;
      .btn {
        border: 1px solid $light-black;
        padding: .2rem 1rem;
        border-radius: .4rem;
        cursor: pointer;
        margin-left: 1rem;
        &:last-child {
          margin-right: 10rem;
        }
        &:hover {
          background-color: $blue;
          color: #fff;
        }
      }
    }
  }
}
</style>
