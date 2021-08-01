const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      console.log(person);
      const listItem = document.createElement('li');

      //when you create a custom attribute in HTML5, then you need to use data-index
      listItem.setAttribute('data-index', index);

      //we want to display from 1 not from 0, that is why adding +1
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
    <p class="person-name">${person}</p>
    <i class="fas fa-grip-lines"></i>
    </div>
    `;

      //listItems is the array we have initialized
      listItems.push(listItem);

      // inside ul we now have li for each person mentioned in data
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

//setting up the dragStartIndex value dynamically
function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = parseInt(this.closest('li').getAttribute('data-index'));
  // console.log(dragStartIndex); if you pick 3rd person name, it shows 2 as closest index
}
function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = parseInt(this.getAttribute('data-index'));

  //upon you drop, swap has to work
  swapItems(dragStartIndex, dragEndIndex);

  //if we don't remove this, then background-color will remain
  this.classList.remove('over');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

//if this is not present, then our drag doesn't work
function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  // console.log(itemOne, itemTwo);

  //ex: dragging 1st person to 5th person
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('draggable').innerText.trim();

    // checking with our original array Indexes
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      //in case if it has earlier, as we drag mulitple times, it is safe to check
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const draggableListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  draggableListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

//check is the check-btn in index.html
check.addEventListener('click', checkOrder);
