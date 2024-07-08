import { useState } from "react";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { Button } from "./components/ui/button";

const UserSignup = () => {
  const [whatsAppNumberStatus, setWhatsAppNumberStatus] =
    useState<boolean>(false);
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="z-10 w-full max-w-5xl font-mono">
          {/* <div className="w-96 h-96 relative rounded-xl border-2 border-black">
          <Image
            src="/qrcode.svg"
            alt="Offers 1"
            fill
            className="rounded-xl object-contain"
            sizes="auto"
            loading="lazy"
          />
        </div> */}

          <div className="text-3xl font-bold text-center">
            Please provide the information to claim your surprise prize.
          </div>

          <div className="w-auto mx-auto  my-10 rounded-xl border-[1px] border-[#e5e7eb] p-6">
            <div className="my-6">
              <Input
                type="text"
                className="h-12 text-base"
                placeholder="Name"
              />
            </div>

            <div className="my-6">
              <Input
                type="email"
                className="h-12 text-base"
                placeholder="Email Id"
              />
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
            </div>

            {!whatsAppNumberStatus && (
              <div className="my-6">
                <Input
                  type="number"
                  className="h-12 text-base"
                  placeholder="Enter your whatsApp number"
                />
              </div>
            )}

            <div className="my-6">
              <Input
                type="text"
                className="h-12 text-base"
                placeholder="Property Name"
              />
            </div>

            <div className="my-6">
              <Input
                type="text"
                className="h-12 text-base"
                placeholder="Property Location"
              />
            </div>

            <div>
              <Button size={"lg"}>Submit</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default UserSignup;
