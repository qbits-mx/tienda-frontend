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
        <p>Categoria</p>
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
      <div class="zona">
        <p>Zona</p>
        <b-form-checkbox
          id="checkbox-16"
          v-model="alvaroObregon"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Álvaro Obregón
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-17"
          v-model="azcapotzalco"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Azcapotzalco
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-18"
          v-model="benitoJuarez"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Benito Juárez
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-19"
          v-model="coyoacan"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Coyoacán
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-20"
          v-model="cuajimalpaDeMorelos"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Cuajimalpa de Morelos
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-21"
          v-model="cuauhtemoc"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Cuauhtémoc
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-22"
          v-model="gustavoMadero"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Gustavo A. Madero
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-23"
          v-model="iztacalco"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Iztacalco
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-24"
          v-model="iztapalapa"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Iztapalapa
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-25"
          v-model="magdanelaContreras"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Magdanela Contreras
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-26"
          v-model="miguelHidalgo"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Miguel Hidalgo
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-27"
          v-model="milpaAlta"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Milpa Alta
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-28"
          v-model="tlahuac"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Tláhuac
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-29"
          v-model="tlalpan"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Tlalpan
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-30"
          v-model="venustianoCarranza"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Venustiano Carranza
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-31"
          v-model="xochimilco"
          name="checkbox-1"
          value="1"
          unchecked-value="0"
        >
          Xochimilco
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
      <div>
        Zona:
        <ul>
          <li>alvaroObregon({{ alvaroObregon }})</li>
          <li>azcapotzalco({{ azcapotzalco }})</li>
          <li>benitoJuarez({{ benitoJuarez }})</li>
          <li>coyoacan({{ coyoacan }})</li>
          <li>cuajimalpaDeMorelos({{ cuajimalpaDeMorelos }})</li>
          <li>cuauhtemoc({{ cuauhtemoc }})</li>
          <li>gustavoMadero({{ gustavoMadero }})</li>
          <li>iztacalco({{ iztacalco }})</li>
          <li>iztapalapa({{ iztapalapa }})</li>
          <li>magdanelaContreras({{ magdanelaContreras }})</li>
          <li>miguelHidalgo({{ miguelHidalgo }})</li>
          <li>milpaAlta({{ milpaAlta }})</li>
          <li>tlahuac({{ tlahuac }})</li>
          <li>tlalpan({{ tlalpan }})</li>
          <li>xochimilco({{ xochimilco }})</li>
          <li>xochimilco({{ xochimilco }})</li>
        </ul>
      </div>
    </div>
    <div>
      <AnuncioItem></AnuncioItem>
    </div>
  </div>
</template>

<script>
import AnuncioItem from "./AnuncioItem.vue";
export default {
  components: {
    AnuncioItem,
  },
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
      alvaroObregon: "0",
      azcapotzalco: "0",
      benitoJuarez: "0",
      coyoacan: "0",
      cuajimalpaDeMorelos: "0",
      cuauhtemoc: "0",
      gustavoMadero: "0",
      iztacalco: "0",
      iztapalapa: "0",
      magdanelaContreras: "0",
      miguelHidalgo: "0",
      milpaAlta: "0",
      tlahuac: "0",
      tlalpan: "0",
      venustianoCarranza: "0",
      xochimilco: "0",
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
</style>
