const C_NA = '142,140,142';
const C_UNL = '186,230,126';
const C_FAIL = '239,107,115';
const C_UNK = '92,207,230';

function handler() {
  const content = fetch('https://www.viu.com', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    },
    noRedir: false,
    retry: 3,
    timeout: 5000,
  });

  if (!content) {
    return {
      text: 'N/A',
      background: C_NA,
    };
  } else if (content.statusCode == 200 || content.statusCode == 302) {
    const history = JSON.stringify(content.history);
    const exp = /no-service/gi;
    if (!exp.test(history)) {
      return {
        text: '解锁',
        background: C_UNL,
      };
    } else {
      return {
        text: '失败',
        background: C_FAIL,
      };
    }
  } else {
    return {
      text: '未知',
      background: C_UNK,
    };
  }
}
