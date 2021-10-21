<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-sm-12">
                    <h5>{{ titulo }}</h5>
                </div>
            </div>
        </div><!-- ends header-->
        <div class="card-body">
            <vue-dropzone 
                ref="myVueDropzone" 
                id="myVueDropzone" 
                v-on:vdropzone-sending="sendingEvent"
                v-on:vdropzone-success="successEvent"
                v-on:vdropzone-error="errorEvent"
                :options="dropzoneOptions">
            </vue-dropzone>
        </div>
        <div class="card-body">
          <div class="row">
              <table class="table">
                <thead class="text-center">
                  <tr class="col-1">
                    <th>
                      Principal
                    </th>
                    <th class="text-left">
                      Imagen
                    </th>
                    <th class="col-1 text-left">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in imagenes" :key="index">
                      <td class="col-md d-flex justify-content-center">
                          <b-form-radio v-model="item.principal"  @change="seleccionarImagen(item)" name="some-radios" :value="selected"></b-form-radio>
                      </td>
                      <td class="col-5"> 
                        <img v-if="!item.uuid.includes('mp4') && !item.uuid.includes('avi')" :src="ruta+item.uuid" class="img-fluid" 
                          width="150px" height="150px" /><br/>
                        <video poster="../../assets/processing.gif" v-if="item.uuid.includes('mp4') || item.uuid.includes('avi')" class="video-fluid" autoplay 
                          loop muted width="150px" height="150px">
                          <source :src="rutaVideo + item.uuid" type="video/mp4" />
                        </video>
                      </td> 
                      <td>
                          <b-icon class="h1" icon="trash-fill" aria-hidden="true" 
                              style="color:red;font-size: 2rem;cursor:hand" :id="index" @click="eliminarImagen(index,item)"
                              title="Elimina la imagen">
                          </b-icon>
                      </td>
                    </tr>
                </tbody>
              </table>
          </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import axios from 'axios';
import store from '../../store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
  components: {
    vueDropzone: Vue2Dropzone
  },
  props:['imagenes','id'],
  mounted(){
    this.ruta = process.env.VUE_APP_URL_MEDIA;
    this.rutaVideo = process.env.VUE_APP_URL_MEDIA_VIDEO;
  }, 
  created(){
    this.dropzoneOptions = {
          url: this.calcula(),
          maxFilesize: 30,
          thumbnailWidth: 140,
          thumbnailMethod: 'contain',
          addRemoveLinks: true,
          dictRemoveFile: 'Eliminar',
          dictDefaultMessage: 'Arrastra y suelta tus archivos a subir aqui.',
          destroyDropzone: false,
          headers: {
            "jwt": store.state.session.jwt,
          }, 
          //autoProcessQueue: false, // Make sure the files aren't queued until manually added
          init: function () {
            this.on("success", function (file) {
            console.log("success > " + file.name);
            this.removeFile(file);
            });
          },
      };
  },
  data: function () {
    return {
        ruta:'',
        rutaVideo:'',
        titulo: 'Interfase de carga de imágenes',
        selected: 'true',
    }
  }, 
  methods: {
        calcula: function() {
            return axios.defaults.baseURL + 'api/anuncios/imagen.json';
        },
        sube: function() {
            console.log('subeeeeeeeee');
            this.$refs.myVueDropzone.processQueue();
        },
        sendingEvent (file, xhr, formData) {
          console.log("file "+file , xhr, formData);
          xhr.setRequestHeader('idAnuncio', this.id );
        },
        successEvent(file,response){
          console.log("--> successEvent "+file +" response "+response);
            if (this.imagenes.length == 0) {
              response.principal = true;
              this.selected = true
            }else{
              response.principal = false;
            }
            this.imagenes.push(response);
        },
        errorEvent(file){
            console.log("--> errorEvent "+file );
        },
        eliminarImagen(index,item){
           axios.delete('api/anuncios/imagen.json',{headers: {uuid: item.uuid}
           }).then(response => {
               console.log("--> "+response);
               this.$delete(this.imagenes, index);
               this.imagenes.forEach((element,index) => {
                 if (index == 0 || item.principal == true) {
                   element.principal = true;
                   this.selected = true;
                 }
               });
            }).catch(error => {
                console.log("--> error "+error);
            }); 
        },
        seleccionarImagen(item){
          console.log(item.principal)
          console.log(this.imagenes)
          this.imagenes.forEach(element => {
            element.principal = false;
          });
          item.principal = true;
          axios.put('api/anuncios/imagen/principal.json',  { 
            idAnuncio:item.idAnuncio,
            uuid: item.uuid
          }).then(response => {
            console.log("--> "+response);
          }).catch(error => {
            console.log("--> error "+error);            
          });
        }
  }
}
</script>