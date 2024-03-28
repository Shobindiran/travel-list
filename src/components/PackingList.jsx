import { useState } from "react";

import Item from "./Item";

export default function PackingList({items,onDeleteItem,onToggleItem,onHandleClear}){
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