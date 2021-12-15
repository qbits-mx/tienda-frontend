<template>
<div>
  <div v-if="result" class="content">
    <p>User ID: {{ result.id }}</p>
    <p>Title: {{ result.idUsuario }}</p>
    <!-- >
    <b-dropdown-item href="#" @click="navega('/ui/calificar-producto')">Mis Compras</b-dropdown-item>
    <!-->
  </div>
  <div class="col-sm-12" style="text-align: center;">
            <button @click="openRegistroPage" class="btn btn-warning" >Calificar</button>
  </div>
</div>                           
</template>

<script>
import axios from 'axios';
import router from '../router'
export default {
    data: ()=> ({
        result: null
    }),
    created(){
        axios.get('http://localhost:9999/api/obtener-consulta.json?idComprador=859')
            .then( result =>{
                this.result = result.data;
                console.log(result.data)
            }).catch(e => console.log(e))
    },
    methods: {
        openRegistroPage: function() {
        router.push({'name':'calificar-producto'});
        }
    }

}
</script>

<style>

</style>
