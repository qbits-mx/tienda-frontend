<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header card-custom-header">
        <label class="control-label h4">Bienvenido</label>
        <br />
        <label class="control-label"
          >Esta es la página principal del sistema 858</label
        >
      </div>
      <div class="card-body align">
        <div class="row">
          <div class="col-sm-12">
            <img src="../assets/portada.png" width="100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";

export default {
  methods: {
    consultaAnuncios(idCatInit) {
      router
        .push({ path: "/ui/consulta-anuncios-publico/" + idCatInit })
        .catch(() => {});
    },
  },
};
</script>
