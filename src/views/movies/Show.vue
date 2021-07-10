<template>
  <div class="movies-show">
    <div class="contain-wrapp padding-bottom-clear">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="heading">
              <h4>{{ movie.Title }} ({{ movie.Year }})</h4>
              <p>
                {{ movie.Plot }}
              </p>
            </div>
            <div class="divider divider-dashed"></div>
            <br />
            <div
              v-for="rating in movie.Ratings"
              v-bind:key="rating.Value"
              class="progress progress-primary progress-sm"
            >
              <div
                class="progress-bar"
                role="progressbar"
                data-value-progress="60"
                :style="`width: ${standardRating(rating.Value)}%`"
              >
                <span class="value-progress">
                  {{ rating.Source }}:
                  <strong class="countertext">{{ rating.Value }}</strong>
                </span>
              </div>
            </div>
            <div class="divider divider-dashed"></div>
            <button
              v-on:click="showFriends()"
              type="button"
              class="btn-e btn-e-default"
              data-toggle="modal"
              data-target="#suggestionModal"
            >
              <i class="fa fa-send-o"></i>
              Suggest to friend
            </button>
            <button type="button" class="btn-e btn-e-primary" data-toggle="modal" data-target=".bs-example-modal-lg">
              <i class="fa fa-film"></i>
              Watch a clip
            </button>
          </div>
          <div class="col-12 col-md-6">
            <img :src="movie.Poster" alt="Movie poster" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="suggestionModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
            <h6 class="modal-title"></h6>
          </div>
          <div class="modal-body">
            <p>Select a friend to send this to:</p>
            <select v-model="newSuggestionParams.recipient_id" class="form-control">
              <option v-for="friend in friendsList" v-bind:key="friend.id" :value="friend.id">
                {{ friend.username }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-e btn-e-default btn-sm" data-dismiss="modal">Close</button>
            <button v-on:click="createSuggestion()" type="button" class="btn-e btn-e-primary btn-sm">Send</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
            <h6 class="modal-title">Clip</h6>
          </div>
          <div class="modal-body">
            <iframe width="750" height="400" :src="movieTrailer"></iframe>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-e btn-e-default btn-sm" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <div class="contain-wrapp padding-bottom-50">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <div class="section-heading">
              <h3>Facts</h3>

              <i class="fa fa-film"></i>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="icon-box box-primary">
              <div class="icon-box-contain">
                <i class="fa fa-clock-o fa-3x"></i>
                <h5>Run Time</h5>
                <p>
                  {{ movie.Runtime }}
                </p>
              </div>
              <i class="fa fa-clock-o icon-bg"></i>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="icon-box box-primary">
              <div class="icon-box-contain">
                <i class="fa fa-drivers-license-o fa-3x"></i>
                <h5>Rated</h5>
                <p>
                  {{ movie.Rated }}
                </p>
              </div>
              <i class="fa fa-drivers-license-o icon-bg"></i>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="icon-box box-primary">
              <div class="icon-box-contain">
                <i class="fa fa-calendar fa-3x"></i>
                <h5>Release Date</h5>
                <p>
                  {{ movie.Released }}
                </p>
              </div>
              <i class="fa fa-calendar icon-bg"></i>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="icon-box box-primary">
              <div class="icon-box-contain">
                <i class="fa fa-tags fa-3x"></i>
                <h5>Genres</h5>
                <p>
                  {{ movie.Genre }}
                </p>
              </div>
              <i class="fa fa-tags icon-bg"></i>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="icon-box box-primary">
              <div class="icon-box-contain">
                <i class="fa fa-ticket fa-3x"></i>
                <h5>Director</h5>
                <p>
                  {{ movie.Director }}
                </p>
              </div>
              <i class="fa fa-ticket icon-bg"></i>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4">
            <div class="icon-box box-primary">
              <div class="icon-box-contain">
                <i class="fa fa-smile-o fa-3x"></i>
                <h5>Actors</h5>
                <p>
                  {{ movie.Actors }}
                </p>
              </div>
              <i class="fa fa-smile-o icon-bg"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import movieTrailer from "movie-trailer";

export default {
  data: function () {
    return {
      movie: {},
      movieTrailer: "",
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
        this.movieTrailer = response.replace("watch?v=", "embed/");
      });
    },
    standardRating: function (rating) {
      var percent = "";
      if (rating.includes("%")) {
        percent = rating.replace("%", "");
        return parseInt(percent);
      } else if (rating.includes("/")) {
        var rated = rating.split("/");
        return (parseFloat(rated[0]) / parseInt(rated[1])) * 100;
      }
    },
  },
};
</script>
