import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Home, User, Mail, Package, Star } from 'lucide-react';

// Types
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type Theme = 'theme1' | 'theme2' | 'theme3';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    return savedTheme || 'theme1';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen transition-all duration-500 ease-in-out ${getThemeClasses(theme)}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Theme Classes
const getThemeClasses = (theme: Theme): string => {
  switch (theme) {
    case 'theme1':
      return 'bg-white text-gray-900 font-sans';
    case 'theme2':
      return 'bg-gray-900 text-white font-serif';
    case 'theme3':
      return 'bg-gradient-to-br from-pink-100 to-purple-100 text-purple-900';
    default:
      return 'bg-white text-gray-900 font-sans';
  }
};

// Header Component
const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const getHeaderClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'bg-white border-b border-gray-200 shadow-sm';
      case 'theme2':
        return 'bg-gray-800 border-b border-gray-700';
      case 'theme3':
        return 'bg-gradient-to-r from-pink-400 to-purple-500 border-b-4 border-yellow-300';
      default:
        return 'bg-white border-b border-gray-200';
    }
  };

  const getLogoClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'text-2xl font-light text-gray-800';
      case 'theme2':
        return 'text-3xl font-bold text-white font-serif';
      case 'theme3':
        return 'text-3xl font-bold text-white tracking-wide';
      default:
        return 'text-2xl font-light text-gray-800';
    }
  };

  const getNavClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors';
      case 'theme2':
        return 'text-gray-300 hover:text-white px-4 py-2 text-lg font-semibold transition-colors';
      case 'theme3':
        return 'text-white hover:text-yellow-200 px-3 py-2 text-lg font-bold transition-colors';
      default:
        return 'text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium';
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getHeaderClasses()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className={getLogoClasses()}>
            <Package className="inline-block mr-2" size={theme === 'theme3' ? 32 : 24} />
            ThemeStore
          </div>
          
          <nav className="hidden md:flex space-x-1">
            <Link to="/" className={`${getNavClasses()} ${location.pathname === '/' ? 'font-bold' : ''}`}>
              <Home className="inline-block mr-1" size={16} />
              Home
            </Link>
            <Link to="/about" className={`${getNavClasses()} ${location.pathname === '/about' ? 'font-bold' : ''}`}>
              <User className="inline-block mr-1" size={16} />
              About
            </Link>
            <Link to="/contact" className={`${getNavClasses()} ${location.pathname === '/contact' ? 'font-bold' : ''}`}>
              <Mail className="inline-block mr-1" size={16} />
              Contact
            </Link>
          </nav>

          <Select value={theme} onValueChange={(value: Theme) => setTheme(value)}>
            <SelectTrigger className={`w-32 ${theme === 'theme2' ? 'bg-gray-700 border-gray-600 text-white' : ''} ${theme === 'theme3' ? 'bg-white/20 border-white/30 text-white placeholder:text-white/70' : ''}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="theme1">Theme 1</SelectItem>
              <SelectItem value="theme2">Theme 2</SelectItem>
              <SelectItem value="theme3">Theme 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};

// Layout Components
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  
  if (theme === 'theme2') {
    return (
      <div className="flex min-h-screen pt-16">
        <aside className="w-64 bg-gray-800 border-r border-gray-700 p-6">
          <SidebarContent />
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    );
  }
  
  return (
    <div className="pt-16">
      <main className={theme === 'theme1' ? 'max-w-4xl mx-auto p-8' : 'p-8'}>
        {children}
      </main>
    </div>
  );
};

const SidebarContent: React.FC = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
    <div className="space-y-2">
      <Link to="/" className="block text-gray-300 hover:text-white py-2 px-3 rounded transition-colors">
        <Home className="inline-block mr-2" size={16} />
        Home
      </Link>
      <Link to="/about" className="block text-gray-300 hover:text-white py-2 px-3 rounded transition-colors">
        <User className="inline-block mr-2" size={16} />
        About
      </Link>
      <Link to="/contact" className="block text-gray-300 hover:text-white py-2 px-3 rounded transition-colors">
        <Mail className="inline-block mr-2" size={16} />
        Contact
      </Link>
    </div>
  </div>
);

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { theme } = useTheme();
  
  const getCardClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'hover:shadow-lg transition-shadow duration-300';
      case 'theme2':
        return 'bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300';
      case 'theme3':
        return 'bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl';
      default:
        return '';
    }
  };

  return (
    <Card className={getCardClasses()}>
      <CardHeader className={theme === 'theme3' ? 'pb-2' : ''}>
        <div className="aspect-square w-full mb-4 overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <CardTitle className={`${theme === 'theme1' ? 'text-lg' : theme === 'theme2' ? 'text-xl font-bold' : 'text-xl font-extrabold text-purple-800'} line-clamp-2`}>
          {product.title}
        </CardTitle>
        <CardDescription className={theme === 'theme3' ? 'text-purple-600 font-medium' : ''}>
          <Badge variant={theme === 'theme3' ? 'secondary' : 'outline'} className={theme === 'theme3' ? 'bg-yellow-200 text-purple-800 font-bold' : ''}>
            {product.category}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className={`${theme === 'theme1' ? 'text-2xl font-semibold' : theme === 'theme2' ? 'text-3xl font-bold' : 'text-3xl font-black text-purple-800'} text-green-600`}>
            ${product.price}
          </span>
          <div className="flex items-center">
            <Star className={`${theme === 'theme3' ? 'text-yellow-500' : 'text-yellow-400'} fill-current`} size={16} />
            <span className={`ml-1 ${theme === 'theme3' ? 'font-bold text-purple-700' : ''}`}>
              {product.rating.rate}
            </span>
          </div>
        </div>
        <p className={`${theme === 'theme1' ? 'text-sm' : theme === 'theme2' ? 'text-base' : 'text-base font-medium'} text-gray-600 ${theme === 'theme2' ? 'text-gray-400' : ''} ${theme === 'theme3' ? 'text-purple-700' : ''} line-clamp-3 mb-4`}>
          {product.description}
        </p>
        <Button 
          className={`w-full ${
            theme === 'theme1' ? 'bg-blue-600 hover:bg-blue-700' : 
            theme === 'theme2' ? 'bg-white text-gray-900 hover:bg-gray-100 font-bold' : 
            'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
          }`}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

// Loading Skeleton
const ProductSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <Skeleton className="aspect-square w-full mb-4" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-1/3 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

// Custom Hook for API
const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

// Page Components
const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const { products, loading, error } = useProducts();

  const getGridClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'theme2':
        return 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8';
      case 'theme3':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const getTitleClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'text-3xl font-light text-gray-800 mb-2';
      case 'theme2':
        return 'text-4xl font-bold text-white mb-4';
      case 'theme3':
        return 'text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 text-center';
      default:
        return 'text-3xl font-light text-gray-800 mb-2';
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <p className="text-red-500 text-lg">Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={theme === 'theme3' ? 'text-center mb-8' : 'mb-8'}>
        <h1 className={getTitleClasses()}>
          Welcome to ThemeStore
        </h1>
        <p className={`${theme === 'theme1' ? 'text-lg text-gray-600' : theme === 'theme2' ? 'text-xl text-gray-400' : 'text-xl font-bold text-purple-700 text-center'}`}>
          Discover amazing products with our dynamic theme system
        </p>
      </div>

      <div className={getGridClasses()}>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  const { theme } = useTheme();

  const getTitleClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'text-3xl font-light text-gray-800 mb-6';
      case 'theme2':
        return 'text-4xl font-bold text-white mb-8';
      case 'theme3':
        return 'text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 text-center';
      default:
        return 'text-3xl font-light text-gray-800 mb-6';
    }
  };

  const getContentClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'text-gray-600 leading-relaxed space-y-4';
      case 'theme2':
        return 'text-gray-300 text-lg leading-relaxed space-y-6';
      case 'theme3':
        return 'text-purple-700 text-lg font-medium leading-relaxed space-y-6 text-center';
      default:
        return 'text-gray-600 leading-relaxed space-y-4';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={getTitleClasses()}>About ThemeStore</h1>
      <div className={getContentClasses()}>
        <p>
          ThemeStore is a revolutionary e-commerce platform that demonstrates the power of 
          dynamic theming in modern web applications. Our platform showcases how different 
          visual themes can completely transform the user experience while maintaining 
          functionality and accessibility.
        </p>
        <p>
          Built with cutting-edge technologies including React, TypeScript, and Tailwind CSS, 
          ThemeStore features three distinct themes that not only change colors but also 
          alter layouts, typography, spacing, and overall visual hierarchy.
        </p>
        <p>
          {theme === 'theme1' && 'Currently viewing: Minimalist Theme - Clean, simple, and focused on content with light backgrounds and sans-serif typography.'}
          {theme === 'theme2' && 'Currently viewing: Professional Theme - Dark mode with sidebar layout, bold serif fonts, and enhanced readability.'}
          {theme === 'theme3' && 'Currently viewing: Playful Theme - Colorful card-based grid layout with vibrant gradients and bold typography.'}
        </p>
      </div>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const { theme } = useTheme();

  const getTitleClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'text-3xl font-light text-gray-800 mb-6';
      case 'theme2':
        return 'text-4xl font-bold text-white mb-8';
      case 'theme3':
        return 'text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 text-center';
      default:
        return 'text-3xl font-light text-gray-800 mb-6';
    }
  };

  const getCardClasses = () => {
    switch (theme) {
      case 'theme1':
        return 'max-w-2xl mx-auto';
      case 'theme2':
        return 'bg-gray-800 border-gray-700 max-w-2xl mx-auto';
      case 'theme3':
        return 'bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl max-w-2xl mx-auto';
      default:
        return 'max-w-2xl mx-auto';
    }
  };

  return (
    <div>
      <h1 className={getTitleClasses()}>Contact Us</h1>
      <Card className={getCardClasses()}>
        <CardHeader>
          <CardTitle className={theme === 'theme3' ? 'text-purple-800 text-2xl font-bold' : ''}>
            Get in Touch
          </CardTitle>
          <CardDescription className={theme === 'theme3' ? 'text-purple-600 font-medium' : ''}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg ${theme === 'theme1' ? 'bg-gray-50' : theme === 'theme2' ? 'bg-gray-900' : 'bg-purple-50'}`}>
            <h3 className={`font-semibold mb-2 ${theme === 'theme3' ? 'text-purple-800' : ''}`}>
              Hipster Pte. Ltd.
            </h3>
            <p className={`text-sm ${theme === 'theme2' ? 'text-gray-400' : ''} ${theme === 'theme3' ? 'text-purple-700' : 'text-gray-600'}`}>
              #01-04, 75 Ayer Rajah Crescent<br />
              139953, Singapore<br />
              UEN: 201621408D
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${theme === 'theme1' ? 'bg-gray-50' : theme === 'theme2' ? 'bg-gray-900' : 'bg-purple-50'}`}>
              <h4 className={`font-medium mb-1 ${theme === 'theme3' ? 'text-purple-800' : ''}`}>Phone</h4>
              <p className={`text-sm ${theme === 'theme2' ? 'text-gray-400' : ''} ${theme === 'theme3' ? 'text-purple-700' : 'text-gray-600'}`}>
                +65 8231 4107
              </p>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'theme1' ? 'bg-gray-50' : theme === 'theme2' ? 'bg-gray-900' : 'bg-purple-50'}`}>
              <h4 className={`font-medium mb-1 ${theme === 'theme3' ? 'text-purple-800' : ''}`}>Email</h4>
              <p className={`text-sm ${theme === 'theme2' ? 'text-gray-400' : ''} ${theme === 'theme3' ? 'text-purple-700' : 'text-gray-600'}`}>
                hr@hipster-inc.com
              </p>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${theme === 'theme1' ? 'bg-gray-50' : theme === 'theme2' ? 'bg-gray-900' : 'bg-purple-50'}`}>
            <h4 className={`font-medium mb-1 ${theme === 'theme3' ? 'text-purple-800' : ''}`}>Website</h4>
            <p className={`text-sm ${theme === 'theme2' ? 'text-gray-400' : ''} ${theme === 'theme3' ? 'text-purple-700' : 'text-gray-600'}`}>
              www.hipster-inc.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen">
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;