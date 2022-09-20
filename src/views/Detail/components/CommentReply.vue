<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      class="navbar"
      :title="
        this.currentItem.reply_count
          ? `${this.currentItem.reply_count}条回复`
          : `暂无回复`
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('changePop', false)" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="main">
      <PopReply :list="currentItem" />
      <van-cell title="全部回复"></van-cell>
      <ReplyList :currentItem="currentItem" :commentItem="commentItem" />
    </div>
    <!-- 回复评论底部区域 -->
    <div class="post-warp">
      <van-button round @click="isReplyComment = true">评论</van-button>
    </div>
    <van-popup v-model="isReplyComment" position="bottom">
      <PostReply
        :currentItem="currentItem"
        @close="isReplyComment = $event"
        @postinfo="commentItem = $event"
        :list="list"
      />
    </van-popup>
  </div>
</template>

<script>
import ReplyList from './ReplyList.vue'
import PostReply from './PostReply.vue'
import PopReply from './PopReply.vue'
export default {
  name: 'commentreply',
  data() {
    return {
      isReplyComment: false,
      commentItem: {},
      list: []
    }
  },
  props: {
    currentItem: {
      type: [Array, Object],
      required: true
    }
  },
  components: { PostReply, ReplyList, PopReply },
  created() {},
  methods: {}
}
</script>

<style scoped lang="less">
.main {
  height: calc(100vh - 46px - 51px);
  overflow: auto;
}
.post-warp {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff69b4;
  .van-button {
    width: 640px;
    height: 80px;
  }
}
</style>
