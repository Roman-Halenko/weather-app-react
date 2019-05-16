import React, {Component} from 'react'

class Article extends Component {

  state = {
    isOpen: false
  }

  render() {
    const {article} = this.props
    const body = this.state.isOpen && <section>{article.content}</section>
    return (
      <div>
        <h2>{article.title}</h2>
        {body}
        <p>Additional text</p>
        <button onClick={this.clickHandle}>
          {this.state.isOpen ? 'Close' : 'Open'}
        </button>
      </div>
    )
  }

  clickHandle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}

export default Article
