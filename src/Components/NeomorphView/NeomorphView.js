import React from "react";
import { NeomorphFlex, Neomorph } from "react-native-neomorph-shadows";
import { backgroundColor1 } from "../../Utils/ThemeColors";

export const NeomorphFlexView = ({ viewStyle, children }) => {
  return (
    <NeomorphFlex
      inner
      style={{
        shadowRadius: 1.5,
        backgroundColor: backgroundColor1,
        justifyContent: "center",
        alignItems: "center",
        ...viewStyle,
      }}
    >
      {children}
    </NeomorphFlex>
  );
};

export const NeomorphView = ({ viewStyle, children }) => {
  return (
    <Neomorph
      inner
      style={{
        shadowRadius: 1.5,
        backgroundColor: backgroundColor1,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        ...viewStyle,
      }}
    >
      {children}
    </Neomorph>
  );
};
