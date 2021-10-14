import React, { useState } from "react";
import Heart from "react-animated-heart";
import"./likeBtn.css"

export default function LikeBtn() {
  const [isClick, setClick] = useState(false);
  return (
    <div className="LikeBtn">
      <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
    </div>
  );
}
