<template>
  <div class="ancho centra">
    <div class="card" style="margin-left:-50%;width: 200%;border: none;">
      <div class="card-header" style="margin-bottom:-1%">
        <h4 class="control-label" style="text-align:center"><b>Compras realizadas</b></h4>
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
            <div class="row" v-for="(compra, index) in currentPage" :key="index" style="background-color:#D7EAF9;margin-bottom:1%">
                <div class="col-sm" >
                    <div class="container" >
                        <div class="row">
                            <div class="col-sm">
                              <p style="text-align: center;"><b>Orden No. {{compra.cve_orden}}</b></p>
                                <p style="color:#c2b280;margin-bottom:0%;font-size:large;"><b>Anuncio: </b></p>
                                <p style="color:#c2b280;margin-top:0%;text-decoration: underline;font-size:large;"><b>{{compra.nombreAnuncio}}</b></p>
                            </div>
                        </div>
                        <div class="row" >
                            <div class="col-sm">
                              <button :disabled="compra.estadoEnvio" @click="sent(compra.cve_orden,index)" class="btn btn-primary btn-sm">¿Enviado?</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm" >
                    <p >Compra realizada el {{compra.fechaCompra}}</p>
                    <p style="color:blue;margin-bottom:0%">Enviar a:</p>
                    <p style="color:blue;font-size:small;margin-bottom:0%">{{compra.calleNumero}}, {{compra.colonia}}, cp: {{compra.cp}}</p>
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
  name: "AdministracionCompras.vue",
  data(){
    return {
      compras: [],
      titulo : '',
      descripcion: '',
      currentPage: null,
      page: 1,
      rows: null,
      perPage: 5,
    }
  },
  mounted () {
    this.getHistorial();
  },
methods: {
    closeModal: function() {
        this.$modal.hide('aviso');
    },
    changePage: function(numero){
      this.currentPage = this.compras.slice((this.perPage*(numero - 1)), ((this.perPage*(numero - 1)))+this.perPage);
      this.page=numero;
    },
    getHistorial(){
      axios.get('api/administracion-compras.json/').then(response => {
          response.data.forEach((value) => {
              this.compras.push(value);
          });
          this.compras = this.compras.sort((a,b) => (a.fechaCompra > b.fechaCompra) ? 1 : ((b.fechaCompra > a.fechaCompra) ? -1 : 0)).reverse();
          this.currentPage = this.compras.slice(0, this.perPage);
          this.rows = this.compras.length;
          this.page = 1;
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