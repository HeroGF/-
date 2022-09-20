<template>
  <van-picker
    title="更新性别"
    show-toolbar
    :default-index="value"
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
  />
</template>

<script>
import { updateUserProfileAPI } from '@/api'
export default {
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm(value, index) {
      await updateUserProfileAPI({
        gender: index
      })
      this.$emit('input', index)
      this.$emit('close')
    }
  }
}
</script>

<style></style>
