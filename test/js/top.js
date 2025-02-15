'use strict'

// ナビバー クローズボタン処理
const closeBtn = document.getElementById('closeBtn');
const naviBar = document.getElementById('naviBar')

closeBtn.addEventListener('click', function(e){
    naviBar.style.position = 'static';
    e.target.parentNode.removeChild(this);
}, false);