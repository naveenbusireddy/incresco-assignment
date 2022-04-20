import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../ProductList/ProductList";
import Filters from "../Filters/Filters";
import Sort from "../Sort/Sort";
import Search from "../Search/Search";

const ProductsPage = () => {

    const [products, setProducts] = useState();
    const [finalProductList, setFinalProductList] = useState();
    const [filters, setFilters] = useState();
    const [selectedFilters, setSelectedFilters] = useState({ Brand: "selectAll", Categories: "selectAll", Gender: "selectAll" });
    const [sortOption, setSortOption] = useState("Newest");

    const onFilterSelect = (childSelectedFilters) => {
        setSelectedFilters({ ...selectedFilters, ...childSelectedFilters });
    }

    const sort = (prop, array, isAsc) => {
        return isAsc ? array.sort((a, b) => a[prop] - b[prop]) : array.sort((a, b) => b[prop] - a[prop]); // b - a for reverse sort
    }
    const onDropSelect = (event) => {
        setSortOption(event.target.value);
    }


    const getSortedProductList = (finalProductListCopy) => {
        finalProductListCopy = JSON.parse(JSON.stringify(finalProductListCopy));
        switch (sortOption) {
            case "Price-Low-High": finalProductListCopy = sort("price", finalProductListCopy, true);
                break;
            case "Price-High-Low": finalProductListCopy = sort("price", finalProductListCopy, false);
                break;
            case "Newest": finalProductListCopy = sort("year", finalProductListCopy, false);
                break;
            case "Oldest": finalProductListCopy = sort("year", finalProductListCopy, true);
                break;
            case "Rating": finalProductListCopy = sort("rating", finalProductListCopy, false);
                break;
            default: finalProductListCopy = sort("year", finalProductListCopy, false);
        }
        setFinalProductList(finalProductListCopy);
    }


    const getData = () => {
        axios.get(`https://demo7303877.mockable.io/`)
            .then((responseData) => {
                setProducts(responseData.data.products);
                setFilters(responseData.data.filters.primaryFilters);
                getSortedProductList(responseData.data.products);
                // setSortOptions(responseData.data.sortOptions);
                // console.log(responseData.data.sortOptions);
            });
    };

    const getFilteredProducts = () => {
        let brands = selectedFilters.Brand === "selectAll" ? "" : selectedFilters.Brand.split(',');
        let gender = selectedFilters.Gender === "selectAll" ? "" : selectedFilters.Gender.split(',');
        let categories = selectedFilters.Categories === "selectAll" ? "" : selectedFilters.Categories.split(',');

        let filterProductList = products.filter((product) => {
            let isBrandMatch = !brands || brands.indexOf(product.brand) > -1;
            let isGenderMatch = !gender || gender.indexOf(product.gender) > -1;
            let isCategoryMatch = !categories || categories.indexOf(product.category) > -1;
            return (isGenderMatch && isCategoryMatch && isBrandMatch);
        })
        getSortedProductList(filterProductList);
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (finalProductList)
            getSortedProductList(finalProductList);
    }, [sortOption])

    useEffect(() => {
        if (products)
            getFilteredProducts();
    }, [selectedFilters]);


    return (
        <>
            <Sort finalProductList={finalProductList} onDropSelect={onDropSelect} />

            {products && <ProductList productsList={finalProductList} />}
            {filters && <Filters filters={filters} onFilterSelect={onFilterSelect} />}
        </>
    )
}

export default ProductsPage;