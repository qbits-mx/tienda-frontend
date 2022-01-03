<template>

  <div class="ancho centra">

    <div v-if="loading" class="loader"/>

    <div class="row">
      <div class="col-md-5 col-lg-5 col-12">
        <img src="../assets/audifonos.jpg" width="100%"/>
      </div>
      <div class="col-md-7 col-lg-7 col-12">

        <div class="card defaultColor w-100">

          <div class="card-header">
            <label class="control-label h4">Comprar producto</label>
          </div><!-- ends card header -->

          <div class="card-body align">

            <div class="card">
              <div class="card-body">
                {{anuncio.descripcion}}
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
                <button
                    @click="actualizaCompra"
                    class="btn btn-success"
                    data-toggle="modal"
                    data-target="#termsModal">Comprar
                </button>

                <!--          Modal-->

              </div>
            </div>
            <b-form-rating v-model="anuncio.estrellas" readonly></b-form-rating>
          </div><!-- ends card body -->

        </div><!-- ends card -->
        
        <!-- Empieza chat -->
        <div class="card-header">
            <label class="control-label h4">Chat</label>
            <Chat v-bind:chatList="chatList" v-bind:idAnuncio=1 v-bind:idRemitente= this.idUsuario  v-bind:idHiloPadre= [1,3] />
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
      axios("api/actualiza-compra.json?idCatalogoFormaPago="+this.idCatalogoFormaPago+"&idComprador="+idUsuario+"&idProducto="+this.anuncio.id)
          .then(() => {
            this.obtenerAnuncio();
          })
          .finally(() => {
        this.loading = false;
      })
    }
  },
  mounted() {
    store.commit('setToggleHeader', true);
    store.commit('setToggleFooter', true);
    this.chatList=[
      [{
        id: 1,
        idAnuncio: 1,
        idRemitente : 2,
        idHiloPadre : 2,
        mensaje: "Hola quiero el sillon",
        fecha: "2021-12-10" 
      },
      {
        id: 2,
        idAnuncio: 1,
        idRemitente : 1,
        idHiloPadre : 2,
        mensaje: "Pero le cayo cafe, importa?",
        fecha: "2021-12-10" 
      },
      {
        id: 3,
        idAnuncio: 1,
        idRemitente : 2,
        idHiloPadre : 2,
        mensaje: "No, no importa?",
        fecha: "2021-12-10" 
      },
      {
        id: 4,
        idAnuncio: 1,
        idRemitente : 1,
        idHiloPadre : 2,
        mensaje: "ok",
        fecha: "2021-12-11" 
      }],

      [
      {
        id: 5,
        idAnuncio: 1,
        idRemitente : 3,
        idHiloPadre : 3,
        mensaje: "Buenas",
        fecha: "2021-12-11" 
      },
      {
        id: 6,
        idAnuncio: 1,
        idRemitente : 3,
        idHiloPadre : 3,
        mensaje: "Noches",
        fecha: "2021-12-11" 
      },
      {
        id: 7,
        idAnuncio: 1,
        idRemitente : 3,
        idHiloPadre : 3,
        mensaje: "Tiene un sillon nuevo?",
        fecha: "2021-12-11" 
      },
      {
        id: 8,
        idAnuncio: 1,
        idRemitente : 1,
        idHiloPadre : 3,
        mensaje: "No, solo este que esta en la foto",
        fecha: "2021-12-11" 
      }],
    ]
    //this.obtenerAnuncio();


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
