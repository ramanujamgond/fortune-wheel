import { useState } from "react";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { Button } from "./components/ui/button";
import axios from "axios";

const UserSignup = () => {
  const [whatsAppNumberStatus, setWhatsAppNumberStatus] =
    useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [userNameErrorText, setUserNameErrorText] = useState<string>("");

  const [emailId, setEmailId] = useState<string>("");
  const [emailIdErrorText, setEmailIdErrorText] = useState<string>("");

  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [phoneNumberErrorText, setPhoneNumberErrorText] = useState<string>("");

  const [whatsAppNumber, setWhatsAppNumber] = useState<number>();
  const [whatsAppNumberErrorText, setWhatsAppNumberErrorText] =
    useState<number>();

  const [propertyName, setPropertyName] = useState<string>("");

  const handleFormSubmit = () => {};
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
              />
              <span className="text-xs text-red-600 text-left w-100 block">
                {userNameErrorText}
              </span>
            </div>

            <div className="my-6">
              <Input
                type="number"
                className="h-12 text-base"
                placeholder="Mobile Number"
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
                {userNameErrorText}
              </span>
            </div>

            {!whatsAppNumberStatus && (
              <div className="my-6">
                <Input
                  type="number"
                  className="h-12 text-base"
                  placeholder="Enter your whatsApp number"
                />
                <span className="text-xs text-red-600 text-left w-100 block">
                  {userNameErrorText}
                </span>
              </div>
            )}

            <div className="my-6">
              <Input
                type="text"
                className="h-12 text-base"
                placeholder="Property Name"
              />
              <span className="text-xs text-red-600 text-left w-100 block">
                {userNameErrorText}
              </span>
            </div>

            <div className="my-6">
              <Input
                type="text"
                className="h-12 text-base"
                placeholder="Property Location"
              />
              <span className="text-xs text-red-600 text-left w-100 block">
                {userNameErrorText}
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
