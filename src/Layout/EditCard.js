import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api/index";
import CardForm from "./CardForm.js";



const EditCard = ({ updateDecks }) => {
// prop to update decks collection at layout state level  
  const [deck, setDeck] = useState([]);
  const [card, editCard] = useState({ front: "", back: "", deckId: "" });
  // empty deck state and card state to receive user input
  const { deckId, cardId } = useParams();
  // from route parameters
  const history = useHistory();
  // useNavigate

  //use useEffect() to change the original card to edit card state
  //readCard from the api -> async await
  useEffect(() => {
  // read card from api, by cardId, only refresh on cardId change
    const cardInfo = async () => {
      const response = await readCard(cardId);
      editCard(() => response);
    };
    cardInfo();
  }, [cardId]);

  useEffect(() => {
  // use deckId to get deck info for links
    const deckInfo = async () => {
      const response = await readDeck(deckId);
      setDeck(() => response);
    };
    deckInfo();
  }, [deckId]);

  const changeForm = ({ target }) => {
  // ability to setCard state from form event
    editCard({ ...card, [target.name]: target.value });
  };

  const submitForm = async (event) => {
  // ability to update Deck in layout state by adding card with deck id from API
  // and adding route to history
    event.preventDefault()
    await updateCard(card)
    history.push(`/decks/${deck.id}`)
    updateDecks(1)
  }

  // return bootstrap nav and with links to deck screen 
  // CardForm component to display card state and ability update it through form handlers
  return (
    <div className='col-9 mx-auto'>

        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>

                    <Link to={'/'}>
                        Home
                    </Link>

                </li>
                <li className='breadcrumb-item'>
                    <Link to={`/decks/${deckId}`}>
                        {deck.name}
                    </Link>
                </li>

                <li className='breadcrumb-item'>
                    Edit Card {cardId}
                </li>
            </ol>
        </nav>
        <div className='row pl-3 pb-2'>
            <h1>Edit Card</h1>
        </div>

        <CardForm 
            submitForm={submitForm}
            changeForm={changeForm}
            card={card}
            deckId={deckId}
        />

    </div>
  );
};

export default EditCard;
