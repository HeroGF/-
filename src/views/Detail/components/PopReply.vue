<template>
  <!-- 评论列表 -->
  <div>
    <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        :src="list.aut_photo"
      />
      <span style="color: #466b9d" slot="title">{{ list.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636">{{ list.content }}</p>
        <p>
          <span style="margin-right: 10px">{{
            list.pubdate | relativeTime
          }}</span>
          <van-button
            size="mini"
            type="default"
            @click="$parent.isShowReply = true"
            >回复</van-button
          >
        </p>
      </div>
      <van-icon slot="right-icon" name="like-o" />
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'

export default {
  name: 'PopReply',
  props: {
    list: {
      type: [Array, Object],
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
      isShowReply: false
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
