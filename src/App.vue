<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="text-center mb-2">Buscar seguidores de GitHub</h1>
        <p class="text-center mb-2">Alejandro Martinez Martinez - DAWY</p>
      </div>
    </div>
    <!-- TODO: Añadir título de la página y nombre de autor -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-4">
          <input
            type="text"
            class="form-control mt-5"
            id="nombre"
            placeholder="Nombre usuario"
            v-model="usuario"
            @keydown.enter="consultarSeguidores"
          />
        </div>
      </div>
      <!-- TODO: Crear campo de texto para introducir el usuario -->
      <div class="row flex-row">
        <div v-if="existe">
          <SeguidorGitHub
            :seguidor="data"
            v-for="data in seguidores"
          ></SeguidorGitHub>
        </div>
        <!-- TODO: Crear componente de alerta de error -->
        <div
          v-if="error"
          class="alert alert-danger col m-5 justify-content-center"
          role="alert"
        >
          Usuario no encontrado
        </div>
      </div>
      <!-- TODO: Crear lista de seguidores llamando al componente SeguidorGitHub -->
    </div>
  </div>
</template>

<script>
// TODO: Importar componente SeguidorGitHub
import SeguidorGitHub from "./components/SeguidorGitHub";

export default {
  name: "App",
  components: {
    SeguidorGitHub,
    // TODO: Añadir componente SeguidorGitHub
  },
  data: function () {
    return {
      // TODO: Añadir variables de datos
      usuario: "",
      seguidores: {},
      existe: false,
      error: false,
    };
  },
  methods: {
    // TODO: Añadir método para obtener los seguidores del usuario a través de la API de GitHub
    // mediante petición AJAX con 'fetch'
    // TODO: Añadir la funcionalidad para mostrar u ocultar datos o mensajes de error
    consultarSeguidores: async function () {
      let url = "https://api.github.com/users/" + this.usuario + "/followers";
      var userAuth = process.env.VUE_APP_USERNAME || "user";
      var passAuth = process.env.VUE_APP_USERTOKEN || "pass";

      let headers = new Headers();
      headers.set("Authorization", "Basic " + btoa(userAuth + ":" + passAuth));

      await fetch(url, { method: "GET", headers: headers })
        .then((response) => response.json())
        .then((result) => {
          if (result.message == "Not Found") {
            this.existe = false;
            this.error = true;
          } else {
            this.seguidores = result;
            this.existe = true;
            this.error = false;
          }
        });
    },
    // TODO: Cómo hacer peticiones autenticadas con 'fetch'
    // Variables auxiliares

    // Ejemplo de paso de datos de autorización con fetch (ver la pregunta y la segunda respuesta): https://stackoverflow.com/questions/43842793/basic-authentication-with-fetch
  },
};
</script>

<style></style>
