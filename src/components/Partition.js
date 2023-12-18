import './Partition.css';

export default function Partition({partition}){
    return(
        <div className="partition">
            <div className='partitionDesc'>
                <p>{partition.name}</p>
                <p>{partition.difficulty} - {partition.style} - {partition.instrument}</p>
            </div>
            <p>{partition.auteur}</p>
            <img src="/logo/icons/add.png" alt="add"/>
        </div>
    )
}