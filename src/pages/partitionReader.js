import Embed from "flat-embed";
import { useEffect } from "react";
import "./partitionReader.css";
import SimpleHeader from "../components/simpleHeader";
import CheckLogin from "../components/checkLogin";

{/* <iframe src="https://flat.io/embed/65819d88ddd3ea4b0e6c45a0?locale=fr&branding=false&appId=65819d1caf8624704c5475eb&sharingKey=2dcf51fbb66c8aa97bf5933ab055ce70d9b28f7d7fdc8209e4934845910a8ac53cd54713db6e6abcae3dedc434802c170553a9bd7b8ae0bb19ef539a6353e3de" height="450" width="100%" frameBorder="0" allowfullscreen allow="autoplay; midi"></iframe> */}

export default function PartitionReader() {
  CheckLogin();
  let embed;
  let container;
    useEffect(() => {
        container = document.getElementById("partitionReader");
        embed = new Embed(container,{
          score: "65819d88ddd3ea4b0e6c45a0",
          embedParams:{
            appId: "65819d1caf8624704c5475eb",
            mode: "edit",
            controlsPosition:"bottom",
            themeScoreBackground: "transparent",
            branding: false,
            controlsPrint: false,
            themePrimary: "#845583",
            sharingKey : "2724fa2b851f2792927f33a586afe6cdae7a5935dabc8893a912d8af7d0ee6fc7a17f7e7487b79e8a9b840015eefb738678887c73dddc3d48bcda60ab2d8688b"
          }
        });
    }, []);

    // // Helper function to force downloading the exported file
    // var exportFile = function(buffer, mimeType, ext) {
    //   var blobUrl = window.URL.createObjectURL(
    //     new Blob([buffer], {
    //       type: mimeType
    //     })
    //   );
    //   var a = document.createElement("a");
    //   a.href = blobUrl;
    //   a.download = "exported-score." + ext;
    //   document.body.appendChild(a);
    //   a.style = "display: block";
    //   // a.click();
    //   //a.remove();
    // };

    function saveMusicSheet() {
      embed.getJSON().then(function (data) {
        console.log(data);
      });

      // embed.getMusicXML({ compressed: true }).then(function (xml) {
      //   console.log(xml);
      // });
    }

    return (
      <>
        <SimpleHeader />
        <div className="simpleContent">
            <h1>Lecteur de partition</h1>
            <div id="partitionReader">
            </div>
            <button id="export-xml">Export XML</button>
        </div>
      </>
    )
}