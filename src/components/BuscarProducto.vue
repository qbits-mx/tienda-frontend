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
          v-model="efectivo"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Efectivo
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-2"
          v-model="tarjeta"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Tarjeta
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-3"
          v-model="transferencia"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Transferencia
        </b-form-checkbox>
      </div>
      <div class="categoria">
        Categoria
        <b-form-checkbox
          id="checkbox-4"
          v-model="mascotas"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Mascotas
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-5"
          v-model="lineaBlanca"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Línea blanca
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-6"
          v-model="electronica"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Electrónica
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-7"
          v-model="deportes"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Deportes
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-8"
          v-model="musica"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Música
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-9"
          v-model="belleza"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Belleza
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-10"
          v-model="salud"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Salud / Cuidado personal
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-11"
          v-model="hogar"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Hogar
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-12"
          v-model="alimento"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Alimentos
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-13"
          v-model="ropa"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Ropa
        </b-form-checkbox>
      </div>
      <div class="condicion">
        <p>Condiciones</p>
        <b-form-checkbox
          id="checkbox-14"
          v-model="nuevo"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Nuevo
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-15"
          v-model="usado"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Usado
        </b-form-checkbox>
      </div>
      <div>Producto: {{ producto }}</div>
      <div>
        Pago:
        <ul>
          <li>efectivo({{ efectivo }})</li>
          <li>tarjeta({{ tarjeta }})</li>
          <li>transferencia({{ transferencia }})</li>
        </ul>
      </div>
      <div>
        Condiciones:
        <ul>
          <li>nuevo({{ nuevo }})</li>
          <li>usado({{ usado }})</li>
        </ul>
      </div>
      <div>
        Departamento:
        <ul>
          <li>mascotas({{ mascotas }})</li>
          <li>linea-blanca({{ uslineaBlancaado }})</li>
          <li>electronica({{ electronica }})</li>
          <li>deportes({{ deportes }})</li>
          <li>musica({{ musica }})</li>
          <li>belleza({{ belleza }})</li>
          <li>salud({{ salud }})</li>
          <li>hogar({{ hogar }})</li>
          <li>alimento({{ alimento }})</li>
          <li>ropa({{ ropa }})</li>
        </ul>
      </div>
    </div>
    <div>Aqui van los anuncios</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      producto: "",
      efectivo: "0",
      tarjeta: "0",
      transferencia: "0",
      nuevo: "0",
      usado: "0",
      mascotas: "0",
      lineaBlanca: "0",
      electronica: "0",
      deportes: "0",
      musica: "0",
      belleza: "0",
      salud: "0",
      hogar: "0",
      alimento: "0",
      ropa: "0",
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
</style>
