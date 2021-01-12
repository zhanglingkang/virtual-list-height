import React, { useState } from "react";
import * as _ from "ramda";

var data = Array.from({ length: 10000 }).map((v, i) => i);

var dataHeight = data.map((v) => {
  return 30 + Math.floor(40 * Math.random());
});
console.log("334");

// export default function VirtualList() {
//   return <div>xx</div>;
// }
export default function VirtualList({ list }) {
  const itemHeight = 30;
  const containerHeight = 800;
  const getNearestIndex = (height) => {
    var total = 0;
    for (let i = 0; i < data.length; ++i) {
      total += dataHeight;
      if (total > height) {
        return i - 1;
      }
    }
    return data.length - 1;
  };
  const getVisibleData = (scrollTop) => {
    const start = getNearestIndex(scrollTop);
    const end = getNearestIndex(scrollTop + containerHeight);
    return { start, end };
  };
  const getTop = (index) => {
    return index * itemHeight;
  };
  const [visibleData, setVisibleData] = useState(getVisibleData(0));
  const onScroll = (event) => {
    console.log(
      "scroll",
      event.target.scrollTop,
      getVisibleData(event.target.scrollTop)
    );
    setVisibleData(getVisibleData(event.target.scrollTop));
  };
  const contentHeight = 10000;
  // const contentHeight = React.memo(function () {
  //   return _.sum(dataHeight);
  // }, []);
  return (
    <div className="App">
      <div
        className="container"
        style={{
          height: containerHeight,
          overflow: "auto",
          background: "#eee"
        }}
        onScroll={onScroll}
      >
        <div
          className="content-list"
          style={{ height: contentHeight, position: "relative" }}
        >
          {data.slice(visibleData.start, visibleData.end).map((v) => {
            return (
              <div
                style={{
                  height: dataHeight[v],
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  top: getTop(v)
                }}
                key={v}
              >
                <span>item</span>
                {v}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
