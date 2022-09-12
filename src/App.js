import {useState, useEffect} from 'react'
import Page from './Components/Page';
import './App.css';

export default function App() {

  //Settings de states
  const [category, setCategory] = useState('angular') // Category
  const [page, setPage] = useState(0) // Current page number
  const [error, setError] = useState() // Error on fetching
  const [firstLoad, setFirstLoad] = useState(true) // Check first load for future pagination
  const [pages, setPages] = useState([]) // For storing pages news data

  // Filter buttons
  const handleTabAll = () => {
    document.querySelector('.my-faves').classList.remove('active');
    document.querySelector('.all').classList.add('active');
    const cards = document.querySelectorAll('.card');
    cards.forEach(element => {
      element.classList.remove('d-none');
    });
  }

  const handleTabMyFavs = () => {
    document.querySelector('.my-faves').classList.add('active');
    document.querySelector('.all').classList.remove('active');
    const cards = document.querySelectorAll('.card');
    cards.forEach(element => {
      element.classList.add('d-none');
      if(element.classList.contains('fav')){
        element.classList.remove('d-none');
      }
    });
  }

  // Handling category change from select
  const handleChange = (value) => {
    setCategory(value);
    fetchData(value, 0, false);
  }

  // loading next pages
  const nextPage = () => {
    fetchData(category, page + 1, true);
    setPage(page + 1);
    document.querySelector('.all').click();
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


  // const setFavs = () => {
  //   let favs = JSON.parse(localStorage.getItem('favs')) || []
  //   //console.log(favs)
  //   favs.forEach(element => {
  //     document.querySelector('#card-' + element).classList.add('fav');
  //   });
  // }

  //Data fetching, checking if is new data or for appending it
  const fetchData = (subject, page, append) => {
    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${subject}&page=${page}`) //
      .then((response) => response.json())
      .then((data) => {
          const hits = data.hits;
          let tempObject = [];
          append
          ? tempObject = [...pages, hits]
          : tempObject = [hits];
          setPages(tempObject);
          // setFavs();
      })
      .catch(error => {
        setError(error);
      })
  }

  // Infinte load scroll
  window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      nextPage();
    }
  };

  //Handling first load
  useEffect(() => {
    if(firstLoad){
      fetchData('angular', 0, false);
      setFirstLoad(false);
    }
  }, [firstLoad])

  if(firstLoad) return <h1>Loading...</h1>
  if(error) return <h2>Error...</h2>

  return (
    <main>
      <header>
        <h1>Hacker News</h1>
      </header>
      <section id="tabs">
        <ul>
          <li><button onClick={handleTabAll} className="all active">ALL</button></li>
          <li><button onClick={handleTabMyFavs} className="my-faves">My faves</button></li>
        </ul>

      </section>

      <section id="selector">
        <select name="language" id="language-select" onChange={e => handleChange(e.target.value)}>
          <option value="angular">Angular</option>
          <option value="reactjs">React</option>
          <option value="vuejs">Vuejs</option>
        </select>
      </section>

      <section id="news">
        {pages.map(data => <Page news={data} toggleFav={toggleFav}/>)}
      </section>

    </main>
  );
}
