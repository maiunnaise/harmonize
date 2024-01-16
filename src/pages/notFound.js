import SimpleHeader from "../components/simpleHeader"
import "./notFound.css"

export default function NotFound(){
    return (
        <div className="simpleContent notFound">
            <SimpleHeader/>
            <h1>404</h1>
            <p>Page introuvable :(</p>
        </div>
    )
}