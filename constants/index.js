const COLORS = {
  primary: "#F7DDB5",
  primarytrans: "#F7DDB56B",
  secondary: "#D8C0B5",
  secondarytrans: "#D8C0B56B",
  tertiary: "#647484",
  secondarylight: "#4b3b34",

  backgroundReflectionCardColor: "rgba(216, 192, 181, 0.8)",


  color4: "#E69518",
  color5: "#774D0C",

  light: "beige",
  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
};

const FONT = {
  regular: "JosefineSans-Regular",
  medium: "JosefineSans-Medium",
  bold: "JosefineSans-Bold",
  semibold: "JosefineSans-SemiBold",
  light: "JosefineSans-Light",
};

const SIZES = {
  xSmall: 10,
  medSmall:14,
  small: 16,
  medium2:18,
  medium: 19,
  large: 23,
  xLarge: 26,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
