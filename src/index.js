import styles from "./index.css";
import "./test.css";
import plusImg from "./images/plus.png";
import plusSvg from "./images/plus.svg";

function component() {
  const element = document.createElement("div");
  element.innerHTML = "Hello world";

  console.log("styles ::: ", styles);
  element.classList = styles.test;
  return element;
}

document.body.appendChild(component());
