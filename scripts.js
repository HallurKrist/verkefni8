const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    updateListeners();
  }

  function formHandler(e) {
    e.preventDefault();
    const texti = document.getElementsByClassName('form__input');
    if(texti[0].value != ""){
      add(texti[0].value); 
    }
    document.querySelector('.form').reset();
    updateListeners();
  }

  function finish(e) {
    const boxid = e.srcElement;
    const stakid = boxid.parentElement;
    stakid.classList.toggle('item--done')
  }

  function edit(e) {
    const texti = e.srcElement;
    gamliTexti = texti.innerHTML;
    debugger;
    const inputid = el('input','item__edit');
    inputid.setAttribute('type', 'text');
    inputid.value=gamliTexti;
    texti.parentNode.replaceChild(inputid,texti);
    updateListeners();
  }

  function commit(e) {
    if(e.keyCode === 13){
      const inputid = e.srcElement;
      const nyrTexti = inputid.value;
      const span = el('span','item__text');
      inputid.parentNode.replaceChild(span,inputid);
      span.appendChild(document.createTextNode(nyrTexti));
    }
  }

  function add(value) {
    const listi = document.querySelector('ul');
    const hlutur = el('li','item');
    const input = el('input', 'item__checkbox');
    const span = el('span','item__text');
    const btn = el('button','item__button');
    btn.appendChild(document.createTextNode('Eyða'));
    span.appendChild(document.createTextNode(value));
    hlutur.appendChild(input);
    hlutur.appendChild(span);
    hlutur.appendChild(btn);
    listi.appendChild(hlutur)
  }

  function deleteItem(e) {
    const btn = e.srcElement;
    const parent = btn.parentNode;
    parent.parentNode.removeChild(parent);
  }

  function el(type, className) {
    const element = document.createElement(type);
    element.setAttribute('class', className);
    if(type === 'input')
    {
      element.setAttribute('type', 'checkbox');
    }
    return element;
  }

  function updateListeners() {
    let inputs = items.getElementsByClassName('item__checkbox');
    for(cb of inputs){
      cb.addEventListener('click', finish);
    }
    let edits = items.querySelectorAll('span');
    for(verk of edits){
      verk.addEventListener('click', edit);
    }
    let edits2 = items.getElementsByClassName('item__edit');
    for(verk of edits2){
      verk.addEventListener('keyup', commit);
    }
    let del = items.getElementsByClassName('item__button');
    for(btn of del){
      btn.addEventListener('click',deleteItem);
    }
  }
 
  return {
    init: init
  }
})();
