<!-- >

<template>
<div>
  <div v-if="result" class="content">
    <p>User ID: {{ result.id }}</p>
    <p>Title: {{ result.idUsuario }}</p>
    <b-dropdown-item href="#" @click="navega('/ui/calificar-producto')">Mis Compras</b-dropdown-item>
  </div>
  <div class="col-sm-12" style="text-align: center;">
            <button @click="openRegistroPage" class="btn btn-warning" >Validar un Comentario</button>
  </div>
</div>                           
</template>  -->

<template>
    <div class="col-sm-12" style="text-align: center;" >
        <h3 class="p-3 text-center" >Comentarios Pendientes</h3>
        <table class="table table-striped table-bordered table-dark">
            <thead>
                <tr>
                    <th>Nombre del Anuncio</th>
                    <th>Comentario</th>
                    <th>Auditar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>{{item.name}}</td>
                    <td>{{item.sexo}}</td>
                    <td>
                        <button @click="validar(item.id)" class="btn btn-warning" style="background-color: white; border-color: black">Validar este Comentario</button> <button @click="rechazar(item.id)" class="btn btn-warning" style="background-color: white; border-color: black">Rechazar este comentario</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
    </div>   
        
</template> 

<script>
import axios from 'axios';
import router from '../router'
export default {
    data () {
        return {
            aprobado : '',
            id : '',
        result: [],
        items: [
      {
        id: 1,
        name: "Pepe",
        color: "Rojo",
        sexo: "Isay es mi chavo"
      },
      {
        id: 55,
        name: "Uriel",
        color: "Verde",
        sexo: "Samuel es mi chavo"
      },
      {
        id: 3,
        name: "Samuel",
        color: "Azul",
        sexo: "Pp es mi chavo"
      }
    ],
        }
        
    },
    created(){
        axios.get('http://localhost:9999/api/revisar-comentarios.json')
            .then( result =>{
                this.result = result.data;
                console.log("aqui es")
                console.log(result.data)
            }).catch(e => console.log(e))
    },
     methods: {
        openRegistroPage: function() {
        router.push({'name':'validar-comentario'});
        },
        validar(paramid){
            this.id = paramid
            this.aprobado = 1
            console.log(this.id)
            console.log(this.aprobado)
            let objectToSend = {
              //comentario: this.comentario,
              aprobado: this.aprobado,
              id: this.id
            }
            //let keyAcces = localStorage.getItem('vuex');
            //keyAcces = JSON.parse(keyAcces)
            //console.log(keyAcces)

            //let infoUser = keyAcces.session.idUser;
            //console.log("infoUser")
            //console.log(infoUser)
            axios.put(`http://localhost:9999/api/auditar-comentario.json?aprobado=${this.aprobado}&id=${this.id}`, {params: objectToSend}).then(response => {
            //axios.put('http://localhost:9999/api/crear-calificacion.json?comentario='+ this.comentario + '&estrellas='+ this.estrellas + '&id=' +this.id}, {params: objectToSend}).then(response => {
            if(response.data) console.log(response.data);
            //router.push('confirma-registro');
            }).catch(e => console.log(e))

        },
        rechazar(paramid){
            this.id = paramid
            this.aprobado = 0
            console.log(this.id)
            console.log(this.aprobado)
            let objectToSend = {
              //comentario: this.comentario,
              aprobado: this.aprobado,
              id: this.id
            }
            //let keyAcces = localStorage.getItem('vuex');
            //keyAcces = JSON.parse(keyAcces)
            //console.log(keyAcces)

            //let infoUser = keyAcces.session.idUser;
            //console.log("infoUser")
            //console.log(infoUser)
            axios.put(`http://localhost:9999/api/auditar-comentario.json?aprobado=${this.aprobado}&id=${this.id}`, {params: objectToSend}).then(response => {
            //axios.put('http://localhost:9999/api/crear-calificacion.json?comentario='+ this.comentario + '&estrellas='+ this.estrellas + '&id=' +this.id}, {params: objectToSend}).then(response => {
            if(response.data) console.log(response.data);
            //router.push('confirma-registro');
            }).catch(e => console.log(e))

        },
        submition() {
            let objectToSend = {
              //comentario: this.comentario,
              aprobado: this.aprobado,
              id: this.id
            }
            //let keyAcces = localStorage.getItem('vuex');
            //keyAcces = JSON.parse(keyAcces)
            //console.log(keyAcces)

            //let infoUser = keyAcces.session.idUser;
            //console.log("infoUser")
            //console.log(infoUser)
            axios.put(`http://localhost:9999/api/auditar-comentario.json?aprobado=${this.aprobado}&id=${this.id}`, {params: objectToSend}).then(response => {
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
