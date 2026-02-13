import { createItems } from "./items.js";
import { createForm } from "./form.js";

// Local Storage Functions
function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// Initialize items from local storage
let items = getLocalStorage();
let editId = null;

// Render App
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  // Pass editId and current item (if editing) into the form
  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
  );
  app.appendChild(formElement);

  // Create and append items list
  const itemsElement = createItems(items, editCompleted, removeItem, setEditId);
  app.appendChild(itemsElement);
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add Item Function
export function addItem(itemName) {
  const newItem = {
    id: generateId(),
    name: itemName,
    completed: false,
  };
  items = [...items, newItem];
  setLocalStorage(items);
  render();
  setTimeout(() => alert("Item Added Successfully!"), 0);
}

// Edit Completed Function
export function editCompleted(itemId) {
  items = items.map((item) =>
    item.id === itemId ? { ...item, completed: !item.completed } : item,
  );
  setLocalStorage(items);
  render();
}

// Remove Item Function
export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  setLocalStorage(items);
  render();
  setTimeout(() => alert("Item Deleted Successfully!"), 0);
}

// Update Item Name Function
export function updateItemName(newName) {
  items = items.map((item) =>
    item.id === editId ? { ...item, name: newName } : item,
  );
  editId = null;
  setLocalStorage(items);
  render();
  setTimeout(() => alert("Item Updated Successfully!"), 0);
}

// Set Edit ID Function
export function setEditId(itemId) {
  editId = itemId;
  render();

  // Focus input after render
  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) input.focus();
  }, 0);
}

// Initialize App
render();
