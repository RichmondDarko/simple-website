document.addEventListener('DOMContentLoaded', function() {
    // Get all DOM elements
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const profileCards = document.querySelectorAll('.profile-card');
    const ageSlider = document.querySelector('#age');
    const ageValue = document.querySelector('.age-value');
    const interestTags = document.querySelectorAll('.tag');
    
    // Initialize filters object
    let currentFilters = {
        gender: 'all',
        maxAge: 80,
        maxDistance: 'any',
        interests: []
    };

    // Update age display when slider changes
    ageSlider.addEventListener('input', function() {
        currentFilters.maxAge = parseInt(this.value);
        ageValue.textContent = `18 - ${this.value}`;
    });

    // Toggle interest tags
    interestTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const interest = this.dataset.interest;
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                currentFilters.interests = currentFilters.interests.filter(i => i !== interest);
            } else {
                this.classList.add('active');
                currentFilters.interests.push(interest);
            }
        });
    });

    // Main filter function
    function filterProfiles() {
        // Get current filter values
        currentFilters.gender = document.querySelector('#gender').value;
        currentFilters.maxDistance = document.querySelector('#distance').value;
        
        profileCards.forEach(card => {
            const cardGender = card.dataset.gender;
            const cardAge = parseInt(card.dataset.age);
            const cardDistance = parseInt(card.dataset.distance);
            const cardInterests = card.dataset.interests.split(',');
            
            // Check against each filter
            const genderMatch = currentFilters.gender === 'all' || cardGender === currentFilters.gender;
            const ageMatch = cardAge <= currentFilters.maxAge;
            const distanceMatch = currentFilters.maxDistance === 'any' || 
                                 cardDistance <= parseInt(currentFilters.maxDistance);
            
            // Check interests if any are selected
            let interestMatch = true;
            if (currentFilters.interests.length > 0) {
                interestMatch = currentFilters.interests.some(interest => 
                    cardInterests.includes(interest)
                );
            }
            
            // Show/hide card based on all filters
            if (genderMatch && ageMatch && distanceMatch && interestMatch) {
                card.style.display = 'block';
                // Add animation for better UX
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results
        showNoResultsMessage();
    }

    // Show message when no profiles match filters
    function showNoResultsMessage() {
        const visibleCards = document.querySelectorAll('.profile-card[style="display: block;"], .profile-card:not([style])');
        
        if (visibleCards.length === 0) {
            // Create or show no results message
            let noResults = document.querySelector('.no-results');
            
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <div class="no-results-content">
                        <i class="fas fa-user-slash"></i>
<h3>No profiles match your filters</h3>
                        <p>Try adjusting your search criteria</p>
                        <button class="reset-filters-btn">Reset Filters</button>
                    </div>
                `;
                document.querySelector('.profiles-grid').appendChild(noResults);
                
                // Add event listener to reset button
                noResults.querySelector('.reset-filters-btn').addEventListener('click', resetFilters);
            }
        } else {
            // Remove no results message if it exists
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }
    }

    // Reset all filters
    function resetFilters() {
        // Reset form elements
        document.querySelector('#gender').value = 'all';
        ageSlider.value = '80';
        ageValue.textContent = '18 - 80';
        document.querySelector('#distance').value = 'any';
        
        // Reset interest tags
        interestTags.forEach(tag => tag.classList.remove('active'));
        currentFilters.interests = [];
        
        // Reset filters object
        currentFilters = {
            gender: 'all',
            maxAge: 80,
            maxDistance: 'any',
            interests: []
        };
        
        // Show all profiles
        profileCards.forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        });
        
        // Remove no results message if it exists
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }

    // Event listeners
    applyFiltersBtn.addEventListener('click', filterProfiles);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Like button functionality (kept from previous implementation)
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('liked');
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });
});
