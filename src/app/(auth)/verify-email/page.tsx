"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/authStore";
import { sendEmailOtp, verifyEmailOtp } from "@/features/auth/services/verificationService";
import { tokenManager } from "@/features/auth/utils/tokenManager";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal/Modal";
import { ChevronDown } from "lucide-react";

function formatTimer(seconds: number) {
  if (seconds <= 0) return "";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const EmailVerificationPage: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, setAuthenticated } = useAuthStore();
  const email = user?.email || "";

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (user?.email_verified) {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOtpSentModal, setShowOtpSentModal] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    if (index >= 0 && index < 6) {
      inputRefs.current[index]?.focus();
    }
  };

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    setError(false);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handleSendOtp = async () => {
    if (!email) return;
    setLoadingSend(true);
    try {
      await sendEmailOtp(email);
      setShowOtpSentModal(true);
      setTimeout(() => setShowOtpSentModal(false), 2500);
      setTimer(180); 
      setOtp(Array(6).fill(""));
      setError(false);
      setTimeout(() => focusInput(0), 100);
    } catch (e: any) {
      toast.error(e?.message || "Failed to send OTP.");
    } finally {
      setLoadingSend(false);
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return;

    setLoadingVerify(true);
    try {
      await verifyEmailOtp(email, fullOtp);
      // Persist the verified flag so page refreshes don't redirect back to /verify-email
      tokenManager.setEmailVerified(true);
      if (user) setAuthenticated(true, { ...user, email_verified: true });
      setShowSuccessModal(true);
      setTimeout(() => router.push("/"), 2000);
    } catch (err: any) {
      setError(true);
      setOtp(Array(6).fill(""));
      focusInput(0);
    } finally {
      setLoadingVerify(false);
    }
  };

  if (!isAuthenticated && !email) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[url('/bg/forgetpassword.png')] bg-cover bg-center font-sans overflow-auto">
      <img src="/logo.png" alt="UPNIX logo" className="fixed top-8 left-28 w-36 h-auto z-50" />

      <div className="w-full max-w-md flex flex-col items-center mb-8">
        <h1 className="text-3xl font-primary font-bold text-[#333] mb-8">Verification</h1>
        <div className="w-full flex flex-col items-center px-4">
          <div className="flex justify-around w-full mb-2">
            <span className="text-sm font-tertiary font-medium text-gray-800">Email Verification</span>
            <span className="text-sm font-tertiary font-medium text-gray-400">Phone Verification</span>
          </div>
          <div className="relative w-1/2 h-1 bg-gray-200 rounded-full mt-4">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-blue-500 rounded-full"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-blue-800 border-8 border-blue-500 rounded-full shadow-sm z-10"></div>
            <div className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-8 border-gray-300 rounded-full shadow-sm z-10"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md border border-gray-50 mt-4">
        <h2 className="text-lg font-secondary font-semibold text-gray-500 mb-6">Verify Your Email</h2>
        
        <div className="mb-6">
          <label className="block font-tertiary text-sm font-light text-gray-400 mb-2 tracking-wide">Registered Email</label>
          <Input type="email" value={email} disabled className="bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed py-3 rounded-lg" />
        </div>

        <div className="mb-4">
          <Button
            variant="primary"
            fullWidth
            disabled={loadingSend || timer > 0}
            onClick={handleSendOtp}
            loading={loadingSend}
            className={`text-white py-3 rounded-xl font-semibold shadow-md transition-all flex items-center justify-center gap-2 
      ${timer > 0 
        ? 'bg-[#E0E0E0] !text-gray-500' 
        : 'bg-gradient-to-r from-[#0B2A6D] via-[#651C96] to-[#FF9AFC]'
      }`}
  >
    Send OTP
    {timer <= 0 && <ChevronDown className="w-5 h-5" />}
  </Button>
          {timer <= 0 && <p className="text-sm font-tertiary text-gray-500 mt-2 ">OTP will be sent to your registered email id</p>}
        </div>

        {timer > 0 && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-500">
           
          <label className="block text-xs font-tertiary text-gray-400 mb-2 tracking-wide"> Please enter the code sent on <span className="text-gray-600 font-medium">{email}</span></label>

            <div className="flex justify-between gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-14 text-center text-xl font-bold rounded-xl border transition-all outline-none
                    ${error ? 'border-red-500 bg-red-50' : digit ? 'border-blue-500 ring-2 ring-blue-50' : 'border-gray-200'}
                  `}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-1">
                {error ? (
                  <>
                    <span className="text-[10px] text-red-500">The OTP code you have entered is invalid.</span>
                    <button onClick={() => { handleSendOtp(); }} className="text-[10px] text-blue-600 font-bold hover:underline">Resend OTP ↻</button>
                  </>
                ) : (
                  <span className="text-sm font-tertiary text-gray-500">OTP has been sent to your registered email id</span>
                )}
              </div>
              <span className="text-sm font-bold text-blue-600 whitespace-nowrap">{formatTimer(timer)}</span>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={handleVerify}
              loading={loadingVerify}
              disabled={otp.join("").length < 6}
              className="py-3 rounded-xl font-semibold shadow-md text-white bg-gradient-to-r from-[#0B2A6D] via-[#651C96] to-[#FF9AFC] flex items-center justify-center gap-1"
    >
              Verify OTP <ChevronDown className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} imageSrc="/icons/success.png" title="Email Verified Successfully" />

      {/* OTP Sent Modal */}
      <Modal
        isOpen={showOtpSentModal}
        onClose={() => setShowOtpSentModal(false)}
        imageSrc="/icons/send.png"
        imageAlt="OTP Sent"
        imageWidth={50}
        imageHeight={50}
        title="OTP has been sent to your registered email id"
        showButton={false}
        size="sm"
        closeOnBackdrop={true}
      />
    </div>
  );
};

export default EmailVerificationPage;
