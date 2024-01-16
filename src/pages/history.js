import {ActivityTotal} from "./activity"
import './history.css'
import SimpleHeader from "../components/simpleHeader"
import CheckLogin from "../components/checkLogin"

const activities =[
    {
        id:0, name:"Jouer partition 1", dueAt:"14/12/2023", status:"toDo",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ero",
        teacher :{
            name:"Dupont", gender:"male"
        },
        partition: {
            name : "Partition tartampion", difficulty : "Débutant", style :"Jazz", instrument : "Basse", auteur : "Mozart"
        }
    },
    {
        id:1, name:"Jouer partition 2", dueAt:"14/12/2023", status:"toDo",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ero",
        teacher :{
            name:"Patate", gender:"female"
        },
        partition: {
            name : "Partition tripleS", difficulty : "Débutant", style :"Jazz", instrument : "Basse", auteur : "Mozart"
        }
    }
]


export default function History(){
    CheckLogin();
    return(
        <div className="History simpleContent">
            <SimpleHeader/>
            <h1>Historique d'activités</h1>
            {activities.map((activity,i) => {
                return (
                <>
                    <ActivityTotal activity={activity}/>
                    {i != activities.length-1 ? <div className="separator"></div> : null}
                </>
                );
            })}
        </div>
    )
}