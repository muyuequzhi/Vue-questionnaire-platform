<template lang="html">
  <header class="header">
    <div class="title-wrap">
      <span class="logo"></span>
      <h1 class="title">{{ msg }}</h1>
    </div>
    <div class="home">
      <a class="link" href="#"><span class="iconfont">&#xe600;</span>HOME</a>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      msg: '微型问卷调查平台'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/base";
@import "../../scss/helpers/mixins";
.header {
  @include absolute-top-left;
  width: 100%;
}
.title-wrap {
  background-color: $black;
  color: $light-gray;
  @include size(24rem, 6rem);
  @include child-center;
  .logo {
    @include square(2rem);
    margin-right: 1rem;
    background: url(../../assets/logo.png) 0 0 / cover;
  }
  .title {
    font-size: $font-size-xl;
    margin: 0;
  }
}
.home {
  position: absolute;
  top: 50%;
  right: 6rem;
  transform: translateY(-50%);
  display: table;
  .link {
    text-decoration: none;
    font-size: $font-size-default;
    color: $blue;
    .iconfont {
      margin-right: .5rem;
      font-size: $font-size-xxl;
    }
  }
}
</style>
