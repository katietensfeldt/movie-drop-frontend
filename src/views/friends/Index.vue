<template>
  <div class="friends-index">
    <h2>My Friends</h2>
    <!-- Error handling if friendships cannot be changed or deleted -->
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>

    <!-- Friends -->
    <div v-for="friendship in approvedFriendships" v-bind:key="friendship.recipient.id">
      <div v-if="friendship.sender.id == $parent.getUserId()">
        <router-link :to="`/users/${friendship.recipient.id}`">
          <img :src="friendship.recipient.image" alt="Friend image" />
        </router-link>
        <p>{{ friendship.recipient.username }}</p>
      </div>
      <div v-else>
        <router-link :to="`/users/${friendship.sender.id}`">
          <img :src="friendship.sender.image" alt="Friend image" />
        </router-link>
        <p>{{ friendship.sender.username }}</p>
      </div>
      <button v-on:click="unfriend(friendship)">Unfriend</button>

      <br />
    </div>

    <!-- Pending friends -->
    <h2>Pending friendships</h2>
    <div v-for="friendship in pendingFriendships" v-bind:key="friendship.id">
      <div v-if="friendship.sender.id == $parent.getUserId()">
        <router-link :to="`/users/${friendship.recipient.id}`">
          <img :src="friendship.recipient.image" alt="Friend image" />
        </router-link>
        <p>{{ friendship.recipient.username }}</p>
      </div>
      <div v-else>
        <router-link :to="`/users/${friendship.sender.id}`">
          <img :src="friendship.sender.image" alt="Friend image" />
        </router-link>
        <p>{{ friendship.sender.username }}</p>
      </div>
      <button v-if="friendship.recipient.id == $parent.getUserId()" v-on:click="approveFriendship(friendship)">
        Accept
      </button>
      <p v-else>Request awaiting approval</p>
      <button v-on:click="deleteRequest(friendship)">Dismiss</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      friendships: [],
      pendingFriendships: [],
      approvedFriendships: [],
      editFriendshipParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/friendships").then((response) => {
      this.friendships = response.data;
      this.setFriendshipStatus();
      console.log(response.data);
    });
  },
  methods: {
    setFriendshipStatus: function () {
      this.friendships.forEach((friendship) => {
        if (friendship.confirmed) {
          this.approvedFriendships.push(friendship);
        } else {
          this.pendingFriendships.push(friendship);
        }
      });
    },
    approveFriendship: function (friendship) {
      this.editFriendshipParams.confirmed = true;
      axios
        .patch(`/friendships/${friendship.id}`, this.editFriendshipParams)
        .then((response) => {
          this.approvedFriendships.push(response.data);
          var index = this.pendingFriendships.indexOf(friendship);
          this.pendingFriendships.splice(index, 1);
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
    deleteRequest: function (friendship) {
      if (confirm("Are you sure you want to proceed? This action cannot be reversed.")) {
        axios
          .delete(`/friendships/${friendship.id}`)
          .then((response) => {
            var index = this.pendingFriendships.indexOf(friendship);
            this.pendingFriendships.splice(index, 1);
            console.log(response.data);
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
    unfriend: function (friendship) {
      if (confirm("Are you sure you want to proceed? This action cannot be reversed.")) {
        axios
          .delete(`/friendships/${friendship.id}`)
          .then((response) => {
            var index = this.approvedFriendships.indexOf(friendship);
            this.approvedFriendships.splice(index, 1);
            console.log(response.data);
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>
