<template>
  <div class="users-show">
    <!-- If edit button is clicked, page enters in to 'editMode', which will display text boxes to edit information -->
    <div v-if="!editMode">
      <img :src="user.image" alt="User image" />
      <h2>{{ user.username }}</h2>
      <p>{{ user.name }}</p>

      <!-- Will show edit and delete buttons only if user is viewing their own profile -->
      <span v-if="$parent.getUserId() == user.id">
        <button v-on:click="showEditUser">Edit user</button>
        <button v-on:click="destroyUser">Delete Profile</button>
      </span>
    </div>
    <!-- When user enters show page, automatically, it is NOT in 'editMode'. Page will display user information -->
    <div v-else>
      <h2>Edit Profile</h2>
      <!-- Error handling -->
      <ul>
        <li class="error" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <form v-on:submit.prevent="editUser()">
        <label>
          Username:
          <input type="text" v-model="editUserParams.username" />
        </label>
        <br />
        <label>
          Name:
          <input type="text" v-model="editUserParams.name" />
        </label>
        <br />
        <label>
          Profile Picture:
          <input type="text" v-model="editUserParams.image" />
        </label>
        <br />
        <label>
          Email address:
          <input type="text" v-model="editUserParams.email" />
        </label>
        <br />
        <input type="submit" value="Save Changes" />
        <button v-on:click="editMode = false">Cancel</button>
      </form>
    </div>

    <div v-if="pending">
      <p>Friend request pending</p>
    </div>

    <!-- section for adding friends/ removing friends -->
    <div v-else-if="isFriend()">
      <button v-on:click="addFriend()">Add Friend</button>
    </div>

    <!-- Current user and friends may view suggestions -->
    <div v-if="user.id == $parent.getUserId() || friendIds.includes(Number($parent.getUserId()))">
      <h3>Movie Suggestions</h3>
      <div v-for="suggestion in suggestions" v-bind:key="suggestion.id">
        <img :src="suggestion.movie.Poster" alt="movie poster" />
        <p>Suggested by: {{ suggestion.sender.username }} | Watched Status: {{ suggestion.watched }}</p>
      </div>
    </div>

    <!-- Only current user may view friends -->
    <div v-if="user.id == $parent.getUserId()" class="friend-list">
      <h3>Friend list</h3>
      <div v-for="friend in friends" v-bind:key="friend.id">
        <img class="friend-profile" :src="friend.image" alt="" />
        <p>{{ friend.username }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friend-profile {
  width: 50px;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      friends: {},
      pending: false,
      friendIds: [],
      suggestions: {},
      editMode: false,
      editUserParams: {},
      errors: [],
      newFriendParams: {},
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
      this.friends = response.data.friends;
      this.suggestions = response.data.suggestions;
      this.friends.forEach((friend) => {
        this.friendIds.push(friend.id);
      });
      this.isFriendshipPending();
    });
  },
  methods: {
    showEditUser: function () {
      this.editMode = true;
      this.editUserParams = this.user;
    },
    editUser: function () {
      axios
        .patch(`/users/${this.$route.params.id}`, this.editUserParams)
        .then(() => {
          this.editMode = false;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function () {
      if (confirm("Are you sure you want to delete your profile? This action cannot be reversed.")) {
        axios
          .delete(`/users/${this.$route.params.id}`)
          .then(() => {
            this.$router.push("/logout");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
    addFriend: function () {
      this.newFriendParams.recipient_id = this.user.id;
      axios
        .post("/friendships", this.newFriendParams)
        .then(() => {
          this.$router.push("/friends");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    isFriendshipPending: function () {
      axios.get("/friendships").then((response) => {
        response.data.forEach((friendship) => {
          if (!friendship.confirmed) {
            if (this.user.id != this.$parent.getUserId()) {
              if (friendship.recipient.id == this.user.id || friendship.sender.id == this.user.id) {
                this.pending = true;
              }
            }
          }
        });
      });
    },
    isFriend: function () {
      // if the user who's profile is being viewed does not have the current user as a friend
      if (this.$parent.getUserId() == this.user.id) {
        return false;
      } else if (!this.friendIds.includes(Number(this.$parent.getUserId()))) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
