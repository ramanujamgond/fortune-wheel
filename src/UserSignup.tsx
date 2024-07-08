import { useState } from "react";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { Button } from "./components/ui/button";
import axios from "axios";
import Swal from "sweetalert2";

interface ClearErrorAfterTimeoutProps {
  setError: (value: string) => void;
}
const clearErrorAfterTimeout = ({ setError }: ClearErrorAfterTimeoutProps) => {
  setTimeout(() => {
    setError("");
  }, 3000);
};

interface UserSignupProps {
  setFormState: (value: boolean) => void;
  setWheelState: (value: boolean) => void;
}

const UserSignup = ({ setFormState, setWheelState }: UserSignupProps) => {
  const [whatsAppNumberStatus, setWhatsAppNumberStatus] =
    useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [userNameErrorText, setUserNameErrorText] = useState<string>("");

  const [emailId, setEmailId] = useState<string>("");
  const [emailIdErrorText, setEmailIdErrorText] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [phoneNumberErrorText, setPhoneNumberErrorText] = useState<string>("");

  const [whatsAppNumber, setWhatsAppNumber] = useState<string>();
  const [whatsAppNumberErrorText, setWhatsAppNumberErrorText] =
    useState<string>("");

  const [propertyName, setPropertyName] = useState<string>("");
  const [propertyNameErrorText, setPropertyNameErrorText] =
    useState<string>("");

  const [propertyLocation, setPropertyLocation] = useState<string>("");
  const [propertyLocationErrorText, setPropertyLocationErrorText] =
    useState<string>("");

  const handleFormSubmit = async () => {
    if (!userName || userName.length === 0) {
      setUserNameErrorText("Enter the guest name.");
      clearErrorAfterTimeout({ setError: setUserNameErrorText });
      return;
    }

    if (userName.length < 3) {
      setUserNameErrorText("Guest name must be at least 2 characters long.");
      clearErrorAfterTimeout({ setError: setUserNameErrorText });
      return;
    }

    if (!emailId) {
      setEmailIdErrorText("Email id is required.");
      clearErrorAfterTimeout({ setError: setEmailIdErrorText });
      return;
    }

    // regx to check for the valid email id
    const validEmailId = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmailId.test(emailId)) {
      setEmailIdErrorText("Enter a valid email address.");
      clearErrorAfterTimeout({ setError: setEmailIdErrorText });
      return;
    }

    if (!phoneNumber) {
      setPhoneNumberErrorText("Mobile number is required.");
      clearErrorAfterTimeout({ setError: setPhoneNumberErrorText });
      return;
    }

    if (!whatsAppNumberStatus) {
      if (!whatsAppNumber) {
        setWhatsAppNumberErrorText("WhatsApp number is required.");
        clearErrorAfterTimeout({ setError: setWhatsAppNumberErrorText });
        return;
      }
    }

    if (!propertyName) {
      setPropertyNameErrorText("Property name is required.");
      clearErrorAfterTimeout({ setError: setPropertyNameErrorText });
      return;
    }

    if (!propertyLocation) {
      setPropertyLocationErrorText("Property Location is required.");
      clearErrorAfterTimeout({ setError: setPropertyLocationErrorText });
      return;
    }

    const payload = {
      full_name: userName,
      email_id: emailId,
      mobile_no: phoneNumber,
      whatsapp_no: whatsAppNumber ? whatsAppNumber : phoneNumber,
      property_name: propertyName,
      property_location: propertyLocation,
    };

    try {
      const userSubmitResponse = await axios.post(
        `https://api.pripgo.com/event/users`,
        payload
      );
      if (userSubmitResponse.data.status === 1) {
        setFormState(false);
        setWheelState(true);
      } else if (userSubmitResponse.data.status === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: userSubmitResponse.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      new Error("Unable to create user");
    }
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="z-10 w-full max-w-5xl font-mono">
          <div className="text-3xl font-bold text-center">
            Please provide the information to claim your surprise prize.
          </div>

          <div className="w-auto mx-auto  my-10 rounded-xl border-[1px] border-[#e5e7eb] p-6">
            <div className="my-6">
              <Input
                type="text"
                className="h-12 text-base"
                placeholder="Name"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <span className="text-xs text-red-600 text-left w-100 block">
                {userNameErrorText}
              </span>
            </div>

            <div className="my-6">
              <Input
                type="email"
                className="h-12 text-base"
                placeholder="Email Id"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
              <span className="text-xs text-red-600 text-left w-100 block">
                {emailIdErrorText}
              </span>
            </div>

            <div className="my-6">
              <Input
                type="number"
                className="h-12 text-base"
                placeholder="Mobile Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <div className="flex items-center justify-betweens w-100 space-x-2 my-3 mx-2">
                <Checkbox
                  id="whatsApp"
                  checked={whatsAppNumberStatus}
                  onCheckedChange={() =>
                    setWhatsAppNumberStatus((prev) => !prev)
                  }
                />
                <label
                  htmlFor="whatsApp"
                  className="text-sm font-medium text-blue-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  This number is WhatsApp number
                </label>
              </div>
              <span className="text-xs text-red-600 text-left w-100 block">
                {phoneNumberErrorText}
              </span>
            </div>

            {!whatsAppNumberStatus && (
              <div className="my-6">
                <Input
                  type="number"
                  className="h-12 text-base"
                  placeholder="Enter your whatsApp number"
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                />
                <span className="text-xs text-red-600 text-left w-100 block">
                  {whatsAppNumberErrorText}
                </span>
              </div>
            )}

            <div className="my-6">
              <Input
                type="text"
                className="h-12 text-base"
                placeholder="Property Name"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
              />
              <span className="text-xs text-red-600 text-left w-100 block">
                {propertyNameErrorText}
              </span>
            </div>

            <div className="my-6">
              <Input
                type="text"
                className="h-12 text-base"
                placeholder="Property Location"
                value={propertyLocation}
                onChange={(e) => setPropertyLocation(e.target.value)}
              />
              <span className="text-xs text-red-600 text-left w-100 block">
                {propertyLocationErrorText}
              </span>
            </div>

            <div>
              <Button size={"lg"} onClick={handleFormSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default UserSignup;
