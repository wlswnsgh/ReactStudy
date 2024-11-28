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

`;

function DropTest() {
    const [dragUI, setDragUI] = useState(['item1', 'item2', 'item3', 'item4']);
    const [dragBin, setDragBin] = useState([]);

    const handDrag = (data, item) => {
        data.dataTransfer.setData('text/plain',item);
    };

    // const handDrag_1 = (data) => {
    //     const items = data.dataTransfer.getData('text/plain');
    //     setDragBin((event) => event.filter((i) =>(i !== items)));
    //     setDragUI((event) => ([...event, items]));
    // };

    const handDrag_1 = (data, item) => {
        data.dataTransfer.getData('text/plain', item);
        setDragBin((event) => event.filter((i) =>(i !== item)));
        setDragUI((event) => ([...event, item]));
    };

    // const handDrag_2 = (data) => {
    //     const items = data.dataTransfer.getData('text/plain');
    //     setDragUI((event) => event.filter((i) =>(i !== items)));
    //     setDragBin((event) => ([...event, items]));
    // };

    // 이 코드가 안되는 이유 getData('text/plain', items) items라는 두번째 매개변수를 받아올 수가 없기 때문이다.
    const handDrag_2 = (data, items) => {
        data.dataTransfer.getData('text/plain', items);
        setDragUI((event) => event.filter((i) =>(i !== items)));
        setDragBin((event) => ([...event, items]));
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
                {dragUI.map((index) => (
                    <DragItems
                        key={index}
                        draggable
                        onDragStart={(data) => handDrag(data, index)}
                    >
                        {index}
                    </DragItems>
                ))}
            </Drag_1>

            <Drag_2
                onDrop={handDrag_2}
                onDragOver={handleDragOver}
            >
                <span className='d_2'>드래그2</span>

                {dragBin.map((items,index) => (
                    <DragItems
                        key={index}
                        draggable
                        onDragStart={(data) => handDrag(data, index)}
                    >
                        {items}
                    </DragItems>
                ))}
            </Drag_2>
        </DragPage>
    );
}

export default DropTest;