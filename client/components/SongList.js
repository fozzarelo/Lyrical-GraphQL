import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import fetchSongs from '../queries/fetchSongs'

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id },
      refetchQueries: [{ query: fetchSongs }],
    })
  }
  renderSongs() {
    const { songs, loading } = this.props.data
    if (loading) return <div>Loading...</div>
    else return songs.map(({ id, title }) => {
      return (
        <li className="collection-item" key={id}>
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      )
    })
  }
  render() {
    return (
      <div>
        <h4>Songlist:</h4>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new/"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID){
    deleteSong(id: $id){
      id
      title
    }
  }
`
export default graphql(mutation)(
  graphql(fetchSongs)(SongList)
)
