<template>
  <div class="suggestions-index">
    <h2>My movie suggestions</h2>
    <label for="sort">Sort suggestions by:</label>
    <select v-model="sortAttribute" id="sort">
      <option value="movie.Title">Movie Title</option>
      <option value="sender.username">Sender</option>
      <option value="watched">Watched</option>
    </select>
    <label for="order">In order:</label>
    <select v-model="sortOrder" id="order">
      <option :value="1">Ascending</option>
      <option :value="-1">Descending</option>
    </select>
    <div v-for="suggestion in orderBy(suggestions, sortAttribute, sortOrder)" v-bind:key="suggestion.id">
      <router-link :to="`/movies/${suggestion.movie.imdbID}`">
        <img :src="suggestion.movie.Poster" alt="movie poster" />
      </router-link>
      <p>Suggested by: {{ suggestion.sender.username }}</p>

      <label>
        Watched:
        <input type="checkbox" id="checkbox" v-model="suggestion.watched" v-on:change="editSuggestion(suggestion)" />
      </label>

      <br />
      <button v-on:click="deleteSuggestion(suggestion)">Delete Suggestion</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      editSuggestionParams: {},
      suggestions: {},
      sortAttribute: "movie.Title",
      sortOrder: 1,
      errors: [],
    };
  },
  created: function () {
    axios.get("/suggestions").then((response) => {
      this.suggestions = response.data;
      console.log(response.data);
    });
  },
  methods: {
    editSuggestion: function (suggestion) {
      axios
        .patch(`/suggestions/${suggestion.id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    deleteSuggestion: function (suggestion) {
      axios
        .delete(`/suggestions/${suggestion.id}`)
        .then((response) => {
          var index = this.suggestions.indexOf(suggestion);
          this.suggestions.splice(index, 1);
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
  },
};
</script>
