<template>
  <div class="suggestions-index">
    <h2>My movie suggestions</h2>
    <label for="sort">Sort suggetsions by:</label>
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
      <p>{{ suggestion.movie.Title }}</p>
      <img :src="suggestion.movie.Poster" alt="movie poster" />
      <p>Suggested by: {{ suggestion.sender.username }}</p>
      <label>
        Seen it?
        <div v-if="suggestion.watched">
          <button v-on:click="editSuggestion(suggestion.watched, suggestion.id)">Yes</button>
        </div>
        <div v-else-if="!suggestion.watched">
          <button v-on:click="editSuggestion(suggestion.watched, suggestion.id)">No</button>
        </div>
      </label>
      <button v-on:click="deleteSuggestion(suggestion.id)">Delete Suggestion</button>
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
      suggestions: [],
      editSuggestionParams: {},
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
    editSuggestion: function (status, id) {
      this.editSuggestionParams.watched = this.toggleWatched(status);
      console.log(this.editSuggestionParams);
      axios
        .patch(`/suggestions/${id}`, this.editSuggestionParams)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    toggleWatched: function (status) {
      return !status;
    },
    deleteSuggestion: function (id) {
      axios
        .delete(`/suggestions/${id}`)
        .then((response) => {
          this.suggestions.forEach((suggestion) => {
            if (suggestion.id == id) {
              this.suggestions.splice(suggestion, 1);
            }
          });
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
