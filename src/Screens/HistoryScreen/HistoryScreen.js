import React, {useMemo} from 'react';
import {
  View,
  ScrollView,
  ActionSheetIOS,
  ActivityIndicator,
} from 'react-native';
import Text from '../../Components/TextComp/Text';
import Calendar from 'Calendar/CalendarComp';
import {Divider} from 'Divider/Divider';
import Accordion from 'Accordion/Accordion';
import {SafeAreaView} from 'react-native';
import Styles from './Styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {NeomorphFlexView} from '../../Components/NeomorphView/NeomorphView';
import {circleLogo, backIcon, graphIcon} from '../../Utils/ImagesPath';
import ImageComp from '../../Components/ImageComp/Image';
import {Button1} from '../../Components/Buttons/Buttons';
import {blueColor, blueColor1, redColor} from '../../Utils/ThemeColors';
import DrawerButton from 'DrawerButton/DrawerButton';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function HistoryScreen({navigation: {openDrawer}}) {
  const history = useSelector(state => state.workouthistory.history);
  const navigation = useNavigation();

  //remove the duplicate objects by criterion
  // const getUniqueListBy = (arr, key) => {
  //   return [...new Map(arr.map((item) => [item[key], item])).values()];
  // };
  var totalWorkouts = useMemo(
    () => [
      'Back Workout',
      'Leg Workout',
      'Shoulder Workout',
      'Arm Workout',
      'Chest Workout',
    ],
    [],
  );

  //sum of reps
  const repsSum = sets => {
    if (sets !== undefined) {
      let sum = 0;
      sets.forEach(items => {
        sum += parseInt(items.reps);
      });
      // console.log("REP SUM ", sum);
      return sum;
    }
  };

  //sum of weight volume
  const volumeSum = sets => {
    if (sets !== undefined) {
      let sum = 0;
      sets.forEach(items => {
        sum += parseInt(items.weight * items.reps);
      });
      return sum;
    }
  };

  //total workout reps and volumes
  const totalWorkoutsReps = workout => {
    let sum = 0;
    let repsSum = 0;
    // console.log('item ---> ',workout.workoutName)
    if (history.length !== 0) {
      let itemm = history.filter(data => {
        return data.workoutName === workout.workoutName;
      });
      // console.log('itemmmm --->',itemm[0].sumData[0])
      itemm[0].sumData.forEach(innerItems => {
        if (innerItems.sets !== undefined) {
          innerItems.sets.forEach(items => {
            repsSum += parseInt(items.reps);
          });
        }
      });
      // console.log('reps sum --->',repsSum)
      // history.forEach((item,index) => {
      //   // if(index===0){
      //   //   console.log('itemmmm -->',item)
      //   // }
      //   item.sumData.forEach((innerItems) => {
      //     if (innerItems.sets !== undefined) {
      //       innerItems.sets.forEach((items) => {
      //         sum += parseInt(items.reps);
      //       });
      //     }
      //   });
      // });
    }
    return repsSum;
  };

  //total workout volume
  const totalWorkoutsVol = workout => {
    let sum = 0;
    let volumeSum = 0;
    if (history.length !== 0) {
      let itemm = history.filter(data => {
        return data.workoutName === workout.workoutName;
      });
      // console.log('itemmmm --->',itemm[0].sumData[0])
      itemm[0].sumData.forEach(innerItems => {
        if (innerItems.sets !== undefined) {
          innerItems.sets.forEach(items => {
            volumeSum += parseInt(items.weight * items.reps);
          });
        }
      });
      // history.forEach((item) => {
      //   item.sumData.forEach((innerItems) => {
      //     if (innerItems.sets !== undefined) {
      //       innerItems.sets.forEach((items) => {
      //         sum += parseInt(items.weight * items.reps);
      //       });
      //     }
      //   });
      // });
    }
    return volumeSum;
  };

  return (
    <View style={Styles.containerStyle}>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: hp(2)}}>
          <View style={Styles.header.container}>
            <View style={Styles.header.innerContainer}>
              <NeomorphFlexView viewStyle={Styles.header.logoContainer}>
                <ImageComp
                  source={circleLogo}
                  imageStyle={{
                    resizeMode: 'contain',
                    width: wp(12),
                    height: wp(12),
                  }}
                />
              </NeomorphFlexView>
              <Text
                text="HISTORY"
                textStyle={{fontSize: wp(5.5), fontFamily: 'OpenSans-Bold'}}
              />
            </View>
            <Button1
              onPress={() => navigation.navigate('UserShortCuts')}
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
          </View>
          <View style={Styles.section1.container}>
            <Calendar />

            <Divider
              width="100%"
              height={hp(0.2)}
              style={Styles.section1.dividerStyle}
            />

            {history.length === 0 ? (
              <View style={{marginTop: hp(2)}}>
                <Text
                  text="Tap on highlighted dates to get workout history"
                  textStyle={{fontSize: wp(3), fontFamily: 'OpenSans'}}
                />
              </View>
            ) : (
              // totalWorkouts?.map((myItems, index) => {

              //     var items ={}
              //       if(history.find((myItem)=>myItem.workoutName==myItems)){
              //         items = history.find((myItem)=>myItem.workoutName==myItems)
              //       }else{
              //         items = {workoutName:myItems
              //         }
              //       }

              history?.map((items, index) => {
                // let uniqueSum = getUniqueListBy(items?.sumData, "exerciseId");
                console.log('items.workoutName ', items.workoutName);
                return (
                  <View key={index}>
                    <HeadingComp
                      text={items?.workoutName}
                      textStyle={{
                        fontSize: wp(5),
                        marginHorizontal: wp(2),
                        fontFamily: 'OpenSans-Bold',
                      }}
                    />

                    <View style={Styles.section1.view1}>
                      <View style={{width: '50%'}}>
                        <Text
                          text="Exercise"
                          textStyle={{
                            fontSize: wp(3),
                            fontFamily: 'OpenSans',
                          }}
                        />
                      </View>
                      <View style={{width: '20%'}}>
                        <Text
                          text="Reps"
                          textStyle={{
                            fontSize: wp(3),
                            fontFamily: 'OpenSans',
                          }}
                        />
                      </View>
                      <View style={{width: '30%'}}>
                        <Text
                          text="Volume"
                          textStyle={{
                            fontSize: wp(3),
                            fontFamily: 'OpenSans',
                          }}
                        />
                      </View>
                    </View>

                    <NeomorphFlexView
                      viewStyle={{
                        width: '100%',
                        marginTop: hp(1),
                        borderRadius: wp(3),
                      }}>
                      {items?.sumData &&
                        items.sumData.map((innerItems, ind) => (
                          <View key={ind}>
                            <View style={Styles.section1.view2}>
                              <View style={{width: '50%'}}>
                                <Text
                                  text={innerItems?.exerciseName}
                                  textStyle={{
                                    fontSize: wp(3),
                                    marginVertical: hp(0.7),
                                    fontFamily: 'OpenSans',
                                  }}
                                />
                              </View>
                              <View style={{width: '20%'}}>
                                <Text
                                  text={
                                    innerItems?.sets !== undefined
                                      ? repsSum(innerItems?.sets).toString()
                                      : '0'
                                  }
                                  textStyle={{
                                    fontSize: wp(3),
                                    marginVertical: hp(0.7),
                                    fontFamily: 'OpenSans',
                                  }}
                                />
                              </View>
                              <View style={{width: '20%'}}>
                                <Text
                                  text={
                                    innerItems?.sets !== undefined
                                      ? volumeSum(innerItems?.sets).toString()
                                      : '0'
                                  }
                                  textStyle={{
                                    fontSize: wp(3),
                                    marginVertical: hp(0.7),
                                    fontFamily: 'OpenSans',
                                  }}
                                />
                              </View>
                              <View style={{width: '10%'}}>
                                <Button1
                                  buttonText=""
                                  isIcon={true}
                                  isText={false}
                                  onPress={() => {
                                    // console.log('go to graph --->',innerItems)
                                    navigation.navigate('ExerciseGraph', {
                                      workout: items?.sumData[0]?.workoutId,
                                      workoutName: items?.workoutName,
                                      exercise: innerItems?.exerciseId,
                                      exerciseName: innerItems?.exerciseName,
                                    });
                                  }}
                                  buttonIcon={graphIcon}
                                  tintColor={redColor}
                                  buttonContainer={{
                                    width: wp(6),
                                    height: wp(6),
                                    borderRadius: wp(3),
                                    marginVertical: hp(0.2),
                                  }}
                                  buttonInnerContainer={{
                                    width: wp(4),
                                    height: wp(4),
                                    borderRadius: wp(2),
                                  }}
                                />
                              </View>
                            </View>
                            {/* {items.length - 1 ? null : (
                            
                          )} */}
                            {history.length === 0 ? (
                              <View />
                            ) : (
                              <View style={Styles.section1.view1}>
                                <View style={{width: '50%'}}>
                                  <Text
                                    text="Total"
                                    textStyle={{
                                      fontSize: wp(3),
                                      color: 'white',
                                      fontFamily: 'OpenSans-Semibold',
                                    }}
                                  />
                                </View>
                                <View style={{width: '20%'}}>
                                  <Text
                                    text={totalWorkoutsReps(items).toString()}
                                    textStyle={{
                                      fontSize: wp(3),
                                      color: blueColor,
                                      fontFamily: 'OpenSans-Semibold',
                                    }}
                                  />
                                </View>
                                <View style={{width: '20%'}}>
                                  <Text
                                    text={totalWorkoutsVol(items).toString()}
                                    textStyle={{
                                      fontSize: wp(3),
                                      color: blueColor,
                                      fontFamily: 'OpenSans-Semibold',
                                    }}
                                  />
                                </View>
                                <View style={{width: '10%'}}>
                                  <Button1
                                    buttonText=""
                                    isIcon={true}
                                    isText={false}
                                    onPress={() => {
                                      // console.log('go to workout graph id --->',items.sumData[0].workoutId)
                                      // console.log('go to workout graph  --->',items.workoutName)
                                      if (
                                        items.workoutName !== undefined &&
                                        items.workoutName !== null
                                      ) {
                                        navigation.navigate('WorkoutGraph', {
                                          workout: items?.sumData[0]?.workoutId,
                                          workoutName: items?.workoutName,
                                          exercise: innerItems?.exerciseId,
                                          exerciseName: innerItems?.exerciseName,                                              
                                        });
                                      }
                                    }}
                                    buttonIcon={graphIcon}
                                    tintColor={redColor}
                                    buttonContainer={{
                                      width: wp(6),
                                      height: wp(6),
                                      borderRadius: wp(3),
                                      marginVertical: hp(0.2),
                                    }}
                                    buttonInnerContainer={{
                                      width: wp(4),
                                      height: wp(4),
                                      borderRadius: wp(2),
                                    }}
                                  />
                                </View>
                              </View>
                            )}
                            <Divider
                              width={wp(91)}
                              style={{marginTop: -hp(0.1)}}
                            />
                          </View>
                        ))}
                    </NeomorphFlexView>
                  </View>
                );
              })
            )}
          </View>
          {/* <View style={Styles.section1.view4}>
            {[{}, {}, {}].map((dt, i) => {
              return (
                <React.Fragment key={i}>
                  <View style={{ width: "100%", paddingHorizontal: wp(3.5) }}>
                    <Accordion
                      headerComp={
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            text="12/03/2022"
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                          <Text
                            text="10"
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                          <Text
                            text="1300"
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                        </View>
                      }
                      bodyComp={
                        <React.Fragment>
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: wp(2),
                            }}
                          >
                            <Text
                              text="1"
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                            <Text
                              text="100"
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                            <Text
                              text="X"
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                            <Text
                              text="10"
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                            <Text
                              text="1300"
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                            <Text
                              text="17"
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                          </View>
                        </React.Fragment>
                      }
                    />
                  </View>
                  {i !== 2 && (
                    <Divider
                      width="100%"
                      height={hp(0.1)}
                      style={{ marginVertical: hp(0.1) }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View> */}
        </ScrollView>
      </SafeAreaView>
      <DrawerButton onPress={() => openDrawer()} right={0} top={hp(42.5)} />
    </View>
  );
}

const HeadingComp = ({text, textStyle}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: wp(2.5),
          height: wp(2.5),
          borderRadius: wp(1.75),
          backgroundColor: blueColor1,
        }}></View>
      <Text text={text} textStyle={textStyle} />
      <View
        style={{
          width: wp(2.5),
          height: wp(2.5),
          borderRadius: wp(1.75),
          backgroundColor: blueColor1,
        }}></View>
    </View>
  );
};
