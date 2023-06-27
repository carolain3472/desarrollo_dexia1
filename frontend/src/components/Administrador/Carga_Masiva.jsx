import React, { useState } from 'react';
import axios from "axios";
import { api } from "../../api/register_api";

export function Carga_Masiva() {
  const [tipoDeCarga, setTipoDeCarga] = useState("");
  const [archivo, setArchivo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("tipo_de_carga", tipoDeCarga);
    formData.append("file", archivo);
    console.log(tipoDeCarga);

    axios;
    api
      .post("/login/carga_masiva/", formData)
      .then((response) => {
        // sessionStorage.removeItem("username");
        // navigate("/inicio");
      })
      .catch((error) => {
        console.error("No se subió el excel", error);
      });
  };

  const handleTipoDeCargaChange = (event) => {
    // No se necesita esta función para actualizar el estado del select
    // Mantén el handleTipoDeCargaChange vacío
  };

  const handleTipoDeCargaBlur = (event) => {
    const selectedValue = event.target.value;
    setTipoDeCarga(selectedValue);
  };

  const handleArchivoChange = (event) => {
    setArchivo(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginLeft: '300px', marginTop: '50px' }}>
        <label style={{ marginRight: '30px' }}>Tipo de carga</label>
        <select
          id="tipo_de_carga"
          name="tipo_de_carga"
          form="form_carga"
          onBlur={handleTipoDeCargaBlur}  // Utiliza onBlur en lugar de onChange
        >
          <option disabled value="" className="disabledOption"> Tipo de carga * </option>
          <option value="Estudiantes">Estudiantes</option>
          <option value="Facultades">Facultades</option>
          <option value="Sede">Sede</option>
          <option value="Programas">Programas</option>
        </select>

        <label>Archivo</label>
        <input type="file" name="file" onChange={handleArchivoChange}></input>
        <input type="submit" value="enviar" />
      </form>
    </div>
  );
}
