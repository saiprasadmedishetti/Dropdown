import { useEffect } from "react";
const useClickOutside = (ref, isOpen, callback) => {
  const handleClick = (e) => {
    if (isOpen && ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useClickOutside;
