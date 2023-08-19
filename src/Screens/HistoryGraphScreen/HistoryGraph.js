import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import Text from '../../Components/TextComp/Text'
import { Divider } from '../../Components/DividerComp/Divider'
import GraphComp from '../../Components/GraphComp/GraphComp'
import Styles from './Styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { NeomorphFlexView } from '../../Components/NeomorphView/NeomorphView'
import { circleLogo, backIcon } from '../../Utils/ImagesPath'
import ImageComp from '../../Components/ImageComp/Image'
import { Button1, Button2 } from '../../Components/Buttons/Buttons'
import { blueColor, blueColor1 } from '../../Utils/ThemeColors'

export default function HistoryGraph({ navigation: { goBack } }) {

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
                                <Text text="WORKOUT" textStyle={{ fontSize: wp(4), fontFamily: 'OpenSans-Semibold' }} />
                                <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="VOLUME"
                                    isIcon={false}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(1) }}
                                    buttonTextStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold'}}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="REPS"
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
                                <Text text="EXERCISE" textStyle={{ fontSize: wp(4), fontFamily: 'OpenSans-Semibold' }} />
                                <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="VOLUME"
                                    isIcon={false}
                                    buttonIcon={null}
                                    buttonContainer={{ marginTop: hp(1) }}
                                    buttonTextStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="REPS"
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
                                <Text text="USER STATS" textStyle={{ fontSize: wp(4), fontFamily: 'OpenSans-Semibold' }} />
                                <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />
                                <Button2
                                    onPress={() => setStartWorkout(false)}
                                    isText={true}
                                    buttonText="WEIGHT"
                                    isIcon={false}
                                    buttonIcon={null}
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
                                    buttonContainer={{ marginTop: hp(2.5) }}
                                    buttonTextStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }}
                                    buttonInnerContainer={{ width: wp(22), height: hp(4), borderRadius: hp(2) }}
                                />

                            </NeomorphFlexView>
                        </View>
                        <NeomorphFlexView
                            viewStyle={{ width: wp(85), height: hp(30), borderRadius: wp(4), marginVertical: hp(2) }}
                        >
                            <GraphComp
                                width={wp(92)}
                                height={hp(27)}
                                dataa={
                                    {
                                        labels: ["1/22", "2/22", "3/22", "4/22", "5/22", "6/22"],
                                        datasets: [
                                            {
                                                data: [1000, 450, 2800, 8000, 9900, 100],
                                                color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // optional
                                            }
                                        ]
                                    }
                                }
                            />
                        </NeomorphFlexView>

                        <HeadingComp text="USER BODY FAT" textStyle={{ fontSize: wp(5), marginHorizontal: wp(2), fontFamily: 'OpenSans-Bold' }} />

                        <NeomorphFlexView
                            viewStyle={{ width: wp(85), borderRadius: wp(4), marginTop: hp(2), paddingVertical: hp(1.5) }}
                        >
                            {
                                [{}, {}, {}, {}].map((dt, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                                                <Text text="01/03/2022" textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                <Text text="REPS" textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                <Text text="VOLUME" textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold' }} />
                                                <Text text="DETAILS" textStyle={{ fontSize: wp(3), fontFamily: 'OpenSans-Semibold', color: blueColor }} />
                                            </View>
                                            {
                                                i !== 3 &&
                                                <Divider width="100%" height={hp(0.2)} style={Styles.dividerStyle} />
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </NeomorphFlexView>
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