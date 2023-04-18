<template>
  <div class="grid grid-cols-2">
    <div v-for="i in roomList" :key="i" @click="enterRoom(i)">
      {{ i }}
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomList: [],
      createRoom: "",
    };
  },
  async mounted() {},
  methods: {
    enterRoom(i) {
      this.$router.push(`/chat/${i}`);
    },
    createdRoom() {
      this.$router.push(`/chat/${this.createRoom}`);
    },
  },
  computed: {
    socket() {
      return this.$store.state.socket;
    },
  },
};
</script>
<style lang=""></style>
