import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Modal from './Modal';
import { Character } from './CharacterList';

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/rick_and_morty-official_logo.svg" alt="logo of Rick and Morty show" />
      </div>
      {children}
    </nav>
  );
}
export default Navbar;

export function Search({ query, onQueryChange }) {
  return (
    <div className="navbar__search">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search in names..."
      />
    </div>
  );
}

export function SearchResult({ charactersNumber }) {
  return (
    <div className="search-result" title={`${charactersNumber} results find`}>
      {charactersNumber}
    </div>
  );
}

export function Favorites({ favoriteCharacters, onDeleteFavorite }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="navbar__icon">
        <div className="circle">
          <span>{favoriteCharacters.length}</span>
        </div>
        <HeartIcon onClick={() => setIsModalOpen((prev) => !prev)} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen((prev) => !prev)}
        title="Favorite Characters"
        empty="Favorite list is empty..."
      >
        {favoriteCharacters?.map((characterData) => (
          <Character key={characterData.id} characterData={characterData}>
            <button className="character-list__icons">
              <TrashIcon
                className="character-list__icon"
                onClick={() => onDeleteFavorite(characterData.id)}
              />
            </button>
          </Character>
        ))}
      </Modal>
    </>
  );
}
