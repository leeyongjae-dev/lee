import React from 'react';

const HeaderLayout = (props) => {
  return (
    <header id="header">
      <div id="sub-mv" className={props.headerClass}>
        <div className="inner">
          <h2>{props.headerText}</h2>
          <div className="sub-obj">오브젝트</div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
