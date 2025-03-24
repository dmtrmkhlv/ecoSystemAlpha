import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "./../styles/ProductDetailsPage.css";
import EditProductModal from "../components/EditProductModal";
import Button from "../components/Button";
const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => String(item.id) === id)
  );
  const [isShowModal, setIsShowModal] = useState(false);
  if (!product) {
    return <div>Продукт не найден</div>;
  }
  return (
    <div className="product-details-page">
      <Button onClick={() => navigate("/products")} text="Главное меню" />
      <Button onClick={() => setIsShowModal(true)} text="Редактировать" />
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      {isShowModal && (
        <EditProductModal
          product={product}
          onClose={() => setIsShowModal(false)}
        />
      )}
    </div>
  );
};
export default ProductDetailsPage;
