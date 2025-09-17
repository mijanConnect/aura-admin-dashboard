# Dashboard Management System

A comprehensive dashboard built with Next.js 15, Shadcn UI, Redux Toolkit Query, and authentication system.

## 🚀 Features

### Core Management Modules
- **Dashboard Overview** - Real-time statistics and analytics
- **Event Management** - Create, manage, and track gaming events
- **Game Management** - Handle game listings and configurations
- **User Management** - Comprehensive user administration
- **Promo Code Management** - Create and track promotional campaigns
- **Shop Management** - E-commerce product management
- **Video Call Settings** - Conference call configurations
- **Aura+ Package** - Premium subscription management
- **Community Guidelines** - Content moderation and rules
- **Push Notifications** - User engagement and messaging
- **Settings** - System and user preferences

### Technical Features
- **Authentication System** - Secure login/logout with session management
- **State Management** - Redux Toolkit Query for efficient data handling
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Shadcn UI component library
- **Mock API Integration** - Demonstration with realistic mock data

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript
- **UI Library**: Shadcn UI
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + RTK Query
- **Authentication**: Custom auth with localStorage persistence
- **Icons**: Lucide React

## 📁 Project Structure

```
/
├── app/
│   ├── dashboard/           # Dashboard pages
│   │   ├── events/         # Event management
│   │   ├── games/          # Game management
│   │   ├── users/          # User management
│   │   ├── promo-codes/    # Promo code management
│   │   ├── shop/           # Shop management
│   │   ├── video-calls/    # Video call settings
│   │   ├── aura-package/   # Premium package management
│   │   ├── guidelines/     # Community guidelines
│   │   ├── notifications/  # Push notifications
│   │   ├── settings/       # System settings
│   │   └── layout.js       # Dashboard layout wrapper
│   ├── login/              # Authentication page
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Landing page
├── components/
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components (Header, Sidebar)
│   ├── providers/          # Redux store provider
│   └── ui/                 # Shadcn UI components
├── store/
│   ├── api/                # RTK Query API slices
│   │   ├── authApi.js      # Authentication API
│   │   ├── dashboardApi.js # Dashboard data API
│   │   ├── eventsApi.js    # Events API
│   │   ├── gamesApi.js     # Games API
│   │   ├── usersApi.js     # Users API
│   │   ├── promoApi.js     # Promo codes API
│   │   └── shopApi.js      # Shop API
│   ├── slices/             # Redux slices
│   │   ├── authSlice.js    # Authentication state
│   │   └── uiSlice.js      # UI state management
│   └── store.js            # Store configuration
└── lib/
    └── utils.ts            # Utility functions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd dashboard-project
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

### Demo Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com` 
- Password: `user123`

### Authentication Features
- Secure login/logout
- Session persistence with localStorage
- Protected routes with AuthGuard
- Automatic token validation
- Role-based access (admin/user)

## 🎨 UI Components

The dashboard uses Shadcn UI components for consistent design:

- **Navigation**: Responsive sidebar with collapsible menu
- **Cards**: Information display with hover effects
- **Forms**: Input fields with validation states
- **Tables**: Data display with sorting and filtering
- **Modals**: Overlay dialogs for actions
- **Badges**: Status indicators and labels
- **Buttons**: Various styles and states
- **Charts**: Data visualization (placeholder structure)

## 🔄 State Management

### Redux Store Structure
- **auth**: User authentication state
- **ui**: UI preferences (sidebar, theme, notifications)
- **APIs**: RTK Query endpoints for data fetching

### API Integration
All APIs use mock data for demonstration:
- Simulated network delays
- Realistic data structures  
- Error handling examples
- Loading states

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile (< 768px)**: Collapsed sidebar, touch-friendly interface
- **Tablet (768px - 1024px)**: Adaptive grid layouts
- **Desktop (> 1024px)**: Full sidebar, multi-column layouts

## 🎯 Key Features Detail

### Dashboard Overview
- Real-time statistics cards
- Recent activity feed
- Performance metrics
- Quick action buttons

### Event Management
- Event creation and editing
- Participant tracking
- Status management (active/upcoming/completed)
- Image gallery support

### User Management  
- User listing with search/filter
- Role management (admin/moderator/user)
- Account status control
- Activity tracking

### Shop Management
- Product catalog management
- Inventory tracking
- Category organization
- Sales analytics

### Notification System
- Push notification creation
- Audience targeting
- Scheduling options
- Delivery tracking

## 🔧 Customization

### Adding New Routes
1. Create page component in `app/dashboard/[route]/page.js`
2. Add route to sidebar configuration in `components/layout/Sidebar.js`
3. Create API slice if needed in `store/api/`

### Styling Customization
- Modify `tailwind.config.ts` for theme changes
- Update CSS variables in `app/globals.css`
- Customize Shadcn components in `components/ui/`

### State Management
- Add new slices in `store/slices/`
- Create API endpoints in `store/api/`
- Update store configuration in `store/store.js`

## 📊 Mock Data

The project includes comprehensive mock data for:
- User accounts and profiles
- Gaming events and tournaments
- Product catalog
- Notification history
- Analytics and statistics
- System settings

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` for environment-specific configurations:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_NAME=Dashboard Management System
```

## 🔮 Future Enhancements

- Real API integration
- Advanced analytics dashboard
- Multi-language support
- Dark/light theme toggle
- Export functionality
- Advanced user permissions
- Real-time notifications with WebSocket
- Data visualization charts
- Advanced filtering and search
- Bulk operations support

## 📞 Support

For questions or support:
1. Check the documentation
2. Review the code comments
3. Test with provided demo data
4. Examine the Redux DevTools for state management

## 📝 License

This project is for demonstration purposes. Customize according to your needs.

---

**Built with ❤️ using Next.js 15, Shadcn UI, and Redux Toolkit Query**