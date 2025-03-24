import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
interface FiltersProps {
  onFilterChange: (filter: "all" | "favorites") => void;
}
const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Button onClick={() => onFilterChange("all")} text="Все продукты" />
      <Button onClick={() => onFilterChange("favorites")} text="Избранное" />
      <Link to="/create-product">
        <Button text="Создать новый продукт" />
      </Link>
    </div>
  );
};
export default Filters;
