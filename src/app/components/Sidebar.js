import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ hasLoaded, handleClick }) {
  return (
    <div className="Sidebar">
      <h1 className="Sidebar-title">
        <span>Dad</span> Jokes
      </h1>
      <img
        src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
        alt="laughing emoji"
      />
      <button
        className="Sidebar-getmore"
        onClick={handleClick}
        disabled={!hasLoaded}
      >
        {hasLoaded ? 'Fetch Jokes' : 'Fetching Jokes'}
      </button>
    </div>
  );
}

export default Sidebar;
