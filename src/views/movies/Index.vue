<template>
  <div class="movies-index">
    <div class="inner-head">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <i class="fa fa-film"></i>
            <h4>
              <span>Movies</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$parent.flashMessage" class="">
      <div class="alert alert-info alert-dismissible container" role="alert">
        <button
          v-on:click="$parent.flashMessage = ''"
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span>×</span>
        </button>
        <i class="fa fa-check-circle"></i>
        {{ $parent.flashMessage }}
      </div>
    </div>
    <div class="contain-wrapp padding-bottom-40">
      <div class="container">
        <form class="form-inline" v-on:submit.prevent="findMovie()">
          <div class="form-group">
            <div class="input-group">
              <input type="text" class="form-control" v-model="search" placeholder="Search by movie title..." />
            </div>
          </div>
          <button type="submit" class="btn-e btn-e-primary" v-on:click="findMovie" value="Search">Search</button>
        </form>
        <div class="divider divider-dashed"></div>
        <div class="row">
          <!-- START - Article -->
          <div class="col-sm-8">
            <!-- START - MOVIE POSTERS -->
            <div v-if="movies" class="row">
              <div v-for="movie in movies" v-bind:key="movie.imdbID" class="col-md-6">
                <div class="thumbnail thumbnail-red team-wrapp">
                  <div class="img-wrapper">
                    <img
                      v-if="movie.Poster == 'N/A'"
                      src="/img/poster_missing.jpeg"
                      alt="Image not available"
                      class="img-fluid"
                    />
                    <img v-else :src="movie.Poster" class="img-fluid" alt="Movie Poster" />
                  </div>
                  <div class="caption">
                    <h5>{{ movie.Title }}</h5>
                    <p>{{ movie.Year }}</p>
                  </div>
                  <div class="team-network-bottom">
                    <router-link :to="`/movies/${movie.imdbID}`" class="btn-e btn-e-default hvr-icon-float-away">
                      <i class="fa fa-film"></i>
                      More info
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- END - MOVIE POSTERS -->
            </div>
            <!-- START - SEARCH ERROR HANDLING -->
            <div v-else class="row">
              <p>Hmm... I can't find that movie. Please check your spelling and try again.</p>
            </div>
            <!-- END - SEARCH ERROR HANDLING -->
            <div class="clearfix"></div>
          </div>
          <!-- END - Article -->

          <!-- START - TOP MOVIE ARTICLES -->
          <div class="col-12 col-sm-4">
            <aside>
              <!-- START - Widget 2 -->
              <div class="widget">
                <h5 class="widget-head">Top Movie Articles</h5>
                <div class="recent-widget">
                  <div v-for="article in articles" v-bind:key="article.title" class="post">
                    <div class="post-heading post-thumbnail">
                      <a href="javascript:void(0);" class="post-thumbnail">
                        <img :src="article.urlToImage" class="img-thumb" alt="" />
                      </a>
                      <h6>
                        <a :href="article.url" target="_blank">{{ article.title }}</a>
                      </h6>
                      <p>{{ parsePublished(article.publishedAt) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- END - Widget 2 -->
            </aside>
          </div>
          <!-- END - TOP MOVIE ARTICLES -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function () {
    return {
      movies: [],
      search: "",
      articles: [],
    };
  },
  created: function () {
    axios.get("/movies_news").then((response) => {
      this.articles = response.data;
    });
  },
  methods: {
    findMovie: function () {
      axios
        .get("/movies", {
          params: {
            movie: this.search,
          },
        })
        .then((response) => {
          this.movies = response.data.Search;
        });
    },
    parsePublished: function (datetime) {
      var newTime = moment(datetime).format("l");
      return newTime;
    },
  },
};
</script>
