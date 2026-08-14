# 🏠 JanSanrakshak AI - Rainwater Harvesting Assessment Tool

An intelligent React.js application for assessing rooftop rainwater harvesting potential with AI-powered analysis and personalized recommendations.

## 🌟 Features

### Core Functionality
- **5-Tab Assessment Interface**: Assessment, Recommendations, Results, Groundwater Info, About
- **Intelligent Form Validation**: Real-time validation with Formik and Yup
- **Dynamic Calculations**: AI-powered water harvesting potential analysis
- **Interactive Charts**: Plotly.js visualizations for rainfall, cost-benefit, efficiency
- **PDF Report Generation**: Comprehensive assessment reports
- **Responsive Design**: Mobile-friendly Material-UI interface

### Assessment Capabilities
- ✅ Harvestable water calculation based on roof area and local rainfall
- ✅ System efficiency analysis (runoff, collection, storage)
- ✅ Cost-benefit analysis with 10-year financial projection
- ✅ Environmental impact assessment
- ✅ Personalized system recommendations
- ✅ Groundwater recharge potential analysis
- ✅ Technical specifications and maintenance schedules

## 🛠️ Tech Stack

- **Frontend**: React 19.x + Vite
- **UI Framework**: Material-UI (MUI)
- **Charts**: Plotly.js / React-Plotly.js
- **Forms**: Formik + Yup validation
- **State Management**: React Context API
- **API Client**: Axios
- **PDF Generation**: jsPDF + html2canvas
- **Styling**: Material-UI + Custom CSS

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdmGenSameer/JanSanrakshakAI.git
   cd JanSanrakshakAI/Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API endpoints
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── charts/          # Chart components (Plotly.js)
│   ├── tabs/            # Tab content components
│   ├── UserInputForm.jsx
│   ├── MetricsCard.jsx
│   ├── TabsLayout.jsx
│   ├── SaveAssessmentButton.jsx
│   ├── FeedbackForm.jsx
│   └── GoogleEarthLink.jsx
├── context/             # React Context for state management
│   └── AppContext.jsx
├── services/            # API services
│   └── apiService.js
├── utils/               # Utility functions
│   └── calculations.js
├── App.jsx             # Main App component
├── App.css             # Custom styles
└── main.jsx            # Application entry point
```

## 🔧 Configuration

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_MAPS_API_KEY=your_api_key
VITE_APP_NAME=JanSanrakshak AI
VITE_APP_VERSION=1.0.0
```

### API Endpoints
The application expects the following backend endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/assessments` | POST | Save assessment data |
| `/api/geocode` | POST | Convert location to coordinates |
| `/api/rainfall` | GET | Monthly rainfall data |
| `/api/groundwater` | GET | Groundwater information |
| `/api/soil-type` | GET | Soil type data |
| `/api/calculate` | POST | RWH calculations |
| `/api/recommend` | POST | System recommendations |
| `/api/aquifer` | GET | Aquifer information |
| `/api/predict` | POST | ML-based predictions |
| `/api/feedback` | POST | User feedback |

## 📊 Key Calculations

### Water Harvesting Potential
```javascript
harvestableWater = roofArea × annualRainfall × runoffCoeff × collectionEff
```

### System Efficiency
```javascript
overallEfficiency = runoffCoeff × collectionEff × storageEff
```

### Financial Analysis
- Installation cost estimation based on roof area and system type
- Annual savings calculation based on local water rates
- 10-year cumulative savings projection
- Payback period analysis

### Environmental Impact
- Groundwater recharge potential (70% of harvested water)
- CO₂ reduction from reduced pumping
- Energy savings calculation

## 🎨 UI Components

### MetricsCard
Displays key assessment metrics with icons and formatting:
- Harvestable water volume
- Installation costs
- Payback periods
- System efficiency ratings

### Chart Components
1. **MonthlyRainfallChart**: Bar chart showing seasonal patterns
2. **CostBenefitChart**: Line chart for financial projections
3. **WaterBalanceChart**: Pie chart for water distribution
4. **EfficiencyGauge**: Multiple gauge charts for system efficiency
5. **WaterTrendsChart**: Historical groundwater trends

### Form Components
- **UserInputForm**: Main assessment form with validation
- **FeedbackForm**: User feedback collection with ratings
- Formik-based validation with real-time error display

## 🚀 Deployment

### Build Process
```bash
npm run build
npm run preview  # Test production build locally
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
```

## 📱 Responsive Design

- **Desktop**: Full feature set with side-by-side layouts
- **Tablet**: Stacked components with touch-friendly controls
- **Mobile**: Single-column layout with collapsible sections
- **Charts**: Automatically resize based on viewport

## 🔒 Security Considerations

- Input validation on both client and server side
- XSS protection through proper data sanitization
- CSRF protection for API calls
- Environment variable protection for sensitive keys

## 🧪 Testing

```bash
npm run test          # Run unit tests
npm run test:coverage # Generate coverage report
npm run lint          # ESLint checks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Data Sources**: India Meteorological Department (IMD), Central Ground Water Board (CGWB)
- **UI Framework**: Material-UI team for the excellent component library
- **Charts**: Plotly.js for interactive data visualization
- **Icons**: Material Design Icons

## 📞 Support

For support, email support@jansanrakshak.ai or create an issue in this repository.

## 🗺️ Roadmap

- [ ] Real-time weather data integration
- [ ] Machine learning model for system optimization
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Integration with IoT sensors
- [ ] Community sharing features

---

**JanSanrakshak AI** - Empowering water security through intelligent assessment tools.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
