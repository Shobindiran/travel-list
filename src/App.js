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

  function handleToggleItem(id){
    setItems(prev=>items.map(
      item=>item.id===id? {...item,packed: !item.packed} : item)
      )
  }

  function handleClear(){
    if(!items) return;

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

function PackingList({items,onDeleteItem,onToggleItem,onHandleClear}){
  const [sortBy,setSortBy] = useState("input");

  let sortedItems;

  if(sortBy === "input") sortedItems = items;

  if(sortBy === "description") sortedItems = items.slice().sort(
    (a,b)=>a.description.localeCompare(b.description)
    );

  if(sortBy === "packed") sortedItems = items.slice().sort(
    (a,b)=>Number(a.packed) - Number(b.packed)
    );

  return(
    <div className="list">
        <ul >
          {sortedItems.map(
            (item)=> <Item onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} item={item}/>
            )
          }
        </ul>

        <div className="actions">
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by name</option>
            <option value="packed">Sort by packed</option>
          </select>
          <button onClick = {onHandleClear}>Clear All</button>
        </div>
    </div>
  )
}

function Item({item,onDeleteItem,onToggleItem}){
  return( 
    <li>
      <input type="checkbox" value={item.packed} onChange={()=>{onToggleItem(item.id)}}/>
      <span style={item.packed?{textDecoration:"line-through"}: {} }>
        {item.quantity} {item.description}
      </span>
      <button onClick={()=>onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({items}){
  const numItems = items.length;

  if(!numItems){
    return(
      <footer className="stats">
        <em>
            Start adding some items to your trip 🚀
        </em>
      </footer>
    )
  }

  const numPacked = items.filter(item=>item.packed).length;
  const packedPercentage = Math.round((numPacked/numItems)*100);
  return(
    <footer className="stats">
      <em>
        {packedPercentage!==100?`💼 You have ${numItems} items on your list and you already packed ${numPacked} (${packedPercentage}%)`
        :`You got everything! Ready to go ✈️`}
      </em>
    </footer>
  )
}

