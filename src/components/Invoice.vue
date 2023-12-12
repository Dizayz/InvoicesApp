
<script setup lang="ts">
import { computed } from "vue"
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faCircle, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { useMyStore } from "../stores/store";
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router";
import { type Invoice } from "../types/types"
library.add(faCircle)
library.add(faAngleRight)
const store = useMyStore()
const { status, invoices } = storeToRefs(store)
const { calculateTotalForObject } = store

const router = useRouter();
const Detail = (invoice: Invoice) => {
    router.push({ name: 'DetailView', params: { id: invoice.id } });
};
const filteredInvoices = computed(() => {
    if (!status.value) {
        return invoices.value;
    } else {
        return invoices.value.filter((item: Invoice) => item.status === status.value);
    }
})


</script>

<template>
    <div class="invoice-container">
        <div v-for="invoice in filteredInvoices" :key="invoice.id" class="invoice">
            <h3 class="due-client">#{{ invoice.id }}</h3>
            <h3>{{ invoice.Billto.PaymentDue }}</h3>
            <h3>{{ invoice.Billto.Client }}</h3>
            <h2 class="price">${{ calculateTotalForObject(invoice) }}</h2>
            <div class="rab">
                <div class="status"
                    :style="invoice.status == 'Draft' ? { backgroundColor: 'rgba(255, 255, 255, 0.336)' } : invoice.status == 'Paid' ? { backgroundColor: '#058c4260' } : { backgroundColor: '#e7782859' }">
                    <h2
                        :style="invoice.status == 'Draft' ? { color: 'white' } : invoice.status == 'Paid' ? { color: '#28a15f' } : { color: '#E77728' }">
                        <font-awesome-icon :icon="['fas', 'circle']" /> {{ invoice.status }}
                    </h2>
                </div>
            </div>
            <div class="detail" @click="Detail(invoice)">
                <font-awesome-icon :icon="['fas', 'angle-right']" style="color: #8A4FFF;" />
            </div>

        </div>


    </div>
</template>

<style scoped>
.invoice-container {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.invoice {
    background-color: #36365e5d;
    padding: 40px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    border-radius: 25px;
}

.invoice>h3,
.invoice>h2,
.rab {
    flex: 1;
}



.rab {
    display: flex;
    justify-content: end;
}


.price {
    font-weight: bold;
}

.status {
    width: fit-content;
    padding: 5px 25px;
    font-size: 0.7rem;
    border-radius: 10px;
}

.status h2 {
    font-weight: 400;
}

.detail {
    width: fit-content;
    padding: 5px;
    cursor: pointer;
}

/* Responsive */
@media (max-width: 500px) {
    .invoice-container {
        margin-top: 30px;
        gap: 20px;
    }

    .invoice {
        padding: 25px;
        flex-direction: column;
        max-width: 300px;
        min-width: 250px;
        margin: 0 auto;
    }
}
</style>