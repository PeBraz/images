import React, {useState} from 'react';
import './App.css';

const API_URL = "http://localhost:3000";
const MAX_RESULTS = 100;

function requestImages() {
  return fetch(`${API_URL}/images`).then(res => res.json());
}

function searchTree(input, branch, results) {
  if (results.length < MAX_RESULTS) {
    if (branch.name.includes(input)) {
      results.push(branch);
    }
    for (const child of branch.children) {
      searchTree(input, child, results);
    }
  }
  return results;
}

function Search({onClick}) {
  const [input, setInput] = useState('');
  return (
    <div className="app-search" className="input-group">
      <input
        type="text"
        className="form-control"
        value={input}
        onChange={({target: {value}}) => setInput(value)}
        placeholder="Search..."
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" onClick={() => onClick(input)}>Search</button>
      </div>
    </div>
  );
}

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      open: {},
      input: '',
      search: null,
    };
  }
  componentDidMount() {
    requestImages().then(images => this.setState({images}));
  }

  renderRow(row) {
    const {name, size, children} = row;
    const isOpen = this.state.open[name];
    const onClick = () => this.setState(({open}) => ({open: {...open, [name]: !open[name]}}));
    if (size === 0 ) {
      return (
        <li>
          <div className="list-item-title">
            {name}
          </div>
        </li>
      );
    }
    return (
      <li>
        <div className="list-item-title" onClick={onClick}>
          <i className={`fa fa-caret-${isOpen ? 'down' : 'right'}`}></i>
          {name} <span style={{float: 'right'}} className="badge badge-primary">{size}</span>
        </div>
        {isOpen && (
          <ul style={{marginLeft: 20}} className="app-list">{children.map(child => this.renderRow(child))}</ul>
        )}
      </li>
    );
  }
  handleSearch(value) {
    const {images} = this.state;
    if (value.trim().length === 0) {
      return;
    }
    this.setState({
      search: searchTree(value.trim(), images, []),
    });
  }
  renderSearchResults() {
    const {search} = this.state;
    return (  
      <div className="app-results">
        <h4>
          Results
          {/* <span style={{float:'right', cursor: 'pointer'}} }>&times;</span> */}
          <button type="button" class="close" aria-label="Close" onClick={() => this.setState({search: null})}>
            <span aria-hidden="true">&times;</span>
          </button>
        </h4>
        <ul className="app-list">
          {search.map(({name}, index) => (
            <li className="app-results-item" key={`${name}+${index}`}>{name}</li>
          ))}
        </ul>
      </div>
    );
  }
  render() {
    const {images, search} = this.state;
    if (images) {
      return (
        <div className="app">
          <div className="app-search">
            <Search onClick={this.handleSearch.bind(this)} />
          </div>
          {search
          ? this.renderSearchResults() 
          : (
            <ul className="app-list">
              {this.renderRow(images)}
            </ul>
          )}
        </div>
      );
    }
    return (
      <div className="app">
        <div className="app-loading">
          <span>Loading <i className="fa fa-spinner fa-spin"></i></span>
        </div>
      </div>
    );
  }
}
