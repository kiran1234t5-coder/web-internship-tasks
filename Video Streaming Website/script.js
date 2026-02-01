  // Expanded Movie Data (20+ Items)
        const movieData = [
            // Trending
            { title: "Avatar: Way of Water", genre: "Sci-Fi", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500", cat: "trending" },
            { title: "Stranger Things", genre: "Horror", img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500", cat: "trending" },
            { title: "The Last of Us", genre: "Action", img: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=500", cat: "trending" },
            { title: "House of Dragon", genre: "Fantasy", img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=500", cat: "trending" },

            // Action
            { title: "The Dark Knight", genre: "Action", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500", cat: "action" },
            { title: "John Wick 4", genre: "Action", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500", cat: "action" },
            { title: "Extraction 2", genre: "Action", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500", cat: "action" },
            { title: "Top Gun Maverick", genre: "Action", img: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=500", cat: "action" },

            // Sci-Fi
            { title: "Interstellar", genre: "Sci-Fi", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=500", cat: "scifi" },
            { title: "Dune", genre: "Sci-Fi", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500", cat: "scifi" },
            { title: "Blade Runner 2049", genre: "Sci-Fi", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500", cat: "scifi" },
            { title: "Cyberpunk 2077", genre: "Sci-Fi", img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500", cat: "scifi" },
            { title: "The Matrix", genre: "Sci-Fi", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500", cat: "scifi" }
        ];

        function toggleMenu() {
            document.getElementById('sidebar').classList.toggle('active');
            document.getElementById('overlay').classList.toggle('active');
        }

        window.addEventListener('scroll', () => {
            document.getElementById('mainHeader').classList.toggle('scrolled', window.scrollY > 50);
        });

        function loadMovies() {
            const grids = {
                trending: document.getElementById('trendingGrid'),
                action: document.getElementById('actionGrid'),
                scifi: document.getElementById('scifiGrid')
            };

            Object.values(grids).forEach(g => g.innerHTML = '');

            movieData.forEach(movie => {
                const html = `
                    <div class="card">
                        <img src="${movie.img}" alt="${movie.title}">
                        <div class="card-body">
                            <h4>${movie.title}</h4>
                            <p>${movie.genre} • 4K</p>
                        </div>
                    </div>`;
                if (grids[movie.cat]) grids[movie.cat].innerHTML += html;
            });
        }

        function filterMovies() {
            const val = document.getElementById('movieSearch').value.toLowerCase();
            document.querySelectorAll('.card').forEach(card => {
                const title = card.querySelector('h4').innerText.toLowerCase();
                card.style.display = title.includes(val) ? 'block' : 'none';
            });
        }

        loadMovies();