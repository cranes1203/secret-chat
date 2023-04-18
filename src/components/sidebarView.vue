<template>
  <div>
    <aside
      id="default-sidebar"
      class="h-screen overflow-y-auto transition-transform"
      aria-label="Sidebar"
    >
      <div style="margin-top: 1rem">Room Add</div>
      <div class="py-2 createdRooms">
        <input v-model="createRoom" />
        <button @click="createdRoom">+</button>
      </div>
      <div class="h-full px-3 py-4 overflow-y-auto">
        <div class="py-1">RoomList</div>
        <hr class="py-1" />
        <ul class="space-y-2 font-medium">
          <li
            :class="[{ active: i == activeRoom }]"
            v-for="i in roomList"
            :key="i"
            @click="enterRoom(i)"
          >
            {{ i }}
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      createRoom: "",
      activeRoom: "",
      joinRoom: ""
    };
  },
  async mounted() {
    let url = window.location.href.split("/");
    this.joinRoom = url[url.length-1];
    this.$store.commit("getRoom");
  },
  methods: {
    enterRoom(i) {
      this.activeRoom = i;
      this.$store.commit("joinRoom", i);
      this.$router.push(`/chat/${i}`);
    },
    createdRoom() {
      this.$router.push(`/chat/${this.createRoom}`);
    },
  },
  computed: {
    roomList() {
      return this.$store.state.roomList;
    },
  },
};
</script>
<style scoped>
li.active {
  color: #4176e7;
}
aside {
  max-width: 200px;
  box-shadow: 0px -1px 5px rgb(234, 225, 225);
}
.createdRooms {
  display: flex;
  justify-content: center;
}
.createdRooms input {
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 0.5rem 0 0 0.5rem;
}
.createdRooms button {
  width: 25%;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 0.5rem 0.5rem 0;
}
</style>
