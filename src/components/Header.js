import React, { Component } from 'react'
import Shape from './Shape'
import './Header.css'

const TYPES = ['x', 'circle', 'square'];
const RESIZE_UPDATE_MS = 200;

export default class Header extends Component {
    constructor() {
        super();

        this.numTypes = TYPES.length;
        this.screenWidth = window.innerWidth;
        this.state = this.generateShapes();
    }

    componentDidMount() {
        window.addEventListener("resize", () => this.debouncedResize());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.debouncedResize());
    }

    debouncedResize() {
        this.debounce(() => {
            if (window.innerWidth !== this.screenWidth) {
                this.screenWidth = window.innerWidth;
                this.updateShapes();
            }
        });
    }

    debounce(fn) {
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            fn.apply(this, arguments);
        }, RESIZE_UPDATE_MS);
    }

    generateShapes() {
        let generatedShapes = [];
        let numShapes = Math.ceil(this.screenWidth / 180),
            typeOffset = Math.round(Math.random() * numShapes),
            shapeWidth = Math.round(this.screenWidth / numShapes),
            shapeOffset = shapeWidth / 2;

        for (let i = 0; i < numShapes; i++) {
            generatedShapes.push({
                type: TYPES[(i + typeOffset) % this.numTypes],
                key: i,
                position: shapeWidth * i + shapeOffset
            });
        }

        return { shapes: generatedShapes};
    }

    updateShapes = () => this.setState(() => this.generateShapes());

    render() {
        return (
            <div className="page-header" onClick={() => this.updateShapes()}>
                {
                    this.state.shapes.map(item => (
                        <Shape type={item.type} key={item.key} position={item.position} />
                    ))
                }
            </div>
        )
    }
}

