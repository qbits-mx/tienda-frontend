<template>
    <div class="small-box shrink2" :style="'width:100%; height: 105%; position:relative; ' + 'background-color:' + colorTarjeta">
    <div class="inner py-4 px-4">
        <h3>{{titulo}}</h3>
        <p style="float: left">{{descripcion}}</p>
        <div>
        <i :class="icono" style="position: absolute;right: 15%;bottom: 40%;opacity: 35%;"></i>
        </div>
        </div>
    <div >
        <button type="button" :class="color" style="position: absolute; bottom: 0px">
        <a :href="link" class="small-box-footer" style="color: white">Acceder <i class="fas fa-arrow-circle-right"></i></a>
        </button>
    </div>
    </div>
</template>

<script>

export default {
    name: "botonAdmin",
      props: {
        titulo: {
          type: String,
          required: true
        },
        descripcion: {
          type: String,
          required: true
        },
        link: {
          type: String,
          required: true
        },
        icono: {
          type: String,
          required: true
        },
        color: {
          type: String,
          required: true
        },
        colorTarjeta: {
          type: String,
          required: true
        },
      },
    data: function () {
        return {
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
  display: block;
  margin-top: 2.7em;
  font-weight: bold;
  color: rgb(7, 7, 7);
}

.small-box {
  border-radius: .25rem;
  box-shadow: 1px 2px 4px rgba(69, 68, 68, 0.62);
  display: block;
  margin-bottom: 20px;
  position: relative;
}
.bg-success {
  background-color: #28a745!important;
}
.small-box> .small-box-footer {
  background-color: rgba(0,0,0,.1);
  color: rgba(255,255,255,.8);
  display: block;
  padding: 3px 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  z-index: 10;
}
.shrink {
  transition: all .2s ease-in-out;
}
.shrink2 {
  transition: all .2s ease-in-out;
}
.shrink:hover {
  transform: scale(0.7);
}
.shrink2:hover {
  transform: scale(1.1);
  box-shadow: 2px 2px 10px rgba(36, 36, 36, 0.62);
}
</style>
