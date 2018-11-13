import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import fetchSong from '../queries/fetchSong'

class LyricCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
  }
  onSubmit(event) {
    event.preventDefault
    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId,
      },
      // refetchQueries: [{ query: fetchSong }],
    }).then(this.setState({ content: ''}))
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit.bind(this)}
        >
          <label>Add a lyric:</label>
          <input
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
        </form>
      </div>
    )
  }
}
const mutation = gql`
  mutation AddLyric($content: String!, $songId: ID!){
    addLyricToSong(content: $content, songId: $songId){
      id
      lyrics{
        id
        content
        likes
      }
    }
  }
`
// Flow usring a refech query
// export default graphql(fetchSong, {
//   options: (props) => {
//     return { variables: { id: props.songId }}
//   },
// })(graphql(mutation)(LyricCreate))

// Flow relying on apolo's dataIdFromObject data awareness
export default graphql(mutation)(LyricCreate)
