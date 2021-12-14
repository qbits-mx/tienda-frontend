<template>
    <div class="ancho centra" style="max-width:1200px">
        <div class="card">
            <div class="card-header">
                <label class="control-label h4">Anuncio</label>
            </div>
            <div class="card-body" style="margin:20px;">
                <div class="row">
                    <div class="col">
                        <label class="control-label h4">Descripción:</label>
                    </div>
                    <div class="col">
                        <label class="control-label h5"> {{ this.anuncio.descripcion }} </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="control-label h4">Datos de contacto:</label>
                    </div>
                    <div class="col">
                        <label class="control-label h5"> {{ this.anuncio.datosContacto }} </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="control-label h4">Multimedias:</label>
                    </div>
                </div>
                <div class="row">
                    <div v-if="multimedias.length > 0">
                        <carrete 
                            @siguiente="siguiente"
                            @atras="atras">
                            <carrete-slide v-for="(multimedia, index) in multimedias"
                                :key="index"
                                :index="index"
                                :visibleSlide="visibleSlide">
                                <div v-if="multimedia.tipo === 'imagen'">
                                    <img  :src="multimedia.url" style="width:100%;"/>
                                </div>
                                <div v-else-if="multimedia.tipo === 'video'">
                                    <iframe  :src="multimedia.url" style="width:100%;"/>
                                </div>
                                <div v-else>
                                    <img  :src="novisible" style="width:100%;"/>
                                </div>
                            </carrete-slide>
                        </carrete>
                    </div>
                    <div v-else>
                        <label class="control-label h4">No hay multimedia</label>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <a href="#" class="btn btn-primary" @click="validar">Validar</a>
                    </div>
                    <div class="col">
                        <a href="#" class="btn btn-primary" @click="rechazar">Rechazar</a>
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
            <div class="card-header" style="text-align:center">Error</div>
            <div class="card-body">
                <h5 class="card-title">{{ titulo }}</h5>
                <p class="card-text">{{ descripcion }}</p>
                <div style="text-align: right;">
                    <a href="#" class="btn btn-primary" @click="close">Aceptar</a>
                </div>
            </div>
        </div>
    </modal>

    <modal
        name="validado"
        :clickToClose="false"
        :reset="true"
        :width="480"
        :height="260">
        <div class="card">
            <div class="card-header" style="text-align:center">Éxito</div>
            <div class="card-body">
                <h5 class="card-title">{{ titulo }}</h5>
                <p class="card-text">{{ descripcion }}</p>
                <div style="text-align: right;">
                    <a href="#" class="btn btn-primary" @click="closeV">Aceptar</a>
                </div>
            </div>
        </div>
    </modal>
    </div>
</template>

<script>
    import Carrete from './componente_validar/Carrete.vue'
    import CarreteSlide from './componente_validar/CarreteSlide.vue'
    import axios from 'axios';
    import router from '../router';
    export default {
        props: {
            idAnuncio: {
                type: Number,
                required: true
            }
        },
        components: {
            Carrete,
            CarreteSlide
        },
        data() {
            return {
                anuncio: {},
                titulo: '',
                descripcion: '',
                multimedias: [],
                visibleSlide: 0,
                novisible: 'https://cdn.colombia.com/sdi/2021/03/16/tierno-perro-se-vuelve-viral-hacer-chichi-casa-y-limpiarlo-con-trapo-901077.jpg'
            }
        },
        beforeMount() {
            this.getAnuncio();
            this.getMultimedias();
        },
        methods: {
            close(){
                this.$modal.hide('aviso');
                router.push({path:'/ui/gestor-administrador'}).catch(()=>{});
            },
            closeV(){
                this.$modal.hide('validado');
                router.push({path:'/ui/gestor-administrador'}).catch(()=>{});
            },
            getAnuncio(){
                axios.get('api/obten-anuncio.json', {
                    params: {
                        id: this.idAnuncio
                }}).then((response) => {
                    this.anuncio = response.data;
                    if (this.anuncio.validado) {
                        this.titulo = 'Error';
                        this.descripcion = 'Este anuncio ya fue validado';
                        this.$modal.show('aviso');
                    }
                    if (this.anuncio.notificado) {
                        this.titulo = 'Error';
                        this.descripcion = 'Este anuncio ya fue rechazado';
                        this.$modal.show('aviso');
                    }
                }).catch(() => {
                    this.titulo = 'Error';
                    this.descripcion = 'Hubo un problema al intentar obtener el anuncio, intenta más tarde.';
                    this.$modal.show('aviso');
                })
            },
            getMultimedias() {
                axios.get('api/dame-multimedias.json', {
                    params: {
                        id: this.idAnuncio
                }}).then((response) => {
                    this.multimedias = response.data;
                }).catch(() => {
                    this.titulo = 'Error';
                    this.descripcion = 'Hubo un problema al intentar obtener el anuncio, sintenta más tarde.';
                    this.$modal.show('aviso');
                })
            },
            siguiente() {
                if (this.visibleSlide >= this.multimedias.length -1) {
                    this.visibleSlide = 0;
                } else {
                    this.visibleSlide++;
                }
            },
            atras() {
                if (this.visibleSlide <= 0) {
                    this.visibleSlide = this.multimedias.length-1;
                } else {
                    this.visibleSlide--;
                }
            },
            validar() {
                axios.get('api/cambia-validado-anuncio.json', {
                    params: {
                        id: this.idAnuncio,
                        validado: true
                }}).then((response) => {
                    if (response.data < 1) {
                        this.titulo = 'Error';
                        this.descripcion = 'Hubo un problema al intentar validar el anuncio, intenta más tarde.';
                        this.$modal.show('aviso');
                    } else {
                        this.titulo = 'Logrado';
                        this.descripcion = 'El anuncio fue validado correctamente';
                        this.$modal.show('validado');
                    }
                }).catch(() => {
                    this.titulo = 'Error';
                    this.descripcion = 'Hubo un problema al intentar validar el anuncio, intenta más tarde.';
                    this.$modal.show('aviso');
                })
            },
            rechazar() {
                router.push({path:'/validar-rechazar/rechazar/' + this.idAnuncio}).catch(()=>{});
            }
        }
    }

</script>

<style>
</style>
