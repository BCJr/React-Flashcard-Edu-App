import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'

// no route, renders inside Study component

function CardList({ cards }) {
    // cards state from Study level deck state
    const [currentCard, setCurrentCard] = useState(0)
    // state to toggle each card in list
    const [frontSide, setFrontSide] = useState(true)
    // state to toggle side of card
    const {deckId} = useParams()
    const history = useHistory()
    // deckId from route, useHistory to push a card
    

    const nextHandler = () => {
    // handle user choice to start over on last card of deck
        if (currentCard === (cards.length-1)) {
            window.confirm("Click OK to restart the deck, or CANCEL to return to the homepage.")
            ? setCurrentCard(() => 0) 
            : history.push("/")

        // if not, go to next card and flip it to front
        } else {
            setCurrentCard((currentCard) => currentCard+1)
            setFrontSide(() => !frontSide)
        }
    }

    // user can flip as many times as they like
    const flipHandler = () => {
        setFrontSide(() => !frontSide)
    }
 
// should return Bootstrap wrapping with currentCard place in index and length
// button for user to control side of card
// on condition of card side of card, button to go to next card

    
    if (cards.length > 2) { 
        return (
            <div className="row p-3">
                <div className="card w-100">
                    <div className="card-body">
                        <h5 className="card-title">
                            Card {currentCard+1} of {cards.length}
                        </h5>
                        <p className="card-text">
                        </p>
                        <button onClick={flipHandler} className="btn btn-secondary mr-3">
                            Flip
                        </button>
                        {frontSide ? null : 
                        <button onClick={nextHandler} className="btn btn-primary">
                            Next
                        </button>}                 
                    </div>
                </div>
            </div>
        )
    } else {  // link to create more cards
        return (
            <div className="row p-3 w-100">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Not enough cards.
                        </h5>
                        <p className="card-text">
                            You need at least 3 cards to study. There are {cards.length} cards in this deck.
                        </p>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mx-auto">
                            Add Cards
                        </Link>
                    </div>
                </div>
            </div>
        )    
    }
}

export default CardList