import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar, { Favorites, Search, SearchResult } from './components/Navbar';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';
import Loader from './components/Loader';
import useCharacters from './hooks/useCharacters';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, characters } = useCharacters(searchQuery);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const isAddedToFavorites = favorites
    .map((item) => item.id)
    .includes(selectedCharacter);

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
      <Toaster position="bottom-right" reverseOrder={true} />
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
