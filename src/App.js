import Dropdown from "./components/Dropdown";

const colors = ["Red", "Yellow", "Green", "Blue"];
const components = [
  { title: "Button", path: "demo-button" },
  { title: "Selection Control", path: "demo-selection-control" },
  { title: "Input", path: "demo-input" },
  { title: "Snackbar", path: "demo-snack-bar" },
  { title: "Chips", path: "demo-chips" },
  { title: "Progress Tabs", path: "demo-vertical-tabs" },
  { title: "Typography", path: "demo-wip" },
  { title: "Card", path: "demo-wip" },
  { title: "Pagination", path: "demo-wip" },
  { title: "Progress Tabs", path: "demo-wip" },
];
function App() {
  return (
    <div className="container">
      <h1 className="title mb-3">Dropdown with search</h1>
      <h4 className="title mb-1">Default</h4>
      <Dropdown colorslist={colors} />
    
      <h4 className="title mb-1">Dropdown (MutliSelect)</h4>
      <Dropdown multiselect={true} colorslist={components} />
       <h4 className="title mb-1">Dropdown (MutliSelect , Searchable)</h4>
      <Dropdown multiselect={true} search={true} colorslist={components} />
    </div>
  );
}

export default App;
