<template>
    <div style="overflow-x:scroll; width=300px;">

        <div class="container" v-bind:key=conv.id v-for="(conv,idx) in chatList" 
            :id="'conv' + idx" style="border-style: solid;
            margin: 30px 0px 30px 0px">
            <div class="container" style ="overflow-y:scroll; height:400px; border-style: solid; 
            margin: 20px 0px 20px 0px;">
            
                <div v-bind:key="chat.id" v-for="chat in conv" :id='chat.id'
                 style="border-style: solid; border-width: thin; width: 50%">
                    <tr>
                        {{chat.mensaje}}
                    </tr>
                </div>

            
            </div>
            <button class = "btn btn-info" type="button" :id="'b_' + idx"> > </button>
            <input :id="'e_text_' + idx" class="e-input" type="text" 
                placeholder="Manda un mensaje" 
                @keypress.enter="sendMsg('e_text_' + idx, conv[0].idHiloPadre)"/>            
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

        sendMsg(id, idHiloPadre){

            console.log("idHiloPadres es: " + idHiloPadre)
            var texto = document.getElementById(id).value.replaceAll(" ", "%20");
            for (let i = 0; i < texto.length; i++) {
                //const element = array[i];   
                
            }
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
