import React from 'react';

type TabBtnProps = {
    tabName: string;
    isActive: boolean;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabBtn: React.FC<TabBtnProps> = ({tabName, isActive = false, setActiveTab }) => {
//   const { tabName, isActive } = props;
  const tabClass = 'tab-' + tabName.toLowerCase();

  const handleClick = () => {
    setActiveTab(tabName.toLowerCase());
  };

  return (
    <button 
        className={`tab-btn clear-btn focus-visible ${tabClass} ${isActive ? 'active' : ''}`} 
        data-tab={tabName.toLowerCase()}
        onClick={handleClick}
    >
        {tabName}
    </button>
  )
}

export default TabBtn