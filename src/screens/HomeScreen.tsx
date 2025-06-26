import { useState } from "react";
import {
  Text,
  View,
  Modal,
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { Product } from "@types";
import { colors } from "@constants";
import { useCartStore } from "@store";
import { ProductCard } from "@components";
import { ds, fs } from "src/utils/customSize";
import productsData from "../api/products.json";
import { useCustomNavigation } from "src/hooks";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";

export const HomeScreen = () => {
  const { navigate } = useCustomNavigation("Home");
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productsData);
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [priceRange, setPriceRange] = useState(5000);
  const cartCount = useCartStore((state) => state.cart.length);

  const handleApply = () => {
    const filtered = productsData.filter((p) => {
      const categoryMatch = category ? p.category === category : true;
      const priceMatch = p.price <= priceRange;
      return categoryMatch && priceMatch;
    });
    setFilteredProducts(filtered);
    setShowModal(false);
  };

  const handleClear = () => {
    setCategory("");
    setPriceRange(5000);
    setFilteredProducts(productsData);
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.Background} />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Explore Products</Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TouchableOpacity activeOpacity={1} style={styles.cartIcon}>
            <Icon name="cart-outline" size={26} color={colors.Primary} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.filterBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigate("ProductDetail", { product: item })}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <Modal visible={showModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Products</Text>

            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={category} onValueChange={setCategory}>
                <Picker.Item label="All" value="" />
                <Picker.Item label="Clothing" value="Clothing" />
                <Picker.Item label="Electronics" value="Electronics" />
              </Picker>
            </View>

            <Text style={styles.label}>Max Price: ₹{priceRange}</Text>
            <Slider
              step={100}
              minimumValue={0}
              value={priceRange}
              maximumValue={10000}
              onValueChange={setPriceRange}
              maximumTrackTintColor={colors.Border}
              style={{ width: "100%", height: 40 }}
              minimumTrackTintColor={colors.Primary}
            />

            <View style={styles.buttonRow}>
              <Button title="Apply" onPress={handleApply} />
              <Button title="Clear" onPress={handleClear} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.Background,
  },
  headerContainer: {
    elevation: 3,
    shadowOpacity: 0.1,
    flexDirection: "row",
    shadowRadius: ds(4),
    alignItems: "center",
    paddingVertical: ds(10),
    backgroundColor: "#fff",
    paddingHorizontal: ds(16),
    shadowColor: colors.Shadow,
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: ds(2) },
  },
  header: {
    fontSize: fs(24),
    fontWeight: "bold",
    color: colors.TextPrimary,
  },
  filterBtn: {
    borderRadius: ds(6),
    paddingVertical: ds(6),
    paddingHorizontal: ds(12),
    backgroundColor: colors.Primary,
  },
  filterBtnText: {
    color: "#fff",
    fontSize: fs(14),
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    paddingHorizontal: ds(10),
  },
  listContent: {
    paddingBottom: ds(16),
  },
  modalOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.Overlay,
  },
  modalContent: {
    bottom: 0,
    width: "100%",
    elevation: 10,
    padding: ds(24),
    shadowOpacity: 0.2,
    shadowRadius: ds(8),
    position: "absolute",
    backgroundColor: "#fff",
    shadowColor: colors.Shadow,
    borderTopLeftRadius: ds(20),
    borderTopRightRadius: ds(20),
    shadowOffset: { width: 0, height: -ds(3) },
  },
  label: {
    fontSize: fs(14),
    marginTop: ds(16),
    fontWeight: "600",
    marginBottom: ds(4),
    color: colors.TextPrimary,
  },
  modalTitle: {
    fontSize: fs(18),
    fontWeight: "bold",
    marginBottom: ds(10),
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: ds(6),
    marginVertical: ds(5),
    borderColor: colors.Border,
  },
  buttonRow: {
    marginTop: ds(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartIcon: {
    padding: ds(6),
    marginLeft: ds(10),
  },
  cartBadge: {
    top: ds(-4),
    right: ds(-4),
    borderRadius: ds(10),
    position: "absolute",
    backgroundColor: "red",
    paddingVertical: ds(2),
    paddingHorizontal: ds(6),
  },
  cartBadgeText: {
    color: "white",
    fontSize: fs(12),
    fontWeight: "bold",
  },
});
