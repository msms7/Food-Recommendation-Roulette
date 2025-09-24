// 데이터 읽기 (index.html에서 data-*로 넘긴 값)
const container = document.getElementById("roulette-container");
const foods = JSON.parse(container.dataset.foods);
const foodMessages = JSON.parse(container.dataset.foodMessages);

// 캔버스/요소
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const resultP = document.getElementById("result");

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = canvas.width / 2;
const arc = (2 * Math.PI) / foods.length;

let startAngle = 0;   // 현재 바퀴 각도(라디안)
let spinning = false;

// 뉴트럴/심플 팔레트
const colors = [
  "#ECEFF1", "#DFE5E8", "#E8ECEF", "#D7DEE2",
  "#EDEDED", "#DADFE3", "#E6EAEC", "#D3DADE",
  "#F0F2F4", "#E2E7EA", "#EEF1F3", "#D6DCE0",
  "#E9ECEF", "#DDE2E6", "#F3F5F7", "#CCD5DA"
];

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 섹터 그리기
  for (let i = 0; i < foods.length; i++) {
    const start = startAngle + i * arc;
    const end = start + arc;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();

    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    // 구분선
    ctx.strokeStyle = "#B0BEC5";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 텍스트
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(foods[i], radius - 12, 6);
    ctx.restore();
  }
}

// 이징: easeOutCubic
const easeOut = t => 1 - Math.pow(1 - t, 3);

// 3초 동안 회전하고 랜덤 각도로 멈추기
function spin3sec() {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;

  const initial = startAngle % (2 * Math.PI);
  const extraRotations = 5 + Math.random() * 2;      // 5~7바퀴
  const randomStop = Math.random() * 2 * Math.PI;    // 랜덤 정지 오프셋
  const target = initial + extraRotations * 2 * Math.PI + randomStop;

  const duration = 3000; // 3초
  const t0 = performance.now();

  function frame(now) {
    const p = Math.min((now - t0) / duration, 1);
    const eased = easeOut(p);
    startAngle = initial + (target - initial) * eased;

    drawWheel();

    if (p < 1) {
      requestAnimationFrame(frame);
    } else {
      spinning = false;
      spinBtn.disabled = false;
      showResult();
    }
  }

  requestAnimationFrame(frame);
}

function showResult() {
  // 바늘이 위(12시) 방향을 가리킨다고 가정 → +90도 보정
  const degrees = (startAngle * 180 / Math.PI + 90) % 360;
  const sectorDeg = 360 / foods.length;
  const index = Math.floor(((360 - degrees + 360) % 360) / sectorDeg) % foods.length;

  const pick = foods[index];
  const msg = foodMessages[pick] || "";
  resultP.innerHTML = `🎉 오늘의 추천: <strong>${pick}</strong><br>${msg}`;
}

spinBtn.addEventListener("click", spin3sec);

// 최초 그리기
drawWheel();
