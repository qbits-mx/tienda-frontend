import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import axios from 'axios';

import CrearAnuncio          from '@/components/CrearAnuncio'
import Inicio                from '@/components/Inicio'
import Login                 from '@/components/Login'
import Registro              from '@/components/Registro2'
import ConfirmaRegistro      from '@/components/ConfirmaRegistro'
import RegeneraClave         from '@/components/RegeneraClave'
import RegeneraClaveConfirma from '@/components/RegeneraClaveConfirma'
import Forbidden             from '@/components/Forbidden'
import CambiaClave           from '@/components/CambiaClave'
import CambiaDatosPersonales from '@/components/CambiaDatosPersonales'
import MisDirecciones        from '@/components/MisDirecciones'
import ConsultaRol           from '@/components/ConsultaRol'
import Anuncio               from '@/components/Anuncio'
import NotFound              from '@/components/NotFound'

import AdministraCatalogo    from '@/components/AdministraCatalogo'

Vue.use(Router);

const routes = [
  {
    path: '/ui/not-found',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/ui/crear-anuncio',
    name: 'crear-anuncio',
    component: CrearAnuncio,
    meta: { allowedRoles: ['admin','normal'] }
  },
    path: '/ui/anuncio/:id',
    name: 'anuncio',
    props: true, 
    component: Anuncio
  },
  {
    path: '/ui/cambia-datos-personales',
    name: 'cambia-datos-personales',
    component: CambiaDatosPersonales,
    meta: { allowedRoles: ['admin','normal'] }
  },
  {
    path: '/ui/cambia-clave',
    name: 'cambia-clave',
    component: CambiaClave,
    meta: { allowedRoles: ['admin','normal'] }
  },
  {
    path: '/ui/mis-direcciones',
    name: 'mis-direcciones',
    component: MisDirecciones
  },
  {
    path: '/ui/regenera-clave-confirma',
    name: 'regenera-clave-confirma',
    component: RegeneraClaveConfirma
  },
  {
    path: '/ui/forbidden',
    name: 'forbidden',
    component: Forbidden
  },  
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/ui/login',
    name: 'login',
    component: Login
  },
  {
    path: '/ui/registro',
    name: 'registro',
    component: Registro,
  },
  {
    path: '/ui/confirma-registro',
    name: 'confirma-registro',
    component: ConfirmaRegistro
  },
  {
    path: '/ui/regenera-clave',
    name: 'regenera-clave',
    component: RegeneraClave
  },
  {
    path: '/ui/consulta-rol',
    name: 'ConsultaRol',
    component:ConsultaRol,
    meta: { allowedRoles: ['admin'] }
  },
  {
    path: '/admin/catalogos',
    name: 'AdministraCatalogo',
    component: AdministraCatalogo,
    meta: { allowedRoles: ['admin'] }
  },
  { 
    path: "*", 
    component: NotFound 
  }
]

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
})

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function checaJwt(jwt, active) {
    if (active && jwt && jwt !== undefined && jwt.length > 0) {
        //console.log(jwt);
        const jwtPayload = parseJwt(jwt);
        //jwtPayload.exp=1625505833-28*60;
        //console.log(jwtPayload);
        const limite = (Date.now() / 1000)-(2*60); // fecha actual menos dos minutos
        if (jwtPayload.exp < limite) {
            store.commit('setSession', {
                nombreCompleto: '',
                roles: [],
                correo: '',
                ultimoAcceso: '',
                idUser: 0,
                jwt: '', // jwt: jwtPayload.exp
                carrito: []
            });
            store.commit('setDestination', '/');
        } else {
            const timeToExpire =  jwtPayload.exp - (Date.now()/1000);
            console.log('Tiempo para que expire:' + timeToExpire);
        }
    }
}

router.beforeEach((to, from, next) => {
  store.commit('setToggleFooter', true);
  store.commit('setToggleHeader', true);

  axios.defaults.headers.common = {"X-CSRFToken": store.state.session.jwt};
  axios.defaults.headers.common = {"jwt": store.state.session.jwt};
  checaJwt(store.state.session.jwt, true);

  axios.get('/api/carritoVista/'+store.state.session.idUser+'.json', {
    // no le mando parámetros .... ni headers aqui...
  }).then(response => {
    store.commit('setCarrito', response.data);
  }).catch(e => {
    console.log(e);
  });

  if (to.matched.some(record => record.meta.allowedRoles )) { // *** El recurso SI requiere autenticación ya que pide ciertos roles
    // NO estás autenticado actualmente:
    if (store.state.session.jwt==='') {
      store.commit('setDestination', to.fullPath);
      router.push("/ui/login");
      return;
    }
    // SI estoy autenticado actualmente, asi que solo voy a checar si mi rol es el adecuado:
    if(to.matched.some(ok => !ok.meta.allowedRoles.includes(store.state.session.roles[0].nombre))) {
      router.push('/ui/forbidden'); // no tengo el rol asociado a esa interfaz
      return;
    }
  }
  next(); // *** El recurso NO requiere autenticación
})


export default router;
