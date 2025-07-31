import React, { useState } from 'react';
import { Search, Menu, X, Mail, Calendar, User, Tag, Heart, Share2, Clock, Eye } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');

  const categories = [
    { id: 'all', name: 'Tous', color: 'bg-slate-100' },
    { id: 'meditation', name: 'Méditation', color: 'bg-green-100' },
    { id: 'sommeil', name: 'Sommeil', color: 'bg-purple-100' },
    { id: 'nutrition', name: 'Nutrition', color: 'bg-orange-100' },
    { id: 'developpement', name: 'Développement personnel', color: 'bg-blue-100' }
  ];

  const articles = [
    {
      id: 1,
      title: "5 Rituels Matinaux pour Remote Workers Zen",
      excerpt: "Transformez vos matinées pour booster votre productivité et votre bien-être en télétravail. Des habitudes simples mais puissantes.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwd2VsbG5lc3N8ZW58MHx8fHRlYWx8MTc1Mzk2ODYxMXww&ixlib=rb-4.1.0&q=85",
      author: "Marie Dubois",
      date: "2025-01-15",
      category: 'developpement',
      readTime: "8 min",
      views: "2.4k",
      featured: true
    },
    {
      id: 2,
      title: "L'Art de Déconnecter : Créer des Frontières Saines",
      excerpt: "Comment séparer vie pro et perso quand on travaille de chez soi. Techniques éprouvées pour préserver votre équilibre mental.",
      image: "https://images.unsplash.com/photo-1557831588-d7331b4f4e41?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxyZW1vdGUlMjB3b3JrJTIwd2VsbG5lc3N8ZW58MHx8fHRlYWx8MTc1Mzk2ODYxMXww&ixlib=rb-4.1.0&q=85",
      author: "Thomas Laurent",
      date: "2025-01-12",
      category: 'developpement',
      readTime: "6 min",
      views: "1.8k",
      featured: true
    },
    {
      id: 3,
      title: "Méditation au Bureau : 10 Minutes pour Transformer votre Journée",
      excerpt: "Des techniques de méditation express adaptées au télétravail. Réduisez le stress et augmentez votre concentration.",
      image: "https://images.unsplash.com/photo-1658501819393-8151a85a1cf2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9ufGVufDB8fHx0ZWFsfDE3NTM5Njg2MjJ8MA&ixlib=rb-4.1.0&q=85",
      author: "Sophie Chen",
      date: "2025-01-10",
      category: 'meditation',
      readTime: "5 min",
      views: "3.1k",
      featured: true
    },
    {
      id: 4,
      title: "Nutrition Intuitive pour une Productivité Optimale",
      excerpt: "Découvrez comment adapter votre alimentation pour maintenir un niveau d'énergie stable tout au long de la journée.",
      image: "https://images.pexels.com/photos/7592499/pexels-photo-7592499.jpeg",
      author: "Dr. Julie Martin",
      date: "2025-01-08",
      category: 'nutrition',
      readTime: "12 min",
      views: "1.5k",
      featured: false
    },
    {
      id: 5,
      title: "Sommeil Réparateur : Guide du Télétravailleur",
      excerpt: "Optimisez votre sommeil pour des journées plus productives. Routine, environnement et techniques de relaxation.",
      image: "https://images.unsplash.com/photo-1597739112263-37f1b096ed33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxtZWRpdGF0aW9ufGVufDB8fHx0ZWFsfDE3NTM5Njg2MjJ8MA&ixlib=rb-4.1.0&q=85",
      author: "Alexandre Moreau",
      date: "2025-01-05",
      category: 'sommeil',
      readTime: "9 min",
      views: "2.2k",
      featured: false
    },
    {
      id: 6,
      title: "Cultiver la Résilience à Distance",
      excerpt: "Développez votre capacité d'adaptation face aux défis du télétravail. Mindset et stratégies pratiques.",
      image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg",
      author: "Camille Rousseau",
      date: "2025-01-03",
      category: 'developpement',
      readTime: "7 min",
      views: "1.9k",
      featured: false
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);
  const recentArticles = articles.slice(0, 3);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with Mailchimp
    alert(`Merci ${email} ! Nous vous tiendrons informé de nos derniers articles wellness.`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                ZenVie
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Accueil</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Catégories</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">À propos</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Contact</a>
            </nav>

            {/* Search & Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Accueil</a>
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Catégories</a>
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">À propos</a>
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Contact</a>
                <div className="pt-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Rechercher..." className="pl-10 bg-gray-50" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-purple-400/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Wellness pour
            <span className="block bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
              Remote Workers
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment cultiver votre bien-être, booster votre productivité et créer un équilibre parfait 
            entre vie professionnelle et personnelle en télétravail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-3">
              Découvrir nos articles
            </Button>
            <Button size="lg" variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-3">
              S'abonner à la newsletter
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Articles en vedette</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Sélection de la semaine
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <Card key={article.id} className={`group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden bg-white/70 backdrop-blur-sm ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${index === 0 ? 'h-64 lg:h-80' : 'h-48'}`}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={categories.find(c => c.id === article.category)?.color}>
                      {categories.find(c => c.id === article.category)?.name}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className={`group-hover:text-green-600 transition-colors ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between text-sm text-gray-500 pt-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Filter */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Explorer par catégorie</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
                    : 'hover:bg-green-50 border-green-200'
                }`}
              >
                <Tag className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white/70 backdrop-blur-sm">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={categories.find(c => c.id === article.category)?.color}>
                      {categories.find(c => c.id === article.category)?.name}
                    </Badge>
                  </div>
                  {article.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-100 text-yellow-700">
                        ⭐ Vedette
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col space-y-3 pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 w-full">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="p-1 hover:bg-green-50">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-1 hover:bg-green-50">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-0 overflow-hidden">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Restez connecté à votre bien-être
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Recevez nos meilleurs conseils wellness directement dans votre boîte mail, chaque semaine.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="votre.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white border-gray-200 focus:border-green-400"
                    required
                  />
                </div>
                <Button type="submit" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                  S'abonner
                </Button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                Aucun spam. Désabonnement possible à tout moment.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Affiliate Section */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-gray-900">
                Recommandation : Systeme.io
              </CardTitle>
              <CardDescription className="text-gray-600">
                La plateforme tout-en-un pour créer et développer votre business en ligne
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-gray-700">
                Créez des tunnels de vente, gérez vos emails marketing et automatisez votre business 
                avec l'outil préféré des entrepreneurs français.
              </p>
              <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                <a href="https://systeme.io/fr?sa=sa0243290695bd54e71191d409c754097d409003a9" target="_blank" rel="noopener noreferrer">
                  Découvrir Systeme.io
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Z</span>
                </div>
                <span className="text-2xl font-bold">ZenVie</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Votre guide pour un télétravail épanoui. Méditation, nutrition, sommeil et développement personnel 
                pour les remote workers modernes.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Catégories</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Méditation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sommeil</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nutrition</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Développement personnel</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ZenVie. Tous droits réservés. Cultivons ensemble votre bien-être au travail.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;