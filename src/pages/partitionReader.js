import Embed from "flat-embed";
import { useEffect } from "react";
import "./partitionReader.css";
import SimpleHeader from "../components/simpleHeader";
import CheckLogin from "../components/checkLogin";
import { useParams } from "react-router-dom";
import { getAPI } from "../components/fetchAPI";
import { useState } from "react";

export default function PartitionReader() {
  CheckLogin();
  let embed;
  let container;
  let {id} = useParams();
  let {custom} = useParams();

  const [partition, setPartition] = useState([]);
    useEffect(() => {
      
        const fetchData = async () => {
          if(custom === "custom"){
            await getAPI(`custom-sheets/${id}`, setPartition);
          }
          else{
            await getAPI(`sheets/${id}`, setPartition);
          }
        };

        fetchData();


        
    }, []);

    useEffect(() => {
      let scoreKey = partition.scoreKey;
      let sharingKey = partition.sharingKey;
      if(partition.length === 0) return;
      container = document.getElementById("partitionReader");
      embed = new Embed(container,{
        score: scoreKey,
        embedParams:{
          appId: "65819d1caf8624704c5475eb",
          controlsPosition:"bottom",
          themeScoreBackground: "transparent",
          branding: false,
          controlsPrint: false,
          themePrimary: "#845583",
          sharingKey : sharingKey
        }
      });

    }, [partition]);


    return (
      <>
        <SimpleHeader />
        <div className="simpleContent partReader">
            <h1>Lecteur de partition</h1>
            <h2>{partition.title} <span>- {custom ==="custom" && partition.length !=0? partition.author.nom :partition.author}</span></h2>
            <div id="partitionReader">
            </div>
        </div>
      </>
    )
}