
<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useMyStore } from "../stores/store";
import { storeToRefs } from 'pinia'
import { ref } from "vue"

const store = useMyStore()
const { isModalToggle, Invoicee, selectedPaymentTerm, invoices, isEditInvoice, invoiceDetaile } = storeToRefs(store)
const { appendToListItem, returnTotal, deleteItem, IsFieldEmpty } = store

library.add(faTrashCan)
library.add(faPlus)
const currentDate: Date = new Date();
const alertMsg = ref("")
const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
};

const Discard = () => {
    isModalToggle.value = !isModalToggle.value
    Invoicee.value = {
        id: Math.floor(Math.random() * 100000),
        Billfrom: {
            Address: "",
            City: "",
            Zip: undefined,
            Country: ""
        },
        Billto: {
            Client: "",
            ClientEmail: "",
            Address: "",
            City: "",
            Zip: undefined,
            Country: "",
            InvoiceDate: new Intl.DateTimeFormat('en-US', options).format(currentDate),
            PaymentDue: "",
            Description: ""
        },
        ListItem: [{
            id: 1,
            itemName: "",
            Qte: undefined,
            Price: undefined,
            Total: 0,
        }],
        status: ""
    }
}
const SaveDraft = () => {
    if (!IsFieldEmpty()) {
        alertMsg.value = "Please Fill ALL the empty fields."
    }
    else {
        Invoicee.value.status = "Draft"
        invoices.value.unshift(Invoicee.value)
        Invoicee.value = {
            id: Math.floor(Math.random() * 100000),
            Billfrom: {
                Address: "",
                City: "",
                Zip: undefined,
                Country: ""
            },
            Billto: {
                Client: "",
                ClientEmail: "",
                Address: "",
                City: "",
                Zip: undefined,
                Country: "",
                InvoiceDate: new Intl.DateTimeFormat('en-US', options).format(currentDate),
                PaymentDue: "",
                Description: ""
            },
            ListItem: [{
                id: 1,
                itemName: "",
                Qte: undefined,
                Price: undefined,
                Total: 0,
            }],
            status: ""
        }
        selectedPaymentTerm.value = null
        isModalToggle.value = !isModalToggle.value
        alertMsg.value = ""
    }

}
const SaveInvoice = () => {
    if (!IsFieldEmpty()) {
        alertMsg.value = "Please Fill ALL the empty fields."
    }
    else {
        Invoicee.value.status = "Pending"
        invoices.value.unshift(Invoicee.value)
        Invoicee.value = {
            id: Math.floor(Math.random() * 100000),
            Billfrom: {
                Address: "",
                City: "",
                Zip: undefined,
                Country: ""
            },
            Billto: {
                Client: "",
                ClientEmail: "",
                Address: "",
                City: "",
                Zip: undefined,
                Country: "",
                InvoiceDate: new Intl.DateTimeFormat('en-US', options).format(currentDate),
                PaymentDue: "",
                Description: ""
            },
            ListItem: [{
                id: 1,
                itemName: "",
                Qte: undefined,
                Price: undefined,
                Total: 0,
            }],
            status: ""
        }
        selectedPaymentTerm.value = null
        isModalToggle.value = !isModalToggle.value
        alertMsg.value = ""
    }

}
const EditDraft = () => {
    if (!IsFieldEmpty()) {
        alertMsg.value = "Please Fill ALL the empty fields."
    }
    else if (invoiceDetaile.value) {
        invoiceDetaile.value.status = "Draft"
        invoiceDetaile.value = Invoicee.value
        Invoicee.value = {
            id: Math.floor(Math.random() * 100000),
            Billfrom: {
                Address: "",
                City: "",
                Zip: undefined,
                Country: ""
            },
            Billto: {
                Client: "",
                ClientEmail: "",
                Address: "",
                City: "",
                Zip: undefined,
                Country: "",
                InvoiceDate: new Intl.DateTimeFormat('en-US', options).format(currentDate),
                PaymentDue: "",
                Description: ""
            },
            ListItem: [{
                id: 1,
                itemName: "",
                Qte: undefined,
                Price: undefined,
                Total: 0,
            }],
            status: ""
        }
        selectedPaymentTerm.value = null
        isModalToggle.value = !isModalToggle.value
        alertMsg.value = ""
        isEditInvoice.value = false
    }

}
const EditInvoice = () => {
    if (!IsFieldEmpty()) {
        alertMsg.value = "Please Fill ALL the empty fields."
    }
    else if (invoiceDetaile.value) {
        invoiceDetaile.value.status = "Pending"
        invoiceDetaile.value = Invoicee.value
        Invoicee.value = {
            id: Math.floor(Math.random() * 100000),
            Billfrom: {
                Address: "",
                City: "",
                Zip: undefined,
                Country: ""
            },
            Billto: {
                Client: "",
                ClientEmail: "",
                Address: "",
                City: "",
                Zip: undefined,
                Country: "",
                InvoiceDate: new Intl.DateTimeFormat('en-US', options).format(currentDate),
                PaymentDue: "",
                Description: ""
            },
            ListItem: [{
                id: 1,
                itemName: "",
                Qte: undefined,
                Price: undefined,
                Total: 0,
            }],
            status: ""
        }
        selectedPaymentTerm.value = null
        isModalToggle.value = !isModalToggle.value
        alertMsg.value = ""
        isEditInvoice.value = false
    }

}

