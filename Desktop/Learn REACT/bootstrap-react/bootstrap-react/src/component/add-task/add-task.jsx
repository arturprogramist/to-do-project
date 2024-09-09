import { Button } from "react-bootstrap"

import './add-task'
import { useState } from "react"

function AddTask({onAddTask, current}) {

    const [value, setValue] = useState('')

    const changes = (e) => {
        setValue(e.target.value)
    };

    const subTask = (e) => {
        e.preventDefault()
        onAddTask(value);
        setValue('');
    }

    let showForm = current === '' ? 
                <>
                </>
            :
                <form onSubmit={subTask} className="container-fluid shadow pt-3 mb-3">
                    <input name="inp" value={value} onChange={changes} className='form-control form-control-lg mb-3' type="text" placeholder='type...' />
                    <Button type="submit" name="btn" className='button w-100' size='lg' variant="outline-dark">new task</Button>
                </form>
            

    return (
        {...showForm}
    )
}

export default AddTask