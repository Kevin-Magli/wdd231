export function saveData(listContainer) {
    localStorage.setItem("data", listContainer.innerHTML);
}
export function loadData(listContainer) {
    listContainer.innerHTML = localStorage.getItem("data");
}