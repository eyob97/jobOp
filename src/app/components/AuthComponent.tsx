
import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import { SignIn } from "phosphor-react";

const ClientComponent: React.FC = () => {
  const [authMode, setAuthMode] = useState<"signIn" | "signUp">("signIn");

  const toggleAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === "signIn" ? "signUp" : "signIn"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
       test
      </Card>
    </div>
  );
};

export default ClientComponent;
