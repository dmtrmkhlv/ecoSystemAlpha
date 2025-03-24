import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { updateProduct } from "../features/products/productsSlice";
import "./../styles/Modal.css";
import ProductForm from "./ProductForm";
import { Product } from "../types/Product";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (values: Omit<typeof product, "id" | "liked">) => {
    dispatch(
      updateProduct({
        ...product,
        ...values,
      })
    );
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Редактировать</h2>
        <ProductForm
          initialValues={{
            title: product.title,
            description: product.description,
            image: product.image,
          }}
          onSubmit={handleSubmit}
          onClick={onClose}
          buttonText="Сохранить"
          buttonCancelText="Отмена"
        />
      </div>
    </div>
  );
};

export default EditProductModal;
