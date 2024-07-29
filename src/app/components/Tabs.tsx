// src/app/components/Tabs.tsx
import React from "react";

interface TabsProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${selectedTab === "email" ? "active" : ""}`}
        onClick={() => onSelectTab("email")}
      >
        Email
      </button>
      <button
        className={`tab ${selectedTab === "whatsapp" ? "active" : ""}`}
        onClick={() => onSelectTab("whatsapp")}
      >
        WhatsApp
      </button>
    </div>
  );
};

export default Tabs;
