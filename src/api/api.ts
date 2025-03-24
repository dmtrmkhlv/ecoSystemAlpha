export const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.map((item: any) => ({
    id: String(item.id),
    title: item.title,
    description: item.description,
    image: item.image,
    liked: false,
  }));
};
