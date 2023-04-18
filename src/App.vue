<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap items-center justify-between mx-auto p-3">
      <div href="https://flowbite.com/" class="flex items-center">
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Secret Chat</span
        >
      </div>
      <div v-if="login" @click="logout()">{{ this.$store.state.user.name }}</div>
    </div>
  </nav>
  <div class="grid grid-cols-4" v-if="login">
    <div class="col-span-1">
      <sideBarView />
    </div>
    <div class="col-span-3 p-3"><router-view /></div>
  </div>
  <div v-else class="mt-4">
    <router-view />
  </div>
</template>
<script>
import sideBarView from "./components/sidebarView.vue";
export default {
  components: {
    sideBarView,
  },
  data() {
    return {};
  },
  async created() {
    await this.$store.commit("checkAuth");
    console.log(this.$store.state.login, "asdasd");
  },
  computed: {
    login() {
      return this.$store.state.login;
    },
  },
  watch: {
    login() {
      // window.location.href = "/";
    },
  },
  methods: {
   logout() {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
  width: 100vw;
}

nav {
  /* padding: 30px; */
  /* margin-bottom: 2rem; */
  box-shadow: 0px -1px 5px rgb(208, 188, 188);
  z-index: 2;
  position: relative;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
