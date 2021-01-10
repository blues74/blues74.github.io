function getWordsFromText(text) {
  text = text || '';
  text = text.split('\n');
  const meta = text[0].trim();

  text.splice(0, 1);
  const words = [];

  _.each(text, line => {
      word = line.split('---')[0].trim();
      word = word.replace(/'/g, '');
      word = word.replace(/\*/g, '');
      word = word.replace(/_/g, ' ');
      word = word.trim();

      if (word) {
        words.push(word);
      }
  });

  // console.log(meta, words);
}

_.each(ALL_DATA, (arrPage, i) => {
  _.each(arrPage, (txtGroup, j) => {
    // пропускаем пустые значения
    txtGroup = txtGroup.trim();
    if (!txtGroup) return;

    // метаданные группы
    let arr = txtGroup.split('\n');
    let meta = arr[0].trim();
    if (!meta) return;
    meta = getMetadata(meta); // {page: string, group: string}

    getWordsFromText(txtGroup);

    // создаём группу если её ещё нет
    if (!ALL_BY_GROUPS[meta.page]) {
      ALL_BY_GROUPS[meta.page] = {
        $keys: []
      };
    }

    ALL_BY_GROUPS[meta.page][meta.group] = {i, j};
    ALL_BY_GROUPS[meta.page].$keys.push(meta.group);

    ALL_KEYS[`${meta.page}.${meta.group}`] = {i, j};
  });
});

ALL_BY_GROUPS['words'].$keys = _.reverse(ALL_BY_GROUPS['words'].$keys);

_.each(TEXTS, (item, page) => {
  TEXTS[page] = _.flattenDeep(TEXTS[page]);
  TEXTS[page] = _.map(TEXTS[page], item => item.trim());
  const pageMap = {
    $keys: []
  };

  _.each(TEXTS[page], text => {
    const meta = getMetadata(text);
    if (!pageMap[meta.group]) {
      pageMap[meta.group] = '';
    }

    pageMap[meta.group] += '\n' + text;
    pageMap[meta.group] = pageMap[meta.group].trim();
    pageMap.$keys.push(meta.group);
  });

  TEXTS[page] = pageMap;
});

console.log('ALL_BY_GROUPS', ALL_BY_GROUPS);
console.log('ALL_KEYS', ALL_KEYS);
console.log('TEXTS', TEXTS);
