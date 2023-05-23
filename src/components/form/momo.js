import React, { useState } from "react";
import axios from 'axios';

const CharacterForm = () => {
    const [name, setName] = useState("");
    const [rarity, setRarity] = useState([]);
    const [element, setElement] = useState("");
    const [affinity, setAffinity] = useState("");
    const [personality, setPersonality] = useState("");
    const [description, setDescription] = useState("");
    const [attributes, setAttributes] = useState(null);
    const [affinityBonus, setAffinityBonus] = useState(null);


    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const characterData = {
                name,
                affinity,
                description,
            }

            const response = await axios.post('https://smitde5-rest-api.onrender.com/api/v1/characters/', characterData);
            const { msg, characterId } = await response.data.id;
            setData(response.data);
            console.log(data);
            // Handle the successful creation of the character
            setMessage(`Character with the id: ${characterId} successfully created - ${msg}`);

            // await axios.post('https://smitde5-rest-api.onrender.com/api/v1/elements', {
            //     element,
            //     characterId
            // });

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
          {error && <div>{error}</div>}
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
        </div>
      );
    };

export default CharacterForm