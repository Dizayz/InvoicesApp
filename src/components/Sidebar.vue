<script setup lang="ts">
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { ref } from "vue"


library.add(faFileInvoiceDollar)


const bounce = ref(false)
const handleMouseOver = () => {
    bounce.value = true
}

const handleMouseOut = () => {
    bounce.value = false
}


</script>


<template>
    <div class="Aside">

        <div class="logo">
            <font-awesome-icon v-if="!bounce" :icon="['fas', 'file-invoice-dollar']"
                style="color: #ffffff; font-size: 50px" />
            <font-awesome-icon v-else :icon="['fas', 'file-invoice-dollar']" style="color: #ffffff; font-size: 50px"
                bounce />
            <div class="overlay" @mouseover="handleMouseOver" @mouseout="handleMouseOut"></div>
        </div>

    </div>
</template>


<style scoped>
.Aside {
    z-index: 90;
    background-color: #2b2b4b;
    height: 100vh;
    box-shadow: 0px 0px 0px 15px #36365e5d;
    -webkit-box-shadow: 1px 1px 20px 5px #36365e5d;

}

.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    border-radius: 0 20px 20px 0;

}

.logo {
    position: relative;
    padding: 20px;
    width: 7rem;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #8A4FFF;
    border-radius: 0 20px 20px 0;

}

/* responsiveness */
@media (max-width: 500px) {
    .Aside {
        display: none;
    }
}
</style>