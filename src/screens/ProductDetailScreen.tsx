import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { ds, fs } from "@utils";
import { colors } from "@constants";
import { useCartStore } from "@store";
import { ProductCarousel } from "@components";
import { useCustomNavigation } from "src/hooks";

export const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const { goBack } = useCustomNavigation("ProductDetail");

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = useCartStore((state) => state.isInCart(product.id));

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleRemovefromCart = (id: number) => {
    removeFromCart(id);
    goBack();
  };

  return (
    <View>
      <ProductCarousel images={product.images} />
      <View style={styles.container}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.desc}>{product.description}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <Button
          title={isInCart ? "Remove from Cart" : "Add to Cart"}
          onPress={() => {
            isInCart
              ? handleRemovefromCart(product?.id)
              : handleAddToCart(product);
          }}
          color={isInCart ? "#ff3b30" : colors.Primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ds(16),
  },
  title: {
    fontSize: fs(20),
    fontWeight: "bold",
  },
  desc: {
    marginVertical: ds(10),
  },
  price: {
    color: "green",
    fontSize: fs(18),
    marginBottom: ds(16),
  },
});
