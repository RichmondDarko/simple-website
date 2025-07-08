document.addEventListener('DOMContentLoaded', function() {
    // Like button functionality
    const likeBtns = document.querySelectorAll('.like-btn');
    
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('liked');

const icon = this.querySelector('i');
            
            if (this.classList.contains('liked')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                // In a real app, send this to your backend
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                // In a real app, remove like from backend
            }
        });
    });
    
    // Age range slider
    const ageSlider = document.querySelector('#age');
    const ageValue = document.querySelector('.age-value');
    
    ageSlider.addEventListener('input', function() {
        ageValue.textContent = `18 - ${this.value}`;
    });
    
    // Interest tags selection
    const interestTags = document.querySelectorAll('.tag');
    
    interestTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Filter profiles
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const profileCards = document.querySelectorAll('.profile-card');
    
    applyFiltersBtn.addEventListener('click', function() {
        const genderFilter = document.querySelector('#gender').value;
        const ageFilter = document.querySelector('#age').value;
        const distanceFilter = document.querySelector('#distance').value;
        const selectedInterests = Array.from(document.querySelectorAll('.tag.active'))
                                      .map(tag => tag.dataset.interest);
        
        profileCards.forEach(card => {
            const cardGender = card.dataset.gender;
            const cardAge = parseInt(card.dataset.age);
            const cardDistance = parseInt(card.dataset.distance);
            const cardInterests = card.dataset.interests.split(',');
            
            // Apply filters
            let shouldShow = true;
            
            // Gender filter
            if (genderFilter !== 'all' && cardGender !== genderFilter) {
                shouldShow = false;
            }
            
            // Age filter
            if (cardAge > ageFilter) {
                shouldShow = false;
            }
            
            // Distance filter
            if (distanceFilter !== 'any' && cardDistance > distanceFilter) {
                shouldShow = false;
            }
            
            // Interests filter
            if (selectedInterests.length > 0) {
                const hasCommonInterest = selectedInterests.some(interest => 
                    cardInterests.includes(interest)
                );
                if (!hasCommonInterest) {
                    shouldShow = false;
                }
            }
            
            // Show/hide card based on filters
            card.style.display = shouldShow ? 'block' : 'none';
        });
    });
    
    // Reset filters
    resetFiltersBtn.addEventListener('click', function() {
        // Reset form elements
        document.querySelector('#gender').value = 'all';
        document.querySelector('#age').value = '30';
        document.querySelector('.age-value').textContent = '18 - 30';
        document.querySelector('#distance').value = '10';
        
        // Reset interest tags
        interestTags.forEach(tag => tag.classList.remove('active'));
        
        // Show all profiles
        profileCards.forEach(card => card.style.display = 'block');
    });
    
    // Load more profiles
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    loadMoreBtn.addEventListener('click', function() {
        // In a real app, this would fetch more profiles from your backend
        alert('Loading more profiles... This would fetch data from your server in a real application.');
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('input', function() {

const searchTerm = this.value.toLowerCase();
        
        profileCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const interests = card.querySelector('.profile-interests').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || interests.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});