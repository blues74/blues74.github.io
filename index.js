function byId (id) {
  return $(`#${id}`);
}

function byName(name, $el) {
    if ($el)
      return $el.find(`[data-name="${name}"]`);

    return $(`[data-name="${name}"]`);
}

function getButtonWithPopover(val, title, text) {
  return `<button
    type="button"
    data-name="word"
    class="btn btn-lg btn-outline-primary"
    style="margin-bottom: .5rem;"
    data-toggle="popover"
    title="${title}"
    data-content="${text}"
  >${val}</button>
  `;
}

function loadWords (id) {
  let arr = wordsAll[id].trim().split('\n');
  let html = '';

  arr.forEach((item, i) => {
    itemArr = item.split('---').map(item => item.trim());
    subhtml = getButtonWithPopover(itemArr[0], itemArr[1], itemArr[3] + ' --- ' + itemArr[2] );

    html += subhtml; // + '<br/>';
  });

  byId('current_words').html(html);

  byName('word', byId('current_words')).popover({
    container: 'body',
    trigger: 'focus'
  });

}

function initView () {
  byName('goToWords', byId('toolbar')).on('click', (e) => {
    loadWords('words' + e.target.innerText);
  });
}

$(document).ready(() => {
    initView();
});
