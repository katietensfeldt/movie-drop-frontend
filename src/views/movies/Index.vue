<template>
  <div class="movies-index">
    <div class="contain-wrapp padding-clear padding-bottom-30">
      <!-- START - Gallery Filter  -->
      <ul class="filter-items filter-wrapp">
        <form v-on:submit.prevent="findMovie()">
          <li>
            <input class="form-control" type="text" v-model="search" placeholder="Search by movie title..." />
          </li>
          <li>
            <input class="btn-e btn-e-primary" type="submit" v-on:click="findMovie" value="Search" />
          </li>
        </form>
      </ul>
      <!-- END - Gallery Filter -->
      <div v-if="movies" class="container">
        <div class="row">
          <div class="col-12">
            <!-- START - Images Gallery -->
            <div id="gallery" class="masonry gallery" style="position: relative; height: 1581px">
              <div class="row">
                <!-- START - Gallery 01 -->
                <div
                  data-filter="web"
                  class="grid-item col-x12 col-md-4"
                  style="position: absolute; left: 0px; top: 0px"
                >
                  <div class="img-wrapper">
                    <div class="img-caption ecadaZoomIn animated zoomOut">
                      <a href="img/gallery/img01_380x380.jpg" data-pretty="prettyPhoto" class="zoomer">
                        <i class="fa fa-search"></i>
                      </a>
                      <h5><a href="portfolio_single_item.html">Project Title</a></h5>
                      <a href="javascript:void(0);" class="img-categorie">Web design</a>
                    </div>
                    <img src="img/gallery/img01_380x380.jpg" class="img-fluid" alt="" />
                  </div>
                  <div class="img-containt text-center">
                    <h5><a href="portfolio_single_item.html">Project Title</a></h5>
                    <a href="javascript:void(0);">Web design</a>
                    <ul class="img-footer">
                      <li>
                        <i class="fa fa-download"></i>
                        233
                      </li>
                      <li>
                        <i class="fa fa-heart"></i>
                        612
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- END - Gallery 01 -->
              </div>
            </div>
            <!-- END - Images Gallery -->
          </div>
        </div>
      </div>
      <div v-if="!search" class="container">
        <div class="row">
          <div class="col-12">
            <!-- START - Images Gallery -->
            <div id="gallery" class="masonry gallery" style="position: relative; height: 1770px">
              <div class="row">
                <!-- START - Gallery 01 -->
                <div
                  v-for="article in articles"
                  v-bind:key="article.title"
                  class="grid-item col-12"
                  style="position: absolute; left: 0px; top: 0px"
                >
                  <div class="column-wrapper">
                    <div class="img-containt half-column">
                      <h5>{{ article.title }}</h5>
                      <p>
                        {{ article.description }}
                      </p>
                      <p>
                        <a :href="article.url" target="_blank" class="btn-e btn-e-default btn-sm">Read more</a>
                      </p>
                      <ul class="img-footer">
                        <li>
                          {{ parsePublished(article.publishedAt) }}
                        </li>
                        <li>
                          {{ article.source.name }}
                        </li>
                      </ul>
                    </div>
                    <div class="img-wrapper half-column">
                      <img :src="article.urlToImage" class="img-fluid" alt="" />
                    </div>
                  </div>
                </div>
                <!-- END - Gallery 01 -->
              </div>
            </div>
            <!-- END - Images Gallery -->
          </div>
        </div>
      </div>
    </div>
    <h2>Search for a Movie</h2>
    <div>
      <form v-on:submit.prevent="findMovie()">
        <input type="text" v-model="search" placeholder="Search by movie title..." />
        <input type="submit" v-on:click="findMovie" value="Search" />
      </form>
    </div>

    <!-- Movie search results -->
    <div v-if="movies">
      <div v-for="movie in movies" v-bind:key="movie.imdbID">
        <router-link :to="`/movies/${movie.imdbID}`">
          <img
            v-if="movie.Poster == 'N/A'"
            src="https://quantum-soft.net/images/75x50-1/http://s2.1pic.org/files/2019/04/16/d9c3dc1540830681331f.jpg"
            alt="Image not available"
          />
          <img v-else :src="movie.Poster" :alt="`Poster for ${movie.title}`" />
        </router-link>
        <h3>{{ movie.Title }} ({{ movie.Year }})</h3>
      </div>
    </div>

    <!-- Error handling if movie title can't be found -->
    <div v-else><p>Hmm... I can't find that movie. Please check your spelling and try again.</p></div>

    <!-- Displays the latest movies news articles if the user has not started to search for a movie -->
    <div v-if="!search">
      <h3>Movie News Today</h3>
      <div v-for="article in articles" v-bind:key="article.title">
        <a :href="article.url" target="_blank">
          <h4>{{ article.title }}</h4>
          <h6>Published: {{ parsePublished(article.publishedAt) }}</h6>
          <p>Source: {{ article.source.name }} || Author: {{ article.author }}</p>
          <img :src="article.urlToImage" alt="Article image" />
        </a>

        <p>{{ article.description }}</p>
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
