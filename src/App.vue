<template>
  <input-box></input-box>
  <list></list>
</template>

<script>
  import InputBox from './components/Input'
  import List from './components/List'
  import store from './vuex/store'

  export default {
    store: store,
    components: {
      InputBox,
      List
    }
  }
</script>
