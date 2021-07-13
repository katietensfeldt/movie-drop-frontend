<template>
  <div class="home">
    <div class="contain-wrapp home-app">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-7 col-sm-6">
            <div class="content-home contain-wrapp">
              <h1 class="title">Welcome to MovieDrop</h1>
              <p>Easily send your friends movie suggestions so you don't have to remember them!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cta-wrapper cta-primary">
      <div class="container">
        <div class="row">
          <div v-if="!$parent.isLoggedIn()" class="col-12">
            <h5>Sign up now! Or log in to get started</h5>
            <router-link to="signup" type="button" class="btn-e btn-icon btn-e-default">
              <i class="fa fa-address-card-o"></i>
              Sign Up
            </router-link>
            <router-link to="/login" type="button" class="btn-e btn-icon btn-bordered btn-e-default">
              <i class="fa fa-key"></i>
              Log In
            </router-link>
          </div>
          <div v-else class="col-12">Drop your movie suggestions!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  created: function () {},
  methods: {},
};
</script>
