<template>
    <div>
        <br>
        <br>
        <table class="tablita">
            <tr>
                <td>
                    <div class="col d-flex my-2">
                        <botonAdmin colorTarjeta="rgba(1,12,245,0.4)" titulo="Compras " descripcion="Pedidos realizados por clientes"
                            link="historial-compras" icono="fas fa-shopping-bag fa-4x icono shrink" color="btn btn-info btn-block">
                        </botonAdmin>
                    </div>
                </td>
                
                <td>
                    <div class="col d-flex my-2">
                        <botonAdmin colorTarjeta="rgba(58,194,58,0.56)" titulo="Ventas " descripcion="Pedidos realizados por clientes"
                            link="historial-ventas" icono="fas fa-shopping-bag fa-4x icono shrink" color="btn btn-success btn-block">
                        </botonAdmin>
                    </div>
                </td>
            </tr>
        </table>
        <br>
        <br>
    </div>                       
</template>


<script>
import router from '../router'
import botonAdmin from '@/components/botonAdmin';
export default {
    data: function () {
        return {

        }
    },
    components: {
      'botonAdmin' : botonAdmin
    },
    openRegistroPage: function() {
        router.push({'name':'HistorialCompras'});
        },
}
</script>

<style>

.tablita{
    margin-left:auto; 
    margin-right:auto;
}

</style>
