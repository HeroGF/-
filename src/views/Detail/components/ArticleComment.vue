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
            <van-button
              size="mini"
              type="default"
              @click="
                ;[($parent.isShowReply = true), ($parent.currentItem = item)]
              "
              >回复{{ item.reply_count }}</van-button
            >
            <!-- 评论回复 -->
            <!-- <van-popup
              v-model="isShowReply"
              closeable
              position="bottom"
              style="height: 100%"
            >
              <CommentReply />
            </van-popup> -->
            <!-- /评论回复 -->
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'

import { getCommentsAPI } from '@/api'
export default {
  name: 'ArticleComment',
  props: {
    commentItem: {
      type: Array,
      default: () => []
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

  methods: {
    async onLoad() {
      const { data } = await getCommentsAPI({
        type: 'a',
        source: this.$route.params.articleId,
        offset: this.offset,
        limit: 10
      })
      // console.log(data)
      this.list.push(...data.data.results)
      this.$emit('commentList', this.list)
      // this.list = data.data.results
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
  margin-bottom: 45px;
}
</style>
