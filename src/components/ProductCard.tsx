import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { ds, fs } from "@utils";
import { colors } from "@constants";

export const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 3,
    padding: ds(10),
    shadowOpacity: 0.1,
    shadowRadius: ds(4),
    flexDirection: "row",
    borderRadius: ds(10),
    marginVertical: ds(6),
    backgroundColor: "#fff",
    marginHorizontal: ds(10),
    shadowColor: colors.Shadow,
    shadowOffset: { width: 0, height: ds(2) },
  },
  image: {
    width: ds(100),
    height: ds(100),
    borderRadius: ds(8),
    marginRight: ds(12),
    backgroundColor: "#f0f0f0",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: fs(16),
    fontWeight: "600",
    marginBottom: ds(4),
  },
  price: {
    fontSize: fs(15),
    fontWeight: "bold",
    color: colors.Primary,
  },
});
