import React, {Component} from 'react'

class Article extends Component {

  state = {
    isOpen: false
  }

  render() {
    const {article} = this.props
    const body = <section>{article.content}</section>
    return (
      <div>
        <button onClick={this.clickHandle}>
          {this.state.isOpen ? 'Close' : 'Open'}
        </button>
        <h2>{article.title}</h2>
        {this.state.isOpen ? body : ''}
        <p>Additional text</p>
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
