// multiplication_table
// digits
// words
const QUICK_LINKS_BY_GROUP = {
  multiplication_table: [
    '9xB', '8xB', '7xB', '6xB', '5xB', '4xB', '3xB', '2xB', '1xB',
    'AxA', 'AxB-hard',
    'AxB-hard#', 'AxB-super-hard#',
  ],
  digits: [
    '0#', '00#', '11#', '61#',
  ],
  words: [ // consonant_sounds
    'Крещение', // 988
    'да-Винчи',  'да-Винчи-2',  // 1452-1519
    'Грозный',   'Грозный-2',   // 1530-1584
    'Галилео',   'Галилео-2',   // 1564-1642
    'Паскаль',   'Паскаль-2',   // 1623-1662
    'Ломоносов', 'Ломоносов-2', // 1711-1765
  ],
};

// Плоский QUICK_LINKS на набор слов
_.each(QUICK_LINKS_BY_GROUP, (keys, groupName) => {
  _.each(keys, key => {
    QUICK_LINKS.push(key);
  });
});


_.each(ALL_DATA, (group, i) => {
  _.each(group, (item, j) => {
    let arr = item.trim().split('\n');
    let meta = arr[0].trim().split(' ');
    let key = meta[0];
    let groupName = meta[1];
    if (!ALL_BY_GROUPS[groupName]) {
      ALL_BY_GROUPS[groupName] = {
        $keys: []
      };
    }

    ALL_BY_GROUPS[groupName][key] = {i, j};
    ALL_BY_GROUPS[groupName].$keys.push(key);

    arr.splice(0, 1);
    if (ALL_KEYS[key]) {
      key += `~${j}`;
    }

    ALL_KEYS[key] = {i, j};

  });
});
