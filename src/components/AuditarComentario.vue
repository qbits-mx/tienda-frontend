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
                <tr v-for="item in result" :key="item.id">
                    <td>{{item.nombre}}</td>
                    <td>{{item.comentario}}</td>
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
        result: '',
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
      beforeMount() {
          this.revisaComentarios();
      },
     methods: {
       revisaComentarios(){
         axios.get('api/revisar-comentarios.json')
            .then( res =>{
                this.result = res.data;
                console.log(res.data);
            }).catch(e => console.log(e))
       },
        openRegistroPage: function() {
        router.push({'name':'validar-comentario'});
        },
        async validar(paramid){
            this.id = paramid
            this.aprobado = 1
            console.log(this.id)
            console.log(this.aprobado)
            let objectToSend = {
              aprobado: this.aprobado,
              id: this.id
            }
            axios.put(`api/auditar-comentario.json?aprobado=${this.aprobado}&id=${this.id}`, {params: objectToSend}).then(response => {
            
            if(response.data) console.log(response.data);
            
            }).catch(e => console.log(e))
            window.location.reload();
        },
        async rechazar(paramid){
            this.id = paramid
            this.aprobado = 0
            console.log(this.id)
            console.log(this.aprobado)
            let objectToSend = {
              aprobado: this.aprobado,
              id: this.id
            }
            
            axios.put(`api/auditar-comentario.json?aprobado=${this.aprobado}&id=${this.id}`, {params: objectToSend}).then(response => {
            
            if(response.data) console.log(response.data);
            
            }).catch(e => console.log(e))
            window.location.reload();
        },
        submition() {
            let objectToSend = {
              aprobado: this.aprobado,
              id: this.id
            }
            
            axios.put(`http://localhost:9999/api/auditar-comentario.json?aprobado=${this.aprobado}&id=${this.id}`, {params: objectToSend}).then(response => {
            
            if(response.data) console.log(response.data);
            
            }).catch(e => console.log(e))
        }
        
    }
}


</script>

<style>

</style>
