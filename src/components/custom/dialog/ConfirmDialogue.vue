<template>
    <popup-modal ref="popup">
        <h2 style="margin-top: 0; text-align: center;">{{ title }}</h2>
        <p>{{ message }}</p>
        <hr/>
        <div v-if="accept" class="centrado">
            <button class="green-btn" @click="_confirm">{{ acceptButton }}</button>
        </div>
        <div v-else class="btns">
            <button class="green-btn" @click="_confirm">{{ acceptButton }}</button>
            <button class="red-btn" @click="_cancel">{{ secondaryButton }}</button>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
    name: 'ConfirmDialogue',

    components: { PopupModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        secondaryButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        acceptButton: 'Go Back', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        accept: true
    }),

    methods: {
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
            this.secondaryButton = opts.secondaryButton
            this.accept = opts.accept
            if (opts.acceptButton) {
                this.acceptButton = opts.acceptButton
            }
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
            // Or you can throw an error
            // this.rejectPromise(new Error('User cancelled the dialogue'))
        },
    },
}
</script>

<style scoped>
.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.centrado {
    text-align: center;
}
.red-btn {
    padding: 0.5em 1em;
    background-color: #ffcccc;
    color: #cc2222;
    border: 2px solid #ff0000;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
.green-btn {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #35907f;
    border: 2px solid #0ec5a4;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>
