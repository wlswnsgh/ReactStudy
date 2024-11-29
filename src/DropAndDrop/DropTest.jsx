import React, { useState } from 'react';
import { styled } from "styled-components";

const DragPage = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;    
    height: 100vh;         
`;

const Drag_1 = styled.div`
    width: 350px;
    height: 350px;
    border: 1.5px solid gray;
    margin-right: 150px;
    font-size: 35px;
    text-align: center;

    .d_1 {
        font-size: 35px;
    }
`;

const Drag_2 = styled.div`
    width: 350px;
    height: 350px;
    border: 1.5px solid gray;
    text-align: center;

    .d_2 {
        font-size: 35px;
    }

`;

const DragItems = styled.div`
    width: 250px;
    height: 70px;
    border: 2px solid gray;
    transform: translateX(50px);
    margin-bottom: 2px;
    font-size: 35px;
    text-align: center;
 `;

function DropTest() {
    const [dragUI, setDragUI] = useState([
        { id: 1, value: 'item1' },
        { id: 2, value: 'item2' },
        { id: 3, value: 'item3' },
        { id: 4, value: 'item4' },
    ]);

    const [dragBin, setDragBin] = useState([]);

    const handDrag = (data, id) => {
        data.dataTransfer.setData('text/plain', id);
    };

    // const handDrag_1 = (data) => {
    //     const items = data.dataTransfer.getData('text/plain'); // 아이템 가져오기
    //     setDragBin((event) => event.filter((i) =>(i !== items))); // 빈배열 삭제
    //     setDragUI((event) => ([...event, items])); // UI 아이템 추가
    // };

    // const handDrag_2 = (data) => {
    //     const items = data.dataTransfer.getData('text/plain'); // 아이템 가져오기
    //     setDragUI((event) => event.filter((i) =>(i !== items))); // UI 삭제
    //     setDragBin((event) => ([...event, items])); // 빈베열에 추가
    // };

    // 이 코드가 안되는 이유 getData('text/plain', items) items라는 두번째 매개변수를 받아올 수가 없기 때문이다.
    // const handDrag_2 = (data, items) => {
    //     data.dataTransfer.getData('text/plain', items);
    //     setDragUI((event) => event.filter((i) =>(i !== items)));
    //     setDragBin((event) => ([...event, items]));
    // };

    const handDrag_1 = (data) => {
        // parseInt 문자열을 정수로 바꿔주는 명령어
        // find 주어진 조건에 만족하는 값은 찾는 명령어
        const itemId = parseInt(data.dataTransfer.getData('text/plain'), 10); // 10은 10진수 변환해주려고
        const movedItem = dragBin.find((item) => item.id === itemId);
    
        if (movedItem) {
            setDragBin((prev) => prev.filter((item) => item.id !== itemId));
            setDragUI((prev) => [...prev, movedItem]);
        }
    };
    
    const handDrag_2 = (data) => {
        const itemId = parseInt(data.dataTransfer.getData('text/plain'), 10);
        const movedItem = dragUI.find((item) => item.id === itemId);
    
        if (movedItem) {
            setDragUI((prev) => prev.filter((item) => item.id !== itemId));
            setDragBin((prev) => [...prev, movedItem]);
        }
    };    

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <DragPage>
            <Drag_1
                onDrop={handDrag_1}
                onDragOver={handleDragOver}
            >
                <span className='d_1'>드래그1</span>
                {dragUI.map((item) => (
                    <DragItems
                        key={item.id}
                        draggable
                        onDragStart={(data) => handDrag(data, item.id)}
                    >
                        {item.value}
                    </DragItems>
                ))}
            </Drag_1>

            <Drag_2
                onDrop={handDrag_2}
                onDragOver={handleDragOver}
            >
                <span className='d_2'>드래그2</span>
                {dragBin.map((item) => (
                    <DragItems
                        key={item.id}
                        draggable
                        onDragStart={(data) => handDrag(data, item.id)}
                    >
                        {item.value}
                    </DragItems>
                ))}
            </Drag_2>
        </DragPage>
    );
}

export default DropTest;