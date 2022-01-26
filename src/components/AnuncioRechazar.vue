<template>
    <div class="ancho centra" style="max-width:1200px">
        <div class="card">
            <div class="card-header">
                <label class="control-label h4">Correo</label>
            </div>
            <div class="card-body" style="margin:20px;">
                <div class="row">
                    <div class="col">
                        <label class="control-label h4">Asunto:</label>
                    </div>
                    <div class="col">
                        <label class="control-label h5"> Super Tienda: Anuncio Rechazado </label>
                    </div>
                </div>
                <div class ="form-row form-group">
                    <div class="col">
                        <label class="control-label h4">Mensaje:</label>
                    </div>
                    <div class="col">
                        <input type="text" required class="form-control" :class="classMsg" placeholder="¿Por qué se rechazó?" v-model="mensaje">
                        <small class="notValid">{{msgMsg}}</small>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col text-center" >
                        <button
                            :disabled="habilitaBoton"
                            class="btn btn-success"
                            @click="submition">Enviar</button>
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
        name="notificado"
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
    import axios from 'axios';
    import router from '../router';
    export default {
        props: {
            idAnuncio: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                titulo: '',
                descripcion: '',
                mensaje: '',
                msgMsg: '',
                classMsg: 'defaultColor'
            }
        },
        mounted() {
            if (isNaN(this.idAnuncio)) {
                this.titulo = 'Error';
                this.descripcion = 'Anuncio incorrecto';
                this.$modal.show('aviso');
            }
        },
        methods: {
            close(){
                this.$modal.hide('aviso');
                router.push({path:'/ui/gestor-administrador'}).catch(()=>{});
            },
            closeV(){
                this.$modal.hide('notificado');
                router.push({path:'/ui/gestor-administrador'}).catch(()=>{});
            },
            submition() {
                axios.get('api/cambia-notificado-anuncio.json', {
                    params: {
                        id: this.idAnuncio,
                        notificado: true,
                        mensaje: this.mensaje
                }}).then((response) => {
                    if (response.data < 1) {
                        this.titulo = 'Error';
                        this.descripcion = 'Hubo un problema al intentar cambiar notificado el anuncio, intenta más tarde.';
                        this.$modal.show('aviso');
                    } else {
                        this.titulo = 'Logrado';
                        this.descripcion = 'El vendedor ha sido notificado';
                        this.$modal.show('notificado');
                    }
                }).catch(() => {
                    this.titulo = 'Error';
                    this.descripcion = 'Hubo un problema al intentar enviar un correo, intenta más tarde.';
                    this.$modal.show('aviso');
                })
            }
        },
        watch: {
            mensaje() {
                this.msgMsg="";
                this.classMsg="greenColor correct";
                if (this.mensaje.trim().length < 1) {
                    this.msgMsg="El mensaje no debe ser vacío";
                    this.classMsg="redColor incorrect";
                }
            }
        },
        computed: {
            habilitaBoton: function() {
                var dato = true && this.mensaje && this.mensaje.trim().length > 0;
                return !dato;
            }
        }
    }
</script>
