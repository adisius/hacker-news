import '../Card.css';

export default function Card(props){

    //Converting date to "time ago"
    const nowDate = new Date();
    const newsDate = new Date(props.news.created_at);
    const timeDiff = Math.ceil(Math.abs(nowDate - newsDate) / 36e5);

    let isFav = props.fav;

    // Toggling Fav for filtering
    const handleFav = (e) => {
        isFav = !isFav;
        e.target.parentElement.parentElement.parentElement.classList.toggle('fav') // not very elegant, I know =(
        props.toggleFav(props.news.objectID);
    }

    return(
        <div className="card" id={"card-"+props.news.objectID}>
          <div className="card-header">
            <div className="info"><img src="/img/clock.svg" alt="Time" /> {timeDiff} hour{timeDiff === 1 ? '' : 's'} ago by {props.news.author}</div>
            <h3>{props.news.story_title}</h3>
            <a href={props.news.story_url}  target="_blank" rel="noreferrer">&nbsp;</a>
          </div>
          <div className="card-fav">
            {/* this could be done better... */}
            <button onClick={handleFav}> 
                <img className="outline" src={'/img/heart-outline.svg'} alt="heart off" />
                <img className="filled" src={'/img/heart.svg'} alt="heart on" />
            </button>
          </div>
        </div>
    )
}