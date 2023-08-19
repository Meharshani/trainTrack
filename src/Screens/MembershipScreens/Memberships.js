import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { Button1,Button2 } from "../../Components/Buttons/Buttons";
import Text from "../../Components/TextComp/Text";
import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { blueColor, grayColor } from "../../Utils/ThemeColors";
import { NeomorphFlexView } from "../../Components/NeomorphView/NeomorphView";
import ImageComp from "../../Components/ImageComp/Image";
import { upIcon, downIcon, bullet } from "../../Utils/ImagesPath";
import axios from "axios";
import { BASEURL } from "../../env";
import {
  useNavigation,
  useRoute,
  CommonActions,
} from "@react-navigation/native";
// import IAP from "react-native-iap";
import { logger } from "react-native-logs";

const items = Platform.select({
  ios: [],
  android: ["rniapt_699_1m"],
});

let log = logger.createLogger();

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export default function Memberships() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState();
  const navigation = useNavigation();
  const { params } = useRoute();
  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useState(false);

  //get memberships handler
  const getMemberships = () => {
    axios
      .get(
        `${BASEURL}/membership/enabledMemberships`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log("LOADING ", res.data.doc);
        if (res.data.doc) {
          setData(res.data.doc);
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  //select membership
  const selectMembershipHandler = () => {
    if (selectedMembership === undefined) {
      ToastAndroid.show("Select Membership", ToastAndroid.SHORT);
      return;
    }

    let payload = {
      id: params?.user?.user?._id,
      membership: selectedMembership?._id,
      membershipPeriod: selectedMembership.membershipPeriod,
    };

    setIsLoading(true);
    axios
      .put(`${BASEURL}/user/selectMembership`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data.doc) {
          ToastAndroid.show(
            "Success, you membership has been saved successfully!",
            ToastAndroid.SHORT
          );
          navigation.dispatch(
            CommonActions.reset({ routes: [{ name: "Signin" }] })
          );
        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show(res.data?.err, ToastAndroid.SHORT);
          } else {
            Alert.alert("Error", res.data?.err, [{ text: "Okay" }]);
          }
        }
      })
      .catch((e) => {
        setIsLoading(false);
        // console.log(e);
      });
  };

  useEffect(() => {
    getMemberships();
  }, []);

  // //init iap
  useEffect(() => {
    // IAP.initConnection()
    //   .catch(() => {
    //     console.log("ERROR: connecting to Playstore");
    //   })
    //   .then(() => {
    //     IAP.getSubscriptions(items)
    //       .catch(() => {
    //         console.log("ERROR: Finding items ");
    //       })
    //       .then((res) => {
    //         // console.log("RESPONSE ", res);
    //       });
    //   });

    // purchaseUpdateSubscription = IAP.purchaseUpdatedListener((purchase) => {
    //   log.info("PURCHASE", purchase);
    //   setPurchased(true);
    // });

    // purchaseErrorSubscription = IAP.purchaseErrorListener((error) => {
    //   if (!(error["responseCode"] === "2")) {
    //     Alert.alert(
    //       "Error",
    //       `There has been error with your purchase, error code ${error["code"]}`
    //     );
    //   }
    // });

    // return () => {
    //   try {
    //     purchaseUpdateSubscription.remove();
    //   } catch (error) {}

    //   try {
    //     purchaseErrorSubscription.remove();
    //   } catch (error) {}

    //   try {
    //     IAP.endConnection();
    //   } catch (error) {}
    // };
  }, []);

  return (
    <ScrollView
      style={Styles.containerStyle}
      showsVerticalScrollIndicator={false}
    >
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
              text="Choose membership that fits your need."
              textStyle={{
                fontSize: wp(4.5),
                marginBottom: wp(4),
                fontFamily: "OpenSans",
              }}
            />
          </View>

          <NeomorphFlexView
            viewStyle={{
              width: "100%",
              borderRadius: wp(4),
              paddingTop: hp(1.5),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: wp(80),
              }}
            >
              <Text
                text="INDIVIDUAL"
                textStyle={{
                  fontSize: wp(4.5),
                  marginBottom: wp(4),
                  fontFamily: "OpenSans",
                }}
              />
              {collapse1 ? (
                <TouchableOpacity onPress={() => setCollapse1(false)}>
                  <ImageComp
                    source={upIcon}
                    tintColor={blueColor}
                    imageStyle={{ width: wp(5.5), height: wp(5.5) }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setCollapse1(true)}>
                  <ImageComp
                    source={downIcon}
                    tintColor={blueColor}
                    imageStyle={{ width: wp(5.5), height: wp(5.5) }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </NeomorphFlexView>

          {collapse1 ? (
            <NeomorphFlexView
              viewStyle={{
                width: "100%",
                borderRadius: wp(4),
                marginTop: hp(1),
                padding: hp(2),
                paddingBottom: hp(3),
              }}
            >
              <Text
                text="PLAN DETAILS"
                textStyle={{
                  fontSize: wp(4.5),
                  marginBottom: wp(4),
                  fontFamily: "OpenSans",
                }}
              />
              {data
                .filter((item) => item.membershipType === 0)
                .map((items, index) => (
                  <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                    key={index}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "70%",
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      }}
                    >
                      <ImageComp
                        source={bullet}
                        tintColor={blueColor}
                        imageStyle={{
                          width: wp(4),
                          height: wp(4),
                          marginRight: wp(3),
                        }}
                      />
                      <Text
                        text={`$${items.price} (${items.title})`}
                        textStyle={{
                          fontSize: wp(4.5),
                          fontFamily: "OpenSans",
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{ width: "25%" }}
                      onPress={() => setSelectedMembership(items)}
                    >
                      <Text
                        text={
                          items._id === selectedMembership?._id
                            ? "Selected"
                            : "Select"
                        }
                        textStyle={{
                          fontSize: wp(4.5),
                          fontFamily: "OpenSans",
                          color:
                            items._id === selectedMembership?._id
                              ? blueColor
                              : grayColor,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </NeomorphFlexView>
          ) : (
            <View />
          )}

          <NeomorphFlexView
            viewStyle={{
              width: "100%",
              borderRadius: wp(4),
              marginTop: hp(1),
              paddingTop: hp(1.5),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: wp(80),
              }}
            >
              <Text
                text="PRO"
                textStyle={{
                  fontSize: wp(4.5),
                  marginBottom: wp(4),
                  fontFamily: "OpenSans",
                }}
              />
              {collapse2 ? (
                <TouchableOpacity onPress={() => setCollapse2(false)}>
                  <ImageComp
                    source={upIcon}
                    tintColor={blueColor}
                    imageStyle={{ width: wp(5.5), height: wp(5.5) }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setCollapse2(true)}>
                  <ImageComp
                    source={downIcon}
                    tintColor={blueColor}
                    imageStyle={{ width: wp(5.5), height: wp(5.5) }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </NeomorphFlexView>

          {collapse2 ? (
            <NeomorphFlexView
              viewStyle={{
                width: "100%",
                borderRadius: wp(4),
                marginTop: hp(1),
                padding: hp(2),
                paddingBottom: hp(3),
              }}
            >
              <Text
                text="PLAN DETAILS"
                textStyle={{
                  fontSize: wp(4.5),
                  marginBottom: wp(4),
                  fontFamily: "OpenSans",
                }}
              />
              {data
                .filter((item) => item.membershipType === 1)
                .map((items, index) => (
                  <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                    key={index}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "70%",
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      }}
                    >
                      <ImageComp
                        source={bullet}
                        tintColor={blueColor}
                        imageStyle={{
                          width: wp(4),
                          height: wp(4),
                          marginRight: wp(3),
                        }}
                      />
                      <Text
                        text={`$${items.price} (${items.title})`}
                        textStyle={{
                          fontSize: wp(4.5),
                          fontFamily: "OpenSans",
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{ width: "25%" }}
                      onPress={() => setSelectedMembership(items)}
                    >
                      <Text
                        text={
                          items._id === selectedMembership?._id
                            ? "Selected"
                            : "Select"
                        }
                        textStyle={{
                          fontSize: wp(4.5),
                          fontFamily: "OpenSans",
                          color:
                            items._id === selectedMembership?._id
                              ? blueColor
                              : grayColor,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </NeomorphFlexView>
          ) : (
            <View />
          )}

          <NeomorphFlexView
            viewStyle={{
              width: "100%",
              borderRadius: wp(4),
              marginTop: hp(1),
              paddingTop: hp(1.5),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: wp(80),
              }}
            >
              <Text
                text="PRO PLUS"
                textStyle={{
                  fontSize: wp(4.5),
                  marginBottom: wp(4),
                  fontFamily: "OpenSans",
                }}
              />
              {collapse3 ? (
                <TouchableOpacity onPress={() => setCollapse3(false)}>
                  <ImageComp
                    source={upIcon}
                    tintColor={blueColor}
                    imageStyle={{ width: wp(5.5), height: wp(5.5) }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setCollapse3(true)}>
                  <ImageComp
                    source={downIcon}
                    tintColor={blueColor}
                    imageStyle={{ width: wp(5.5), height: wp(5.5) }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </NeomorphFlexView>

          {collapse3 ? (
            <NeomorphFlexView
              viewStyle={{
                width: "100%",
                borderRadius: wp(4),
                marginTop: hp(1),
                padding: hp(2),
                paddingBottom: hp(3),
              }}
            >
              <Text
                text="PLAN DETAILS"
                textStyle={{
                  fontSize: wp(4.5),
                  marginBottom: wp(4),
                  fontFamily: "OpenSans",
                }}
              />
              {data
                .filter((item) => item.membershipType === 2)
                .map((items, index) => (
                  <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                    key={index}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: "68%",
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                      }}
                    >
                      <ImageComp
                        source={bullet}
                        tintColor={blueColor}
                        imageStyle={{
                          width: wp(4),
                          height: wp(4),
                          marginRight: wp(3),
                        }}
                      />
                      <Text
                        text={`$${items.price} (${items.title})`}
                        textStyle={{
                          fontSize: wp(4.5),
                          fontFamily: "OpenSans",
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{ width: "25%" }}
                      onPress={() => setSelectedMembership(items)}
                    >
                      <Text
                        text={
                          items._id === selectedMembership?._id
                            ? "Selected"
                            : "Select"
                        }
                        textStyle={{
                          fontSize: wp(4.5),
                          fontFamily: "OpenSans",
                          color:
                            items._id === selectedMembership?._id
                              ? blueColor
                              : grayColor,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
            </NeomorphFlexView>
          ) : (
            <View />
          )}

          {params?.membership && params?.membership ? (
            <TouchableOpacity
              style={{ marginTop: wp(5) }}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({ routes: [{ name: "Signin" }] })
                );
              }}
            >
              <Text
                text={"Skip"}
                textStyle={{
                  color: blueColor,
                  fontSize: wp(4.5),
                  fontFamily: "OpenSans",
                  textDecorationLine: "underline",
                }}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <Button2
            onPress={selectMembershipHandler}
            isText={true}
            isLoading={isLoading}
            buttonText="Purchase"
            isIcon={false}
            buttonIcon={null}
            buttonContainer={{ marginTop: hp(3) }}
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
