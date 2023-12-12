<script setup lang="ts">
import Container from "../components/Container.vue"
import InvoiceDetailHeader from "@/components/InvoiceDetailHeader.vue";
import InvoiceDetail from "@/components/InvoiceDetail.vue"
import { onMounted } from 'vue';
import { useMyStore } from '../stores/store';
import { storeToRefs } from "pinia";
const store = useMyStore();
const { invoices } = store;
const { invoiceDetaile } = storeToRefs(store)
// Access the "id" parameter
const { id } = defineProps(['id']);

onMounted(() => {
    // Find the invoice with the specified ID from the invoices array
    invoiceDetaile.value = invoices.find((inv) => inv.id === Number(id));
});

</script>



<template>
    <div>
        <Container>
            <div>
                <InvoiceDetailHeader></InvoiceDetailHeader>
                <InvoiceDetail></InvoiceDetail>
            </div>

        </Container>
    </div>
</template>







