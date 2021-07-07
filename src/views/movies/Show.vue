<template>
  <div class="movies-show">
    <h2>{{ movie.Title }} ({{ movie.Year }})</h2>

    <img :src="movie.Poster" alt="Movie poster" />
    <iframe width="420" height="315" :src="`https://www.youtube.com/embed/${movieTrailerId}`"></iframe>
    <br />
    <button v-if="!showList" v-on:click="showFriends()">Suggest to friend</button>
    <div v-else>
      <label for="myFriends">Select a friend</label>
      <select v-model="newSuggestionParams.recipient_id" name="myFriends" id="myFriends">
        <option disabled value="">Please select one</option>
        <option v-for="friend in friendsList" v-bind:key="friend.id" :value="friend.id">
          {{ friend.username }}
        </option>
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
import movieTrailer from "movie-trailer";

export default {
  data: function () {
    return {
      movie: {},
      movieTrailerId: "",
      friendsList: [],
      showList: false,
      newSuggestionParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get(`/movies/${this.$route.params.id}`).then((response) => {
      this.movie = response.data;
      this.getTrailer();
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
    },
    getTrailer: function () {
      movieTrailer(this.movie.Title, this.movie.Year).then((response) => {
        console.log(response);
        var movieid = response.replace("https://www.youtube.com/watch?v=", "");
        this.movieTrailerId = movieid;
        console.log(movieid);
      });
    },
    // getTrailer: function () {
    //   axios
    //     .get(
    //       "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=age%20of%20ultron%20trailer",
    //       {
    //         headers: {
    //           Authorization: "Bearer 980725106999-950e745qi6cof7hjil0oc7lc3kqhk3ib.apps.googleusercontent.com",
    //           Accept: "application/json",
    //           key: "AIzaSyC8p6XLraEUNX0waw41M7tlR5gtgZhbvVQ",
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error.response);
    //     });
    // },
    // authenticate: function () {
    //   return gapi.auth2
    //     .getAuthInstance()
    //     .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
    //     .then(
    //       function () {
    //         console.log("Sign In successful");
    //       },
    //       function (err) {
    //         console.log("error signing in", err);
    //       }
    //     );
    // },
    // loadClient: function () {
    //   gapi.client.setApiKey("AIzaSyC8p6XLraEUNX0waw41M7tlR5gtgZhbvVQ");
    //   return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(
    //     function () {
    //       console.log("GAPI client loaded for API");
    //     },
    //     function (err) {
    //       console.error("Error loading GAPI client for API", err);
    //     }
    //   );
    // },
    // execute: function () {
    //   gapi.client.setApiKey("AIzaSyC8p6XLraEUNX0waw41M7tlR5gtgZhbvVQ");
    //   gapi.load("client:auth2", function () {
    //     gapi.auth2.init({ client_id: "980725106999-950e745qi6cof7hjil0oc7lc3kqhk3ib.apps.googleusercontent.com" });
    //   });
    //   return gapi.client.youtube.search
    //     .list({
    //       part: ["snippet"],
    //       maxResults: 1,
    //       q: "age of ultron trailer",
    //     })
    //     .then(
    //       function (response) {
    //         // Handle the results here (response.result has the parsed body).
    //         console.log("Response", response);
    //       },
    //       function (err) {
    //         console.error("Execute error", err);
    //       }
    //     );
    // },
    //
  },
};
</script>
