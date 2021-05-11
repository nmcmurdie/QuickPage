import React from 'react'
import './Shape.css'

const HEADER_HEIGHT = 120;
const MAX_WIDTH_OFFSET = 50;

function Shape({ type, position }) {
    const rotation = Math.round(Math.random() * 360);

    const style = {
        left: position + Math.round((Math.random() * MAX_WIDTH_OFFSET * 2) - MAX_WIDTH_OFFSET),
        top: Math.round(Math.random() * HEADER_HEIGHT),
        transform: `translateX(-50%) rotate(${rotation}deg)`
    }

    return (
        <div className={"shape " + type} style={style} rotate={rotation + "deg"} />
    )
}

export default Shape
