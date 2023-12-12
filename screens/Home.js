import React from "react";
import { ScrollView, View } from "react-native";
import HeaderTabs from "../components/home/HeaderTabs.js";
import SearchBar from "../components/home/SearchBar.js";
import Categories from "../components/home/Categories.js";
// import RestaurantItems from "../components/RestaurantItems";
import { useEffect, useState } from "react";
import { Divider } from 'react-native-elements'
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems.js";
import BottomTabs from "../components/home/BottomTabs.js";


const Home = (navigation) => {

  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("Tulsa");
  const [activeTab, setActiveTab] = useState("Delivery");
  

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    console.log(city);
    fetch(`https://hungry-leather-jacket-bee.cyclic.app/api/yelp?term=restaurants&location=${city}`, options)


      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      )
      .catch(err => console.log(err));
  }, [city, activeTab])
  return (
    <View style={{ backgroundColor: '#eee', flex: 1 }}>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 30,
          padding: 15,
        }}
      >
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}  />
        <SearchBar  cityHandler={setCity}/>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
      </ScrollView>
      <Divider width={1} />
      <BottomTabs/>
    </View>
  );
};

export default Home;
