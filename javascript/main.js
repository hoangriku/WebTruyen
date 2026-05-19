
document.addEventListener('DOMContentLoaded', function () {
    
    // Tìm các phần tử giao diện Menu Drawer cần tương tác
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const btnClose = document.getElementById('closeBtn');
    const openBtn = document.getElementById('openBtn');
    const headerBottom = document.getElementById('headerBottom');

    const userAvatar = document.getElementById('userAvatar');
    const accountDropdown = document.getElementById('accountDropdown');

    // Hàm thực thi mở Menu Danh mục
    function openMobileMenu(e) {
        if (e) e.preventDefault();
        if (mobileDrawer) mobileDrawer.classList.add('show');
        if (mobileOverlay) mobileOverlay.classList.add('show');
    }

    // Hàm thực thi đóng Menu Danh mục
    function closeMobileMenu() {
        if (mobileDrawer) mobileDrawer.classList.remove('show');
        if (mobileOverlay) mobileOverlay.classList.remove('show');
    }

    if (btnClose) btnClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    if (openBtn && headerBottom) {
        openBtn.addEventListener('click', function (e) {
            e.preventDefault();
            headerBottom.classList.toggle('show');
        });
    }
    // ── ĐIỀU HƯỚNG BOTTOM NAVIGATION TRÊN MOBILE ──
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function (e) {
            if (this.getAttribute('data-action') === 'menu' || this.id === 'navMenu') {
                e.preventDefault();
                bottomNavItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                openMobileMenu(e);
            } else {
                closeMobileMenu();
                bottomNavItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    const dropdownHeaders = document.querySelectorAll('.mobile-menu-drawer .dropdown-header');
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function (e) {
            e.stopPropagation();
            const parentItem = this.parentElement;
            const isOpen = parentItem.classList.contains('open');
            
            document.querySelectorAll('.mobile-menu-drawer .menu-item.has-dropdown').forEach(item => {
                item.classList.remove('open');
            });
            if (!isOpen) {
                parentItem.classList.add('open');
            }
        });
    });

    if (userAvatar && accountDropdown) {
        userAvatar.addEventListener('click', function (e) {
            e.stopPropagation();
            accountDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!accountDropdown.contains(e.target) && e.target !== userAvatar) {
                accountDropdown.classList.remove('show');
            }
        });
    }
    // ── HỆ THỐNG BANNER SLIDER TỰ ĐỘNG ĐỔI TRUYỆN CHÍNH ──
    let currentIndex = 0;
    let sliderTimer = null;
    const TIME_INTERVAL = 12000;

    const backgroundBlur = document.getElementById('backgroundBlur');
    const mangaImg = document.getElementById('mangaImg');
    const mangaTitle = document.getElementById('mangaTitle');
    const mangaTags = document.getElementById('mangaTags');
    const mangaDesc = document.getElementById('mangaDesc');
    const mangaAuthor = document.getElementById('mangaAuthor');
    const mangaNo = document.getElementById('mangaNo');

    function updateSlider(index) {
        const currentManga = mangaData[index];
        if (!currentManga) return;
                
        if (backgroundBlur) {
            backgroundBlur.style.backgroundImage = `url('${currentManga.image}')`;
        }
        if (mangaImg) mangaImg.src = currentManga.image;
        if (mangaTitle) mangaTitle.textContent = currentManga.title;
        if (mangaAuthor) mangaAuthor.textContent = currentManga.author;
        if (mangaNo) mangaNo.textContent = currentManga.no;
        if (mangaDesc) {
            mangaDesc.textContent = currentManga.desc;
            mangaDesc.scrollTop = 0;
        }

        if (mangaTags) {
            mangaTags.innerHTML = '';
            currentManga.tags.forEach(tagText => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tagText;
                mangaTags.appendChild(span);
            });
        }
    }

    function resetAutoplay() {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % mangaData.length;
            updateSlider(currentIndex);
        }, TIME_INTERVAL);
    }

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % mangaData.length;
            updateSlider(currentIndex);
            resetAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + mangaData.length) % mangaData.length;
            updateSlider(currentIndex);
            resetAutoplay();
        });
    }

    if (mangaData && mangaData.length > 0) {
        updateSlider(currentIndex);
        resetAutoplay();
    }
});

