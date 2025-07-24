async function payNow() {
  const res = await fetch("http://localhost:5000/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 500 }), // Replace with cart total
  });

  const order = await res.json();

  const options = {
    key: "rzp_test_*******", // Replace with your Razorpay key ID
    amount: order.amount,
    currency: "INR",
    name: "Your Store Name",
    description: "Order Payment",
    order_id: order.id,
    handler: function (response) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      // You can now send confirmation to backend if needed
      window.location.href = "/order-success.html";
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
