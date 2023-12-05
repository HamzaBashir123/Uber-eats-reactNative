
import { Text, TouchableOpacity, View } from "react-native";

const HeaderTabs = (props) => {
  
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButton
        text="Delivery"
        btnColor="black"
        textColor="#eee"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="PickUp"
        btnColor="#eee"
        textColor="black"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
};
const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? 'black' : '#eee'  ,
      
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => props.setActiveTab(props.text)}
    
  >
    <Text
      style={{
        fontSize: 10,
        color: props.activeTab === props.text ? '#eee' : 'black',
        fontSize: 12,
        fontWeight: "900",
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
);

export default HeaderTabs;


// 2:10