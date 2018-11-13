import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
class LyricList extends Component {

  onLike (id, likes) {
    console.log(`id : -->  ${id} likes: --> ${likes}`)
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: { id, likes: likes + 1, __typename: 'LyricType' }
      }
    })
  }

  render() {
    console.log('rendering lyrics' + this.props.song.lyrics)
    return (
      <ul className="collection">
        {this.props.song.lyrics.map(({ content, id, likes }) => {
          return (
            <li key={id} className="collection-item">
              {content}
              <div className="vote-box">
                <i className="material-icons" onClick={() => this.onLike(id, likes)}>
                  thumb_up
                </i>
                {likes}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

const mutation = gql`
mutation LikeLyric($id: ID!){
  likeLyric(id: $id){
    id
    likes
  }
}
`
export default graphql(mutation)(LyricList)
