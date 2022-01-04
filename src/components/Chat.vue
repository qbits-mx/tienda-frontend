<template>
    <div>

        <div class="container" style="display: table-cell; width=300px;overflow-x:scroll" v-bind:key=conv.id v-for="(conv,idx) in chatList" :id="'conv' + idx" >
            
            <div class="container" style ="overflow-y:scroll; height:400px">
            
            <div v-bind:key="chat.id" v-for="chat in conv" :id='chat.id'>
            <tr >
                {{chat.mensaje}}
            </tr>
            
            </div>
                <button class = "btn btn-info" type="button" :id="'b_' + idx"> > </button>
                <input :id="'e_text_' + idx" class="e-input" type="text" placeholder="Manda un mensaje" @keypress.enter="sendMsg('e_text_' + idx, conv[0].idHiloPadre)"/>
            </div>
        </div>
        </div>

</template>

<script>

import axios from 'axios'

export default {

    name : "Chat",
    data() {
        return {
            msg : "",
            chat :[],

        }
    },
    props:[
        'chatList',
        "id",
        'idAnuncio',
        "idRemitente",
        "idHiloPadre",
        "mensaje",
        "fecha",
        
    ],
    methods: {

        Expand(obj){
              if (!obj.savesize) obj.savesize=obj.size;
                obj.size=Math.max(obj.savesize,obj.value.length);
        },
        sendMsg(id, idHiloPadre){

            console.log("idHiloPadres es: " + idHiloPadre)
            var cadena ="api/enviar-mensaje.json?idAnuncio="+this.idAnuncio+
                        "&idHiloPadre="+idHiloPadre+
                        "&idRemitente="+this.idRemitente+"&mensaje="+ document.getElementById(id).value.replaceAll(" ", "%20");


            axios.get(cadena)
                .then( x => {
                    console.log(x.data)
                })
            document.getElementById(id).value = ""

        }
    },
    mounted() {
    }
    

}

</script>
