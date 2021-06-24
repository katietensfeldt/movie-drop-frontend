<template>
  <div class="users-show">
    <!-- If edit button is clicked, page enters in to 'editMode', which will display text boxes to edit information -->
    <div v-if="!editMode">
      <img :src="user.image" alt="User image" />
      <h2>{{ user.username }}</h2>
      <p>{{ user.name }}</p>

      <!-- Will show edit and delete buttons only if user is viewing their own profile -->
      <!-- Currently not working, getUserId() is returning null -->
      <!-- <span v-if="$parent.getUserId() == user.id"> -->
      <button v-on:click="showEditUser">Edit user</button>
      <button v-on:click="destroyUser">Delete Profile</button>
      <!-- </span> -->
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

    <!-- This section requires conditional logic -->
    <!-- Current user and friends may view suggestions -->
    <div v-if="$parent.getUserId() == user.id">
      <!--  -->
      <p>Movie Suggestions</p>
      <div v-for="suggestion in suggestions" v-bind:key="suggestion.id">
        <img :src="suggestion.movie.Poster" alt="movie poster" />
        <p>Suggested by: {{ suggestion.sender.username }} | Watched Status: {{ suggestion.watched }}</p>
      </div>
    </div>

    <!-- Only current user may view friends -->
    <div class="friend-list" v-if="$parent.getUserId() == user.id">
      <p>Friend list</p>
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

.friend-list {
  border-top: 2px solid black;
}

.error {
  color: red;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      friends: {},
      suggestions: {},
      editMode: false,
      editUserParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
      this.friends = response.data.friends;
      this.suggestions = response.data.suggestions;
      console.log(this.user);
    });
  },
  methods: {
    showEditUser: function () {
      this.editMode = true;
      this.editUserParams = this.user;
      console.log(this.editMode);
    },
    editUser: function () {
      axios
        .patch(`/users/${this.$route.params.id}`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
          this.editMode = false;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.errors);
        });
    },
    destroyUser: function () {
      if (confirm("Are you sure you want to delete your profile? This action cannot be reversed.")) {
        axios
          .delete(`/users/${this.$route.params.id}`)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/logout");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>
