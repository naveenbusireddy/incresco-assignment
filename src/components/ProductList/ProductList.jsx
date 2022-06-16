import React from "react";
import Product from "../Product/Product";


const ProductsList = (props) => {
   

    return (
        <>
            { props.productsList && props.productsList.map((product) => (
                <Product 
                key={product.landingPageUrl}
                productData={product}/>
                ))
            }        
        </>
    )
}

export default ProductsList;