import React from "react";
import "./App.css";
import Filters from "./components/Filters/Filters";

import ProductsPage from "./components/ProductsPage/ProductsPage";

function App() {

  
  return (
    <>
      <div className="grid-container">

      <div className="search-container">sort</div>

        <div className="sort-container">
          <input type="search" placeholder="Item Search"></input>
        </div>

        

        <div className="filter-container">
          <div>
            
            <Filters />
          </div>
        </div>

        <div className="product-list-container">
          <p>Product List</p>
            
          <ProductsPage />
        </div>
      </div>
    </>
  );
}

export default App;
