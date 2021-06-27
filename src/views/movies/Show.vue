<template>
  <div class="movies-show">
    <h2>{{ movie.Title }} ({{ movie.Year }})</h2>
    <img :src="movie.Poster" alt="Movie poster" />
    <br />
    <button v-on:click="showFriends()">Suggest to friend</button>
    <div v-if="showList">
      <label for="myFriends">Select a friend</label>
      <select name="myFriends" id="myFriends">
        <option v-for="friend in friendsList" v-bind:key="friend.id" :value="friend.id">{{ friend.username }}</option>
      </select>
    </div>
    <p>Genres: {{ movie.Genre }}</p>
    <p>Rated: {{ movie.Rated }}</p>
    <p>Runtime: {{ movie.Runtime }}</p>
    <p>Directed by: {{ movie.Director }}</p>
    <p>Starring: {{ movie.Actors }}</p>
    <p>Released: {{ movie.Released }}</p>
    <p>Ratings from {{ movie.Ratings[0].Source }}: {{ movie.Ratings[0].Value }}</p>
    <p>
      Plot
      <br />
      {{ movie.Plot }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movie: {},
      friendsList: [],
      showList: false,
    };
  },
  created: function () {
    axios.get(`/movies/${this.$route.params.id}`).then((response) => {
      this.movie = response.data;
      console.log(this.movie);
    });
  },
  methods: {
    showFriends: function () {
      this.showList = !this.showList;
      axios.get(`/users/${this.$parent.getUserId()}`).then((response) => {
        this.friendsList = response.data.friends;
      });
    },
  },
};
</script>
