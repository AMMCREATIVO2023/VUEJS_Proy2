<template>
  <div>
    <!-- TODO: Crear componente SeguidorGitHub -->
    <div class="card m-5">
      <img
        :src="seguidor.avatar_url"
        class="card-img-top"
        alt="imagen seguidor"
      />
      <div class="card-body">
        <h5 class="card-title">{{ seguidor.login }}</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a :href="seguidor.html_url" class="btn btn-primary">Ir a GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeguidorGitHub",
  props: [
    // TODO
    "seguidor",
  ],
};
</script>

<style scoped></style>
