<template>
    <div v-show="visibleSlide === index" class="carrete-slide">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['visibleSlide','index'],
    data() {
        return {
        }
    }
}
</script>