// Khối dữ liệu mảng Manga
const mangaData = [
    {
        no: "NO. 1",
        title: "Alya bàn bên thi thoảng lại trêu ghẹo tôi bằng tiếng nga",
        tags: ["Hài hước","Lãnh mạn","Đời thường"],
        desc: "Theo dõi câu chuyện về người đẹp hoàn hảo lạnh như băng, Alisa Mikhailovna Kujo nửa Nga và học sinh trung học kém thành tích trung bình của bạn, Masachika Kuze. Cô ấy có vẻ ngoài lạnh lùng, nhưng nói lên tình yêu của mình bằng một ngôn ngữ mà cô ấy nghĩ rằng không ai hiểu được... Cô ấy không biết rằng anh ấy hiểu cô ấy rất tốt! Tận hưởng mối tình lãng mạn ngớ ngẩn giữa Công chúa tuyết và Mr. Worldwide!",
        author: "Sansan Sun",
        image: "image/Arya.png"
    },
    {
        no: "NO .2",
        title: "Tỏ tình với nàng công chúa ở trường",
        tags: ["Lãng mạn","Hài hước","Harem","Học đường"],
        desc: "Một ngày nọ, Kanbara Yuuma rơi vào tình huống tuyệt vọng khi em gái của anh, Ayane, tống tiền anh bằng một bí mật đáng sợ nào đó trong quá khứ của anh. Yêu cầu của cô ấy? Để đảm bảo cho cô một vị trí 'Nàng công chúa thứ 6', danh hiệu danh giá chỉ được trao cho sáu ứng cử viên hàng đầu trong cuộc tổng tuyển cử nổi tiếng của Học viện Himagasaki. Quyết tâm giành lấy ngai vàng của riêng mình, Ayane buộc Yuuma phải sử dụng điểm yếu của mình làm đòn bẩy, khiến anh ta 'chinh phục' các ứng cử viên công chúa đối thủ của cô và dọn đường đến chiến thắng của cô. Nhưng giành được những cô gái rực rỡ nhất trường, những người đã quyến rũ cả học sinh, không phải là nhiệm vụ dễ dàng, và Yuuma phải vật lộn ở mọi ngã rẽ... Tệ hơn nữa, khi tham gia, anh thấy mình bị vướng vào những vướng mắc lãng mạn ngày càng phức tạp của chính các công chúa! Với cái tôi bị phơi bày, tình yêu và âm mưu va chạm hết sức mạnh, đây là bộ phim hài lãng mạn hỗn loạn nhất từ trước đến nay, và sự điên rồ bắt đầu từ đây!",
        author: "Kawai-san",
        image: "image/Gakuen no Hime.jpg"
    },
    {
        no: "NO .3",
        title: "Thiên sứ nhà bên",
        tags: ["Hài hước","Lãnh mạn","Học đường"],
        desc: "Mahiru là một cô gái xinh đẹp mà các bạn cùng lớp đều gọi cô là 'thiên thần'. Cô ấy không chỉ là một vận động viên ngôi sao với điểm số hoàn hảo - cô ấy còn tuyệt đẹp. Amane, một chàng trai bình thường và tự nhận mình là kẻ lười biếng, chưa bao giờ nghĩ nhiều về vẻ đẹp thần thánh, mặc dù học cùng trường. Tuy nhiên, mọi thứ thay đổi khi anh tình cờ nhìn thấy Mahiru ngồi một mình trong công viên trong một cơn mưa bão.",
        author: "Saeki-san",
        image: "image/Tenshi-sama.jpg"
    },
    {
        no: "NO .4",
        title: "Wistoria, Trượng và Kiếm",
        tags: ["Hành động","Học đường","Giả tưởng"],
        desc: "Tìm cách thực hiện lời hứa với một người bạn thời thơ ấu, Will Serfort vào Học viện Phép thuật Regarden với mục tiêu vươn lên đỉnh cao của thế giới phép thuật. Chỉ có một vấn đề: anh ta không thể sử dụng phép thuật! Liệu kỹ năng kiếm thuật của anh ấy có phải là chìa khóa để mở khóa tiềm năng thực sự của anh ấy không?",
        author: "Oomori Fujino",
        image: "image/wistoria.jpg"
    },
    {
        no: "NO .5",
        title: "Làm Bạn Với Cô Nàng Dễ Thương Nhì Lớp",
        tags: ["Hài hước","Lãnh mạn","Học đường"],
        desc: "Tôi, Maki Maehara, là một người cô độc trong lớp. Người bạn đầu tiên của tôi là Umi Asanagi. Cô ấy luôn là trung tâm của vòng kết nối xã hội, cô gái mà các chàng trai thầm thì thầm là 'dễ thương thứ hai trong lớp'. Tôi nghĩ một nhân vật nền như tôi sống trong một thế giới hoàn toàn khác với cô ấy, nhưng hóa ra cô ấy là một fan hâm mộ lớn của phim hạng B!? Sau khi trở thành bạn bè qua một vòng xoắn của số phận, Asanagi bí mật đến đi chơi ở nhà tôi vào thứ Sáu hàng tuần sau giờ học. Phim ảnh, trò chơi, manga, chúng tôi có một khoảng thời gian tuyệt vời bên nhau chia sẻ những sở thích giống hệt nhau. 'Này, Maehara, nhìn kìa! Tôi sẽ để cô ngồi ngay đây như một món quà đặc biệt.' 'Đó là giường của tôi ngay từ đầu...' 'Chỉ cho ngày hôm nay, đó là giường của tôi. Nào, qua đây.' Cậu không quá thân sao, Asanagi?",
        author: "Takata",
        image: "image/Class de 2-banme ni Kawaii.jpg"
    },
    {
        no: "NO .6",
        title: "Chào mừng đến với lớp học đề cao thực lực",
        tags: ["Hài hước","Drama","Tâm lý","Lãng mạn"],
        desc: "Mùa xuân thứ hai tại Trường Trung học Nuôi dưỡng Nâng cao đang chào đón Ayanokoji và Lớp D. Các kỳ thi đặc biệt không chỉ là những gì đang chờ đợi họ, mà còn là những sinh viên năm nhất độc đáo. Kazuomi Hōsen và Ryuuen. Hai người đã chia sẻ tiếng xấu với nhau trong những ngày học cấp hai của Ryuen. Takuya Yagami, người tuyên bố đến từ cùng trường trung học với Kushida, đang tiếp cận cô ấy. Và Ichika Amasawa thất thường, người đang kéo Ayanokoji sang trái và phải.",
        author: "Kinugasa Shougo",
        image: "image/Classroom of Elite.jpg"
    },
    {
        no: "NO .7",
        title: "Kanan-sama Dễ Dụ Thật Đấy",
        tags: ["Hài hước", "Học đường","Lãng mạn"],
        desc: "Kanan là một con quỷ ẩn náu trong một trường trung học ở thế giới loài người để ăn linh hồn của con người. Cô ấy để mắt đến một nam sinh trung học độc thân, nhưng bằng cách nào đó lại kết thúc trong một hợp đồng tình nhân với anh ta!? Kanan, người chưa bao giờ yêu, giờ đây tràn ngập những cảm xúc mới!",
        author: "nonco",
        image: "image/Kanan-san.jpg"
    },
    {
        no: "NO .8",
        title: "'Thang thiện cảm' của Marika-chan bị hỏng mất rồi!",
        tags: ["Hài hước", "Đời thường", "Lãng mạn"],
        desc: "Tôi đã có khả năng nhìn thấy mức độ tình cảm của cô gái mà tôi thích. Tôi không có can đảm để thổ lộ cảm xúc của mình với người bạn thời thơ ấu của tôi, Marika-chan. Một ngày nọ, tôi thực hiện một điều ước mạnh mẽ với một ngôi sao băng: 'Tôi ước gì tôi có thể hiểu được cảm xúc của người khác, giống như trong một trò chơi hẹn hò.' Sau đó, điều ước đó đã trở thành sự thật...!? Lơ lửng phía trên các cô gái trong lớp tôi là những thước đo tình cảm. Trong khi bối rối trước cảnh tượng siêu thực này, tôi quyết định kiểm tra đồng hồ của Marika-chan, chỉ để thấy nó đã vượt quá giới hạn của nó, biến thành một đồng hồ địa ngục...!?",
        author: "Komugi Rin",
        image: "image/Marika Love.jpg" 
    },
    {
        no: "NO .9",
        title: "Re:Zero - Bắt đầu lại ở thế giới khác",
        tags: ["Hành động", "Tâm lý", "Mạo hiểm"],
        desc: "Đột nhiên, một học sinh trung học Subaru Natsuki đã được triệu hồi đến một thế giới khác trên đường trở về từ cửa hàng tiện lợi. Với cuộc khủng hoảng lớn nhất trong cuộc đời anh ta được triệu hồi đến một thế giới khác và không có dấu hiệu của người đã triệu hồi anh ta, mọi thứ trở nên tồi tệ hơn khi anh ta bị tấn công. Nhưng khi được cứu bởi một cô gái tóc bạc bí ẩn với một con mèo tiên, Subaru hợp tác với cô gái để đáp lại ân huệ. Khi cuối cùng họ tìm được manh mối, Subaru và cô gái bị ai đó tấn công và giết. Subaru sau đó tỉnh dậy ở nơi anh ta được triệu hồi và nhận thấy khả năng mà anh ta có được: 'Trở về bằng cái chết', một cậu bé bất lực chỉ có khả năng tua ngược thời gian bằng cách chết. Và vượt qua sự tuyệt vọng, anh ta có thể cứu cô gái khỏi số phận của cái chết!",
        author: "Nagatsuki Tappei",
        image: "image/rezero.jpg"
    },
    {
        no: "NO .10",
        title: "Dr.Stone",
        tags: ["Hành động", "Mạo hiểm", "Sci-Fi"],
        desc: "Hãy tưởng tượng bạn thức dậy trong một thế giới nơi mọi con người cuối cùng đều bị biến thành đá một cách bí ẩn... Một ngày định mệnh, toàn thể nhân loại bị hóa đá bởi một tia sáng chói mắt. Sau vài thiên niên kỷ, học sinh trung học Taiju tỉnh dậy và thấy mình bị lạc trong một thế giới của những bức tượng. Tuy nhiên, anh ấy không đơn độc! Người bạn yêu khoa học Senku của anh ấy đã hoạt động được vài tháng và anh ấy đã có một kế hoạch lớn trong đầu — khởi động nền văn minh với sức mạnh của khoa học!",
        author: "Inagaki Riichiro",
        image: "image/Dr.Stone.jpg" 
    }
];