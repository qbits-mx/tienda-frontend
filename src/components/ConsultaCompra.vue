<template>

  <div class="ancho centra">

    <div v-if="loading" class="loader"/>

    <div class="row">
      <div class="col-md-5 col-lg-5 col-12">
        <img src="../assets/bicho1.jpg" width="100%"/>
      </div>
      <div class="col-md-7 col-lg-7 col-12">

        <div class="card defaultColor w-100">
       
        <!-- Este es el cambio   -->
          <div class="card-header">
            <label class="control-label h4">Nombre: {{anuncio.nombre || 50.20}}</label>
          </div>
        <!--  -->  

          <div class="card-header">
            <label class="control-label h4">Precio: {{anuncio.precio || 50.20}}</label>
          </div><!-- ends card header -->

          <div class="card-body align">
            <div class="card">
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


           
            <b-form-rating v-model="anuncio.estrellas" readonly></b-form-rating> 

          </div><!-- ends card body -->
        </div><!-- ends card -->
          <div style="margin-left:650px">
            <button
                    @click="$router.push('chat')"
                    class="btn btn-success"
                    data-toggle="modal"
                    data-target="#termsModal">Ver Chat
            </button>
          </div>

           <!--div class="form-group">
              <label for="exampleInputComentario">Comentario</label>
                <input type="text" class="form-control" id="exampleInputComentario" aria-describedby="emailHelp" placeholder="Comentario de anuncio">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div-->

              <div v-if="mostrar" class="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>


        <!--div class="card border-light mb-3" style="max-width: 36rem;">
          <div class="card-header">Comentarios del anuncio filtrado</div>
            <div class="card-body">
               <h5 class="card-title">Usuario del vendedor</h5>
                <p class="card-text">Aqui van los comentarios...</p>
            </div>
        </div-->


      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios';
import store from '../store'
export default {
  components: {
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
      mostrar: true
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
      axios("api/actualiza-compra.json?idCatalogoFormaPago="+this.idCatalogoFormaPago+"&idComprador="+idUsuario+"&idProducto="+this.anuncio.id+"&idComprado="+this.anuncio.comprado+"&precio="+this.anuncio.precio)
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
    this.obtenerAnuncio();
  }
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

</style>