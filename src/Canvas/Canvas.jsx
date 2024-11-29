import React, { useState, useRef, useEffect } from 'react';

function Canvas() {
    const canvasRef = useRef(null); // 캔버스 DOM 참조
    const ctxRef = useRef(null);   // 캔버스의 2D 컨텍스트 참조
    const [points, setPoints] = useState([]); // 선의 끝점을 저장
    const [isDrawing, setIsDrawing] = useState(false); // 그리기 상태
    const [isDrawingComplete, setIsDrawingComplete] = useState(false); // 그리기 완료 상태
    const [angle, setAngle] = useState(0); // 선의 회전 각도
    const [threshold, setThreshold] = useState(10); // 선이 이어지도록 할 거리 임계값

    // 캔버스 초기화 및 컨텍스트 설정
    const initializeCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 0.8; // 캔버스 크기
        canvas.height = window.innerHeight * 0.8;
        const ctx = canvas.getContext('2d'); // 2D 컨텍스트 가져오기
        ctx.lineCap = 'round'; // 선 끝을 둥글게
        ctx.strokeStyle = '#000000'; // 기본 색상
        ctx.lineWidth = 5; // 기본 굵기
        ctxRef.current = ctx;
    };

    useEffect(() => {
        initializeCanvas();
    }, []);

    // 선 그리기 시작 (마우스를 클릭한 위치에서 선이 시작됨)
    const handleMouseDown = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        if (!isDrawingComplete) {
            setIsDrawing(true); // 그리기 상태 시작
            setPoints((prevPoints) => [...prevPoints, { x: offsetX, y: offsetY }]); // 새로운 점 추가
        }
    };

    // 선 그리기 (각도에 따라 회전)
    const handleMouseMove = ({ nativeEvent }) => {
        if (!isDrawing || points.length === 0) return;

        const { offsetX, offsetY } = nativeEvent;
        const rotatedPoint = calculateRotatedPoint(offsetX, offsetY);
        drawLine(rotatedPoint.x, rotatedPoint.y);
    };

    // 직선으로 그리기
    const drawLine = (endX, endY) => {
        const ctx = ctxRef.current;

        // 그려진 선을 지우고 모든 선을 다시 그리기
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 캔버스 지우기

        // 모든 선을 다시 그리기
        points.forEach((point, index) => {
            if (index < points.length - 1) {
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(points[index + 1].x, points[index + 1].y);
                ctx.stroke();
            }
        });

        // 마지막 점과 현재 마우스 위치 연결
        if (points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    };

    // 선의 회전 각도를 계산하고, 회전된 끝점을 구하기
    const calculateRotatedPoint = (offsetX, offsetY) => {
        const lastPoint = points[points.length - 1];

        // 회전 각도 (라디안 단위로 변환)
        const angleInRadians = (angle * Math.PI) / 180;

        // 회전된 점을 계산
        const rotatedX = lastPoint.x + (offsetX - lastPoint.x) * Math.cos(angleInRadians) - (offsetY - lastPoint.y) * Math.sin(angleInRadians);
        const rotatedY = lastPoint.y + (offsetX - lastPoint.x) * Math.sin(angleInRadians) + (offsetY - lastPoint.y) * Math.cos(angleInRadians);

        return { x: rotatedX, y: rotatedY };
    };

    // 더블 클릭 시 첫 번째 선과 네 번째 선 연결하기 (직사각형의 경우)
    const handleDoubleClick = () => {
        if (points.length >= 4) {
            // 첫 번째 점과 네 번째 점을 이어줌
            const firstPoint = points[0]; // 첫 번째 점
            const fourthPoint = points[3]; // 네 번째 점

            // 첫 번째 점과 네 번째 점을 이어주는 선 추가
            setPoints((prevPoints) => [...prevPoints, firstPoint]);
            setIsDrawingComplete(true); // 그리기 완료 상태 설정
        }
        setIsDrawing(false); // 그리기 상태 종료
    };

    // 새로운 독립적인 선을 시작 (더블클릭 후 새 선 그리기)
    const startNewLine = () => {
        setPoints([]); // 이전에 그린 점들을 초기화
        setIsDrawingComplete(false); // 그리기 완료 상태 리셋
        setIsDrawing(true); // 새로운 선 그리기 시작
    };

    // 각도 업데이트 (클릭 시마다 각도를 변경)
    const handleClick = () => {
        setAngle((prevAngle) => (prevAngle + 30) % 360); // 30도씩 회전 (0에서 360도 사이)
    };

    // 캔버스 초기화
    const clearCanvas = () => {
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 캔버스 지우기
        setPoints([]); // 그린 점 초기화
        setIsDrawing(false); // 그리기 상태 종료
        setIsDrawingComplete(false); // 그리기 완료 상태 초기화
    };

    return (
        <div>
            {/* 캔버스 */}
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown} // 클릭 시 선 그리기 시작
                onMouseMove={handleMouseMove} // 마우스 움직임에 따라 선 그리기
                onDoubleClick={handleDoubleClick} // 더블 클릭 시 첫 번째 점과 네 번째 점을 연결
                style={{ border: '1px solid black', cursor: 'crosshair' }}
            ></canvas>

            {/* 도구 메뉴 */}
            <div style={{ marginTop: '10px' }}>
                <label>색상: </label>
                <input
                    type="color"
                    value={'#000000'}
                    onChange={(e) => {
                        ctxRef.current.strokeStyle = e.target.value;
                    }}
                />

                <label style={{ marginLeft: '10px' }}>굵기: </label>
                <input
                    type="number"
                    min="1"
                    max="50"
                    value={5}
                    onChange={(e) => {
                        ctxRef.current.lineWidth = e.target.value;
                    }}
                />

                <button onClick={clearCanvas} style={{ marginLeft: '10px' }}>
                    초기화
                </button>

                <button onClick={handleClick} style={{ marginLeft: '10px' }}>
                    회전
                </button>

                <button onClick={startNewLine} style={{ marginLeft: '10px' }}>
                    새 선 시작
                </button>
            </div>
        </div>
    );
}

export default Canvas;
