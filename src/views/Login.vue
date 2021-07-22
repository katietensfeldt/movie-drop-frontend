<template>
  <div class="login">
    <div class="contain-wrapp">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6">
            <div class="form-block center-block">
              <h2 class="title">Login</h2>
              <hr />
              <ul>
                <li v-for="error in errors" class="text-danger" v-bind:key="error">{{ error }}</li>
              </ul>
              <form id="login" class="form-horizontal" v-on:submit.prevent="submit()">
                <div class="form-group has-feedback row">
                  <label for="inputEmailAddress" class="col-sm-3 col-form-label">Email Address</label>
                  <div class="col-sm-9">
                    <input
                      v-model="email"
                      type="text"
                      class="form-control"
                      id="inputEmailAddress"
                      placeholder="Email Address"
                      required=""
                    />
                    <i class="fa fa-user form-control-feedback"></i>
                  </div>
                </div>
                <div class="form-group has-feedback row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
                  <div class="col-sm-9">
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      required=""
                    />
                    <i class="fa fa-lock form-control-feedback"></i>
                  </div>
                </div>
                <div class="form-group row justify-content-end">
                  <div class="col-sm-9">
                    <button type="submit" value="Submit" class="btn-e btn-block btn-e-primary margin-top-10">
                      Log In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p class="text-center space-top">
          Don't have an account yet?
          <router-link to="/signup">Sign up</router-link>
          now.
        </p>
        <p class="text-center space-top">
          To test out the app before signing up, you can use these credentials:
          <br />
          email: kat@gmail.com
          <br />
          password: password1234
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push(`/users/${this.$parent.getUserId()}`);
        })
        .catch(() => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
