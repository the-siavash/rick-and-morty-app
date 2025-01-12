import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function CharacterEpisodes({ episodes }) {
  const [ascendingSorted, setAscendingSorted] = useState(true);

  const sortedEpisodes = [...episodes].sort((a, b) => {
    if (ascendingSorted) return new Date(a.created) - new Date(b.created);
    else return new Date(b.created) - new Date(a.created);
  });

  return (
    <div className="character-episodes">
      <div className="character-episodes__header">
        <h2 className="character-episodes__title">List of Episodes:</h2>
        <button onClick={() => setAscendingSorted((prev) => !prev)}>
          <ArrowUpCircleIcon
            className={`character-episodes__icon ${
              !ascendingSorted && 'rotate'
            }`}
          />
        </button>
      </div>
      <ul className="character-episodes__body">
        {sortedEpisodes?.map((episode, index) => (
          <CharacterEpisode
            key={index}
            episodeNumber={
              ascendingSorted ? index + 1 : sortedEpisodes.length - index
            }
            episodeData={episode}
          />
        ))}
      </ul>
    </div>
  );
}
export default CharacterEpisodes;

function CharacterEpisode({ episodeNumber, episodeData }) {
  return (
    <li className="character-episodes__item">
      <p>
        {`${episodeNumber.toString().padStart(2, '0')}. `}
        {`${episodeData.episode} - `}
        <strong>{episodeData.name}</strong>
      </p>
      <div className="badge">{episodeData.air_date}</div>
    </li>
  );
}
