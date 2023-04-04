import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";

// Funcion ue devuelve un elemento aleatorio de la matriz "SurpriseMe".
export function getRandomPrompt (prompt) {

    //Generamos un no. aleatorio entre 0 y la longitud de la matriz.
    const randomIndex = Math.floor( Math.random() * surpriseMePrompts.length);
    //Selecciona un elemento de la matriz.
    const randomPrompt = surpriseMePrompts[randomIndex];

    // Comparamos el prompt y el elemento seleccionado para retornar el prompt aleatorio.
    if(randomPrompt === prompt){
        return getRandomPrompt(prompt)
    }

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}