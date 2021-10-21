
<template>
<div class="ancho centra" style="max-width:1200px">
    <div class="card defaultColor">
        <div class="card-header">
            <label class="control-label h4">Registro de Roles</label>
        </div>
        <div class="card-body align" style="margin:20px;">

            <div class="row">
                <div class="form-inline">
                    <label for="nombre" class="col-form-label mr-2">Agregar Rol:</label>
                    <!--input type="text" required class="form-control mr-3"  v-model="name">

                    <button type="button" @click="submition" class="btn btn-primary mr-2">
                        <i class="fa fa-search fa-fw" aria-hidden="true"></i>Consultar</button-->
                    <button type="button" @click="openAdd" class="btn btn-success mr-2">
                        <i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
            </div> <!-- end row -->

    <br><br>

            <div class="row">
                <table class="table table-hover table-sm table-striped">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estatus</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="r in roles" :key="r.id">
                            <td>{{r.id}}</td>
                            <td>{{r.nombre}}</td>
                            <td class="center"><h4><span v-if="r.activo == 1" class="badge badge-info ml-2">Activo</span><span v-else class="badge badge-danger">Inactivo</span></h4></td>
                            <td>
                                <button type="button" @click="openEdit(r.id, r.nombre, r.activo)" class="btn btn-success mb-2 mr-4">
                                    <i class="fa fa-edit" aria-hidden="true"></i></button>
                                <button type="button" @click="openDelete(r.id, r.nombre)" class="btn btn-danger mb-2 mr-4">
                                    <i class="fa fa-trash" aria-hidden="true"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><!--  end row -->
        </div>
    </div><!-- ends header-->

        <!-- Modal -->

        <modal
            name="editarRegistro"
            :clickToClose="false"
            :reset="true"
            :width="400"
            :height="270">
            <div class="card">
                <div class="card-header">Editar Rol</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="nombrepaqueteria">Nombre:</label>
                        <input id="nombrepaqueteria" type="text" required class="form-control" :class="className1" v-model="nombreActual">
                        <small class="notValid">{{msgName1}}</small>
                    </div>

                    <div >
                       <b-form-checkbox v-model="activo">Activo</b-form-checkbox>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="primary" :disabled="habilitaBotonActualizar" class="mr-2" @click="modificarRegistro">Aceptar</b-button>
                        <b-button variant="danger" class="mr-2" @click="closeModalEdit">Cancelar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="mensaje-exito"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Actualización Exitosa</div>
                <div class="card-body">
                    <h5 class="card-title">Se actualizo correctamente</h5>
                    <p class="h1 mb-2" style="text-align:center;font-size:4em">
                        <b-icon icon="check-circle" variant="success"></b-icon>
                    </p>
                    <div style="text-align: right;">
                        <b-button variant="success" @click="closeModalExito">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="agregarRegistro"
            :clickToClose="false"
            :reset="true"
            :width="400"
            :height="250">
            <div class="card">
                <div class="card-header">Agregar Rol</div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="nombrepaqueteria">Nombre:</label>
                        <input id="nombrepaqueteria" type="text" required class="form-control" :class="className2" v-model="nombreNuevo">
                        <small class="notValid">{{msgName2}}</small>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button
                            :disabled="habilitaBoton"
                            variant="primary"
                            class="mr-4"
                            @click="agregarRegistro">Aceptar</b-button>
                        <b-button variant="danger" @click="closeModalAdd2">Cancelar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="mensaje-exito-add"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Registro Exitoso</div>
                <div class="card-body">
                    <h5 class="card-title">Se agrego correctamente</h5>
                    <p class="h1 mb-2" style="text-align:center;font-size:4em">
                        <b-icon icon="check-circle" variant="success"></b-icon>
                    </p>
                    <div style="text-align: right;">
                        <b-button variant="success" @click="closeModalAdd">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="eliminarRegistro"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="200">
            <div class="card">
                <div class="card-header">Eliminar</div>
                <div class="card-body">
                    <p class="card-text">¿Está seguro que desea eliminar el registro {{this.nombreActual}}?</p>
                    <div class="my-4" style="text-align: right;">
                        <b-button variant="warning" class="mr-2" @click="eliminarRegistro">Si, eliminar!</b-button>
                        <b-button variant="danger" class="mr-2" @click="closeModalDelete">Cerrar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <!-- Modal -->

        <modal
            name="mensaje-exito-delete"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Borrado Exitoso</div>
                <div class="card-body">
                    <h5 class="card-title">Se elimino correctamente</h5>
                    <p class="h1 mb-2" style="text-align:center;font-size:4em">
                        <b-icon icon="check-circle" variant="success"></b-icon>
                    </p>
                    <div style="text-align: right;">
                        <b-button variant="success" @click="closeModalDelete2">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->

        <modal
            name="modal-general"
            :clickToClose="false"
            :reset="true"
            :width="480"
            :height="245">
            <div class="card">
                <div class="card-header">Error</div>
                <div class="card-body">
                    <div class="form-group">
                        <h4>No fue posible realizar está acción.</h4>
                        <p>{{msnErrorIrreconocible}}</p>
                        <small></small>
                    </div>

                    <div class="form-group my-4" style="text-align: right;">
                        <b-button variant="info" @click="openGen">Aceptar</b-button>
                    </div>
                </div>
            </div>
        </modal><!-- ends modal-->
