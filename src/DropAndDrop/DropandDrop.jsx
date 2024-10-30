import React, { useState } from 'react';

function DropandDrop(props) {
    const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [droppedItems, setDroppedItems] = useState([]);

    const handleDragStart = (event, item) => {
        event.dataTransfer.setData('text/plain', item);
    };

    const handleDropToAvailable = (event) => {
        const item = event.dataTransfer.getData('text/plain');
        setDroppedItems((prev) => prev.filter((i) => i !== item));
        setItems((prev) => [...prev, item]);
    };

    const handleDropToDropped = (event) => {
        const item = event.dataTransfer.getData('text/plain');
        setItems((prev) => prev.filter((i) => i !== item));
        setDroppedItems((prev) => [...prev, item]);
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
                        style={{ padding: '8px', margin: '5px', backgroundColor: '#e0ffe0' }}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DropandDrop;