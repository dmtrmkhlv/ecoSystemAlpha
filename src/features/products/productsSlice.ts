import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  liked: boolean;
}
interface ProductsState {
  items: Product[];
  filter: "all" | "favorites";
}
const initialState: ProductsState = {
  items: [],
  filter: "all",
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    toggleLike(state, action: PayloadAction<string>) {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) product.liked = !product.liked; // Инвертируем лайк
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<"all" | "favorites">) {
      state.filter = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});
export const {
  setProducts,
  toggleLike,
  deleteProduct,
  setFilter,
  addProduct,
  updateProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
