import React, { useState, useEffect } from 'react'
import { View, ScrollView, SafeAreaView,Pressable } from 'react-native'
import Text from '../../Components/TextComp/Text'
import { Divider } from '../../Components/DividerComp/Divider'
import GraphComp from '../../Components/GraphComp/GraphComp'
import Styles from './Styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { NeomorphFlexView } from '../../Components/NeomorphView/NeomorphView'
import { circleLogo, backIcon } from '../../Utils/ImagesPath'
import ImageComp from '../../Components/ImageComp/Image'
import { Button1, Button2 } from '../../Components/Buttons/Buttons'
import { blueColor, blueColor1, redColor } from '../../Utils/ThemeColors'
import { useNavigation, useRoute } from "@react-navigation/native";
import {
    getOrderedWeightHistory,
    getOrderedBodyCompositions,
    getWeightGraphData,
    mockWeightHistory,
    getExerciseHistoryWeekly

} from "../../realm/index";
export default function HistoryGraph({ navigation: { goBack } }) {
    const [buttonView, setbuttonView] = useState("volume")
    const [volumeValues, setvolumeValues] = useState([])
    const [volumeDates, setvolumeDates] = useState([])
    const navigation = useNavigation();
    const { params } = useRoute();
    const [exerciseId, setexerciseId] = useState(params?.exercise)
    const [exerciseName, setexerciseName] = useState(params?.exerciseName)
    const [workoutId, setworkoutId] = useState(params?.workout)
    const [workoutName, setworkoutName] = useState(params?.workoutName)
    const [exerciseVolumeData, setexerciseVolumeData] = useState([])
    useEffect(() => {
        // console.log('paramsss -->',exerciseId)
        getExerciseGraphData()
    }, [])
    const getExerciseGraphData = async () => {
        let date = new Date()
        let month = date.getMonth()
        let year = date.getFullYear()
        let day = date.getDate()
        let data = await getExerciseHistoryWeekly(month, day, year, exerciseId)
        // console.log('graph data --->',data)
        let dates = data.dateArray.map((date) => '' + (date.getMonth() + 1) + '/' + date.getDate())
        // console.log('datesss --->',dates)
        setvolumeDates(dates)
        setvolumeValues(data.sumsOfValue)
        let exerciseData = Array.from({ length: dates.length }, (_, indd) => {
            return {
                date: dates[indd],
                value: data.sumsOfValue[indd]
            }
        })
        // console.log('exercise data ---->',exerciseData)
        setexerciseVolumeData(exerciseData)
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
                                    workout: workoutId,
                                    workoutName: workoutName,
                                    exercise: exerciseId,
                                    exerciseName: exerciseName,                                              
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
                                <Text text="EXERCISE" textStyle={{ fontSize: wp(4), fontFamily: 'OpenSans-Semibold', color: blueColor }} />
                                <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />
                                <Button2
                                    onPress={() => {
                                        setbuttonView('volume')
                                    }}
                                    isText={true}
                                    buttonText="VOLUME"
                                    isIcon={false}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(1) }}
                                    buttonTextStyle={buttonView === 'volume' ? { fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: redColor } : { fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />
                                <Button2
                                    onPress={() => {
                                        setbuttonView('reps')
                                    }}
                                    isText={true}
                                    buttonText="REPS"
                                    isIcon={false}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(2.5) }}
                                    buttonTextStyle={buttonView === 'reps' ? { fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: redColor } : { fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />
                            </NeomorphFlexView>
                            <NeomorphFlexView
                                viewStyle={{ width: '32%', justifyContent: 'flex-start', height: hp(22), borderRadius: wp(3), paddingVertical: hp(1.5) }}
                            >
                                <Pressable onPress={()=>navigation.navigate('StatsGraph')}>
                                <Text text="USER STATS" textStyle={{ fontSize: wp(4), fontFamily: 'OpenSans-Semibold' }} />
                                </Pressable>
                                <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="WEIGHT"
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
                                    buttonText="BODY FAT"
                                    isIcon={false}
                                    buttonIcon={null}
                                    disabled={true}
                                    buttonContainer={{ marginTop: hp(2.5) }}
                                    buttonTextStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />

                            </NeomorphFlexView>
                        </View>
                        {buttonView === 'volume' && volumeValues.length > 0 && <NeomorphFlexView
                            viewStyle={{ width: wp(85), height: hp(30), borderRadius: wp(4), marginVertical: hp(2) }}
                        >
                            <GraphComp
                                width={wp(92)}
                                height={hp(27)}
                                dataa={
                                    {
                                        labels: volumeDates,
                                        datasets: [
                                            {
                                                data: volumeValues,
                                                color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // optional
                                            }
                                        ]
                                    }
                                }
                            />
                        </NeomorphFlexView>}

                        <HeadingComp text={exerciseName} textStyle={{ fontSize: wp(5), marginHorizontal: wp(2), fontFamily: 'OpenSans-Bold' }} />

                        {buttonView === 'volume' && exerciseVolumeData.length > 0 && <NeomorphFlexView
                            viewStyle={{ width: wp(85), borderRadius: wp(4), marginTop: hp(2), paddingVertical: hp(1.5) }}
                        >
                            <React.Fragment>
                                <View style={{ width: '80%',alignItems:'center', flexDirection: "row"}}>
                                    <View style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Text text={"Date"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: redColor}} />
                                    </View>
                                    <View style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Text text={"Value"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: redColor }} />                                        
                                    </View>
                                    {/* <Text text={"Change"} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold',color:redColor }} /> */}
                                </View>
                                <Divider width="100%" height={hp(0.2)} style={Styles.dividerStyle} />

                            </React.Fragment>
                            {
                                exerciseVolumeData.length > 0 && exerciseVolumeData.map((dt, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                <View style={{ width: '80%',alignItems:'center', flexDirection: "row"}}>
                                <View style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <Text text={dt.date} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                </View>
                                    <View style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                <Text text={dt.value} textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                </View>
                                                {/* <Text text="VOLUME" textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} /> */}
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