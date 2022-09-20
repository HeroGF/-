<template>
  <van-icon
    :color="value ? '#ffa500' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="collectFn"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api'
export default {
  props: {
    value: {
      type: Boolean,
      require: true
    },
    articleId: {
      type: [String, Number],
      require: true
    }
  },
  methods: {
    async collectFn() {
      if (this.value) {
        await delCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }

      this.$emit('input', !this.value)
    }
  }
}
</script>

<style></style>
