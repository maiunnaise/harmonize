import './Metronome.css';
import SimpleHeader from "../components/simpleHeader"

function MetronomePage(){
    let light = "";
    if(localStorage.getItem('lightMode') == "light"){
        light = "&theme=light";
    }
    else {
        light = "";
    }
    return (
        <div className="MetronomePage">
            <iframe src={`https://guitarapp.com/metronome.html?embed=true&tempo=120&timeSignature=2&pattern=1${light}`} title="Online Metronome" style={{width: 90+ "%", height:520+"px", maxWidth: 30 + "em", borderStyle: "none", "border-radius": 4+"px"}}></iframe>
            
        </div>
    );
}

export default function Metronome(){
    return (
    <div>
        <SimpleHeader/>    
        <MetronomePage />
    </div>
    );
};