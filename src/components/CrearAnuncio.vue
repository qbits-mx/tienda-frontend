<template>

  <div  class="padre">
    <!-- Bootstrap core CSS -->
    <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom styles for this template -->
    <link href="form-validation.css" rel="stylesheet">
    <link rel="stylesheet" href="css/estilos.css">

    <b-form @submit="onSubmit" @reset="onReset" v-if="show" >
      <b-form-group id="input-group-nombre" label="Nombre:" label-for="input-nombre">
        <b-form-textarea
            id="nombre"
            v-model="form.nombre"
            placeholder="Escribe aquí el nombre de tu anuncio"
            rows="1"
            max-rows="1"
            required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="input-group-precio" label="Precio:" label-for="input-precio">
        <b-form-input
            id="precio"
            type="number"
            min="0"
            v-model="form.precio"
            placeholder="Escribe aquí el precio de tu artículo"
            rows="1"
            max-rows="1"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-textarea
          id="descripcion"
          v-model="form.descripcion"
          placeholder="Escribe aqui tu descripcion"
          rows="3"
          max-rows="6"
          required
      ></b-form-textarea>

      <b-form-group id="input-group-departamento" label="Departamento:" label-for="input-departamento">
        <b-form-select
            id="input-zonaE"
            v-model="form.idCatalogoDepartamento"
            :options="categorias"
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
            placeholder="Enter email"

        ></b-form-input>
      </b-form-group>



      <b-form-group id="input-group-zonaE" label="Zona de entrega:" label-for="input-zonaE">
        <b-form-select
            id="input-zonaE"
            v-model="form.idCatalogoZonaDeEntrega"
            :options="entregas"
            required
        ></b-form-select>
      </b-form-group>


      <b-form-group id="input-group-pago" label="Metodo de pago:" label-for="input-pago">
        <b-form-select
            id="input-pago"
            v-model="form.idCatalogoFormaDePago"
            :options="pago"
            required
        ></b-form-select>
      </b-form-group>


      <b-form-group id="input-group-cond" label="Condicion actual de tu producto:" label-for="input-cond">
        <b-form-select
            id="input-cond"
            v-model="form.idCatalogoCondicion"
            :options="condicion"
            required
        ></b-form-select>
      </b-form-group>



      <label for="calendar">Selecciona una fecha como vigencia de tu anuncio:</label>
      <div >
        <b-calendar id="calendar" v-model="form.vigenciaAnuncio" :min="min" :max="max" locale="en"

        ></b-calendar>
      </div>
      <label for="Imagenes">Selecciona las imagenes que deseas agregar a tu anuncio:</label>
      <div>
        <!-- Styled -->
        <b-form-file
            id="imagenes"
            accept=".jpg, .png, .gif"
            v-model="form.file1"
            :state="Boolean(file1)"
            placeholder="Elige la ubicacion de tu archivo..."
            drop-placeholder="Arrastra tu archivo a este lugar..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>

      </div>
      <label for="Videos">Selecciona los videos que deseas agregar a tu anuncio:</label>
      <div>
        <!-- Styled -->
        <b-form-file
            id="videos"
            accept=".mp4"
            v-model="form.file2"
            :state="Boolean(file2)"
            placeholder="Elige la ubicacion de tu archivo..."
            drop-placeholder="Arrastra tu archivo a este lugar..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>

      </div>




      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

    </b-form>



  </div>
</template>

<script>
import axios from 'axios'
import store from '../store'
export default {
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 1)
    maxDate.setDate(maxDate.getDate())
    var condicionArr = [];
    var condicionArrID = [];
    const axios =  require('axios');

    var condicion = [{
      text:"Condicion de tu producto",
      value:null,
    }]
    var departamentoArr = [];
    var departamentoArrID = [];
    var departamento = [{
      text:"Departamento de tu producto",
      value:null,
    }]
    var entregaArr = [];
    var entregaArrID = [];
    var entrega = [{
      text:"Zona de Venta / Entrega",
      value:null,
    }]
    var pagoArr = [];
    var pagoArrID = [];
    var pago = [{
      text:"Forma de pago",
      value:null,
    }]
    axios.get('http://localhost:9999/api/obtener-catalogos-porIdCatalogoCategoria.json?idCatalogoCategoria=1').then(resp => {
      for(var i=0;i<resp.data.length;i++){
        condicionArr.push(resp.data[i].nombre);
        condicion.push({ text: resp.data[i].nombre, value: resp.data[i].id });
        condicionArrID.push(resp.data[i].id);
      }
      for(var f=0;f<condicionArr.length;f++){
        console.log(condicionArr[f]);
        console.log(condicionArrID[f]);
      }
    });
    axios.get('http://localhost:9999/api/obtener-catalogos-porIdCatalogoCategoria.json?idCatalogoCategoria=2').then(resp => {
      for(var i=0;i<resp.data.length;i++){
        departamentoArr.push(resp.data[i].nombre);
        departamento.push({ text: resp.data[i].nombre, value: resp.data[i].id });
        departamentoArrID.push(resp.data[i].id);
      }
      for(var f=0;f<departamentoArr.length;f++){
        console.log(departamento[f].text);
        console.log(departamento[f].value);
      }
    });

    axios.get('http://localhost:9999/api/obtener-catalogos-porIdCatalogoCategoria.json?idCatalogoCategoria=3').then(resp => {
      for(var i=0;i<resp.data.length;i++){
        entregaArr.push(resp.data[i].nombre);
        entrega.push({ text: resp.data[i].nombre, value: resp.data[i].id });
        entregaArrID.push(resp.data[i].id);
      }
      for(var f=0;f<entregaArr.length;f++){
        console.log(entrega[f].text);
        console.log(entrega[f].value);
      }
    });

    axios.get('http://localhost:9999/api/obtener-catalogos-porIdCatalogoCategoria.json?idCatalogoCategoria=4').then(resp => {
      for(var i=0;i<resp.data.length;i++){
        pagoArr.push(resp.data[i].nombre);
        pago.push({ text: resp.data[i].nombre, value: resp.data[i].id });
        pagoArrID.push(resp.data[i].id);
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
        idCatalogoCondicion: 1,
        idCatalogoDepartamento: 1,
        idCatalogoFormaDePago: 1,
        idCatalogoZonaDeEntrega: 1,
        idUsuario: store.state.session.idUser,
        nombre: "",
        precio: null,
        vigenciaAnuncio: ""
      },

      show: true

    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios.post("http://localhost:9999/api/salva-anuncio.json", this.form).then(res => {
        if(res.data == -1) {
          alert("Sólo se puede tener un anuncio activo y usted ya tiene uno");
        }else {
          alert("USTED SERÁ REDIRECCIONADO");
        }
      });
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
      this.form.vigenciaAnuncio = ""
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>


<style>
.padre {
  /* Codigo para centrar*/
  display: flex;
  justify-content: left;
  align-items: left;
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