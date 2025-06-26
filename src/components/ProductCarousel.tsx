import { Image, FlatList, Dimensions } from "react-native";

export const ProductCarousel = ({ images }) => {
  const { width } = Dimensions.get("window");
  return (
    <FlatList
      horizontal
      pagingEnabled
      data={images}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={{ width, height: 220 }} />
      )}
    />
  );
};
