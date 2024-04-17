import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { serverURL } from "src/app/Config";

const CheckoutForm = (props, socket) => {
  const [avgValue, setAverageRate] = useState(0);

  useEffect(() => {
    props.socket.emit("getGoldRate", {
      data: {},
      name: "goldRate",
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });

    props.socket.on("getGoldResponse", (result) => {
      setAverageRate(result.rate);
    });

    // props.socket.on("goldResponses", (result) => {
    //   setAverageRate(result.rate);
    // });
  }, [props.socket]);

  const openPayModal = () => {
    const amount = parseFloat(props.amount) * 100;
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const options = {
      key: "rzp_test_YasbNKa3yfpbBB",
      amount: 0,
      name: "DIG",
      description: "some description",
      image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
      handler: (response) => {
        let values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          transactionid: response.razorpay_payment_id,
          transactionamount: parseFloat(props.amount),
          quantity: props.quantity,
          userId: userInfo && userInfo[0] && userInfo[0].id,
          price_per_quantity: parseFloat(avgValue),
        };
        console.log(avgValue);
        axios
          .post(`${serverURL}/payment/payment`, values)
          .then((res) => {
            props.handleTabChange(); // Go to Tab change
          })
          .catch((e) => {
            alert("Payment failed. Please try after some time");
          });
      },
      // prefill: {
      //   name: "Gaurav",
      //   contact: "9999999999",
      //   email: "demo@demo.com",
      // },
      // notes: {
      //   address: "some address",
      // },
      theme: {
        color: "blue",
        hide_topbar: false,
      },
    };

    axios
      .post(`${serverURL}/payment/order`, { amount: amount })
      .then((res) => {
        options.order_id = res.data.id;
        options.amount = res.data.amount;
        let rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Button
      className={`btn-common`}
      style={{ marginLeft: "10px" }}
      variant="dark"
      onClick={(e) => {
        openPayModal();
      }}
    >
      Confirm
    </Button>
  );
};

export default CheckoutForm;
