import { Button } from "flowbite-react";
import React from "react";

interface TabsProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="tabs">
      <Button
        className={`tab ${selectedTab === "email" ? "active" : ""}`}
        onClick={() => onSelectTab("email")}
      >
        Email
      </Button>
      <Button
        className={`tab ${selectedTab === "whatsapp" ? "active" : ""}`}
        onClick={() => onSelectTab("whatsapp")}
      >
        WhatsApp
      </Button>
    </div>
  );
};

export default Tabs;
