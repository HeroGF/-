<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <van-field
      v-model="localname"
      rows="2"
      autosize
      type="textarea"
      maxlength="11"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      localname: ''
    }
  },
  created() {
    this.localname = this.value
  },
  methods: {
    async onClickRight() {
      await updateUserProfileAPI({
        name: this.localname
      })
      this.$emit('input', this.localname)
      this.$emit('close')
    }
  }
}
</script>

<style></style>
