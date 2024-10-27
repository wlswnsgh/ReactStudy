import React, { useEffect, useState } from 'react';
import "../wheelcss/wheelY.css";

function WheelY() {
    const [message, setMessage] = useState(''); // 메시지 상태로 초기화
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

        const randomIndex = Math.floor(Math.random() * messages.length);
        const newMessage = messages[randomIndex];
        const newColor = colors[randomIndex];

        if (event.deltaY > 0) {
          setMessage(newMessage); // 아래로 스크롤
          setColor(newColor); 
        } else {
          setMessage(newMessage); // 위로 스크롤
          setColor(newColor);
        }

        // deltaY wheel을 아래로 굴림	아래로(다음 페이지)
        // deltaY wheel을 위로 굴림	위로(이전 페이지)

        // deltaY는 세로 스크롤 효과를 주고 싶을 때 사용한다.
        // event.deltaY가 0보다 클 때 Scrolled Down이 표시된다.
        // event.deltaY가 0보다 작을 때 Scrolled Up이 표시된다.
        // if (event.deltaY > 0) {
        //   // 아래로 스크롤 
        //   setMessage('Scrolled Down');
        // } else {
        //   // 위로 스크롤
        //   setMessage('Scrolled Up');
        // }
    };

    useEffect(() => {
      console.log(message);
    }, [message]);

    return (
        <>
            {/* onWheel명령어는 마우스 휠 이벤트를 주고 싶을때 주는 명령어이다. */}
            <div className='outer' onWheel={handleWheel} style={{ background: color }}>
                {message}
            </div>
        </>
    );
}

export default WheelY;