import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../ProductList/ProductList";
import Filters from "../Filters/Filters";

const ProductsPage = () => {
    const [products, setProducts] = useState();
    const [finalProductList,setFinalProductList]=useState();
    const [filters, setFilters] = useState();
    const [selectedFilters, setSelectedFilters] = useState({Brand:"selectAll",Categories:"selectAll",Gender:"selectAll"});

    const onFilterSelect=(childSelectedFilters)=>{
        setSelectedFilters({...selectedFilters,...childSelectedFilters});
    }

    const getData = () => {
        axios.get(`https://demo7303877.mockable.io/`)
            .then((responseData) => {
                setProducts(responseData.data.products);
                setFilters(responseData.data.filters.primaryFilters);
                setFinalProductList(responseData.data.products)
            });
    };

    const getFilteredProducts=()=>{
        let brands= selectedFilters.Brand==="selectAll"?"":selectedFilters.Brand.split(',');
        let gender= selectedFilters.Gender==="selectAll"?"":selectedFilters.Gender.split(',');
        let categories= selectedFilters.Categories==="selectAll"?"":selectedFilters.Categories.split(',');

        let filterProductList=products.filter((product)=>{
            let isBrandMatch=!brands || brands.indexOf(product.brand)>-1;
            let isGenderMatch=!gender || gender.indexOf(product.gender)>-1;
            let isCategoryMatch=!categories || categories.indexOf(product.category)>-1;
            return (isGenderMatch && isCategoryMatch && isBrandMatch );
        })
        setFinalProductList(filterProductList);
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if(products)
      getFilteredProducts();
    }, [selectedFilters]);


    return (
        <>
            {products && <ProductList productsList={finalProductList}/> }
            {filters && <Filters filters={filters} onFilterSelect={onFilterSelect} />}
        </>
    )
}

export default ProductsPage;