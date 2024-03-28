import { useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";


export default  function App() {
  const [items, setItems] = useState([]);

  const lastItemID = items[items.length - 1]?.id ;

  function handleAddItem(item){
    setItems(prev=>[...prev,item])
  }

  function handleDelete(id){
    console.log(id)
    setItems(prev=>prev.filter(item=>item.id !== id)); 
  }

  function handleToggleItem(id){
    setItems(prev=>items.map(
      item=>item.id===id? {...item,packed: !item.packed} : item)
      )
  }

  function handleClear(){
    if(!items.length) return;
    console.log(items)

    const confirmed = window.confirm('Are you sure want to delete all the items')
    
    if(confirmed) setItems([])
  }

  return (
    <div className="app">
      <Logo/>
      <Form onAddItem={handleAddItem} lastItemID={lastItemID}/>
      <PackingList items={items} onDeleteItem={handleDelete} onToggleItem={handleToggleItem} onHandleClear={handleClear}/>
      <Stats items={items}/>
    </div>

  );
}

