<template>

  <div  class="padre">
    <!-- Bootstrap core CSS -->
    <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom styles for this template -->
    <link href="form-validation.css" rel="stylesheet">
    <link rel="stylesheet" href="css/estilos.css">

    <b-form @submit="onSubmit" @reset="onReset" v-if="show"  >
      <b-form-group id="input-group-nombre" label="Nombre:" label-for="input-nombre">
        <b-form-textarea class="shadow-sm p-3 mb-5 bg-body rounded"
                         id="nombre"
                         v-model="form.nombre"
                         :state="form.nombre.length >= 5"
                         placeholder="Escribe aquí el nombre de tu anuncio, debe contener mas de 5 caracteres"
                         rows="1"
                         max-rows="1"
                         required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="input-group-precio" label="Precio:" label-for="input-precio">
        <b-form-input class="shadow-sm p-3 mb-5 bg-body rounded"
                      id="precio"
                      type="number"
                      min="1"
                      step="any"

                      v-model="form.precio"
                      :state="form.precio>0"
                      placeholder="Escribe aquí el precio de tu artículo"
                      rows="1"
                      description="El precio debe ser positivo y no puede ser 0."
                      max-rows="1"
                      required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-descripcion" label="Descripcion:" label-for="input-descripcion">
        <b-form-textarea class="shadow-sm p-3 mb-5 bg-body rounded"
                         id="descripcion"
                         v-model="form.descripcion"
                         :state="form.descripcion.length >= 10"
                         placeholder="Escribe aqui tu descripcion debe tener una logitud de mas de 10 caracteres"
                         rows="3"
                         max-rows="6"
                         required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="input-group-departamento" label="Departamento:" label-for="input-departamento">
        <b-form-select
            id="input-zonaE"
            v-model="form.idCatalogoDepartamento"
            :options="categorias"
            :state="stateDep"
            required

        ></b-form-select>
      </b-form-group>

      <b-form-group
          id="input-group-1"
          label="Datos de contacto (correo):"
          label-for="input-1"
          description="Proporciona una direccion de correo valida para que puedan contactarte."
      >
        <b-form-input
            id="input-1"
            v-model="form.contacto"
            type="email"
            placeholder="Ingrese su correo electronico"

        ></b-form-input>
      </b-form-group>



      <b-form-group id="input-group-zonaE" label="Zona de entrega:" label-for="input-zonaE">
        <b-form-select
            id="input-zonaE"
            v-model="form.idCatalogoZonaDeEntrega"
            :options="entregas"
            :state="stateZona"
            required

        ></b-form-select>
      </b-form-group>


      <b-form-group id="input-group-pago" label="Metodo de pago:" label-for="input-pago">
        <b-form-select
            id="input-pago"
            v-model="form.idCatalogoFormaDePago"
            :options="pago"
            :state="statePago"
            required
        ></b-form-select>
      </b-form-group>


      <b-form-group id="input-group-cond" label="Condicion actual de tu producto:" label-for="input-cond">
        <b-form-select
            id="input-cond"
            v-model="form.idCatalogoCondicion"
            :options="condicion"

            :state="stateCon"
            required
        ></b-form-select>
      </b-form-group>



      <b-form-group id="input-group-vig" label="Vigencia de la publicacion:" label-for="input-vig">
        <b-form-datepicker id="calendar"
                           v-model="form.vigenciaAnuncio"
                           :min="min"
                           :max="max"
                           block locale=""
                           selected-variant="success"
                           nav-button-variant="success"
                           menu-class="w-100"
                           calendar-width="100%"
                           class="mb-2"
        ></b-form-datepicker>
      </b-form-group>

      <div class="container">
        <div>
          <h1>Imágenes</h1>
          <hr/>
          <label>Imágenes
            <input type="file" multiple @change="handleImageUploads( $event )"
                   required
                   accept="image/png,image/jpeg"
            />
          </label>
          <br>
        </div>
      </div>

      <div class="container">
        <div>
          <h1>Videos</h1>
          <hr/>
          <label>Videos
            <input type="file" multiple @change="handleVideoUploads( $event )"
                   required
                   accept="video/mp4"
            />
          </label>
          <br>
        </div>
      </div>


      <b-button type="submit" @click="showModal" variant="success">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

    </b-form>

    <modal
        name="mensaje-confirmacion"
        :clickToClose="false"
        :reset="true"
        :width="480"
        :height="260">
      <div class="card">
        <div class="card-header">
          <h3  class="card-title"> Anuncio creado </h3>
        </div>
        <div class="card-body">
          <p class="card-title">Validación pendiente</p>
          <p class="card-text">El anuncio será validado por un administrador</p>
          <b-spinner variant="success" label="Spinning"></b-spinner>
          <div style="text-align: right;">
            <a href="#" class="btn btn-success"   @click="regresaInicio">Regresar a la pagina de inicio</a>
          </div>
        </div>
      </div>

    </modal>

    <modal
        name="mensaje-error"
        :clickToClose="false"
        :reset="true"
        :width="480"
        :height="260">
      <div class="card">
        <div class="card-header">
          <h3  class="card-title"> Lo sentimos </h3>
        </div>
        <div class="card-body">
          <p class="card-title">Solo se puede tener un anuncio por usuario</p>
          <p class="card-text">Tienes un anuncio publicado o por validarse.</p>
          <b-spinner variant="danger" label="Spinning"></b-spinner>
          <div style="text-align: right;">
            <a href="#" class="btn btn-danger"   @click="regresaInicio">Regresar a la pagina de inicio</a>
          </div>
        </div>
      </div>

    </modal>




  </div>
