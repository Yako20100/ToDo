import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let indexCounter = 0;

function App() {
  const [toDoFields, setToDoFields] = useState([])
  const [checkedfiles, setcheckedfiles] = useState([])
  const [newInputText, setNewInputText] = useState("")
  const ToDoList = () => toDoFields.map((todo)=> NewRow(todo.i, todo.text, todo.checked))
  const CheckedfilesList = () => checkedfiles.map((checkedfile)=> NewRow(checkedfile.i, checkedfile.text, checkedfile.checked))

  function NewRow(i, todotexts, ischecked){
    return <div className='Row' key={i}>
        <button className='Delete' onClick={() => {
            var list = [...toDoFields];
            list = list.filter((todo) => {return todo.i !== i});
            setToDoFields(list)
            var checkedfilelist = [...checkedfiles];
            checkedfilelist = checkedfilelist.filter((todo) => {return todo.i !== i});
            setcheckedfiles(checkedfilelist)
          }}>Delete
        </button>
        <input checked={ischecked} className='Checkbox' type="checkbox" onChange={() => {
            var list = [...toDoFields]
            list = list.map((todo) => {
              if(todo.i == i){
                todo.checked = true

                var notCheckedList = [...toDoFields]
                notCheckedList = notCheckedList.filter((todo) => {return todo.checked == false})
                setToDoFields(notCheckedList)
            
                var checkedList = [...toDoFields]
                checkedList = checkedList.filter((todo) => {return todo.checked == true});
                checkedList.push(...checkedfiles)
                setcheckedfiles(checkedList)
                return todo
              }
              else{
                return todo
              }
            })
            list = [...checkedfiles]
            list = list.map((todo) => { 
              if(todo.i == i){
                todo.checked = false
                
                var notCheckedList = [...checkedfiles]
                notCheckedList = notCheckedList.filter((todo) => {return todo.checked == true})
                setcheckedfiles(notCheckedList)
            
                var checkedList = [...checkedfiles]
                checkedList = checkedList.filter((todo) => {return todo.checked == false});
                checkedList.push(...toDoFields)
                setToDoFields(checkedList)
                return todo
              }
              else{
                return todo
              }
            })
          }}
        />
        <p className='TextField'>{todotexts}</p>
      </div>
  }
  
  return (
    <>
      <div>
        <input className='Input' type="text" value={newInputText} onChange={(ev)=>{setNewInputText(ev.target.value)}}
        onKeyDown={(e) => {if(e.code == "Enter"){
          var tempList = [...toDoFields];
          tempList.push({i: indexCounter, text: newInputText, checked: false});
          setToDoFields(tempList);
          indexCounter++;
          setNewInputText("")
        }}}/>
        <button className='Add' onClick={()=>{
          var tempList = [...toDoFields];
          tempList.push({i: indexCounter, text: newInputText, checked: false});
          setToDoFields(tempList);
          indexCounter++;
          setNewInputText("")}}>Add</button>
      </div>
       <ToDoList />
       <CheckedfilesList />
    </>
  )
}

export default App