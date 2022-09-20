<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id" :title="1">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | relativeTime
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'

import { getCommentsAPI } from '@/api'

import { mapMutations } from 'vuex'
export default {
  name: 'replayList',
  props: {
    currentItem: {
      type: [Array, Object],
      default: () => []
    },
    commentItem: {
      type: Object,
      default: () => ({})
    }
  },

  filters: {
    relativeTime: function (value) {
      return dayjs(value).fromNow()
    }
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      isShowReply: false
    }
  },
  // watch: {
  //   list() {
  //     return this.list.push(this.commentItem.data.new_obj)
  //   }
  // },
  methods: {
    ...mapMutations(['SET_LIST']),
    async onLoad() {
      const { data } = await getCommentsAPI({
        type: 'c',
        source: this.currentItem.com_id,
        offset: this.offset,
        limit: 10
      })
      console.log(data)
      this.list.push(...data.data.results)
      this.$emit('commentList', this.list)
      this.SET_LIST(this.list)

      this.$parent.list = this.list

      // 将加载更多的 loading 设置为 false
      this.loading = false
      if (data.data.results.length) {
        this.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，关闭加载更多
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 90px;
}
</style>
