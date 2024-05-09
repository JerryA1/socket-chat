import React from "react";
// components
import SearchBox from "./SearchBox";
import SideBar from "./SideBar";

// ----------------------------------------------------------------------

const InboxPeople = () => {
  return (
    <div className="inbox_people">
      <SearchBox />

      <SideBar />
    </div>
  );
};

export default InboxPeople;
