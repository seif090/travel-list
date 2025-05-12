import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 1, packed: false },
  { id: 4, description: "Toothbrush", quantity: 1, packed: true },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleTogglePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem}  onTogglePacked={handleTogglePacked} onClearList={handleClearList} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🌴</h1>;
}
function Form({ onAddItem }) {
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
function PackingList({ items, onDeleteItem, onTogglePacked, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onTogglePacked={onTogglePacked} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by Input</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, onTogglePacked }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() =>  onTogglePacked(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
    const numItems = items.length;
    const packed = items.filter((item) => item.packed).length;
    const percentage = Math.round((packed / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "You got everything! Ready to go ✈️" : `You have ${numItems} items on your list, and you already packed ${packed} (${percentage}%)`}
      </em>
    </footer>
  );
}
