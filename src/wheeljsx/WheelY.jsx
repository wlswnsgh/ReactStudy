import React, { useEffect, useState } from 'react';
import "../wheelcss/wheelY.css";

function WheelY() {
    const [messageIndex, setMessageIndex] = useState(0); // 메시지 인덱스 상태로 초기화
    const [color, setColor] = useState(''); // 색상 상태 초기화

    const messages = [
      'Scrolled Down',
      'Scrolled Up',
      'Keep Going!',
      'Nice Scroll!',
      'You are scrolling!',
    ];

    const colors = [
      'blue',   // Scrolled Down에 대한 색상
      'red',    // Scrolled Up에 대한 색상
      'green',  // Keep Going!에 대한 색상
      'orange', // Nice Scroll!에 대한 색상
      'purple', // You are scrolling!에 대한 색상
    ];

    const handleWheel = (event) => {
        event.preventDefault(); // 기본 스크롤 동작 방지

        if (event.deltaY > 0) {
          // 아래로 스크롤
          // 인덱스가 배열의 길이를 초과하거나 0보다 작아지지 않도록 모듈로 연산(%)을 사용합니다.
          setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        } else {
          // 위로 스크롤
          setMessageIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
        }

        // 색상 업데이트
        setColor(colors[messageIndex]);
    };

    useEffect(() => {
      console.log(messages[messageIndex]);
      setColor(colors[messageIndex]);
    }, [messageIndex]);

    return (
        <div className='outer' onWheel={handleWheel} style={{ background: color }}>
            {messages[messageIndex]}
        </div>
    );
}

export default WheelY;
