import React, {Component} from 'react';
import {calculatorButtons} from '../globals/calculator-button-data';

function KeyPadComponent(props)  {
    return (
        <div className="button">
            {calculatorButtons.map((thing, i) => <button key={i} type={thing.type} className={thing.className} value={thing.value} onClick={e => props.onClickProp(thing.value, props.msProp)}>{thing.text}</button> )}
        </div>
    );
}


export default KeyPadComponent;
