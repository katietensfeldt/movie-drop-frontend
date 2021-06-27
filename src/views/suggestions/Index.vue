<template>
  <div class="suggestions-index">
    <h2>My movie suggestions</h2>
    <div v-for="suggestion in suggestions" v-bind:key="suggestion.id">
      <img :src="suggestion.movie.Poster" alt="movie poster" />
      <p>Suggested by: {{ suggestion.sender.username }}</p>
      <button v-on:click="editSuggestion(suggestion.watched, suggestion.id)" v-if="!suggestion.watched">
        Not seen
      </button>
      <button v-on:click="editSuggestion(suggestion.watched, suggestion.id)" v-else>Seen</button>
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
      editSuggestionParams: { watched: "" },
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
      this.editSuggestionParams.watched = !status;
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
    deleteSuggestion: function (id) {
      axios
        .delete(`/suggestions/${id}`)
        .then((response) => {
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
