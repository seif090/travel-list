const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shoes", quantity: 1, packed: false },
  { id: 4, description: "Toothbrush", quantity: 1, packed: true },
];

export default function App(){
  return(
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

function Logo(){
  return(
    <h1>🌴 Far Away 🌴</h1>
  )
}
function Form(){
  return(
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
      <form>
        <input type="text" placeholder="Item..." />
        <input type="number" placeholder="Quantity..." />
        <button>Add</button>
      </form>
    </div>
  )
}
function PackingList(){
  return(
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  )
}
function Item({item}){
  return (
    <li>
      <input type="checkbox" />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity}{item.description}</span>
      <button>❌</button>
    </li>
  )
}
function Stats(){
  return(
    <footer className="stats">
      <p>👜You have x items on your list, and you already packed x (x%)</p>
    </footer>
  )
}