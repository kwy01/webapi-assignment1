// This node module simulates the management of customer orders for Carousell,
// including functions for the retrieval, updating and deletion of orders,
// as well as payment calculation.

// Simulating database content
const orders = [
    {
        order_id: "A001U0011747452819785",
        product_id: "A001",
        quantity: 2,
        buyer_id: "U001",
        shipping_address: "199 Ang Mo Kio Ave 9, Singapore 569999",
        order_timestamp: 1747452819786
    },
    {
        order_id: "A002U0011747452899173",
        product_id: "A002",
        quantity: 1,
        buyer_id: "U002",
        shipping_address: "199 Ang Mo Kio Ave 9, Singapore 569999",
        order_timestamp: 1747452899173
    }
];

const products = [
    {
        product_id: "A001",
        title: "Phone",
        unit_price: 1000,
        weight: 0.16
    },
    {
        product_id: "A002",
        title: "Monitor",
        unit_price: 800,
        weight: 3.2
    },
    {
        product_id: "A003",
        title: "TV",
        unit_price: 1200,
        weight: 24
    }
]

const base_delivery_rates =
{
    "0": 3.6,
    "3": 4.4,
    "5": 5.50,
    "10": 10.6,
    "20": 12.6
}

module.exports = {
    /**
     * Creates a new order and adds it to the orders array.
     * @param {string} product_id - ID of the product to order.
     * @param {number} quantity - Quantity of the product to order.
     * @param {string} buyer_id - ID of the buyer placing the order.
     * @param {string} shipping_address - Shipping address for the order.
     */
    createOrder(
        product_id,
        quantity,
        buyer_id,
        shipping_address
    ) {
        orders.push({
            order_id: `${product_id}${buyer_id}${Date.now()}`,
            product_id: product_id,
            quantity: quantity,
            buyer_id: buyer_id,
            shipping_address: shipping_address,
            order_timestamp: Date.now()
        });
    },

    /**
     * Retrieves an order by its ID.
     * @param {string} order_id - ID of the order to retrieve.
     * @returns {Object|string} - The matching order or an error message.
     */
    getOrderById(order_id) {
        let order = orders.find(order => order.order_id == order_id);
        if (order) {
            return order;
        } else {
            return { error: "Error retrieving order", message: "Order ID not found" };
        }
    },

    /**
     * Retrieves a list of orders, where optional filters can be set.
     * @param {Object} filters - Key-value pairs to filter orders by (e.g. { buyer_id: "U001" })
     * @returns {Array} - An array of orders matching filter options if included, otherwise an array of all orders
     */
    getOrders(filters = {}) {
        if (Object.keys(filters).length > 0) {
            return orders.filter(order =>
                Object.keys(filters).every(key => order[key] == filters[key])
            );
        } else {
            return orders;
        }
    },

    /**
     * Updates the specified fields of an order by its ID.
     * @param {string} order_id - ID of the order to update.
     * @param {Object} data - Key-value pairs to update the order by.
     */
    updateOrderById(order_id, data) {
        const index = orders.findIndex(order => order.order_id == order_id);
        if (index > -1) {
            Object.keys(data).forEach(key => {
                orders[index][key] = data[key];
            });
        } else {
            console.log("Error updating order: Order ID not found");
        }
    },

    /**
     * Deletes an order by its ID.
     * @param {string} order_id - ID of the order to delete.
     */
    deleteOrderById(order_id) {
        const index = orders.findIndex(order => order.order_id == order_id);
        if (index > -1) {
            orders.splice(index, 1);
        } else {
            console.log("Error deleting order: Order ID not found");
        }
    },

    /**
     * Retrieves a product by its ID.
     * @param {string} product_id - ID of the product to retrieve.
     * @returns {Object|string} - The matching product or an error message.
     */
    getProductById(product_id) {
        let product = products.find(product => product.product_id == product_id);
        if (product) {
            return product;
        } else {
            return { error: "Error retrieving product", message: "Product ID not found" };
        }
    },

    /**
     * Calculates the total payment for the specified order including delivery fees.
     * @param {string} order_id - ID of the order.
     * @returns {Object|string} - Breakdown of payment fees or an error message.
     */
    calculatePayment(order_id) {
        let order = orders.find(order => order.order_id == order_id);
        if (order) {
            product = this.getProductById(order.product_id);
            base_delivery_fee = 0;
            Object.keys(base_delivery_rates).forEach(key => {
                if (product.weight * order.quantity > parseInt(key)) {
                    base_delivery_fee = base_delivery_rates[key];
                }
            });
            subtotal = order.quantity * product.unit_price;
            return {
                base_delivery_fee: base_delivery_fee,
                subtotal: subtotal,
                total: base_delivery_fee + subtotal
            };
        } else {
            return { error: "Error calculating payment", message: "Order ID not found" };
        }
    }
}