<template>
  <div class="card w-75 mx-auto my-5">
    <div class="card-header" align="center">
      <h4 class="control-label mt-2">
        Bienvenido a la interfaz de administrador
      </h4>
    </div>
    <div class="card-body mx-3">
      <p class="text-center"><Strong>Por favor indica la opción que deseas realizar</Strong></p>

      <div class="row mb-3">
        <div class="col d-flex my-2">
          <botonAdmin colorTarjeta="rgba(58,194,58,0.56)" titulo="Gráficos" descripcion="Información visual en tiempo real"
                      link="reporte-graficas" icono="far fa-chart-bar fa-4x icono shrink" color="btn btn-success btn-block">
          </botonAdmin>
        </div>
        <div class="col d-flex my-2">
          <botonAdmin colorTarjeta="rgba(255,0,0,0.4)" titulo="Listado de Compras" descripcion="Pedidos realizados por clientes"
                      link="admin-compras" icono="fas fa-shopping-bag fa-4x icono shrink" color="btn btn-danger btn-block">
          </botonAdmin>
        </div>
      </div>
      <div class="row mb-3" >
        <div class="col d-flex my-2">
          <botonAdmin colorTarjeta="rgba(0,150,255,0.4)" titulo="Formatos multimedia" descripcion="Modifica los tipos de formatos multimedia soportados."
                      link="consulta-tipos-medias" icono="fas fa-compact-disc fa-4x icono shrink" color="btn btn-primary btn-block">
          </botonAdmin>
        </div>
        <div class="col d-flex my-2">
          <botonAdmin colorTarjeta="rgba(255,255,0,0.5)" titulo="Catálogos de Países" descripcion="Modifica países"
                      link="consulta-pais" icono="fas fa-globe-americas fa-4x icono shrink" color="btn btn-warning btn-block">
          </botonAdmin>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col d-flex my-2">
          <botonAdmin colorTarjeta="rgba(1,1,1,0.2)" titulo="Insertar Anuncio" descripcion="Genera un nuevo anuncio"
                      link="admin-anuncio" icono="fas fa-bone fa-4x icono shrink" color="btn btn-secondary btn-block">
          </botonAdmin>
        </div>
        <div class="col d-flex my-2">
          <botonAdmin colorTarjeta="rgba(0,170,200,0.4)" titulo="Editar Anuncio" descripcion="Modifica un anuncio ya existente"
                      link="admin-consulta-anuncio" icono="fas fa-pencil-alt fa-4x icono shrink" color="btn btn-info btn-block">
          </botonAdmin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
import botonAdmin from '@/components/botonAdmin';
export default {
    data: function () {
        return {
          a: store.state.session.nombreCompleto,
          b: store.state.session.correo,
          c: store.state.session.jwt,
          d: store.state.session.ultimoAcceso,
          e: store.state.session.roles,
          f: store.state.destination,
          g: store.state.session.idUser
        }
    },
    components: {
      'botonAdmin' : botonAdmin
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
  display: block;
  margin-top: 2.7em;
  font-weight: bold;
  color: rgb(7, 7, 7);
}

</style>
