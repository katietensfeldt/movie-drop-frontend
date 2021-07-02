<template>
  <div class="movies-show">
    <h2>{{ movie.Title }} ({{ movie.Year }})</h2>
    <img :src="movie.Poster" alt="Movie poster" />
    <br />
    <button v-on:click="showFriends()">Suggest to friend</button>
    <div v-if="showList">
      <label for="myFriends">Select a friend</label>
      <select v-model="newSuggestionParams.recipient_id" name="myFriends" id="myFriends">
        <option disabled value="">Please select one</option>
        <option v-for="friend in friendsList" v-bind:key="friend.id" :value="friend.id">{{ friend.username }}</option>
      </select>
      <button v-on:click="createSuggestion()">Send Suggestion</button>
      <button v-on:click="toggleFriendList()">Done</button>
    </div>
    <p>Genres: {{ movie.Genre }}</p>
    <p>Rated: {{ movie.Rated }}</p>
    <p>Runtime: {{ movie.Runtime }}</p>
    <p>Directed by: {{ movie.Director }}</p>
    <p>Starring: {{ movie.Actors }}</p>
    <p>Released: {{ movie.Released }}</p>
    <p>Ratings from {{ movie.Ratings[0].Source }}: {{ movie.Ratings[0].Value }}</p>
    <p>
      Plot:
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
      newSuggestionParams: {},
      errors: [],
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
      this.toggleFriendList();
      axios.get(`/users/${this.$parent.getUserId()}`).then((response) => {
        this.friendsList = response.data.friends;
      });
    },
    toggleFriendList: function () {
      this.showList = !this.showList;
    },
    createSuggestion: function () {
      this.newSuggestionParams.omdb_api_id = this.$route.params.id;
      axios
        .post("/suggestions", this.newSuggestionParams)
        .then((response) => {
          this.$parent.flashMessage = `Suggestion sent to ${response.data.recipient.username}.`;
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
      console.log("Suggestion");
    },
  },
};
</script>
