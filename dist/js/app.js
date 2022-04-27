'use strict';

document.addEventListener('DOMContentLoaded',()=>{


  //обозначение всех перменных программы
  const engWord = document.querySelector('#eng');
  const rusWord = document.querySelector('#rus');
  const inputs = document.querySelectorAll('input'),
        addButton = document.querySelector('#add-word-btn'),
        table = document.querySelector('#table');

let words, 
    btnsDelete;

    localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem(`words`));

    const addWordToTable = index => {
      table.innerHTML += `
        <tr class="tr">
          <td class='eng-word'>${words[index].english}</td>
          <td class='rus-word'>${words[index].russian}</td>
          <td>
            <span class='close' > </span>
          </td>
        </tr>
      `;
    }

    words.forEach((item, i) =>{
      addWordToTable(i);
    })

  addButton.addEventListener('click', (e) => {
    e.preventDefault();
    //вадидность ввода информации
    if(
      engWord.value.length < 1 ||
      rusWord.value.length < 1 ||
      !isNaN(engWord.value) ||
      !isNaN(rusWord.value)
      ){
        inputs.forEach(item => {
          item.classList.add('error'); //вывод ошибки
        })
      } else {
        inputs.forEach(item => {
          item.classList.remove('error'); //удаление класса ошибки
        })

        words.push(new CreateWord(engWord.value, rusWord.value));
        localStorage.setItem(`words`, JSON.stringify(words));
        addWordToTable(words.length -1);
        engWord.value = null;
        rusWord.value = null;
      }
})

function CreateWord(english, russian) {
  this.english = english;
  this.russian = russian;

}


const deleteWord = (e) => {
  const rowIndex = e.target.parentNode.parentNode.rowIndex;
  e.target.parentNode.parentNode.parentNode.remove();
  words.splice(rowIndex, 1);
  localStorage.removeItem('words');
  localStorage.setItem('words', JSON.stringify(words) )
}

const addEventDelete = () => {
  if (words.length > 0) {
      btnsDelete = document.querySelectorAll('.close');
      btnsDelete.forEach(btn => {
        btn.addEventListener('click', (e)=>{
          deleteWord(e);
      });
    });
  }
}

addEventDelete();



});