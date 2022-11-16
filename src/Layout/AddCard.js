import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from './CardForm';


// route for /decks/:deckId/cards/new
// should display form for card, access API for deck info
// links to CardForm component and displays return

const AddCard = () => {
 
    const [deck, setDeck] = useState([]);
    // empty deck state to hold currentDeck
    const [card, setCard] = useState({
    // empty card state
        front:'',
        back:'',
        deckId:''
    })

    const { deckId } = useParams();
    // extract deck from route parameter
    
    useEffect(() => {
    // use route param to id deck and send request to API for deck info
        const deckInfo = async () => {
            const response = await readDeck(deckId)
            setDeck(() => response)
        }
        deckInfo()
    }, [deckId])

    // need a function that is called when the form is changed from CardForm from the state
    //setcard for the existing data (...card) add the target.value to either 
    //the target.name (front/back): target.value the description

    const changeForm = ({ target }) => {
    // use values from form to replace empty values in card state
        setCard({...card, [target.name]: target.value})
    }

    const submitForm = (event) => {
    // handle submission from form
        event.preventDefault();
        
        setCard({...card, deckId: deckId})
        //add deckid information to card state

        createCard(deckId, card)
        // send form submission and deck id to API
      
        setCard({front: '', back: '', deckId: ''})
        // clear card state for rerender of screen after state change
    }

    // return link to "/decks/:deckid" to Deck component in Bootstrap nav
    // display CardForm component with currentCard,
        // send form and change control, send curentCard and deckid
    return ( 
    <div className='col-9 mx-suto'>

        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                <li className='breadcrumb-item'>
                    <Link to={'/'}>
                        Home
                    </Link>
                </li>

                <li className='breadcrumb-item'>
                    {/* got the deckId from the useParams */}
                    <Link to={`/decks/${deckId}`}>
                        {deck.name} 
                    </Link>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                    <Link to={`/decks/${deckId}/cards/new`}>
                         Add Card
                    </Link>
                </li>
            </ol>
        </nav>

        <div className='row pl-3 pb-2'>
            <h1>{deck.name}: Add Card</h1>
        </div>

        <CardForm 
            submitForm={submitForm}
            changeForm={changeForm}
            card={card}
            deckId={deckId}
        />

    </div> );
}
 
export default AddCard;