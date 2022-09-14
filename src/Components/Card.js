import '../Card.css';
import { useState, useEffect } from 'react';

export default function Card(props){

    //Converting date to relative time
    const nowDate = new Date();
    const newsDate = new Date(props.news.created_at);
    const timeDiff = Math.ceil(Math.abs(nowDate - newsDate) / 36e5);

    const [isFav, setIsFav] = useState(props.fav);

    // Toggling Fav for filtering
    const handleFav = (e) => {
        setIsFav(!isFav);
        e.target.parentElement.parentElement.parentElement.classList.toggle('fav') // not very elegant, I know =(
        toggleFav(props.news.objectID);
    }

    const toggleFav = id => {
      let favs = JSON.parse(localStorage.getItem('favs')) || []
      if(favs.find(value => value === id)){
        favs = favs.filter(function(item) {
          return item !== id
        })
        localStorage.setItem('favs', JSON.stringify(favs));
      } else {
        favs.push(id);
        localStorage.setItem('favs', JSON.stringify(favs));
      }
    }

    const setFav = id => { 
      const idFav = JSON.parse(localStorage.getItem('favs')).find(x => x === id);
      if(idFav){
        setIsFav(true);
      }
    }

    useEffect(() => {
      setFav(props.news.objectID);
    })

    return(
        <div className={"card" + (isFav ? ' fav' : '')} id={"card-" + props.news.objectID}>
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