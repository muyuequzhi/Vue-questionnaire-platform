<template lang="html">
  <ul>
    <li v-for="todo in todos">{{ todo.text }}</li>
  </ul>
</template>

<script>
export default {
  vuex: {
    getters: {
      todos: state => state.demo.todos
    }
  }
}
</script>
