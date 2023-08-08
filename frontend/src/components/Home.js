import React from 'react';

import { Notes } from './Notes';

function Home() {
  
  return (
    <div className='container my-3'>
      <h2>Add a Note</h2>
      <form className='my3'>
        <div className="form-group">
          <label for="title">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <input type="textarea" className="form-control" id="description" name="description" placeholder="Enter your description" />
        </div>
        <div className="form-group">
          <label for="tag">Tag</label>
          <input type="textarea" className="form-control" id="tag" name="tag" placeholder="Enter your description" />
        </div>
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
      <h2>Your Notes</h2>
      <Notes/>
    </div>
  )
}

export default Home