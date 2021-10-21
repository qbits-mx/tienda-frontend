<template>
  <!--
    Modal reutilizable
    -->
  <modal
    name="aviso"
    :reset="true"
    :clickToClose="false"
    :width=ancho
    height="auto"> 
        <div class="window">
          <h2 style="margin-top: 0; text-align: center;">{{ avisoTitulo }}</h2>
          <slot>{{ avisoMsg }}</slot> <!-- hay que experimentar aqui haciéndolo un Slot-->
          <hr/>
          <div class="centrado">
              <button class="green-btn" @click="go">Aceptar</button>
          </div>
        </div>
  </modal>

</template>

<script>
import router from '../../../router'

export default {
    props: ['avisoTitulo', 'avisoMsg','target','ancho'],
    data: function () {
        return {
          //ancho:720
        }
    },
    methods: {
      go: function() {
        if(this.target && this.target.length>0) {
          router.push(this.target);
        } else {
          this.$modal.hide('aviso');
        }
      },
      abre: function() {
        this.$modal.show('aviso');
      }
    }
}
</script>

<style scoped>
.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    margin: auto;
    padding: 1rem;
    z-index: 10000;
}
.centrado {
    text-align: center;
}
.green-btn {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #35907f;
    border: 2px solid #0ec5a4;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
.green-btn:hover {
    background-color: #0b9984;
    color:#fff;
}
</style>