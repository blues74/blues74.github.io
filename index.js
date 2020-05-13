function byId$ (id) {
  return $(`#${id}`);
}

function loadWords (id) {
  let arr = wordsAll[id].trim().split('\n');
  let html = '';
  arr.forEach((item, i) => {
    //itemArr = item.split('---');
    html += item + '<br/>';
  });

  byId$('current_words').html(html);
}

function initView () {

}

$(document).ready(() => {
  loadWords('words30');
});
