import React, { useState, useEffect } from "react";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";

// Home screen component should be found at "/" path, is whole screen under header
// should request from API to list all Decks in data and store in local state
    // controlled by changes in layout state of all decks
// on return should always display create deck button linked to CreateDeck component
// and should display each deck by mapping and sending to DeckList component 

function Home ({ updateDecks, deckLength }) {
//props updateDecks function to setDeckLength, deckLength lifted layout state of allDecks
    const [decks, setDecks] = useState([])
    //create new state of empty array

    //fetch the decks if they exist from api
    useEffect(() =>{
       
        //fetch listDecks promise from API server utilities of decks data
        const fetchDecks = async () => {
            const ApiDecks = await listDecks()
            setDecks(ApiDecks)
            //use local state to hold decks
        }
        fetchDecks()  //let resolve within effect

    }, [deckLength])
    //condition to fire effect depends on changes to deckLength
    //every value in effect should also appear in dependency array
    //all deck objects from API have Id property


    // return row of button wrapped in Link to /decks/new which will find route in index.js
    // row of method to map local decks and call DeckList with each deck
        // DeckList props each deck with deck.id, deck, 
        // and layout function to edit layout state of deckLength
    return ( 
        <div>
            <div className='row mx-auto'>
                <Link to={'/decks/new'} className='btn btn-secondary mb-2'>
                <button type="button" className="btn btn-secondary">+ Create Deck</button>   
                </Link>
            </div>
            <div className='row mx-auto'>
                {decks.map((deck) => 
                <DeckList 
                    key={deck.id}
                    deck={deck}
                    updateDecks={updateDecks}
                />
                )}
            </div>
        </div>

     );
}
 
export default Home;