<template>
  <div class="users-index">
    <div class="inner-head">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <i class="fa fa-film"></i>
            <h4>
              <span>Users</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$parent.flashMessage" class="">
      <div class="alert alert-info alert-dismissible container" role="alert">
        <button
          v-on:click="$parent.flashMessage = ''"
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span>×</span>
        </button>
        <i class="fa fa-check-circle"></i>
        {{ $parent.flashMessage }}
      </div>
    </div>
    <div class="contain-wrapp padding-clear padding-bottom-30 margin-top-60">
      <div class="container">
        <form class="form-inline" v-on:submit.prevent="findUser()">
          <div class="form-group">
            <div class="input-group">
              <input type="text" v-model="search" placeholder="Find user by username..." class="form-control" />
            </div>
          </div>
          <button type="submit" class="btn-e btn-e-primary" value="Search">Search</button>
        </form>

        <div class="divider divider-dashed"></div>

        <div class="contain-wrapp">
          <div class="container">
            <div class="row">
              <div v-for="user in orderBy(users, 'username')" v-bind:key="user.id" class="col-sm-3">
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
        </div>
      </div>
    </div>
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
      search: "",
    };
  },
  created: function () {},
  methods: {
    findUser: function () {
      axios
        .get("/users", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.users = response.data;
        });
    },
  },
};
</script>
