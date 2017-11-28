import React, { Component } from 'react';
import { getNames } from '../scripts/resources/namesMockResource';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      cursor: 0,
      words: [],
      display: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.highlight = this.highlight.bind(this);
  }

  // callback for getNames function
  // stores array of option elements in state
  handleCallback(words) {
    this.setState(() => {
      return {
        words: words
      }
    });
  }

  // handles change for input field
  handleChange(event) {
    const value = event.target.value;
    if (this.state.input === value) return;
    this.setState(() => {
      return {
        input: value,
        display: true
      }
    });
    getNames(value, this.handleCallback);
  }

  // handles key events for selected from dropdown
  handleKeyDown(event, words) {
    let keyCode = event.keyCode;
    // arrow up
    switch(keyCode) {
      case 38:
        if (this.state.cursor > 0) {
          this.setState((prevState) => {
            return { cursor: prevState.cursor - 1 }
          });
        }
        break;
    // arrow down
      case 40:
        this.setState((prevState) => {
          return { cursor: prevState.cursor + 1 }
        });
        break;
    // enter
      case 13:
        this.setState({ input: words[this.state.cursor], cursor: 0, display: false }, () => {
          getNames(words[this.state.cursor], this.handleCallback);
        });
        // get the corresponding value
        break;
    }
  }

  // handles click event for selected from dropdown
  selectOption(e) {
    const element = e.target;
    const cursor = parseInt(element.id.slice(14));
    const value = element.textContent;
    this.setState(() => {
      getNames(value, this.handleCallback);
      return {
        cursor: cursor,
        input: value,
        display: false
      }
    });
  }

  // replace input with bolded input
  highlight(input, word) {
    let html = word.replace(new RegExp(input, "i"), (input) => {
        return '<b>' + input + '</b>';
    });
    return {__html: html};
  }

  render() {
    let { input, words } = this.state;
    return (
      <div className='autocomplete'>
        <input
          className='input'
          onChange={this.handleChange}
          onKeyDown={(e) => this.handleKeyDown(e, words)}
          value={input}/>
        <div
          className='dropdown'
          style={{display: this.state.display ? 'block' : 'none' }}>
          {input.length > 0 ? this.state.words.map((word, i) => {
            return (
            <div
              id={'item-'+ i}
              key={i}
              className={'item' + (this.state.cursor === i ? ' highlight' : '')}
              onClick={this.selectOption} dangerouslySetInnerHTML={this.highlight(input, word)}></div>)
          }) : ''}
        </div>
      </div>
    );
  }
}

export default Autocomplete;