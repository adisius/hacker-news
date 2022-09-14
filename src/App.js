import {useState, useEffect} from 'react'
import Page from './Components/Page';
import './App.css';

export default function App() {

  //Settings de states
  let n = 1;
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(localStorage.getItem('category') || ''); // Category
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
    localStorage.setItem('category', value);
    setCategory(value);
    fetchData(value, 0, false);
<<<<<<< Updated upstream
  }

  const setDefaultCategory = value => {
    const option = document.querySelector(`select[name=language] option[value="${value}"]`); //
    option.selected = true;
    option.defaultSelected = true;
=======
>>>>>>> Stashed changes
  }

  // loading next pages
  const nextPage = () => {
    fetchData(category, page + 1, true);
    setPage(page + 1);
    document.querySelector('.all').click();
  }

  //Data fetching, checking if is new data or for appending it
  const fetchData = (subject, page, append) => {
    setIsLoading(true)
    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${subject}&page=${page}`) //
      .then((response) => response.json())
      .then(async (data) => {
          const hits = data.hits;
          let tempObject = [];
          append
          ? tempObject = [...pages, hits]
          : tempObject = [hits];
          setPages(tempObject);
<<<<<<< Updated upstream
          if(!append) {
            setDefaultCategory(subject)
          }
=======
          setIsLoading(false)
>>>>>>> Stashed changes
      })
      .catch(error => {
        setError(error);
      })
  }

  // Infinte load scroll
  window.onscroll = function() {
<<<<<<< Updated upstream
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
=======
    const offset = 100;
    if ( !isLoading && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - offset) ) {
>>>>>>> Stashed changes
      nextPage();
    }
  };
  
  //Handling first load
  useEffect(() => {
<<<<<<< Updated upstream
    if(!firstLoad) return
    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=angular&page=1`)
      .then((response) => response.json())
      .then(async (data) => {
=======
    const firstCategory = localStorage.getItem('category');

    if(!firstLoad || !firstCategory) return

    setIsLoading(true)

    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${firstCategory}&page=0`) //
      .then((response) => response.json())
      .then( data => {
>>>>>>> Stashed changes
          const hits = data.hits;
          let tempObject = [];
          tempObject = [hits];
          setPages(tempObject);
<<<<<<< Updated upstream
          setDefaultCategory('angular')
=======
          setIsLoading(false)

>>>>>>> Stashed changes
      })
      .catch(error => {
        setError(error);
      })
    setFirstLoad(false);
  }, [firstLoad])

<<<<<<< Updated upstream
  if(firstLoad) return <h1>Loading...</h1>
=======
  // if(firstLoad) return <h1>Loading...</h1>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <select name="language" id="language-select" onChange={e => handleChange(e.target.value)}>
          <option value="angular">Angular</option>
          <option value="reactjs">React</option>
          <option value="vuejs">Vuejs</option>
        </select>
=======
        <Select handleChange={handleChange} category={category}/>
>>>>>>> Stashed changes
      </section>

      <section id="news">
        {pages && pages.map(data => <Page news={data} key={n++}/>)}
      </section>

    </main>
  );
}
