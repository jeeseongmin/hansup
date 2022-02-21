import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FastLink = () => {
  const location = useLocation();
  const [focusTab, setFocusTab] = useState(false);
  const [viewTab, setViewTab] = useState(false);
  useEffect(() => {
    console.log(focusTab);
  }, [focusTab]);

  useEffect(() => {
    const tabEvent = async (e) => {
      if (e.key === "Tab" && focusTab) {
        setFocusTab(true);
      }
    };

    document.addEventListener("keydown", tabEvent);

    // 컴포넌트 종료 후에도 event trigger 체크하는 것을 방지하기 위해 eventListener 종료
    return () => {
      document.removeEventListener("keydown", tabEvent);
    };
  });

  /**
   * 1. focus가 발생하더라도 tab 이벤트일 때만 보이도록 해야한다.
   * 2. 따라서 focusTab으로 판단하면 안되고, viewTab로 판단해야 한다.
   */

  useEffect(() => {
    setViewTab(focusTab);
  }, [focusTab]);

  const fastLinkObject = {
    text: "본문 바로가기",
    url: "/",
  };

  const fastGo = () => {
    console.log("shortcut Go");
    document.getElementById("shortcut").focus();
  };

  return (
    <div class={"mt-0 absolute z-50 top-0 left-0 w-full "}>
      <button
        id='fastlink'
        title={fastLinkObject.text}
        class={
          "absolute left-0 top-0 bg-black text-gray-200 py-2 px-2 font-bold  " +
          (viewTab ? "h-auto" : "w-0 h-0 overflow-hidden px-0 py-0 -top-4")
        }
        onClick={fastGo}
        onFocus={() => setFocusTab(true)}
        onBlur={() => setFocusTab(false)}>
        {fastLinkObject.text}
      </button>
    </div>
  );
};

export default FastLink;
