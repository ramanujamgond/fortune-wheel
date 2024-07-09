import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import axios from "axios";
import Swal from "sweetalert2";
export interface Item {
  id: string;
  item_name: string;
}

type WheelComponentProps = {
  segments: Item[];
  segColors: string[];
  winningSegment: string | null;
  onFinished: (segment: string) => void;
  onRotate?: () => void;
  onRotatefinish?: () => void;
  primaryColor?: string;
  primaryColoraround?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  width?: number;
  height?: number;
  userID: string;
};

const WheelComponent: React.FC<WheelComponentProps> = ({
  segments,
  segColors,
  onFinished,
  primaryColor,
  primaryColoraround,
  contrastColor,
  buttonText,
  isOnlyOnce = true,
  size = 290,
  upDuration = 1000,
  downDuration = 100,
  fontFamily = "proxima-nova",
  userID,
}) => {
  let currentSegment: string = "";
  let isStarted: boolean = false;
  const [isFinished, setFinished] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let timerHandle: number = 0;
  const timerDelay: number = segments.length;
  let angleCurrent: number = 0;
  let angleDelta: number = 0;
  let canvasContext: CanvasRenderingContext2D | null = null;
  let maxSpeed: number = Math.PI / segments.length;
  const upTime: number = segments.length * upDuration;
  const downTime: number = segments.length * downDuration;
  let spinStart: number = 0;
  let frames: number = 0;
  const centerX: number = 300;
  const centerY: number = 300;

  const spinWheel = async () => {
    try {
      const payload = {
        user_id: userID,
      };
      const { data } = await axios.post(
        "https://api.pripgo.com/event/items/spin",
        payload
      );
      if (data.status === 1) {
        return data.data.item_name;
      }
      return "";
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("click", spin);
      initCanvas();
      wheelDraw();
    }
    wheelInit();
    return () => {
      if (canvas) {
        canvas.removeEventListener("click", spin);
      }
    };
  }, [segments]);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvasContext = canvas.getContext("2d");
    }
  };
  let winningSegment = "";
  const spin = async () => {
    winningSegment = await spinWheel();
    if (!winningSegment) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No more reward is available.",
      });
      return;
    }
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segments.length;
      frames = 0;
      timerHandle = window.setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    console.log("currentSegment", currentSegment);
    console.log("winningSegment", winningSegment);

    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      if (winningSegment) {
        if (currentSegment === winningSegment && frames > segments.length) {
          progress = duration / upTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
          progress = 1;
        } else {
          progress = duration / downTime;
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        }
      } else {
        progress = duration / downTime;
        if (progress >= 0.8) {
          angleDelta =
            (maxSpeed / 1.2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else if (progress >= 0.98) {
          angleDelta =
            (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        } else
          angleDelta =
            maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      }
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    if (!canvasContext) return;
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || "white";
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.item_name.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    if (!canvasContext) return;
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor || "black";
    ctx.lineWidth = 5;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fill();
    ctx.font = "bold 2em " + fontFamily;
    ctx.fillStyle = contrastColor || "white";
    ctx.textAlign = "center";
    ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = primaryColoraround || "white";
    ctx.stroke();
  };

  const drawNeedle = () => {
    if (!canvasContext) return;
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor || "white";
    ctx.fillStyle = contrastColor || "white";
    ctx.beginPath();
    ctx.moveTo(centerX + 10, centerY - 40);
    ctx.lineTo(centerX - 10, centerY - 40);
    ctx.lineTo(centerX, centerY - 60);
    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "transparent";
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i].item_name;
    isStarted &&
      ctx.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };

  const clear = () => {
    if (!canvasContext) return;
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };

  return (
    <div id="wheel" className="">
      <canvas
        id="canvas"
        ref={canvasRef}
        width="600"
        height="600"
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
        }}
      />
    </div>
  );
};

export default WheelComponent;
