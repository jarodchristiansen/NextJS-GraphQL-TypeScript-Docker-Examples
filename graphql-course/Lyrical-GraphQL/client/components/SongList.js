import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';
import query from '../queries/fetchSongs';

const SongList = (props) => {

    const {data} = props;

    const onSongDelete = (id) => {
        props.mutate({variables: { id }}).then(() => data.refetch())

    }

    const renderSongs = () => {
        return data.songs.map(({id, title}) => {
            return (
                <li key={id} className={"collection-item"}>
                    <Link to={`/songs/${id}`}>
                        {title}
                    </Link>

                    <i
                        className={"material-icons"}
                        onClick={() => onSongDelete(id)}
                    >
                        delete
                    </i>
                </li>
            )
        })
    }

    data.loading && (<div>Loading ...</div>)

    return (
        <div>
            <ul className={"collection"}>
                {!data.loading && renderSongs()}
            </ul>


            <Link to={"/songs/new"} className={"btn-float btn-large red right"}>

                <i className={"material-icons"}>add</i>
            </Link>
        </div>

    )
}


const mutation = gql`
 mutation DeleteSong($id: ID) {
   deleteSong(id: $id) {
     id
     title
   }
 }
`


export default graphql(mutation)(
    graphql(query)(SongList)
)
