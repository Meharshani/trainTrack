import React from "react";
import { NeomorphFlex, NeomorphBlur } from "react-native-neomorph-shadows";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Styles from "./Styles";
export default NavButton = ({ children }) => {
  return (
    <NeomorphBlur
      style={{
        ...Styles.navButton,
        height: wp(16),
        width: wp(16),
        borderRadius: wp(8),
      }}
    >
      <NeomorphBlur
        style={{
          ...Styles.navButton,
          height: wp(15),
          width: wp(15),
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
