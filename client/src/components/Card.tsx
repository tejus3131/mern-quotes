import { useState } from 'react';

interface Props {
    quote: string;
    _id: string;
    deleteQuote: Function;
    editQuote: Function;
}

const Card = ({ quote, _id, deleteQuote, editQuote }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newQuote, setNewQuote] = useState(quote);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewQuote(quote);
    };

    const handleSaveClick = () => {
        editQuote(_id, newQuote);
        setIsEditing(false);
    };

    return (
        <li className='mx-5 p-4 list-group-item d-flex justify-content-between align-items-center' key={_id}>
            {isEditing ? (
                <>
                    <input type='text' value={newQuote} onChange={(e) => setNewQuote(e.target.value)} />
                    <div className=''>
                        <button className='btn btn-outline-primary m-2 p-2' style={{ width: '100px' }} onClick={handleSaveClick}>
                            Save
                        </button>
                        <button className='btn btn-outline-danger m-2 p-2' style={{ width: '100px' }} onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {quote}
                    <div className=''>
                        <button className='btn btn-outline-primary m-2 p-2' style={{ width: '100px' }} onClick={handleEditClick}>
                            Edit
                        </button>
                        <button className='btn btn-outline-danger m-2 p-2' style={{ width: '100px' }} onClick={() => deleteQuote(_id)}>
                            Delete
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;