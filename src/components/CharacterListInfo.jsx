export default function CharacterListInfo({ characterData }) {
  const statusColors = {
    Alive: 'character-list__status--green',
    Dead: 'character-list__status--red',
    unknown: 'character-list__status--gray',
  };

  return (
    <div className="character-list__info">
      <p className="character-list__name">
        {`(${characterData.gender.split('')[0]}) ${characterData.name}`}
      </p>
      <small>
        <span
          className={`character-list__status ${
            statusColors[characterData.status]
          }`}
        ></span>
        {`${characterData.status} - ${characterData.species}`}
      </small>
    </div>
  );
}
