<template>
  <div class="ancho centra">
    <div class="card">
      <div class="card-header card-custom-header"> 
        <label class="control-label h4" >Bienvenido</label>
        <br/>
        <label class="control-label" >Esta es la página principal del sistema</label>
      </div>
      <div class="card-body align">
        <div class="row">
            <div class="col-sm-12">
                <img src="../assets/portada.png" width="100%"/>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';

export default ({
  methods: {
    consultaAnuncios(idCatInit) {
     router.push({path:'/ui/consulta-anuncios-publico/'+idCatInit}).catch(()=>{});
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imagenes2 {
  box-shadow: 3px 1px 6px #859295;
  border-radius: 3px;
}
.centered {
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-weight: bold;
}
.centered:hover {
  text-decoration: underline;
}
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fill img {
  box-shadow: 3px 1px 6px #859295;
  border-radius: 3px;
  flex-shrink: 0;
  height: 130px;
  width: 200px;
  padding: 2px;
  margin: 2px;
  opacity: 1;
}
.fill img:hover {
  opacity: 0.8;
}
</style>
