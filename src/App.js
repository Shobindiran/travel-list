import { useState } from "react";

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

  return (
    <div className="app">
      <Logo/>
      <Form onAddItem={handleAddItem} lastItemID={lastItemID}/>
      <PackingList items={items} onDeleteItem={handleDelete}/>
      <Stats/>
    </div>

  );
}

function Logo(){
  return <h1>🏝️ FAR AWAY 💼</h1>
};

function Form({onAddItem,lastItemID}){
  const [description,setDescription] = useState("");
  const [quantity,SetQuantity] = useState(1);

  function handleSubmit(e){
    e.preventDefault();

    if(!description) return;

    const newItem = {description,quantity,packed:false,id: lastItemID? lastItemID + 1 : 1 };
    onAddItem(newItem);  
    setDescription("");
    SetQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need for your trip ❤️</h3>
      <select value={quantity} onChange={(e)=>{SetQuantity(Number(e.target.value))}}>
        {Array.from({length:20},(_,i)=> i+1).map(
          (num)=>(
            <option key={num} value={num}>
              {num}
            </option>
          )
        )}
      </select>
      <input 
        type="text" 
        placeholder="Item..." 
        value={description} 
        onChange={(e)=>setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  )
}

function PackingList({items,onDeleteItem}){
  return(
    <div className="list">
        <ul >
          {items.map(
            (item)=> <Item onDeleteItem={()=>onDeleteItem(item.id)} key={item.id} item={item}/>
            )
          }
        </ul>
    </div>
  )
}

function Item({item,onDeleteItem}){
  return( 
    <li style={item.packed?{textDecoration:"line-through"}: {} } >
      <span>{item.quantity} {item.description}</span>
      <button onClick={onDeleteItem}>❌</button>
    </li>
  )
}

function Stats(){
  return(
    <footer className="stats">
      <em>💼 You have X items on your list and you already packed X (X%) </em>
    </footer>
  )
}

