import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setProducts,
  toggleLike,
  deleteProduct,
  setFilter,
} from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import "./../styles/ProductsPage.css";
import { fetchProducts } from "../api/api";
import { useProductFiltering } from "../hooks/useProductFiltering";

const ITEMS_PER_PAGE = 8;

interface ProductsPageProps {}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, filter } = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { filteredItems, currentItems } = useProductFiltering({
    items,
    filter,
    searchTerm,
    currentPage,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (items.length === 0) {
      fetchProducts()
        .then((products) => {
          dispatch(setProducts(products));
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1);
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleFilterChange = useCallback(
    (newFilter: "all" | "favorites") => {
      dispatch(setFilter(newFilter));
      setCurrentPage(1);
    },
    [dispatch]
  );

  const handleToggleLike = useCallback(
    (productId: string) => {
      dispatch(toggleLike(productId));
      if (filter === "favorites") {
        setCurrentPage(1);
      }
    },
    [dispatch, filter]
  );

  const handleDelete = useCallback(
    (productId: string) => {
      dispatch(deleteProduct(productId));
    },
    [dispatch]
  );

  return (
    <div className="products-page">
      <Filters onFilterChange={handleFilterChange} />
      <div className="search-container">
        <input
          type="text"
          placeholder="Найти..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="products-grid">
        {currentItems.length > 0 &&
          currentItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onLike={() => handleToggleLike(product.id)}
              onDelete={() => handleDelete(product.id)}
            />
          ))}
        {currentItems.length === 0 && <div>Ничего не найдено</div>}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredItems.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPage;
