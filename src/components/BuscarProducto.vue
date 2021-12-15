<template>
  <div class="buscar-producto">
    <div>
      <input
        v-model="producto"
        placeholder="Buscar producto"
        class="barra-busqueda"
      />
      <div class="forma-pago">
        <p>Forma de pago</p>
        <b-form-checkbox
          id="checkbox-1"
          v-model="pago"
          name="checkbox-1"
          value="0"
          unchecked-value=""
        >
          Efectivo
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-2"
          v-model="pago"
          name="checkbox-1"
          value="1"
          unchecked-value=""
        >
          Tarjeta
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-3"
          v-model="pago"
          name="checkbox-1"
          value="2"
          unchecked-value=""
        >
          Transferencia
        </b-form-checkbox>
      </div>
      <div class="categoria">
        <p>Categoria</p>
        <b-form-checkbox
          id="checkbox-4"
          v-model="departamento"
          name="checkbox-1"
          value="0"
          unchecked-value=""
        >
          Mascotas
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-5"
          v-model="departamento"
          name="checkbox-1"
          value="1"
          unchecked-value=""
        >
          Línea blanca
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-6"
          v-model="departamento"
          name="checkbox-1"
          value="2"
          unchecked-value=""
        >
          Electrónica
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-7"
          v-model="departamento"
          name="checkbox-1"
          value="3"
          unchecked-value=""
        >
          Deportes
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-8"
          v-model="departamento"
          name="checkbox-1"
          value="4"
          unchecked-value=""
        >
          Música
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-9"
          v-model="departamento"
          name="checkbox-1"
          value="5"
          unchecked-value=""
        >
          Belleza
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-10"
          v-model="departamento"
          name="checkbox-1"
          value="6"
          unchecked-value=""
        >
          Salud / Cuidado personal
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-11"
          v-model="departamento"
          name="checkbox-1"
          value="7"
          unchecked-value=""
        >
          Hogar
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-12"
          v-model="departamento"
          name="checkbox-1"
          value="8"
          unchecked-value=""
        >
          Alimentos
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-13"
          v-model="departamento"
          name="checkbox-1"
          value="9"
          unchecked-value=""
        >
          Ropa
        </b-form-checkbox>
      </div>
      <div class="condicion">
        <p>Condiciones</p>
        <b-form-checkbox
          id="checkbox-14"
          v-model="condiciones"
          name="checkbox-1"
          value="0"
          unchecked-value=""
        >
          Nuevo
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-15"
          v-model="condiciones"
          name="checkbox-1"
          value="1"
          unchecked-value=""
        >
          Usado
        </b-form-checkbox>
      </div>
      <div class="zona">
        <p>Zona</p>
        <b-form-checkbox
          id="checkbox-16"
          v-model="zona"
          name="checkbox-1"
          value="0"
          unchecked-value=""
        >
          Álvaro Obregón
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-17"
          v-model="zona"
          name="checkbox-1"
          value="1"
          unchecked-value=""
        >
          Azcapotzalco
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-18"
          v-model="zona"
          name="checkbox-1"
          value="2"
          unchecked-value=""
        >
          Benito Juárez
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-19"
          v-model="zona"
          name="checkbox-1"
          value="3"
          unchecked-value=""
        >
          Coyoacán
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-20"
          v-model="zona"
          name="checkbox-1"
          value="4"
          unchecked-value=""
        >
          Cuajimalpa de Morelos
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-21"
          v-model="zona"
          name="checkbox-1"
          value="5"
          unchecked-value=""
        >
          Cuauhtémoc
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-22"
          v-model="zona"
          name="checkbox-1"
          value="6"
          unchecked-value=""
        >
          Gustavo A. Madero
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-23"
          v-model="zona"
          name="checkbox-1"
          value="7"
          unchecked-value=""
        >
          Iztacalco
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-24"
          v-model="zona"
          name="checkbox-1"
          value="8"
          unchecked-value=""
        >
          Iztapalapa
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-25"
          v-model="zona"
          name="checkbox-1"
          value="9"
          unchecked-value=""
        >
          Magdanela Contreras
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-26"
          v-model="zona"
          name="checkbox-1"
          value="10"
          unchecked-value=""
        >
          Miguel Hidalgo
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-27"
          v-model="zona"
          name="checkbox-1"
          value="11"
          unchecked-value=""
        >
          Milpa Alta
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-28"
          v-model="zona"
          name="checkbox-1"
          value="12"
          unchecked-value=""
        >
          Tláhuac
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-29"
          v-model="zona"
          name="checkbox-1"
          value="13"
          unchecked-value=""
        >
          Tlalpan
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-30"
          v-model="zona"
          name="checkbox-1"
          value="14"
          unchecked-value=""
        >
          Venustiano Carranza
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-31"
          v-model="zona"
          name="checkbox-1"
          value="15"
          unchecked-value=""
        >
          Xochimilco
        </b-form-checkbox>
      </div>
      <div class="estrellas">
        <p>Estrellas</p>
        <b-form-checkbox
          id="checkbox-32"
          v-model="puntuacion"
          name="checkbox-1"
          value="5"
          unchecked-value="0"
        >
          5 estrellas
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-33"
          v-model="puntuacion"
          name="checkbox-1"
          value="4"
          unchecked-value="0"
        >
          4 estrellas
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-34"
          v-model="puntuacion"
          name="checkbox-1"
          value="3"
          unchecked-value="0"
        >
          3 estrellas
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-35"
          v-model="puntuacion"
          name="checkbox-1"
          value="2"
          unchecked-value="0"
        >
          2 estrellas
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-36"
          v-model="puntuacion"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          1 estrellas
        </b-form-checkbox>
      </div>
      <div>Producto: {{ producto }}</div>
      <div>Estrellas: {{ puntuacion }}</div>
      <div>Pago: {{ pago }}</div>
      <div>Condiciones: {{ condiciones }}</div>
      <div>Departamento: {{ departamento }}</div>
      <div>Zona: {{ zona }}</div>
    </div>
    <div class="anuncio">
      <img src="../assets/bicicleta.jpg" alt="bicicleta" class="images" />
      <div class="descripcion">
        <p class="articulo">Bicicleta</p>
        <p class="desc">
          Marca: Blitz Modelo:Maniac Especificaciones: Material: Acero Rodada:
          20 Manubrio: con rotor Frenos: Caliper Accesorios: Cubrecadenas y
          Parador Rines: Reforzado de 48 rayos Llanta: 20"x2.25"
        </p>
        <div class="calificacion">
          <img src="../assets/estrella.jpg" alt="estrella" class="estrella" />
          <img src="../assets/estrella.jpg" alt="estrella" class="estrella" />
          <img src="../assets/estrella.jpg" alt="estrella" class="estrella" />
          <img src="../assets/estrella.jpg" alt="estrella" class="estrella" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import AnuncioItem from "./AnuncioItem.vue";
