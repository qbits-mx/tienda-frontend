<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header">
        <label class="h4">Cambia tu clave</label>
      </div>
      <div class="card-body align">
          <br>
          <div class ="form-group form-row">
            <div class="col-sm-4">
              <label for="clave">Clave nueva:</label>
            </div>
            <div class = "col form-group">
              <input
                type="password"
                :class="claveClass"
                class="form-control"
                id="clave"
                placeholder="******"
                v-model="clave" >
              <div v-for="(message, index) in info" :key="index">
                <label class="small">{{ message }}</label>
              </div>
            </div>
          </div>
          <div class ="form-group form-row">
            <div class="col-sm-4">
              <label for="clave">Confirmación:</label>
            </div>
            <div class = "col form-group">
              <input
                type="password"
                :class="confirmaClass"
                class="form-control"
                id="token"
                placeholder="******"
                v-model="confirma">
              <label class="small">{{ clavesDiferentes }}</label>
            </div>
          </div>


        <div class="form-group row text-center">
          <div class="col text-center">
            <button type="button" class="btn btn-success" @click="cambiaClave">Cambiar mi clave</button>
          </div>
        </div>

      </div>
    </div>


      <Aviso
      ref='avisoComp'
      ancho='420'
      target=''
      :avisoMsg=modalMessage
      :avisoTitulo=modalTitulo />

  </div>

</template>

<script>
import axios from 'axios'
import store from '../store'
import Aviso from './custom/dialog/Aviso'

export default {
    data: function () {
        return {
          modalTitulo: 'Error en el cambio de clave',
          modalMessage: '',
          clave: '',
          info:'',
          clavesDiferentes: '',
          confirma: '',
          claveClass:'',
          confirmaClass:''
        }
    },
    components: {
      'Aviso': Aviso
    },
    methods: {
      cambiaClave: function() {
            this.clavesDiferentes = '';
            this.confirmaClass ='greenColor correct';
            this.info='';
            this.claveClass='';

            if(this.clave != this.confirma) {
                this.clavesDiferentes = 'La clave y su confirmación no coinciden';
                this.confirmaClass ='redColor incorrect';
                return;
            }

            axios.put('/api/cambia-clave.json', {
                usuario: store.state.session.correo,
                clave: this.clave,
            },
            {
              headers: {
                'jwt': store.state.session.jwt
              }
            }
            ).then(response => {
                var usuario = response.data;
                console.log(usuario.correo);
                //router.push('/');
                  this.modalTitulo = 'Aviso'
                  this.modalMessage = 'Clave cambiada exitosamente';
                  //this.target='/ui/login'
                  this.$refs.avisoComp.abre();
            }).catch(error => {
                // el catch ocurre aun si el post está bien pero ud es null, por ejemplo !!!!
                if(error.response) {
                  this.info = error.response.data['strengthViolations'];
                  this.claveClass='redColor incorrect';
                } else {
                  this.modalTitulo = 'Error general de sistema'
                  this.modalMessage = error;
                  this.$refs.avisoComp.abre();
                }

            })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ancho {
  max-width: 340px;
}
.small {
  color:#ff0000;
}
.aceptar {
  text-align: right;
  margin-bottom: 100px;
  padding-bottom: 100px;
}
.greenColor:focus{
  background-color: #eefaee;
  box-shadow: 2px 1px 4px #bdd3ae;
}

.correct{
  border-color:rgb(96, 161, 99);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/check.png) no-repeat scroll;
  background-position:right ;
  background-size: 17px;
  background-position-x: 96%;
}

.redColor:focus{
  background-color:   #fff3f3  ;
  box-shadow: 2px 1px 4px #dba6a6;
}

.incorrect{
  border-color:rgb(235, 74, 74);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/danger.jpg) no-repeat scroll;
  background-position:right ;
  background-size: 20px;
  background-position-x: 96%;
}

</style>
