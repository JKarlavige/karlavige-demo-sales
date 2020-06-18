import PageManager from "./page-manager";

export default class SpecialItems extends PageManager {
  onReady() {
    alert("Hello world!");

    const testBtn = document.querySelector("#testBtn");
    testBtn.addEventListener("click", () => {
      this.test();
    });
  }

  test() {
    alert("hit");
    console.log("test hit");
  }
}
