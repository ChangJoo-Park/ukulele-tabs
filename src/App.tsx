import React, { useState } from "react";
import Soundfont from 'soundfont-player'
import omit from "lodash/omit";
import Staff from "./Staff";
import Tabs from "./Tabs";
import "./app.css";

export default function App() {
  const [notes, setNotes] = useState({});

  const onNoteClick = (column: number, note: string) => {
    notes[column] === note
      ? setNotes(omit(notes, column))
      : setNotes({ ...notes, [column]: note });
  };

  const onPlayClick = () => {
    const AudioContext = window['AudioContext']
    Soundfont.instrument(new AudioContext(), 'acoustic_guitar_nylon')
      .then(function (acoustic_guitar_nylon) {
        Object.keys(notes).forEach(key => {
          acoustic_guitar_nylon.play(notes[key])
        })
      })
  }
  return (
    <div className="App">
      <h1>Notes to Ukulele Tabs</h1>

      <button onClick={onPlayClick}>Play!</button>

      <p className="App__hint">
        Hint: Click on staff to place a note. Click on a tab to toggle the tab.
      </p>
      <Staff notes={notes} onNoteClick={onNoteClick} />
      <Tabs notes={notes} />
    </div>
  );
}
