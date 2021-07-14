<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-expand-lg navbar-dark megamenu">
        <div class="container">
          <!-- START - Navbar Button Toggler -->
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa fa-bars"></i>
          </button>
          <!-- END - Navbar Button Toggler -->

          <!-- START - Navbar Brand -->
          <div class="navbar-header">
            <router-link class="navbar-brand logo" to="/">
              <img style="height: 60px" src="/img/film-reel-36145.png" />
              <span style="color: #dc3545; font-weight: bold">MovieDrop</span>
            </router-link>
          </div>
          <!-- END - Navbar Brand -->

          <!-- START - Navbar Menu -->
          <div id="navbar-menu" class="collapse navbar-collapse">
            <ul class="nav navbar-nav ml-auto">
              <li><router-link v-if="isLoggedIn()" :to="`/users/${getUserId()}`">My profile</router-link></li>
              <li><router-link v-if="isLoggedIn()" to="/movies">Movies</router-link></li>
              <li><router-link v-if="isLoggedIn()" to="/users">Users</router-link></li>
              <li><router-link v-if="isLoggedIn()" to="/friends">My friends</router-link></li>
              <li><router-link v-if="isLoggedIn()" to="/suggestions">My suggestions</router-link></li>
              <li><router-link v-if="isLoggedIn()" to="/logout">Log Out</router-link></li>
              <li><router-link v-if="!isLoggedIn()" to="/signup">Sign Up</router-link></li>
              <li><router-link v-if="!isLoggedIn()" to="/login">Log In</router-link></li>
            </ul>
          </div>
          <!-- END - Navbar Menu -->
        </div>
      </nav>
    </div>
    <router-view :key="$route.path" />
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="footer-details">
              <img src="/img/film-reel-36145.png" class="footer-logo" alt="Footer logo" />
              <p>
                <span style="color: #dc3545; font-weight: bold">MovieDrop</span>
                built by Katie Tensfeldt. 2021.
              </p>

              <!-- START - Social Networks -->

              <!-- END - Social Networks -->
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="footer-details">
              <h5 class="footer-details-header">Source code</h5>
              <div class="footer-social">
                <a href="https://github.com/katietensfeldt/movie-drop-backend" target="_blank">
                  <i class="fa fa-github fa-2x"></i>
                </a>
                <a href="https://github.com/katietensfeldt/movie-drop-frontend" target="_blank">
                  <i class="fa fa-code fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <a href="#" class="toTop" style="display: inline">
      <i class="fa fa-chevron-up"></i>
    </a>
  </div>
</template>
<style>
html {
  scroll-behavior: smooth;
}
</style>
<script>
export default {
  data: function () {
    return {
      flashMessage: "",
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.user_id;
    },
  },
};
</script>
