import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import { readDeck, updateDeck } from '../utils/api/index.js'


// route "/decks/:deckid/edit" from layout index linked from Deck component
// should access deck info from API using route parameters

const EditDeck = ({updateDecks}) => {
    // prop updateDecks function to setDecksLength at layout level

    const [deck, editDeck] = useState({name: "", description: ""})
    // edit deck state with empty deck before api
    const history = useHistory()
    // route manipulation holding states
    const {deckId} = useParams()
    // extract route parameter from current route

    useEffect(() => {
    // retrieve currentDeck data from API promise
        const deckInfo = async () => {
            const response = await readDeck(deckId)
            editDeck(() => response)
        }
        deckInfo()
    }, [deckId]) // only change if new deckId is present

    const changeForm = ({ target }) => {
    // set currentDeck with form input by same key names
        editDeck({...deck, [target.name]: target.value})
    } 
    
    const submitForm = async (event) => {
    // on submission send state to API, store promised state with API id in browser state
        event.preventDefault()
        const response = await updateDeck(deck)
        history.push(`/decks/${response.id}`)
        updateDecks(1)
        // add deck object to layout state of deckLength
    }

    if (!deck) {
    // validation that a deck object exists already, if not show "loading"
        return (
            <div className="spinner-border text-primary" role="status">
               <span className="sr-only">
                   Loading...
                </span>
            </div>

    )} else {
    // return link to route "/" home component in Bootstrap nav
    // link to route "/decks/:deckid" deck component on name of deck in nav
    // form for currentDeck values with link to deck component and submit button 
    
        return (
            <div className="col-9 mx-auto">
                
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            Edit Deck
                        </li>
                    </ol>
                </nav>

                <div className="row pl-3 pb-2">
                    <h1>Edit Deck</h1>
                </div>

                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name"
                        value={deck.name}
                        onChange={changeForm}
                        id="name" 
                        className="form-control" 
                        placeholder={deck.name} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                        name="description" 
                        value={deck.description}
                        onChange={changeForm}
                        className="form-control" 
                        id="description" 
                        placeholder={deck.description}
                        rows={4}
                        />
                    </div>

                    <Link to={`/decks/${deckId}`} name="cancel" className="btn btn-secondary mr-3">
                        Cancel
                    </Link>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default EditDeck
                