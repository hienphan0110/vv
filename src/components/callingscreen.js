import React, { Component } from "react";
import { useState, useEffect } from "react";

// import "../styles/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCamera,
  faContactBook,
  faContactCard,
  faDonate,
  faFaceDizzy,
  faFaceTired,
  faHandDots,
  faHockeyPuck,
  faKey,
  faKeyboard,
  faList,
  faList12,
  faListAlt,
  faListDots,
  faListNumeric,
  faMicrophone,
  faPhone,
  faSpellCheck,
  faThList,
  faUser,
  faVideoCamera,
  faVideoSlash,
  faVolumeControlPhone,
  faVolumeHigh,
  faVolumeMute,
  faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";

function CallingScreen({ phoneNumber, onEndCall }) {
  const [showCalling, setShowCalling] = useState(true);
  const [countdownVisible, setCountdownVisible] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const toggleSpeaker = () => {
    setIsActive((prevActive) => !prevActive); // Đảo ngược trạng thái khi nhấn
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCalling(false); // Ẩn chữ "Calling..."
      setCountdownVisible(true); // Hiện thị số đếm
      setCountdown(1); // Bắt đầu đếm từ 0
    }, 3000); // Sau 3 giây

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  useEffect(() => {
    if (countdownVisible) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev + 1); // Tăng số đếm mỗi giây
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval
    }
  }, [countdownVisible]);

  const formatCountdown = (count) => {
    const minutes = String(Math.floor(count / 60)).padStart(2, "0"); // Tính phút
    const seconds = String(count % 60).padStart(2, "0"); // Tính giây
    return minutes + ":" + seconds; // Trả về định dạng 00:00
  };
  return (
    <div className="container">
      <div className="header2">
        <h1>{phoneNumber}</h1>
        {showCalling ? (
          <h1 className="calling">Calling...</h1>
        ) : (
          <h1 className="countdown">{formatCountdown(countdown)}</h1> // Hiển thị số đếm
        )}
      </div>
      <div className="content">
        <div className="icon">
          <FontAwesomeIcon className="con" icon={faMicrophone} />
          <h3 className="ttt">mute</h3>
        </div>
        <div className="icon">
          <FontAwesomeIcon className="con" icon={faListDots} />
          <h3 className="ttt">keypath</h3>
        </div>
        <div
          className={"icon speaker " + (isActive ? "active" : "")}
          onClick={toggleSpeaker}
        >
          <FontAwesomeIcon className="con " icon={faVolumeHigh} />
          <FontAwesomeIcon
            className="con"
            icon={faVolumeHigh}
            style={{
              color: isActive ? "black" : "inherit",
            }}
          />
          <h3 className="ttt">speaker</h3>
        </div>
        <div className="icon">
          <FontAwesomeIcon className="con mn" icon={faAdd} />
          <h3 className="ttt">add call</h3>
        </div>
        <div className="icon">
          <FontAwesomeIcon className="con mn" icon={faVideoCamera} />
          <h3 className="ttt">FaceTime</h3>
        </div>
        <div className="icon">
          <FontAwesomeIcon className="con" icon={faUser} />
          <h3 className="ttt">contacts</h3>
        </div>
      </div>

      <div className="footer">
        <div className="footer2" onClick={onEndCall}>
          <div>
            <FontAwesomeIcon className="iconend" icon={faPhone} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallingScreen;
