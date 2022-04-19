import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../ProductList/ProductList";

const ProductsPage = () => {
    const [masterData, setMasterData] = useState('');

    const getData = () => {
        axios.get(`https://demo7303877.mockable.io/`)
            .then((responseData) => {
                setMasterData(responseData.data);
                console.log(responseData);
            });
    };
    useEffect(() => {
        getData();

    }, []);

    return (
        <>
            {masterData && <ProductList productsList={masterData.products} />}
        </>
    )
}

export default ProductsPage;