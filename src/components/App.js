import React, { Component } from 'react';
import '../styles/App.css';
import ResultComponent from './ResultComponent';
import KeyPadComponent from './KeyPadComponent';
import Calculation from '../globals/eval';
import { useState } from 'react';

function App() {
    const [result, setResult] = useState("");
    var [numberMemory, setMS] = useState("");
    var [negativeSignLock, setNSL] = useState(0);

    const calculate = () => {
        const calculationObject = new Calculation();
        setResult(calculationObject.calculate(result).toString());
        setNSL(0);
    }
    
    const reset = () => {
        setResult("");
        setNSL(0);
    }

    const backspace = () => {
        let resultCopy = result.slice(0, -1);
        setResult(resultCopy);
    }

    const memorySave = () =>{
        calculate();
        setMS(result);
        console.log(numberMemory);
    }

    const memoryRecall = (numRemembered) =>{
        console.log(numRemembered);
        let resultCopy = result + numRemembered;
        setResult(resultCopy);
        setNSL(0);
    }

    const memoryClear = () =>{
        setMS("");
    }

    const memoryMinus = () =>{
        calculate();
        var numberMemoryCopy = numberMemory - result;
        setMS(numberMemoryCopy);
        console.log(numberMemory);
    }

    const memoryAdd = () =>{
        calculate();
        var numberMemoryCopy = Number(numberMemory) + Number(result);
        setMS(numberMemoryCopy.toString());
        console.log(numberMemory);
    }

    const negativeControl = ()=>{
        if(negativeSignLock == 0){
            var index = result.length-1;
            var str = result[index];
            var n = str.search(/[0-9]|%|\./);
            while (n !== -1 && index >= 1){
                index--;
                var str = result[index]; 
                var n = str.search(/[0-9]|%|\./);
            }
            var resultCopy = result;
            if(index !== 0){
                if((result[index-1].search(/\-/) == -1))
                    resultCopy = resultCopy.substring(0, index+1) + "-" + resultCopy.substring(index+1);
            }else if(index == 0){
                resultCopy = "-" + resultCopy.substring(index);
            }
            setResult(resultCopy);
            setNSL(1);
        }else if(negativeSignLock == 1){

        }
    }
    const dotControl = ()=>{
            var index = result.length-1;
            var str = result[index];
            var n = str.search(/[0-9]|%/);
            while (n !== -1 && index >= 1){
                index--;
                var str = result[index]; 
                var n = str.search(/[0-9]|%/);
            }
            var resultCopy = result;
            if((result[index].search(/\./) == -1))
                resultCopy = resultCopy + "." ;
            setResult(resultCopy);
    }

    const onClick = (button, ms) => {
        if(button === "="){
            calculate();
        }
        else if(button === "All Clear"){
            reset();
        }
        else if(button === "Clear"){
            backspace();
        }
        else if(button === "Memory Save"){
            memorySave();
        }else if(button === "Memory Recall"){
            memoryRecall(ms);
        }else if(button === "Memory Clear"){
            memoryClear();
        }
        else if(button === "Memory Subtract"){
            memoryMinus();
        }
        else if(button === "Memory Addition"){
            memoryAdd();
        }else if(button === "--"){
            negativeControl();
        }else if(button === "."){
            dotControl();
        }
        else {
            button = button.toString();
            if(button.search(/\+|\-|\*|\/|%/) == -1){
                let resultCopy = result + button;
                setResult(resultCopy);
                setNSL(0);
            }else{
                var index = result.length-1;
                var str = result[index];
                if(str.search(/\+|\-|\*|\/|%/) == -1){
                    let resultCopy = result + button;
                    setResult(resultCopy);
                    setNSL(0);
                }
            }
        }
    }

    return (
        <div>
            <div className="calculator-body">
                <h1>Simple Calculator</h1>
                <ResultComponent resultProp={result}/>
                <KeyPadComponent onClickProp={onClick} msProp={numberMemory}/>
            </div>
        </div>
    );
}

export default App;
