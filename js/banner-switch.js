(function() {
    var banner = document.getElementById('banner');
    if (!banner) return;

    // 判断当前背景图是否为 theme.xxx
    var bg = banner.style.backgroundImage || banner.style.background;
    // 兼容 background 属性
    if (!bg) {
        bg = window.getComputedStyle(banner).backgroundImage;
    }
    // 只在背景图为 /img/default.xxx 时才执行切换
    if (!/\/img\/default\./.test(bg)) return;
  // 读取配置的图片路径（默认成为default.png, 建议不设置切图的话把大屏图命名为default）
  var bannerImgLight = window.BANNER_IMG_LIGHT || '/img/default.png';
  var bannerImgDark = window.BANNER_IMG_DARK || '/img/default.png';

  function setBanner() {
    var banner = document.getElementById('banner');
    if (!banner) return;
    var html = document.documentElement;
    var mode = html.getAttribute('data-user-color-scheme');
    if (mode === 'dark') {
      banner.style.backgroundImage = "url('" + bannerImgDark + "')";
      banner.style.background = "url('" + bannerImgDark + "') center center / cover no-repeat";
    } else {
      banner.style.backgroundImage = "url('" + bannerImgLight + "')";
      banner.style.background = "url('" + bannerImgLight + "') center center / cover no-repeat";
    }
    console.log('[banner] 已重新渲染大图，当前模式：', mode);
  }

  // 初始执行
  setBanner();

  // 监听属性变化
  var observer = new MutationObserver(setBanner);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-user-color-scheme'] });
})();