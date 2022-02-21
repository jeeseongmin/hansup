import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NoticeBlock = ({ notice }) => {
  const history = useHistory();

  const readThis = async (id) => {
    await axios
      .post(
        "/api/notice/read/" + id,
        { key: process.env.REACT_APP_API_KEY },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((Response) => {
        history.push("/community/notice/" + id);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <button
      onClick={() => readThis(notice._id)}
      class='text-sm md:text-base py-4 cursor-pointer transition delay-50 duration-200 hover:bg-gray-100 h-auto min-h-14 flex flex-row px-8 border-b-2 border-gray-200 justify-between items-center'>
      <div class='flex-1 truncate pr-4  '>
        <p class='w-full truncate text-left'>{notice.title}</p>
      </div>
      <div class='w-12 md:w-24 '>
        {notice.createdAt.substr(2, 8).replace(/[-]/g, ".")}
      </div>
      <div class='w-12 md:w-24 text-right md:text-center'>{notice.read}</div>
    </button>
  );
};

export default NoticeBlock;
