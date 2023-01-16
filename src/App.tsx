import React, {Fragment, useState} from 'react';
import './default.scss';
import Record from "./components/record/Record";





const App = () => {


    return (
        <div>
            <h3>Audio App</h3>
            <Record trackPath={'assets/sounds/ACDCtnt.mp3'}/>
            <Record trackPath={'assets/sounds/sounds_bubbles.mp3'}/>
        </div>


    );
}

export default App;
