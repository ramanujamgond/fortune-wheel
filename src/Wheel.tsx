import { useEffect, useState } from "react";
import WheelComponent, { Item } from "./WheelComponent";
import axios from "axios";
import useWindowSize from "react-use/lib/useWindowSize";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
const segColors = [
  "#FCC749",
  "#DE2928",
  "#3B86F1",
  "#8747D7",
  "#1C9783",
  "#70C9E9",
  "#FFF1D7",
];

interface WheelProps {
  setFormState: (value: boolean) => void;
}
function Wheel({ setFormState }: WheelProps) {
  const [segments, setSegemenmt] = useState<Item[]>([]);
  const [winning, setWinning] = useState("");
  const [winning_id, setWinningID] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const onFinished = (winner: any) => {
    setShowConfetti(true);
    Swal.fire({
      position: "bottom",
      padding: "1em",
      title: `Woohoo! You've won ${winner}!`,
      text: "Snap a screenshot or show this screen to the host to claim your prize!",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  };

  console.log(winning_id);

  // fetch items
  const fetchItem = async () => {
    try {
      const { data } = await axios.get("https://api.pripgo.com/event/items");
      if (data.status === 1) {
        console.log(data.data);
        setSegemenmt(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRandom = async () => {
    try {
      const { data } = await axios.get(
        "https://api.pripgo.com/event/items/random"
      );
      if (data.status === 1) {
        console.log(data.data);
        setWinning(data.data.item_name);
        setWinningID(data.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
    fetchRandom();
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
    <div className="flex items-center justify-center h-screen">
      {segments.length > 0 && winning && (
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment={winning}
          onFinished={(winner: any) => onFinished(winner)}
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={true}
          size={200}
          upDuration={500}
          downDuration={600}
        />
      )}
      <Confetti width={width} height={height} run={showConfetti} />
    </div>
  );
}

export default Wheel;
