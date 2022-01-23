<template>

  <div class="ancho centra">

    <!--div v-if="loading" class="loader"/-->

    <div class="row">
      <div class="col-md-5 col-lg-5 col-12">
        <img src="../assets/bicho1.jpg" width="100%"/>
      </div>
      <div class="col-md-7 col-lg-7 col-12">

        <div class="card defaultColor w-100">
       
        <!-- Este es el cambio   -->
          <div class="card-header">
            <label class="control-label h4">Nombre: {{this.result.nombre}}</label>
          </div>
        <!--  -->  

          <div class="card-header">
            <label class="control-label h4">Precio: {{this.result.precio}}</label>
          </div>
          
          <div class="card-header">
            <label class="control-label h4">Comprado el {{this.result.fecha}}</label>
          </div>
          <div class="card-header">
            <label class="control-label h4">Vendió: @{{this.result.nick_name}}</label>
          </div>
          <!-- ends card header -->

          <div class="card-body align">       
            <b-form-rating variant="warning" v-model="estrellas" readonly></b-form-rating> 

          </div><!-- ends card body -->
        </div><!-- ends card -->
          <!--div style="margin-left:650px">
            <button
                    @click="$router.push('chat')"
                    class="btn btn-success"
                    data-toggle="modal"
                    data-target="#termsModal">Ver Chat
            </button>
          </div-->
    
              <!--div v-if="mostrar" class="form-group">
              <div  class="form-group">
                <label for="exampleFormControlTextarea1">Comentario</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="mensaje"></textarea>
              </div--> 
      

        <form>
          <div class="card-header">
            <label class="control-label h4">Comentario:</label>
          </div>
          
          <div class="form-group">
           
            <input type="email" class="form-control" id="ejemplo_email_1"
                  placeholder="Introduce tu email">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

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
export default {
    data () {
        return {
            id : '',
            result: '',
            estrellas: 3,
            mensaje: "effefefefefefefef"
            
        }
        
    },
      beforeMount() {
          this.getConsulta();
      },
     methods: {
        getConsulta(){
           /* aqui vemos el Id */
            /*let keyAcces = localStorage.getItem('vuex');
            keyAcces = JSON.parse(keyAcces)
            console.log(keyAcces)

            let infoUser = keyAcces.session.idUser;
            console.log("infoUser")
            console.log(infoUser)*/
            axios.get('http://localhost:9999/api/obtener-info-comprado.json?idAnuncio=1')
            .then( res =>{
                this.result = res.data;
                console.log(this.result);
                //console.log(store.state.session.idUser);
            }).catch(e => console.log(e))
        }


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