import React from 'react'
import Modal from "react-native-modal"
import Styles from './Styles'

export default function ModalView({isVisible,bodyImage,setClose,containerStyle,children}) {
  return (
    <Modal 
        animationIn="zoomInUp" 
        animationOut="zoomOutDown" 
        coverScreen={false} 
        onBackdropPress={setClose} 
        isVisible={isVisible} 
        backdropColor="transparent" 
        style={[Styles.container,containerStyle,{borderWidth:(bodyImage===undefined)?2:0}]}
    >
        {children}
    </Modal>
  )
}