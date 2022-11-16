import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home"
import Study from "./Study"
import AddCard from "./AddCard"
import EditCard from "./EditCard"
import CreateDeck from "./CreateDeck"
import Deck from "./Deck"
import EditDeck from "./EditDeck"
import NotFound from "./NotFound"


function Layout() {
  const [deckLength, setDeckLength] = useState(0)
  // create state object to hold decks
  // update the collection of decks by adding the total number of decks together
  const updateDecks = (newDecks) => {
    setDeckLength(() => deckLength + newDecks)
    //-1 to delete deck on end of array
  }
 
  // header always present
  // route "/" to Home component, loads decks from API, returns .map to DeckList component
    // DeckList component, displays current deck if exist, 
    // in deck user deletes deck or sends deck to link
      // link to "/decks/${id}" Deck component, link to "/decks/${id}/study"
  // route "/decks/new" to createDeck component, screen for user to create new deck
    // link back to "/" home
  //route "/decks/${id}" Deck component 
  return (
    <div>

      {/* header component */}
      <Header />

      <div className="container mb-4">
        {/* TODO: Implement the screen starting here */}

        <Switch>
    
          {/* home screen component */}
          <Route path="/" exact>
            <Home updateDecks={updateDecks} deckLength={deckLength} />
          </Route>

           {/* createDeck screen component */}
          <Route path="/decks/new">
            <CreateDeck updateDecks={updateDecks} />
          </Route>

           {/* deck component */}
          <Route path="/decks/:deckId" exact>
            <Deck updateDecks={updateDecks} />
          </Route>

           {/* study component */}
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

           {/* edit deck component */}
          <Route path="/decks/:deckId/edit">
            <EditDeck updateDecks={updateDecks} />
          </Route>

           {/* add card component */}
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

           {/* edit card component */}
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

           {/* not found component for errors */}
          <Route>
            <NotFound />  
          </Route>

        </Switch>
        
      </div>
    </div>
  )
}

export default Layout