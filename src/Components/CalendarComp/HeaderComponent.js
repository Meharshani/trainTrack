import React from 'react'
import { View,Text } from 'react-native'
import {blueColor, blueColor1 } from 'Utils/ThemeColors';
import {NeomorphView} from 'NeomorphView/NeomorphView';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextComp from 'TextComp/Text';
import { Button2 } from '../Buttons/Buttons';
import { playIcon } from 'Utils/ImagesPath';
import Styles from './Styles'

const months = ['JANUARY','FEBUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER',
'NOVEMBER','DECEMBER']

const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function DayComponent({month,addMonth}) {
    return (
        <>
        <NeomorphView 
            viewStyle={Styles.headerContainer}
        >
            <Button2 
                onPress={()=>addMonth(-1)}
                isText={false}
                buttonText="" 
                isIcon={true}
                buttonIcon={playIcon}  
                tintColor={blueColor1}
                buttonIconStyle={{width:wp(2.5),height:wp(2.5),transform:[{rotate:'180deg'}]}}
                buttonInnerContainer={Styles.buttonInnserStyle} 
            />
            <View style={{flexDirection:'row'}}>    
                <TextComp text={month.getDate()} textStyle={{fontSize:wp(5),marginRight:wp(1.5),color:'white',fontFamily:'OpenSans-Semibold'}} />
                <TextComp text={months[month.getMonth()]} textStyle={{fontSize:wp(5),color:'white',fontFamily:'OpenSans-Semibold'}} />
            </View>
            <Button2 
                onPress={()=>addMonth(1)}
                isText={false}
                buttonText="" 
                isIcon={true}
                buttonIcon={playIcon}
                tintColor={blueColor1}
                buttonIconStyle={{width:wp(2.5),height:wp(2.5)}}
                buttonInnerContainer={Styles.buttonInnserStyle} 
            />            
        </NeomorphView>
          <View style={{width:'100%',marginTop:hp(1),marginBottom:hp(2),display:'flex',flexDirection:'row'}}>
            {
                days.map((day)=>(
                    <View style={{width:'14.3%'}}>
                    <Text style={{color:'#afafaf',fontSize:wp(4),textAlign:'center'}}>{day}</Text>
                    </View>
                ))
            }
          </View>
        </>
  )
}