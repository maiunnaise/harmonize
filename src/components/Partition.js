import './Partition.css';

export default function Partition({partition, style}){

    function addFav(e){
        if(e.target.src.includes("colored")){
            e.target.src = "/logo/icons/star.png";
            e.target.parentElement.classList.toggle("fav");
        }
        else{
            e.target.src = "/logo/icons/star_colored.png";
            e.target.parentElement.classList.toggle("fav");
        }

        e.preventDefault();
    }

    function addLib(e){
        if(e.target.src.includes("add")){
            e.target.src = "/logo/icons/check.png";
        }
        else{
            e.target.src = "/logo/icons/add.png";
        };
        e.preventDefault();
    }
    return(
        <div className={partition.isFav ? 'partition fav' : 'partition'} id={partition.id}>
            <div className='partitionDesc'>
                <p>{partition.name}</p>
                <p>{partition.difficulty} - {partition.style} - {partition.instrument}</p>
            </div>
            <p>{partition.auteur}</p>
            {style == "fav" && !partition.isFav ? (
                <img src="/logo/icons/star.png" alt="star" onClick={addFav}/>) 
                : style == "fav" && partition.isFav? (
                    <img src="/logo/icons/star_colored.png" alt="star" onClick={addFav}/>)
                : <img src="/logo/icons/add.png" alt="add" onClick={addLib}/>}
        </div>
    )
}