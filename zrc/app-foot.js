_.each(ALL_DATA, (arrPage, i) => {
  _.each(arrPage, (txtGroup, j) => {
    let arr = txtGroup.trim().split('\n');
    let meta = arr[0].trim();
    if (!meta) return false;

    meta = getMetadata(meta);

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
  const pageMap = {$keys: []};
  _.each(TEXTS[page], text => {
    const meta = getMetadata(text);
    pageMap[meta.group] = text;
    pageMap.$keys.push(meta.group);
  });
  TEXTS[page] = pageMap;
});

console.log('ALL_BY_GROUPS', ALL_BY_GROUPS);
console.log('ALL_KEYS', ALL_KEYS);
console.log('TEXTS', TEXTS);