import axios from "axios";
export default {
  components: {
    //AnuncioItem,
  },
  methods: {
    buscarProducto: function() {
      axios.get("/api/buscarPoducto", {
        descripcion: this.producto,
        idCatalogoDepartamento: this.departamento,
        idCatalogoZonaEntrega: this.zona,
        idCatalogoFormaPago: this.pago,
        idCatalogoCondicion: this.condiciones,
        estrellas: this.puntuacion,
      });
    },
  },
  data() {
    return {
      producto: "",
      pago: "",
      condiciones: "",
      departamento: "",
      zona: "",
      puntuacion: "",
    };
  },
};
</script>

<style scoped>
.buscar-producto {
  display: flex;
}
.barra-busqueda {
  margin: 10px;
  padding: 10px;
}
.forma-pago {
  background-color: #a9c3db;
  margin: 10px;
  padding: 10px;
}
.categoria {
  background-color: #c5d1dc;
  margin: 10px;
  padding: 10px;
}
.condicion {
  background-color: #a9c3db;
  margin: 10px;
  padding: 10px;
}
.zona {
  background-color: #c5d1dc;
  margin: 10px;
  padding: 10px;
}
.estrellas {
  background-color: #a9c3db;
  margin: 10px;
  padding: 10px;
}
.anuncio {
  display: flex;
  background-color: #e9ecef;
  margin: 75px;
  padding: 10px;
  width: 1200px;
  height: 300px;
  border: 10px;
}
.images {
  width: 275px;
  height: 275px;
}
.articulo {
  font-size: 250%;
  margin: 10px;
  padding: 10px;
}
.descripcion {
  flex-direction: column;
}
.desc {
  margin: 10px;
  padding: 10px;
}
.calificacion {
  display: flex;
  margin: 10px;
  padding: 10px;
}
.estrella {
  width: 50px;
  height: 50px;
}
</style>
