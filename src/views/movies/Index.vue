<template>
  <div class="movies-index">
    <h2>Movies</h2>
    <div>
      <form v-on:submit.prevent="findMovie()">
        <input type="text" v-model="search" />
        <input type="submit" v-on:click="findMovie" value="Search" />
      </form>
    </div>
    <div v-for="movie in movies" v-bind:key="movie.imdbID">
      <router-link :to="`/movies/${movie.imdbID}`">
        <img
          v-if="movie.Poster == 'N/A'"
          src="https://quantum-soft.net/images/75x50-1/http://s2.1pic.org/files/2019/04/16/d9c3dc1540830681331f.jpg"
          alt="Image not available"
        />
        <img v-else :src="movie.Poster" :alt="movie.title" />
      </router-link>
      <h3>{{ movie.Title }} ({{ movie.Year }})</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movies: [],
      search: "",
      errors: [],
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
        })
        .catch((error) => {
          this.errors = error.response.data.error;
          console.log(this.errors);
        });
    },
  },
};
</script>
