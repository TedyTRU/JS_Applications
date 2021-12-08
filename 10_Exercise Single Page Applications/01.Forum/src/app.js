import { loadHomePage } from "./home.js";
import { createNewTopic } from "./topic.js";


document.querySelector('.public').addEventListener('click', createNewTopic);

loadHomePage();