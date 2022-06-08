import { useEffect, useState, useReducer, FormEvent } from 'react';
import Gun from 'gun';
import Message from './components/Message';

const gun = Gun({
  peers: ['http://localhost:3030/gun'],
});

const initialState = {
  messages: [],
};

function reducer(state, message) {
  return {
    messages: [message, ...state.messages],
  };
}

function App() {
  const [formState, setForm] = useState({
    author: '',
    body: '',
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const messages = gun.get('messages');

    messages.map().once((m) => {
      dispatch({
        author: m.author,
        body: m.body,
        date: m.date,
      });
    });
  }, []);

  function onChange(e) {
    setForm({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  function saveMessage() {
    const messages = gun.get('messages');

    messages.set({
      author: formState.author,
      body: formState.body,
      date: Date.now(),
    });

    setForm({
      author: '',
      body: '',
    });
  }

  return (
    <div style={{ padding: 30 }}>
      <input
        onChange={onChange}
        placeholder='Name'
        name='author'
        value={formState.author}
      />
      <input
        onChange={onChange}
        placeholder='Message'
        name='body'
        value={formState.body}
      />
      <button onClick={saveMessage}>Send Message</button>
      {
        state.messages
          .filter((v, i, s) => i === s.findIndex((t) => (t.date === v.date)))
          .sort((a, b) => b.date - a.date)
          .map((message) => (
          <Message author={message.author} body={message.body} date={message.date} />
        ))
      }
    </div>
  );
}

export default App;
