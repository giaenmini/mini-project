import React, {useState, useEffect, useRef} from "react";

export default function Stopwatch(){
     
    const [isRunning, setisRunning] = useState(false);
    const [elapsedTime, setelapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
          intervalIdRef.current = setInterval(() => {
               setelapsedTime(Date.now() - startTimeRef.current);
          }, 10)

          return () => {clearInterval(intervalIdRef.current);};
        }
    }, [isRunning]);

    function Start(){
       if(!isRunning){
        setisRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
       }
    }

    function Stop(){
       if(isRunning){
        setisRunning(false);
       }
    }

    function Reset(){
       setisRunning(false);
       setelapsedTime(0);
       intervalIdRef.current = null;
       startTimeRef.current = 0;
    }

    function formatTime() {
       let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
       
    }

    return(
        <div className="stopwatch">
            <h2 className="number">{formatTime()}</h2>
            <div className="button">
                <button className="start" onClick={Start}>Start</button>
                <button className="stop" onClick={Stop}>Stop</button>
                <button className="reset" onClick={Reset}>Reset</button>
            </div>
        </div>
    )
}