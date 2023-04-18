import { createStore } from "vuex";
import router from "../router";
import io from "socket.io-client";
let socket = io(`http://192.168.0.5:3000`, {
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

export default createStore({
  state: {
    user: {},
    login: false,
    roomList: [],
    messages: [],
    token: localStorage.getItem("token"),
  },
  getters: {},
  mutations: {
    async login(state, payload) {
      let users = {
        email: payload.email,
        password: payload.password,
      };
      await fetch(`http://192.168.0.5:8000/api/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      })
        .then(async (data) => {
          let res = await data.json();
          console.log(res);
          if (res.status) {
            localStorage.setItem("token", res.token);
            // this.checkAuth();
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.error("로그인 오류", error); // 로그인 오류 시 처리할 로직 작성
        });
    },
    async checkAuth(state) {
      let token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        await fetch(`http://192.168.0.5:8000/api/auth/me`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async (data) => {
            let res = await data.json();
            state.user = res;
            state.login = true;
          })
          .catch(async (err) => {
            localStorage.removeItem('token');
             router.push("login");
            console.log(err);
          });
      } else {
        router.push("login");
      }
    },
    getRoom(state) {
      socket.emit("getRoomIds");
      socket.on("getRoom", (rooms) => {
        console.log("rooms", rooms);
        state.roomList = rooms;
      });
    },
    async joinRoom(state, roomId) {
      console.log("roomId", roomId);
      let bodyData = {
        "roomName": roomId
      }
      state.messages = [];
      let token = localStorage.getItem("token");
      await fetch(`http://192.168.0.5:8000/api/returnMsg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData)
      })
      .then(async (data) => {
        let res = await data.json();
        console.log('msgapi', res);
        state.messages = res;
      })
      .catch(async (err) => {
        console.log(err);
      });
      socket.off();
      socket.emit("getRoomIds");
      socket.on("getRoom", (rooms) => {
        console.log("rooms", rooms);
        state.roomList = rooms;
      });
      socket.emit("changeRoom", roomId);
      socket.on("chat", (msg) => {
        console.log(msg);
        state.messages.push(msg);
      });
    },
    sendChat(state, data) {
      socket.emit("chat", { message: data, token: state.token });
    },
  },
  actions: {},
  modules: {},
});
