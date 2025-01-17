import React, { Component } from 'react';
import NotFound from './Pages/NotFound';
import MainPage from './Pages/MainPage';
import FolderPage from './Pages/FolderPage';
import NotePage from './Pages/NotePage';
import UserContext from './components/UserContext';
import {Route, Switch, Link} from 'react-router-dom';



export default class App extends Component {

  state = {
    folders: [],
    notes: []
  }

  //fetch for /folders and notes
  componentDidMount(){
  fetch('http://localhost:9090/folders')
    .then(response => response.json())
    .then(data => this.setState(
      {
        folders: data
      }
    ))
  fetch('http://localhost:9090/notes')
    .then(response => response.json())
    .then(data => this.setState(
      {
        notes: data
      }
      ))
  }

  //delete function
  handleDelete = (id) => {
    console.log(id)
    fetch(`http://localhost:9090/notes/${id}`, {
       method: 'DELETE',
       headers: {
         'content-type': 'application/json'
    }
    
    })
    .then(data => {
      if (data.ok) { 
        this.setState({
          notes: this.state.notes.filter(val => val.id !== id )
        })
    }})
}

  render() {
    return (
      <UserContext.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes,
        onDelete: this.handleDelete
    }}>
      <div>
        <Link to="/"><h1>Noteful</h1></Link>
        <Switch>
          <Route exact path='/' 
          component={MainPage}
            />
            <Route exact path='/FolderLists/:folderId' 
            component={FolderPage}
             />
             <Route exact path='/Notes/:noteId' 
              component={NotePage}
              />
          <Route component={NotFound} />
        </Switch>

    </div>
    </UserContext.Provider>
    )
  }
}


