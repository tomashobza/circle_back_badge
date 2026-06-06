// import Badge from "./Badge";
import { useRef } from "react";
import badgeBg from "./assets/badge_bg.jpg";
import QRCode from "qrcode";

interface BadgeProps {
  name: string;
  position: string;
  team: string;
  employeeId: string;
  xp: number;
  hireDate: string;
  performanceMetrics: {
    visibility: number;
    reputation: number;
    polCapital: number;
    competence: number;
    wellbeing: number;
  };
  referralCode: string;
}

const defaultBadgeProps: BadgeProps = {
  name: "Adam Realperson",
  position: "Intern",
  team: "product strategy",
  employeeId: "MRD-3107",
  xp: 167,
  hireDate: "Jun 2026",
  performanceMetrics: {
    visibility: 42,
    reputation: 61,
    polCapital: 38,
    competence: 70,
    wellbeing: 25,
  },
  referralCode: "REF-12345",
};

async function drawContent(ctx: CanvasRenderingContext2D, props: BadgeProps) {
  // name display
  const nameParts = props.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");
  ctx.fillStyle = "white";
  ctx.font = '100 64px "Geist Mono"';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(firstName, 30, 90);
  ctx.fillText(lastName, 30, 164);

  // position display
  ctx.fillStyle = "white";
  ctx.font = '400 24px "Inter"';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(props.position, 33, 244);

  // team display
  ctx.fillStyle = "white";
  ctx.font = '400 16px "Inter"';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(props.team.toUpperCase(), 33, 271);

  // employee id display
  ctx.fillStyle = "black";
  ctx.font = '400 24px "Inter"';
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(props.employeeId, 104.5, 375);

  // xp display
  ctx.fillStyle = "black";
  ctx.font = '400 24px "Inter"';
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(props.xp.toString(), 256, 375);

  // hire date display
  ctx.fillStyle = "black";
  ctx.font = '400 24px "Inter"';
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(props.hireDate, 407.5, 375);

  // -- performance profile display --
  const barWidth = 264;
  const ygap = 28;
  const baseY = 474;

  const visibility = props.performanceMetrics.visibility; // example visibility value between 0 and 1
  const reputation = props.performanceMetrics.reputation;
  const polCapital = props.performanceMetrics.polCapital;
  const competence = props.performanceMetrics.competence;
  const wellbeing = props.performanceMetrics.wellbeing;
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
    ctx.fillRect(166, 474 + i * ygap, barWidth * (metric / 100), 9);

    // value
    ctx.fillStyle = "black";
    ctx.font = '600 16px "Inter"';
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(`${metric}`, 478, baseY + i * ygap + 4.5);
  }

  // draw invite qr code
  const baseUrl = "https://circle.com/ref/";
  const qrCanvas = document.createElement("canvas");
  await QRCode.toCanvas(qrCanvas, `${baseUrl}${props.referralCode}`, {
    width: 103,
    margin: 0,
  });

  ctx.drawImage(qrCanvas, 97, 637, 103, 103);

  // draw label
  ctx.fillStyle = "black";
  ctx.font = '400 16px "Inter"';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`ID: ${props.employeeId} · circle back`, 210, 637);

  // draw link
  ctx.fillStyle = "#7C7C7C";
  ctx.font = '400 16px "Inter"';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(`circle.com/ref/${props.referralCode}`, 210, 656);
}

function App() {
  // return <Badge />;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imageLoaded = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const img = new Image();
  img.onload = async () => {
    await document.fonts.load('100 64px "Geist Mono"');
    await document.fonts.load('400 24px "Inter"');
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 1024; // pixel buffer
      canvas.height = 1024;
      canvas.style.width = "500px"; // display size
      // canvas.style.height = "200px";
      // const desiredWidth = 1024;
      // const desiredHeight = 1024;
      // const scaleX = 200 / desiredWidth;
      // const scaleY = 200 / desiredHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // ctx.scale(scaleX, scaleY);
        ctx.drawImage(img, 0, 0);
        await drawContent(ctx, defaultBadgeProps);

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
        // width={200}
        // height={200}
        id="myCanvas"
      ></canvas>
    </div>
  );
}

export default App;
