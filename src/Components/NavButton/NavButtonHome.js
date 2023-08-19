import React from "react";
import { NeomorphFlex, NeomorphBlur } from "react-native-neomorph-shadows";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Styles from "./Styles";
export default NavButtonHome = ({ children }) => {
  return (
    <NeomorphBlur
      style={{
        ...Styles.navButton,
        height: wp(10),
        width: wp(10),
        borderRadius: wp(8),
      }}
    >
      <NeomorphBlur
        style={{
          ...Styles.navButton,
          height: wp(10),
          width: wp(10),
          borderRadius: wp(7.5),
        }}
      >
        <NeomorphBlur
          style={{
            ...Styles.navButton,
            height: wp(14),
            width: wp(14),
            borderRadius: wp(7),
          }}
        >
          <NeomorphBlur
            style={{
              ...Styles.navButton,
              height: wp(13),
              width: wp(13),
              borderRadius: wp(6.5),
            }}
          >
            {children}
          </NeomorphBlur>
        </NeomorphBlur>
      </NeomorphBlur>
    </NeomorphBlur>
  );
};
