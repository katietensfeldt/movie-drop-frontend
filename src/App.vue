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
            <router-link class="navbar-brand logo" to="/">Movie Drop</router-link>
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
    <div v-if="flashMessage" class="contain-wrapp">
      <div class="alert alert-info alert-dismissible container" role="alert">
        <button v-on:click="flashMessage = ''" type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span>×</span>
        </button>
        <i class="fa fa-info"></i>
        {{ flashMessage }}
      </div>
    </div>
    <router-view />
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-4">
            <div class="footer-details">
              <img src="img/themes/logo-orange.png" class="footer-logo" alt="Footer logo" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>

              <!-- START - Social Networks -->
              <div class="footer-social">
                <a href="javascript:void(0);"><i class="fa fa-facebook fa-2x"></i></a>
                <a href="javascript:void(0);"><i class="fa fa-twitter fa-2x"></i></a>
                <a href="javascript:void(0);"><i class="fa fa-instagram fa-2x"></i></a>
                <a href="javascript:void(0);"><i class="fa fa-linkedin fa-2x"></i></a>
              </div>
              <!-- END - Social Networks -->
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-2">
            <div class="footer-details">
              <h5 class="footer-details-header">Quick Links</h5>
              <ul class="footer-details-list list-unstyled">
                <li><a href="javascript:void(0);">Home</a></li>
                <li><a href="javascript:void(0);">About</a></li>
                <li><a href="javascript:void(0);">Service</a></li>
                <li><a href="javascript:void(0);">Login</a></li>
                <li><a href="javascript:void(0);">Registration</a></li>
              </ul>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-2">
            <div class="footer-details">
              <h5 class="footer-details-header">Service</h5>
              <ul class="footer-details-list list-unstyled">
                <li><a href="javascript:void(0);">Lorem Ipsum</a></li>
                <li><a href="javascript:void(0);">Dolor sit amet</a></li>
                <li><a href="javascript:void(0);">Eiusmod tempor</a></li>
                <li><a href="javascript:void(0);">Labore et dolore</a></li>
                <li><a href="javascript:void(0);">At vero eos</a></li>
              </ul>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="footer-details">
              <h5 class="footer-details-header">Newsletter</h5>
              <p>Subscribe to our newsletter to get important news & amazing offers:</p>

              <!-- START - Subscribe -->
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Enter your email address..." />
                <span class="input-group-btn">
                  <button class="btn-e btn-e-primary" type="button"><i class="fa fa-send-o"></i></button>
                </span>
              </div>
              <!-- END - Subscribe -->
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

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
