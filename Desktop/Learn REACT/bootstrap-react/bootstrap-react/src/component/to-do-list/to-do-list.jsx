import { Button, CloseButton } from "react-bootstrap";
import { useState } from "react";

import '../to-do-list/to-do-list.css'

function ToDoList({lists, removeList, onCurrent, current}) {

    const [indexActive, setIndexActive] = useState(0)

    const test = lists.map((item, index)=> (
        
        <li key={item.id + 110} className='list-unstyled w-100'>
            <Button 
                name={item.type} 
                className= {indexActive === index ? "button active" : "button"}
                size='lg' 
                key={item.id + 30} 
                variant="outline-dark"
                onClick={() => {
                    onCurrent(item.valueList)
                    setIndexActive(index)
                }}>
                    {item.valueList}
            </Button>
  
  
            <CloseButton key={item.id + 10} onClick={() => {
                console.log(`Click to remove: ${item.id}, ${item.type}, ${item.valueList}`);
                removeList(item.id, item.type, item.valueList)
                }}/>             
          </li>
      ));

      let showForm = (current === '' && lists.length === 0) ? <></> : 
        <ul className="list-inline container-fluid w-100 shadow pt-3 pb-1">
            {test}
        </ul>

    return (
        {...showForm}
    )
}

export default ToDoList;