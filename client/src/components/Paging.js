import React, { useEffect, useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

const Paging = (props) => {
  const [arr, setArr] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(5);
  const setPage = props.setPage;
  const page = props.page;
  const total = props.total;
  useEffect(() => {
    let _arr = [];
    for (let i = 1; i <= total; i++) {
      if (i <= total) {
        _arr.push(i);
      }
    }
    setArr(_arr);
  }, [page, total]);

  const nextPage = () => {
    const cp = end + 1;
    setPage(cp);
    const _start = end + 1;
    setStart(_start);
    const _end = end + 5;
    if (total < end) setEnd(total);
    else setEnd(_end);
  };
  const prevPage = () => {
    const cp = start - 1;
    setPage(cp);

    const _end = start - 1;
    setEnd(_end);
    const _start = start - 5;

    if (1 < _start) {
      setStart(_start);
    } else {
      setStart(1);
    }
  };

  function PageBtn(props) {
    const current = props.current;
    return (
      <button
        onClick={() => setPage(current)}
        title={page === current ? "현재 페이지" : ""}
        class={
          "mr-2 w-8 h-8 transition delay-50 duration-300 flex justify-center items-center cursor-pointer " +
          (page === current
            ? "text-white border-2 border-hansupBrown bg-hansupBrown  "
            : "border border-gray-300 text-gray-300 hover:bg-hansupBrown hover:text-white")
        }>
        {current}
      </button>
    );
  }

  function LeftBtn() {
    return start !== 1 ? (
      <div class='mr-2 cursor-pointer' onClick={prevPage}>
        <VscChevronLeft />
      </div>
    ) : null;
  }

  function RightBtn() {
    return end < total ? (
      <div class='cursor-pointer' onClick={nextPage}>
        <VscChevronRight />
      </div>
    ) : null;
  }

  return (
    <div class='flex flex-row w-full justify-center items-center lg:w-auto mb-4 lg:mb-0'>
      <LeftBtn />
      {arr.map((element, index) => {
        if (start <= element && element <= end) {
          return <PageBtn current={element} key={element} />;
        }
      })}
      <RightBtn />
    </div>
  );
};

export default Paging;
