import { Button } from "react-bootstrap"
import { useState } from "react";

import './add-list'

function AddList({onAddlist}) {
    const [value, setValue] = useState('');
    const changes = (e) => {
        setValue(e.target.value)
    };

    const subListItem = (e) => {
        e.preventDefault();
        onAddlist(value);
        setValue('')
    }
    
    return (
            <form className="container-fluid shadow pt-3 mb-3" onSubmit={subListItem}>
                <input name="inp" onChange={changes} value={value}  className='form-control form-control-lg mb-3' type="text" placeholder='type...' />
                <Button type='submit' name="btn" className='button w-100' size='lg' variant="outline-dark">new list</Button>
            </form>
    )
}

export default AddList