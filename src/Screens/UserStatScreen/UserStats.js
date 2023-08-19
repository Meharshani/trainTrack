import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Text from "../../Components/TextComp/Text";
import Avatar from "../../Components/AvatarComp/Avatar";
import { Divider } from "Divider/Divider";
import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { NeomorphFlexView,NeomorphView } from "../../Components/NeomorphView/NeomorphView";
import {
  circleLogo,
  userIcon,
  userImage,
  graphIcon,
  backIcon,
} from "../../Utils/ImagesPath";
import ImageComp from "../../Components/ImageComp/Image";
import DrawerButton from "DrawerButton/DrawerButton";
import { Button1 } from "../../Components/Buttons/Buttons";
import { blueColor, blueColor1, redColor } from "../../Utils/ThemeColors";
import {
  getOrderedWeightHistory,
  getOrderedBodyCompositions,
  getWeightGraphData,
  mockWeightHistory,
  mockBodyComposition

} from "../../realm/index";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { logger } from "react-native-logs";

// const logs = logger.createLogger();
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const subDays = function (days) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};
export default function UserStats({ navigation: { openDrawer, navigate } }) {
  const [orderWeights, setOrderedWeights] = useState([]);
  const [orderedComps, setOrderedComps] = useState([]);
  const navigation = useNavigation();
  const selectedProfile = useSelector((state) => state.profiles.profile);
  const currentDate = new Date().setHours(0, 0, 0, 0);

  //get ordered weights
  const getOrderWeights = async () => {
    // let data = await getWeightGraphData(selectedProfile)
    let weightData = await getOrderedWeightHistory(selectedProfile?._id)
    const allWeights = weightData.slice(0,25)
    // console.log('all weights --->',allWeights)
    if (allWeights.length === 0) {
      let data = generateMockData()
      // console.log('mockdata --->', data[0])
      data.map((weightData) => {
        mockWeightHistory(weightData._id, weightData.body, selectedProfile, weightData.weightDate)
      })
    }
    if (allWeights.length !== 0) {
      const todaysWeight = Array.from(allWeights)?.filter(
        (item) =>
          new Date(item?.weightDate).setHours(0, 0, 0, 0) === currentDate
      );
      const weightWithoutTodays = Array.from(allWeights)?.filter(
        (item) =>
          new Date(item?.weightDate).setHours(0, 0, 0, 0) !== currentDate
      );
      if (todaysWeight !== undefined && todaysWeight !== null) {
        if (todaysWeight.length > 0) {
          const concatinatedArr = Array.from(weightWithoutTodays)
            .concat(todaysWeight[0])
            .reverse();
          // let totalWeights = concatinatedArr.slice(0,25)
          setOrderedWeights(concatinatedArr)
          // console.log('not today ---<',concatinatedArr[0])
        }
        else {
          setOrderedWeights(allWeights);
        }
      }
      else {
        setOrderedWeights(allWeights);
      }
    }
  };
  const generateBodyComponentMockData = () => {
    const fats = []
    let body = Array.from({ length: 25 }, (_, i) => {
      return{
        age:getRandomInt(20,50),
        abdominal:getRandomInt(50,100),
        thigh:getRandomInt(50,100),
        chest:getRandomInt(50,100),
        tricep:getRandomInt(50,100),
        subscapular:getRandomInt(50,100),
        suprailliac:getRandomInt(50,100),
        midaxillary:getRandomInt(50,100),
        createdDate: new Date(subDays(i + 1))
      }
    }).map((dat,index)=>{
      let sumOfSkinFolds =
      +dat.abdominal +
      +dat.thigh +
      +dat.chest +
      +dat.tricep +
      +dat.subscapular +
      +dat.suprailliac +
      +dat.midaxillary;
    let squaredskinFolds = +sumOfSkinFolds * +sumOfSkinFolds;
    let x = sumOfSkinFolds * 0.00043499;
    let y = squaredskinFolds * 0.00000055;
    let z = +dat.age * 0.00028826;
    let bodyDensity = 1.112 - x + y - z;
    let x1 = 495 / bodyDensity;
    let bodyFat = x1 - 450;
      fats.push(bodyFat)
      return {
        body:{
          ...dat,
          bodyFat,
          bodyDensity,
          lastBodyFat:index===0?0:fats[index-1],
        },
        profile:selectedProfile,
        _id:index+1
      }
    })
    // console.log('bodyyyy--->',body[1])
    body.map((dat)=>{
      mockBodyComposition(dat._id,dat.body,dat.profile)
    })
    
  }
  //generate mock data
  const generateMockData = () => {
    let weights = Array.from({ length: 25 }, (_, i) => getRandomInt(150, 200))
    let data = weights.map((weight, index) => {
      return {
        _id: index + 1,
        body: {
          weight,
          lastWeight: weight + 1
        },
        weightDate: new Date(subDays(index + 1))
      }
    })
    return data
  }
  //get ordered body compositions
  const getOrderComps = async () => {
    const allcomps = await getOrderedBodyCompositions(selectedProfile?._id);
    setOrderedComps(allcomps);
    if(allcomps.length===0){
          generateBodyComponentMockData()
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOrderWeights();
      getOrderComps();
    });

    return () => unsubscribe;
  }, [getOrderComps, getOrderWeights]);

  useEffect(() => {
    getOrderWeights();
    getOrderComps();
  }, []);

  return (
    <View style={Styles.containerStyle}>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: hp(2) }}
        >
          <View style={Styles.header.container}>
            <View style={Styles.header.innerContainer}>
              <NeomorphFlexView viewStyle={Styles.header.logoContainer}>
                <ImageComp
                  source={circleLogo}
                  imageStyle={{
                    resizeMode: "contain",
                    width: wp(12),
                    height: wp(12),
                  }}
                />
              </NeomorphFlexView>
              <Text
                text="USER STATS"
                textStyle={{ fontSize: wp(5.5), fontFamily: "OpenSans-Bold" }}
              />
            </View>
            <Button1
              onPress={() => navigate("UserShortCuts")}
              buttonText=""
              isIcon={true}
              isText={false}
              buttonIcon={backIcon}
              tintColor={blueColor}
              buttonContainer={{
                width: wp(14),
                height: wp(14),
                borderRadius: wp(7),
              }}
              buttonInnerContainer={{
                width: wp(10),
                height: wp(10),
                borderRadius: wp(5),
              }}
            />
            {/* <Button1 
                        buttonText="" 
                        isIcon={true} 
                        isText={false}
                        buttonIcon={backIcon} 
                        tintColor={blueColor}
                        buttonContainer={{width:wp(14),height:wp(14),borderRadius: wp(7)}}
                        buttonInnerContainer={{width:wp(10),height:wp(10),borderRadius: wp(5)}}
                    /> */}
          </View>
          <View style={Styles.section1.container}>
            <Avatar
              image={userIcon}
              showIcon={false}
              avatarContainer={Styles.section1.avatarContainer}
              avatarInnerContainer={Styles.section1.avatarInnerContainer}
              isEdit={true}
            />
            <View style={Styles.section1.detailViewContainer}>
              <NeomorphView viewStyle={Styles.section1.view1}>
                <Text
                  text={selectedProfile?.name}
                  textStyle={{ fontFamily: "OpenSans-Semibold" }}
                />
              </NeomorphView>
              <NeomorphView viewStyle={Styles.section1.view2}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    paddingHorizontal: wp(2),
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: wp(1.5),
                      height: "70%",
                      backgroundColor: blueColor1,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      text={
                        orderWeights[0]?.weight
                          ? orderWeights[0]?.weight + " LBS"
                          : "000 LBS"
                      }
                      textStyle={{
                        color: "black",
                        fontSize: wp(3.5),
                        fontFamily: "OpenSans-Bold",
                      }}
                    />
                  </View>
                  <Text
                    text="WEIGHT"
                    textStyle={{
                      fontSize: wp(3.5),
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                  <Divider width={wp(0.5)} height="60%" />
                  <Text
                    text="FAT"
                    textStyle={{
                      fontSize: wp(3.5),
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                  <View
                    style={{
                      paddingHorizontal: wp(3),
                      height: "70%",
                      backgroundColor: blueColor1,
                      borderRadius: 50,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      text={
                        orderedComps[0]?.bodyFat
                          ? (orderedComps[0]?.bodyFat).toFixed(1) + "%"
                          : "00.0%"
                      }
                      textStyle={{
                        color: "black",
                        fontSize: wp(3.5),
                        fontFamily: "OpenSans-Bold",
                      }}
                    />
                  </View>
                </View>
              </NeomorphView>
            </View>
          </View>

          <Divider width="100%" height={hp(0.2)} style={Styles.dividerStyle} />

          <View style={Styles.section2.container}>
            <Button1
              onPress={() => navigate("UserStatCalc")}
              buttonText="UPDATE WEIGHT AND/OR BODY FAT"
              isIcon={false}
              isText={true}
              buttonIcon={null}
              tintColor={blueColor}
              buttonTextStyle={{
                fontSize: wp(3.5),
                color: blueColor,
                fontFamily: "OpenSans-Semibold",
              }}
              buttonContainer={{
                width: wp(70),
                height: wp(14),
                borderRadius: wp(7),
              }}
              buttonInnerContainer={{
                width: wp(66),
                height: wp(10),
                borderRadius: wp(5),
              }}
            />
            <Button1
              onPress={() => navigate("StatsGraph")}
              buttonText=""
              isIcon={true}
              isText={false}
              buttonIcon={graphIcon}
              tintColor={redColor}
              buttonContainer={{
                width: wp(14),
                height: wp(14),
                borderRadius: wp(7),
              }}
              buttonInnerContainer={{
                width: wp(10),
                height: wp(10),
                borderRadius: wp(5),
              }}
            />
          </View>

          <View style={{ marginTop: hp(3) }}>
            <Text
              text="BODY WEIGHT HISTORY"
              textStyle={{ fontSize: wp(4.5), fontFamily: "OpenSans-Semibold" }}
            />
            <NeomorphFlexView
              viewStyle={{
                padding: 0,
                marginHorizontal: wp(3),
                marginTop: hp(2),
                borderRadius: wp(3),
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  // justifyContent: "space-around",
                  paddingVertical: hp(1),
                }}
              >
                <View
                  style={{
                    width: "33%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    text="DATE"
                    textStyle={{
                      fontSize: wp(3.5),
                      color: blueColor,
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                </View>

                <View
                  style={{
                    width: "33%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    text="WEIGHT (LBS)"
                    textStyle={{
                      fontSize: wp(3.5),
                      color: blueColor,
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "33%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    text="CHANGE"
                    textStyle={{
                      fontSize: wp(3.5),
                      color: blueColor,
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                </View>
              </View>
              <Divider width="100%" height={hp(0.2)} style={{ margin: 0 }} />
              {orderWeights.map((items, index) => (
                <View
                  key={index}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingVertical: hp(0.5),
                  }}
                >
                  <View
                    style={{
                      width: "33%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      text={moment(items.weightDate).format("MM/DD/YYYY")}
                      textStyle={{ fontSize: wp(3), fontFamily: "OpenSans" }}
                    />
                  </View>
                  <View
                    style={{
                      width: "33%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      text={items.weight}
                      textStyle={{
                        fontSize: wp(3),
                        fontFamily: "OpenSans",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: "33%",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      text={items.change.toFixed(1)}
                      textStyle={{
                        fontSize: wp(3),
                        fontFamily: "OpenSans",
                      }}
                    />
                  </View>
                </View>
              ))}
            </NeomorphFlexView>
          </View>

          <View style={{ marginTop: hp(3) }}>
            <Text
              text="BODY FAT HISTORY"
              textStyle={{ fontSize: wp(4.5), fontFamily: "OpenSans-Semibold" }}
            />
            <NeomorphFlexView
              viewStyle={{
                padding: 0,
                marginHorizontal: wp(3),
                marginTop: hp(2),
                borderRadius: wp(3),
              }}
            >
              <View style={{maxWidth:'100%',display:'flex',flexDirection:'row'}}>
              <View
                style={{
                  maxWidth: "33.3%",
                  minWidth: "33.3%",
                  justifyContent: "center",
                  alignItems:'center',
                  paddingVertical: hp(1),
                }}
              >
                <Text
                  text="DATE"
                  textStyle={{
                    fontSize: wp(3.5),
                    color: blueColor,
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
                </View>
                <View
                  style={{
                    maxWidth: "33.3%",
                    minWidth: "33.3%",
                    justifyContent: "center",
                    alignItems:'center',
                    paddingVertical: hp(1),
                  }}
                >                
                <Text
                  text="FAT %"
                  textStyle={{
                    fontSize: wp(3.5),
                    color: blueColor,
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
                </View>
                <View
                  style={{
                    maxWidth: "33.3%",
                    minWidth: "33.3%",
                    justifyContent: "center",
                    alignItems:'center',
                    paddingVertical: hp(1),
                  }}
                >                
                <Text
                  text="CHANGE"
                  textStyle={{
                    fontSize: wp(3.5),
                    color: blueColor,
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </View>
              
              </View>
              <Divider width="100%" height={hp(0.2)} style={{ margin: 0 }} />
              {orderedComps.map((items, index) => (
                <View style={{maxWidth:'100%',display:'flex',flexDirection:'row'}}
                key={index}
                >
                <View
                  style={{
                    maxWidth: "33.3%",
                    minWidth: "33.3%",
                    justifyContent: "center",
                    alignItems:'center',
                    paddingVertical: hp(0.5),
                  }}
                >
                  <Text
                    text={moment(items.createdDate).format("MM/DD/YYYY")}
                    textStyle={{ fontSize: wp(3), fontFamily: "OpenSans" }}
                  />
                </View>
                <View
                  style={{
                    maxWidth: "33.3%",
                    minWidth: "33.3%",
                    justifyContent: "center",
                    alignItems:'center',
                    paddingVertical: hp(0.5),
                  }}
                >  
                  <Text
                    text={items.bodyFat.toFixed(1)}
                    textStyle={{
                      fontSize: wp(3),
                      fontFamily: "OpenSans",
                      // marginLeft: wp(-3),
                    }}
                  />
                 </View>
                <View
                style={{
                  maxWidth: "33.3%",
                  minWidth: "33.3%",
                  alignItems:'center',
                justifyContent: "center",
                  paddingVertical: hp(0.5),
                }}
              >                   
                  <Text
                    text={items.fatChange.toFixed(1)}
                    textStyle={{
                      fontSize: wp(3),
                      fontFamily: "OpenSans",
                    }}
                  />
                </View>
                </View>
              ))}
            </NeomorphFlexView>
          </View>
        </ScrollView>
      </SafeAreaView>
      <DrawerButton onPress={() => openDrawer()} right={0} top={hp(42.5)} />
    </View>
  );
}
