import React from 'react'


//Noteitems component is a card componet that display each note 
export const Noteitem = (props) => {
    const { note } = props
    return (
        <div className='col-md-3'>
            <div className="card text-white bg-secondary my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                </div>
            </div>
        </div>
    )
}
