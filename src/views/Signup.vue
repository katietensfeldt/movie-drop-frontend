<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="username" />
      </div>
      <div class="form-group">
        <label>Profile Picture:</label>
        <input type="file" v-on:change="setFile($event)" ref="fileInput" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" autocomplete="new-password" v-model="password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" autocomplete="off" v-model="password_confirmation" />
      </div>
      <div class="form-group">
        <label>If you would like to receive notifications, please enter your phone number:</label>
        <input type="text" class="form-control" v-model="phone_number" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
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
        console.log(this.image);
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
          this.$parent.flashMessage = "Successfully signed up! Please log in to access your account.";
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
