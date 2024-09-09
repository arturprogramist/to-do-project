import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Service from '../service/Service';

import Header from '../header/header';
import AddList from '../add-list/add-list';
import ToDoList from '../to-do-list/to-do-list';
import AddTask from '../add-task/add-task';
import TaskList from '../task-list/task-list';

import './App.css';

function App() {
  const service = new Service();

  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingTask, setLoadingTask] = useState(true);
  const [current, setCurrent] = useState('');

  const getList = async () => {
    setLoadingList(true);
    try {
      const data = await service.getApi('list');
      setLists(data._embedded.toDoListList.map(item => ({
        id: item.id,
        type: 'list',
        valueList: item.name,
      })));
    } catch (error) {
      console.error('Ошибка при загрузке списка:', error);
    } finally {
      console.log(lists)
      setLoadingList(false);
    }
  };

  const getTask = async () => {
    setLoadingTask(true);
    try {
      const data = await service.getApi('task');
      setTasks(data._embedded.taskList.map(item => ({
        id: item.id,
        name: item.name,
        type: 'task',
        task: item.task,
      })));
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    } finally {
      setLoadingTask(false);
    }
  };

  useEffect(() => {
    if (current) {
      getTask();
    }
  }, [current]);

  useEffect(() => {
    getList();
  }, []);

  const onAddTask = async (task) => {
    if (task.length > 0) {
      try {
        await service.postApi('task', { name: current, task });
        await getTask();
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      }
    }
  };

  const onAddList = async (value) => {
    if (value.length > 0) {
      try {
        await service.postApi('list', { name: value });
        await getList(); 
      } catch (error) {
        console.error('Ошибка при добавлении списка:', error);
      }
    } else {
      alert('Слишком короткое название');
    }
  };

  const removeList = async (id, type, name) => {
    try {
      if (type === 'list') {
        // Удаление списка
        await service.deleteElem('list', id);
  
        // Удаление всех задач, связанных с этим списком
        const tasksToRemove = tasks.filter(item => item.name === name);
        for (const task of tasksToRemove) {
          await service.deleteElem('task', task.id);
        }
  
        // Обновление состояния после удаления
        await getList();
        await getTask(); // Обновляем список
      } else if (type === 'task') {
        // Удаление задачи
        await service.deleteElem('task', id);
  
        // Обновление состояния после удаления
        await getTask(); // Обновляем задачи
      }
  
      // Проверка текущего списка задач и обновление состояния
      const count = tasks.filter(item => item.name === current).length;
      if (tasks.length === 0 || count === 0) {
        setCurrent('');
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const showTask = (current) => {
    return tasks.filter(item => item.name === current);
  };

  const currentTask = showTask(current);

  return (
    <Container className='container'>
      <Header 
        amountOfLists={lists.length}
        amountOfTasks={tasks.length}
      />
      <Row>
        <Col className='col-3'>
          <AddList onAddlist={onAddList} />
          {loadingList ? 'loading...' : (
            <ToDoList 
              className="shadow" 
              lists={lists} 
              removeList={removeList}
              onCurrent={setCurrent}
              current={current}
            />
          )}
        </Col>
        <Col className='col-9'>
          <AddTask 
            onAddTask={onAddTask}
            current={current}
          />
          {loadingTask ? 'loading...' : (
            <TaskList 
              tasks={currentTask} 
              removeList={removeList}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;