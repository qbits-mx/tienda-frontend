<template>
<div>

  <div v-if="result" class="content">
    <p>User ID: {{ result.id }}</p>
    <p>Title: {{ result.idUsuario }}</p>
    <!-- >
    <b-dropdown-item href="#" @click="navega('/ui/calificar-producto')">Mis Compras</b-dropdown-item>
    <!-->
  </div>


  <!--<div class="col-sm-12" style="text-align: center;">
            <button @click="openRegistroPage" class="btn btn-warning" >Calificar</button>
  </div-->


  <from class="col-sm-12" style="width:100%; height:100%; ">
            <button @click="openProductosVen" class="btn btn-warning" >Productos Vendidos</button>
  </from>
  <from class="col-sm-12" style="text-align: center;">
            <button @click="openProductosCom" class="btn btn-warning" >Productos Comprados</button>
  </from>
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
                console.log("this.result")
                console.log(this.result)
                console.log(result.data)
            }).catch(e => console.log(e))
    },
    methods: {
        openProductosVen: function() {
        router.push({'name':'producto-ven'});
        },
        openProductosCom: function() {
        router.push({'name':'producto-com'});
        },
        openRegistroPage: function() {
        router.push({'name':'calificar-producto'});
        },
        infoAnuncio(){

        }
        
    }

}
</script>

<style>

</style>
