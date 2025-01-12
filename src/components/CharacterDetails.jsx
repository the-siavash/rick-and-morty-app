import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader';
import CharacterListInfo from './CharacterListInfo';
import CharacterEpisodes from './CharacterEpisodes';

function CharacterDetails({
  selectedCharacterID,
  onAddFavorite,
  isAddedToFavorites,
}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedCharacterID}`,
          { signal }
        );
        setCharacter(data);

        const episodesList = data.episode.map((episode) =>
          Number(episode.split('/').at(-1))
        );
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesList}`
        );
        setEpisodes([episodeData].flat());
      } catch (err) {
        if (!axios.isCancel()) {
          toast.error(`${err.response.data.error} (${err.response.status})`);
          setCharacter(null);
          setEpisodes([]);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedCharacterID) fetchData();

    return () => {
      controller.abort();
    };
  }, [selectedCharacterID]);

  if (!character || !selectedCharacterID)
    return <div className="character-details">Please select a character!</div>;

  if (isLoading)
    return (
      <div className="character-details">
        <Loader />
      </div>
    );

  return (
    <div className="character-details">
      <CharacterDetail
        character={character}
        isAddedToFavorites={isAddedToFavorites}
        onAddFavorite={onAddFavorite}
      />
      <CharacterEpisodes episodes={episodes} />
    </div>
  );
}
export default CharacterDetails;

function CharacterDetail({ character, isAddedToFavorites, onAddFavorite }) {
  return (
    <div className="character-detail">
      <div className="character-detail__avatar">
        <img src={character.image} alt={`Avatar of ${character.name}`} />
      </div>
      <div className="character-detail__info">
        <CharacterListInfo characterData={character} />
        <div className="character-detail__location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="character-detail__actions">
          {isAddedToFavorites ? (
            <p style={{ fontSize: '0.8rem' }}>Added to Favorites!</p>
          ) : (
            <button
              className="btn"
              type="button"
              onClick={() => onAddFavorite(character)}
            >
              Add to Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
