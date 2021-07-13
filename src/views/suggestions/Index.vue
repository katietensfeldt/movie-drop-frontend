<template>
  <div class="suggestions-index">
    <div class="inner-head">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <i class="fa fa-film"></i>
            <h4>
              My
              <span>Suggestions</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div class="contain-wrapp padding-clear padding-bottom-30">
      <div class="container">
        <div class="row margin-bottom-30 margin-top-60">
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
                  <div class="thumbnail thumbnail-red team-wrapp">
                    <div class="img-wrapper">
                      <router-link :to="`movies/${suggestion.movie.imdbID}`">
                        <img :src="suggestion.movie.Poster" alt="movie poster" class="img-fluid" />
                      </router-link>
                    </div>
                    <div class="caption">
                      <h6>{{ suggestion.movie.Title }} ({{ suggestion.movie.Year }})</h6>
                      <p>Sent by: {{ suggestion.sender.username }}</p>
                    </div>
                    <div class="team-network-bottom">
                      <div class="checkbox">
                        <div class="custom-checkbox">
                          <label>
                            <input
                              v-model="suggestion.watched"
                              v-on:change="editSuggestion(suggestion)"
                              type="checkbox"
                              name="check_me"
                            />
                            <i v-if="suggestion.watched" class="fa fa-eye icon-square fa-black rounded-4x"></i>
                            <i v-else class="fa fa-eye-slash icon-square fa-black rounded-4x"></i>
                          </label>
                        </div>
                      </div>
                      <button v-on:click="deleteSuggestion(suggestion)" class="btn-e btn-e-default">
                        <i class="fa fa-window-close-o"></i>
                        Delete from list
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
        });
    },
    deleteSuggestion: function (suggestion) {
      axios
        .delete(`/suggestions/${suggestion.id}`)
        .then(() => {
          var index = this.suggestions.indexOf(suggestion);
          this.suggestions.splice(index, 1);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
