import WheelComponent from "./WheelComponent";

function Wheel() {
  const segments = ["Happy", "Angry", "Sad", "Frustration", "Emptyness"];
  const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#FF9000"];
  const onFinished = (winner: any) => {
    console.log(winner);
  };

  return (
    <div id="wheelCircle">
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment=""
        onFinished={(winner: any) => onFinished(winner)}
        primaryColor="black"
        primaryColoraround="#ffffffb4"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={190}
        upDuration={50}
        downDuration={2000}
      />
    </div>
  );
}

export default Wheel;
