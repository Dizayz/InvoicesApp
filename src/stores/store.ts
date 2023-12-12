import { defineStore } from 'pinia'
import { ref } from "vue"
import { type Item, type Invoice } from "../types/types"
import { watch } from 'vue'


export const useMyStore = defineStore('MyStore', () => {
  // Find the invoice with the specified ID
  const invoiceDetaile = ref<Invoice>();
  const isEditInvoice = ref(false)
  const currentDate: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const invoices = ref<Array<Invoice>>([
    {
      id: 12345,
      Billfrom: {
        Address: "CITE 80 LOGTS BLOC 64",
        City: "SBA",
        Zip: 22000,
        Country: "Algeria"
      },
      Billto: {
        Client: "Walid Negrano",
        ClientEmail: "WalidProffesional@gmail.com",
        Address: "444 Alaska Avenue California",
        City: "Torrance",
        Zip: 90403,
        Country: "USA",
        InvoiceDate: new Intl.DateTimeFormat('en-US', options).format(currentDate),
        PaymentDue: "Dec 11, 2024",
        Description: "Front-End Developpement"
      },
      ListItem: [{
        id: 1,
        itemName: "UI / UX",
        Qte: 1,
        Price: 300,
        Total: 300,
      }, {
        id: 2,
        itemName: "Webpages",
        Qte: 5,
        Price: 20,
        Total: 100,
      }
        ,
      {
        id: 3,
        itemName: "Backend",
        Qte: 1,
        Price: 550,
        Total: 550,
      }],
      status: "Draft"
    }
  ]);
  const status = ref("")
  const isModalToggle = ref(false)
  const Invoicee = ref<Invoice>({
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
  })

  const appendToListItem = () => {
    Invoicee.value.ListItem.push({
      id: Invoicee.value.ListItem.length + 1,
      itemName: "",
      Qte: undefined,
      Price: undefined,
      Total: 0
    })
  }
  const returnTotal = (item: Item) => {
    if (item.Qte && item.Price) { item.Total = item.Qte * item.Price }
    return item.Total
  }
  const deleteItem = (itemId: number) => {
    Invoicee.value.ListItem = Invoicee.value.ListItem.filter(item => item.id !== itemId);
  }


  // Assuming you have a variable to store the selected payment terms
  // It could be a ref or a reactive property in your setup
  const selectedPaymentTerm = ref(null);

  // Function to calculate the due date based on the selected payment term
  function calculateDueDate(): string {
    if (selectedPaymentTerm.value !== null) {
      const dueDate: Date = new Date(currentDate);

      // Add either 30 or 60 days based on the selected payment term
      dueDate.setDate(dueDate.getDate() + parseInt(selectedPaymentTerm.value, 10));

      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };

      return new Intl.DateTimeFormat('en-US', options).format(dueDate);
    }

    return ''; // Handle the case where no payment term is selected
  }

  // Usage in your component
  watch(selectedPaymentTerm, () => {
    Invoicee.value.Billto.PaymentDue = calculateDueDate()
  }
  )

  // Function to calculate the total for each ListItem in an object
  const calculateTotalForObject = (invoice: Invoice) => {
    let total = 0;
    if (invoice) {
      invoice.ListItem.forEach((item) => {
        if (item.Total) { total += item.Total; }
      });
    }

    return total;
  };

  const IsFieldEmpty = () => {
    for (const [key, value] of Object.entries(Invoicee.value.Billfrom)) {

      if (value === undefined || value === "") {
        return false
      }
    }
    for (const [key, value] of Object.entries(Invoicee.value.Billto)) {
      if (value === undefined || value === "") {
        return false
      }
    }
    for (const key1 of Invoicee.value.ListItem) {
      for (const [key2, value] of Object.entries(key1)) {
        if (value === undefined || value === "") {
          return false
        }
      }
    }
    return true
  }






  return { isEditInvoice, invoiceDetaile, invoices, Invoicee, status, isModalToggle, selectedPaymentTerm, appendToListItem, returnTotal, deleteItem, calculateTotalForObject, IsFieldEmpty }
})
