import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index.js";

function DeckList({ deck, updateDecks }) {
// props deck state of Home component, updateDecks function to setDecksLength at layout level


  // card content, length and view to deck screen
  //destructure each deck for expected properties
  const { id, name, description, cards } = deck;

  // deck length as number of cards in deck
  const deckLength = cards.length;

  // useHistory hook now useNavigate will access React Router's history object 
  // manipulate state of browser history by redirecting to another page
  const history = useHistory();

  //delete button with async await becuase we are fetching from the api
  // handle click of delete button, use promise from API
  const deleteHandler = async () => {
    // deliver prompt to window
    //if confirmed -> uses 'deleteDeck' 'utils/api/index.js
    if ( window.confirm("Delete this deck? You will not be able to recover it.") ) {
    // condition of send confirmation to browser with prompt, on confirmation ...
      await deleteDeck(id);
      // call API with currentDeck id originating from home component/state to delete
      

      updateDecks(-1);
      // remove deck on end of layout state route rendering component

      //history.go(0) - reloads the current page
      history.go(0);
      //navigate to before this instance with this deck to before this instance of component was called
    } else {
     // navigate anyway if confirmation condition didn't confirm
      history.go(0);
    }
  };

  // use Bootstrap card to wrap links
  // Return links for switch in layout index
  // to routes of home deck state by decks/${id} route or deck.id, calls Deck screen component
  // decks/${id}/study route, calls Study screen component
  // and create button for deleting thisDeck on click to handler
  
  return (
    <div className="card w-75 mb-4">
      <div className="card-body">
        <div className="row px-3">
          <h5 className="card-title">{name}</h5>
          <p className="ml-auto">{deckLength} cards</p>
        </div>
        <p className="card-text">{description}</p>

        <div>
          <Link to={`/decks/${id}`} className="btn btn-secondary mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
            View
          </Link>

          <Link to={`/decks/${id}/study`} className="btn btn-primary mi-3 mr2">
            Study
          </Link>

          <button
            onClick={deleteHandler}
            name="delete"
            value={id}
            className="btn btn-danger float-right"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    
                    <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeckList;
