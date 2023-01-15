import React from 'react';
import './default.scss';

const App = () => {
    return (
        <div>
            <h1>Audio app</h1>
            <audio id="audio">
                {/*<source src={require("@/assets/sounds/ACDCtnt.mp3").default} type={'audio/mpeg'}/>*/}
                <source src={require('@/assets/sounds/ACDCtnt.mp3').default} type={'audio/mpeg'}/>
                Your browser does not support the <code>audio</code> element.
            </audio>
            <button
                onClick={()=>{
                    const audio = document.getElementById("audio") as HTMLAudioElement;
                    const duration = audio.duration;
                    console.log("duration", duration)
                    audio.play();
                }}
            >Play</button>
        </div>
    );
}

export default App;
