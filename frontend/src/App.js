import './App.css';
import { ChromePicker } from 'react-color';
import React, {useEffect, useState} from "react";
import {Light} from "./Light";
import {getLights} from "./api/get.Lights.api";

const defaultLights = [
  {
    id: 0,
    x: 0,
    y: 0,
    color: "#ffffff"
  },
  {
    id: 1,
    x: 1,
    y: 0,
    color: "#ffffff"
  },
  {
    id: 2,
    x: 0,
    y: 1,
    color: "#ffffff"
  },
  {
    id: 5,
    x: 1,
    y: 1,
    color: "#ffffff"
  },
  {
    id: 7,
    x: 0,
    y: 2,
    color: "#ffffff"
  },
  {
    id: 11,
    x: 1,
    y: 2,
    color: "#ffffff"
  },
  {
    id: 14,
    x: 0,
    y: 3,
    color: "#ffffff"
  },
  {
    id: 99,
    x: 1,
    y: 3,
    color: "#ffffff"
  }
]

function App() {
  const [color, setColor] = useState("#ffffff");
  const [lights, setLights] = useState([])

  useEffect(() => {
    getLights()
    .then(response => {
      console.log(response)
      setLights(response.data.lights.map(obj => {
        const l = obj.light
        const s = obj.state
        return {
          id: l.id,
          x: l.x,
          y: l.y,
          color: {
            r: s.r,
            g: s.g,
            b: s.b
          }
        }
      }))
    })
    .catch(error => {
      console.error("Failed to retrieve lights, error: ", error)
    })
  }, [])

  return (
    <div className="App">
      <div className="Row">
        <div>
          <ChromePicker color={color} onChangeComplete={color => setColor(color.hex)} width="400px" />
          <button className="SetAllButton" onClick={() => setLights(updateAllLights(lights, color))}>
            SET ALL
          </button>
        </div>
        <div className="Fixed">
          { lights.map((light, index) => (
            <button className="LightContainer" style={{
              left: light.x * 100 + "px",
              top: light.y * 100 + "px",
            }} key={index} onClick={() => {
              setLights(updateLight(light.id, lights, color))
            }}>
              <Light color={light.color}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function updateAllLights(lights, color) {
  console.log("UPDATING ALL LIGHTS TO COLOR", color)
  return lights.map(light => {
    return {
      ...light,
      color: color
    }
  })
}

function updateLight(id, lights, color) {
  console.log("UPDATING LIGHT ", id ," TO COLOR", color)
  return lights.map(light => {
    if (light.id === id) {
      return {
        ...light,
        color: color
      }
    }
    return light
  })
}

export default App;
