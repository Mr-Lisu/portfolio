// ページの全てのコンテンツが読み込まれてから実行する
document.addEventListener("DOMContentLoaded", function() {
    
    // --- 必要な要素を取得 ---
    // 1. 全てのギャラリーアイテムの「リンク(aタグ)」
    const triggers = document.querySelectorAll('.lightbox-trigger');
    
    // 2. ライトボックス本体（オーバーレイ）
    const lightbox = document.getElementById('lightbox-overlay');
    
    // 3. 閉じるボタン
    const closeButton = document.getElementById('lightbox-close');
    
    // 4. 中に表示する画像
    const lightboxImage = document.getElementById('lightbox-image');

    // --- (A) 画像クリック時の動作 ---
    triggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            // 1. aタグのデフォルトの動作（ページ遷移）を止める
            e.preventDefault(); 
            
            // 2. クリックされたリンク(a)の href (画像パス) を取得
            const imageSrc = trigger.getAttribute('href');
            
            // 3. ライトボックスの中身をセット
            lightboxImage.setAttribute('src', imageSrc);
            
            // 4. ライトボックスを表示
            lightbox.classList.add('show');
        });
    });

    // --- (B) 閉じるボタンクリック時の動作 ---
    closeButton.addEventListener('click', function() {
        lightbox.classList.remove('show'); // ライトボックスを隠す
    });

    // --- (C) 背景（オーバーレイ）クリック時の動作 ---
    lightbox.addEventListener('click', function(e) {
        // クリックされたのが背景自身(e.target)であった場合のみ閉じる
        // (中の画像やタイトルをクリックしても閉じないように)
        if (e.target === lightbox) {
            lightbox.classList.remove('show'); // ライトボックスを隠す
        }
    });

});