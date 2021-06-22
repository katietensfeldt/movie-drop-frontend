<template>
  <div class="friends-index">
    <h2>My Friends</h2>
    <div v-for="friend in friends" v-bind:key="friend.id">
      <img :src="friend.image" alt="" />
      <p>{{ friend.username }}</p>
    </div>
    <h2>Pending friendships</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      friends: [],
    };
  },
  created: function () {
    axios.get("/friendships").then((response) => {
      this.friends = response.data;
      console.log(response.data);
    });
  },
};
</script>
