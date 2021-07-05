<template>
  <div class="movies-index">
    <h2>Movies</h2>
    <div>
      <form v-on:submit.prevent="findMovie()">
        <input type="text" v-model="search" placeholder="Search by movie title..." />
        <input type="submit" v-on:click="findMovie" value="Search" />
      </form>
    </div>
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
    <div v-else><p>Hmm... I can't find that movie. Please check your spelling and try again.</p></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movies: [],
      search: "",
    };
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
  },
};
</script>
