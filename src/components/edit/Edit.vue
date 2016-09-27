<template lang="html">
  <div class="qn-wrap">
    <div class="qn">
      <header class="header">
        <input type="text" class="title" placeholder="填写问卷标题" value="{{title}}">
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
    </div>
  </div>
</template>

<script>
import Question from './Question'
export default {
  data () {
    return this.getData() ? this.getData() : {
      title: '',
      questions: [],
      canHideOptionPanel: true
    }
  },
  methods: {
    getData () {
      return JSON.parse(window.localStorage.getItem('pf-temp-data'))
    },
    saveData () {
      window.localStorage.setItem('pf-temp-data', JSON.stringify(this.$data))
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
      this.saveData()
    },
    transposition (arr, oldIndex, newIndex) {
      let value = arr.splice(oldIndex, 1)[0]
      arr.splice(newIndex, 0, value)
    }
  },
  components: {
    Question
  },
  events: {
    'change-option-value': function (qIndex, oIndex, value) {
      this.questions[qIndex].answers[oIndex].value = value
      this.saveData()
    },
    'change-question-title': function (qIndex, value) {
      this.questions[qIndex].title = value
      this.saveData()
    },
    'show-option-tools': function (qIndex, oIndex) {
      this.questions[qIndex].answers[oIndex].showOptionTools = true
      this.saveData()
    },
    'hide-option-tools': function (qIndex, oIndex) {
      if (this.questions[qIndex].answers[oIndex]) {
        if (this.questions[qIndex].answers[oIndex].canHideOptionPanel) {
          this.questions[qIndex].answers[oIndex].showOptionTools = false
          this.saveData()
        }
      }
    },
    'question-pos-change': function (oldIndex, newIndex) {
      this.transposition(this.questions, oldIndex, newIndex)
      this.saveData()
    },
    'add-option': function (qIndex) {
      this.questions[qIndex].answers.push({
        value: '选项' + (this.questions[qIndex].answers.length + 1),
        showOptionTools: false,
        canHideOptionPanel: true
      })
      this.saveData()
    },
    'delete-option': function (qIndex, oIndex) {
      this.questions[qIndex].answers.splice(oIndex, 1)
      this.saveData()
    },
    'lock-panel': function (qIndex, oIndex) {
      this.questions[qIndex].answers[oIndex].canHideOptionPanel = false
    },
    'unlock-panel': function (qIndex, oIndex) {
      this.questions[qIndex].answers[oIndex].canHideOptionPanel = true
    },
    'delete-question': function (qIndex) {
      this.questions.splice(qIndex, 1)
      this.saveData()
    },
    'copy-question': function (qIndex) {
      let newQ = Object.assign({}, this.questions[qIndex])
      this.questions.push(newQ)
      this.saveData()
    },
    'change-text-required': function (qIndex, required) {
      console.log(required)
      this.questions[qIndex].required = required
      this.saveData()
    },
    'option-pos-change': function (qIndex, oOldIndex, oNewIndex) {
      this.questions[qIndex].answers[oOldIndex].canHideOptionPanel = true
      this.questions[qIndex].answers[oOldIndex].showOptionTools = false
      this.transposition(this.questions[qIndex].answers, oOldIndex, oNewIndex)
      this.saveData()
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
      @at-root {
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
      }
    }
  }
}
</style>
