<template lang="html">
  <!-- 问卷列表开始 -->
  <div class="wrap">
    <h3 class="title">我的问卷</h3>
    <table class="table">
      <tbody>
        <tr>
          <td><span class="iconfont">&#xe610;</span></td>
          <td><a class="name" href="#">问卷名称</a></td>
          <td><time class="time">2016-12-31 33:33</time></td>
          <td><span class="status">已发布</span></td>
          <td>
            <div class="tools">
              <span class="iconfont">&#xe60d;</span>
              <span class="btn">编辑</span>
              <span class="btn">查看问卷</span>
            </div>
          </td>
        </tr>
        <tr>
          <td><span class="iconfont">&#xe610;</span></td>
          <td><a class="name" href="#">问卷名称</a></td>
          <td><time class="time">2016-12-31 33:33</time></td>
          <td><span class="status">已发布</span></td>
          <td>
            <div class="tools">
              <span class="iconfont">&#xe60d;</span>
              <span class="btn">编辑</span>
              <span class="btn">查看问卷</span>
            </div>
          </td>
        </tr>
        <tr>
          <td><span class="iconfont">&#xe610;</span></td>
          <td><a class="name" href="#">问卷名称</a></td>
          <td><time class="time">2016-12-31 33:33</time></td>
          <td><span class="status">已发布</span></td>
          <td>
            <div class="tools">
              <span class="iconfont">&#xe60d;</span>
              <span class="btn">编辑</span>
              <span class="btn">查看问卷</span>
            </div>
          </td>
        </tr>
        <tr>
          <td><span class="iconfont">&#xe610;</span></td>
          <td><a class="name" href="#">问卷名称</a></td>
          <td><time class="time">2016-12-31 33:33</time></td>
          <td><span class="status">已发布</span></td>
          <td>
            <div class="tools">
              <span class="iconfont">&#xe60d;</span>
              <span class="btn">编辑</span>
              <span class="btn">查看问卷</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 问卷列表结束 -->
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/base";
@import "../../scss/helpers/mixins";
.wrap {
  overflow: hidden;
  padding: 0 6rem;
  @at-root .title {
    font-size: $font-size-lg;
    font-weight: normal;
    color: $black;
  }
  .table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 4rem;
    font-size: $font-size-default;
    tbody {
      tr:last-child {
        border-bottom: 1px solid $line-color;
      }
      td {
        border-top: 1px solid $line-color;
        height: 6rem;
        font-size: $font-size-sm;
        @at-root {
          .iconfont {
            cursor: pointer;
            color: $blue;
            font-size: $font-size-default;
          }
          .btn {
            @include button(1rem, .5rem, $blue);
          }
          .iconfont,
          .btn {
            margin-left: 1rem;
          }
        }
      }
    }
  }
}

</style>
