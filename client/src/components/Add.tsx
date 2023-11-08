import { useState } from 'react'

interface Props {
    switchFetchState: Function;
}

const Add = ({ switchFetchState }: Props) => {

    const [newQuote, setNewQuote] = useState('');

    const validateQuote = (quote: string) => {
        if (quote.trim().length > 0) {
            return true;
        } else {
            return false;
        }
    }

    const addQuote = async (quote: string) => {
        if (validateQuote(quote)) {
            await fetch('/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quote })
            });
            switchFetchState();
            setNewQuote('');
        }
    }

    return (
        <>
            <div className="card mx-5 mb-5" style={{ border: 'None' }}>
                <div className="card-body d-flex justify-content-between align-items-center">
                    <input className='w-75 form-control border border-dark' type='text' value={newQuote} onChange={(e) => setNewQuote(e.target.value)} placeholder='Add new quote ...❤️' />
                    <div className='w-25 d-flex justify-content-evenly ms-2'>
                        <button className='btn btn-outline-primary m-2 p-2 w-50' onClick={() => { addQuote(newQuote) }}>
                            Add
                        </button>
                        <button className='btn btn-outline-success m-2 p-2  w-50' onClick={() => { switchFetchState() }}>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add