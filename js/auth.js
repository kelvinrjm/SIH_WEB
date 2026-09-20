/* ===================================================================
   FARM LINK — AUTHENTICATION & ROLE MANAGEMENT (SIH26132)
   Supports Phone + Password Authentication & Role-Based Routing
   =================================================================== */

const AuthService = {
    getUser() {
        return StorageService.get(STORAGE_KEYS.USER, null);
    },

    getCurrentUser() {
        return this.getUser();
    },

    setUser(user) {
        StorageService.set(STORAGE_KEYS.USER, user);
    },

    saveSession(user) {
        this.setUser(user);
    },

    isLoggedIn() {
        return Boolean(this.getUser());
    },

    getRole() {
        const u = this.getUser();
        return u ? u.role : null;
    },

    cleanPhone(phone) {
        if (!phone) return '';
        return String(phone).replace(/\D/g, '').slice(-10);
    },

    /**
     * Authenticate user with Phone Number + Password
     * @param {string} phone 
     * @param {string} password 
     * @param {string} [roleHint] 
     */
    loginWithCredentials(phoneOrOfficerId, password, roleHint = null) {
        const raw = String(phoneOrOfficerId || '').trim();
        const pass = String(password || '').trim();

        if (!raw) {
            return { success: false, message: 'Please enter your Officer ID or Mobile Number' };
        }
        if (!pass) {
            return { success: false, message: 'Password is required' };
        }

        // If user typed pure digits and less than 10 digits
        if (/^\d{1,9}$/.test(raw.replace(/\s+/g, ''))) {
            return { success: false, message: 'Please enter a valid 10-digit mobile number' };
        }

        const cleaned = this.cleanPhone(raw);
        const users = StorageService.get(STORAGE_KEYS.USERS, SEED_USERS);
        const rawLower = raw.toLowerCase();
        const matched = users.find(u => 
            (cleaned && cleaned.length >= 10 && this.cleanPhone(u.phone) === cleaned) || 
            (u.officerId && u.officerId.toLowerCase() === rawLower)
        );

        if (!matched) {
            return { success: false, message: 'No account registered with this Officer ID or phone number.' };
        }

        if (matched.password !== pass) {
            return { success: false, message: 'Incorrect password. Please verify and try again.' };
        }

        // Use registered role, falling back to roleHint if not set
        const finalRole = matched.role || roleHint || 'farmer';

        const sessionUser = {
            id: matched.id,
            name: matched.name,
            phone: matched.phone.startsWith('+91') ? matched.phone : `+91 ${this.cleanPhone(matched.phone)}`,
            district: matched.district || 'Nashik',
            state: matched.state || 'Maharashtra',
            location: `${matched.district || 'Nashik'}, ${matched.state || 'Maharashtra'}`,
            role: finalRole,
            officerId: matched.officerId || null,
            assignedZone: matched.assignedZone || null,
            loginTime: Date.now()
        };

        this.setUser(sessionUser);
        return { success: true, user: sessionUser };
    },

    /**
     * Create/register a new user account in persistent store
     * @param {Object} userData 
     */
    register(userData) {
        const { name, phone, district, state, password, role } = userData;
        const cleaned = this.cleanPhone(phone);

        if (!name || !name.trim()) throw new Error('Full Name is required');
        if (!cleaned || cleaned.length < 10) throw new Error('Valid 10-digit mobile number is required');
        if (!district || !district.trim()) throw new Error('District is required');
        if (!state || !state.trim()) throw new Error('State is required');
        if (!password || password.length < 6) throw new Error('Password must be at least 6 characters');

        const users = StorageService.get(STORAGE_KEYS.USERS, []);
        const existing = users.find(u => this.cleanPhone(u.phone) === cleaned);
        if (existing) {
            throw new Error(`An account with phone number +91 ${cleaned} already exists. Please log in.`);
        }

        const newUser = {
            id: 'usr-' + Date.now(),
            name: name.trim(),
            phone: `+91 ${cleaned}`,
            district: district.trim(),
            state: state.trim(),
            password: password.trim(),
            role: role || 'farmer',
            createdAt: Date.now(),
            verified: true
        };

        users.push(newUser);
        StorageService.set(STORAGE_KEYS.USERS, users);
        return newUser;
    },

    loginAs(role = 'farmer', phone = '9876543210', name = '') {
        let user;
        if (role === 'field_officer') {
            user = {
                id: 'usr-officer-1',
                role: 'field_officer',
                name: name || 'Sanjay Deshmukh',
                phone: phone.startsWith('+91') ? phone : `+91 ${phone || '9876599999'}`,
                officerId: 'FO-MH-2026-08',
                district: 'Nashik',
                state: 'Maharashtra',
                assignedZone: 'Nashik & Dindori Division',
                location: 'Nashik, Maharashtra',
                loginTime: Date.now()
            };
        } else {
            user = {
                id: role === 'farmer' ? 'farmer-1' : 'buyer-1',
                role,
                name: name || (role === 'farmer' ? 'Ramesh Patel' : 'Priya Sharma'),
                phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
                district: role === 'farmer' ? 'Nashik' : 'Thane',
                state: 'Maharashtra',
                location: role === 'farmer' ? 'Nashik, Maharashtra' : 'Thane, Maharashtra',
                loginTime: Date.now()
            };
        }
        this.setUser(user);
        return user;
    },

    logout(redirectUrl = null) {
        StorageService.remove(STORAGE_KEYS.USER);
        const target = redirectUrl || (window.location.pathname.includes('/pages/') ? '../../index.html' : 'index.html');
        // Use replace() so the dashboard is removed from browser history,
        // preventing the Back button from returning to a logged-out dashboard.
        window.location.replace(target);
    },

    requireRole(expectedRole) {
        const user = this.getUser();
        const rootPath = window.location.pathname.includes('/pages/') ? '../../' : './';
        if (!user) {
            const loginRedirect = expectedRole === 'field_officer' ? 'pages/field-officer/login.html' : 'index.html';
            // Use replace() so unauthenticated users cannot press Back to reach the dashboard
            window.location.replace(`${rootPath}${loginRedirect}`);
            return false;
        }
        if (expectedRole && user.role !== expectedRole) {
            let redirect = 'pages/buyer/dashboard.html';
            if (user.role === 'farmer') redirect = 'pages/farmer/dashboard.html';
            else if (user.role === 'field_officer') redirect = 'pages/field-officer/dashboard.html';
            window.location.replace(`${rootPath}${redirect}`);
            return false;
        }
        return true;
    }
};

if (typeof window !== 'undefined') {
    window.AuthService = AuthService;
    window.FarmAuth = AuthService;

    // Guard against back-forward cache (bfcache): when a protected page is restored
    // from bfcache after logout, scripts don't re-run, so we re-check auth on pageshow.
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            const path = window.location.pathname;
            // Only enforce on dashboard / protected pages, not on login/registration pages
            const isProtectedPage = path.includes('/pages/') &&
                !path.endsWith('login.html') &&
                !path.endsWith('registration.html') &&
                !path.endsWith('otp-verification.html') &&
                !path.endsWith('role-selection.html') &&
                !path.endsWith('welcome.html');
            if (isProtectedPage && !AuthService.isLoggedIn()) {
                const rootPath = '../../';
                const isFO = path.includes('/field-officer/');
                window.location.replace(rootPath + (isFO ? 'pages/field-officer/login.html' : 'index.html'));
            }
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthService, FarmAuth: AuthService };
}
