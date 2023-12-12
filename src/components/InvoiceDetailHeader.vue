
<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faCircle, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { RouterLink, useRouter } from "vue-router";
import { useMyStore } from '../stores/store';
import { storeToRefs } from "pinia";
const store = useMyStore();
library.add(faCircle)
library.add(faAngleLeft)
const router = useRouter()


const { invoiceDetaile, invoices, Invoicee, isModalToggle, isEditInvoice } = storeToRefs(store)
const markPaid = () => {
    if (invoiceDetaile.value) {
        if (invoiceDetaile.value.status == "Draft") {
            invoiceDetaile.value.status = "Pending"
            console.log(invoiceDetaile.value.status)
        }
        else if (invoiceDetaile.value.status == "Pending") {
            invoiceDetaile.value.status = "Paid"
            console.log(invoiceDetaile.value.status)
        }
        else if (invoiceDetaile.value.status == "Paid") {
            invoiceDetaile.value.status = "Pending"
            console.log(invoiceDetaile.value.status)
        }
    }
}

const deleteObjectById = () => {
    if (invoiceDetaile.value?.id !== undefined) {
        const indexToDelete = invoices.value.findIndex(obj => obj.id === invoiceDetaile.value?.id);

        if (indexToDelete !== -1) {
            invoices.value.splice(indexToDelete, 1);
        }
    }
    router.push({ name: "home" })
};

const editInvoice = () => {
    isEditInvoice.value = true
    if (invoiceDetaile.value) {
        Invoicee.value = invoiceDetaile.value
    }
    isModalToggle.value = !isModalToggle.value
}

</script>


<template>
    <div class="goback">
        <font-awesome-icon class="arrow" :icon="['fas', 'angle-left']" />
        <RouterLink to="/">Go Back</RouterLink>
    </div>
    <div class="invoice-container">
        <div class="invoice">
            <h3>Status </h3>
            <div class="status"
                :style="invoiceDetaile?.status == 'Draft' ? { backgroundColor: 'rgba(255, 255, 255, 0.336)' } : invoiceDetaile?.status == 'Paid' ? { backgroundColor: '#058c4260' } : { backgroundColor: '#e7782859' }">
                <h2
                    :style="invoiceDetaile?.status == 'Draft' ? { color: 'white' } : invoiceDetaile?.status == 'Paid' ? { color: '#28a15f' } : { color: '#E77728' }">
                    <font-awesome-icon :icon="['fas', 'circle']" /> {{ invoiceDetaile?.status }}
                </h2>
            </div>
        </div>
        <div class="detail">
            <button @click="editInvoice" class="btn1">
                Edit
            </button>
            <button @click="deleteObjectById" class="btn2">
                Delete
            </button>
            <button @click="markPaid" class="btn3"
                :style="invoiceDetaile?.status == 'Pending' ? { backgroundColor: '#28a15f' } : { backgroundColor: '#E77728' }">
                {{ invoiceDetaile?.status == "Pending" ? "Mark as Paid"
                    : "Mark as Pending " }}
            </button>
        </div>



    </div>
</template>
<style scoped>
.invoice-container {
    background-color: #36365e5d;
    margin-top: 30px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 40px 40px;
    border-radius: 25px;
}

.invoice {
    display: flex;
    align-items: center;

}

.status {
    margin-left: 15px;
    background-color: #e7782859;
    padding: 5px 25px;
    font-size: 0.7rem;
    border-radius: 10px;
}

.status h2 {
    color: #E77728;
    font-weight: 400;

}

.btn1,
.btn2,
.btn3 {
    width: fit-content;
    margin-left: 5px;
    cursor: pointer;
    padding: 15px 25px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    border: none;
    border-radius: 360px;
}


.btn1 {
    background-color: rgba(128, 128, 128, 0.13);
}

.btn2 {
    background-color: #D05353;
}



.goback {
    margin-top: 60px;
}

.goback .arrow {
    color: #8A4FFF;
}

.goback a {
    font-size: 1.1rem;
    text-decoration: none;
    color: white;
    font-weight: 600;
    margin-left: 10px;
}

/* responsive */
@media (max-width:500px) {
    .invoice {
        margin-top: 25px;
        margin-left: 10px;
    }

    .goback {
        margin-top: 0;
        margin-left: 15px;
    }

    .invoice-container {
        flex-direction: column-reverse;
        align-items: start;
    }

    .detail {
        display: flex;
        flex-direction: row-reverse;
        justify-content: start;
        flex-wrap: wrap;
        gap: 15px;
    }

    .detail button {
        margin: 0;
    }
}
</style>