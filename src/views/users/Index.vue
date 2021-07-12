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
    <div class="contain-wrapp padding-clear padding-bottom-30 margin-top-60">
      <div class="container">
        <form class="form-inline">
          <div class="form-group">
            <div class="input-group">
              <input type="text" v-model="userSearch" placeholder="Find user: ex. user123" class="form-control" />
            </div>
          </div>
        </form>

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