</template>

<script
    src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js">
</script>

<script>
import axios from 'axios'
import store from '../store'
import router from '../router'


export default {
  computed: {
    stateDep() {
      return this.form.idCatalogoDepartamento > 0
    },
    stateZona() {
      return this.form.idCatalogoZonaDeEntrega > 0
    },

    statePago() {
      return this.form.idCatalogoFormaDePago > 0
    },
    stateCon() {
      return this.form.idCatalogoCondicion > 0
    }
  },
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth())
    maxDate.setDate(maxDate.getDate() + 30)


    var condicionArr = [];
    var condicionArrID = [];
    const axios =  require('axios');

    var condicion = [{
      value:null,
      text:"Selecciona la condicion de tu producto",
    }]


    var departamentoArr = [];
    var departamentoArrID = [];
    var departamento = [{
      value:null,
      text:"Selecciona el departamento de tu producto",
    }]

    var entregaArr = [];
    var entregaArrID = [];
    var entrega = [{
      value:null,
      text:"Selecciona una zona de venta/entrega",
    }]

    var pagoArr = [];
    var pagoArrID = [];
    var pago = [{
      value:null,
      text:"Selecciona una forma de pago",
    }]




    axios.get('http://localhost:9999/api/obtener-catalogos-porIdCatalogoCategoria.json?idCatalogoCategoria=1').then(resp => {

      for(var i=0;i<resp.data.length;i++){
        if(resp.data[i].activo == 1){
          condicionArr.push(resp.data[i].nombre);
          condicion.push({ text: resp.data[i].nombre, value: resp.data[i].id });
          condicionArrID.push(resp.data[i].id);
        }
      }

      for(var f=0;f<condicionArr.length;f++){
        console.log(condicionArr[f]);
        console.log(condicionArrID[f]);
      }
    });

    axios.get('http://localhost:9999/api/obtener-catalogos-porIdCatalogoCategoria.json?idCatalogoCategoria=2').then(resp => {

      for(var i=0;i<resp.data.length;i++){
        if(resp.data[i].activo == 1){
          departamentoArr.push(resp.data[i].nombre);
          departamento.push({ text: resp.data[i].nombre, value: resp.data[i].id });
          departamentoArrID.push(resp.data[i].id);
        }
      }

      for(var f=0;f<departamentoArr.length;f++){
        console.log(departamento[f].text);
        console.log(departamento[f].value);
      }
    });

    axios.get('http://localhost:9999/api/obtener-catalogos-porIdCatalogoCategoria.json?idCatalogoCategoria=3').then(resp => {

      for(var i=0;i<resp.data.length;i++){
        if(resp.data[i].activo == 1){
          entregaArr.push(resp.data[i].nombre);
          entrega.push({ text: resp.data[i].nombre, value: resp.data[i].id });
          entregaArrID.push(resp.data[i].id);
        }
      }

      for(var f=0;f<entregaArr.length;f++){
        console.log(entrega[f].text);
        console.log(entrega[f].value);
      }
    });


    axios.get('http://localhost:9999/api/obtener-catalogos-porIdCatalogoCategoria.json?idCatalogoCategoria=4').then(resp => {

      for(var i=0;i<resp.data.length;i++){
        if(resp.data[i].activo == 1){
          pagoArr.push(resp.data[i].nombre);
          pago.push({ text: resp.data[i].nombre, value: resp.data[i].id });
          pagoArrID.push(resp.data[i].id);
        }
      }

      for(var f=0;f<pagoArr.length;f++){
        console.log(pago[f].text);
        console.log(pago[f].value);
      }
    });
    return {

      min: minDate,
      max: maxDate,
      categorias: departamento,
      entregas:   entrega,

      pago:       pago,
      condicion:  condicion,


      form: {

        contacto: "",
        descripcion: "",
        idCatalogoCondicion: null,
        idCatalogoDepartamento: null,
        idCatalogoFormaDePago: null,
        idCatalogoZonaDeEntrega: null,
        idUsuario: store.state.session.idUser,
        nombre: "",
        precio: null,
        vigenciaAnuncio: null,
        idAnuncio: null,
        imagenes: [],
        videos: []
      },

      show: true

    }
  },

  methods: {
    handleImageUploads( event ){
      const files = event.target.files;
      for(var i = 0; i < files.length; i++) {
        if(files[i].size > 1048576) {
          alert("No puedes subir imágenes de tamaño mayor a 1MB");
          event.target.value = ''
          return;
        }
      }
      if(files.length > 20) {
        alert("El número máximo de imágenes permitidas es 20");
        event.target.value = ''
      } else {
        this.form.imagenes = event.target.files;
      }
    },
    handleVideoUploads( event ){
      const files = event.target.files;
      for(var i = 0; i < files.length; i++) {
        if(files[i].size > 5242880) {
          alert("No puedes subir videos de tamaño mayor a 5MB");
          event.target.value = ''
          return;
        }
      }
      if(files.length > 10) {
        alert("El número máximo de videos permitidos es 10");
        event.target.value = ''
      } else {
        this.form.videos = event.target.files;
      }
    },
    onSubmit(event) {
      event.preventDefault()
      axios.post("http://localhost:9999/api/salva-anuncio.json", this.form).then(res => {
        if(res.data == -1) {
          this.$modal.show('mensaje-error');
        }else {
          this.form.idAnuncio = res.data;
          var formData = new FormData();
          for(var i = 0; i < this.form.imagenes.length; i++) {
            formData.append('files', this.form.imagenes[i], this.form.imagenes[i].name);
          }
          axios.put("http://localhost:9999/api/upload.json", formData).then(response => {
            var imags = response.data;
            var imagenes = []
            for(var k = 0; k < response.data.length; k++) {
              imagenes[k] = {idAnuncio: this.form.idAnuncio,
                url:"fotos.qbits.mx/"+imags[k].nuevoNombre,
                tipo: "imagen"};
            }
            axios.post("http://localhost:9999/api/salva-multimedia.json", imagenes).catch(error => {
              this.msgErr = error;
              if(error.response) {
                this.msgErr = error.response.data['exceptionLongDescription'];
              }});
          }).catch(error => {
            this.msgErr = error;
            if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
            }});
          formData = new FormData();
          for(var j = 0; j < this.form.videos.length; j++) {
            formData.append('files', this.form.videos[j], this.form.videos[j].name);
          }
          axios.put("http://localhost:9999/api/upload.json", formData).then(response => {
            var vids = response.data;
            var videos = []
            for(var k = 0; k < response.data.length; k++) {
              videos[k] = {idAnuncio: this.form.idAnuncio,
                url:"fotos.qbits.mx/" + vids[k].nuevoNombre,
                tipo: "video"};
            }
            axios.post("http://localhost:9999/api/salva-multimedia.json", videos).catch(error => {
              this.msgErr = error;
              if(error.response) {
                this.msgErr = error.response.data['exceptionLongDescription'];
              }});
          }).catch(error => {
            this.msgErr = error;
            if(error.response) {
              this.msgErr = error.response.data['exceptionLongDescription'];
            }});
          this.$modal.show('mensaje-confirmacion');
        }
      }).catch(error => {
        this.msgErr = error;
        if(error.response) {
          this.msgErr = error.response.data['exceptionLongDescription'];
        }});
    },
    regresaInicio: function() {
      this.is_destroying = true;
      router.push('/');
    },


    onReset(event) {
      event.preventDefault()
      // Reset our form values

      this.form.contacto = ""
      this.form.descripcion = ""
      this.form.idCatalogoCondicion =  1
      this.form.idCatalogoDepartamento = 1
      this.form.idCatalogoFormaDePago = 1
      this.form.idCatalogoZonaDeEntrega = 1
      this.form.nombre = ""
      this.form.precio = null
      this.form.vigenciaAnuncio = null

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  }
}
</script>


<style>
.padre {

  /* Codigo para centrar*/
  display: flex;
  justify-content: center;
  align-items: center;
  /* Fin del codigo para centrar*/
}

.imagen {

  /* Codigo para centrar*/
  display: flex;
  justify-content: right;
  align-items: right;
  /* Fin del codigo para centrar*/
}
.hijo {
  height: 10px;
  width: 10px;
  background: red;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.container {
  max-width: 960px;
}
</style>