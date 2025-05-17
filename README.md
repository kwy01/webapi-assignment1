# Assignment 1

This is a node module to simulate the management of customer orders for [Carousell](https://www.carousell.sg/), a Singaporean e-commerce platform for users to buy and sell used goods. It includes functions for the retrieval, updating and deletion of orders, as well as payment calculation.

# Usage
### 1. If not already installed, [install Node JS](https://nodejs.org/en/)
### 2.  Create an 'app.js' file in the same directory as the node module and input the following code
```javascript
const orders_module = require("./KangWenYu_orders");

// Creating an order
orders_module.createOrder(
    "A003",
    1,
    "U001",
    "180 Ang Mo Kio Ave 8, Singapore 569830"
);

// Retrieving and displaying an order by the order id
console.log(orders_module.getOrderById("A001U0011747452819785"));

// Retrieving and displaying all orders
console.log(orders_module.getOrders({}));

// Retrieving and displaying orders with selected filters
console.log(orders_module.getOrders({buyer_id: "U001"}));

// Updating an order by the order id
orders_module.updateOrderById("A001U0011747452819785", {quantity: 3});
console.log(orders_module.getOrderById("A001U0011747452819785")); // Check that quantity has been updated to 3

// Deleting an order by the order id
orders_module.deleteOrderById("A002U0011747452899173");
console.log(orders_module.getOrders({})); // Check that order has been deleted

// Retrieving and displaying product details by the product id
orders_module.getProductById("A001");

// Calculating and displaying payment fees for an order
console.log(orders_module.calculatePayment("A001U0011747452819785"));
```
### 3. Open a new terminal and start the application by running
```
node app.js
```
# API Reference

`createOrder(product_id, quantity, buyer_id, shipping_address)`

Creates a new order and adds it to the orders array.

`getOrderById(order_id)`

Retrieves an order by its ID.

`getOrders(filters = {})`

Retrieves a list of orders, where optional filters can be set.

`updateOrderById(order_id, data)`

Updates the specified fields of an order by its ID.

`deleteOrderById(order_id)`

Deletes an order by its ID.

`getProductById(product_id)`

Retrieves a product by its ID.

`calculatePayment(order_id)`

Calculates the total payment for the specified order including delivery fees.

# References
Carousell Website: https://www.carousell.sg/