import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import CharacterListInfo from './CharacterListInfo';

function CharacterList({ characters, handleClick, selectedCharacter }) {
  return (
    <div className="character-list">
      {characters?.map((character) => (
        <Character
          key={character.id}
          characterData={character}
          selectedCharacter={selectedCharacter}
        >
          <button
            className="character-list__icons"
            onClick={() => handleClick(character.id)}
          >
            {selectedCharacter !== character.id ? (
              <EyeIcon className="character-list__icon" />
            ) : (
              <EyeSlashIcon className="character-list__icon" />
            )}
          </button>
        </Character>
      ))}
    </div>
  );
}
export default CharacterList;

export function Character({
  children,
  characterData,
  selectedCharacter = null,
}) {
  return (
    <div
      className={`character-list__item ${
        selectedCharacter === characterData.id && 'selected'
      }`}
    >
      <div className="character-list__avatar">
        <img
          src={characterData.image}
          alt={`Aavatar of ${characterData.name}`}
        />
      </div>
      <CharacterListInfo characterData={characterData} />
      {children}
    </div>
  );
}
