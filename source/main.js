import React from 'react';
import { render } from 'react-dom';
import Autocomplete from './components/Autocomplete';
import './styles/main.css';
import './scripts/example';

render(
  <Autocomplete />, document.getElementById('content')
);