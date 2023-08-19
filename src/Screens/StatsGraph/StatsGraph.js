import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView,Pressable } from 'react-native'
import Text from '../../Components/TextComp/Text'
import { Divider } from '../../Components/DividerComp/Divider'
import GraphComp from '../../Components/GraphComp/GraphComp'
import { useSelector } from "react-redux";
import Styles from './Styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { NeomorphFlexView } from '../../Components/NeomorphView/NeomorphView'
import { circleLogo, backIcon } from '../../Utils/ImagesPath'
import ImageComp from '../../Components/ImageComp/Image'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button1, Button2 } from '../../Components/Buttons/Buttons'
import { blueColor, blueColor1, redColor } from '../../Utils/ThemeColors'
import {
    getOrderedWeightHistory,
    getOrderedBodyCompositions,
    getWeightGraphData,
    mockWeightHistory

} from "../../realm/index";
export default function HistoryGraph({ navigation: { goBack } }) {
    const [buttonView, setbuttonView] = useState("weight")
    const [weightArr, setweightArr] = useState([])
    const [dateArr, setdateArr] = useState([])
    const [bodyFats, setbodyFats] = useState([])
    const [fatDateArr, setfatDateArr] = useState([])
    const [weightData, setweightData] = useState([])
    const [fatData, setfatData] = useState([])
    const selectedProfile = useSelector((state) => state.profiles.profile);
    const navigation = useNavigation();

    useEffect(() => {
        // console.log('profileeee---->', selectedProfile)
        fetchWeightGraph()
        fetchBodyGraph()
    }, [])
    const fetchWeightGraph = async () => {
        let weightData = await getOrderedWeightHistory(selectedProfile?._id)
        // console.log('weighghghg --->',weightData[0])
        let reversed = Array.from(weightData).reverse()
        let allWeights = reversed.slice(0, 7)
        // console.log('weightttt --->', allWeights[0])
        let organisedWeightData = allWeights.map((dat, index) => {
            let obj = Object.assign({}, {}, {
                weightDate: dat.weightDate,
                _id: dat._id,
                change: dat.change,
                weight: dat.weight,
                profile: dat.profile
            })
            obj['weightDate'] = '' + (dat.weightDate.getMonth() + 1) + '/' + dat.weightDate.getDate()

            return obj
        })
        // console.log('weightData ---> ', organisedWeightData[0])
        setweightData(organisedWeightData)
        let weights = allWeights.map((dat) => parseInt(dat.weight))
        let dates = allWeights.map((dat) => dat.weightDate).map((date) => '' + (date.getMonth() + 1) + '/' + date.getDate())
        // console.log('monthhh--->',dates[0])
        setweightArr(weights)
        setdateArr(dates)
        // console.log('date Arr--->', dates)
        // console.log('weight arr--->', weights)
        // console.log('dayyy--->',dates[0].getDate())
    }
    const fetchBodyGraph = async () => {
        let compData = await getOrderedBodyCompositions(selectedProfile?._id)
        let reversed = Array.from(compData).reverse()
        let allComp = reversed.slice(0, 7)
        let organisedWeightData = allComp.map((dat, index) => {
            let obj = Object.assign({}, {}, {
                createdDate: dat.createdDate,
                _id: dat._id,
                bodyFat: dat.bodyFat,
                fatChange: dat.fatChange,
                profile: dat.profile,
                age: dat.age,
                abdominal: dat.abdominal,
                thigh: dat.thigh,
                chest: dat.chest,
                tricep: dat.tricep,
                subscapular: dat.subscapular,
                suprailliac: dat.suprailliac,
                midaxillary: dat.midaxillary
            })
            obj['createdDate'] = '' + (dat.createdDate.getMonth() + 1) + '/' + dat.createdDate.getDate()
            return obj
        })
        // console.log('comppp --->',organisedWeightData[0])
        setfatData(organisedWeightData)
        let fats = allComp.map((dat) => parseInt(dat.bodyFat))
        let dates = allComp.map((dat) => dat.createdDate).map((date) => '' + (date.getMonth() + 1) + '/' + date.getDate())
        // console.log('fatsss --->',fats)
        // console.log('datesss --->',dates)
        setbodyFats(fats)
        setfatDateArr(dates)
    }
    return (
        <View style={Styles.containerStyle}>
            <SafeAreaView >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: hp(2) }}>
                    <View style={Styles.header.container}>
                        <View style={Styles.header.innerContainer}>
                            <NeomorphFlexView
                                viewStyle={Styles.header.logoContainer}
                            >
                                <ImageComp source={circleLogo} imageStyle={{ resizeMode: 'contain', width: wp(12), height: wp(12) }} />
                            </NeomorphFlexView>
                            <Text text="HISTORY GRAPH" textStyle={{ fontSize: wp(5.5), fontFamily: 'OpenSans-Bold' }} />
                        </View>
                        <Button1
                            onPress={() => goBack()}
                            buttonText=""
                            isIcon={true}
                            isText={false}
                            buttonIcon={backIcon}
                            tintColor={blueColor}
                            buttonContainer={{ width: wp(14), height: wp(14), borderRadius: wp(7) }}
                            buttonInnerContainer={{ width: wp(10), height: wp(10), borderRadius: wp(5) }}
                        />
                    </View>
                    <View style={Styles.section1.container}>
                        <View style={{ width: wp(85), flexDirection: "row", justifyContent: 'space-between' }}>
                            <NeomorphFlexView
                                viewStyle={{ width: '32%', justifyContent: 'flex-start', height: hp(22), borderRadius: wp(3), paddingVertical: hp(1.5) }}
                            >
                            <Pressable onPress={()=>{
                                navigation.navigate('WorkoutGraph', {
                                    workout: '',
                                    workoutName: '',
                                    exercise: '',
                                    exerciseName: '',                                              
                                  });
                            }}>                 
                                <Text text="WORKOUT" textStyle={{ fontSize: wp(4), fontFamily: 'OpenSans-Semibold' }} />
                            </Pressable>
                                <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="VOLUME"
                                    isIcon={false}
                                    buttonIcon={null}
                                    disabled={true}
                                    buttonContainer={{ marginTop: hp(1) }}
                                    buttonTextStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="REPS"
                                    isIcon={false}
                                    disabled={true}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(2.5) }}
                                    buttonTextStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />

                            </NeomorphFlexView>
                            <NeomorphFlexView
                                viewStyle={{ width: '32%', justifyContent: 'flex-start', height: hp(22), borderRadius: wp(3), paddingVertical: hp(1.5) }}
                            >
                                <Pressable onPress={()=>{
                                    navigation.navigate('ExerciseGraph', {
                                        workout: '',
                                        workoutName: '',
                                        exercise: '',
                                        exerciseName: '',                                              
                                      });
                                }}>                                
                                <Text text="EXERCISE" textStyle={{ fontSize: wp(4), fontFamily: 'OpenSans-Semibold' }} />
                                </Pressable>
                                <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="VOLUME"
                                    isIcon={false}
                                    disabled={true}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(1) }}
                                    buttonTextStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="REPS"
                                    disabled={true}
                                    isIcon={false}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(2.5) }}
                                    buttonTextStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />
                            </NeomorphFlexView>
                            <NeomorphFlexView
                                viewStyle={{ width: '32%', justifyContent: 'flex-start', height: hp(22), borderRadius: wp(3), paddingVertical: hp(1.5) }}
                            >
                                <Text text="USER STATS" textStyle={{ fontSize: wp(4), fontFamily: 'OpenSans-Semibold', color: blueColor }} />
                                <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />
                                <Button2
                                    onPress={() => {
                                        setbuttonView('weight')
                                    }}
                                    isText={true}
                                    buttonText="WEIGHT"
                                    isIcon={false}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(1) }}
                                    buttonTextStyle={buttonView === 'weight' ? { fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: redColor } : { fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />
                                <Button2
                                    onPress={() => {
                                        setbuttonView('fat')
                                    }}
                                    isText={true}
                                    buttonText="BODY FAT"
                                    isIcon={false}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(2.5) }}
                                    buttonTextStyle={buttonView === 'fat' ? { fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: redColor } : { fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />

                            </NeomorphFlexView>
                        </View>
                        {buttonView === 'weight' && <NeomorphFlexView
                            viewStyle={{ width: wp(85), height: hp(30), borderRadius: wp(4), marginVertical: hp(2) }}
                        >
                            {weightArr.length > 0 && dateArr.length > 0 && <GraphComp
                                width={wp(92)}
                                height={hp(27)}
                                dataa={
                                    {
                                        labels: dateArr.reverse(),
                                        datasets: [
                                            {
                                                data: weightArr.reverse(),
                                                color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // optional
                                            }
                                        ]
                                    }
                                }
                            />}
                        </NeomorphFlexView>}
                        {buttonView === 'fat' && <NeomorphFlexView
                            viewStyle={{ width: wp(85), height: hp(30), borderRadius: wp(4), marginVertical: hp(2) }}
                        >
                            {bodyFats.length > 0 && fatDateArr.length > 0 && <GraphComp
                                width={wp(92)}
                                height={hp(27)}
                                dataa={
                                    {
                                        labels: fatDateArr.reverse(),
                                        datasets: [
                                            {
                                                data: bodyFats.reverse(),
                                                color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // optional
                                            }
                                        ]
                                    }
                                }
                            />}
                        </NeomorphFlexView>}

                        <HeadingComp text={buttonView === 'weight' ? "USER WEIGHT" : "USER BODY FAT"} textStyle={{ fontSize: wp(5), marginHorizontal: wp(2), fontFamily: 'OpenSans-Bold' }} />

                        {buttonView === 'weight' && <NeomorphFlexView
                            viewStyle={{ width: wp(85), borderRadius: wp(4), marginTop: hp(2), paddingVertical: hp(1.5) }}
                        >
                            <React.Fragment>
                            <View style={{ width: '90%',alignItems:'center', flexDirection: "row"}}>
                                <View style={{width:'33%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Text text={"Date"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold',color:redColor }} />
                                </View>
                                <View style={{width:'33%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Text text={"Weight"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold',color:redColor }} />
                                </View>
                                <View style={{width:'33%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Text text={"Change"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold',color:redColor }} />
                                </View>
                                </View>
                                <Divider width="100%" height={hp(0.2)} style={Styles.dividerStyle} />

                            </React.Fragment>
                            {
                                weightData.length > 0 && weightData.map((dt, i) => {
                                    return (
                                        <React.Fragment key={i}>
                            <View style={{ width: '90%',alignItems:'center', flexDirection: "row"}}>
                                <View style={{width:'33%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <Text text={dt.weightDate} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                </View>
                                <View style={{width:'33%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <Text text={dt.weight} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                </View>
                                <View style={{width:'33%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <Text text={dt.change} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                </View>
                                                {/* <Text text="DETAILS" textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: blueColor }} /> */}
                                            </View>
                                            <Divider width="100%" height={hp(0.2)} style={Styles.dividerStyle} />

                                        </React.Fragment>
                                    )
                                })
                            }
                        </NeomorphFlexView>}
                        {buttonView === 'fat' && <NeomorphFlexView
                            viewStyle={{ width: wp(85), borderRadius: wp(4), marginTop: hp(2), paddingVertical: hp(1.5) }}
                        >
                            <React.Fragment>
                                <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                                    <Text text={"Date"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold',color:redColor }} />
                                    <Text text={"Fat Percentage"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold',color:redColor }} />
                                    <Text text={"Change"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold',color:redColor }} />
                                    {/* <Text text={"Show"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} /> */}
                                </View>
                                <Divider width="100%" height={hp(0.2)} style={Styles.dividerStyle} />

                            </React.Fragment>
                            {
                                fatData.length > 0 && fatData.map((dt, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                                                <Text text={dt.createdDate} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                <Text text={dt.bodyFat.toFixed(2)} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                <Text text={dt.fatChange.toFixed(2)} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                {/* <Text text="DETAILS" textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: blueColor }} /> */}
                                            </View>
                                            <Divider width="100%" height={hp(0.2)} style={Styles.dividerStyle} />

                                        </React.Fragment>
                                    )
                                })
                            }
                        </NeomorphFlexView>}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}


const HeadingComp = ({ text, textStyle }) => {
    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{
                width: wp(2.5),
                height: wp(2.5),
                borderRadius: wp(1.75),
                backgroundColor: blueColor1
            }}></View>
            <Text text={text} textStyle={textStyle} />
            <View style={{
                width: wp(2.5),
                height: wp(2.5),
                borderRadius: wp(1.75),
                backgroundColor: blueColor1
            }}></View>
        </View>
    )
}