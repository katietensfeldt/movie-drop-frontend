<template>
  <div class="suggestions-index">
    <h2>My movie suggestions</h2>
    <div v-for="suggestion in suggestions" v-bind:key="suggestion.id">
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

export default {
  data: function () {
    return {
      suggestions: [],
      editSuggestionParams: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/suggestions").then((response) => {
      this.suggestions = response.data;
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
          for (var i = 0; i < this.suggestions.length; i++) {
            if (this.suggestions[i].id === id) {
              this.suggestions.splice(i, 1);
              i--;
            }
          }
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
