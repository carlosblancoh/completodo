/* eslint-disable react/prop-types */
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import './App.css';
import { db } from './firebase';






function Todo({ todo, index, completeTodo, unCompleteTodo, removeTodo }) {

    return (

        <div className="todo"

            style = {{ textDecoration: todo.isCompleted ? 'line-through' : '' }}

        >

            {todo.text}

            <div>

                <button onClick={() => {

                    if(todo.isCompleted === false) completeTodo(index);

                    else unCompleteTodo(index);

                }}>{todo.isCompleted ? 'Uncomplete' : 'Complete'}</button>

                <button onClick={() => removeTodo(index)}>x</button>

            </div>

        </div>

    );

}



function TodoForm({ addTodo }) {

    const [value, setValue] = React.useState('');



    const handleSubmit = e => {

        e.preventDefault();

        if (!value) return;

        addTodo(value);

        setValue('');

    };



    return (

        <form onSubmit={handleSubmit}>

            <input

                type="text"

                className="input"

                value={value}

                onChange={e => setValue(e.target.value)}

            />

        </form>

    );

}



function App() {

    const [todos, setTodos] = React.useState({});



    /*   useEffect(() => {

    getDocs(collection(db, "tareas")).then(results => {

      setTodos(results.docs.map(snapshot => snapshot.data()));

    })

  }, []); */



    useEffect(() => {

        const unsub = onSnapshot(collection(db, 'tareas'), results => {

            const docs = results.docs.map(snapshot => [snapshot.id, snapshot.data()] );

            const obj = Object.fromEntries(docs);

            setTodos(obj);

        });

        return unsub;

    }, []);



    const addTodo = text => {

        addDoc(collection(db, 'tareas'), {

            text: text,

            isCompleted: false

        });

    };

    /*   const addTodo = text => {

    const newTodos = [...todos, { text }];

    setTodos(newTodos);

  }; */



    const completeTodo = index => {

        updateDoc(doc(db, 'tareas', index), {

            isCompleted: true

        });

    };

    /*  const completeTodo = index => {

    const newTodos = [...todos];

    newTodos[index].isCompleted = true;

    setTodos(newTodos);

  }; */





    const unCompleteTodo = index => {

        updateDoc(doc(db, 'tareas', index), {

            isCompleted: false

        });

    };

    /* const unCompleteTodo = index => {

    const newTodos = [...todos];

    newTodos[index].isCompleted = false;

    setTodos(newTodos);

  }; */



    const removeTodo = index => {

        deleteDoc(doc(db, 'tareas', index));

    };



    /*   const removeTodo = index => {

    const newTodos = [...todos];

    newTodos.splice(index, 1);

    setTodos(newTodos);

  }; */



    return (

        <div className="app">

            <div className="todo-list">

                { Object.entries(todos).map(([key, todo]) => (

                    <Todo

                        key={key}

                        index={key}

                        todo={todo}

                        completeTodo={completeTodo}

                        unCompleteTodo={unCompleteTodo}

                        removeTodo={removeTodo}

                    />

                ))





                    /* {todos.map((todo, index) => (

          <Todo

            key={index}

            index={index}

            todo={todo}

            completeTodo={completeTodo}

            unCompleteTodo={unCompleteTodo}

            removeTodo={removeTodo}

          />

        ))} */

                }

                <TodoForm addTodo={addTodo} />

            </div>

        </div>

    );

}



export default App;
