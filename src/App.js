import Button from './components/Button';
import ColorsList from './components/ColorsList';
import { useState } from 'react';
import axios from 'axios';
import { validateHTMLColorHex } from "validate-color";



const App = () => {

  const [colors, setColors] = useState([]);
  const [text, setText] = useState('Get Color');
  const [buttonColor, setButtonColor] = useState();



  const loadData = async () => {
    const data = await axios.get(`https://www.colr.org/json/color/random?timestamp=${Date.now()}`, {cache: "no-cache"});
    if (data.data.new_color !== ""){
      addColor(data);
      setButtonColor(data.data.new_color);
    }
   
  }

  const addColor = (data) => {
    const id = data.data.colors[0].id;
    const id_s = id.toString();
    const hex = data.data.new_color;
    const newColor = { id_s, hex };
    if (!colors.some(color => color.hex === newColor.hex) || newColor.hex !== ""){
        setColors([...colors, newColor]);
        setText("Get Color");
        setButtonColor(data.data.new_color);
    }
    

  }
  const handleKeypress = e => {
    if (e.key === 'Enter') {      
      if (validateHTMLColorHex(text)){
        const id = Math.floor(Math.random() * 1000) + 1;
        const id_s = id.toString();
        const hex = text.substring(1);
        const manualColor = { id_s, hex };
        if (!colors.some(color => color.hex === manualColor.hex)){
          setColors([...colors, manualColor]);
          setButtonColor(manualColor.hex);
          setText("Get Color");
        }
        else {
          alert("Color already exists!");
        };
      }
      else {
        alert("Not a valid hex color!");
      };
    }
    
  };
  return (
    <div className="container">
      <header>
          <h3 className="label">Advanced Task</h3>
          <Button onClick={loadData} color={"#" + buttonColor} text={text}></Button>
          <ColorsList colors={colors} buttonColor={buttonColor}/>
          <input onChange={event => setText(event.target.value)} placeholder="Enter CSS hex color code, example: #FFA500" type="text" onKeyPress={handleKeypress}/>
      </header>
    </div>
  );
}

export default App;
