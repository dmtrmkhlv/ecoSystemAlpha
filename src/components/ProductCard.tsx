import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import "./../styles/ProductCard.css";
interface ProductCardProps {
  product: Product;
  onLike: () => void;
  onDelete: () => void;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onLike,
  onDelete,
}) => {
  const navigate = useNavigate();
  const handleCardClick = (event: React.MouseEvent) => {
    if (
      (event.target as HTMLElement).tagName === "BUTTON" ||
      (event.target as HTMLElement).tagName === "svg"
    ) {
      return;
    }
    navigate(`/products/${product.id}`);
  };
  return (
    <div className="product-card" onClick={handleCardClick}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <button
        className="like-button"
        onClick={(e) => {
          e.stopPropagation();
          onLike();
        }}
      >
        {product.liked ? "❤️" : "🤍"}
      </button>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        🗑️
      </button>
    </div>
  );
};
export default ProductCard;
