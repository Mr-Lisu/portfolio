// ページの全てのコンテンツが読み込まれてから実行する
document.addEventListener("DOMContentLoaded", function() {

    // --- グローバル変数 ---
    const galleryItems = []; // ギャラリーの画像ソースをすべて格納する配列
    let currentIndex = 0;    // 現在表示している画像のインデックス

    // --- 必要な要素を取得 ---
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    
    // [新] ナビゲーションとドットの要素
    const closeButton = document.getElementById('lightbox-close');
    const nextButton = document.getElementById('lightbox-next');
    const prevButton = document.getElementById('lightbox-prev');
    const dotsContainer = document.getElementById('lightbox-dots-container');
    

    // --- (A) 初期化処理 ---
    // ページ読み込み時に、全画像の情報を収集し、ドットを生成する
    triggers.forEach(function(trigger, index) {
        // 1. 画像ソースを配列に保存
        const imageSrc = trigger.getAttribute('href');
        galleryItems.push(imageSrc);
        
        // 2. 各画像リンクに、後で使うためのインデックス番号を付与
        trigger.dataset.index = index;
        
        // 3. 画像の数だけドットを生成して配置
        const dot = document.createElement('span');
        dot.classList.add('lightbox-dot');
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });

    // --- (B) メインの画像表示関数 ---
    function showImage(index) {
        // 1. 配列から画像ソースを取得してセット
        lightboxImage.setAttribute('src', galleryItems[index]);
        // 2. 現在のインデックスを更新
        currentIndex = index;
        // 3. ドットの「アクティブ」状態を更新
        updateDots();
    }

    // --- (C) ドットのアクティブ状態を更新する関数 ---
    function updateDots() {
        const dots = document.querySelectorAll('.lightbox-dot');
        dots.forEach(function(dot, index) {
            if (index === currentIndex) {
                dot.classList.add('active'); // 現在の画像に対応するドット
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // --- (D) 「次へ」ボタンの処理 ---
    function showNextImage() {
        currentIndex++;
        // 最後の画像より先に進もうとしたら、最初に戻る (ループ)
        if (currentIndex >= galleryItems.length) {
            currentIndex = 0;
        }
        showImage(currentIndex);
    }

    // --- (E) 「戻る」ボタンの処理 ---
    function showPrevImage() {
        currentIndex--;
        // 最初の画像より前に戻ろうとしたら、最後に戻る (ループ)
        if (currentIndex < 0) {
            currentIndex = galleryItems.length - 1;
        }
        showImage(currentIndex);
    }

    // --- (F) イベントリスナーをまとめて登録 ---

    // 1. ギャラリーの画像がクリックされた時
    triggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault(); // リンクのデフォルト動作を停止
            
            // (A)で保存したインデックス番号を取得
            const index = parseInt(trigger.dataset.index);
            
            showImage(index); // その画像を表示
            lightbox.classList.add('show'); // ライトボックスを表示
        });
    });

    // 2. 閉じるボタン
    closeButton.addEventListener('click', function() {
        lightbox.classList.remove('show');
    });

    // 3. 次へボタン
    nextButton.addEventListener('click', showNextImage);

    // 4. 戻るボタン
    prevButton.addEventListener('click', showPrevImage);

    // 5. ドットがクリックされた時
    dotsContainer.addEventListener('click', function(e) {
        // クリックされたのがドット(.lightbox-dot)だった場合
        if (e.target.classList.contains('lightbox-dot')) {
            const index = parseInt(e.target.dataset.index);
            showImage(index);
        }
    });

    // 6. 黒い背景がクリックされた時
    lightbox.addEventListener('click', function(e) {
        // 画像やボタンではなく、背景(e.target)自身がクリックされた場合のみ閉じる
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    /* --- ハンバーガーメニュー処理 --- */
    // 1. 必要な要素を取得
    const header = document.querySelector('header');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const drawerMenu = document.getElementById('drawer-menu');
    
    // 2. スクロールイベントの監視
    window.addEventListener('scroll', function() {
        // ヘッダーの高さを取得 (毎回取得するのが安全)
        const headerHeight = header.offsetHeight;
        
        // 現在のスクロール位置がヘッダーの高さより大きいか
        if (window.scrollY > headerHeight) {
            // アイコンを表示
            hamburgerIcon.classList.add('show');
        } else {
            // アイコンを非表示 (ヘッダーが見えている時)
            hamburgerIcon.classList.remove('show');
            // (ついでに) ヘッダーが見えてる時はメニューも強制的に閉じる
            hamburgerIcon.classList.remove('active');
            drawerMenu.classList.remove('open');
        }
    });
    
    // 3. ハンバーガーアイコンのクリックイベント
    hamburgerIcon.addEventListener('click', function() {
        // アイコン自体を 'active' にする (X印に変形させるため)
        this.classList.toggle('active');
        
        // ドロワーメニューを開閉する
        drawerMenu.classList.toggle('open');
    });
    
    // 4. (おまけ) ドロワー内のリンククリックでメニューを閉じる
    const drawerLinks = drawerMenu.querySelectorAll('a');
    drawerLinks.forEach(function(link) {
        // 外部サイトへのリンクでない場合のみ
        if (link.hostname === location.hostname || link.pathname === location.pathname) {
            link.addEventListener('click', function() {
                hamburgerIcon.classList.remove('active');
                drawerMenu.classList.remove('open');
            });
        }
    });

});