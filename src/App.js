import React, { useState } from 'react';
import { Button, Form, Navbar, Container } from 'react-bootstrap';
import { speechText, speechStop } from './api'
import settings from './settings';
import DropDown from './components/DropDown';
import './App.css';

const App = () => {
  const [play, setPlay] = useState(false);
  const [txt, setTxt] = useState('');
  const [voice, setVoice] = useState(0);
  const [speed, setSpeed] = useState(0);

  const toggle = () => {
    if (!isLatin(txt)) {
      alert('Sorry, but the input language is only English');
      return;
    }

    setPlay(!play);

    if (!play) {
      speechText(txt, settings.speechVoices[voice], speed + 1, () => setPlay(false));
    } else {
      speechStop();
    }
  }

  const handleChange = (event) => {
    const fleldVal = event.target.value;
    setTxt(fleldVal);
  }

  const clear = () => setTxt('');

  const isLatin = (text) => {
    return /[A-z-0-9]/i.test(text);
  }

  return (
    <div className="App">
      <Container>
        <Navbar className="navBar">
          <Button onClick={() => toggle()} className="btnPlay btn-warning" disabled={txt.length === 0}>
            <img className='imgIcon' alt="control" src={!play ? './play.png' : './stop.png'} />
          </Button>
          <DropDown data={settings.speechVoices} selected={voice} setSelect={(val) => setVoice(val)} className="DropDown" />
          <DropDown title='speed' data={settings.speechSpeeds} selected={speed} setSelect={(val) => setSpeed(val)} className="DropDown" />
        </Navbar>
        <Form className="MyForm">
          <Form.Group className="MyFormGroup">
            <Form.Control
              value={txt}
              onChange={handleChange}
              as="textarea" />
          </Form.Group>
          <Button onClick={() => clear()} className="btn-clear" disabled={play}>Clear</Button>
        </Form>
      </Container>
    </div>
  );
}

export default App;
