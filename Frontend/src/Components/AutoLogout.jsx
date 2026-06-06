import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AutoLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        alert("Session Expired");

        navigate("/login");
      }, 5 * 60 * 1000); // 5 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return null;
}

export default AutoLogout;