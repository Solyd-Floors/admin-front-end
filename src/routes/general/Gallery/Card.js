import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget, } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    marginLeft: '1rem',
    marginRight: 5,
    backgroundColor: 'white',
    cursor: 'move',
    margin:5,
    border:"1px solid #ccc",
    float:"left",
    width: 200,
    height: 100,
    backgroundImage: "url('https://app-1453.s3.amazonaws.com/f1b9f130-9b86-11eb-9059-4bb165eb664f')",
    backgroundSize: "contain"

};
const Card = forwardRef(function Card({ 
    card, 
    text, 
    isDragging, 
    connectDragSource, 
    connectDropTarget, 
    insertImage,
    deleteImage
}, ref) {
    const elementRef = useRef(null);
    const fileInputRef = useRef(null);
    card.id !== -1 && connectDragSource(elementRef);
    card.id !== -1 && connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
        getNode: () => elementRef.current,
    }));
    let new_style = { ...style }
    if (card.id === -1) {
        new_style.backgroundImage = "url('https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png')"
        new_style.cursor = "pointer"
    } else {
        new_style.backgroundImage = `url('${card.image_url}')`

    }
    let onFileChange = (e) => {
        let file = e.target.files[0]
        var fr = new FileReader();
        fr.onload = d => {
            console.log("ON_LOAD")
            let src = d.srcElement.result;
            insertImage({ file });
            fileInputRef.current.value = ""
        }
        fr.readAsDataURL(file);
    }
    let onClick = e => {
        if (card.id !== -1) return;
        let { current } = fileInputRef;
        current.click();
    }
    let deleteCard = card_id => e => {
        deleteImage(card_id);
    }
    return (
        <div ref={elementRef} style={{marginLeft: 50, marginRight: 50}} className="">
            {
                card.id === -1 && 
                <input 
                    ref={fileInputRef} 
                    type="file" 
                    style={{display:"none"}}
                    onChange={onFileChange}
                />
            }
            <div onClick={onClick} style={{ ...new_style, opacity, ...{marginLeft: 50, marginRight: 50} }}>
                <div style={{ display: "inline" }}>{text}</div>-
                {
                 card.id !== -1 &&
                    <div style={{ 
                        zIndex: 100, 
                        cursor: "pointer", 
                        display: "inline", 
                        backgroundColor:"red",
                        width: 15, 
                        height: 15, 
                        borderRadius: "100%"
                    }} onClick={deleteCard(card.id)}>
                        x
                    </div>
                }
            </div>
        </div>
    );
});
export default DropTarget(ItemTypes.CARD, {
    hover(props, monitor, component) {
        if (!component) {
            return null;
        }
        // node = HTML Div element from imperative API
        const node = component.getNode();
        if (!node) {
            return null;
        }
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = node.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
}, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.CARD, {
    beginDrag: (props) => ({
        id: props.id,
        index: props.index,
    }),
}, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(Card));
