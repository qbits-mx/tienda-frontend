<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header card-custom-header"> 
        <label class="control-label h4" >Administración de catálogos</label>
        
      </div>
      
      <div class="card-body align" v-for="(value,key) in Categorias" :key= key >
              <div class="card-header card-custom-header"> 
                <label class="control-label h5" >{{key}}</label>
            </div>
        <div class="container" id = 'AdministraCatalogo'>
            <br>
                <button type="button" class="btn btn-success float-right" v-on:click = "agregarCatalogo(key)" >Agregar Elemento</button>
            <br>
            <div class = "container" style="overflow-y:scroll; height:400px">
                <ul class = "list-group">
                    <li class = "list-group-item" v-for="catalogo in value" :key="catalogo.idCatalogo">
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

export default ({  
    name: "AdministraCatalogo",

    data(){
        return {
            error: false,
            loading: true,
            Categorias: null
        }
    },
      mounted(){
        this.cargaCategorias();
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
    cargaCategorias(){
        let categorias = {}
        axios.get('api/obtener-todos-catalogosMaestros.json').then(response =>{
                (response.data).forEach(x => {
                    categorias[x.tipoCatalogo]=[];
                })
                this.Categorias = categorias
                this.cargaLista();
            })
            .catch(error =>{
                console.log(error)
                this.errored =true
            })
            .finally(()=>this.loading = false);
    },
    cargaLista(){
        axios.get('api/obtener-catalogos-join.json').then(response =>{
                (response.data).forEach(x => {
                    const identificador = x.tipoCatalogo;
                    this.Categorias[identificador].push(x);
                })
            })
            .catch(error =>{
                console.log(error)
                this.errored =true
            })
            .finally(()=>this.loading = false);
    },
    agregarCatalogo(tipoCatalogo){
        const nameRegExp = /^[a-zA-Z0-9ñáéíóúÁÉÍÓÚ ]+$/;
        let activo = true;
        let nombre = prompt("Ingresa el nombre del elemento a insertar:","Nombre catálogo");
        if (nombre == null) return;
        if (nombre == "" || !(nameRegExp.test(nombre)) ) {
            this.abreToast("El nombre no puede contener caracteres especiales y no puede ser vacío");
        } else {
            axios.get("api/buscar-catalogo-tipo-catalogo.json?tipoCatalogo="+tipoCatalogo)
            .then(idCatalogoCategoria => {                    
                axios.get("api/insertar-catalogo.json?activo="+activo+"&idCatalogoCategoria="+idCatalogoCategoria.data.id+"&nombre="+nombre)
                    .then(data => {
                    if(data.data){
                        this.cargaCategorias();
                        this.exitoToast("El catálogo se creó de forma exitosa.");
                    }else{
                        this.abreToast("Error al crear el catálogo, compruebe que el nombre no esté en uso.");
                    }
                });    
            })
        }            
    },
    eliminarCatalogo(id){
        if (id === 14) {
            this.errorToast("No se puede eliminar este elemento.");
            return;
        }
        if (confirm("¿Seguro que deseas eliminar este elemento?")) {
            axios.get("api/eliminar-catalogo-porId.json?id="+id)
            .then(data =>{
                if (data.data){
                    this.cargaCategorias();
                    this.exitoToast("Eliminación exitosa.");
                }else{
                    this.abreToast("Error al eliminar.");
                }
            });
        }
    },
    renombrarCatalogo(id,nombreAntiguo){
        if (id === 14) {
            this.errorToast("No se puede renombrar este elemento.");
            return;
        }
        const nameRegExp = /^[a-zA-Z0-9ñáéíóúÁÉÍÓÚ ]+$/;
        let nombre = prompt("Ingresa el nuevo nombre para este elemento.");
        if (nombre == null) return;
        if (nombre == "" || !(nameRegExp.test(nombre))) {
            this.abreToast("El nombre no puede contener caracteres especiales y no puede ser vacío.");
        } else {
            if (confirm("¿Seguro que deseas renombrarlo?")){ 
                axios.get("api/modificar-nombreDeCatalogo-porId.json?id="+id+"&nuevoNombre="+nombre)
                .then( data =>{
                    if(data.data){
                        this.cargaCategorias();
                        this.exitoToast("El catálago \""+nombreAntiguo+"\" se cambió a \""+ nombre+"\" de forma exitosa");
                    }else{
                        this.abreToast("Hubo un error al renombrar, por favor verifique que el nuevo nombre no esté siendo utilizado.");
                    }
                });
            }
        }
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
