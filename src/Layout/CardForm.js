import React from "react";
import { Link } from "react-router-dom";

//no route, Cardform component nested in AddCard


const CardForm = ({ submitForm, changeForm, card, deckId }) => {
// props to handle form submission, handle form input fields, card state from AddCard, and deckId of card
  
// should return display of form for front of card info, back of card info
// link to return to deck component on cancel of form, and submit button
    return (
    <form id="cardForm" onSubmit={submitForm}>
      <div>
        <label>Front</label>
        <textarea
          name="front"
          id="front"
          rows={2}
          value={card.front}
          onChange={changeForm}
          className="form-control mb-3"
          placeholder="Front side of card"
        ></textarea>

        <label>Back</label>
        <textarea
          name="back"
          id="back"
          rows={2}
          value={card.back}
          onChange={changeForm}
          className="form-control mb-3"
          placeholder="Back side of card"
        ></textarea>

        <Link
            to={`/decks/${deckId}`}
            className='btn btn-secondary mr-2'
            name='cancel'
        >Done</Link>

        <button type='submit' className='btn btn-primary'>
            Save
        </button>
      </div>
    </form>
  );
};

export default CardForm;
