"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal/Modal";
import { Heading, Text } from "@/components/ui/Typography";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email) return;
    setLoading(true);
    // simulate network call
    await new Promise((r) => setTimeout(r, 800));
    setShowToast("Link will be sent to your registered email id");
    setLoading(false);
    setTimeout(() => setShowToast(""), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[url('/bg/forgetpassword.png')] bg-cover bg-center overflow-auto">
      {/* logo at top-left */}
      <img
        src="/logo.png"
        alt="UPNIX logo"
        className="fixed top-8 left-28 w-36 h-auto z-50"
      />
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        {/* Removed 'text-center' to align content to the left */}
        <div>
          <Heading
            level={2}
            className="text-lg font-semibold mb-2 font-secondary"
          >
            Forgot Your Password?
          </Heading>

          <Text className="text-sm text-gray-500 mb-8 font-tertiary">
            Enter the registered email and we&#39;ll email you the verification
            link to reset your password
          </Text>
        </div>

        {/* Form Section */}
        <div>
          {/* Added mb-2 for spacing below label */}
          <label className="block text-xs text-gray-600 mb-2 font-tertiary">
            Email
          </label>

          <Input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-tertiary"
          />

          {/* Increased margin top to mt-6 for better spacing below input */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleSend}
            loading={loading}
            className="mt-6 font-tertiary text-sm font-medium"
          >
            Send Verification Link <span className="ml-1">›</span>
          </Button>

          {/* Removed 'text-center' and adjusted margin top */}
          <Text className="text-xs text-gray-400 mt-3 font-tertiary">
            Link will be sent to your registered email id
          </Text>
        </div>
      </div>
      <Modal
        isOpen={!!showToast}
        onClose={() => setShowToast("")}
        message={showToast}
        imageSrc="/icons/send.png"
        size="xs"
      />
    </div>
  );
}
