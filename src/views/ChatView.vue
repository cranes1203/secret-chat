<template>
  <div class="chatView">
    <div class="chatDiv">
      <div class="asdad">
        <div class="userChat" v-for="i in messages" :key="i">
          <div class="username">{{ i.name }}</div>
          <div class="message">{{ i.message }}</div>
          <div class="time">{{ i.created_at }}</div>
        </div>
      </div>
    </div>

    <div class="flex items-center px-3 py-2 rounded-lg">
      <input
        v-model="sendMsg"
        v-on:keyup.enter="sending"
        id="chat"
        class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your message..."
      />
      <button
        type="submit"
        @click="sending"
        class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
      >
        <svg
          aria-hidden="true"
          class="w-6 h-6 rotate-90"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          ></path>
        </svg>
        <span class="sr-only">Send message</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sendMsg: "",
    };
  },
  watch: {
    roomId() {
      this.joins();
      this.messages = [];
    },
  },
  mounted() {
    this.joins();
  },
  methods: {
    sending() {
      if (this.sendMsg) {
        this.$store.commit("sendChat", this.sendMsg);
      }
      this.sendMsg = "";
    },
    joins() {
      this.$store.commit("joinRoom", this.roomId);
    },
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
  },
};
</script>
<style scoped>
.chatView {
  display: grid;
  align-content: space-between;
  max-height: 90%;
  height: 90%;
}
.chatDiv {
  max-height: 74vh;
  overflow-y: scroll;
  /* max-height: 100%; */
}
.asdad {
  display: grid;
  text-align: center;
  justify-content: center;
}
.userChat {
  box-shadow: 0px 0px 5px rgb(234, 225, 225);
  border-radius: 0.25rem;
  width: 50%;
  min-width: 200px;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
}
.username {
  text-align: left;
  font-weight: 500;
}
.message {
  border: 0.5px solid #ccc;
  border-radius: 0.25rem;
  font-size: 11px;
}
.time {
  text-align: right;
  font-size: 12px;
}
</style>
