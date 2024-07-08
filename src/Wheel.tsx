import { useState } from "react";
import WheelComponent, { Item } from "./WheelComponent";
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
  const [loading, setLoading] = useState(false);

  const onFinished = (winner: any) => {
    console.log(winner);
  };

  // fetch items
  const fetchItems = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment="Cap"
        onFinished={(winner: any) => onFinished(winner)}
        contrastColor="white"
        buttonText="Spin"
        primaryColoraround="red"
        isOnlyOnce={false}
        size={200}
        upDuration={500}
        downDuration={600}
      />
    </div>
  );
}

export default Wheel;
