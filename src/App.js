import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 1, packed: false },
  { id: 4, description: "Toothbrush", quantity: 1, packed: true },
];

export default function App() {
    const [items, setItems] = useState([]);
function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  return (
     <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🌴</h1>;
}
function Form({onAddItem}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newPackingItem = {
      description: e.target[0].value,
      quantity: e.target[1].value,
      packed: false,
      id: Date.now(),
    };
    console.log(newPackingItem);
    onAddItem(newPackingItem);
    setDescription("");
    setQuantity(0);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        
        ))}

      </ul>

    </div>

  );
}
function Item({ item }) {
  return (
    <li>
      <input type="checkbox" />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <p>👜You have x items on your list, and you already packed x (x%)</p>
    </footer>
  );
}
