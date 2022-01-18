<template>

  <div>
    <!-- Bootstrap core CSS -->
    <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom styles for this template -->
    <link href="form-validation.css" rel="stylesheet">
    <link rel="stylesheet" href="css/estilos.css">
        <div class="py-5 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-file-earmark-post" viewBox="0 0 16 16">
          <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
          <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7zm0-3a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <p class="lead">¡Vamos a crear un anuncio!</p>

        </div>
   

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
          <b-form-textarea
              id="precio"
              v-model="form.precio"
              placeholder="Escribe aquí el precio de tu artículo"
              rows="1"
              max-rows="1"
              required
          ></b-form-textarea>
        </b-form-group>
      <b-form-group id="input-group-cat" label="Categorias:" label-for="input-cat">
        <b-form-select
          id="input-cat"
          v-model="form.categoria"
          :options="categorias"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-zonaE" label="Zona de entrega:" label-for="input-zonaE">
        <b-form-select
          id="input-zonaE"
          v-model="form.entrega"
          :options="entregas"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-pago" label="Metodo de pago:" label-for="input-pago">
        <b-form-select
          id="input-pago"
          v-model="form.pago"
          :options="pago"
          required
        ></b-form-select>
      </b-form-group>
     
      
      <b-form-textarea
        id="descripcion"
        v-model="form.descripcion"
        placeholder="Escribe aqui tu descripcion"
        rows="3"
        max-rows="6"
        required
      ></b-form-textarea>
     
      
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

      <b-form-group id="input-group-cond" label="Condicion actual de tu producto:" label-for="input-cond">
       <b-form-select
          id="input-cond"
          v-model="form.condicion"
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
     
      return {
       
        min: minDate,
        max: maxDate,
        
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
        categorias: [{ text: 'Selecciona Una', value: null },1],
        entregas:   [{ text: 'Selecciona Una', value: null },1],

        pago:       [{ text: 'Selecciona Una', value: null }, 1],
        condicion:  [{ text: 'Select One', value: null }, 1],
        show: true
        
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        axios.post("http://localhost:9999/api/salva-anuncio.json", this.form)
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