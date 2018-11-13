import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import fetchSong from '../queries/fetchSong'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends Component {
  render() {
    const { song } = this.props.data
    if (!song) return <div></div>
    return (
      <div>
        <div>
          <Link to="/">go back</Link>
        </div>
        <h4>{song.title}</h4>
        <LyricList song={song} />
        <LyricCreate songId={song.id}/>
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id }}
  },
})(SongDetail)
