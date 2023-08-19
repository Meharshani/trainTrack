import React from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { Button1,Button2 } from "../../Components/Buttons/Buttons";
import Text from "../../Components/TextComp/Text";

import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { blueColor } from "../../Utils/ThemeColors";
import { navigationRef } from "../../Utils/OpenDrawer";
import { useNavigation } from "@react-navigation/native";

export default function Trial(props) {
  const navigation = useNavigation();

  return (
    <ScrollView style={Styles.containerStyle}>
      <SafeAreaView>
        <View
          style={{
            paddingVertical: hp(5),
            height: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ padding: 20, marginTop: wp(4) }}>
            <Text
              text="Get 30 days Free Trial and then choose a membership of your choice."
              textStyle={{
                fontSize: wp(4.5),
                marginBottom: wp(4),
                fontFamily: "OpenSans",
              }}
            />
          </View>
          <Button1
            onPress={() => {}}
            buttonText="INDIVIDUAL: $2.99/month, $19.99/year, $75 lifetime "
            isIcon={false}
            isText={true}
            buttonIcon={null}
            tintColor={blueColor}
            buttonTextStyle={{
              fontSize: wp(3),
              color: blueColor,
              fontFamily: "OpenSans-Semibold",
            }}
            buttonContainer={{
              width: wp(70),
              height: wp(14),
              borderRadius: wp(7),
              marginBottom: wp(3),
            }}
            buttonInnerContainer={{
              width: wp(66),
              height: wp(10),
              borderRadius: wp(5),
            }}
          />

          <Button1
            onPress={() => {}}
            buttonText="PRO: $5.99/month or $29.99/year, Upto 5 Profiles "
            isIcon={false}
            isText={true}
            buttonIcon={null}
            tintColor={blueColor}
            buttonTextStyle={{
              fontSize: wp(3),
              color: blueColor,
              fontFamily: "OpenSans-Semibold",
            }}
            buttonContainer={{
              width: wp(70),
              height: wp(14),
              borderRadius: wp(7),
              marginBottom: wp(3),
            }}
            buttonInnerContainer={{
              width: wp(66),
              height: wp(10),
              borderRadius: wp(5),
            }}
          />

          <Button1
            onPress={() => {}}
            buttonText="PRO PLUS: $7.99/month or $49.99/year, up to 10 Profiles"
            isIcon={false}
            isText={true}
            buttonIcon={null}
            tintColor={blueColor}
            buttonTextStyle={{
              fontSize: wp(3),
              color: blueColor,
              fontFamily: "OpenSans-Semibold",
            }}
            buttonContainer={{
              width: wp(70),
              height: wp(14),
              borderRadius: wp(7),
              marginBottom: wp(3),
            }}
            buttonInnerContainer={{
              width: wp(66),
              height: wp(10),

              borderRadius: wp(5),
            }}
          />
          <Image
            source={require("../../Assets/Images/freetrial2.png")}
            style={{ width: wp(100), height: wp(80), marginTop: wp(3) }}
            resizeMode="contain"
          />

          <Button2
            onPress={() => navigation.navigate("Memberships")}
            isText={true}
            isLoading={false}
            buttonText="Continue"
            isIcon={false}
            buttonIcon={null}
            buttonContainer={{ marginTop: hp(5) }}
            buttonTextStyle={{
              fontSize: wp(4),
              fontFamily: "OpenSans-Semibold",
              color: "white",
            }}
            buttonInnerContainer={{
              width: wp(60),
              height: hp(6),
              borderRadius: hp(3),
              backgroundColor: blueColor,
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
