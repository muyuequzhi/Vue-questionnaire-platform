<template>
  <from>
    <input type="text">
    <button @click="addTodo(1)">ADD</button>
  </from>
</template>

<script>
  import { addTodo } from '../vuex/actions'

  export default {
    vuex: {
      actions: {
        addTodo: addTodo
      }
    }
  }
</script>
