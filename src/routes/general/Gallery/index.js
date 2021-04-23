import React from "react";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Container from "./Container";
import update from 'immutability-helper';
import axios from "axios";
import { API_ENDPOINT } from "../../../configs";

class Gallery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cards: [],
            loading: false,
            error: false
        }
        this.requests = [
            { res: undefined, finished: true }
        ]
    }
    fetchGallery = async () => {
        let { data: payload } = await axios(`${API_ENDPOINT}/general/gallery`)
        let gallery = payload.data.gallery;
        this.setState({ cards: gallery })
    }
    insertImage = async ({ file }) => {
        let { data: payload } = await axios(`${API_ENDPOINT}/general/base64_to_url`,{
            method: "POST",
            headers: { "Authorization": "Bearer " + window.get_token() },
            data: window.objectToFormData({ image: file })
        })
        let { url } = payload.data;

        let { data: payload_2 } = await axios(`${API_ENDPOINT}/general/gallery/insert_image`, {
            method: "POST",
            headers: { "Authorization": "Bearer " + window.get_token() },
            data: { image_url: url }
        })
        // let { gallery_image } = payload_2.data;
        // this.setState(prevState => {
        //     prevState.cards.push(gallery_image);
        //     return { ...prevState }
        // })
        this.fetchGallery()
        setTimeout(() => {
            this.setState({ cards: [] })
            this.fetchGallery();
        },1500)

    }
    deleteImage = async image_id => {
        let { data: payload } = await axios(`${API_ENDPOINT}/general/gallery/images/${image_id}`,{
            method: "DELETE",
            headers: { "Authorization": "Bearer " + window.get_token() },
        })
        let { code } = payload;
        this.fetchGallery();
        return code === 200
    }
    componentDidMount(){
        this.fetchGallery()
    }
    switch_cards = async (dragIndex, hoverIndex) => {
        return await axios(`${API_ENDPOINT}/general/gallery/switch_images`,{
            method: "POST",
            headers: { 
                "Authorization": "Bearer " + window.get_token()
            },
            data: { index_x: dragIndex, index_y: hoverIndex }
        })
    }
    moveCard = (dragIndex, hoverIndex,isDragging) => {
        let { cards } = this.state;
        cards = JSON.parse(JSON.stringify(cards));
        let x = cards[dragIndex]
        let y = cards[hoverIndex]
        let z = cards[dragIndex].index
        this.switch_cards(x.index,y.index)
        x.id = cards.sort((a, b) => a.id - b.id)[cards.length-1].id + 1
        x.index = y.index;
        y.index = z;
        cards = cards.sort((a, b) => a.index - b.index)
        console.log({dragIndex,hoverIndex,isDragging,cards})
        this.setState({ cards });
    }
    render(){
        let { loading, error, cards } = this.state;
        if (loading || !cards) return "Loading....";
        if (error) return <p>{error.message}</p>
        return (
            <div className="container">
                <div className="row">
                    <h3>Gallery</h3>
                </div>
                <DndProvider backend={HTML5Backend}>
                    <Container 
                        cards={this.state.cards} 
                        moveCard={this.moveCard}
                        insertImage={this.insertImage}
                        deleteImage={this.deleteImage}
                    />
                </DndProvider>
            </div>
        )
    }
}

export default Gallery;