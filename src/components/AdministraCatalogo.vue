<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header card-custom-header"> 
        <label class="control-label h4" >Administración de Catalogos</label>
        
      </div>
      <div class="card-body align" v-for="categoria in Lista" :key = categoria.ke>
              <div class="card-header card-custom-header"> 
                <label class="control-label h5" >{{categoria[0].idCatalogoCategoria}}</label>
            </div>
        <div class="container" id = 'AdministraCatalogo'>
            <br>
                <button type="button" class="btn btn-success float-right" v-on:click = "agregarCatalogo(categoria[0].idCatalogoCategoria)" >Agregar Catalogo</button>
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
import router from '../router';
import axios from 'axios'; 

export default ({  
    name: "AdministraCatalogo",

    data(){
        return {
            error: false,
            loading: true,
            Lista: null
        }
    },
    mounted(){
        let categorias = {}
        axios.
            get('/api/obtener-todosLosCatalogos.json')
            .then(response =>{
                (response.data).forEach(x => {
                const identificador = x.idCatalogoCategoria;
                if (!categorias[identificador]) categorias[identificador]=[]
                    categorias[identificador].push(x);
                })
            this.Lista = categorias;
            console.log(this.Lista)
            })
            .catch(error =>{
                console.log(error)
                this.errored =true
            })
            .finally(()=>this.loading = false)
    },
    methods: {
        consultaAnuncios(idCatInit) {
        router.push({path:'/ui/consulta-anuncios-publico/'+idCatInit}).catch(()=>{});
    },
    agregarCatalogo(idCatalogoCategoria){
        const nameRegExp = new RegExp(/^([A-Za-z0-9]\s)*/);

        let activo = true;
        let nombre = prompt("Ingrese el nombre del nuevo catálogo:", "Catalogo Nuevo");
        if (nombre == null || nombre == "" || !(nameRegExp.test(this.name)) ) {
            alert("Hubo un problema con el nombre.");
        } else {
            let publicado = axios.get("api/insertar-catalogo.json?activo="+activo+
                    "&idCatalogoCategoria="+idCatalogoCategoria+"&nombre="+nombre);
            if(publicado){
                alert("El catalgo se creo de forma exitosa");
                location.reload();
            }else{
                alert("Parece que hubo un error al crear"+publicado);   
            }
        }
    },
    eliminarCatalogo(id){
        if (confirm("¿Seguro que desea eliminarlo?")) {
            let eliminado = axios.get("api/eliminar-catalogo-porId.json?id="+id);
            if (eliminado){
                alert("Eliminación exitosa");
                location.reload();
            }else{
                alert("Hubo un error al eliminar");
            }
        } else {
            alert("Eliminación cancelada");
        }    
    },
    renombrarCatalogo(id,nombreAntiguo){
        const nameRegExp = new RegExp(/^([A-Za-z0-9]\s)*/);

        let nombre = prompt("Ingrese el nuevo nombre para el catálogo:", nombreAntiguo);
        if (nombre == null || nombre == "" || !(nameRegExp.test(this.name)) ) {
            alert("Hubo un problema con el nombre.");
        } else {
            if (confirm("¿Seguro que desea renombrar?")) {
                console.log("id = "+id+ " nombre= "+ nombre);
                let renombrado = axios.get("api/modificar-nombreDeCatalogo-porId.json?id="+id+"&nuevoNombre="+nombre);
                 if(renombrado){
                    alert("El catalgo "+nombreAntiguo+" se cambio a "+ nombre+" de forma exitosa");
                    location.reload();
                }else{
                    alert("Parece que hubo un error al renombrar"+renombrado);
                }

            }else{
                alert("Operacion cancelada");
            }
        }
    }

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
