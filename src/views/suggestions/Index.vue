<template>
  <div class="suggestions-index">
    <div class="contain-wrapp padding-clear padding-bottom-30">
      <div class="container">
        <h2>My suggestions</h2>
        <div class="row margin-bottom-30">
          <div class="col-xs-6">
            <label for="sort">Sort by:</label>
            <select v-model="sortAttribute" id="sort" class="form-control">
              <option value="movie.Title">Movie Title</option>
              <option value="sender.username">Sender</option>
              <option value="watched">Watched</option>
            </select>
          </div>
          <div class="col-xs-6">
            <label for="order">Order:</label>
            <select v-model="sortOrder" id="order" class="form-control">
              <option :value="1">Ascending</option>
              <option :value="-1">Descending</option>
            </select>
          </div>
        </div>

        <div class="divider divider-dashed"></div>

        <div class="row">
          <div class="col-12">
            <!-- START - Images Gallery -->
            <div id="gallery" class="masonry gallery">
              <div class="row">
                <!-- START - Gallery Card -->
                <div
                  v-for="suggestion in orderBy(suggestions, sortAttribute, sortOrder)"
                  v-bind:key="suggestion.id"
                  class="grid-item col-x12 col-md-4"
                >
                  <div class="img-wrapper text-center">
                    <img :src="suggestion.movie.Poster" alt="movie poster" class="img-fluid" />
                  </div>
                  <div class="img-containt text-center">
                    <h5>
                      <router-link :to="`/movies/${suggestion.movie.imdbID}`">
                        {{ suggestion.movie.Title }} ({{ suggestion.movie.Year }})
                      </router-link>
                    </h5>
                    <router-link :to="`/users/${suggestion.sender.id}`">
                      Sent by: {{ suggestion.sender.username }}
                    </router-link>

                    <div class="checkbox">
                      <div class="custom-checkbox">
                        <label>
                          <input
                            v-model="suggestion.watched"
                            v-on:change="editSuggestion(suggestion)"
                            type="checkbox"
                            name="check_me"
                          />
                          <i v-if="suggestion.watched" class="fa fa-eye icon-circle icon-bordered fa-primary"></i>
                          <i v-else class="fa fa-eye-slash icon-circle icon-bordered fa-primary"></i>

                          <!-- <span class="checkmark"></span> -->
                        </label>
                      </div>
                    </div>

                    <div class="img-footer">
                      <button
                        v-on:click="deleteSuggestion(suggestion)"
                        type="button"
                        class="btn-e btn-block btn-e-dark-red"
                      >
                        <i class="fa fa-ban"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <!-- END - Gallery Card -->
              </div>
            </div>
            <!-- END - Images Gallery -->

            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
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
      <h4>{{ suggestion.movie.Title }} ({{ suggestion.movie.Year }})</h4>
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
