module.exports = {
  Failed: {
    messages: {
      'en-US': 'Failed!',
      'zh-CN': '失败!'
    },
    code: 1
  },
  Success: {
    messages: {
      'en-US': 'Success!',
      'zh-CN': '成功！'
    },
    code: 0
  },
  Failure: {
    alias: 'Failed'
  },
  Unknown: {
    Error: {
      messages: {
        'en-US': 'Unknown Error!',
        'zh-CN': '未知错误！'
      },
      code: 16777217
    }
  },
  Not: {
    Found: {
      messages: {
        'en-US': 'Not Found!',
        'zh-CN': '未找到！'
      },
      code: 5
    },
    Logged: {
      In: {
        messages: {
          'en-US': 'Not Logged In!',
          'zh-CN': '未登录！'
        },
        code: 6
      }
    }
  },
  Existed: {
    messages: {
      'en-US': 'Existed!',
      'zh-CN': '已经存在！'
    },
    code: 6
  }
};
