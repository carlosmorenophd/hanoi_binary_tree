import { useState } from "react";
import { usehanoi } from "./hanoi.code";
import uuid from "react-uuid";
import Tree from "react-d3-tree";

function App() {
  const [n, setN] = useState(0)
  const [tree, setTree] = useState({
    name: 'H(1)',
    attributes:{
      towers: 'ODA',
      print: 'Move ',
    },
    children: [],
  });
  const {hanoi, getTree} = usehanoi();
  const handleClick = () => {
    if(n>0){
      hanoi({
        n,
        source: 'O',
        destined: 'D',
        auxiliary: 'A',
        id: uuid(),
        parent: 0,
      });
      setTree(getTree({n}));
    }
  }
  
  const handleChange = (event) => {
    setN(parseInt(event.target.value) || 0);
  }
  return (
    <div>
      <h1>Hanoi towers</h1>
      <label>Numbers de discos:</label>
      <input type="number" value={n} onChange={handleChange}></input>
      <button onClick={handleClick}>Calculate</button>
      <div style={{ width: '200em', height: '100em' }}>
        <Tree data={tree} orientation="vertical" nodeSize={{ x: 300, y: 300 }} />
      </div>
    </div>
  );
}

export default App;
