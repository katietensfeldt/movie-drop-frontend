<template>
  <div class="friends-index">
    <div class="inner-head">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <i class="fa fa-film"></i>
            <h4>
              My
              <span>Friends</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="contain-wrapp padding-clear padding-bottom-30">
      <div class="container contain-wrapp">
        <form class="form-inline">
          <a href="#pending">Go to pending</a>
        </form>
        <div class="divider divider-dashed"></div>
        <div class="row">
          <div class="col-12">
            <!-- START - Images Gallery -->
            <div id="gallery" class="masonry gallery">
              <div class="row">
                <!-- START - Gallery Card -->
                <div
                  v-for="friendship in approvedFriendships"
                  v-bind:key="friendship.id"
                  class="grid-item col-x12 col-md-4"
                >
                  <div v-if="friendship.sender.id == $parent.getUserId()">
                    <div class="team-wrapp team-circle">
                      <div class="img-wrapper wrapp-thumbnail wrapp-red">
                        <img :src="friendship.recipient.image" alt="Friend image" class="img-circle img-fluid" />
                      </div>
                      <div class="caption">
                        <router-link :to="`users/${friendship.recipient.id}`">
                          <h5>{{ friendship.recipient.username }}</h5>
                          <p>{{ friendship.recipient.name }}</p>
                        </router-link>
                      </div>
                      <div class="team-network-bottom">
                        <button v-on:click="unfriend(friendship)" type="button" class="btn-e btn-block btn-e-dark-red">
                          <i class="fa fa-ban"></i>
                          Unfriend
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="team-wrapp team-circle">
                      <div class="img-wrapper wrapp-thumbnail wrapp-red">
                        <img :src="friendship.sender.image" alt="Friend image" class="img-circle img-fluid" />
                      </div>
                      <div class="caption">
                        <router-link :to="`users/${friendship.sender.id}`">
                          <h5>{{ friendship.sender.username }}</h5>
                          <p>{{ friendship.sender.name }}</p>
                        </router-link>
                      </div>
                      <div class="team-network-bottom">
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
              <div id="pending" class="row">
                <!-- START - Gallery Card -->
                <div
                  v-for="friendship in pendingFriendships"
                  v-bind:key="friendship.id"
                  class="grid-item col-x12 col-md-4"
                >
                  <div v-if="friendship.sender.id == $parent.getUserId()">
                    <div class="team-wrapp team-circle">
                      <div class="img-wrapper wrapp-thumbnail wrapp-red">
                        <img :src="friendship.recipient.image" alt="Friend image" class="img-circle img-fluid" />
                      </div>
                      <div class="caption">
                        <router-link :to="`/users/${friendship.recipient.id}`">
                          <h5>{{ friendship.recipient.username }}</h5>
                          <p>{{ friendship.recipient.name }}</p>
                        </router-link>
                      </div>
                      <div class="team-network-bottom">
                        <button
                          v-on:click="deleteRequest(friendship)"
                          type="button"
                          class="btn-e btn-block btn-e-dark-red"
                        >
                          <i class="fa fa-ban"></i>
                          Delete request
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="team-wrapp team-circle">
                      <div class="img-wrapper wrapp-thumbnail wrapp-red">
                        <img :src="friendship.sender.image" alt="Friend image" class="img-circle img-fluid" />
                      </div>
                      <div class="caption">
                        <router-link :to="`/users/${friendship.sender.id}`">
                          <h5>{{ friendship.sender.username }}</h5>
                          <p>{{ friendship.sender.name }}</p>
                        </router-link>
                      </div>
                      <div class="team-network-bottom">
                        <button
                          v-on:click="approveFriendship(friendship)"
                          type="button"
                          class="btn-e btn-block btn-e-green"
                        >
                          <i class="fa fa-check"></i>
                          Approve friendship
                        </button>
                        <button
                          v-on:click="deleteRequest(friendship)"
                          type="button"
                          class="btn-e btn-block btn-e-dark-red"
                        >
                          <i class="fa fa-ban"></i>
                          Delete request
                        </button>
                      </div>
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
