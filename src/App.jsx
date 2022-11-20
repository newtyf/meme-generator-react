import { useState } from "react";
import "./App.css";
import Html2canvas from "html2canvas";

function App() {
  const [linea1, setLinea1] = useState("");
  const [linea2, setLinea2] = useState("");
  const [image, setImage] = useState("/imgs/fire.jpg");

  const onChangeLine1 = (e) => {
    let value = e.target.value;
    setLinea1(value);
  };

  const onChangeLine2 = (e) => {
    let value = e.target.value;
    setLinea2(value);
  };

  const onChangeImage = (e) => {
    let value = e.target.value;
    setImage(`/imgs/${value}.jpg`);
  };

  const handleChoseImage = async (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image")) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () => setImage(fileReader.result));
  };

  const handleExportMeme = async () => {
    const canvas = await Html2canvas(document.querySelector(".meme-result"));
    const urlImage = canvas.toDataURL("image/jpeg", 0.7);
    let link = document.createElement("a");
    link.download = "meme.png";
    link.href = urlImage;
    link.click();
  };

  return (
    <div className="App">
      <select onChange={onChangeImage}>
        <option value={"fire"}>Casa en llamas</option>
        <option value={"futurama"}>Futurama</option>
        <option value={"history"}>History Channel</option>
        <option value={"matrix"}>Matrix</option>
        <option value={"smart"}>smart</option>
      </select>
      <span style={{ color: "white" }}>o</span>
      <input
        type="file"
        id="selectedFile"
        onChange={handleChoseImage}
        style={{ display: "none" }}
      />
      <button
        type="button"
        onClick={() => document.getElementById("selectedFile").click()}
      >
        custom
      </button>
      <br />
      <input onChange={onChangeLine1} type="text" placeholder="texto arriba"></input>
      <br />
      <input onChange={onChangeLine2} type="text" placeholder="texto abajo"></input>
      <br />
      <button onClick={handleExportMeme}>Exportar</button>

      <div className="meme-result">
        <span className="line1">{linea1}</span>
        <span className="line2">{linea2}</span>
        <img className="meme" src={image} alt="meme imagen" />
      </div>
    </div>
  );
}

export default App;
