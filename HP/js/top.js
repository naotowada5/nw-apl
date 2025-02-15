'use strict'

// ナビバー クローズボタン処理
const closeBtn = document.getElementById('closeBtn');
const naviBar = document.getElementById('naviBar')

closeBtn.addEventListener('click', function(e){
    naviBar.style.position = 'static';
    e.target.parentNode.removeChild(this);
}, false);

// スライダー
$('.slider').slick({
    autoplay: true,       //自動再生
    autoplaySpeed: 2000,  //自動再生のスピード
    speed: 800,           //スライドするスピード
    dots: true,           //スライド下のドット
    arrows: true,         //左右の矢印
    pauseOnFocus: false,  //フォーカス時も動く（ボタンを押してもループ)
    pauseOnHover: false,　//マウスホバー中も動く（ボタンを押してもループ）
    pauseOnDotsHover: false　//ドットフォーカス時も動く（ボタンを押してもループ）
});