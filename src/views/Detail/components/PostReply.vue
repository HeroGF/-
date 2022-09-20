<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="reply"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="addComment" :disabled="!reply.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import { addCommentsAPI } from '@/api'
export default {
  name: 'postreply',
  components: {},
  props: {
    currentItem: {
      type: [Array, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      reply: ''
    }
  },
  methods: {
    ...mapMutations(['ADD_LISTITEM']),
    async addComment() {
      const { data } = await addCommentsAPI({
        target: this.currentItem.com_id,
        content: this.reply,
        art_id: this.$route.params.articleId
      })
      console.log(data)
      // this.$parent.commentItem = data
      this.$emit('postinfo', data)
      this.$emit('close', false)
      // this.ADD_LISTITEM(data.data.new_obj)

      this.list.unshift(data.data.new_obj)
      this.reply = ''
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
