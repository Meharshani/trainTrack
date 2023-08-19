import React from 'react'
import {View, TouchableOpacity, ImageBackground} from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows';
import {backgroundColor1,blueColor,buttonColor} from 'Utils/ThemeColors'
import Image from 'ImageComp/Image'
import {AvatarStyles} from './Styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { editIcon } from 'Utils/ImagesPath';
import DocumentPicker  from 'react-native-document-picker';

export default function Avatar({image,avatarContainer,avatarInnerContainer,showIcon,icon,isEdit}) {

  const handleChangeImage = async ()=>{

    var result = await DocumentPicker.pick({
      type:DocumentPicker.types.images
    })

  }


  return (
    <Neomorph 
      inner 
      style={{
        shadowRadius: 4,
        backgroundColor: backgroundColor1,
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative',
        ...avatarContainer
      }}
    >
      <Neomorph
        swapShadows
        lightShadowColor='#fff'
        style={{
          shadowRadius: 2,
          backgroundColor: buttonColor,
          alignItems:'center',
          justifyContent:'center',
          ...avatarInnerContainer
        }}
      >
        <ImageBackground
          source={image}
          imageStyle={AvatarStyles.innerView}
          resizeMode="cover"
        >
          {showIcon&&<Image source={icon} />}
        </ImageBackground>
      </Neomorph>
      {
        isEdit &&
        <TouchableOpacity 
        onPress={handleChangeImage}
        style={{position:'absolute',bottom:wp(2),right:wp(2),zIndex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',width:wp(8),height:wp(8),borderRadius:wp(4),backgroundColor:blueColor}}>
            <Image source={editIcon} imageStyle={{width:wp(4),height:wp(4)}} tintColor='white' />
        </TouchableOpacity>
      }
    </Neomorph>
  )
}
