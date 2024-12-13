<template>
    <div v-if="show" class="modal" @click.self="close">
        <div class="modal-content">
            <slot></slot>
            <button class="close-btn" @click="close">X</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        close() {
            this.$emit('close')
        },
    },
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    background-color: #9f938e;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    position: relative;
    cursor: auto;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    border: none;
    background-color: #9f938e;
    cursor: pointer;
}
</style>
