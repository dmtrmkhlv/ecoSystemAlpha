import { useMemo } from "react";
import { Product } from "../types/Product"; // Предполагается, что у вас есть тип Product

interface UseProductFilteringProps {
  items: Product[];
  filter: "all" | "favorites";
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

interface FilteringResult {
  filteredItems: Product[];
  currentItems: Product[];
  totalPages: number;
}

export const useProductFiltering = ({
  items,
  filter,
  searchTerm,
  currentPage,
  itemsPerPage,
}: UseProductFilteringProps): FilteringResult => {
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => (filter === "favorites" ? item.liked : true))
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [items, filter, searchTerm]);

  const { currentItems, totalPages } = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return {
      currentItems: filteredItems.slice(indexOfFirstItem, indexOfLastItem),
      totalPages: Math.ceil(filteredItems.length / itemsPerPage),
    };
  }, [filteredItems, currentPage, itemsPerPage]);

  return { filteredItems, currentItems, totalPages };
};
