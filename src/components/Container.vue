<template>
    <div class="Container">
        <slot></slot>
    </div>
</template>

<style scoped>
.Container {
    max-width: 1000px;
    margin: 0 auto;


}

@media (max-width:500px) {
    .Container {
        padding: 50px 20px;
    }
}
</style>