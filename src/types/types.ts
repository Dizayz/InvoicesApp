interface Item {
    id: number,
    itemName: string,
    Qte: number | undefined,
    Price: number | undefined,
    Total: number | undefined
}

interface BillFrom {
    Address: string,
    City: string,
    Zip: number | undefined,
    Country: string
}
interface BillTo {
    Client: string,
    ClientEmail: string,
    Address: string,
    City: string,
    Zip: number | undefined,
    Country: string
    InvoiceDate: string,
    PaymentDue: string,
    Description: string
}

interface Invoice {
    id: number,
    Billfrom: BillFrom,
    Billto: BillTo,
    ListItem: Item[],
    status: string
}

export type { Item, BillFrom, BillTo, Invoice };