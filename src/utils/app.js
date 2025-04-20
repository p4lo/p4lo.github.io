// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Create stats panel element
  createStatsPanel();
  
  // Initialize map with modern styling
  const map = L.map('map', {
    zoomControl: false // We'll add zoom control manually for better styling
  }).setView([40.7500, -73.9700], 11);
  
  // Add tile layer with custom styling
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);
  
  // Add custom styled zoom control
  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);
  
  // Custom marker icon
  const customIcon = L.divIcon({
    className: 'custom-map-marker',
    html: '<div class="marker-inner"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  // Markers group
  const markers = L.layerGroup().addTo(map);
  
  // Create stats panel
  function createStatsPanel() {
    const statsPanel = document.createElement('div');
    statsPanel.className = 'stats-panel';
    statsPanel.innerHTML = `
      <div class="stats-panel-header">
        <h3>Happy Hour Details</h3>
        <div class="stats-panel-toggle">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8L1 3h10l-5 5z" fill="#1d1d1f" />
          </svg>
        </div>
      </div>
      <div class="stats-panel-content">
        <div class="stats-item">
          <div class="stats-item-label">Selected Neighborhood</div>
          <div class="stats-item-value" id="stats-neighborhood">All Neighborhoods</div>
        </div>
        <div class="stats-item">
          <div class="stats-item-label">Active Day</div>
          <div class="stats-item-value" id="stats-day">All Days</div>
        </div>
        <div class="stats-item">
          <div class="stats-item-label">Happy Hours Available</div>
          <div class="stats-item-value" id="stats-count">0</div>
        </div>
        <div class="stats-item">
          <div class="stats-item-label">Average Price Range</div>
          <div class="stats-item-value" id="stats-price">$ - $$</div>
        </div>
      </div>
    `;
    document.body.appendChild(statsPanel);
    
    // Make panel collapsible
    const header = statsPanel.querySelector('.stats-panel-header');
    header.addEventListener('click', () => {
      statsPanel.classList.toggle('collapsed');
    });
    
    // Show panel when in map view
    setTimeout(() => {
      statsPanel.classList.add('active');
    }, 1000);
  }
  
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
          
          // Show stats panel on map view
          document.querySelector('.stats-panel').classList.add('active');
        }, 100);
      } else {
        // Hide stats panel on list view
        document.querySelector('.stats-panel').classList.remove('active');
      }
    });
  });
  
  // Filter event listeners
  const neighborhoodFilter = document.getElementById('neighborhood');
  const dayFilter = document.getElementById('day');
  
  // Initial render
  renderDeals();
  
  // Filter event listeners
  neighborhoodFilter.addEventListener('change', () => {
    renderDeals();
    // Add subtle animation to indicate refresh
    document.body.classList.add('filters-changed');
    setTimeout(() => {
      document.body.classList.remove('filters-changed');
    }, 300);
  });
  
  dayFilter.addEventListener('change', () => {
    renderDeals();
    // Add subtle animation to indicate refresh
    document.body.classList.add('filters-changed');
    setTimeout(() => {
      document.body.classList.remove('filters-changed');
    }, 300);
  });
  
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
    
    // Update stats panel
    updateStatsPanel(filteredDeals, selectedNeighborhood, selectedDay);
  }
  
  // Update stats panel with current filter information
  function updateStatsPanel(deals, neighborhood, day) {
    // Get neighborhood display name
    let neighborhoodDisplay = 'All Neighborhoods';
    if (neighborhood !== 'all') {
      const option = neighborhoodFilter.querySelector(`option[value="${neighborhood}"]`);
      if (option) neighborhoodDisplay = option.textContent;
    }
    
    // Get day display name
    let dayDisplay = 'All Days';
    if (day !== 'all') {
      const option = dayFilter.querySelector(`option[value="${day}"]`);
      if (option) dayDisplay = option.textContent;
    }
    
    // Update stats elements
    document.getElementById('stats-neighborhood').textContent = neighborhoodDisplay;
    document.getElementById('stats-day').textContent = dayDisplay;
    document.getElementById('stats-count').textContent = deals.length;
    
    // Price estimate based on number of deals
    const priceLevel = deals.length > 50 ? '$ - $$' : deals.length > 20 ? '$$ - $$$' : '$$$';
    document.getElementById('stats-price').textContent = priceLevel;
  }
  
  // Function to render map markers
  function renderMapMarkers(deals) {
    // Clear existing markers
    markers.clearLayers();
    
    deals.forEach(deal => {
      const marker = L.marker(deal.location, { icon: customIcon })
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
  
  // Function to render list view with load animation
  function renderListView(deals) {
    const dealsContainer = document.getElementById('deals-list');
    dealsContainer.innerHTML = '';
    
    if (deals.length === 0) {
      dealsContainer.innerHTML = '<div class="no-results">No happy hour deals match your filters.</div>';
      return;
    }
    
    // Create fragment for better performance
    const fragment = document.createDocumentFragment();
    
    deals.forEach((deal, index) => {
      const dealCard = document.createElement('div');
      dealCard.className = 'deal-card';
      dealCard.style.animationDelay = `${index * 0.05}s`;
      
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
      
      fragment.appendChild(dealCard);
    });
    
    dealsContainer.appendChild(fragment);
    
    // Add animation class after a small delay
    setTimeout(() => {
      document.querySelectorAll('.deal-card').forEach(card => {
        card.classList.add('fade-in');
      });
    }, 10);
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
  
  // Add CSS for custom marker
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-map-marker {
      background: transparent;
    }
    .marker-inner {
      width: 12px;
      height: 12px;
      background: #0071e3;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .leaflet-marker-icon:hover .marker-inner {
      transform: scale(1.2);
      box-shadow: 0 0 0 6px rgba(0, 113, 227, 0.2);
    }
    .filters-changed .deals-container {
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    .deal-card {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s, transform 0.5s;
    }
    .deal-card.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});