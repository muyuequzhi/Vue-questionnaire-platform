<template lang="html">
  <li>
    <div class="content">
      <p
        @keyup="changeQuestionTitle(qIndex, $event)"
        class="input title" contenteditable>{{ question.title }}</p>
      <ol v-if="question.type !== 'text'" class="answers">
        <li
          v-for="answer in question.answers"
          track-by="$index"
          class="answer">
          <input type="{{ question.type }}" name="问题{{qIndex + 1}}">
          <div class="option">
            <p
              @keyup="changeOptionValue(qIndex, $index, $event)"
              @focus="showOptionTools(qIndex, $index)"
              @blur="hideOptionTools(qIndex, $index)"
              class="input"
              contenteditable>{{ answer.value }}</p>
            <ul
              :class="{
                'active': answer.showOptionTools
              }"
              @mouseover="panelLock(qIndex, $index)"
              @mouseout="panelUnlock(qIndex, $index)"
              class="option-panel">
              <li
                @click="optionPositionFront(qIndex, $index)"
                class="iconfont">&#xe63e;</li>
              <li
                @click="optionPositionBack(qIndex, $index)"
                class="iconfont">&#xe63f;</li>
              <li
                @click="deleteOption(qIndex, $index)"
                class="iconfont">&#xe646;</li>
            </ul>
          </div>
        </li>
      </ol>
      <div
        @click="addOption(qIndex)"
        v-if="question.type !== 'text'"
        class="add-option"><span class="iconfont">&#xe60f;</span>添加选项</div>
      <div v-else class="option">
        <textarea class="textarea"></textarea>
        <label for="isRequired"><input
          @change="changeTextRequired(qIndex, $event)"
          :checked="question.required"
          class="required"
          id="isRequired"
          type="checkbox">是否必填</label>
      </div>
    </div>
    <div class="side">
      <div class="order">Q{{ qIndex + 1 }}</div>
      <ul class="opertions">
        <li
          @click="questionPositionFront(qIndex)"
          class="iconfont">&#xe63e;</li>
        <li
          @click="questionPositionBack(qIndex)"
          class="iconfont">&#xe63f;</li>
        <li
          @click="copyQuestion(qIndex)"
          class="iconfont">&#xe62e;</li>
        <li
          @click="deleteQuestion(qIndex)"
          class="iconfont">&#xe60d;</li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true
    },
    qIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 问题题目
    changeQuestionTitle (qIndex, e) {
      this.$dispatch('change-question-title', qIndex, e.target.textContent)
    },
    // 问题位置
    questionPositionFront (oldIndex) {
      this.$dispatch('question-pos-change', oldIndex, oldIndex - 1)
    },
    questionPositionBack (oldIndex) {
      this.$dispatch('question-pos-change', oldIndex, oldIndex + 1)
    },
    deleteQuestion (qIndex) {
      this.$dispatch('delete-question', qIndex)
    },
    // 选项值
    changeOptionValue (qIndex, oIndex, e) {
      this.$dispatch('change-option-value', qIndex, oIndex, e.target.textContent)
    },
    // 添加选项
    addOption (qIndex) {
      this.$dispatch('add-option', qIndex)
    },
    // 删除选项
    deleteOption (qIndex, oIndex) {
      this.$dispatch('delete-option', qIndex, oIndex)
    },
    showOptionTools (qIndex, oIndex) {
      this.$dispatch('show-option-tools', qIndex, oIndex)
    },
    hideOptionTools (qIndex, oIndex) {
      this.$dispatch('hide-option-tools', qIndex, oIndex)
    },
    panelLock (qIndex, oIndex) {
      this.$dispatch('lock-panel', qIndex, oIndex)
    },
    panelUnlock (qIndex, oIndex) {
      this.$dispatch('unlock-panel', qIndex, oIndex)
    },
    copyQuestion (qIndex) {
      this.$dispatch('copy-question', qIndex)
    },
    changeTextRequired (qIndex, e) {
      this.$dispatch('change-text-required', qIndex, e.target.checked)
    },
    optionPositionFront (qIndex, oIndex) {
      this.$dispatch('option-pos-change', qIndex, oIndex, oIndex - 1)
    },
    optionPositionBack (qIndex, oIndex) {
      this.$dispatch('option-pos-change', qIndex, oIndex, oIndex + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/base";
@import "../../scss/helpers/mixins";
.question {
  @include clearfix;
  padding: 1rem 0;
  list-style: none;
  &:hover {
    background-color: $bg-gray;
    .side {
      .opertions {
        visibility: visible !important;
      }
    }
    .add-option {
      visibility: visible !important;
    }
  }
  .side {
    float: left;
    margin-left: -100%;
    width: 3rem;
    font-size: $font-size-default;
    cursor: pointer;
    line-height: 1.5;
    text-align: center;
    .opertions {
      margin-top: .3rem;
      list-style: none;
      padding: 0;
      visibility: hidden;
      line-height: 2;
      color: $gray;
      .iconfont:hover {
        color: $blue;
      }
    }
  }
  .content {
    float: left;
    width: 100%;
    padding-left: 4rem;
    .textarea,
    .input {
      border: 1px solid transparent;
      background-color: transparent;
      margin: 0;
      outline: none;
      &:hover,
      &:focus {
        border-color: $light-black;
        background-color: $bg-yellow;
      }
    }
    .title {
      font-size: $font-size-default;
      line-height: 1.5;
      width: 90%;
      max-width: 90%;
      &:hover {
        border-color: $light-black;
        background-color: $bg-yellow;
      }
    }
    .answers {
      list-style: none;
      padding: 0;
      line-height: 2;
      font-size: $font-size-sm;
      color: $light-black;
      margin-top: .4rem;
      .answer {
        display: flex;
        align-items: flex-start;
        input {
          margin-top: .6rem;
          margin-right: .5rem;
        }
        .option {
          display: inline-block;
          width: 90%;
          max-width: 90%;
          font-size: $font-size-xs;
          position: relative;
          .option-panel {
            padding: 0;
            position: absolute;
            z-index: 999;
            top: 0;
            right: 0;
            font-size: $font-size-default;
            margin-top: -2.2rem;
            visibility: hidden;
            // opacity: 0;
            &.active {
              visibility: visible;
              // opacity: 1;
            }
            .iconfont {
              list-style: none;
              float: left;
              margin-left: .5rem;
              line-height: 1.5;
              &:hover {
                color: $blue;
              }
            }
          }
        }
      }
    }
    .add-option {
      margin-top: 1rem;
      font-size: $font-size-default;
      cursor: pointer;
      color: $gray;
      display: inline-block;
      line-height: 2;
      text-align: center;
      border-radius: .4rem;
      visibility: hidden;
      &:hover {
        color: $blue;
      }
      .iconfont {
        margin-right: .6rem;
      }
    }
    .option {
      .textarea {
        width: 85%;
        height: 10rem;
        margin-top: .8rem;
        border: 1px solid $light-black;
      }
      [for="isRequired"] {
        margin-top: 1rem;
        display: block;
        .required {
          margin-right: .4rem;
        }
      }
    }
  }
}
</style>
