<template>

  <div class="ancho centra">

    <div v-if="loading" class="loader"/>

    <div class="row">
      <div class="col-md-5 col-lg-5 col-12">
        <img :src="anuncio.image" width="100%"/>
      </div>
      <div class="col-md-7 col-lg-7 col-12">

        <div class="card defaultColor w-100">

          <div class="card-header">
            <label class="control-label h4">Precio: {{anuncio.precio || 50.20}}</label>
          </div><!-- ends card header -->

          <div class="card-body align">
            <div class="card">
              {{anuncio.nombre || "Audifonos Skull Candy"}}
              <div class="card-body">
                {{anuncio.descripcion || "Audífonos Over-Ear Studio3 Wireless con cancelación de Ruido, Chip W1 para audífonos diseñado por Apple, Bluetooth Class 1, cancelación de Ruido Activa, 22 Horas de Audio - Negro"}}
              </div>
            </div>

            <div class="row justify-content-around">
              <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" v-model="idCatalogoFormaPago" value="1">
                  <label class="form-check-label" >
                    Efectivo
                  </label>
                </div>
              </div>
              <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" v-model="idCatalogoFormaPago" value="2" >
                  <label class="form-check-label" >
                    Transferencia bancaria
                  </label>
                </div>
              </div>
            </div>
            <div class="row justify-content-around">
              <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" v-model="idCatalogoFormaPago" value="3">
                  <label class="form-check-label" >
                    Tarjeta de débito
                  </label>
                </div>
              </div>
              <div class="col-4">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault"  v-model="idCatalogoFormaPago" value="4">
                  <label class="form-check-label">
                    Tarjeta de crédito
                  </label>
                </div>
              </div>
            </div>


            <!-- button -->
            <div class="form-group row">
              <div class="col text-center">
                <div v-if="true">
                  <button type="button" class="btn btn-lg btn-primary" enabled @click="actualizaCompra" v-if=anuncio.activo>Comprar</button>
                  <button type="button" class="btn btn-lg btn-primary" disabled v-else>Comprar</button>
                </div>
                
              
                <!--          Modal-->

              </div>
            </div>
            <b-form-rating v-model="anuncio.estrellas" readonly></b-form-rating> 

          </div><!-- ends card body -->
        </div><!-- ends card -->
        
          <div style="margin-left:650px">
          
          </div>

          <div class="card border-light mb-3" style="max-width: 36rem;">
            <div class="card-header">Comentarios</div>
            <div class="card-body">
              <h5 class="card-title">Usuario</h5>
              <p class="card-text">Aqui van los comentarios...</p>
            </div>
          </div>

        <!-- Empieza chat -->
        <div class="card-header">
            <label class="control-label h4">Chat</label>
            <Chat v-bind:chatList="chatList" v-bind:idAnuncio=this.id.substring(0) v-bind:idRemitente= this.idUsuario />
        </div>

      </div>
    </div>

  </div>

</template>

<script>


import axios from 'axios';

import store from '../store'

import Chat from './Chat'

export default {
  components: {
    Chat
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      msgErr: '',
      target: '',
      anuncio: {},
      loading: false,
      idCatalogoFormaPago: '1',
      chatList: [],
      soyVendedorb : '',
      idUsuario : store.state.session.detalles.id
    }
  },
  watch: {},
  computed: {},
  methods: {
    obtenerAnuncio() {
      this.loading = true;
      axios.get("api/dame-anuncio.json?idAnuncio=" + this.id).then(({data}) => {
        this.anuncio = data;
      }).finally(() => {
        this.loading = false;
      });
    },
    actualizaCompra(){
      const idUsuario = store.state.session.id || 0;
      this.loading = true;
      axios("api/actualiza-compra.json?idCatalogoFormaPago="+this.idCatalogoFormaPago+"&idComprador="+idUsuario+"&idProducto="+this.anuncio.id+"&idComprado="+this.anuncio.comprado)
          .then(() => {
            this.obtenerAnuncio();
          })
          .finally(() => {
        this.loading = false;
      })
    },
    soyVendedor(id){
      console.log("idRemitente = " + id)
      axios("/api/soy-vendedor.json?idAnuncio="+this.id.substring(0) +"&idRemitente="+id)
          .then(x => {
            this.soyVendedorb = x.data;
          })
      console.log("idAnuncio = " + this.id[1])
    },
    cargaMensajes(id){
      //Hacer comprobacion de si es comprador o vendedor
      //Revisar si es comprador, vendedor.
      if (this.soyVendedorb) {
        axios.get("api/get-conversaciones.json?idAnuncio="+id)
          .then( x => {
            this.chatList = x.data;
          })        
      }else{

        axios.get("/api/get-conversacion.json?idAnuncio="+id+ "&idHiloPadre="+this.idUsuario)
          .then( x => {
            if (this.chatList.length === 0){
              this.chatList.push(x.data);
            }else{
              this.chatList.pop();
              this.chatList.push(x.data);

            }
          })
      }


     }
  },

  mounted() {
    store.commit('setToggleHeader', true);
    store.commit('setToggleFooter', true);
    this.soyVendedor(this.idUsuario);
    setInterval(function() {
      this.cargaMensajes(this.id.substring(0)); }.bind(this) , 500);

      this.obtenerAnuncio();

  },
  created(){

  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ancho {
  padding: 20px;
}
.align {
  text-align: left;
}
.centra {
  text-align: center;
}
.notValid {
  color: rgb(235, 74, 74);
}
.greenColor:focus {
  background-color: #eefaee;
  box-shadow: 2px 1px 4px #bdd3ae;
}
input {
  padding-right: 15%;
}
.correct {
  border-color: rgb(96, 161, 99);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/check.png) no-repeat scroll;
  background-position: right;
  background-size: 17px;
  background-position-x: 96%;
}
.redColor:focus {
  background-color: #fff3f3;
  box-shadow: 2px 1px 4px #dba6a6;
}
.incorrect {
  border-color: rgb(235, 74, 74);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/danger.jpg) no-repeat scroll;
  background-position: right;
  background-size: 20px;
  background-position-x: 96%;
}
.defaultColor {
  background-color: white;
  box-shadow: 1px 1px 3px #d8dcdd;
}
.hidden {
  display: none;
}
.show {
  display: block;
}
.combo {
  margin-bottom: 5px;
}
.info {
  font-size: 10px;
}
.g-recaptcha {
  transform: scale(0.9);
  transform-origin: 0 0;
}
.collapse {
&
:not(.show) {
  display: none;
}
}
.collapsing {
  height: 0;
  overflow: hidden;
  @include transition($transition-collapse);
&
.collapse-horizontal {
  width: 0;
  height: auto;
  @include transition($transition-collapse-width);
}
}
</style>
