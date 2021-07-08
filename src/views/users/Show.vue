<template>
  <div class="users-show">
    <!-- MAIN USER INFO - viewable on all profile types -->
    <div v-if="!editMode">
      <img :src="user.image" alt="User image" />
      <h2>{{ user.username }}</h2>
      <p>{{ user.name }}</p>

      <!-- USER EDIT OR DELETE BUTTONS - current user only -->
      <span v-if="$parent.getUserId() == user.id">
        <button v-on:click="showEditUser">Edit user</button>
        <button v-on:click="destroyUser">Delete Profile</button>
      </span>
    </div>

    <!-- USER EDIT FORM -->
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
          <input type="text" v-model="user.username" />
        </label>
        <br />
        <label>
          Name:
          <input type="text" v-model="user.name" />
        </label>
        <br />
        <label>
          Profile Picture:
          <input type="file" v-on:change="setFile($event)" ref="fileInput" />
        </label>
        <br />
        <label>
          Email address:
          <input type="text" v-model="user.email" />
        </label>
        <br />
        <label>
          Phone number:
          <input type="text" v-model="user.phone_number" />
          <br />
          <small>
            Your number will be used for notification purposes. If you do not wish to receive notifications, please
            either remove, or do not include your phone number.
          </small>
        </label>
        <br />
        <input type="submit" value="Save Changes" />
        <button v-on:click="editMode = false">Cancel</button>
      </form>
    </div>

    <div v-if="pending">
      <p>Friend request pending</p>
    </div>

    <!-- ADD FRIEND BUTTON - for non-friends only -->
    <div v-else-if="isNotFriend()">
      <button v-on:click="addFriend()">Add Friend</button>
    </div>

    <!-- USER'S MOVIE SUGGESTIONS - viewable on current user and friends pages -->
    <div v-if="user.id == $parent.getUserId() || friendIds.includes(Number($parent.getUserId()))">
      <h3>Movie Suggestions</h3>
      <router-link v-if="$parent.getUserId() == user.id" :to="'/suggestions'">Manage suggestions</router-link>
      <div v-for="suggestion in suggestions" v-bind:key="suggestion.id">
        <img :src="suggestion.movie.Poster" alt="movie poster" />
        <p>Suggested by: {{ suggestion.sender.username }}</p>
      </div>
    </div>

    <!-- FRIENDS LIST - current user only -->
    <div v-if="user.id == $parent.getUserId()" class="friend-list">
      <h3>Friend list</h3>
      <router-link :to="'/friends'">Manage friend list</router-link>
      <div v-for="friend in friends" v-bind:key="friend.id">
        <img class="friend-profile" :src="friend.image" alt="" />
        <p>{{ friend.username }}</p>
      </div>
    </div>
  </div>
</template>

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
    setFile: function (event) {
      if (event.target.files) {
        this.user.image = event.target.files[0];
      }
    },
    editUser: function () {
      var formData = new FormData();
      formData.append("name", this.user.name);
      formData.append("username", this.user.username);
      formData.append("email", this.user.email);
      if (this.user.image) {
        formData.append("image", this.user.image);
      }
      if (this.user.phone_number) {
        formData.append("phone_number", this.user.phone_number);
      }

      axios
        .patch(`/users/${this.$route.params.id}`, formData)
        .then((response) => {
          this.user.image = response.data.image;
          this.$parent.flashMessage = "Your details have been updated.";
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
            this.$parent.flashMessage = "Your account has been deleted.";
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
        .then((response) => {
          console.log(response.data);
          this.$parent.flashMessage = "Friend request sent.";
          this.$router.push("/users");
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
    isNotFriend: function () {
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
