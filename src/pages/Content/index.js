import React from 'react';
import {createRoot} from 'react-dom/client';
import {GlobalProvider} from './context/GlobalState'

import Content from './Content';
import './index.css';
import { SettingsProvider } from './context/SettingsState';

const app = document.createElement('span');
const body = document.querySelector('body');
app.id = "git-wrapper";

if(body) {
    body.prepend(app);  
}

const container = document.getElementById('git-wrapper');
const root = createRoot(container);


root.render( 
    <GlobalProvider>
      <SettingsProvider>
      <Content/>
      </SettingsProvider>
    </GlobalProvider>
    );












