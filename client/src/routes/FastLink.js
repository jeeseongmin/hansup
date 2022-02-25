import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const FastLink = () => {
  const location = useLocation();
  const [focusTab, setFocusTab] = useState(false);
  const [viewTab, setViewTab] = useState(false);

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

  useEffect(() => {
    setViewTab(focusTab);
  }, [focusTab]);

  const fastLinkObject = {
    text: "본문 바로가기",
    url: "/",
  };

  return (
    <div class={"mt-0 absolute z-50 top-0 left-0 w-full "}>
      <a
        title='본문 바로가기'
        class={
          "absolute left-0 top-0 bg-black text-gray-200 py-2 px-2 font-bold  " +
          (viewTab ? "h-auto" : "w-0 h-0 overflow-hidden px-0 py-0 -top-4")
        }
        href='#main'
        onFocus={() => setFocusTab(true)}
        onBlur={() => setFocusTab(false)}>
        본문 바로가기
      </a>
    </div>
  );
};

export default FastLink;
