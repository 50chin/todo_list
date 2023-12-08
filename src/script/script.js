const input = document.querySelector('.input');
const form = document.querySelector('.form');
const add__toDo = document.querySelector('.add__toDo');
const toDo = document.querySelector('.toDo');
const noneNode = document.querySelector('.none');
const cardsWrapper = document.querySelector('.toDo');

let toDoList = JSON.parse(localStorage.getItem('toDoList')) ?? [];

function addToDo(text) {
  toDoList.push({ id: Date.now(), text: `${text}`, isDone: false });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value.trim()) {
    return;
  } else {
    addToDo(input.value);
    input.value = '';
    renderCards(toDoList);
    toDo.scrollTop = -toDo.scrollHeight;
  }
});

// функция добавления / удаления  кнопки delete (All)
function addBtn(toDoList) {
  if (toDoList.length) {
    noneNode.classList.remove('none');
  } else {
    noneNode.classList.add('none');
  }
}

// функция делает isDone = true / false
function toggleCheck(id) {
  const todoObj = toDoList.find((el) => el.id == id);
  todoObj.isDone = !todoObj.isDone;
}
// вызов функции при нажатии btn ❌
function deleteToDo(id) {
  toDoList = toDoList.filter((el) => el.id != id);
  renderCards(toDoList);
}
// вызов функции при удалении завершенных
function deleteFinish() {
  toDoList = toDoList.filter((el) => !el.isDone);
  renderCards(toDoList);
}

// вызов функции при удалении всех
function deleteAll() {
  toDoList.length = 0;
  renderCards(toDoList);
}

const createCard = ({ id, text, isDone }) => {
  const li = document.createElement('li');
  li.className = 'toDo__list';

  li.innerHTML = `               
                <input type="checkbox" class="toDo__check" />
                <p class="toDo__text" >
                  ${text}
                </p>
                <button class="toDo__btn">❌</button>
                `;
  const checkNode = li.querySelector('.toDo__check');
  checkNode.checked = isDone;
  checkNode.addEventListener('change', () => {
    toggleCheck(id);
  });
  // удаление при нажатии btn ❌
  const btnNode = li.querySelector('.toDo__btn');
  btnNode.addEventListener('click', () => {
    deleteToDo(id);
  });

  // кнопка удалить завершенные
  const btnDeleteFinish = document.querySelector('.delete__finish');
  btnDeleteFinish.addEventListener('click', () => {
    deleteFinish();
  });

  // кнопка удалить все
  const btnDeleteAll = document.querySelector('.delete__all');
  btnDeleteAll.addEventListener('click', () => {
    deleteAll();
  });
  return li;
};

const renderCards = (toDoList) => {
  cardsWrapper.innerHTML = '';
  toDoList.forEach((obj) => {
    const li = createCard(obj);
    cardsWrapper.append(li);
  });
  addBtn(toDoList);
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
};
renderCards(toDoList);
