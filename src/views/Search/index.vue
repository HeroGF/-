<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.push('/')"
        @search="onSearch"
        @focus="isShowSearchResult = false"
      />
    </form>
    <!-- 搜索历史/建议/搜索结果 -->
    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
// class和style属性的特殊
//  - vue自动帮你把cLass和style合并到组件的根节点
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'

import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史：搜索框的值空
      // 搜索建议：搜索框有值，并且不渲染搜索结果
      // 搜索结果：触发搜索时 显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }

      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 把keywords关键词存起来
      // 1.用户手动敲回车 2.点击了搜索建议
      // 存储搜索历史
      // 去重
      if (keywords === '') return this.$toast('搜索内容不能为空')
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      // distinctHistories.filter((d) => d)
      this.SET_HISTORIES(distinctHistories)

      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
