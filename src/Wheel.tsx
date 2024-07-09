import { useEffect, useState } from "react";
import WheelComponent, { Item } from "./WheelComponent";
import axios from "axios";
import useWindowSize from "react-use/lib/useWindowSize";
import tshirt from "../src/assets/tshirt.png";
import cap from "../src/assets/cap.png";
import coupon from "../src/assets/coupon.png";
import notepad from "../src/assets/notepad.png";
import pendrive from "../src/assets/pendrive.png";
import pen from "../src/assets/pen.png";
import free from "../src/assets/free.png";

const itemImages: any = {
  "T Shirt": tshirt,
  Cap: cap,
  Pendrive: pendrive,
  Pen: pen,
  Notepad: notepad,
  "50% Discount": coupon,
  "First year free": free,
};

import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { Loader } from "lucide-react";
const segColors = [
  "#673bb7",
  "#03a9f5",
  "#009788",
  "#8bc24a",
  "#fe5722",
  "#ff9700",
  "#ea1e53",
];

interface WheelProps {
  setFormState: (value: boolean) => void;
  userID: string;
}
function Wheel({ setFormState, userID }: WheelProps) {
  const [segments, setSegemenmt] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const size = window.innerWidth < 768 ? 200 : 300;
  const imagesize = window.innerWidth < 768 ? 100 : "auto";

  const getItemImage = (itemName: string) => {
    return itemImages[itemName] || null;
  };

  const onFinished = (winner: any) => {
    setShowConfetti(true);
    const itemImage = getItemImage(winner);
    Swal.fire({
      position: "top",
      padding: "1em",
      title: `<span style="color: #56d468; font-size: 18px;">Woohoo! You've won ${winner}!</span>`,
      html: '<span style="color: #bfbfbf; font-size: 14px;">Snap a screenshot or show this screen to the host to claim your prize!</span>',
      imageUrl: itemImage,
      imageAlt: `${"winner"} Image`,
      imageHeight: imagesize,
      allowOutsideClick: false,
      showConfirmButton: false,
      customClass: {
        container: "swal-width",
        image: "swal-image",
        title: "swal-title",
        htmlContainer: "swal-title",
      },
    });
  };
  // fetch items
  const fetchItem = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://api.pripgo.com/event/wheel_items"
      );
      if (data.status === 1) {
        console.log(data.data);
        setSegemenmt(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      console.log("User attempted to reload or close the page.");
      // Prompt the user with a confirmation dialog
      event.preventDefault();
      event.returnValue = ""; // For older browsers
    };

    const handleUnload = () => {
      console.log("User confirmed the reload or close action.");
      setFormState(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      {loading && (
        <div className="flex items-center gap-2">
          <Loader className="animate-spin" />
          Loading...
        </div>
      )}
      {!loading && segments.length > 0 && (
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment={""}
          onFinished={(winner: any) => onFinished(winner)}
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={true}
          size={size}
          upDuration={500}
          downDuration={600}
          userID={userID}
        />
      )}
      <Confetti width={width} height={height} run={showConfetti} />
    </div>
  );
}

export default Wheel;
