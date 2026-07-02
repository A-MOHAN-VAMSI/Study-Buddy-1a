import { useEffect, useState } from "react";

function Timer({ onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (onTimeUp) {
            onTimeUp();
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <h2 style={{ color: "red" }}>
      ⏰ {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </h2>
  );
}

export default Timer;