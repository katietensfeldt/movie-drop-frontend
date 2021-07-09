<template>
  <div class="friends-index">
    <div class="contain-wrapp padding-clear padding-bottom-30">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- START - Images Gallery -->
            <div id="gallery" class="masonry gallery">
              <h2>My friends</h2>
              <div class="row">
                <!-- START - Gallery Card -->
                <div
                  v-for="friendship in approvedFriendships"
                  v-bind:key="friendship.id"
                  class="grid-item col-x12 col-md-4"
                >
                  <div v-if="friendship.sender.id == $parent.getUserId()">
                    <div class="img-wrapper">
                      <img :src="friendship.recipient.image" alt="Friend image" class="img-fluid" />
                    </div>
                    <div class="img-containt text-center">
                      <h5>
                        <router-link :to="`/users/${friendship.recipient.id}`">
                          {{ friendship.recipient.username }}
                        </router-link>
                      </h5>
                      <router-link :to="`/users/${friendship.recipient.id}`">
                        {{ friendship.recipient.name }}
                      </router-link>
                      <div class="img-footer">
                        <button v-on:click="unfriend(friendship)" type="button" class="btn-e btn-block btn-e-dark-red">
                          <i class="fa fa-ban"></i>
                          Unfriend
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="img-wrapper">
                      <img :src="friendship.sender.image" alt="Friend image" class="img-fluid" />
                    </div>
                    <div class="img-containt text-center">
                      <h5>
                        <router-link :to="`/users/${friendship.sender.id}`">
                          {{ friendship.sender.username }}
                        </router-link>
                      </h5>
                      <router-link :to="`/users/${friendship.sender.id}`">{{ friendship.sender.name }}</router-link>
                      <div class="img-footer">
                        <button v-on:click="unfriend(friendship)" type="button" class="btn-e btn-block btn-e-dark-red">
                          <i class="fa fa-ban"></i>
                          Unfriend
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END - Gallery Card -->
              </div>
              <h2>Pending friendships</h2>
              <div class="row">
                <!-- START - Gallery Card -->
                <div
                  v-for="friendship in pendingFriendships"
                  v-bind:key="friendship.id"
                  class="grid-item col-x12 col-md-4"
                >
                  <div v-if="friendship.sender.id == $parent.getUserId()">
                    <div class="img-wrapper">
                      <img :src="friendship.recipient.image" alt="Friend image" class="img-fluid" />
                    </div>
                    <div class="img-containt text-center">
                      <h5>
                        <router-link :to="`/users/${friendship.recipient.id}`">
                          {{ friendship.recipient.username }}
                        </router-link>
                      </h5>
                      <router-link :to="`/users/${friendship.recipient.id}`">
                        {{ friendship.recipient.name }}
                      </router-link>
                      <div class="img-footer">
                        <button
                          v-on:click="deleteRequest(friendship)"
                          type="button"
                          class="btn-e btn-block btn-e-dark-red"
                        >
                          <i class="fa fa-ban"></i>
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="img-wrapper">
                      <img :src="friendship.sender.image" alt="Friend image" class="img-fluid" />
                    </div>
                    <div class="img-containt text-center">
                      <h5>
                        <router-link :to="`/users/${friendship.sender.id}`">
                          {{ friendship.sender.username }}
                        </router-link>
                      </h5>
                      <router-link :to="`/users/${friendship.sender.id}`">{{ friendship.sender.name }}</router-link>
                      <ul class="img-footer">
                        <button v-on:click="approveFriendship(friendship)" type="button" class="btn-e btn-e-green">
                          <i class="fa fa-check"></i>
                        </button>
                        <button v-on:click="deleteRequest(friendship)" type="button" class="btn-e btn-e-dark-red">
                          <i class="fa fa-ban"></i>
                        </button>
                      </ul>
                    </div>
                  </div>
                </div>
                <!-- END - Gallery Card -->
              </div>
            </div>
            <!-- END - Images Gallery -->

            <div class="clearfix"></div>
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