</script>

<template>
    <div v-if="isModalToggle" class="overlay"></div>
    <Transition name="slidein">
        <div class="modal-container" v-if="isModalToggle">
            <div class="modal-margin">
                <div class="modal-padding">
                    <h1>New Invoice</h1>
                    <div class="bill-from">
                        <h4>Bill From</h4>
                        <label>Street Adress </label>
                        <input v-model="Invoicee.Billfrom.Address" type="text">
                        <div class="detail-adress">
                            <div> <label>City </label>
                                <input v-model="Invoicee.Billfrom.City" type="text">
                            </div>
                            <div> <label>Zip Code </label>
                                <input v-model="Invoicee.Billfrom.Zip" name="numbersonly" type="text"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                            </div>
                            <div> <label>Country </label>
                                <input v-model="Invoicee.Billfrom.Country" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="bill-to">
                        <h4>Bill To</h4>
                        <label>Client's Name </label>
                        <input v-model="Invoicee.Billto.Client" type="text">
                        <label>Client's Email </label>
                        <input v-model="Invoicee.Billto.ClientEmail" type="email">
                        <label>Street Adress </label>
                        <input v-model="Invoicee.Billto.Address" type="text">
                        <div class="detail-adress">
                            <div> <label>City </label>
                                <input v-model="Invoicee.Billto.City" type="text">
                            </div>
                            <div> <label>Zip Code </label>
                                <input v-model="Invoicee.Billto.Zip" type="number">
                            </div>
                            <div> <label>Country </label>
                                <input v-model="Invoicee.Billto.Country" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="bill-detail">
                        <div class="date-due">
                            <div class="date"> <label>Invoice date </label>
                                <h5 style="color: white;">{{ Invoicee.Billto.InvoiceDate }}</h5>
                            </div>
                            <div class="due"> <label>Payment Due </label>
                                <h5 style="color: white;">{{ Invoicee.Billto.PaymentDue }}</h5>
                            </div>
                        </div>
                        <label>Payment Terms </label>
                        <select v-model="selectedPaymentTerm" name="" id="nextdays">
                            <option id="disabled-option" disabled selected value></option>
                            <option value="30">Net 30 Days</option>
                            <option value="60">Net 60 Days</option>
                        </select>
                        <label>Product Description </label>
                        <input v-model="Invoicee.Billto.Description" type="email">
                        <h2>Item List</h2>
                        <div class="items">
                            <div class="titless" v-for="item in Invoicee.ListItem" :key="item.id">
                                <div></div>
                                <div class="item-namee">
                                    <h3>Item Name</h3> <input type="text" v-model="item.itemName">
                                </div>
                                <div class="qte-price-total-trash">
                                    <div class="Qtee">
                                        <h3>Qte</h3>
                                        <input v-model="item.Qte" name="numbersonly" type="text"
                                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                                    </div>
                                    <div class="pricee">
                                        <h3>Price</h3>
                                        <input v-model="item.Price" name="numbersonly" type="text"
                                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                                    </div>
                                    <div class="total">
                                        <h3>Total</h3>
                                        <h3>$ {{ returnTotal(item) }}</h3>
                                    </div>
                                    <div class="trash" @click="deleteItem(item.id)"><font-awesome-icon
                                            :icon="['fas', 'trash-can']" />
                                    </div>

                                </div>
                                <hr>
                            </div>
                            <button @click="appendToListItem"><font-awesome-icon style="color: #8A4FFF;"
                                    :icon="['fas', 'plus']" />
                                Add New Item</button>
                            <h4 class="msgalert">{{ alertMsg }}</h4>
                            <div class="buttons">
                                <button @click="Discard">Discard</button>
                                <div v-if="(!isEditInvoice)" class="right-buttons">
                                    <button @click="SaveDraft">Save as Draft</button>
                                    <button @click="SaveInvoice">Create Invoice</button>
                                </div>
                                <div v-else class="right-buttons">
                                    <button @click="EditDraft">Save as Draft</button>
                                    <button @click="EditInvoice">Edit Invoice</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.titless {
    display: flex;
    flex-direction: column;
    gap: 10px;

}

