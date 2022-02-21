import React from "react";
import { ImageBackground } from "react-native";
import pageBanner from "image/pageBanner.png";

const TitleBlock = ({ text }) => {
  return (
    <ImageBackground source={pageBanner}>
      <div
        class={
          "h-48 flex justify-center transition delay-50 duration-300 items-center text-3xl font-bold text-white " +
          (text === "" ? "absolute top-0 z-20" : "")
        }>
        {text}
      </div>
    </ImageBackground>
  );
};

export default TitleBlock;
