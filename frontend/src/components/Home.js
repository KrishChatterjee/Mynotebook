import React from 'react';
import { Notes } from './Notes';
import { AddNote } from './AddNote';

function Home() {
  
  return (
    <>
    {/* AddNote component used to add a Note */}
     <AddNote/>
      <Notes/>
    </>
  )
}

export default Home