.titless hr {
    margin-top: 10px;
    width: 100%;
    height: 0px;
    border: 1px solid #8A4FFF;

}

.qte-price-total-trash {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.qte-price-total-trash .trash {
    flex: 0;
    margin-top: 35px;
}

.qte-price-total-trash>* {
    flex: 1;
}


.msgalert {
    margin-top: 35px;
    font-size: 1rem;
    color: #F15156
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent overlay color */
    z-index: 1;
}

.right-buttons button {
    margin-left: 15px;
}

.slidein-enter-active,
.slidein-leave-active {
    transition: 0.6s all ease;
}

.slidein-enter-from {
    transform: translateX(-120%);
}

.slidein-enter-to {
    transform: translateX(0%);
}

.slidein-leave-from {
    transform: translateX(0%);
}

.slidein-leave-to {
    transform: translateX(-120%);
}

.modal-container {
    height: 100vh;
    overflow: scroll;
    width: 800px;
    position: absolute;
    left: 7rem;
    background-color: #15153d;
    box-shadow: 10px 0px 10px 0px #15153d;
    z-index: 2;
}


.modal-padding {
    padding: 40px;
}

.modal-container::-webkit-scrollbar {
    width: 0px;
}

h1 {
    font-weight: 700;
    font-size: 2.5rem;
    padding: 0 20px 20px 0;
    margin: 0 10px 10px 0;
}

h4 {
    font-weight: 500;
    color: #8A4FFF;
    margin: 20px 0;
}

label,
h3 {
    font-weight: 600;
    font-size: 0.9rem;
    display: block;
    margin: 10px 0;


}

input,
select {
    width: 100%;
    padding: 12px 10px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    background-color: #36365e5d;
    border: none;
}

select {
    color: white;
}

select:focus {
    outline: none;
}

select option {
    background-color: white;
    color: #121212;
}

input:focus {
    text-decoration: none;
    outline: none;
}

.detail-adress {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.date-due {
    margin-top: 40px;
    display: flex;
    gap: 20px;

}

.date,
.due {
    width: 100%;
}

#disabled-option {
    display: none;
}

select option {
    font-weight: 600;
}



h2 {
    margin: 30px 0 10px 0;
    color: rgba(128, 128, 128, 0.74);
    font-size: 1.5rem;
    font-weight: 700;
}

.Qte {
    width: 60px;
}

.price {
    width: 120px;
}

.titles,
.item {
    display: flex;
    gap: 20px;
}

.item {
    margin-bottom: 10px;
}

.item-name {
    width: 50%;
}


.qte-price-total {
    display: flex;
    flex-wrap: nowrap;
    width: 50%;
    gap: 20px;
}



.titles-contenue {
    display: flex;
    width: 50%;
    gap: 20px;
    align-items: center;

}


.items {
    display: flex;
    flex-direction: column;

}

.total {
    width: 95px;
}

.trash {
    color: rgba(128, 128, 128, 0.705);
    font-size: 1.1rem;
    cursor: pointer;
}

.items button {
    margin-top: 15px;
    padding: 25px;
    border-radius: 360px;
    font-weight: 800;
    background-color: #36365e5d;
    border: none;
    color: white;
    cursor: pointer;
}

.buttons {
    display: flex;
    justify-content: space-between;
}

.buttons button {

    padding: 20px 25px;
}

.buttons>button {
    background-color: #F15156;
}

.right-buttons button:last-child {
    background-color: #8A4FFF;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #36365e inset !important;
}

input:-webkit-autofill {
    -webkit-text-fill-color: white !important;
}

@media (max-width:500px) {
    .buttons {
        flex-direction: column-reverse;
        justify-content: center;
        gap: 5px;
        flex-wrap: wrap;
    }

    .buttons>button {
        width: fit-content;
        margin: auto 0
    }

    .right-buttons>button {
        margin: 5px 0;
    }

    .modal-container {
        width: 100%;
        left: 0;
    }

    .modal-container {

        box-shadow: 0px 0px 0px 0px #15153d;

    }

    .modal-margin {
        margin: 15px;
        margin-bottom: 0;
    }

    .modal-padding {
        padding: 20px;
    }


}
</style>