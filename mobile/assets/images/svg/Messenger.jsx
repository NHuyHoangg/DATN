import * as React from "react";
import Svg, { Path } from "react-native-svg";
const MessengerSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#1C8DFB"
      d="M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15Z"
    />
    <Path
      fill="#fff"
      d="m16.41 19.14-3.51-3.75L6 19.14l7.59-8.04 3.6 3.78L24 11.1l-7.59 8.04Z"
    />
  </Svg>
);
export default MessengerSvg;
