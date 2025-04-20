// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize map
  const map = L.map('map').setView([40.7536, -73.9832], 13);
  
  // Add tile layer (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Markers group
  const markers = L.layerGroup().addTo(map);
  
  // Navigation event listeners
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      
      // Update active navigation link
      navLinks.forEach(el => el.classList.remove('active'));
      link.classList.add('active');
      
      // Update active view
      document.querySelectorAll('.view-container').forEach(el => {
        el.classList.remove('active');
      });
      document.getElementById(`${view}-view`).classList.add('active');
      
      // Resize map when switching to map view (fixes rendering issues)
      if (view === 'map') {
        setTimeout(() => {
          map.invalidateSize();
        }, 100);
      }
    });
  });
  
  // Filter event listeners
  const neighborhoodFilter = document.getElementById('neighborhood');
  const dayFilter = document.getElementById('day');
  
  // Initial render
  renderDeals();
  
  // Filter event listeners
  neighborhoodFilter.addEventListener('change', renderDeals);
  dayFilter.addEventListener('change', renderDeals);
  
  // Function to render deals based on filters
  function renderDeals() {
    const selectedNeighborhood = neighborhoodFilter.value;
    const selectedDay = dayFilter.value;
    
    // Filter deals
    const filteredDeals = happyHourDeals.filter(deal => {
      const neighborhoodMatch = selectedNeighborhood === 'all' || deal.neighborhood === selectedNeighborhood;
      const dayMatch = selectedDay === 'all' || deal.days.includes(selectedDay);
      
      return neighborhoodMatch && dayMatch;
    });
    
    // Render map markers
    renderMapMarkers(filteredDeals);
    
    // Render list view
    renderListView(filteredDeals);
  }
  
  // Function to render map markers
  function renderMapMarkers(deals) {
    // Clear existing markers
    markers.clearLayers();
    
    deals.forEach(deal => {
      const marker = L.marker(deal.location)
        .bindPopup(`
          <div class="popup-content">
            <h3>${deal.name}</h3>
            <p>${deal.address}</p>
            <p><strong>${deal.hours}</strong></p>
            <p>${deal.deals}</p>
            ${deal.website ? `<a href="${deal.website}" target="_blank" class="website-link">Visit Website</a>` : ''}
            <a href="#" class="popup-link" data-id="${deal.id}">View Details</a>
          </div>
        `);
      
      markers.addLayer(marker);
    });
    
    // If we have deals, fit bounds to see all markers
    if (deals.length > 0) {
      const bounds = L.featureGroup(markers.getLayers()).getBounds();
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }
  
  // Function to render list view
  function renderListView(deals) {
    const dealsContainer = document.getElementById('deals-list');
    dealsContainer.innerHTML = '';
    
    if (deals.length === 0) {
      dealsContainer.innerHTML = '<div class="no-results">No happy hour deals match your filters.</div>';
      return;
    }
    
    deals.forEach(deal => {
      const dealCard = document.createElement('div');
      dealCard.className = 'deal-card';
      
      dealCard.innerHTML = `
        <div class="deal-info">
          <h3 class="deal-name">${deal.name}</h3>
          <p class="deal-location">${deal.subNeighborhood}</p>
          <p class="deal-address">${deal.address}</p>
          <p class="deal-time">${deal.hours} • ${formatDays(deal.days)}</p>
          <p class="deal-description">${deal.description}</p>
          <p class="deal-deals"><strong>Deals:</strong> ${deal.deals}</p>
          ${deal.website ? `<p class="deal-website"><a href="${deal.website}" target="_blank">Visit Website</a></p>` : ''}
        </div>
      `;
      
      dealsContainer.appendChild(dealCard);
    });
  }
  
  // Helper function to format days
  function formatDays(days) {
    if (days.length === 7) {
      return 'Everyday';
    }
    
    // If days include the entire weekend
    if (days.includes('saturday') && days.includes('sunday') && days.length === 2) {
      return 'Weekends';
    }
    
    // If days are Monday through Friday
    if (days.length === 5 && 
        days.includes('monday') && 
        days.includes('tuesday') && 
        days.includes('wednesday') && 
        days.includes('thursday') && 
        days.includes('friday') && 
        !days.includes('saturday') && 
        !days.includes('sunday')) {
      return 'Weekdays';
    }
    
    // Otherwise, just list the days
    const dayMap = {
      'monday': 'Mon',
      'tuesday': 'Tue',
      'wednesday': 'Wed',
      'thursday': 'Thu',
      'friday': 'Fri',
      'saturday': 'Sat',
      'sunday': 'Sun'
    };
    
    return days.map(day => dayMap[day]).join(', ');
  }
  
  // Handle popup link clicks
  map.on('popupopen', function(e) {
    const popupLink = e.popup._contentNode.querySelector('.popup-link');
    
    if (popupLink) {
      popupLink.addEventListener('click', function(e) {
        e.preventDefault();
        const dealId = parseInt(this.getAttribute('data-id'));
        const deal = happyHourDeals.find(d => d.id === dealId);
        
        if (deal) {
          // Switch to list view
          document.querySelector('nav a[data-view="list"]').click();
          
          // Scroll to the deal card after a short delay to allow view switching
          setTimeout(() => {
            const dealCards = document.querySelectorAll('.deal-card');
            const index = happyHourDeals.findIndex(d => d.id === dealId);
            
            if (index >= 0 && index < dealCards.length) {
              dealCards[index].scrollIntoView({ behavior: 'smooth' });
              dealCards[index].classList.add('highlight');
              
              // Remove highlight after animation
              setTimeout(() => {
                dealCards[index].classList.remove('highlight');
              }, 2000);
            }
          }, 300);
        }
      });
    }
  });
});