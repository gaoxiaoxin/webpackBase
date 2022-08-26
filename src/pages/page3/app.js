import { send, sent, fasong } from "./js/index";
import "./css/index.less";
let code = document.querySelector(".code");
let diff = document.querySelector(".diff");
var ipt = document.querySelector(".no");
ipt.addEventListener("click", fasong);
diff.addEventListener("click", sent);
diff.style.display = "none";
ipt.removeEventListener("click", send);
code.addEventListener("click", send);
let body = document.querySelector("body");
let num = 0;
body.addEventListener("click", () => {
  num++;
  if (num === 6) {
    diff.style.display = "block";
  }
});
