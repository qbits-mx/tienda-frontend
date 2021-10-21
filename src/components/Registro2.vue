<template>

<div class="ancho centra">

  <div v-if="loading" class="loader"/>

  <div class="row">
    <div class="col-md-5 col-lg-5 col-12" >
      <img src="../assets/registro.webp" width="100%"/>
    </div>
    <div class="col-md-7 col-lg-7 col-12">

      <div class="card defaultColor w-100">

        <div class="card-header">
            <label class="control-label h4">Registro al sistema</label>
        </div><!-- ends card header -->

        <div class="card-body align" >

            <!-- Nick -->
            <div class ="form-row form-group">
              <div class="col-md-4">
                <label for="nombre">Nick:</label> 
              </div>
              <div class="col">
                <input type="text" required class="form-control" :class="className" placeholder="Mi apodo" v-model="name">
                <small class="notValid">{{msgName}}</small>
              </div>
            </div>

            <!-- correo -->
            <div class ="form-row form-group">
              <div class="col-md-4">
                <label for="correo">Correo:</label>
              </div>
              <div class="col">
                <input type="email" required class="form-control" :class="classMail" id="mail" placeholder="ejemplo@gmail.com" v-model="email">
                <small class="notValid">{{msgMail}}</small>
              </div>
            </div>

            <!-- clave -->
            <div class="form-row form-group">
              <div class="col-md-4">
                <label for="clave">Clave:</label>
              </div>
              <div class="col">
                <input type="password" required :class="classPasswd" class="form-control" id="clave" placeholder="******" v-model="password">
                <div class="col" :class="estiloClave1"> <!--cambiar booleano "activaClave" linea 242-->
                  <small id="clave" class="form-text text-muted" :class="isVisible">
                    <b>La clave contiene:</b>
                    <ul>
                      <li :style="styleCarac">8 carateres como mínimo</li>
                      <li :style="styleUpper">Una mayúscula</li>
                      <li :style="styleNum">Un número</li>
                      <li :style="styleSpecial">Un caracte especial, como _, -, #, etc.</li>
                    </ul>
                  </small>
                </div>
                <div class="col" :class="estiloClave2">
                  <input type="password" required :class="classPasswd" class="form-control" id="clave" placeholder="******" v-model="password">
                  <small id="clave" class="form-text text-muted" :class="isVisible">
                    <b v-if="msgPasswd!=''">Falta que la clave contenga:</b>
                    <ul>
                      <li :class="styleCarac2">8 carateres como mínimo</li>
                      <li :class="styleUpper2">Una mayúscula</li>
                      <li :class="styleNum2">Un número</li>
                      <li :style="styleSpecial2">Un caracter especial (_, -, #, etc.)</li>
                    </ul>
                  </small>
                </div>
              </div>
            </div>

            <!-- clave confirma -->
            <div class="form-row form-group">
              <div class="col-md-4">
                <label for="confirmacion">Confirmación de la clave:</label>
              </div>
              <div class="col">
                <input type="password" required :disabled="pwConfDisabled" :class="classConfirm" class="form-control" id="confirmacion" placeholder="******" v-model="confirm">
                <small class="notValid">{{msgConfirm}}</small>
              </div>
            </div>

            <!-- fecha de nacimiento -->
            <div class ="form-row form-group">

                <div class="col-md-4 col-12">
                  <label>Fecha de nacimiento:</label>
                </div>

                <div class="col-sm-12 col-md-8 col-xl-2 offset-xl-0">
                <select class="form-control combo" v-model="year">
                  <option v-for="i in 70" :key="i">{{ 2002 - i }}</option>
                </select>
                </div>
                <div class="col-sm-4 offset-lg-4 offset-md-4 col-md-8 col-lg-3 col-xl-2 offset-xl-0">
                <select class="form-control combo" v-model="day">
                  <option v-for="i in diasDelMes" :key="i">{{ i }}</option>
                </select>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-5 offset-md-4 offset-lg-0 col-xl-4">
                  <select class="form-control combo" v-model="month">
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                  </select>
                </div>
              <div class="col-sm-8 col-md-8 offset-md-4">
                <span class="info">(debes ser mayor de 21 años para registrarte)</span>
              </div>
            </div>

            <div class ="form-row form-group">
              <div class="mx-auto">
                <a href="#" @click="openLoginPage">Regresar a login</a>
              </div>
            </div>

            <!-- Google Re captcha V 2.0-->
            <!-- https://www.google.com/recaptcha/admin/site/450433503 -->
            <!-- account: garellanos@ultrasist.com.mx -->

            <!-- button -->
            <div class="form-group row">
              <div class="col text-center" >
                  <button
                    :disabled="habilitaBoton"
                    class="btn btn-success"
                    data-toggle="modal"
                    data-target="#termsModal">Registrarme</button>

                <!--          Modal-->
                  <div class="modal fade" id="termsModal" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header mb-2 bg-light">
                          <h5 class="modal-title ml-3" >
                            <b>Términos y condiciones</b>
                          </h5>
                          <button type="button" class="close mr-2" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div class="modal-body mx-2">
                          <div class="row " style="text-align: left">
                              <div class="col">
                                <p class=" h6">
                                  He leido y estoy de acuerdo con:<br><br>
                                </p>
                                <small class="px-4">
                                  <input type="checkbox"  required  id="agree1" v-model="servicio"/>
                                  <a href="#"> Los términos de servicio</a><br>
                                </small >
                                <small class="px-4">
                                  <input type="checkbox"  required  id="agree2" v-model="avisoP"/>
                                  <a href="#"> El aviso de privacidad de datos personales</a><br>
                                </small>
                                <small class="px-4">
                                  <input type="checkbox"  required  id="agree3" v-model="mayor"/>
                                  <a href="#"> Que soy mayor de edad y publico por mi propia voluntad</a><br>
                                </small>

                                <div class="row pt-3" style="padding-left: 40px">
                                  <div class="g-recaptcha mx-auto">
                                    <vue-recaptcha
                                        id="solvecaptcha"
                                        ref="recaptcha"
                                        sitekey="6LffEdkaAAAAAOJllar3d53MdUh3qOZLhdQ8GuQs"
                                        @expired="onCaptchaExpired"
                                        @verify="onCaptchaVerified"/>
                                  </div>
                                </div>
                              </div>


                          </div>
                        </div>
                        <div v-if="!vacio" class="modal-footer border-top-0 d-flex justify-content-around px-0 mb-3">
                          <button type="button" class="btn btn-outline-info" @click="openLoginPage" data-dismiss="modal">Volver al login</button>
                          <button type="button" :disabled="verifyCheck" class="btn btn-outline-info" data-dismiss="modal" @click="submition">Continuar con el registro</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        </div><!-- ends card body -->

      </div><!-- ends card -->


    </div>
  </div>

    <Aviso
      ref='aviso'
      ancho='320'
      :target=target
      :avisoMsg=msgErr
      :avisoTitulo=texto /> 

    <ModalLogin ref='gustavo' />
</div>

</template>

<script>
  import Vue from 'vue'
  import VueRecaptcha from 'vue-recaptcha';
  import axios from 'axios';
  import router from '../router';
  import "vue-range-slider/dist/vue-range-slider.css";
  import Aviso from './custom/dialog/Aviso';
  import ModalLogin from '../components/custom/dialog/ModalLogin.vue'
  import store from '../store'

  const HTTP_STATUS = {
    OK : 200,
    FORBIDDEN: 403
  }

  const emaiRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  const regularExpression = new RegExp(/[&\\#, +(\-\\_)$~%.'":*?<>{}]/g);
  const nameRegExp = new RegExp(/^([A-Za-z0-9]{3,8})$/);

  export default {
    components: {
      VueRecaptcha,
      Aviso,
      ModalLogin
    },
    data() {
      return {
        msgErr:'',
        target:'',

        name: '',
        email : '',
        password : '',
        confirm : '',
        fNacimiento : null,
        tel : '',
        captcha: false,

        year: 2000,
        month: 1,
        day: 1,

        msgName : null,
        msgMail : null,
        msgPasswd : null,
        msgConfirm : null,
        msgCalendar : null,
        msgTel : null,

        className: 'defaultColor',
        classMail: 'defaultColor',
        classPasswd: 'defaultColor',
        classConfirm: 'defaultColor',
        classCalendar: 'defaultColor',
        classTel: 'defaultColor',

        styleCarac : 'color:grey;',
        styleUpper : 'color:grey;',
        styleNum : 'color:grey;',
        styleSpecial : 'color:grey',

        styleCarac2 : 'show',
        styleUpper2 : 'show',
        styleNum2 : 'show',
        styleSpecial2 : 'show',

        styleCalendar : '',
        isVisible : 'hidden',
        activoClave : true, //Cambia el valor del booleano para ver las distintas versiones de validaciones de la clave

        dateConfig : {
          initial : new Date(2000,0,1),
          min : new Date(1930,0,1),
          max : new Date(2003,11,30)
        },
        sliderValue : 100,
        pwConfDisabled: true,

        loading: false,
        texto : '',
        descripcionModal : '',

        servicio : false,
        avisoP : false,
        mayor : false
     }
    },
    watch: {
      month() {
        this.day=1;
      },
      year() {
        this.day=1;
      },
      name(){
        this.msgName="";
        this.className="greenColor correct";
        if (!nameRegExp.test(this.name)){
          this.msgName="El nick debe mayor a 3 caracteres, sin espacios ni caracteres especiales. Puede contener números.";
          this.className="redColor incorrect";
        }
        //this.name= this.name.length===1 ? this.name.toUpperCase() : this.name;
      },

      email(){
        this.msgMail="";
        this.classMail="greenColor correct";
        if(!emaiRegex.test(this.email)) {
          this.msgMail="El correo ingresado no es valido";
          this.classMail="redColor incorrect";
        }
      },

      password(value){
        this.msgPasswd="Clave incorrecta";
        this.classPasswd="redColor incorrect";
        this.pwConfDisabled = true;
        this.isVisible='show';
        if(passRegex.test(this.password) && regularExpression.test(this.password)) {
          this.msgPasswd="";
          this.classPasswd="greenColor correct";
          this.pwConfDisabled = false;
          this.confirm = null;
        }
        //Estilo para los requerimientos de la clave
        const red = 'color :  rgb(235, 74, 74) ;'
        const green = 'color : green  ;'

        this.styleCarac   = value.length<8 ? red : green;
        this.styleUpper   = (value.replace(/[*A-Z]/g, "").length)<value.length ? green : red;
        this.styleNum     = (value.replace(/[*0-9]/g, "").length)<value.length ? green : red;
        this.styleSpecial = (value.replace(regularExpression, "").length)<value.length ? green : red;

        this.styleCarac2   = value.length<8 ? 'show' : 'hidden';
        this.styleUpper2   = (value.replace(/[*A-Z]/g, "").length)<value.length ? 'hidden' : 'show';
        this.styleNum2     = (value.replace(/[*0-9]/g, "").length)<value.length ? 'hidden' : 'show';
        this.styleSpecial2 = (value.replace(regularExpression, "").length)<value.length ? 'hidden' : 'show';
      },

      confirm(){
        this.msgConfirm="";
        this.classConfirm="greenColor correct";
        if(this.confirm != this.password) {
          this.msgConfirm="Las claves no coinciden";
          this.classConfirm="redColor incorrect";
          this.isVisible='hidden';
        }
      },

      fNacimiento(){
        this.msgCalendar="";
        this.styleCalendar='greenColor correct';
      },

      tel(){
        var x = this.tel.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
        this.tel = !x[2] && !x[3] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        this.msgTel="";
        this.classTel="greenColor correct";
        if(this.tel.length!=14) {  // mejor poner aqui una expresion regular
          this.msgTel="El teléfono es incorrecto. Recuerda que te enviaremos un sms de confirmación para completar el registro.";
          this.classTel="redColor incorrect";
        }
      }

    },
    computed: {
      verifyCheck() {
        return !(this.captcha && this.servicio && this.avisoP && this.mayor);
      },
      diasDelMes: function() {
        if(this.month==1) return 31;
        if(this.month==2) {
          if(this.year==2000) return 29;
          if(this.year==1996) return 29;
          if(this.year==1992) return 29;
          if(this.year==1988) return 29;
          if(this.year==1984) return 29;

          if(this.year==1980) return 29;
          if(this.year==1976) return 29;
          if(this.year==1972) return 29;
          if(this.year==1968) return 29;
          if(this.year==1964) return 29;

          if(this.year==1960) return 29;
          return 28;
        }
        if(this.month==3) return 31;
        if(this.month==4) return 30;
        if(this.month==5) return 31;
        if(this.month==6) return 30;
        if(this.month==7) return 31;
        if(this.month==8) return 31;
        if(this.month==9) return 30;
        if(this.month==10) return 31;
        if(this.month==11) return 30;
        if(this.month==12) return 31;
        return 28;
      },
      habilitaBoton: function() {
        var dato = true
          && this.name && this.name.length>2
          && this.email && emaiRegex.test(this.email)
          && this.password && passRegex.test(this.password)
          && this.password===this.confirm
          //console.log(dato);
          return !dato;
      },
      estiloClave1 (){
          return this.activoClave ? 'show' : 'hidden';
      },
      estiloClave2 (){
          return !this.activoClave ? 'show' : 'hidden';
      }

    },
    methods: {
      openLoginPage() {
        router.push('/ui/login').catch(()=>{});
      },      
      closeModal: function() {
        this.$modal.hide('aviso');
      },
      onCaptchaVerified(recaptchaToken) {
          axios.post('api/check-captcha.json', {
            response: recaptchaToken,
            ip: '127.0.0.1'
          })
          .then(response => {
            if (response.status === HTTP_STATUS.OK) {
              this.captcha = true;
            } else {
              this.msgErr = 'Regreso con un estatus: ' + response.status;
              this.$bvModal.show('mensaje-login');
            }
          })
          .catch(error => {
            console.log(error.data)
              this.msgErr = "Ha ocurrido un error de red: " + error;
              this.$bvModal.show('mensaje-login');
          })
          .finally(() => this.loading = false)
      },
      onCaptchaExpired() {
        this.captcha = false;
        this.$refs.recaptcha.reset();
      },
      submition() {
        this.loading = true;
        axios.post('api/usuario-preregistro2.json', {
          id:0,
          nick: this.name,
          claveHash: this.password,
          correo: this.email,
          telefono : '5587654321',
          year : this.year,
          month : this.month,
          day : this.day
        }).then(response => {
          this.loading = false
          if(response.data) console.log('ok');
          router.push('confirma-registro');
        }).catch(error => {
          this.loading = false
          if(error.response) {
            Vue.$toast.open({
                message: error.response.data['exceptionLongDescription'],
                type: 'error',
                duration: 5000,
                position:'top'
            });
          } else {
            console.log(error.data);
            this.$modal.show('mensaje-login');
          }
        }).finally(
          console.log('end ulpoad')
        );
      }
    },
    mounted() {
        store.commit('setToggleHeader', false);
        store.commit('setToggleFooter', false); 
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ancho {
    padding: 20px;
}
.align {
 text-align: left;
}
.centra {
 text-align: center;
}
.notValid {
  color:rgb(235, 74, 74);
}
.greenColor:focus {
  background-color: #eefaee;
  box-shadow: 2px 1px 4px #bdd3ae;
}

input {
  padding-right: 15%;
}
.correct {
  border-color:rgb(96, 161, 99);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/check.png) no-repeat scroll;
  background-position:right ;
  background-size: 17px;
  background-position-x: 96%;
}
.redColor:focus {
  background-color:   #fff3f3  ;
  box-shadow: 2px 1px 4px #dba6a6;
}
.incorrect {
  border-color:rgb(235, 74, 74);
  border-width: 1px;
  box-shadow: 1px 1px 3px #d8dcdd;
  background: url(../assets/danger.jpg) no-repeat scroll;
  background-position:right ;
  background-size: 20px;
  background-position-x: 96%;
}
.defaultColor {
  background-color: white;
  box-shadow: 1px 1px 3px #d8dcdd;
}
.hidden {
  display: none;
}
.show {
  display: block;
}
.combo {
  margin-bottom: 5px;
}
.info {
  font-size: 10px;
}
.g-recaptcha {
  transform:scale(0.9);
  transform-origin: 0 0;
}
</style>
