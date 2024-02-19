import './Metronome.css';
import SimpleHeader from "../components/simpleHeader"

function AccordeurPage(){
    let light = "";
    if(localStorage.getItem('lightMode') == "light"){
        light = "&theme=light";
    }
    else {
        light = "";
    }
    return (
        <div className="MetronomePage">
            <iframe src={`https://guitarapp.com/tuner.html?embed=true${light}`} allow="microphone" title="GuitarApp Online Tuner" style={{width: 90+ "%", height:520+"px", maxWidth: 30 + "em", borderStyle: "none", "border-radius": 4+"px"}}></iframe>
        </div>
    );
}

export default function Accordeur(){
    return (
    <div>
        <SimpleHeader/>    
        <AccordeurPage />
    </div>
    );
};