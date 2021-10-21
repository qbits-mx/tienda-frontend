<template>

<div class="ancho centra">

  <div v-if="loading" class="loader"/>

  <div class="card defaultColor">

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
            <label for="confirmacion">Confirmación clave:</label>
          </div>
          <div class="col">
            <input type="password" required :disabled="pwConfDisabled" :class="classConfirm" class="form-control" id="confirmacion" placeholder="******" v-model="confirm">
            <small class="notValid">{{msgConfirm}}</small>
          </div>
        </div>

        <!-- fecha de nacimiento -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label>Fecha de nacimiento:</label>
          </div>
          <div class="col">
            <b-form-datepicker
              id="fecha-nacimiento"
              v-model="fNacimiento"
              :initial-date="dateConfig.initial"
              :max="dateConfig.max"
              :min="dateConfig.min"
              calendar-width="100%"
              class="mb-2"
              :class="styleCalendar"
              hide-header
              locale="es"
              menu-class="w-100"
              nav-button-variant="secondary"
              placeholder="MM-DD-YYYY"
              show-decade-nav
              v-bind:value-as-date=true />
          </div>
        </div>

        <!-- telefono -->
        <div class ="form-row form-group">
          <div class="col-md-4">
            <label for="telefono">Teléfono:</label>
          </div>
          <div class="col">
            <input type="tel" class="form-control" required :class="classTel" id="telefono" placeholder="XX XXXX XXXX" v-model="tel">
            <small class="notValid">{{msgTel}}</small>
          </div>
        </div>

        <!-- Google Re captcha V 2.0-->
        <!-- https://www.google.com/recaptcha/admin/site/450433503 -->
        <!-- account: garellanos@ultrasist.com.mx -->
        <div class="row">
          <div class="centra">
            <vue-recaptcha
                id="solvecaptcha"
                ref="recaptcha"
                sitekey="6LffEdkaAAAAAOJllar3d53MdUh3qOZLhdQ8GuQs"
                @expired="onCaptchaExpired"
                @verify="onCaptchaVerified"/>
          </div>
        </div>

        <!-- slider -->
        <div class="form-group text-center">
         <range-slider
                      class="slider"
                      min="100"
                      max="200"
                      step="5"
                      v-model="sliderValue"
                    />
                    <div>{{ sliderValue }}</div>
        </div>

        <!-- button -->
        <div class="form-group row">
          <div class="col text-center" >
              <button
                :disabled="habilitaBoton"
                class="btn btn-success"
                @click="submition">Registrarme</button>
          </div>
        </div>

    </div><!-- ends card body -->

  </div><!-- ends card -->

    <Aviso
      ref='aviso'
      ancho='320'
      :target=target
      :avisoMsg=msgErr
      :avisoTitulo=texto /> 

</div>

</template>

<script>
  import Vue from 'vue'
  import VueRecaptcha from 'vue-recaptcha';
  import axios from 'axios';
  import router from '../router';
  import RangeSlider from "vue-range-slider";
  import "vue-range-slider/dist/vue-range-slider.css";
  import Aviso from './custom/dialog/Aviso';

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
      RangeSlider,
      Aviso
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
        descripcionModal : ''
     }
    },
    watch: {
      name(){
        this.msgName="";
        this.className="greenColor correct";
        if (!nameRegExp.test(this.name)){
          this.msgName="El nombre debe mayor a 3 caracteres, sin espacios ni caracteres especiales. Puede contener números.";
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
          this.msgTel="El teléfono es incorrecto";
          this.classTel="redColor incorrect";
        }
      }

    },
    computed: {
      habilitaBoton: function() {
        var dato = true
          && this.name && this.name.length>2
          && this.email && emaiRegex.test(this.email)
          && this.password && passRegex.test(this.password)
          && this.tel && this.tel.length==14
          && this.password===this.confirm
          && this.fNacimiento
          && this.captcha
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
        axios.post('api/usuario-preregistro.json', {
          id:0,
          nick: this.name,
          claveHash: this.password,
          correo: this.email,
          telefono : this.tel,
          fechaNacimiento : this.fNacimiento
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
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ancho {
    max-width: 600px;
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
</style>
