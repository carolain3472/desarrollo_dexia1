import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Scss/carga_masiva.css";
import { api } from "../../api/register_api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export function Carga_Masiva() {
  const [tipoDeCarga, setTipoDeCarga] = useState("");
  const [archivo, setArchivo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (archivo) {
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

          // Handle success
          Swal.fire({
            icon: "success",
            title: "Archivo cargado exitosamente",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((error) => {
          console.error("No se subió el excel", error);

          Swal.fire({
            icon: "error",
            title: "Error cargando archivo",
            text: "Por favor intente de nuevo",
          });
        });
    }
  };

  const handleTipoDeCargaBlur = (event) => {
    const selectedValue = event.target.value;
    setTipoDeCarga(selectedValue);
  };

  const handleArchivoChange = (event) => {
    setArchivo(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dropZone = document.querySelector(".zone");

    dropZone.classList.remove("hover");

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setArchivo(files[0]);
    }
  };

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
      const dropZone = document.querySelector(".zone");

      dropZone.classList.add("hover");
    };

    const dropZone = document.querySelector(".zone");
    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div className="zone" style={{ marginLeft: "300px", marginTop: "50px" }}>
      <form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
        <label style={{ marginRight: "30px" }}>Tipo de carga</label>
        <select
          id="tipo_de_carga"
          name="tipo_de_carga"
          form="form_carga"
          onBlur={handleTipoDeCargaBlur}
        >
          <option disabled value="" className="disabledOption">
            Tipo de carga *
          </option>
          <option value="Estudiantes">Estudiantes</option>
          <option value="Facultades">Facultades</option>
          <option value="Sede">Sede</option>
          <option value="Programas">Programas</option>
        </select>

        <div id="dropZ">
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            size="2xl"
            style={{ height: "200px" }}
          />
          <div>Arrastre y suelte un archivo</div>
          <span>O</span>
          <div className="selectFile">
            <label htmlFor="file">Seleccione un archivo </label>
            <input
              type="file"
              name="file"
              onChange={handleArchivoChange}
            ></input>
            {archivo && <div>Archivo seleccionado: {archivo.name}</div>}
            {!archivo && <div>No se ha seleccionado ningún archivo</div>}
            <input type="submit" value="Enviar" disabled={!archivo} />
          </div>
        </div>
      </form>
    </div>
  );
}
