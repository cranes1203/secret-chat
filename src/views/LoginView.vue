<template>
  <div class="grid gap-6 mb-6 md:grid-cols-1 loginView">
    <div>
      <label
        for="Eamil"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Email</label
      >
      <input
        type="email"
        id="first_name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Email"
        v-model="email"
        required
      />
    </div>
    <div>
      <label
        for="Eamil"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label
      >
      <input
        type="password"
        id="first_name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="password"
        v-model="password"
        required
      />
    </div>
    <div>
      <button
        @click="login()"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let userData = {
        email: this.email,
        password: this.password,
      };
      console.log(userData);
      this.$store.commit("login", userData);
    },
  },
  mounted() {
    if (this.$store.state.login) {
      this.$router.push("/");
    }
  },
};
</script>
<style scoped>
.loginView {
  /* max-width: 400px; */
  width: 100%;
  justify-content: center;
  /* padding: 5rem; */
}
</style>
