 // --- GLOBAL STATE (Like Context API) ---
        const State = {
            user: "Kiran Shahzadi",
            posts: JSON.parse(localStorage.getItem('ig_final_v2')) || [
                { id: 1, user: 'Travel_Diaries', img: 'https://picsum.photos/800/800?sig=1', likes: 142, isLiked: false, saved: false, caption: 'Chasing sunsets... 🌅' },
                { id: 2, user: 'Kiran Shahzadi', img: 'https://picsum.photos/800/800?sig=2', likes: 850, isLiked: true, saved: true, caption: 'Building the future one line at a time. 💻' }
            ],
            view: 'feed',
            profileTab: 'posts'
        };

        // --- NAVIGATION (Framer Motion feel) ---
        function navigate(viewId) {
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
            const target = document.getElementById(viewId + '-view');
            target.classList.add('active-view');
            document.getElementById('app-header').classList.toggle('hidden', viewId === 'chat');
            State.view = viewId;
            window.scrollTo(0, 0);
        }

        // --- RENDER ENGINE ---
        function renderFeed() {
            const container = document.getElementById('feed-container');
            container.innerHTML = State.posts.map(post => `
                <div class="post-card fade-in">
                    <div class="post-header">
                        <img src="https://i.pravatar.cc/150?u=${post.user}" style="width:32px; border-radius:50%; margin-right:10px;">
                        ${post.user}
                    </div>
                    <div class="post-img-container" ondblclick="handleOptimisticLike(${post.id}, this)">
                        <img src="${post.img}" class="post-img" loading="lazy">
                        <i class="fas fa-heart heart-pop"></i>
                    </div>
                    <div style="padding:12px; display:flex; justify-content:space-between; font-size:1.4rem;">
                        <div style="display:flex; gap:18px;">
                            <i class="${post.isLiked ? 'fas liked btn-heart' : 'far'} fa-heart" onclick="handleOptimisticLike(${post.id})"></i>
                            <i class="far fa-comment"></i>
                            <i class="far fa-paper-plane"></i>
                        </div>
                        <i class="${post.saved ? 'fas' : 'far'} fa-bookmark" onclick="handleSave(${post.id})"></i>
                    </div>
                    <div style="padding:0 12px 15px; font-size:14px;">
                        <strong>${post.likes} likes</strong><br>
                        <strong>${post.user}</strong> ${post.caption}
                    </div>
                </div>
            `).join('');
        }

        function renderExplore() {
            const grid = document.getElementById('explore-grid');
            grid.innerHTML = Array.from({ length: 15 }).map((_, i) => `<img src="https://picsum.photos/400/400?sig=${i + 10}" loading="lazy">`).join('');
        }

        function renderProfile() {
            const grid = document.getElementById('profile-grid');
            const data = State.profileTab === 'posts'
                ? State.posts.filter(p => p.user === State.user)
                : State.posts.filter(p => p.saved);

            grid.innerHTML = data.map(p => `<img src="${p.img}">`).join('');
            if (data.length === 0) grid.innerHTML = `<div style="grid-column:span 3; text-align:center; padding:50px; color:gray;">No ${State.profileTab} yet.</div>`;
        }

        // --- OPTIMISTIC UI LOGIC ---
        function handleOptimisticLike(id, element) {
            const post = State.posts.find(p => p.id === id);

            // Visual Animation if double clicked
            if (element) {
                const heart = element.querySelector('.heart-pop');
                heart.classList.add('animate-heart');
                setTimeout(() => heart.classList.remove('animate-heart'), 800);
            }

            // Logic Update
            if (!post.isLiked || !element) { // If normal click or double tap on unliked
                post.isLiked = !post.isLiked;
                post.likes += post.isLiked ? 1 : -1;
                saveAndRefresh();
            }
        }

        function handleSave(id) {
            const post = State.posts.find(p => p.id === id);
            post.saved = !post.saved;
            saveAndRefresh();
        }

        function triggerPost() { document.getElementById('image-upload').click(); }

        function handleUpload(e) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newPost = {
                    id: Date.now(),
                    user: State.user,
                    img: event.target.result,
                    likes: 0, isLiked: false, saved: false,
                    caption: "New update from my coding lab! 🚀 #EliteDev"
                };
                State.posts.unshift(newPost);
                saveAndRefresh();
                navigate('feed');
            };
            reader.readAsDataURL(e.target.files[0]);
        }

        function sendMessage() {
            const input = document.getElementById('chat-input');
            const box = document.getElementById('chat-box');
            if (input.value.trim()) {
                box.innerHTML += `<div class="msg-bubble msg-sent fade-in">${input.value}</div>`;
                input.value = "";
                box.scrollTop = box.scrollHeight;
            }
        }

        function switchProfileTab(tab, el) {
            State.profileTab = tab;
            document.querySelectorAll('.tab-icon').forEach(t => t.classList.remove('active'));
            el.classList.add('active');
            renderProfile();
        }

        function saveAndRefresh() {
            localStorage.setItem('ig_final_v2', JSON.stringify(State.posts));
            renderFeed();
            renderProfile();
        }

        // --- THEME ENGINE ---
        document.getElementById('theme-btn').onclick = () => {
            const body = document.body;
            const isDark = body.getAttribute('data-theme') === 'dark';
            body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            document.getElementById('theme-btn').className = isDark ? 'fas fa-moon nav-item' : 'fas fa-sun nav-item';
        };

        // --- INITIALIZE ---
        (function init() {
            // Stories render
            document.getElementById('story-container').innerHTML = `<div class="story-unit"><div class="ring" style="background:#888"><img src="https://i.pravatar.cc/150?u=kiran"></div>Your Story</div>` +
                Array.from({ length: 7 }).map((_, i) => `<div class="story-unit"><div class="ring"><img src="https://i.pravatar.cc/150?u=${i + 20}"></div>User_${i + 1}</div>`).join('');

            renderFeed();
            renderExplore();
            renderProfile();
        })();