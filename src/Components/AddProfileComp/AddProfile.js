import ImageComp from 'ImageComp/Image';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { plusIcon } from 'Utils/ImagesPath';
import {backgroundColor1, blueColor, buttonTextColor} from 'Utils/ThemeColors'

export default AddProfileComp = ({onPress}) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <Neomorph 
            inner 
            style={{
                shadowRadius: 1.5,
                backgroundColor: backgroundColor1,
                justifyContent: 'center',
                alignItems: 'center',
                width:wp(40),
                height:wp(40),
                borderRadius:wp(5),
                marginBottom:hp(2)
            }}
        >
            <ImageComp source={plusIcon} imageStyle={{width:wp(10),height:wp(10)}} tintColor={blueColor} />
        </Neomorph>
      </TouchableOpacity>
  )
}
