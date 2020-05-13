const options = {
    traceByTip: false
}

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
    item = item.split('---').map(item => item.trim());
    const word = item[0];
    const tip  = item[3].split(' ').shift();
    const text = item[3] + ' --- ' + item[2];
    let value = word;
    let title = item[1] + ' --- ' + tip;
    if (options.traceByTip) {
      value = tip;
      title = word + ' --- ' + item[1];
    }
    html += getButtonWithPopover(value, title, text);
  });

  byId('current_words').html(html);

  byName('word', byId('current_words')).popover({
    container: 'body',
    trigger: 'focus'
  });

}

function initView () {
  byId('traceByTip').on('click', (e) => {
    options.traceByTip = e.target.checked;
  });

  byName('goToWords', byId('toolbar')).on('click', (e) => {
    loadWords(e.target.innerText);
  });
}

$(document).ready(() => {
    initView();
});
