<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 信息修改 -->

    <!-- 更新头像 -->
    <!-- document.qs('xx').click() -->
    <input
      type="file"
      hidden
      ref="file"
      accept=".png,.pdf,.jpg"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.7rem" height="0.7rem" :src="avator" />
    </van-cell>

    <!-- 更新头像的弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avator
        v-if="isShowPhoto"
        :avator.sync="avator"
        :photo="photo"
      ></update-avator>
    </van-popup>

    <!-- 昵称 -->
    <van-cell title="昵称" is-link @click="isShowNickName = true">
      {{ userinfo.name }}
    </van-cell>
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isShowNickName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateNickName
        v-if="isShowNickName"
        v-model="userinfo.name"
        @close="isShowNickName = false"
      />
    </van-popup>

    <!-- 性别 -->
    <van-cell title="性别" is-link @click="isShowSex = true">
      {{ userinfo.gender ? '女' : '男' }}
    </van-cell>
    <!-- 性别弹出层 -->
    <van-popup v-model="isShowSex" position="bottom" :style="{ height: '50%' }">
      <UpdateSex
        v-if="isShowSex"
        v-model="userinfo.gender"
        @close="isShowSex = false"
      />
    </van-popup>

    <!-- 生日 -->
    <van-cell title="生日" is-link @click="isShowBirthday = true">
      {{ userinfo.birthday }}
    </van-cell>
    <!-- 生日弹出层 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <UpdateBirthday
        v-if="isShowBirthday"
        v-model="userinfo.birthday"
        @close="isShowBirthday = false"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateAvator from './components/UpdateAvator.vue'
import UpdateNickName from './components/UpdateNickName.vue'
import UpdateSex from './components/UpdateSex.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import { resolveToBase64 } from '@/utils'
import { getUserProfileAPI } from '@/api'
export default {
  components: { UpdateAvator, UpdateNickName, UpdateSex, UpdateBirthday },
  data() {
    return {
      isShowPhoto: false,
      photo: '',
      avator: '',
      isShowNickName: false,
      isShowSex: false,
      isShowBirthday: false,
      userinfo: {}
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    async selectPhoto() {
      // 获取到用户选择的图片的file对象
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBase64(file)
      this.photo = base64
      this.isShowPhoto = true

      // 解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    },
    async getUserProfile() {
      try {
        const { data } = await getUserProfileAPI()
        this.userinfo = data.data
      } catch (error) {
        if (error.response.status === 401) {
          this.$toast('用户未认证')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
