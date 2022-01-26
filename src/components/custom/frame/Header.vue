<template>
  <div v-if=show>
    <div class="row">
      <div class="col gris">
        <img src="@/assets/logo.png" width="250px;" style="margin-left:10px;" @click="navega('/ui/creditos')"/> <label style="font-size:32px;">Tienda Fac Ciencias</label>
      </div>
      <b-navbar toggleable="lg" type="dark" variant="dark">

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              
              <b-nav-form>

                <div v-if="!admin && logged">
                  <Carrito :cantidad="cantidad" ></Carrito>
                </div>
              </b-nav-form>

              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <em style="color:#ffff">{{ nombre }}</em>
                </template>
                <div v-if="logged">
                  <b-dropdown-item href="#" @click="navega('/ui/cambia-clave')">Cambiar Clave</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/cambia-datos-personales')">Perfil</b-dropdown-item>
                </div>
                <div v-if="!admin && logged">
                  <b-dropdown-item href="#" @click="navega('/ui/compras')">Mis Compras</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/mis-direcciones')">Mis Direcciones</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/mis-metodos-pago')">Mis Métodos de pago</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/historiales')">Historial</b-dropdown-item>
                </div>
                <div v-if="admin">
                  <b-dropdown-divider/>
                  <b-dropdown-item href="#" @click="navega('/ui/catalogos')">Catálogos</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/reporte-graficas')">Reportes Gráficos</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/admin')">Home</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/gestor-administrador')">Gestor Administrador</b-dropdown-item>
                </div>
                <div v-if="logged">
                  <b-dropdown-divider  />
                  <b-dropdown-item href="#" @click="logout">Salir</b-dropdown-item>
                </div>
                <div v-else>
                  <b-dropdown-item href="#" @click="navega('/')">Home</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/login')">Login</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/registro')">Registro</b-dropdown-item>
                  <b-dropdown-item href="#" @click="navega('/ui/consulta-anuncios-publico')">Consulta detallada</b-dropdown-item>
                </div>
              </b-nav-item-dropdown>

              <div v-if="logged">
                <input @click="logout" type="button" class="btn btn-warning" value="Salir" />
              </div>
              <div v-else>
                <input @click="navega('/ui/login')" type="button" class="btn btn-outline-success" value="Ingresar" />
              </div>        

            </b-navbar-nav>

          </b-collapse>

      </b-navbar>
    </div>
    <b-navbar toggleable="lg" type="dark" variant="dark">

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <div class="crearAnuncio" v-if="!admin && logged" >
          <input @click="navega('/')" type="button" style="margin-left:10px;" class="btn btn-warning" value=" Home" />
        </div>

        <div class="crearAnuncio" v-if="!admin && logged" >
          <input @click="navega('/ui/crear-anuncio')" type="button" style="margin-left:10px;" class="btn btn-info" value=" Crea tu Anuncio" />
        </div>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>

            <div v-if="!admin && logged">
              <Carrito :cantidad="cantidad" ></Carrito>
            </div>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em style="color:#ffff">{{ nombre }}</em>
            </template>

            <div v-if="logged">
              <b-dropdown-item href="#" @click="navega('/ui/cambia-clave')">Cambiar Clave</b-dropdown-item>
              <b-dropdown-item href="#" @click="navega('/ui/cambia-datos-personales')">Perfil</b-dropdown-item>
            </div>
            <div v-if="!admin && logged">
              <b-dropdown-item href="#" @click="navega('/ui/compras')">Mis Compras</b-dropdown-item>
              <b-dropdown-item href="#" @click="navega('/ui/mis-direcciones')">Mis Direcciones</b-dropdown-item>
              <b-dropdown-item href="#" @click="navega('/ui/mis-metodos-pago')">Mis Métodos de pago</b-dropdown-item>
            </div>
            <div v-if="admin">
              <b-dropdown-divider/>
              <b-dropdown-item href="#" @click="navega('/ui/catalogos')">Catálogos</b-dropdown-item>
              <b-dropdown-item href="#" @click="navega('/ui/reporte-graficas')">Reportes Gráficos</b-dropdown-item>
              <b-dropdown-item href="#" @click="navega('/ui/admin')">Home</b-dropdown-item>
            </div>
            <div v-if="logged">
              <b-dropdown-divider  />
              <b-dropdown-item href="#" @click="logout">Salir</b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item href="#" @click="navega('/')">Home</b-dropdown-item>
              <b-dropdown-item href="#" @click="navega('/ui/login')">Login</b-dropdown-item>
              <b-dropdown-item href="#" @click="navega('/ui/registro')">Registro</b-dropdown-item>
              <b-dropdown-item href="#" @click="navega('/ui/consulta-anuncios-publico')">Consulta detallada</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>

          <div v-if="logged">
            <input @click="logout" type="button" class="btn btn-warning" value="Salir" />
          </div>
          <div v-else>
            <input @click="navega('/ui/login')" type="button" class="btn btn-outline-success" value="Ingresar" />
          </div>

        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
import router from '../../../router'
import store from '../../../store'
import Carrito from '../../Carrito'

export default {
  components: {
    Carrito
  },
  computed: {
    logged: function() {
      var response = store.state.session.jwt && store.state.session.jwt.length>10;
      console.log(response);
      return response;
    },
    nombre: function() {
      var nc = store.state.session.nombreCompleto;
      return nc.length>1?nc:'Invitado';
    },
    cantidad: function() {
      return store.state.session.carrito.length;
    },
    admin: function() {
      return store.state.session.jwt && store.state.session.jwt.length>10
          && store.state.session.roles[0].nombre.includes('admin');
    },
    detallePago: function(){
      return window.location.pathname != '/ui/detalle-pago';
    },
    show: function() {
      return store.state.toggleHeader;
    }
  },
  data() {
    return {
      ruta : window.location.pathname
    }
  },
  methods: {
    logout: function() {
      store.commit('setSession', {
        nombreCompleto: '',
        roles:          [],
        correo:         '',
        ultimoAcceso:   '',
        idUser:         0,
        jwt:            '',
        carrito :      []
      });
      this.navega('/');
    },
    navega: function(url) {
      router.push(url).catch(()=>{});
    },

  }
}
</script>

<style>
.divider {
  padding-right: 20px;
}
.divider2 {
  margin-right: 10px;
}
.divider3 {
  margin-left: 10px;
}
.fondo {
  color:#a6a6a6;
}
.fondo:hover {
  color:#fff;
  text-decoration: none;
}
.gris {
  background-color:#e6e1e1;
}
.crearAnuncio {

  /* Codigo para centrar*/
  display: flex;
  justify-content: left;
  align-items: left;
  /* Fin del codigo para centrar*/
}
</style>