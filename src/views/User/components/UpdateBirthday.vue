<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="confirm"
  />
</template>

<script>
import { updateUserProfileAPI } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async confirm() {
      await updateUserProfileAPI({
        birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
      })
      this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
      this.$emit('close')
    }
  }
}
</script>

<style></style>
