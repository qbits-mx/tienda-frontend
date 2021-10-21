<template>
  <div>
    <ConfirmDialogue ref="confirmDialogue" />
    <div class="ancho centra">
      <div class="card">
        <div class="card-header card-custom-header">
          <label class="h4">Confirmar registro</label>
        </div>
        <div class="card-body align">
          <small class="form-text text-muted">
            Un token alfanumérico fue enviado al correo electrónico proporcionado.<br>Favor de introdúcelo a continuación:
          </small>
          <br />
          <div class="form-group form-row">
            <div class="col-sm-4">
              <label for="correo">Token:</label>
            </div>
            <div class="col form-group">
              <input
                type="text"
                required
                class="form-control"
                :class="classToken"
                id="token"
                placeholder="XXXXXX"
                v-model="token"
                maxlength="16"
                minlength="4" />
              <small class="notValid">{{ msgToken }}</small>
            </div>
          </div>
          <hr class="dashed" />
          <div class="form-group row text-center">
            <div class="col text-center">
              <button
                type="button"
                :disabled="habilitaBoton"
                @click="confirma"
                class="btn btn-success">
                Completar registro
              </button>
            </div>
          </div>
        </div>
        <!-- card-body ends -->
      </div>
      <!-- card ends -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from "axios";
import router from "../router";
import ConfirmDialogue from './custom/dialog/ConfirmDialogue'


export default {
  components: {
    ConfirmDialogue
  },
  data() {
    return {
      token: "",
      modalShowsError: false,
      modalMessage: "",
      msgToken: null,
      classToken: "defaultColor", 
      modalTarget: '', 
      modalTitulo: ''
    };
  },
  watch: {
    token() {
      this.msgToken = "";
      this.classToken = "greenColor correct";
      if (this.token.trim().length<4) {
        this.msgToken = "La longitud del token debe ser mayor a 3 caracteres";
        this.classToken = "redColor incorrect";
      }
      this.token = this.token.length === 1 ? this.token.toUpperCase() : this.token;
    },
  },
  computed: {
    habilitaBoton: function(){
      var dato = true && this.token && this.token.length>3
      return !dato;
    }
  },
  methods: {
    async openDialogue() {
      const ok = await this.$refs.confirmDialogue.show({
          title: 'Felicidades',
          message: 'El registro al sistema ha sido exitoso. Ahora ya es posible iniciar sesión.',
          secondaryButton: 'Cancelar',
          acceptButton: 'Aceptar',
          accept: true
      });
      if(ok) router.push('/ui/login');
    },
    confirma() {
      axios.get("api/confirma-preregistro.json?token=" + this.token, {
        token: this.token,
      })
      .then((response) => {
        if(response.data) console.log("ok");
        this.openDialogue();
      })
      .catch((error) => {
        this.modalMessage = error.data;
        if (error.response) {
          this.modalMessage = error.response.data["exceptionLongDescription"];
        }
        Vue.$toast.open({
            message: this.modalMessage,
            type: 'error',
            duration: 5000,
            position:'top'
        });
      })
      .finally(
        console.log('end confira registro')
      );
    },
  },
};
</script>

<style scoped>
.ancho {
    max-width: 340px;
}
.notValid{
  color:rgb(235, 74, 74);
}
hr.dashed {
  border-top: 3px dashed #bbb;
}
</style>