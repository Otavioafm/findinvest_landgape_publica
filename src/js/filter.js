document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('filter-select');
    const searchInput = document.getElementById('search-input');
    const startupsGrid = document.getElementById('startups-grid');
    const startupCards = startupsGrid.getElementsByClassName('startup-card');

    filterSelect.addEventListener('change', filterStartups);
    searchInput.addEventListener('input', filterStartups);

    function filterStartups() {
        const filterValue = filterSelect.value.toLowerCase();
        const searchValue = searchInput.value.toLowerCase();

        Array.from(startupCards).forEach(card => {
            const tags = card.getAttribute('data-tags').toLowerCase();
            const name = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            const matchesFilter = filterValue === 'all' || tags.includes(filterValue);
            const matchesSearch = name.includes(searchValue) || description.includes(searchValue);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
