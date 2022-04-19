import React from "react";
import Product from "../Product/Product";


const ProductsList = (props) => {
  
    return (
        <>
        <div>
            { props.productsList.map((product) => (
                <Product 
                key={product.landingPageUrl}
                productData={product}/>
                ))
            }
        </div>
        
        </>
    )
}

export default ProductsList;