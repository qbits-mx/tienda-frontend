<template>
    <div>

        <div class="card-body align" style="display: table-cell; width=300px;overflow-x:scroll" v-bind:key=conv.id v-for="(conv,idx) in chatList" :id="'conv' + idx" >
            
            <div class="container" style ="height=10px;overflow-y:scroll">
            <div v-bind:key="chat.idHiloPadre" v-for="chat in conv" v-bind:id='chat.id'>
            <tr >
                {{chat.mensaje}}
            </tr>
            </div>
                <input :id="'e_text_' + idx" class="e-input" type="text" placeholder="Manda un mensaje" @keypress.enter="sendMsg('e_text_' + idx)"/>
            </div>
        </div>
              </div>

</template>

<script>

export default {

    name : "Chat",
    data() {
        return {
            msg : "",
            chat :[]
        }
    },
    props:[
        'chatList',
        'idAnuncio',
        "idRemitente",
        "idHiloPadre"
    ],
    methods: {

        Expand(obj){
              if (!obj.savesize) obj.savesize=obj.size;
                obj.size=Math.max(obj.savesize,obj.value.length);
        },
        sendMsg(id){

            var text = document.getElementById(id).value;
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            const newMsg = {
                idAnuncio : this.idAnuncio,
                idRemitente : this.idRemitente,
                idHiloPadre : this.idHiloPadre,
                mensaje : text,
                fecha : yyyy + "/" + mm + "/" + dd
            }
            console.log(newMsg)
            document.getElementById(id).value = ""

        }
    },
    mounted() {
        this.id = this._uid
    }
    

}

</script>
