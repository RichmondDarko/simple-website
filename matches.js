document.addEventListener('DOMContentLoaded', function() {
    // Toggle between grid and list view
    const viewBtns = document.querySelectorAll('.view-btn');
    const matchesGrid = document.querySelector('.matches-grid');
    const matchesList = document.querySelector('.matches-list');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'grid') {
                matchesGrid.style.display = 'grid';
                matchesList.style.display = 'none';
            } else {
                matchesGrid.style.display = 'none';
                matchesList.style.

display = 'block';
            }
        });
    });
    
    // Filter matches by category
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            const matchCards = document.querySelectorAll('.match-card');
            
            matchCards.forEach(card => {
                card.style.display = 'block';
                
                if (category === 'new' && !card.classList.contains('new-match')) {
                    card.style.display = 'none';
                } else if (category === 'top' && !card.classList.contains('top-pick')) {
                    card.style.display = 'none';
                } else if (category === 'liked' && !card.classList.contains('liked-match')) {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Like button functionality
    const likeBtns = document.querySelectorAll('.like-btn');
    
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('liked');
            
            // In a real app, you would send this to your backend
            const card = this.closest('.match-card');
            if (this.classList.contains('liked')) {
                card.classList.add('liked-match');
            } else {
                card.classList.remove('liked-match');
            }
        });
    });
    
    // Age range slider
    const ageSlider = document.querySelector('.slider');
    const ageDisplay = document.querySelector('.age-display');
    
    ageSlider.addEventListener('input', function() {
        ageDisplay.textContent = `18 - ${this.value}`;
    });
    
    // Load more matches
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    loadMoreBtn.addEventListener('click', function() {
        // In a real app, this would fetch more matches from your backend
        alert('Loading more matches... This would fetch data from your server in a real application.');
    });
    
    // Keep filter dropdown open when clicking inside
    document.querySelector('.filter-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
});