<template>
  <div class="ancho centra">
    <div class="card" style="margin-left:-50%;width: 200%;border: none;">
      <div class="card-header" style="margin-bottom:-1%">
        <h4 class="control-label" style="text-align:center"><b>Gestor Administrador</b></h4>
      </div>
      <div class="card-body align">
        <hr style="background-color:black">
          <div class="container">
            <b-pagination
              v-model="page"
              :total-rows="rows"
              :per-page="perPage"
              first-text="Primero"
              prev-text="Anterior"
              next-text="Siguiente"
              last-text="Último"
              @change="changePage"
              class="mt-4 text-center">
            </b-pagination>
            <h4 class="control-label" style="text-align:center"><b>No Validados</b></h4>
            <div class="row" v-for="(noValidado, index) in noValidados" :key="index" style="background-color:#D7EAF9;margin-bottom:1%">
                <div class="col-sm" >
                  <button @click="$router.push('/validar-rechazar/anuncio/' +noValidado.id )" class="btn btn-primary btn-sm">Ver anuncio</button>
                    <div class="container" >
                        <div class="row">
                            <div class="col-sm">
                              <p style="text-align: center;"><b>Id de anuncio: {{noValidado.id}}</b></p>
                                <p style="color:#436499;margin-bottom:0%;font-size:large;"><b>Nombre Anuncio: </b></p>
                                <p style="color:#2e8b57;margin-top:0%;text-decoration: underline;font-size:large;"><b>{{noValidado.nombre}}</b></p>
                                <p style="color:#436499;margin-bottom:0%;font-size:large;"><b>Precio Anuncio: </b></p>
                                <p style="color:#2e8b57;margin-top:0%;text-decoration: underline;font-size:large;"><b>{{noValidado.precio}} MXN</b></p>
                                
                            </div>
                        <div class="col-sm-6" >
                          <img v-bind:src="urlNoValidados[index]" width="100%">
              
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <h4 class="control-label" style="text-align:center"><b>Validados</b></h4>
            <div class="row" v-for="(validado, index) in validados" :key="1 + index" style="background-color:#D7EAF9;margin-bottom:1%">
                <div class="col-sm" >
                    <div class="container" >
                        <div class="row">
                            <div class="col-sm">
                              <p style="text-align: center;"><b>Id de anuncio: {{validado.id}}</b></p>
                                <p style="color:#436499;margin-bottom:0%;font-size:large;"><b>Nombre Anuncio: </b></p>
                                <p style="color:#2e8b57;margin-top:0%;text-decoration: underline;font-size:large;"><b>{{validado.nombre}}</b></p>
                                <p style="color:#436499;margin-bottom:0%;font-size:large;"><b>Precio Anuncio: </b></p>
                                <p style="color:#2e8b57;margin-top:0%;text-decoration: underline;font-size:large;"><b>{{validado.precio}} MXN</b></p>
                            </div>
                        <div class="col-sm-6" >
                          <img v-bind:src="urlValidados[index]" width="100%">
                        </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    </div>
  </div>
            
          <modal
            name="aviso"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="260">
            <div class="card">
                <div class="card-header" style="text-align:center">Advertencia del sistema</div>
                <div class="card-body">
                    <h5 class="card-title">{{titulo}}</h5>
                    <p class="card-text">{{ descripcion }}</p>
                    <div style="text-align: right;">
                        <a href="#" class="btn btn-primary" @click="closeModal">Aceptar</a>
                    </div>
                </div>
            </div>
        </modal>
</div>

</template>

<script>
import axios from 'axios';
export default {
  name: "GestorAdministrador.vue",
  data(){
    return {
      noValidados: [],
      validados : [],
      urlNoValidados : [],
      urlValidados : [],
      titulo : '',
      descripcion: '',
      currentPage: null,
      page: 1,
      rows: null,
      perPage: 5,
    }
  },
  mounted () {
    this.getNoValidados();
    this.getValidados()
  },
methods: {
    closeModal: function() {
        this.$modal.hide('aviso');
    },
    changePage: function(numero){
      this.currentPage = this.noValidados.slice((this.perPage*(numero - 1)), ((this.perPage*(numero - 1)))+this.perPage);
      this.page=numero;
    },
    getNoValidados(){
      axios.get('api/gestor-novalidados.json').then(response => {
          response.data.forEach((value) => {
              this.noValidados.push(value);
              this.getMultimediaNoValidados(value) 
          });
          this.currentPage = this.noValidados.slice(0, this.perPage);
          this.rows = this.noValidados.length;
          this.page = 1;
      }).catch(error => {
          console.log(error);
          this.$modal.show('aviso');
          this.titulo = "Error!"
          this.descripcion = "Ha ocurrido un error al cargar los datos, por favor vuelva a intentarlo más tarde."
      })
    },
    getValidados(){
      axios.get('api/gestor-validados.json').then(response => {
          response.data.forEach((value) => {
              this.validados.push(value);
              this.getMultimediaValidados(value)
          });
          this.currentPage = this.noValidados.slice(0, this.perPage);
          this.rows = this.noValidados.length;
          this.page = 1;
      }).catch(error => {
          console.log(error);
          this.$modal.show('aviso');
          this.titulo = "Error!"
          this.descripcion = "Ha ocurrido un error al cargar los datos, por favor vuelva a intentarlo más tarde."
      })
    },
    getMultimediaNoValidados(Anuncio){
      axios.get('api/dame-multimedias.json?id='+Anuncio.id).then(response => {
          if (response.data.length > 0) {
                this.urlNoValidados.push(response.data[0].url);
          }
          //response.data.forEach((value) => {
              //this.urlNoValidados.push(value.url)
          //})
      }).catch(error => {
          console.log(error);
          this.$modal.show('aviso');
          this.titulo = "Error!"
          this.descripcion = "Ha ocurrido un error al cargar los datos, por favor vuelva a intentarlo más tarde."
      })
    },
    getMultimediaValidados(Anuncio){
      axios.get('api/dame-multimedias.json?id='+Anuncio.id).then(response => {
          if (response.data.length > 0) {
                this.urlValidados.push(response.data[0].url);
          }
          //response.data.forEach((value) => {
              //this.urlValidados.push(value.url)
          //})
      }).catch(error => {
          console.log(error);
          this.$modal.show('aviso');
          this.titulo = "Error!"
          this.descripcion = "Ha ocurrido un error al cargar los datos, por favor vuelva a intentarlo más tarde."
      })
    },
    sent(cve_orden, index){
      axios.post('api/administracion-compras-update.json/1/'.concat(cve_orden)).then(() => {
          this.$modal.show('aviso');
          this.titulo = "Exito!";
          this.compras[index].estadoEnvio = true;
          this.descripcion = "Se ha enviado el paquete"
      }).catch(() => {
          this.$modal.show('aviso');
          this.titulo = "Error!"
          this.descripcion = "Ha ocurrido un error de nuestro lado, por favor vuelva a intentarlo más tarde."
      })
    },
},

}
</script>

<style>

hr.dotted {
  border-top: 2px dotted #bbb;
}
.shadowing {
  box-shadow: 1px 1px 3px #d8dcdd;
}
.shortSpace{
  margin-top: 5px;
  line-height: 90%;
  font-size: 12px;
  letter-spacing: -0.5px;
}
</style>
