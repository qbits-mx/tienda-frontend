<template>

  <div id = "carrito">
  <a href="#" class="mr-4" data-toggle="modal" data-target="#kartModal" @click="actualiza" >
    <div class="icon-wrapper" style="font-size: 9px;">
      <i class="fas fa-shopping-cart fa-3x icon-black" style="color: green"></i>
      <span class="badge my-auto" >{{ cantidad  }}</span>
    </div>
  </a>

  <!--          Modal-->
  <div class="modal fade" id="kartModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header mb-2 bg-light">
          <h5 class="modal-title ml-4" >
            <b>Mi carrito de compras</b>
          </h5>
          <button type="button" class="close mr-2" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body mx-2">
          <div class="row ">
            <table v-if="!vacio" class="table mx-4">
              <thead>
              <tr align="center">
                <th></th>
                <th scope="col" >Mascota</th>
                <th scope="col">Precio</th>
                <th scope="col">Quitar</th>
              </tr>
              </thead>
              <tr v-for="mascota in shoppingKart" :key="mascota.idAnuncio" align="center" >
                <td v-if="mascota.urlImagen.split('.').pop() !== 'mp4'" class="w-25 tamanoImg">
                  <img :src=mascota.urlImagen class="mw-100 img-thumbnail" style="max-height: 80px;" height="auto" width="60%">
                </td>
                <td v-else class="w-25 tamanoImg">
                  <video :src=getVideoUrl(mascota.urlImagen) class="mw-100 img-thumbnail" poster="../assets/processing.gif" style="max-height: 80px;" height="auto" width="60%"></video>
                </td>
                <td style="padding: 3% 0;">{{mascota.titulo}}</td>
                <td style="padding: 3% 0;" >${{mascota.precio}}</td>
                <td style="padding: 3% 0;"><button type="button" class="btn btn-danger btn-sm px-2 py-0" @click="deleteElement(mascota.idCarrito)">x</button> </td>
              </tr>
              <tr align="center">
                <th></th><th></th>
                <th>Subtotal: </th>
                <th align="left"> ${{total}}</th>
              </tr>
            </table>
            <div v-if="vacio" class="row mx-auto">
              <div class="col" align="center">
                <p style="font-size: large; font-family: Purisa">Tu carrito está vacío</p>
                <img src="../assets/empty-cart.svg" alt="carro sin items" class="w-50 mb-4">
                <p style="font-family: Purisa">Comienza agregando una mascota</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!vacio" class="modal-footer border-top-0 d-flex justify-content-between px-5">
          <button type="button" class="btn btn-warning" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-success" @click="navega('/ui/detalle-pago')" data-dismiss="modal">Proceder al pago</button>
        </div>
      </div>
    </div>
  </div>

  </div>

</template>

<script>

import axios from 'axios';
import store from '../store'
import router from '../router'

export default {
  props : {
    cantidad: Number
  },
  watch: {
    shoppingKart(value) {
      this.vacio = (value.length === 0) ? true : false;
    }
  },
  data () {
    return{
      total : 0,
      tavo : '',
      vacio : true,
      shoppingKart : [],
      url_video : process.env.VUE_APP_URL_MEDIA_VIDEO,
      url_img : process.env.VUE_APP_URL_MEDIA,
    }
  },
  mounted() {
    this.shoppingKart = store.state.session.carrito;
    this.calcula();
  },
  methods : {
    navega: function(url) {
      router.push(url).catch(()=>{});
      this.ruta=url;
    },
    calcula: function() {
      var i = 0;
      for (const elem of this.shoppingKart) {
        i = i + elem.precio;
      }
      this.total = i;
    },
    getVideoUrl(url){
      return url.replace(this.url_img, this.url_video);
    },
    actualiza() {
      axios.get('/api/carritoVista/'+store.state.session.idUser+'.json', {}).then(response => {
        store.commit('setCarrito', response.data);
        this.shoppingKart = response.data;
        this.calcula();
      }).catch(e => {
        console.log(e);
      });
    },
    deleteElement(i) {
      axios.delete('/api/carrito/'+i+'.json').then (response => {
        if(response!=null) {console.log("OK");}
        this.actualiza();
      }).catch(e => {
        console.log(e);
      });
    }
  }
}
</script>

<style scoped>
.icon-wrapper{
    position: relative;
    float: left;
}

i {
    width: 100px;
    text-align: center;
    vertical-align: middle;
}

.badge{
    color: #484b61;
    background-color: #e8c01a;
    width: auto;
    height: auto;
    margin: 0;
    border-radius: 50%;
    position: absolute;
    border-style: solid;
    border-width: thin ;
    border-color: #af8e16;
    right: 28px;
    top: -8px;
    font-size: 11px;
}
</style>