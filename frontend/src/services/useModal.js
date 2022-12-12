import { useState } from "react";

const usePicto = () => {
  const [showPicto, setShowPicto] = useState(false);

  function toggle() {
    setShowPicto(!showPicto);
  }

  return {
    showPicto,
    toggle,
  };
};

export default usePicto;
