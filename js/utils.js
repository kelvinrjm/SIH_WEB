/* ===================================================================
   FARM LINK — UTILITY HELPERS
   =================================================================== */

const Utils = {
    formatCurrency(amount) {
        const num = Number(amount) || 0;
        return '₹' + num.toLocaleString('en-IN');
    },

    formatDate(dateVal) {
        if (!dateVal) return '—';
        const d = new Date(dateVal);
        if (isNaN(d.getTime())) return String(dateVal);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    },

    escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    showToast(message, type = 'success') {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const translated = (typeof t === 'function' && t(message)) ? t(message) : message;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const iconSvg = type === 'success' 
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>'
            : type === 'error'
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';

        toast.innerHTML = `
            ${iconSvg}
            <span>${this.escapeHtml(translated)}</span>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3600);
    },

    formatStatus(status) {
        if (!status) return '';
        const normalized = String(status).trim().toUpperCase();
        if (typeof t === 'function') {
            return t(normalized) || t(status) || status;
        }
        return status;
    },

    getInitials(name) {
        if (!name) return 'FL';
        const parts = String(name).trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    },

    getStatusBadgeClass(status) {
        const s = String(status || '').toUpperCase();
        if (s.includes('CONFIRM') || s.includes('DELIVERED') || s.includes('AVAILABLE') || s.includes('ACCEPT')) return 'confirmed';
        if (s.includes('PENDING') || s.includes('PLACED')) return 'pending';
        if (s.includes('PREPAR') || s.includes('TRANSIT') || s.includes('DISPATCH')) return 'info';
        if (s.includes('OUT') || s.includes('ROAD') || s.includes('DELIVERY')) return 'info';
        if (s.includes('CANCEL') || s.includes('REJECT') || s.includes('SOLD_OUT')) return 'danger';
        return 'confirmed';
    },

    debounce(fn, delay = 300) {
        let timer = null;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    calculateDistance(loc1, loc2) {
        if (!loc1 || !loc2) return 50;
        const str1 = String(loc1).toLowerCase();
        const str2 = String(loc2).toLowerCase();
        if (str1 === str2) return 15;
        
        const coords = {
            'nashik': { lat: 19.9975, lng: 73.7898 },
            'thane': { lat: 19.2183, lng: 72.9781 },
            'mumbai': { lat: 19.0760, lng: 72.8777 },
            'pune': { lat: 18.5204, lng: 73.8567 },
            'jalgaon': { lat: 21.0077, lng: 75.5626 },
            'lasalgaon': { lat: 20.1472, lng: 74.2256 },
            'aurangabad': { lat: 19.8762, lng: 75.3433 },
            'nagpur': { lat: 21.1458, lng: 79.0882 }
        };

        const getCoord = (locStr) => {
            for (const key of Object.keys(coords)) {
                if (locStr.includes(key)) return coords[key];
            }
            return null;
        };

        const c1 = getCoord(str1);
        const c2 = getCoord(str2);

        if (c1 && c2) {
            const R = 6371; // Radius of the earth in km
            const dLat = (c2.lat - c1.lat) * Math.PI / 180;
            const dLng = (c2.lng - c1.lng) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
                      Math.sin(dLng/2) * Math.sin(dLng/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return Math.round(R * c);
        }

        let hash = 0;
        const combined = str1 < str2 ? str1 + str2 : str2 + str1;
        for (let i = 0; i < combined.length; i++) {
            hash = ((hash << 5) - hash) + combined.charCodeAt(i);
            hash = hash & hash;
        }
        return (Math.abs(hash) % 300) + 20;
    }
};

if (typeof window !== 'undefined') {
    window.Utils = Utils;
    window.FarmUtils = Utils;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, FarmUtils: Utils };
}
