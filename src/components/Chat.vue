<template>
    <div> 
    <div v-if="this.showMandarHola">

    <button class="boton" v-on:click="sendHola()">Enviar un hola al vendedor</button> 
    </div>
    <div v-else style="display: flex; flex-direction: row; overflow: auto;" >
    <!--<input v-if="noMessages()" v-model="primerMensaje" placeholder="Hola, tengo una duda acerca de tu producto."> -->
        
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
            showMandarHola : false
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
            this.showMandarHola = false;
        },
        sendHola(){

            var cadena ="api/enviar-mensaje.json?idAnuncio="+this.idAnuncio+
                            "&idHiloPadre="+this.idRemitente+
                            "&idRemitente="+this.idRemitente+"&mensaje="+"hola!";

            axios.get(cadena)
            this.showMandarHola = false;
        },

        setShowButton(){
            axios("/api/soy-vendedor.json?idAnuncio="+this.idAnuncio +"&idRemitente="+this.idRemitente)
              .then(x => {
                if (x.data === 0) { 
                    axios("/api/num-chats.json?idAnuncio=" + this.idAnuncio + "&idRemitente=" + this.idRemitente)
                        .then(x => {
                            if (x.data === 0) {
                                this.showMandarHola = true;
                            }
                        })
                }
            })

        }
    },
    mounted() {
        this.setShowButton();

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
    .boton {
        background-color: #c2fbd7;
        border-radius: 100px;
        box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,
                    rgba(44, 187, 99, .15) 0 1px 2px,
                    rgba(44, 187, 99, .15) 0 2px 4px,
                    rgba(44, 187, 99, .15) 0 4px 8px,
                    rgba(44, 187, 99, .15) 0 8px 16px,
                    rgba(44, 187, 99, .15) 0 16px 32px;
        color: green;
        cursor: pointer;
        display: inline-block;
        font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
        padding: 7px 20px;
        text-align: center;
        text-decoration: none;
        transition: all 250ms;
        border: 0;
        font-size: 16px;
        user-select: none;
        -webkit-user-select: none;
    touch-action: manipulation;
    }

.boton:hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,
              rgba(44,187,99,.25) 0 1px 2px,
              rgba(44,187,99,.25) 0 2px 4px,
              rgba(44,187,99,.25) 0 4px 8px,
              rgba(44,187,99,.25) 0 8px 16px,
              rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}        
    
</style>