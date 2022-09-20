<template>
  <van-button
    v-if="!value"
    @click="followingFn"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    >关注</van-button
  >
  <van-button v-else @click="followingFn" class="follow-btn" round size="small"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, delFollow } from '@/api'
export default {
  name: 'followuser',
  data() {
    return {
      // isfollowing: this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    aut_id: {
      type: String,
      require: true
    }
  },
  methods: {
    async followingFn() {
      if (this.value) {
        // 如果关注了就取消
        await delFollow(this.aut_id)
      } else {
        // 没关注就关注
        await addFollow(this.aut_id)
      }
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style></style>
