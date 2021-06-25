<template>
  <div class="friends-index">
    <h2>My Friends</h2>
    <div v-for="friendship in friendships" v-bind:key="friendship.recipient.id">
      <div v-if="friendship.confirmed">
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
        <button v-if="friendship.recipient.id == $parent.getUserId()" v-on:click="approveFriendship(friendship.id)">
          Approve
        </button>
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
      editFriendshipParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/friendships").then((response) => {
      this.friendships = response.data;
      console.log(response.data);
    });
  },
  methods: {
    approveFriendship: function (friendshipId) {
      this.editFriendshipParams.confirmed = true;
      axios
        .patch(`/friendships/${friendshipId}`, this.editFriendshipParams)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
      console.log("changing friendship status");
    },
  },
};
</script>
