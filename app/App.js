import React from 'react';
import './App.css';

export default class App extends React.PureComponent {
    render() {
        return (
            <div className="app">
                <ul className="app-list">
                    <li>Hello</li>
                    <li>World</li>
                </ul>
            </div>
        );
    }
}