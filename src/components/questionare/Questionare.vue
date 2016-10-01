<template lang="html">
  <!-- 问卷列表开始 -->
  <div class="wrap">
    <h3 class="title">我的问卷</h3>
    <table class="table" v-if="qnData.length !== 0">
      <thead>
        <th></th>
        <th>问卷名</th>
        <th>结束时间</th>
        <th>状态</th>
        <td></td>
      </thead>
      <tbody>
        <tr v-for="qn in qnData">
          <td><span
            @click="toggleSelected($index)"
            class="iconfont">{{{ inArray(this.qnSelected, qnData[$index].qnId) ? selectedHTML : unSelectedHTML }}}</span></td>
          <td>{{qn.title}}</td>
          <td><time class="time" :class="filterClass(qn)">{{qn.expires}}</time></td>
          <td><span class="status" :class="filterClass(qn)">{{ judgeStatus(qn) }}</span></td>
          <td>
            <div class="tools">
              <span
                @click="deleteBtnClickHandler($index)"
                class="iconfont delete">&#xe60d;</span>
              <span class="btn" @click="editQn($index)">编辑</span>
              <span class="btn">{{ qn.public ? '查看数据' : '发布问卷' }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn-group" v-if="qnData.length !== 0">
      <button class="btn" @click="selectAll">{{ isSelectAll ? '全选' : '全不选' }}</button>
      <button class="btn" @click="deleteSelectedBtnHandler">删除</button>
    </div>
    <p v-else>您还没有添加问卷~~</p>
    <modal
      :show.sync="showDeleteModal"
      cancel-text="取消"
      ok-text="确定"
      :callback="deleteQnModalHandler"
      title="提示" >
      <div slot="modal-body">
        <p>你确定要删除 <span :style="{ color: '#999' }">{{qnTitleIfDelete}}</span> 这份问卷吗？</p>
      </div>
    </modal>
    <modal
      :show.sync="showDeleteSelected"
      cancel-text="取消"
      ok-text="确定"
      :callback="deleteSelectedHandler"
      title="提示" >
      <div slot="modal-body">
        <p>你确定要删除这 <span :style="{ color: '#999' }">{{qnSelected.length}}</span> 份问卷吗？</p>
      </div>
    </modal>
  </div>
  <!-- 问卷列表结束 -->
</template>

<script>
import Modal from '../common/Modal'
export default {
  data () {
    return {
      qnData: this.getQnData(),
      unSelectedHTML: '&#xe647;',
      selectedHTML: '&#xe649;',
      qnSelected: [],
      showDeleteModal: false,
      qnTitleIfDelete: '',
      qnIdIfDelete: -1,
      showDeleteSelected: false
    }
  },
  computed: {
    isSelectAll () {
      return this.qnSelected.length !== this.qnData.length
    }
  },
  components: {
    Modal
  },
  methods: {
    getQnData () {
      return window.localStorage.getItem('pf-all-qn') ? JSON.parse(window.localStorage.getItem('pf-all-qn')) : []
    },
    inArray (arr, val) {
      return arr.some(item => item === val)
    },
    addSelected (qnId) {
      this.qnSelected.push(Number(qnId))
    },
    deleteSelected (qnId) {
      this.qnSelected.some((item, itemIndex) => {
        if (item === qnId) {
          this.qnSelected.splice(itemIndex, 1)
          return true
        }
      })
    },
    toggleSelected (index) {
      let qnId = this.qnData[index].qnId
      if (this.inArray(this.qnSelected, qnId)) {
        this.deleteSelected(qnId)
      } else {
        this.addSelected(qnId)
      }
    },
    deleteQn (qnId) {
      let index = 0
      let len = this.qnData.length
      while (index < len) {
        if (this.qnData[index].qnId === qnId) {
          return this.qnData.splice(index, 1)
        }
        index++
      }
      this.qnData.splice(index, 1)
    },
    deleteBtnClickHandler (index) {
      this.showDeleteModal = true
      this.qnTitleIfDelete = this.qnData[index].title
      this.qnIdIfDelete = this.qnData[index].qnId
    },
    deleteQnModalHandler () {
      this.showDeleteModal = false
      this.deleteQn(this.qnIdIfDelete)
    },
    deleteSelectedBtnHandler () {
      if (this.qnSelected.length !== 0) {
        this.showDeleteSelected = true
      }
    },
    deleteSelectedHandler () {
      this.deleteAll()
    },
    selectAll () {
      if (this.qnSelected.length === this.qnData.length) {
        this.qnSelected = []
      } else {
        this.qnSelected = []
        let len = this.qnData.length
        let i = 0
        while (i < len) {
          this.qnSelected.push(this.qnData[i].qnId)
          i++
        }
      }
    },
    deleteAll () {
      this.qnSelected.forEach((qnId) => {
        this.deleteQn(qnId)
        this.showDeleteSelected = false
      })
    },
    editQn (index) {
      let data = this.qnData[index]
      window.localStorage.setItem('qn-editing', JSON.stringify(data))
      this.$route.router.go({ path: '/new-home/edit' })
    },
    judgeStatus (qn) {
      let qnExpires = new Date(qn.expires).getTime()
      if (qnExpires < new Date().getTime()) {
        return '已过期'
      } else if (qn.public) {
        return '已发布'
      }
      return '未发布'
    },
    filterClass (qn) {
      return {
        'overdue': this.judgeStatus(qn) === '已过期',
        'published': this.judgeStatus(qn) === '已发布',
        'unpublished': this.judgeStatus(qn) === '未发布'
      }
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
    margin-top: 2rem;
    font-size: $font-size-default;
    thead,
    tbody {
      tr {
        th,
        td {
          font-weight: normal;
          font-size: $font-size-sm;
          line-height: 3;
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4) {
            text-align: center;
            width: 20%;
            max-width: 20rem;
            padding: 0 1rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &:nth-child(5) {
            text-align: right;
          }
        }
      }
    }
    tbody {
      tr:last-child {
        border-bottom: 1px solid $line-color;
      }
      td {
        border-top: 1px solid $line-color;
        height: 6rem;
        font-size: $font-size-sm;
        & .overdue {
          color: #f15b29;
        },
        & .published {
          color: #99ba35;
        },
        & .unpublished {
          color: #b4b4b6;
        },
        &:nth-child(2) {
          color: $blue;
        }
        &:nth-child(3),
        &:nth-child(4) {
          color: $gray;
        }
        @at-root {
          .iconfont {
            cursor: pointer;
            color: $blue;
            font-size: $font-size-default;
          }
          .delete:hover {
            color: lighten($blue,20%);
          }
          .btn {
            @include button(1rem, .5rem, $blue);
            &:hover {
              background-color: lighten($blue, 20%);
            }
            &:active {
              background-color: $blue;
            }
          }
          .iconfont,
          .btn {
            margin-left: 1rem;
          }
        }
      }
    }
  }
  .btn-group {
    margin-top: 2rem;
    .btn {
      background-color: #fff;
      outline: none;
      border-radius: .4rem;
      border-color: $blue;
      padding: .2rem 1rem;
      color: $blue;
      &:hover {
        background-color: lighten($blue, 20%);
        color: #fff;
      }
      &:active {
        background-color: $blue;
      }
    }
  }
}
</style>
