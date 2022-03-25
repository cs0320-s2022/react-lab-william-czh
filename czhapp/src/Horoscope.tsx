import React, {useState} from "react";
import './App.css';
import TextBox from './TextBox';
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import axios from 'axios'

function Horoscope() {
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");

    //TODO: Fill in the ? with appropriate names/values for a horoscope.
//HINT: Look at the HoroscopeHandler's response in Main.java to choose a default useState value.
    // horoscope is the state variable that stores the returned horoscope
    const [horoscope, setHoroscope] = useState([]);

    const requestHoroscope = () => {
        const toSend = {
            sun: sun,
            moon: moon,
            rising: rising
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.post('http://localhost:4567/horoscope', toSend, config)
            .then(response => {
                console.log(response.data);
                setHoroscope(response.data["horoscope"]);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="Horoscope">
            <header className="Horoscope-header">Horoscope</header>
            <TextBox label={"Sun Sign"} change = {setSun}/>
            <TextBox label={"Moon Sign"} change = {setMoon}/>
            <TextBox label={"Rising Sign"} change = {setRising}/>
            <AwesomeButton onPress = {requestHoroscope}> Submit </AwesomeButton>
            {horoscope.map(item => React.createElement('p', {}, item))}
        </div>
    );
}
export default Horoscope