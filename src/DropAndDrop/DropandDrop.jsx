import React, { useState } from 'react';

function DropandDrop() {
    // 드로그앤 드롭은 무조건 데이터를 가져오는 값과 UI를 가져오는 값이 있어야 한다. 강조!!
    // 1. items useState는 아이템 배열을 저장
    // 2. droppedItems useState는 빈 배열로 저장
    /* 3. handleDragStart함수는 드래그가 시작될 때 호출되는 함수이다. 
          dataTransfer은 드래그 앤 드롭 인터페이서 데이터를 전송할 때 호출되는 함수이다.
          setData는 드래그된 데이터형식 text/pain(텍스트 데이터)
          getData 드래그를 할 아이템을 가져올 수 있다.
       
          - 명령어
          onDrop 특정위치를 드래그 하고 싶을때 쓰는 명령어
          onDragOver 드래그한 요소가 드롭할 영역 위에 계속 있을 때 호출(다른 항목에 드롭될 수 있도록 허용할때 쓰는 명령어)
          draggable 드래그가 가능한지 설정하는 속성 예) draggable="true"
          onDragStart 드래그가 시작되는 순간(항목을 드래그할 때)
          onDragOver 드래그가 특정 항목으로 올려질 때 사용
          
    */
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [droppedItems, setDroppedItems] = useState([]);

    const handleDragStart = (event, item) => {
        event.dataTransfer.setData('text/plain', item);
    };

    const handleDropToAvailable = (event) => {
        const item = event.dataTransfer.getData('text/plain');
        setDroppedItems((prev) => prev.filter((i) => i !== item)); // 빈배열 삭재
        setItems((prev) => [...prev, item]); // 아이템 추가
    };

    const handleDropToDropped = (event) => {
        const item = event.dataTransfer.getData('text/plain');
        setItems((prev) => prev.filter((i) => i !== item)); // 아이템 추가
        setDroppedItems((prev) => [...prev, item]); // 빈배열 삭제
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // 기본 동작을 방지하여 드롭 가능하도록 함
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            <div
                style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}
                onDragOver={handleDragOver}
                onDrop={handleDropToAvailable}
            >
                <h3>Available Items</h3>
                {items.map((item) => (
                    <div
                        key={item}
                        draggable
                        onDragStart={(event) => handleDragStart(event, item)}
                        style={{ padding: '8px', margin: '5px', backgroundColor: '#f0f0f0', cursor: 'grab' }}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div
                style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}
                onDragOver={handleDragOver}
                onDrop={handleDropToDropped}
            >
                <h3>Dropped Items</h3>
                {droppedItems.map((item, index) => (
                    <div 
                        key={index} 
                        style={{ padding: '8px', margin: '5px', backgroundColor: '#e0ffe0' }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DropandDrop;