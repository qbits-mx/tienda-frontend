<template>

<div class="ancho centra">
  <div class="card defaultColor">

    <div class="card-header">
         <label class="control-label h4">Calificacion y Estrellas</label>
    </div><!-- ends card header -->

    <div class="card-body align" >

        <!-- Comentario -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="comentario">Comentario:</label>
          </div>
          <div class="col">
            <input type="text" required class="form-control" v-model = "comentario">
            <small class="notValid">Comentario no valido</small>
          </div>
        </div>

        <!-- Eatrellas -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="estrella">Estrellas:</label>
          </div>
          <div class="col">
            <input type="number" required class="form-control" v-model = "estrellas">
            <small class="notValid">Valor no valido</small>
          </div>
        </div>

        <!-- id -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="id">id:</label>
          </div>
          <div class="col">
            <input type="number" class="form-control" required v-model = "id">
            <small class="notValid">Valor no valido</small>
          </div>
        </div>

        <!-- button -->
        <div class="form-group row">
          <div class="col text-center" >
              <button
                :disabled="false"
                class="btn btn-success"
                @click="submition">Calificaccion y Estrella</button>
          </div>
        </div>

    </div><!-- ends card body -->

  </div><!-- ends card -->
</div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return{
            comentario: '',
            estrellas : '',
            id : ''
        }
    },
    methods: {
        submition() {
            let objectToSend = {
              comentario: this.comentario,
              estrellas: this.estrellas,
              id: this.id
            }
            let keyAcces = localStorage.getItem('vuex');
            keyAcces = JSON.parse(keyAcces)
            console.log(keyAcces)

            let infoUser = keyAcces.session.idUser;
            console.log("infoUser")
            console.log(infoUser)

            axios.put(`http://localhost:9999/api/crear-calificacion.json?comentario=${this.comentario}&estrellas=${this.estrellas}&id=${this.id}`, {params: objectToSend}).then(response => {
            //axios.put('http://localhost:9999/api/crear-calificacion.json?comentario='+ this.comentario + '&estrellas='+ this.estrellas + '&id=' +this.id}, {params: objectToSend}).then(response => {
            if(response.data) console.log(response.data);
            //router.push('confirma-registro');
            }).catch(e => console.log(e))
        }
    }

}
</script>

<style>

</style>

