import React, { useState } from 'react';
import Card from './Card';

const style = {
    // width: 400,
};
export default (props) => {
    {
        console.log("props.cards",props.cards)
        return (
            <div className="row" style={style}>
                {props.cards.map(
                    (card, i) => (
                        <Card 
                            card={card} 
                            key={card.id} 
                            index={i} 
                            id={card.id} 
                            text={card.id} 
                            moveCard={props.moveCard}
                            deleteImage={props.deleteImage}
                        />
                    )
                )}
                <Card 
                    card={{ id: -1 }} 
                    key={-1} 
                    index={-1} 
                    id={-1} 
                    text={-1} 
                    moveCard={props.moveCard}
                    insertImage={props.insertImage}
                />

            </div>
        );
    }
};
