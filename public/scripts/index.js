const buttonSearchPoint = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const buttonClose = document.querySelector("#modal .header a");

buttonSearchPoint.addEventListener("click", ()=> {
    modal.classList.remove("hide");
});

buttonClose.addEventListener("click", () => {
    modal.classList.add("hide");
});