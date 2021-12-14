<template>
    <div class="carrete">
        <slot></slot>
        <button @click="siguiente" class="siguiente">Sig</button>
        <button @click="atras" class="atras">Atras</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        siguiente() {
            this.$emit('siguiente')
        },
        atras() {
            this.$emit('atras')
        }
    }
}
</script>

<style>
    .carrete {
        position: relative;
        width: 600px;
        height: 350px;
        overflow: hidden;
    }
    .siguiente, .atras {
        position: absolute;
        height: 40px;
        width: 50px;
        top: calc(50% - 20px);
        background-color: rgba(0, 0, 0, 0.438);
        border: none;
        color: white;
    }
    .siguiente:focus, .siguiente:hover, .atras:focus, .atras:hover  {
        outline: none;
        cursor: pointer;
    }
    .siguiente {
        right: 0;
    }
    .atras {
        left: 0;
    }
</style>
