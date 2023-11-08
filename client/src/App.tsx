import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Card from "./components/Card";
import Add from './components/Add';

function App() {

  interface Quotes {
    _id: string;
    quote: string;
  }

  const [todoData, setTodoData] = useState<Quotes[]>([]);
  const [fetchState, setFetchState] = useState(true)


  const validateQuote = (quote: string) => {
    if (quote.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const switchFetchState = () => {
    if (fetchState) {
      setFetchState(false);
    } else {
      setFetchState(true);
    }
  }

  const deleteQuote = async (_id: string) => {
    await fetch(`/quotes/${_id}`, {
      method: 'DELETE',
    });
    switchFetchState()
  }

  const editQuote = async (_id: string, quote: string) => {
    if (validateQuote(quote)) {
      await fetch(`/quotes/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quote })
      });
      setTodoData(prevData => prevData.map(q => q._id === _id ? { ...q, quote } : q));
      switchFetchState()
    } else {
      alert('Invalid quote');
    }
  }

  useEffect(() => {
    if (fetchState) {
      fetch('/quotes')
        .then(res => res.json())
        .then((data: Quotes[]) => setTodoData(data));
      switchFetchState()
    }
  }, [editQuote, deleteQuote]);

  return (
    <>
      <h1 className='text-center my-5'><u>Quotes</u></h1>
      <Add switchFetchState={switchFetchState} />
      <ul className="list-group">
        {todoData.map((quote) => <Card quote={quote.quote} _id={quote._id} deleteQuote={deleteQuote} editQuote={editQuote} key={quote._id} />)}
      </ul>
    </>
  );
}

export default App
