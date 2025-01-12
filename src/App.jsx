import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Navbar, { Favorites, Search, SearchResult } from './components/Navbar';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';
import Loader from './components/Loader';

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  const isAddedToFavorites = favorites
    .map((item) => item.id)
    .includes(selectedCharacter);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${searchQuery
            .trim()
            .toLowerCase()}`,
          { signal }
        );
        setCharacters(data.results);
      } catch (err) {
        setCharacters([]);
        if (!axios.isCancel())
          toast.error(
            err.response
              ? `${err.response.data.error} (${err.response.status})`
              : err.message
          );
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function handleSelectedCharacter(id) {
    setSelectedCharacter((prevId) => (prevId === id ? null : id));
  }

  function handleAddFavorite(character) {
    setFavorites((prevFavorites) =>
      [...prevFavorites, character].reduce((acc, current) => {
        if (!acc.find((item) => item.id === current.id))
          return acc.concat([current]);
        return acc;
      }, [])
    );
  }

  function handleDeleteFavorite(id) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  }

  return (
    <div className="container">
      <Toaster />
      <Navbar>
        <Search
          query={searchQuery}
          onQueryChange={(value) => setSearchQuery(value)}
        />
        <div className="flex-group">
          <SearchResult charactersNumber={characters.length} />
          <Favorites
            favoriteCharacters={favorites}
            onDeleteFavorite={handleDeleteFavorite}
          />
        </div>
      </Navbar>
      <main className="main">
        {isLoading ? (
          <Loader />
        ) : (
          <CharacterList
            characters={characters}
            handleClick={handleSelectedCharacter}
            selectedCharacter={selectedCharacter}
          />
        )}
        <CharacterDetails
          selectedCharacterID={selectedCharacter}
          onAddFavorite={handleAddFavorite}
          isAddedToFavorites={isAddedToFavorites}
        />
      </main>
    </div>
  );
}
export default App;
