<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useMyStore } from "../stores/store";
import { storeToRefs } from 'pinia'

const store = useMyStore()
const { status, isModalToggle, invoices } = storeToRefs(store)
library.add(faCaretDown)
library.add(faPlus)
const options = ['Pending', 'Draft', 'Paid', 'Clear All'];
const isToggleDropdown = ref(false)
const handleMouseOver = () => {
    isToggleDropdown.value = !isToggleDropdown.value
}
const SelectedStatus = (option: string) => {
    status.value = option;
    isToggleDropdown.value = false;
    if (option == options[3]) {
        status.value = ""
    }
}
const closeDropdownOnClickOutside = (e: MouseEvent) => {
    const dropdownElement = document.querySelector('button');

    if (dropdownElement && e.target) {
        if (!dropdownElement.contains(e.target as Node)) { isToggleDropdown.value = false; }

    }
};

// Add click event listeners
onMounted(() => {
    document.addEventListener('click', closeDropdownOnClickOutside);
});
// Remove click event listeners when component is unmounted
onUnmounted(() => {
    document.removeEventListener('click', closeDropdownOnClickOutside);
});
</script>


<template>
    <div class="header-container">
        <div class="textheader">
            <h1>Invoices</h1>
            <h3>There are {{ invoices.length }} total invoices</h3>
        </div>
        <div class="filter-button">
            <div class="filter">
                <div class="filter-status">
                    <h3>Filter By Status:</h3>
                    <h3 :status="status"> {{ status }}</h3>
                </div>
                <div class="select">
                    <button class="btn1" @click="handleMouseOver"><font-awesome-icon :icon="['fas', 'caret-down']"
                            style="color: #8A4FFF;" /></button>
                    <div v-if="isToggleDropdown" class="options">
                        <p v-for="option in options" :key="option" @click="SelectedStatus(option)">
                            {{ option }}
                        </p>
                    </div>

                </div>
            </div>


            <button class="btn2" @click="() => { isModalToggle = !isModalToggle }">
                <div class="plus"><font-awesome-icon style="color: #8A4FFF;" :icon="['fas', 'plus']" /></div> New invoice
            </button>
        </div>
    </div>
</template>


<style scoped>
.textheader h1 {
    font-weight: bold;
    font-size: 3rem;
}

.textheader h3 {
    font-weight: bold;
    font-size: 1.5rem;
}

.header-container {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.filter-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.filter-button .btn2 {
    margin-left: 20px;
    cursor: pointer;
    padding: 15px;
    font-size: 1rem;
    font-weight: 600;
    background-color: #8A4FFF;
    color: white;
    border: none;
    border-radius: 360px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
}

.plus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 29px;
    height: 30px;
    font-size: 1.5rem;
    background-color: white;
    border-radius: 360px;
}

.filter-status h3 {
    display: inline;
    margin-left: 5px;
}

.select {
    position: relative;

}

.select .btn1 {
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 1.5rem;

}

.options {
    background-color: rgb(29, 29, 68);
    position: absolute;
    right: 0px;
}

.options p {
    width: 160px;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 10px 30px;
    cursor: pointer;
}

.options p:hover {
    background-color: white;
    color: #1b1b3a;
    transition: 0.3s all ease;
}

.filter {
    display: flex;
    width: fit-content;
}

/* Responsive */
@media (max-width: 500px) {
    .textheader {
        margin-left: 20px;
    }

    .header-container {
        margin-top: 0px;
        flex-direction: column;
        align-items: start;
    }

    .filter-button {
        margin-top: 20px;
        display: flex;
        flex-direction: column-reverse;
        align-items: start;
        gap: 20px;
    }

    .filter-status {
        margin-left: 20px;
    }
}
</style>