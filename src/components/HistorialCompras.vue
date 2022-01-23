<template>
    <div class="col-sm-12" style="text-align: center;" >

        <h3 class="p-3 text-center" >Historial de compras</h3>
        <table class="table table-striped table-bordered table-dark">
            <thead>
                <tr>
                    <th>Nombre del Anuncio</th>
                    <th>Fecha de Compra</th>
                    <th>  </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in result" :key="item.id">
                    <td>{{item.nombre}}</td>
                    <td>{{item.fechaCompra}}</td>
                    <td>
                        <button @click="getConsulta(item.id)" class="btn btn-warning" style="background-color: white; border-color: black">Detalle</button> 
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
            result: ''
        }
        
    },

    beforeMount() {
          this.getHistorial();
      },
     methods: {
       getHistorial(){
           /* aqui vemos el Id */
            let keyAcces = localStorage.getItem('vuex');
            keyAcces = JSON.parse(keyAcces)
            console.log(keyAcces)

            let infoUser = keyAcces.session.idUser;
            console.log("infoUser")
            console.log(infoUser)
            axios.get('http://localhost:9999/api/obtener-historial-comprados.json?idComprador=' + infoUser)
            .then( res =>{
                this.result = res.data;
                console.log(this.result);
                //console.log(store.state.session.idUser);
            }).catch(e => console.log(e))
       },
        openRegistroPage: function() {
        //router.push({'name':'validar-comentario'});
        },
        async getConsulta(paramid){
            console.log("aqui entra")
            this.id = paramid;
            localStorage.setItem('id',this.id);
            /**let objectToSend = {
              id: this.id
            }
            axios.get(`http://localhost:9999/api/obtener-info-comprado.json?idAnuncio=${this.id}`, {params: objectToSend}).then(response => {
                if(response.data) 
                    console.log(response.data);
            }).catch(e => console.log(e))*/
            router.push({'name':'consulta-compra'});
        },
        
       
        
    }
}


</script>

<style>

</style>
