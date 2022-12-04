import styles from "./index.css";
import "./test.css";

function component() {
  const element = document.createElement("div");
  element.innerHTML = "Hello world";

  console.log("styles ::: ", styles);
  element.classList = styles.test;
  return element;
}

document.body.appendChild(component());
