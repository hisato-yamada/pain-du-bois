/* Pattern 07 — タイムライン型 main.js */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  /* ヘッダー: スクロールで白背景に切り替え */
  function handleScroll() {
    if (window.scrollY > window.innerHeight - 80) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('header__nav--open');
      hamburger.classList.toggle('header__hamburger--open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.header__nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('header__nav--open');
        hamburger.classList.remove('header__hamburger--open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* スクロールアニメーション: タイムラインアイテム */
  var items = document.querySelectorAll('.story__item');

  if ('IntersectionObserver' in window && items.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('story__item--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .15 });

    items.forEach(function (item) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = 'opacity .6s ease, transform .6s ease';
      observer.observe(item);
    });

    document.addEventListener('animationframeready', function () {});
  }

  /* ビジブル状態の適用 */
  document.querySelectorAll('.story__item').forEach(function (el) {
    el.addEventListener('transitionend', function () {});
  });

  /* IntersectionObserver コールバック内でスタイル直接適用 */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });

    document.querySelectorAll('.story__item').forEach(function (el) {
      revealObserver.observe(el);
    });
  }
})();
