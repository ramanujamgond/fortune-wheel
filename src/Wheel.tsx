import { useEffect, useState } from "react";
import WheelComponent, { Item } from "./WheelComponent";
import axios from "axios";
import useWindowSize from "react-use/lib/useWindowSize";
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
function Wheel() {
  const [segments, setSegemenmt] = useState<Item[]>([]);
  const [winning, setWinning] = useState("");
  const [winning_id, setWinningID] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const onFinished = (winner: any) => {
    setShowConfetti(true);
  };

  // fetch items
  const fetchItem = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://api.pripgo.com/event/items");
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

  const fetchRandom = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
    fetchRandom();
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
