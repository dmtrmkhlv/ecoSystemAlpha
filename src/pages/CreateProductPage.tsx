import React from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addProduct } from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ProductForm from "../components/ProductForm";

const CreateProductPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    image: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    const newProduct = {
      id: nanoid(),
      ...values,
      liked: false,
    };
    dispatch(addProduct(newProduct));
    navigate("/products");
  };

  return (
    <div>
      <Button onClick={() => navigate("/products")} text="Главное меню" />
      <h1>Создание продукта</h1>
      <ProductForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        buttonText="Создать"
      />
    </div>
  );
};

export default CreateProductPage;
