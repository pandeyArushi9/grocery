// single-item.js
import { editCompleted, removeItem, setEditId } from "./app.js";

export function createSingleItem(item) {
  const div = document.createElement("div");
  div.classList.add("single-item");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.completed;
  checkbox.addEventListener("change", () => editCompleted(item.id));

  // Item text
  const text = document.createElement("p");
  text.textContent = item.name;
  if (item.completed) {
    text.classList.add("completed");
  }

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "icon-btn", "edit-btn");
  editBtn.type = "button";
  editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
  editBtn.addEventListener("click", () => setEditId(item.id));

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn", "icon-btn", "remove-btn");
  removeBtn.type = "button";
  removeBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  removeBtn.addEventListener("click", () => removeItem(item.id));

  // Append children
  div.appendChild(checkbox);
  div.appendChild(text);
  div.appendChild(editBtn);
  div.appendChild(removeBtn);

  return div;
}
