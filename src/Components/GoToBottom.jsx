
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
  
export default function GoToBottom() {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
      });
  }
  useEffect(() => {
    onTop()
  }, [routePath]);
  
  return null;
}