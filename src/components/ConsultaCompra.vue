<template>
  <div class="ancho centra">
    <div class="row">
      <div class="col-md-5 col-lg-5 col-12">
        <img v-bind:src="imagePath" width="100%"/>      </div>
      <div class="col-md-7 col-lg-7 col-12">

        <div class="card defaultColor w-100">
          <div class="card-header">
            <label class="control-label h4">Nombre: {{this.result.nombre}}</label>
          </div>

          <div class="card-header">
            <label class="control-label h4">Precio: {{this.result.precio}}</label>
          </div>
          
          <div class="card-header">
            <label class="control-label h4">Comprado el {{this.result.fecha}}</label>
          </div>
          <div class="card-header">
            <label class="control-label h4">Vendió: {{this.result.nick_name}}</label>
          </div>
        
        </div>


        <form>
          <div v-if = "result.estrellas == 0 "  class="card-body align">       
            <b-form-rating  show-clear variant="warning" v-model="value"></b-form-rating>
          </div>
          <div v-else>
            <b-form-rating variant="warning" v-model="result.estrellas" class="from-control1" readonly></b-form-rating> 
          </div>

          
          <div class="card-header" v-if="!hayComentario && this.result.estrellas <= 0">
            <label class="control-label h4">Comentario:</label>
          </div>

          <div v-if="hayComentario && result.comentario_aprobado == 1" class="form-floating mb-3">
            <label for="floatingInput">{{this.result.comentario}}</label>
          </div>
      
       
          
          <div v-if="!hayComentario && this.result.estrellas <= 0">
            <p> <textarea  name="mensaje" id="msj" v-model="comentario" cols="30" rows="5" placeholder="Escriba un comentario" class="form-control"></textarea></p>
          </div>
          <div class="form-group row">
             <div class="col text-center" >
                  <button  class="btn btn--radius btn--green" @click="pagiAnterior"><i class="fas fa-arrow-left"></i>&nbsp;&nbsp;Regresar </button> 
                                
              </div>
               <div class="col text-center" >
                     <button class="btn btn--radius btn--green" type="button" v-if="this.result.estrellas <= 0" :disabled="habilitaBoton" @click="submition()">Enviar</button>
              </div>
          </div> 
        </form>
      </div>
    </div>

  </div>
</template>



<script>

import axios from 'axios';
import router from '../router'
export default {
      data () {
        return {
            id : '',
            result: '',
            value: null,
            hayComentario: false,
            comentario:'',
            multimedia: '',
            imagePath: require('../assets/portada.png'),
        }
        
    },
      beforeMount() {
          this.id = Number(localStorage.getItem('id'));
          this.getConsulta();
          //console.log();
          this.getMultimedia();
      },
      computed:{
          habilitaBoton: function() {
            return !this.value  ;
          }
        },
     methods: {
       vista(){
          if(this.result.comentario != null && this.result.comentario.length > 0 && this.result.comentario_aprobado == 1){
            this.hayComentario = true;
          }

        },
        getConsulta(){
            axios.get('api/obtener-info-comprado.json?idAnuncio=' + this.id)
            .then( res =>{
                this.result = res.data;
                console.log(this.result)
            }).catch(e => console.log(e))
        },
        getMultimedia() {
          axios.get('/api/conseguir-multimedia.json?idAnuncio=' + this.id)
          .then(response => {
            this.vista()
            console.log(response);
            if(response.data.length != 0){
              console.log("NOoo entra aquiii")
              response.data.forEach(element => {
                if(element.tipo === "imagen"){ 
                  console.log(element.url)
                  this.imagePath = element.url;
                }
              });
            }
      }).catch(error => {
          console.log(error);
      })
    },
        captureMyMessage(mess){
          console.log(mess);
        },
        pagiAnterior: function() {
        router.push({'name':'historial-compras'});
        },
        async submition() {
          await axios.put(`api/crear-calificacion-anuncio.json?comentario=${this.comentario}&estrellas=${this.value}&id=${this.id}`).then(response => {
          this.vista()
          if(response.data)  console.log(response.data);
          }).catch(e => console.log(e))

          window.location.reload();
        },
        
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ancho {
  padding: 20px;
}

.form- {
  /*width: 200px;*/
  width: 100%;
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
.card-header {
    padding: 1rem 1.25rem;
    margin-bottom: 1%;
    background-color: #c0c0c0;
    border-bottom: 1px solid rgba(0,0,0,.125);
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
/* Color del boton enviar */
.btn--green {
  background: #57b846;
  display: block;
    width: 100%;
     text-align: center;;
}
div.w-33 {
  width: 33.33%;
  background-color: orange;
}

div.center {
  text-align: center;
}
/*.btn-primary.disabled, .btn-primary:disabled {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}
.trans{
  width: 400px;
  background-color: red;
  display: flex;
  justify-content: center;
}
.btn-block {
    display: block;
    width: 80%;
}
.btn-primary {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}
:disabled {
    color: #fff;
    background-color: grey;
    border-color: grey;
}

.btn btn-primary btn-block {
    color: #fff;
    background-color: grey;
    border-color: gray;
    
}*/
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
.form-control1 {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 6px solid #ced4da;
    border-radius: 0rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.col-lg-7 {
    flex: 0 0 58.333333%;
    max-width: 40%;
}


.card-header[data-v-56c3f6fa] {
    padding: .1rem 1.25rem;
    margin-bottom: 1%;
    background-color: #c0c0c0;
    border-bottom: 1px solid rgba(0,0,0,.125);
}
textarea {
  resize: none;
}



</style>