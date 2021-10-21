<template>
  <div class="ancho centra">
    <br/><br/><br/>
    <label>Texto seleccionado: </label>
    <input type="text" required class="form-control" placeholder="XXX" v-model="texto" disabled maxlength="3" size="3" >
    <div :class="keyboardClass"></div>
    <button @click="enviar" type="button" class="btn btn-lg btn-primary" >Enviar</button>
    <!--
      https://hodgef.com//simple-keyboard/documentation/options/layout/
    -->
    <img :src="'data:image/jpeg;base64,'+imageBytes" />
    <!--
      https://stackoverflow.com/questions/58682247/loading-images-in-vue-js-from-an-api
    -->
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import axios from 'axios';

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
    input: {
      type: String,
    },
  },
  data: () => ({
    keyboard: null,
    texto: '',
    imageBytes:[]
  }),
  mounted() {
    axios.get('api/qr-base64/gustavo').then((response) => {
        this.imageBytes = response.data;
    });
    this.keyboard = new Keyboard(this.keyboardClass, {
        onChange: this.onChange,
        onKeyPress: this.onKeyPress
    });
    this.keyboard.setOptions({
        baseClass: this.id,
        newLineOnEnter: true,
        excludeFromLayout: {
          default: ["@", ".com", "=", "-", "[", "]", "/", "\\", "{enter}", "{tab}", "{lock}", ";",".",",", "'", "{shift}", "`", "{space}"],
          shift: ["@", ".com", "=", "-", "[", "]", "/", "\\", "{enter}", "{tab}", "{lock}", ";",".",",", "'", "{shift}", "`", "{space}"]
        },
    });
  },
  methods: {
    enviar() {
      console.log(this.texto)
    },
    onChange(input) {
      //this.$emit("onChange", input);
      this.texto = input
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>

<style>
.ancho {
  margin-top: 300px;
  padding-top: 300px;
  max-width: 600px;
}
.letrero {
  font-size: 24px;
  border-style: dashed;
}
</style>