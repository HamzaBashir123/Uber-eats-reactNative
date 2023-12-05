import React, { useState } from "react";
import { View, Text,TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";


const SearchBar = ({ cityHandler }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log(searchValue);

    cityHandler(searchValue);
    setSearchValue("");
  };
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#eee",
          borderRadius: 20,
      }}
    >
      <View style={{ marginLeft: 10 }}>
        <Ionicons name="location-sharp" size={24} />
      </View>
      <TextInput
        placeholder="Search"
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
        style={{
          backgroundColor: "#eee",
          borderRadius: 20,
          fontWeight: "700",
          
          marginLeft: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          flex: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          marginRight: 8,
          backgroundColor: "white",
          padding: 9,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <AntDesign name="clockcircle" size={15} style={{ marginRight: 8 }} />
        <Text onPress={handleSearch}>Search</Text>
      </View>
    </View>
  );
};

export default SearchBar;
