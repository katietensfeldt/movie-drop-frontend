<template>
  <div class="users-show">
    <div class="contain-wrapp padding-clear padding-bottom-30">
      <!-- Basic user card -->
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- START - Images Gallery -->
            <div id="gallery" class="masonry gallery contain-wrapp">
              <div class="row">
                <!-- START - Gallery 01 -->
                <div class="grid-item col-12">
                  <div class="column-wrapper">
                    <!-- MAIN USER INFO - viewable on all profile types -->

                    <div class="img-wrapper half-column">
                      <img
                        :src="user.image"
                        class="img-rounded img-fluid"
                        alt="User image"
                        style="height: 24rem; width: auto"
                      />
                    </div>
                    <!-- USER BUTTONS - edit and delete for current user, add friend or friend request pending-->
                    <div v-if="!editMode" class="img-containt half-column">
                      <h4>{{ user.username }}</h4>
                      <p>
                        {{ user.name }}
                      </p>
                      <!-- If friend request is pending -->
                      <div v-if="pending">
                        <p>Friend request pending</p>
                      </div>
                      <!-- ADD FRIEND BUTTON - for non-friends only -->
                      <div v-else-if="isNotFriend()">
                        <button class="btn-e btn-e-primary btn-sm" v-on:click="addFriend()">Add Friend</button>
                      </div>
                      <p v-if="$parent.getUserId() == user.id">
                        <button class="btn-e btn-e-default btn-sm" v-on:click="showEditUser">Edit user</button>
                        <button class="btn-e btn-e-primary btn-sm" v-on:click="destroyUser">Delete Profile</button>
                      </p>
                    </div>

                    <!-- USER EDIT FORM -->
                    <div v-if="editMode" class="img-containt half-column">
                      <h3>Edit profile</h3>
                      <!-- Error handling -->
                      <ul>
                        <li class="error" v-for="error in errors" v-bind:key="error">
                          {{ error }}
                        </li>
                      </ul>
                      <form v-on:submit.prevent="editUser()" id="edit" class="form-horizontal">
                        <div class="form-group has-feedback row">
                          <label for="inputName" class="col-sm-3 col-form-label">
                            Name
                            <span class="text-danger small">*</span>
                          </label>
                          <div class="col-sm-9">
                            <input
                              autocomplete="name"
                              v-model="user.name"
                              type="text"
                              class="form-control"
                              id="inputName"
                              placeholder="Name"
                              required
                            />
                            <i class="fa fa-pencil form-control-feedback"></i>
                          </div>
                        </div>
                        <div class="form-group has-feedback row">
                          <label for="inputLastName" class="col-sm-3 col-form-label">
                            E-mail
                            <span class="text-danger small">*</span>
                          </label>
                          <div class="col-sm-9">
                            <input
                              autocomplete="email"
                              v-model="user.email"
                              type="text"
                              class="form-control"
                              id="inputLastName"
                              placeholder="E-mail"
                              required
                            />
                            <i class="fa fa-envelope form-control-feedback"></i>
                          </div>
                        </div>
                        <div class="form-group has-feedback row">
                          <label for="inputUserName" class="col-sm-3 col-form-label">
                            Username
                            <span class="text-danger small">*</span>
                          </label>
                          <div class="col-sm-9">
                            <input
                              autocomplete="username"
                              v-model="user.username"
                              type="text"
                              class="form-control"
                              id="inputUserName"
                              placeholder="Username"
                              required
                            />
                            <i class="fa fa-user form-control-feedback"></i>
                          </div>
                        </div>

                        <div class="form-group has-feedback row">
                          <label for="phoneNumber" class="col-sm-3 col-form-label">Phone Number</label>
                          <div class="col-sm-9">
                            <input
                              autocomplete="tel-national"
                              v-model="user.phone_number"
                              type="text"
                              class="form-control"
                              id="phoneNumber"
                              placeholder="Will be used for notifications"
                            />
                            <i class="fa fa-phone form-control-feedback"></i>
                          </div>
                        </div>
                        <div class="form-group row justify-content-end">
                          <label for="profilePicture" class="col-sm-3 col-form-label">
                            Profile Pic
                            <span class="text-danger small">*</span>
                          </label>
                          <div class="col-sm-9">
                            <input v-on:change="setFile($event)" ref="fileInput" type="file" id="profilePicture" />
                          </div>
                        </div>
                        <div class="form-group row justify-content-end">
                          <div class="col-12 col-md-9">
                            <button class="col-3 btn-e btn-block btn-e-default" v-on:click="editMode = false">
                              Cancel
                            </button>

                            <button type="submit" class="col-3 btn-e btn-block btn-e-primary">Save</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <!-- END - Gallery 01 -->
              </div>
            </div>
            <!-- END - Images Gallery -->
          </div>
        </div>
      </div>

      <!-- Movie suggestions (for current user and friends only) -->
      <div v-if="user.id == $parent.getUserId() || friendIds.includes(Number($parent.getUserId()))" class="container">
        <h3>Movie Suggestions</h3>
        <router-link v-if="$parent.getUserId() == user.id" :to="'/suggestions'">Manage suggestions</router-link>
        <div class="row">
          <div v-for="suggestion in suggestions" v-bind:key="suggestion.id" class="col-sm-3">
            <div class="thumbnail thumbnail-red">
              <router-link :to="`/movies/${suggestion.movie.imdbID}`">
                <img :src="suggestion.movie.Poster" alt="movie poster" class="img-fluid" />
              </router-link>
              <div class="caption">
                <p>Suggested by: {{ suggestion.sender.username }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Friends list (for current user only) -->
      <div v-if="user.id == $parent.getUserId()" class="container">
        <h3>Friends</h3>
        <router-link :to="'/friends'">Manage friends</router-link>
        <div class="row">
          <div v-for="friend in friends" v-bind:key="friend.id" class="col-sm-3">
            <div class="team-wrapp team-circle">
              <div class="img-wrapper wrapp-thumbnail wrapp-red">
                <router-link :to="`/users/${friend.id}`">
                  <img :src="friend.image" class="img-circle img-fluid" alt="" />
                </router-link>
              </div>
              <div class="caption">
                <p>{{ friend.username }}</p>
              </div>
            </div>
          </div>
        </div>
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
      this.friends.forEach((friend) => {
        this.friendIds.push(friend.id);
      });
      this.isFriendshipPending();
    });
    axios.get("/suggestions").then((response) => {
      this.suggestions = response.data;
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
        .then(() => {
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
