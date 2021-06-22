<template>
  <div class="users-index">
    <h1>This is the users Index</h1>
    <ul class="list">
      <li class="card" v-for="user in users" v-bind:key="user.id">
        <router-link :to="`/users/${user.id}`">
          <img class="profile" :src="user.image" alt="profile picture" />
        </router-link>
        <h3>{{ user.username }}</h3>
        <p>{{ user.name }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.profile {
  width: 75px;
}

.card {
  border: 1px solid black;
  width: 45%;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      users: [],
    };
  },
  created: function () {
    axios.get("/users").then((response) => {
      this.users = response.data;
      console.log(this.users);
    });
  },
};
</script>
