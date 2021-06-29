<template>
  <div class="friends-index">
    <h2>My Friends</h2>
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
    <div v-for="friendship in approvedFriendships" v-bind:key="friendship.recipient.id">
      <div v-if="friendship.sender.id == $parent.getUserId()">
        <img :src="friendship.recipient.image" alt="" />
        <p>{{ friendship.recipient.username }}</p>
      </div>
      <div v-else>
        <img :src="friendship.sender.image" alt="" />
        <p>{{ friendship.sender.username }}</p>
      </div>
      <button v-on:click="deleteFriendship(friendship.id)">Unfriend</button>

      <br />
    </div>
    <h2>Pending friendships</h2>
    <div v-for="friendship in pendingFriendships" v-bind:key="friendship.id">
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
      <p v-else>Request awaiting approval</p>
      <button v-on:click="deleteFriendship(friendship.id)">Delete</button>
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
    approveFriendship: function (friendshipId) {
      this.editFriendshipParams.confirmed = true;
      axios
        .patch(`/friendships/${friendshipId}`, this.editFriendshipParams)
        .then((response) => {
          this.approvedFriendships.push(response.data);
          for (var i = 0; i < this.pendingFriendships.length; i++) {
            if (this.pendingFriendships[i].id == friendshipId) {
              this.pendingFriendships.splice(i, 1);
              i--;
            }
          }
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
    deleteFriendship: function (friendshipId) {
      if (confirm("Are you sure you want to proceed? This action cannot be reversed.")) {
        axios
          .delete(`/friendships/${friendshipId}`)
          .then((response) => {
            for (var k = 0; k < this.approvedFriendships.length; k++) {
              if (this.approvedFriendships[k].id == friendshipId) {
                this.approvedFriendships.splice(k, 1);
                k--;
              }
            }
            for (var j = 0; j < this.pendingFriendships.length; j++) {
              if (this.pendingFriendships[j].id == friendshipId) {
                this.pendingFriendships.splice(j, 1);
                j--;
              }
            }
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
