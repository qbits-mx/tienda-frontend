<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header card-custom-header"> 
        <label class="control-label h4" >Administración de Catalogos</label>
        
      </div>
      <div class="card-body align" v-for="categoria in Lista" :key = categoria.key>
              <div class="card-header card-custom-header"> 
                <label class="control-label h5" >{{categoria[0].tipoCatalogo}}</label>
            </div>
        <div class="container" id = 'AdministraCatalogo'>
            <br>
                <button type="button" class="btn btn-success float-right" v-on:click = "agregarCatalogo(categoria[0].idMaestro)" >Agregar Elemento</button>
            <br>
            <div class = "container" style="overflow-y:scroll; height:400px">
                <ul class = "list-group">
                    <li class = "list-group-item" v-for="catalogo in categoria" :key="catalogo.idCatalogo">
                        {{catalogo.nombre}}                        
                        <button type="button" class="btn btn-danger float-right" v-on:click = "eliminarCatalogo(catalogo.id)" >Eliminar</button>
                        <button type="button" class="btn btn-primary float-right" v-on:click = "renombrarCatalogo(catalogo.id,catalogo.nombre)">Renombrar</button>
                    </li>
                </ul>
            </div>        
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Vue from 'vue';
import VueSimpleAlert from "vue-simple-alert";

export default ({  
    name: "AdministraCatalogo",

    data(){
        return {
            error: false,
            loading: true,
            cambios:0,
            Lista: null
        }
    },
      mounted(){
        this.cargaLista();
    },
    methods: {
    abreToast(msg) {
        Vue.$toast.open({
          message: msg,
          type: 'info',
          duration: 5000,
          position:'top'
        });
    },
    exitoToast(msg) {
        Vue.$toast.open({
          message: msg,
          type: 'success',
          duration: 5000,
          position:'top'
        });
    },
    errorToast(msg){
        Vue.$toast.open({
          message: msg,
          type: 'error',
          duration: 5000,
          position:'top'
        });
    },
    cargaLista(){
        let categorias = {}
        axios.get('api/obtener-catalogos-join.json').then(response =>{
                (response.data).forEach(x => {
                const identificador = x.idMaestro;
                if (!categorias[identificador]) categorias[identificador]=[]
                categorias[identificador].push(x);
                })
            this.Lista = categorias;
            })
            .catch(error =>{
                console.log(error)
                this.errored =true
            })
            .finally(()=>this.loading = false);
    },
    
    agregarCatalogo(idCatalogoCategoria){
        const nameRegExp = /^[a-zA-Z0-9ñ ]+$/;
        Vue.use(VueSimpleAlert);
        let activo = true;
        this.$prompt("Ingresa el nuevo nombre").then((nombre) => {
            if (nombre == null || nombre == "" || !(nameRegExp.test(nombre)) ) {
                this.abreToast("El nombre no puede contener caracteres extraños y no puede ser vacio");
            } else {
                axios.get("api/insertar-catalogo.json?activo="+activo+"&idCatalogoCategoria="+idCatalogoCategoria+"&nombre="+nombre)
                    .then(data => {
                        if(data.data){
                        this.cargaLista();
                            this.exitoToast("El catalogo se creo de forma exitosa");
                        }else{
                            this.abreToast("Error al crear el catalogo, compruebe que el nombre no este en uso");
                        }
                    });
            }            
        });
    },
    eliminarCatalogo(id){
        Vue.use(VueSimpleAlert);
        if (id === 14) {
            this.errorToast("No se puede eliminar este elemento");
            return;
        }
        this.$confirm("¿Seguro que desea eliminarlo?").then(() => {
            axios.get("api/eliminar-catalogo-porId.json?id="+id)
            .then(data =>{
                if (data.data){
                    this.cargaLista();
                    this.exitoToast("Eliminación exitosa");
                }else{
                    this.abreToast("Error al eliminar");
                }
            });
        });
    },
    renombrarCatalogo(id,nombreAntiguo){
        Vue.use(VueSimpleAlert);
        if (id === 14) {
            this.errorToast("No se puede renombrar este elemento");
            return;
        }
        const nameRegExp = /^[a-zA-Z0-9ñ ]+$/;
        this.$prompt("NuevoNombre").then((nombre) => {
            if (nombre == null || nombre == "" || !(nameRegExp.test(nombre))) {
                this.abreToast("El nombre no puede contener caracteres extraños y no puede ser vacio");
            } else {
                this.$confirm("¿Seguro que deseas renombrarlo?").then(() => { 
                    axios.get("api/modificar-nombreDeCatalogo-porId.json?id="+id+"&nuevoNombre="+nombre)
                    .then( data =>{
                        if(data.data){
                            this.cargaLista();
                            this.exitoToast("El catalago \""+nombreAntiguo+"\" se cambio a \""+ nombre+"\" de forma exitosa");
                        }else{
                            this.abreToast("Hubo un error al renombrar, por favor verifique que el nuevo nombre no este siendo utilizado");
                        }
                    });
                });
            }
        });
   },
  }
})
    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imagenes2 {
  box-shadow: 3px 1px 6px #859295;
  border-radius: 3px;
}
.centered {
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-weight: bold;
}
.centered:hover {
  text-decoration: underline;
}
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fill img {
  box-shadow: 3px 1px 6px #859295;
  border-radius: 3px;
  flex-shrink: 0;
  height: 130px;
  width: 200px;
  padding: 2px;
  margin: 2px;
  opacity: 1;
}
.fill img:hover {
  opacity: 0.8;
}
</style>