</div>
</template>



<script>
    import axios from 'axios';
    import store from '../store';
    import "vue-range-slider/dist/vue-range-slider.css";
    import { BootstrapVue } from 'bootstrap-vue';
    import Vue from "vue";
    Vue.use(BootstrapVue);
    export default {
        components: {
        },
        data() {
            return {
                name: '',
                msgName : null,
                msgNameN : null,
                msgName1 : null,
                msgName2 : null,
                className1: null,
                className2: null,
                idActual: 0,
                nombreActual: '',
                paises: null,
                nombreNuevo: '',
                descripcion: '',
                detalladaDescripcion: '',
                precio: '',
                descripcionN: '',
                activoActual: '',
                precioN: '',
                className: 'defaultColor',
                classNameN: 'defaultColor',
                styleCarac : 'color:grey;',
                styleUpper : 'color:grey;',
                styleNum : 'color:grey;',
                styleCarac2 : 'show',
                styleUpper2 : 'show',
                styleNum2 : 'show',
                styleCalendar : '',
                isVisible : 'hidden',
                activo: 0,
                activoClave : true, //Cambia el valor del booleano para ver las distintas versiones de validaciones de la clave
                dateConfig : {
                    initial : new Date(2000,0,1),
                    min : new Date(1930,0,1),
                    max : new Date(2003,11,30)
                },
                sliderValue : 100,
                pwConfDisabled: true,
                msnErrorIrreconocible: '',
                roles: {},
            }
        },
        watch: {
            nombreNuevo() {
                this.msgName2="";
                this.className2="greenColor correct";
                if (this.nombreNuevo.trim().length<3) {
                    this.msgName2="El rol debe contener más de 3 letras";
                    this.className2="redColor incorrect";
                }
                if (this.nombreNuevo.trim().length>20) {
                    this.msgName2="El rol debe contener menos letras";
                    this.className2="redColor incorrect";
                }
                this.nombreNuevo= this.nombreNuevo.length===1 ? this.nombreNuevo.toUpperCase() : this.nombreNuevo;
            },
            nombreActual() {
                this.msgName1="";
                this.className1="greenColor correct";
                if (this.nombreActual.trim().length<3) {
                    this.msgName1="El rol debe contener más de 3 letras";
                    this.className1="redColor incorrect";
                }
                if (this.nombreActual.trim().length>20) {
                    this.msgName1="La rol debe contener menos letras";
                    this.className1="redColor incorrect";
                }
                this.nombreActual= this.nombreActual.length===1 ? this.nombreActual.toUpperCase() : this.nombreActual;
            }

        },
        computed: {
            habilitaBoton: function() {
                var dato = true && this.nombreNuevo && this.nombreNuevo.length>2 && this.nombreNuevo.length<=20
                return !dato;
            },
            habilitaBotonActualizar: function() {
                var dato = true && this.nombreActual && this.nombreActual.length>2
                && this.nombreActual && this.nombreActual.length<=20
                return !dato;
            }
        },
        beforeMount() {
            this.getroles()
        },
        methods: {
            openGen(){
                this.$modal.hide('modal-general');
            },
            openEdit(id, nombre, activo){
                this.idActual=id;
                this.nombreActual=nombre;
                this.activo=activo;
                this.$modal.show('editarRegistro');
            },
            openDelete(id, nombre){
                this.nombreActual=nombre;
                this.idActual=id;
                this.$modal.show('eliminarRegistro');
            },
            getroles(){
                axios.get('api/roles.json', {
                    }).then(response => {
                        this.roles=response.data;
                    }).catch(error => {
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    })
            },
            closeModalDelete: function() {
                this.$modal.hide('eliminarRegistro');
            },
            closeModalDelete2: function() {
                this.$modal.hide('mensaje-exito-delete');
            },
            closeModalEdit: function() {
                this.$modal.hide('editarRegistro');
            },
            openAdd(){
                this.nombreNuevo= '',
                this.activo=1,
                this.$modal.show('agregarRegistro');
            },
            closeModalAdd: function() {
                this.$modal.hide('mensaje-exito-add');
            },
            closeModalAdd2: function() {
                this.$modal.hide('agregarRegistro');
            },
            closeModalExito: function() {
                this.$modal.hide('mensaje-exito');
                this.$modal.hide('editarRegistro');
            },
            submition() {
                if (this.name) {
                    console.log("...")
                }
                else {
                    axios.get('api/roles.json', {
                    }).then(response => {
                        this.roles=response.data;
                    }).catch(error => {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        this.msgErr = error.response.data['exceptionLongDescription'];
                        this.msnErrorIrreconocible = this.msgErr;
                        this.$modal.show('modal-general');
                    });
                }
            },
            modificarRegistro() {
                axios.put('api/rol.json', {
                    id:this.idActual,
                    nombre : this.nombreActual,
                    activo: this.activo,
                }).then(response => {
                    console.log(response);
                    this.submition();
                    this.$modal.show('mensaje-exito');
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            agregarRegistro() {
                console.log(store.state);
                axios.post('api/rol.json', {
                    nombre : this.nombreNuevo,
                    activo : 1,
                }).then(response => {
                    console.log("enviado");
                    console.log(response);

                    this.$modal.hide('agregarRegistro');
                    this.$modal.show('mensaje-exito-add');
                    this.submition();
                }).catch(error => {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                })
            },
            eliminarRegistro() {
                axios.delete('api/rol.json', {
                    data: {
                        id:this.idActual
                    }
                }).then(response => {
                    console.log(response);
                    this.roles=response.data;
                    this.$modal.hide('eliminarRegistro');
                    this.$modal.show('mensaje-exito-delete');
                    this.submition();
                }).catch(error => {
                    this.$modal.hide('eliminarRegistro');
                    console.log(error.response.status);
                    console.log(error.response.data);
                    this.msgErr = error.response.data['exceptionLongDescription'];
                    this.msnErrorIrreconocible = 'La Eliminación del registro indicado no se completo ya que cuenta con usuario que lo utilizan.'
                    this.$modal.show('modal-general');
                });
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.align {
    text-align: left;
}
.notValid{
    color:rgb(235, 74, 74);
}
.greenColor:focus{
    background-color: #eefaee;
    box-shadow: 2px 1px 4px #bdd3ae;
}
.correct{
    border-color:rgb(96, 161, 99);
    border-width: 1px;
    box-shadow: 1px 1px 3px #d8dcdd;
    background: url(../assets/check.png) no-repeat scroll;
    background-position:right ;
    background-size: 17px;
    background-position-x: 96%;
}
.redColor:focus{
    background-color:   #fff3f3  ;
    box-shadow: 2px 1px 4px #dba6a6;
}
.incorrect{
    border-color:rgb(235, 74, 74);
    border-width: 1px;
    box-shadow: 1px 1px 3px #d8dcdd;
    background: url(../assets/danger.jpg) no-repeat scroll;
    background-position:right ;
    background-size: 20px;
    background-position-x: 96%;
}
.defaultColor{
    background-color: white;
    box-shadow: 1px 1px 3px #d8dcdd;
}
.hidden{
    display: none;
}
.show{
    display: block;
}
.inner-addon { 
    position: relative; 
}
.inner-addon .icon {
  position: absolute;
  padding: 10px;
  pointer-events: none;
}
.left-addon .icon  { left:  0px;}
.right-addon .icon { right: 0px;}
.left-addon input  { padding-left:  30px; }
.right-addon input { padding-right: 30px; }
.btn-contenido {
min-width: 150px;
text-align: center;
}
</style>