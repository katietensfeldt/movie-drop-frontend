<template>
  <div class="friends-index">
    <h2>My Friends</h2>
    <div v-for="friendship in friendships" v-bind:key="friendship.recipient.id">
      <div v-if="friendship.confirmed">
        <!-- $parent.getUserId() still not working - currently displaying 'self' as friend -->
        <div v-if="friendship.sender.id == $parent.getUserId()">
          <img :src="friendship.recipient.image" alt="" />
          <p>{{ friendship.recipient.username }}</p>
        </div>
        <div v-else>
          <img :src="friendship.sender.image" alt="" />
          <p>{{ friendship.sender.username }}</p>
        </div>
      </div>
      <br />
    </div>
    <h2>Pending friendships</h2>
    <div v-for="friendship in friendships" v-bind:key="friendship.id">
      <div v-if="!friendship.confirmed">
        <div v-if="friendship.sender.id == $parent.getUserId()">
          <img :src="friendship.recipient.image" alt="" />
          <p>{{ friendship.recipient.username }}</p>
        </div>
        <div v-else>
          <img :src="friendship.sender.image" alt="" />
          <p>{{ friendship.sender.username }}</p>
        </div>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      friendships: [],
    };
  },
  created: function () {
    axios.get("/friendships").then((response) => {
      this.friendships = response.data;
      console.log(response.data);
    });
  },
};
</script>
