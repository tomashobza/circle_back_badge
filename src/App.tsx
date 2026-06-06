// import Badge from "./Badge";
import { useRef } from "react";
import reactLogo from "./assets/react.svg";
import badgeBg from "./assets/badge_bg.jpg";

function App() {
  // return <Badge />;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const img = new Image();
  img.onload = async () => {
    await document.fonts.load('100 64px "Geist Mono"');
    await document.fonts.load('400 24px "Inter"');
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);

        // name display
        ctx.fillStyle = "white";
        ctx.font = '100 64px "Geist Mono"';
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Adam", 30, 90);
        ctx.fillText("Realperson", 30, 164);

        // position display
        ctx.fillStyle = "white";
        ctx.font = '400 24px "Inter"';
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Intern", 33, 244);

        // team display
        ctx.fillStyle = "white";
        ctx.font = '400 16px "Inter"';
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("product strategy".toUpperCase(), 33, 271);

        // employee id display
        ctx.fillStyle = "black";
        ctx.font = '400 24px "Inter"';
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("MRD-3107", 104.5, 375);

        // xp display
        ctx.fillStyle = "black";
        ctx.font = '400 24px "Inter"';
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("167", 256, 375);

        // hire date display
        ctx.fillStyle = "black";
        ctx.font = '400 24px "Inter"';
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("Jun 2026", 407.5, 375);

        // -- performance profile display --
        const barWidth = 264;
        const ygap = 28;
        const baseY = 474;

        const visibility = 42; // example visibility value between 0 and 1
        const reputation = 61;
        const polCapital = 38;
        const competence = 70;
        const wellbeing = 25;
        const performanceMetrics = [
          visibility,
          reputation,
          polCapital,
          competence,
          wellbeing,
        ];
        const colors = ["#FF6B6B", "#F7B801", "#6BCB77", "#4D96FF", "#9D4EDD"];

        // visibility

        for (const [i, metric] of performanceMetrics.entries()) {
          // bar
          ctx.fillStyle = colors[i];
          ctx.fillRect(166, 474 + i * ygap, 264 * (metric / 100), 9);

          // value
          ctx.fillStyle = "black";
          ctx.font = '600 16px "Inter"';
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          ctx.fillText(`${metric}`, 478, baseY + i * ygap + 4.5);
        }
        // ctx.fillRect(166, 474, 264, 9);
      }
    }
  };
  img.src = badgeBg; // just use the URL directly

  console.log("Image src:", img.src); // Log the image source to verify it's correct

  return (
    <div>
      {/* <img src={reactLogo} alt="React logo" /> */}
      <canvas
        style={{ border: "1px solid #000" }}
        ref={canvasRef}
        width={1024}
        height={1024}
        id="myCanvas"
      ></canvas>
    </div>
  );
}

export default App;
