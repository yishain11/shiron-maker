import './App.css'
import { SCRAPPING_URL, BASE_SHIRONET_URL } from './constants/constants'

function App() {

  let searchTerm = '';

  function handleInput(e) {
    searchTerm = e.target.value;
  }

  function sendForScrapping() {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    fetch(SCRAPPING_URL, { headers, method: 'POST', credentials: 'include', body: JSON.stringify({ url: BASE_SHIRONET_URL + encodeURIComponent(searchTerm) }) })
      .then()
      .catch();

  }

  return (
    <div className="App">
      <input type="text" onInput={handleInput} />
      <button onClick={sendForScrapping}>search</button>
    </div>
  )
}

export default App
