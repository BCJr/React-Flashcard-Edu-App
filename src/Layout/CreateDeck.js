import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";

// functional component to create create deck screen
// Route for /decks/new from layout index

const CreateDeck = ({ updateDecks }) => {
  // prop updateDecks function to setDeckLength in index

  
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  // create state to contain user entered deck, no id as API will apply one

  const history = useHistory();
  // useHistory now useNavigate hook to create route from user submitted state 

  // use changeForm to take the target deck with obj for both name and description
  const changeForm = ({ target }) => {
  // target submission event 
    setNewDeck({ ...newDeck, [target.name]: target.value });
    //hold what user entered by adding name:value pairs to existing currentState
  };

  // use submitForm to create the new deck
  const submitForm = async (event) => {
  // trigger API promise createDeck to add newDeck to database, no validation done on newDeck...
    event.preventDefault();
    const response = await createDeck(newDeck);

    history.push(`/decks/${response.id}`);
    // use submitted state to route to new page based on API response, API adds id...

    // callback to layout decks state, add this deck state to next index in decksLength
    updateDecks(1);
  };

  // return a webpage containing the following content
  // Bootstrap card wrapper, nav link to home, title
  // form for deck name and description held in state on change and on submission, 
  // button to cancel links back to home component, button to submit

  return (
    <div className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>

      <form onSubmit={submitForm}>
        <div className="form-group">
          
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newDeck.name}
            onChange={changeForm}
            id="name"
            className="form-control"
            placeholder="Deck Name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={newDeck.description}
            onChange={changeForm}
            className="form-control"
            id="description"
            placeholder="Brief description of the deck."
            rows={4}
          />
        </div>

        <Link to="/" name="cancel" className="btn btn-secondary mr-3">
          Cancel
        </Link>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>
    </div>
  );
};

export default CreateDeck;
