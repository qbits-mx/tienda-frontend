<template>
    <div style="display: flex; flex-direction: row; overflow: auto;" >

        <div class="container" v-bind:key=conv.id v-for="(conv,idx) in chatList" 
            :id="'conv' + idx" style="border-style: solid;
            margin: 30px 10px 30px 10px;float : left; width :400px;
            background: linear-gradient(to top,  #38373a, #b2b2b3);
            width=30%;  ">

            <div class="container" style ="overflow-y:scroll; height:300px; width :350px;
            margin: 20px 0px 20px 0px; display:flex; flex-direction: column-reverse;
            ">
            
                <div v-bind:key="chat.id" v-for="chat in conv" :id='chat.id'>
                    <div v-if= "chat.idRemitente == idRemitente">
                        <div class = msgSent> 
                        {{chat.mensaje}}
                        </div>
                    </div>
                    <div v-else>
                        <div class = msgRec>
                            {{chat.mensaje}}
                        </div>

                    </div>

                </div>

            
            </div>
            <input :id="'e_text_' + idx"  class="resize: both; overflow: auto;"
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

        isBlank(str) {
            return (!str || /^\s*$/.test(str));
        },

        sendMsg(id, idHiloPadre){
            

            console.log("idHiloPadres es: " + idHiloPadre)

            let text = document.getElementById(id).value;
            if (!this.isBlank(text) ) {
                var cadena ="api/enviar-mensaje.json?idAnuncio="+this.idAnuncio+
                            "&idHiloPadre="+idHiloPadre+
                            "&idRemitente="+this.idRemitente+"&mensaje="+ text.replaceAll(" ", "%20");

                axios.get(cadena)
                    .then( x => {
                        console.log(x.data)
                    })
                document.getElementById(id).value = ""
                
            }

        }
    },
    mounted() {
        
    }
    
//         #997dc9  ac9fc2
}

</script>

<style scoped>
    .msgSent  {
        border-style: solid;
        border-width: thin;
        border-color : white;
        max-width: 70%;
        min-width: none;
        padding:  1%;
        border-radius: 25px;
        margin-left: auto;
        margin-right:0;
        margin-left: auto;
        margin-right : 0;
        background: linear-gradient(to bottom,  #84d181, #afc0af);
    }
    .msgRec {
        border-style: solid;
        border-width: thin;
        border-color: white;
        border-radius: 25px;
        max-width: 70%;
        padding:  1%;

        margin-left: auto;
        margin-right:0;
        margin-left: 0;
        margin-right : auto;
        background: linear-gradient(to bottom, #997dc9, #ac9fc2) ;


    }
    
</style>