<template>
  <div class="movies-index">
    <div class="contain-wrapp padding-bottom-40">
      <div class="container">
        <h2>Search for a Movie</h2>
        <form class="form-inline" v-on:submit.prevent="findMovie()">
          <div class="form-group">
            <div class="input-group">
              <input type="text" class="form-control" v-model="search" placeholder="Search by movie title..." />
            </div>
          </div>
          <button type="submit" class="btn-e btn-e-primary" v-on:click="findMovie" value="Search">Search</button>
        </form>
        <div class="divider divider-2x"></div>
        <div class="row">
          <!-- START - Article -->
          <div class="col-sm-8">
            <div v-if="movies" class="row">
              <!-- START - Post 1 -->
              <div v-for="movie in movies" v-bind:key="movie.imdbID" class="col-md-6">
                <article class="post">
                  <div class="img-wrapper">
                    <img
                      v-if="movie.Poster == 'N/A'"
                      src="https://quantum-soft.net/images/75x50-1/http://s2.1pic.org/files/2019/04/16/d9c3dc1540830681331f.jpg"
                      alt="Image not available"
                      class="img-fluid"
                    />
                    <img v-else :src="movie.Poster" class="img-fluid" alt="" />
                  </div>
                  <div class="post-heading">
                    <router-link class="btn-e btn-e-red btn-bordered" :to="`/movies/${movie.imdbID}`">
                      {{ movie.Title }} ({{ movie.Year }})
                    </router-link>
                  </div>
                </article>
              </div>
              <!-- END - Post 1 -->
            </div>
            <div v-else class="row">
              <p>Hmm... I can't find that movie. Please check your spelling and try again.</p>
            </div>

            <div class="clearfix"></div>
          </div>
          <!-- END - Article -->

          <!-- START - Aside -->
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
                    </div>
                  </div>
                </div>
              </div>
              <!-- END - Widget 2 -->
            </aside>
          </div>
          <!-- END - Aside -->
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
      console.log(response.data);
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
          console.log(response.data.Search);
        });
    },
    parsePublished: function (datetime) {
      var newTime = moment(datetime).format("l");
      return newTime;
    },
  },
};
</script>
