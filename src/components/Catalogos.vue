<template>
    <div class="ancho centra">
        <b-card>

            <b-tabs pills card vertical>

                <b-tab title="Paises"
                    active>
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaPais />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab title="Estados">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaEstado />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab title="Municipios">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaMunicipio />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab title="Estatus para Anuncios">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaEstatusAnuncio />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab title="Servicios de Paqueteria">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaPaqueteria />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab title="Tipos de Multimedia">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaMediaTipo />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab title="Categirias de Animales">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaCategoria />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab title="Atributos de Categiria">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaAtributo />
                        </div>
                    </b-card-text>
                </b-tab>

                <b-tab title="Roles de Usuario">
                    <b-card-text>
                        <div class="ancho centra box-shadow">
                            <ConsultaRol />
                        </div>
                    </b-card-text>
                </b-tab>








            </b-tabs>
        </b-card>
    </div>
  
</template>

<script>
import ConsultaPais from './ConsultaPais'
import ConsultaEstado from './ConsultaEstado'
import ConsultaMunicipio from './ConsultaMunicipio'
import ConsultaEstatusAnuncio from './ConsultaEstatusAnuncio'
import ConsultaPaqueteria from './ConsultaPaqueteria'
import ConsultaMediaTipo from './ConsultaMediaTipo'
import ConsultaAtributo from './ConsultaAtributo'
import ConsultaCategoria from './ConsultaCategoria'
import ConsultaRol from './ConsultaRol'

export default {
    components: {
      ConsultaPais, 
      ConsultaEstado,
      ConsultaMunicipio,
      ConsultaEstatusAnuncio,
      ConsultaPaqueteria,
      ConsultaMediaTipo,
      ConsultaAtributo,
      ConsultaCategoria,
      ConsultaRol
    },
}
</script>

<style scoped>
.ancho {
    max-width: 95%;
}
</style>