import React from "react";

const PageLayout = ({ children, main }) => {
  return (
    <div id={main ? "main" : ""} class='flex flex-col pt-12'>
      {children}
    </div>
  );
};

export default PageLayout;
