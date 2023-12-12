<script setup lang="ts">
import { useMyStore } from '../stores/store';
import { storeToRefs } from "pinia";
const store = useMyStore();

const { invoiceDetaile } = storeToRefs(store)
const { calculateTotalForObject } = store
</script>



<template>
    <div class="detail-container">
        <div class="id-adress">
            <div>
                <h1>#{{ invoiceDetaile?.id }}</h1>
                <h3>{{ invoiceDetaile?.Billto.Description }}</h3>
            </div>
            <div class="adress">
                <p>{{ invoiceDetaile?.Billto.Address }}</p>
                <p> {{ invoiceDetaile?.Billto.City }} {{ invoiceDetaile?.Billto.Zip }}</p>
                <p> {{ invoiceDetaile?.Billto.Country }}</p>
            </div>
        </div>
        <div class="informations">
            <div class="information">
                <p>Invoice Date</p>
                <h6>{{ invoiceDetaile?.Billto.InvoiceDate }}</h6>
            </div>
            <div class="information">
                <p>Bill to</p>
                <h6>{{ invoiceDetaile?.Billto.Client }}</h6>
            </div>
            <div class="information">
                <p>Sent To</p>
                <h6>{{ invoiceDetaile?.Billto.ClientEmail }}</h6>
            </div>
            <div class="information">
                <p>Payment Date</p>
                <h6>{{ invoiceDetaile?.Billto.PaymentDue }}</h6>
            </div>
            <div class="information">
                <h5>{{ invoiceDetaile?.Billto.Address }}</h5>
                <h5>{{ invoiceDetaile?.Billto.City }} {{ invoiceDetaile?.Billto.Zip }} </h5>
                <h5>{{ invoiceDetaile?.Billto.Country }}</h5>
            </div>
        </div>
        <div class="receipt-container">
            <div class="receipt-padding">
                <div class="receipt">
                    <div class="name">
                        <h3>Item Name</h3>
                        <h3 v-for="item in invoiceDetaile?.ListItem">{{ item.itemName }}</h3>
                    </div>
                    <div class="qte-price-total">
                        <div class="qte">
                            <h3>Qte</h3>
                            <h3 v-for="item in invoiceDetaile?.ListItem">{{ item.Qte }}</h3>
                        </div>
                        <div class="price">
                            <h3>Price</h3>
                            <h3 v-for="item in invoiceDetaile?.ListItem">${{ item.Price }}</h3>
                        </div>
                        <div class="total">
                            <h3>Total</h3>
                            <h3 v-for="item in invoiceDetaile?.ListItem">${{ item.Total }}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="total-amount">
                <h3>Amount Due</h3>
                <h1>${{ invoiceDetaile ? calculateTotalForObject(invoiceDetaile) : '' }}</h1>
            </div>
        </div>

    </div>
</template>

<style scoped>
.adress {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.detail-container {
    margin-top: 30px;
    background-color: #36365e5d;
    border-radius: 25px;
    padding: 50px;
}

.id-adress {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
}

.id-adress h1,
.id-adress h3,
.id-adress p {
    font-weight: 600;
}

.id-adress p {
    text-align: right;
}

.informations {
    display: flex;
    flex-wrap: wrap;
    gap: 40px 0;
}

.information {
    padding: 5px;
}

.information p {
    font-size: 0.8rem;
    margin-bottom: 10px;
}

.information h6 {
    font-size: 1.3rem;
    margin-right: 90px;
}

.information h5 {
    font-size: 0.9rem;
}

.total-amount {

    background-color: #121212;
    padding: 40px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.receipt-container {
    margin-top: 50px;
    border-radius: 25px;
    overflow: hidden;
}

.receipt {

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.receipt-padding {
    background-color: #1b1b3a;
    padding: 40px;
}

.qte-price-total {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 100px;
}

.qte,
.price,
.total,
.name {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* responsive */
@media(max-width:500px) {
    .receipt-container {
        margin-top: 30px;
    }

    .detail-container {
        width: 100%;
        padding: 25px;
    }

    .id-adress {
        flex-direction: column;
        gap: 25px;
        justify-content: start;
        align-items: start;
    }

    .adress p {
        text-align: left;
    }

    .informations {
        gap: 25px;
        flex-direction: column;
    }

    .informations * {
        width: 100%;
    }

    .information h6 {
        font-size: 1.2rem;
    }

    .receipt {
        padding: 20px 0;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        overflow-x: scroll;
    }

    .receipt-padding {
        background-color: #1b1b3a;
        padding: 0 20px;
    }

    .receipt h3 {
        min-width: 100px;
        max-width: 150px;
    }

    .qte-price-total {
        margin-top: 20px;
        gap: 30px;
        flex-direction: column;
        align-items: start;

    }

    .name,
    .qte,
    .price,
    .total {
        text-align: center;
        flex-direction: row;
        align-items: start;

    }

    .total-amount {
        flex-direction: column;
        text-align: start;
        align-items: start;
        justify-content: start;
        gap: 20px;
    }

}
</style>

