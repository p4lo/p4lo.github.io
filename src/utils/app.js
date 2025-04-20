// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Create desktop stats panel
  createDesktopStatsPanel();
  
  // Initialize map with modern styling - simplified for mobile
  const map = L.map('map', {
    zoomControl: true, // Use default zoom controls for better mobile touch support
    minZoom: 10,  // Don't let users zoom out too far
    maxZoom: 18,  // Limit maximum zoom to maintain performance
    maxBoundsViscosity: 1.0  // Keep map within NYC area bounds
  }).setView([40.7500, -73.9700], 11);
  
  // Save map instance to DOM for external script access
  document.querySelector('#map').__leaflet_instance__ = map;
  
  // Add tile layer with high contrast styling for better mobile visibility
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    detectRetina: true  // Support high-DPI displays like iPhone
  }).addTo(map);
  
  // Custom Apple-style marker icon with refined touch target for mobile
  const customIcon = L.divIcon({
    className: 'custom-map-marker',
    html: '<div class="marker-inner"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10] // Position popup slightly above marker
  });

  // Markers group
  const markers = L.layerGroup().addTo(map);
  
  // Create permanent stats panel for desktop
  function createDesktopStatsPanel() {
    if (window.innerWidth >= 769) {
      // Set initial map-active class on body if map view is active
      const isMapActive = document.querySelector('#map-view.active') !== null;
      if (isMapActive) {
        document.body.classList.add('map-active');
      }
      
      const statsPanel = document.createElement('div');
      statsPanel.className = 'stats-panel';
      statsPanel.id = 'desktop-stats-panel';
      
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
      
      // Make panel collapsible for desktop
      const header = statsPanel.querySelector('.stats-panel-header');
      header.addEventListener('click', () => {
        statsPanel.classList.toggle('collapsed');
      });
    }
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
          
          // Show stats panel only in map view (via a class on body)
          document.body.classList.add('map-active');
        }, 100);
      } else {
        // Hide stats panel in list view
        document.body.classList.remove('map-active');
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
    // Only update if we're on desktop
    if (window.innerWidth < 769) return;
    
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
    
    // Update stats elements if they exist
    const statsNeighborhood = document.getElementById('stats-neighborhood');
    if (statsNeighborhood) {
      statsNeighborhood.textContent = neighborhoodDisplay;
      document.getElementById('stats-day').textContent = dayDisplay;
      document.getElementById('stats-count').textContent = deals.length;
      
      // Price estimate based on number of deals
      const priceLevel = deals.length > 50 ? '$ - $$' : deals.length > 20 ? '$$ - $$$' : '$$$';
      document.getElementById('stats-price').textContent = priceLevel;
    }
  }
  
  // Function to render map markers with Apple-style
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
      try {
        const bounds = L.featureGroup(markers.getLayers()).getBounds();
        map.fitBounds(bounds, { padding: [50, 50] });
      } catch (e) {
        console.error('Error fitting bounds:', e);
        // Fallback to default view
        map.setView([40.7500, -73.9700], 11);
      }
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
    
    // Log for debugging
    console.log(`Rendering ${deals.length} deals in list view`);
    
    // Create fragment for better performance
    const fragment = document.createDocumentFragment();
    
    deals.forEach((deal, index) => {
      const dealCard = document.createElement('div');
      dealCard.className = 'deal-card';
      dealCard.style.animationDelay = `${index * 0.05}s`;
      
      dealCard.innerHTML = `
        <div class="deal-info">
          <h3 class="deal-name">${deal.name}</h3>
          <p class="deal-location">${deal.subNeighborhood || deal.neighborhood}</p>
          <p class="deal-address">${deal.address}</p>
          <p class="deal-time">${deal.hours} • ${formatDays(deal.days)}</p>
          <p class="deal-description">${deal.description || ''}</p>
          <p class="deal-deals"><strong>Deals:</strong> ${deal.deals}</p>
          ${deal.website ? `<p class="deal-website"><a href="${deal.website}" target="_blank">Visit Website</a></p>` : ''}
        </div>
      `;
      
      fragment.appendChild(dealCard);
    });
    
    dealsContainer.appendChild(fragment);
    
    // Force reflow to ensure cards are added to DOM before animation
    window.getComputedStyle(dealsContainer).opacity;
    
    // Add animation class immediately after reflow
    document.querySelectorAll('.deal-card').forEach(card => {
      card.classList.add('fade-in');
    });
    
    // Fix for mobile: ensure the container has proper height
    if (window.innerWidth <= 768) {
      // Reset map-active class when in list view
      if (document.querySelector('#list-view.active')) {
        document.body.classList.remove('map-active');
      }
    }
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
  
  // Add CSS for custom marker and mobile optimizations
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-map-marker {
      background: transparent;
      border: none;
      contain: layout paint style;
    }
    .marker-inner {
      width: 14px; /* Smaller, more subtle size */
      height: 14px;
      background: #0071e3;
      border-radius: 50%;
      box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
      transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
      will-change: transform, box-shadow;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .leaflet-marker-icon:hover .marker-inner {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
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
    
    /* iOS Specific Enhancements */
    @supports (-webkit-touch-callout: none) {
      /* Smoother scrolling on iOS */
      body {
        -webkit-overflow-scrolling: touch;
      }
      
      /* Fix for iOS tap highlight color */
      a, button, select, .deal-card, .stats-panel-header {
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Make dropdowns work better on iOS */
      select {
        background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='6'><path d='M0 0h12L6 6z' fill='%231d1d1f'/></svg>");
        background-repeat: no-repeat;
        background-position: right 8px center;
        padding-right: 24px !important;
      }
      
      /* Better touch scrolling for panels */
      .stats-panel-content {
        -webkit-overflow-scrolling: touch;
      }
    }
    
    /* Remove hover effects on touch devices */
    @media (hover: none) {
      .deal-website a:hover, .popup-link:hover, .website-link:hover {
        background-color: rgba(0, 113, 227, 0.1);
        color: #0071e3;
      }
      
      .leaflet-marker-icon:hover .marker-inner {
        transform: translate(-50%, -50%);
        box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
      }
      
      .leaflet-marker-icon:active .marker-inner {
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
        transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
      }
      
      .deal-card:hover {
        transform: none;
        box-shadow: none;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Window resize handler to handle orientation changes
  window.addEventListener('resize', function() {
    if (document.querySelector('#map-view.active')) {
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }
  });
});