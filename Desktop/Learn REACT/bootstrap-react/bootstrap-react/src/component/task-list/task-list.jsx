import { ListGroup, Button } from "react-bootstrap"
import '../task-list/task-list.css'

function TaskList({tasks, removeList}) {
    
    return (
        <ListGroup variant="flush">
            {tasks.map(item => {
               return <li key={item.id} className='list-unstyled w-100 d-flex mb-4 pb-0 shadow'>
                            <ListGroup.Item name={item.type} size='lg' className="btnTask" action>
                                {item.task}
                            </ListGroup.Item>
                            <Button 
                                className="btnDone"
                                variant="outline-success" 
                                size='lg' 
                                onClick={() => removeList(item.id, item.type)}>
                                    done
                            </Button>
                        </li>
            })}
        </ListGroup>
    )
}

export default TaskList