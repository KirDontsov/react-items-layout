import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// const products = [
//   {
//     name: "Nike Metcon 2",
//     price: "130",
//     color: "red",
//     img: "https://netology-code.github.io/ra-homeworks/state/layouts/i/1.jpg"
//   },
//   {
//     name: "Nike Metcon 2",
//     price: "130",
//     color: "green",
//     img: "https://netology-code.github.io/ra-homeworks/state/layouts/i/2.jpg"
//   },
//   {
//     name: "Nike Metcon 2",
//     price: "130",
//     color: "blue",
//     img: "https://netology-code.github.io/ra-homeworks/state/layouts/i/3.jpg"
//   },
//   {
//     name: "Nike Metcon 2",
//     price: "130",
//     color: "black",
//     img: "https://netology-code.github.io/ra-homeworks/state/layouts/i/4.jpg"
//   },
//   {
//     name: "Nike free run",
//     price: "170",
//     color: "black",
//     img: "https://netology-code.github.io/ra-homeworks/state/layouts/i/7.jpg"
//   },
//   {
//     name: "Nike Metcon 3",
//     price: "150",
//     color: "green",
//     img: "https://netology-code.github.io/ra-homeworks/state/layouts/i/5.jpg"
//   }
// ];

const cardsLayout = {
  xs: 12,
  sm: 8,
  md: 6,
  lg: 4
};

// ReactDOM.render(
//   <App layout={cardsLayout} products={products} />,
//   document.getElementById("root")
// );

const products = fetch("https://jsonplaceholder.typicode.com/photos", {
  method: "GET"
});

products
  .then(response => response.json())
  .then(products =>
    ReactDOM.render(
      <App layout={cardsLayout} />,
      document.getElementById("root")
    )
  );
