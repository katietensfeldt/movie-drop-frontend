<template>
  <div class="signup">
    <div class="contain-wrapp">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-6">
            <div class="form-block center-block">
              <h2 class="title">Sign Up</h2>
              <hr />
              <ul>
                <li class="text-danger" v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </li>
              </ul>
              <form v-on:submit.prevent="submit()" id="register" class="form-horizontal">
                <div class="form-group has-feedback row">
                  <label for="inputName" class="col-sm-3 col-form-label">
                    Name
                    <span class="text-danger small">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      autocomplete="name"
                      v-model="name"
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
                      v-model="email"
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
                      v-model="username"
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
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    Password
                    <span class="text-danger small">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      autocomplete="new-password"
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      required
                    />
                    <i class="fa fa-lock form-control-feedback"></i>
                  </div>
                </div>
                <div class="form-group has-feedback row">
                  <label for="inputPasswordConfirmation" class="col-sm-3 col-form-label">
                    Confirm Password
                    <span class="text-danger small">*</span>
                  </label>
                  <div class="col-sm-9">
                    <input
                      autocomplete="new-password"
                      v-model="password_confirmation"
                      type="password"
                      class="form-control"
                      id="inputPasswordConfirmation"
                      placeholder="Confirm Password"
                      required
                    />
                    <i class="fa fa-lock form-control-feedback"></i>
                  </div>
                </div>
                <div class="form-group has-feedback row">
                  <label for="phoneNumber" class="col-sm-3 col-form-label">Phone Number</label>
                  <div class="col-sm-9">
                    <input
                      autocomplete="tel-national"
                      v-model="phone_number"
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
                    <input required v-on:change="setFile($event)" ref="fileInput" type="file" id="profilePicture" />
                  </div>
                </div>
                <div class="form-group row justify-content-end">
                  <div class="col-12 col-md-9">
                    <button type="submit" class="btn-e btn-block btn-e-primary">Sign Up</button>
                  </div>
                </div>
              </form>
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
      name: "",
      email: "",
      username: "",
      image: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      errors: [],
    };
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    submit: function () {
      var formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("username", this.username);
      formData.append("image", this.image);
      formData.append("password", this.password);
      formData.append("password_confirmation", this.password_confirmation);
      if (this.phone_number.length > 0) {
        formData.append("phone_number", this.phone_number);
      }
      axios
        .post("/users", formData)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
          this.$parent.flashMessage = "Successfully signed up! Please log in to access your account.";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
