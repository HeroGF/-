<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="article.length">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ fromnow }}
          </div>
          <!-- 关注模块 -->
          <FollowUser v-model="article.is_followed" :aut_id="article.aut_id" />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 评论列表 -->
      <ArticleComment
        :commentItem="commentItem"
        @commentList="commentItem = $event"
      />
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        @click="isPostShow = true"
        class="comment-btn"
        type="default"
        round
        size="small"
        >写评论</van-button
      >
      <!-- 发布评论弹出层 -->
      <van-popup v-model="isPostShow" position="bottom">
        <PostComment
          v-model="article.art_id"
          @successsComment="successsComment"
        />
      </van-popup>

      <van-icon name="comment-o" :info="article.comm_count" color="#777" />
      <!-- 收藏模块 -->
      <!-- <van-icon color="#ffa500" name="star" /> -->
      <CollectArticle
        v-model="article.is_collected"
        :articleId="article.art_id"
      />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 评论回复 -->
    <van-popup v-model="isShowReply" position="bottom" style="height: 100%">
      <CommentReply
        v-if="isShowReply"
        :currentItem="currentItem"
        @changePop="isShowReply = $event"
      />
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import FollowUser from './components/FollowUser.vue'
import CollectArticle from './components/CollectArticle.vue'
import PostComment from './components/PostComment.vue'
import ArticleComment from './components/ArticleComment.vue'

import CommentReply from './components/CommentReply.vue'

import { getArticleDetailAPI } from '@/api'
export default {
  name: 'detail',
  data() {
    return {
      article: {},
      isPostShow: false,
      commentItem: [],
      isShowReply: false,
      currentItem: []
    }
  },
  props: {
    articleId: {
      type: [String, Number],
      require: true
    }
  },
  components: {
    FollowUser,
    CollectArticle,
    PostComment,
    ArticleComment,
    CommentReply
  },
  computed: {
    fromnow() {
      return dayjs(this.article.pubdate).fromNow()
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    async getArticleDetail() {
      try {
        const { data } = await getArticleDetailAPI(this.articleId)
        this.article = data.data
      } catch (error) {
        console.dir(error)
      }
    },
    successsComment(data) {
      console.log(data)
      // this.commentItem = data.data.new_obj
      this.commentItem.unshift(data.data.new_obj)
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
@import './style/github-markdown.css';
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.page-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
}

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
