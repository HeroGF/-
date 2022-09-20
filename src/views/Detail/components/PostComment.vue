<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="comment"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="addComment" :disabled="!comment.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentsAPI } from '@/api'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      comment: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async addComment() {
      const { data } = await addCommentsAPI({
        target: this.value,
        content: this.comment
      })
      // console.log(data)
      this.$emit('successsComment', data)
      this.comment = ''
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
