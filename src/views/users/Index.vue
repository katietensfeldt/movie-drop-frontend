<template>
  <div class="users-index">
    <h1>Users</h1>
    <input type="text" v-model="userSearch" placeholder="Find user by username" />
    <ul class="list">
      <li
        class="card"
        v-for="user in filterBy(orderBy(users, 'username'), userSearch, 'username')"
        v-bind:key="user.id"
      >
        <div v-if="user.id != $parent.getUserId()">
          <router-link :to="`/users/${user.id}`">
            <img class="profile" :src="user.image" alt="profile picture" />
          </router-link>
          <h3>{{ user.username }}</h3>
          <p>{{ user.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      users: [],
      userSearch: "",
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
