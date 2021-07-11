<template>
  <div class="users-index">
    <div class="contain-wrapp padding-clear padding-bottom-30">
      <div class="container">
        <h2>Users</h2>
        <div class="row margin-bottom-30">
          <div class="col-xs-6">
            <label for="search">Find a user</label>
            <input type="text" v-model="userSearch" placeholder="Find user by username" class="form-control" />
          </div>
        </div>
        <div class="divider divider-dashed"></div>
        <div class="row">
          <div class="col-12">
            <div id="gallery" class="masonry gallery">
              <div class="row">
                <div
                  v-for="user in filterBy(orderBy(users, 'username'), userSearch, 'username')"
                  v-bind:key="user.id"
                  class="grid-item col-x12 col-md-4"
                >
                  <div class="team-wrapp team-circle">
                    <div class="img-wrapper wrapp-thumbnail wrapp-red">
                      <img :src="user.image" alt="profile picture" class="img-circle img-fluid" />
                    </div>
                    <div class="caption">
                      <h5>{{ user.username }}</h5>
                      <p>{{ user.name }}</p>
                    </div>
                    <div class="team-network-bottom">
                      <router-link :to="`/users/${user.id}`" type="button" class="btn-e btn-block btn-e-red">
                        Visit profile
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <h1>Users</h1>
    <input type="text" v-model="userSearch" placeholder="Find user by username" />
    <ul class="list">
      <li
        class="card"
        v-for="user in filterBy(orderBy(users, 'username'), userSearch, 'username')"
        v-bind:key="user.id"
      >
        <div v-if="user.id != $parent.getUserId()">
          <router-link :to="`/users/${user.id}`">
            <img class="profile" :src="user.image" alt="profile picture" />
          </router-link>
          <h3>{{ user.username }}</h3>
          <p>{{ user.name }}</p>
        </div>
      </li>
    </ul> -->
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      users: [],
      userSearch: "",
    };
  },
  created: function () {
    axios.get("/users").then((response) => {
      this.users = response.data;
      console.log(this.users);
    });
  },
};
</script>
