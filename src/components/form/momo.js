import React, { useState } from "react";
import axios from 'axios';

const CharacterForm = () => {
    const [name, setName] = useState("");
    const [characterId, setCharacterId] = useState(null);
    const [rarity, setRarity] = useState([]);
    const [element, setElement] = useState("");
    const [affinity, setAffinity] = useState("");
    const [personality, setPersonality] = useState("");
    const [description, setDescription] = useState("");
    const [attributes, setAttributes] = useState(null);
    const [affinityBonus, setAffinityBonus] = useState(null);
    


    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const characterData = {
                name,
                affinity,
                description,
            };

            const elementData = {
              element,
              characterId,
            };


            const response = await axios.post('https://smitde5-rest-api.onrender.com/api/v1/characters/', characterData);
            setCharacterId(response.data.data.id);
            // Handle the successful creation of the character
            setMessage(`Character with the id successfully created - `);

            await axios.post('https://smitde5-rest-api.onrender.com/api/v1/elements', elementData);

            // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/personalities', {
            //     personality,
            //     characterId
            // });

            // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/raritys', {
            //     rarity,
            //     characterId
            // });

            // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/attributes', {
            //     attributes,
            //     characterId
            // });

            // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/affinityBonus', {
            //     affinityBonus,
            //     characterId
            // });

console.log("Creation successful");
        } catch (err) {
            if(error.response) {
                setError(error.response.data.error);
                console.error(error)
            }
        }


        setName('');
        setElement('');
        // setAffinity('');
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Affinity:
            <input type="text" value={affinity} onChange={(e) => setAffinity(e.target.value)} />
          </label>
          <label>
            Description:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Element:
            <input type="text" value={element} onChange={(e) => setElement(e.target.value)} />
          </label>
          {error && <div>{error}</div>}
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
        </div>
      );
    };

export default CharacterForm