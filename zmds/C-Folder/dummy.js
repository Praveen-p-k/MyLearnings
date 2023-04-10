const scan = require('prompt-sync')();

class Invoices {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
        this.uom = 'kgs';
        this.rate = null;
        this.invoices = new Array();
    };
};
class Customers extends Invoices {
    constructor (customerName, phone, item, quantity) {
        super(item, quantity);
        this.customerName = customerName;
        this.phone = phone;
        this.total = 0;
        this.next = null;
    };
};
let head = null, tail = null;

let myStore = [
    {id: 1, name: "Rice", quantity: 200, price: 50},
    {id: 2, name: "Wheat", quantity: 500, price: 40},
    {id: 3, name: "Dhalls", quantity: 300, price: 60},
    {id: 4, name: "Apple", quantity: 500, price: 120},
    {id: 5, name: "Orange", quantity: 300, price: 90},
    {id: 6, name: "Mango", quantity: 500, price: 50},
];

const viewStore =_=> {
    console.log('\nS.No      Item Name             Quantity                Rate(Rs/-)\n');
    myStore.map((item) => {
        console.log(item.id, '        ', item.name, '           \t', item.quantity, '         \t\t', item.price,'-/-');
    })
}

const getItems = newCustomer => {
    let itemName, quantity, rate, miniStore = [];
    let choice = 1, flag = 0;
    viewStore();

    while (choice) {
        console.log('\npress 1 for Buy Items        press 2 for Exit Buying\n');
        choice = Number(scan('Enter the choice: '));
        switch(choice) {
            case 1:
                itemName = String(scan('Enter the Item Name: '));
                quantity = Number(scan('Enter the Quantity: '));
                subtractQuantity(quantity, itemName);
                rate = findRate(quantity, itemName);

                newCustomer.invoices.itemName = itemName;
                newCustomer.invoices.quantity = quantity;
                newCustomer.invoices.rate = Number(rate.rate);
                newCustomer.invoices.subTotal = Number(rate.subTotal);
                newCustomer.todaysTotal += Number(rate.subTotal);
                let oneItem = {
                    itemName: newCustomer.invoices.itemName,
                    quantity: newCustomer.invoices.quantity,
                    uom: newCustomer.invoices.uom,
                    rate: newCustomer.invoices.rate,
                    subTotal: newCustomer.invoices.subTotal,
                }
                miniStore.push(oneItem);
                flag = 1;
                break;
            case 2:
                if (flag) {
                    newCustomer.grandTotal += Number(newCustomer.todaysTotal);
                    let commonField = {
                        date: newCustomer.date,
                        todaysTotal: newCustomer.todaysTotal
                    };
                    newCustomer.todaysTotal = 0;
                    miniStore.unshift(commonField);
                    newCustomer.collectInvoices.push(miniStore);
                    return;
                }
                return;
        }
    }
}

const buyNewItems =_=> {
    let newCustomer = head;
    let phone = Number(scan('Enter your mobile number: '));

    while (newCustomer !== null) {
        if (newCustomer.phone === phone) {
            getItems(newCustomer);
            return;
        }
        newCustomer = newCustomer.next;
    }
    let customerName = String(scan('Enter the customer name: '));
    newCustomer = new Customers(customerName, phone);
    getItems(newCustomer);
    (head === null)? (head = tail = newCustomer) : (tail = tail.next = newCustomer);
}

(mainFunction =_=> {

    while (true) {
        console.log('\n1. Buy New Items     2. View My Store        3. View All Customers       4. View One Customers Details       5. Exit\n');
        let choice = Number(scan('Enter the choice: '));

        switch(choice) {
            case 1: 
                buyNewItems();
                break;
            case 2: 
                viewStore();
                break;
            case 3:
                viewAllCustomers();
                break;
            case 4:
                viewOneCustomerDetails();
                break;
            case 5:
                console.log('Thanks for visiting...');
                return;
        }
    }
})();