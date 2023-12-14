import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import OrderItem from "./OrderItem";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // If you are using authentication
import app from "../../firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const addOrderToFireBase = async () => {
    setLoading(true);

    try {
      const db = getFirestore(app);
      const auth = getAuth(app);

      await addDoc(collection(db, "orders"), {
        items: items,
        restaurantName: restaurantName,
        createdAt: serverTimestamp(),
      });
      setModalVisible(false);

      setTimeout(() => {
        setLoading(false);
        navigation.navigate("OrderCompleted");
      }, 2500);
    } catch (error) {
      console.error("Error adding order to Firestore:", error);
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: windowWidth * 0.04,
      height: windowHeight * 0.7,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: windowWidth * 0.06,
      marginBottom: windowHeight * 0.02,
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: windowHeight * 0.03,
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: windowWidth * 0.045,
      marginBottom: windowHeight * 0.02,
    },
    checkoutButton: {
      marginTop: windowHeight * 0.03,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: windowHeight * 0.02,
      borderRadius: windowWidth * 0.1,
      width: 300,
      alignSelf: "center",
      position: "relative",
    },
    checkoutButtonText: {
      color: "white",
      fontSize: windowWidth * 0.05,
    },
    checkoutButtonTotal: {
      color: "white",
      fontSize: windowWidth * 0.04,
      position: "absolute",
      right: 30,
    },
    viewCartButton: {
      position: "fixed",
      bottom: 0,
      zIndex: 999,
      backgroundColor: "black",
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: windowWidth * 0.1,
      width: windowWidth * 0.6,
      alignSelf: "center",
      marginBottom: windowHeight * 0.06,
    },
    viewCartButtonText: {
      color: "white",
      fontSize: windowWidth * 0.05,
      marginRight: windowWidth * 0.04,
    },
    viewCartButtonTotal: {
      color: "white",
      fontSize: windowWidth * 0.05,
    },
    loadingOverlay: {
      backgroundColor: "black",
      position: "absolute",
      opacity: 0.6,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    loadingAnimation: {
      height: windowHeight * 0.2,
    },
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.modalCheckoutContainer}>
              <Text style={styles.restaurantName}>{restaurantName}</Text>
              {items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}
              <View style={styles.subtotalContainer}>
                <Text style={styles.subtotalText}>Subtotal</Text>
                <Text>{totalUSD}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={() => {
                    addOrderToFireBase();
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.checkoutButtonText}>Checkout</Text>
                  <Text style={styles.checkoutButtonTotal}>
                    {total ? totalUSD : ""}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View style={styles.viewCartButton}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: windowHeight * 0.02,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.viewCartButtonText}>View Cart</Text>
            <Text style={styles.viewCartButtonTotal}>{totalUSD}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View style={styles.loadingOverlay}>
          <LottieView
            style={styles.loadingAnimation}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
