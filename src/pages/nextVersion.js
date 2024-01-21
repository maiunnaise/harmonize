import SimpleHeader from "../components/simpleHeader"
import "./nextVersion.css"

export default function NextVersion(){
    return (
        <div className="simpleContent nextVer">
            <SimpleHeader/>
            <h1>V2</h1>
            <p>On se retrouve pour la V2 ;)</p>
        </div>
    )
}