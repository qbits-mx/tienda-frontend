import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        toggleFooter: true,
        toggleHeader: true,
        destination: '/',
        session: {
            nombreCompleto: '',
            detalles: null,
            roles: [],
            correo: '',
            ultimoAcceso: '',
            idUser: 0,
            jwt: '', //  jwt='' => signed: false,
            carrito : []
        }
    },
    mutations: {
        setToggleHeader(state, toggle) {
            state.toggleHeader = toggle;
        },
        setToggleFooter(state, toggle) {
            state.toggleFooter = toggle;
        },
        setNombreCompleto(state, nombreCompleto) {
            state.session.nombreCompleto = nombreCompleto;
        },
        setDetalles(state, ud) {
            state.session.detalles = ud;
        },
        setSession(state, ss) {
            state.session = ss;
        },
        setDestination(state, destination) {
            state.destination = destination;
        },
        setFirmado(state, firmado) {
            state.session.signed = firmado;
        },
        setCarrito(state, carrito) {
            state.session.carrito = carrito;
        }
    },
    plugins: [createPersistedState()]
})
export default store;

