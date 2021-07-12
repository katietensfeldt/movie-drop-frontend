<template>
  <div class="home">
    <div class="inner-head">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <i class="fa fa-users"></i>
            <h4>
              Theme
              <span>Pages</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <h1>{{ message }}</h1>
  </div>
</template>

<style></style>

<script>
// import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to Movie Drop",
    };
  },
  created: function () {},
  methods: {},
};
</script>
