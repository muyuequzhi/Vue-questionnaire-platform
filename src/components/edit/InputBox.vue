<template lang="html">
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
        class="option-panel">
        <li class="iconfont">&#xe63e;</li>
        <li class="iconfont">&#xe63f;</li>
        <li
          @click="deleteOption(qIndex, $index)"
          class="iconfont">&#xe646;</li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="css">
</style>
