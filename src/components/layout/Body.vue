<template lang="html">
  <div class="container">
    <div class="sidebar">
      <h3 class="title">Mertens Liu</h3>
      <div class="panel-wrap">
        <ul class="panel">
          <li v-for="item in routeItems">
            <a
              class="link"
              v-link="item.link">
              <span class="iconfont">{{{ item.icon }}}</span>{{item.text}}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="content" id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routeItems: [
        {
          link: {
            path: '/questionare',
            activeClass: 'is-crt'
          },
          icon: '&#xe61c;',
          text: '我的问卷'
        },
        {
          link: {
            path: '/new-home/',
            activeClass: 'is-crt'
          },
          icon: '&#xe60f;',
          text: '新建问卷'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/base";
@import "../../scss/helpers/mixins";

.container {
  position: relative;
  height: 100%;
  padding-left: 24rem;
  .sidebar {
    background: $light-black;
    @include size(24rem, 100%);
    @include absolute-top-left;
    .title {
      color: $light-gray;
      font-size: $font-size-xxl;
      text-align: center;
      color: #fff;
      margin: 6rem 0;
      letter-spacing: .2rem;
    }
    .panel-wrap {
      @at-root .panel {
        list-style: none;
        padding: 0;
        .link {
          display: flex;
          align-items: center;
          color: $light-gray;
          height: 6rem;
          line-height: 6rem;
          font-size: $font-size-sm;
          text-decoration: none;
          vertical-align: middle;
          padding-left: 2.8rem;
          border-left: .2rem solid $light-black;
          &:hover,
          &.is-crt {
            border-left-color: $blue;
            color: $blue;
          }
          .iconfont {
            font-size: 2.4rem;
            margin-right: 1.6rem;
          }
        }
      }
    }
  }
  .content {
    height: 100%;
  }
}
</style>
