var web_style = $("#web_style").val();
var valine_appid = $("#valine_appid").val();
var valine_appKey = $("#valine_appKey").val();

new Valine({
  el: '#vcomments',
  appId: valine_appid,
  appKey: valine_appKey,
  placeholder: '请输入内容...',
  avatar: 'robohash',
  visitor: true,
  // 设置Bilibili表情包地址
  emojiCDN: '//i0.hdslb.com/bfs/emote/', 
  // 表情title和图片映射
  emojiMaps: {
    "tv_doge": "6ea59c827c414b4a2955fe79e0f6fd3dcd515e24.png",
    "tv_亲亲": "a8111ad55953ef5e3be3327ef94eb4a39d535d06.png",
    "tv_偷笑": "bb690d4107620f1c15cff29509db529a73aee261.png",
    "tv_再见": "180129b8ea851044ce71caf55cc8ce44bd4a4fc8.png",
    "tv_冷漠": "b9cbc755c2b3ee43be07ca13de84e5b699a3f101.png",
    "tv_发怒": "34ba3cd204d5b05fec70ce08fa9fa0dd612409ff.png",
    "tv_发财": "34db290afd2963723c6eb3c4560667db7253a21a.png",
    "tv_可爱": "9e55fd9b500ac4b96613539f1ce2f9499e314ed9.png",
    "tv_吐血": "09dd16a7aa59b77baa1155d47484409624470c77.png",
    "tv_呆": "fe1179ebaa191569b0d31cecafe7a2cd1c951c9d.png",
    "tv_呕吐": "9f996894a39e282ccf5e66856af49483f81870f3.png",
    "tv_困": "241ee304e44c0af029adceb294399391e4737ef2.png",
    "tv_坏笑": "1f0b87f731a671079842116e0991c91c2c88645a.png",
    "tv_大佬": "093c1e2c490161aca397afc45573c877cdead616.png",
    "tv_大哭": "23269aeb35f99daee28dda129676f6e9ea87934f.png",
    "tv_委屈": "d04dba7b5465779e9755d2ab6f0a897b9b33bb77.png",
    "tv_害羞": "a37683fb5642fa3ddfc7f4e5525fd13e42a2bdb1.png",
    "tv_尴尬": "7cfa62dafc59798a3d3fb262d421eeeff166cfa4.png",
    "tv_微笑": "70dc5c7b56f93eb61bddba11e28fb1d18fddcd4c.png",
    "tv_思考": "90cf159733e558137ed20aa04d09964436f618a1.png",
    "tv_惊吓": "0d15c7e2ee58e935adc6a7193ee042388adc22af.png"
  } 
})

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre').forEach((block) => {
    hljs.highlightBlock(block);
  });
});

function setCookie(key, value) {
  localStorage.setItem(key, value);
}

function getCookie(key) {
  var data = localStorage.getItem(key);
  return data
}

function updateStyle() {
  $('#theme').remove();
  if (getCookie("style") == "white") {
    $("#footer").attr("style", "color: #51525d;");
    $(".flink").attr("style", "color: #51525d;");
    $(".ba").attr("style", "color: #51525d;");
    $("#bodyx").removeClass("bg_black");
    $("#update_style").attr('checked', false);
  } else {
    $("#footer").attr("style", "");
    $(".flink").attr("style", "");
    $(".ba").attr("style", "");
    $("#bodyx").addClass("bg_black");
    $("#update_style").attr('checked', true);
  }
}

if (getCookie("style") == null) {
  setCookie("style", web_style)
  updateStyle();
} else if (getCookie("style") == "white") {
  setCookie("style", "white")
  updateStyle();
} else if (getCookie("style") == "black") {
  setCookie("style", "black")
  updateStyle();
}

$("#update_style").change(function () {
  var style = $("#update_style").is(':checked');
  if (style) {
    setCookie("style", "black")
    updateStyle();
  } else {
    setCookie("style", "white")
    updateStyle();
  }
});

// 文章过时提示
if (/^\/archives\/.+/.test(location.pathname) && pub_date && Date.now() - pub_date >= 90 * 24 * 60 * 60 * 1000) {
  $('.outdated-notify .num').text(Math.floor((Date.now() - pub_date) / (24 * 60 * 60 * 1000)))
  $('.outdated-notify').show()
};

// 文章页后退按钮
$('a.back').click(function () {
  if (history.length > 1) {
    history.go(-1);
  } else {
    location.replace('/')
  }
});

// 返回顶部按钮
(function () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return
  }

  var isShow = false, lock = false;
  var $btn = $('.back-to-top');

  $(document).scroll(function () {
    if (lock) return

    if ($(this).scrollTop() >= 1000) {
      if (!isShow) $btn.addClass('load')
      isShow = true
    } else {
      if (isShow) {
        $btn.removeClass('load')
        isShow = false
      }
    }
  })

  $btn.click(function () {
    lock = true
    $btn.addClass('ani-leave')

    $("html, body").animate({ scrollTop: 0 }, 800);

    setTimeout(function () {
      $btn.removeClass('ani-leave').addClass('leaved')
    }, 390)

    setTimeout(function () {
      $btn.addClass('ending')
    }, 120)

    setTimeout(function () {
      $btn.removeClass('load')
    }, 1500);

    setTimeout(function () {
      lock = false
      isShow = false
      $btn.removeClass('leaved ending')
    }, 2000);
  })
})();

// 点击锚链接平滑滚动到视图
$(document).on('click', 'a[href^="#"]', function (e) {
  e.preventDefault();
  var id = $(this).attr('href');
  var $el = $(id);
  if ($el.length > 0) $el[0].scrollIntoView({
    behavior: 'smooth'
  })
});

// 简单粗暴跳转指定评论
(function () {
  var hash = location.hash
  if (hash && hash.startsWith('#')) {
    setTimeout(function () {
      var $el = $(hash);
      if ($el.length > 0) $el[0].scrollIntoView({
        behavior: 'smooth'
      })
    }, 1500);
  }
})();