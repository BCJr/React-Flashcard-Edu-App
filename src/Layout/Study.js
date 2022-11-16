import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readDeck } from '../utils/api/index.js'
import CardList from './CardList'

// route "/decks/:deckId/study" from layout, link from Decklist from home

function Study() {

    const [deck, setDeck] = useState({})
    const {deckId} = useParams()
    // create local component deck state as empty object so easier to extract cards
    // deckId from route parameter
    
    useEffect(() => { 
    // request deck info from API, only repeat when change to deckId
        const findDeck = async () => { 
            const currDeck = await readDeck(deckId)
            setDeck(()=> currDeck)    
        }
        findDeck()
    }, [deckId])
    
// return on condition that local deck has keys, meaning not empty
// bootstrap nav with links, one to deck component
// Cardlist component with cards object from inside local deck
    if (Object.keys(deck).length) {
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
                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>
                </nav>

                <div>
                    <h1>{deck.name}: Study</h1>
                </div>

                <CardList cards={deck.cards}/>
            </div>
        )

    } else { // return when waiting for API, or error 
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">
                   Loading...
                </span>
            </div>
        ) 
    }
}

export default Study

