from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import os
import uuid

app = FastAPI(title="ZenVie Blog API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Article(BaseModel):
    id: str = None
    title: str
    excerpt: str
    content: str = ""
    image: str
    author: str
    date: str
    category: str
    read_time: str = "5 min"
    views: int = 0
    featured: bool = False
    tags: List[str] = []

class NewsletterSubscription(BaseModel):
    email: EmailStr
    subscribed_at: str = None

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    sent_at: str = None

# In-memory storage (replace with MongoDB in production)
articles_db = [
    {
        "id": str(uuid.uuid4()),
        "title": "5 Rituels Matinaux pour Remote Workers Zen",
        "excerpt": "Transformez vos matinées pour booster votre productivité et votre bien-être en télétravail. Des habitudes simples mais puissantes.",
        "content": """
        # 5 Rituels Matinaux pour Remote Workers Zen

        Le télétravail peut bouleverser nos routines matinales. Voici 5 rituels simples pour commencer vos journées avec sérénité et efficacité.

        ## 1. La méditation de 5 minutes
        Avant même de consulter vos emails, accordez-vous 5 minutes de méditation. Cette pratique vous ancre dans le moment présent et prépare votre esprit à une journée productive.

        ## 2. Hydratation consciente
        Buvez un grand verre d'eau citronnée dès le réveil. Cette habitude simple réveille votre métabolisme et vous aide à rester hydraté tout au long de la journée.

        ## 3. Mouvement doux
        Quelques étirements ou poses de yoga permettent de réveiller votre corps en douceur. Pas besoin de séance intensive, 10 minutes suffisent.

        ## 4. Intention du jour
        Prenez 2 minutes pour définir votre intention principale pour la journée. Qu'est-ce qui vous rendrait fier ce soir ?

        ## 5. Petit-déjeuner mindful
        Savourez votre petit-déjeuner sans distraction. Goûtez chaque bouchée, sentez les arômes. Cette pratique améliore votre relation à la nourriture.

        Ces rituels créent une transition douce entre le sommeil et le travail, établissant des bases solides pour une journée épanouie.
        """,
        "image": "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwd2VsbG5lc3N8ZW58MHx8fHRlYWx8MTc1Mzk2ODYxMXww&ixlib=rb-4.1.0&q=85",
        "author": "Marie Dubois",
        "date": "2025-01-15",
        "category": "developpement",
        "read_time": "8 min",
        "views": 2400,
        "featured": True,
        "tags": ["routine", "méditation", "productivité", "bien-être"]
    },
    {
        "id": str(uuid.uuid4()),
        "title": "L'Art de Déconnecter : Créer des Frontières Saines",
        "excerpt": "Comment séparer vie pro et perso quand on travaille de chez soi. Techniques éprouvées pour préserver votre équilibre mental.",
        "content": """
        # L'Art de Déconnecter : Créer des Frontières Saines

        Le télétravail efface les frontières traditionnelles entre vie professionnelle et personnelle. Voici comment recréer un équilibre sain.

        ## Le défi des frontières floues
        Travailler de chez soi peut créer une sensation de "toujours être au bureau". Cette situation génère stress et épuisement.

        ## Techniques pour déconnecter

        ### 1. Rituel de fin de journée
        Créez un rituel qui marque clairement la fin de votre journée de travail : fermer l'ordinateur, ranger le bureau, changer de tenue.

        ### 2. Espace dédié
        Si possible, créez un espace de travail distinct. Sinon, utilisez des éléments visuels (paravent, plante) pour délimiter l'espace.

        ### 3. Horaires fixes
        Respectez des horaires de travail fixes et communiquez-les à votre entourage et vos collègues.

        ### 4. Mode "ne pas déranger"
        Désactivez les notifications professionnelles après vos heures de travail.

        ## L'importance du "off"
        Votre cerveau a besoin de temps pour se régénérer. Les moments de déconnexion ne sont pas du temps perdu, mais un investissement dans votre efficacité future.

        En appliquant ces principes, vous retrouverez un équilibre serein entre vos différentes sphères de vie.
        """,
        "image": "https://images.unsplash.com/photo-1557831588-d7331b4f4e41?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxyZW1vdGUlMjB3b3JrJTIwd2VsbG5lc3N8ZW58MHx8fHRlYWx8MTc1Mzk2ODYxMXww&ixlib=rb-4.1.0&q=85",
        "author": "Thomas Laurent",
        "date": "2025-01-12",
        "category": "developpement",
        "read_time": "6 min",
        "views": 1800,
        "featured": True,
        "tags": ["équilibre", "frontières", "déconnexion", "télétravail"]
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Méditation au Bureau : 10 Minutes pour Transformer votre Journée",
        "excerpt": "Des techniques de méditation express adaptées au télétravail. Réduisez le stress et augmentez votre concentration.",
        "content": """
        # Méditation au Bureau : 10 Minutes pour Transformer votre Journée

        La méditation n'est pas réservée aux studios de yoga. Découvrez comment intégrer cette pratique transformatrice dans votre quotidien professionnel.

        ## Pourquoi méditer au travail ?
        - Réduction du stress et de l'anxiété
        - Amélioration de la concentration
        - Meilleure gestion des émotions
        - Créativité renforcée

        ## Techniques express (2-5 minutes)

        ### La respiration 4-7-8
        1. Inspirez pendant 4 secondes
        2. Retenez votre souffle pendant 7 secondes
        3. Expirez pendant 8 secondes
        4. Répétez 4 fois

        ### Le scan corporel rapide
        Parcourez mentalement votre corps de la tête aux pieds, relâchant chaque tension identifiée.

        ### La méditation des sons
        Fermez les yeux et concentrez-vous sur tous les sons autour de vous, sans jugement.

        ## Sessions plus longues (10 minutes)

        ### Méditation de la bienveillance
        Envoyez des pensées positives à vous-même, puis à vos collègues, clients, et enfin au monde entier.

        ### Visualisation du succès
        Imaginez votre journée se déroulant parfaitement, chaque tâche accomplie avec aisance.

        ## Intégration dans votre routine
        - Méditation matinale avant de commencer le travail
        - Pause méditative avant les réunions importantes
        - Méditation de transition entre projets
        - Session de décompression en fin de journée

        Commencez par 2 minutes par jour et augmentez progressivement. La régularité prime sur la durée.
        """,
        "image": "https://images.unsplash.com/photo-1658501819393-8151a85a1cf2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9ufGVufDB8fHx0ZWFsfDE3NTM5Njg2MjJ8MA&ixlib=rb-4.1.0&q=85",
        "author": "Sophie Chen",
        "date": "2025-01-10",
        "category": "meditation",
        "read_time": "5 min",
        "views": 3100,
        "featured": True,
        "tags": ["méditation", "concentration", "stress", "techniques"]
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Nutrition Intuitive pour une Productivité Optimale",
        "excerpt": "Découvrez comment adapter votre alimentation pour maintenir un niveau d'énergie stable tout au long de la journée.",
        "content": """
        # Nutrition Intuitive pour une Productivité Optimale

        Votre alimentation influence directement votre énergie et votre concentration. Apprenez à nourrir votre corps pour optimiser vos performances.

        ## Les principes de la nutrition intuitive

        ### Écoutez votre corps
        Reconnectez-vous à vos signaux de faim et de satiété. Mangez quand vous avez faim, arrêtez-vous quand vous êtes rassasié.

        ### Qualité avant quantité
        Privilégiez des aliments non transformés, riches en nutriments essentiels.

        ## Aliments pour l'énergie stable

        ### Protéines de qualité
        - Œufs, poisson, légumineuses
        - Maintiennent la satiété et stabilisent la glycémie

        ### Glucides complexes
        - Avoine, quinoa, patate douce
        - Libèrent l'énergie progressivement

        ### Graisses saines
        - Avocat, noix, huile d'olive
        - Essentielles pour le cerveau et l'absorption des vitamines

        ## Planning alimentaire pour remote workers

        ### Petit-déjeuner énergisant
        - Porridge aux fruits et noix
        - Smoothie vert avec épinards et banane
        - Œufs brouillés aux légumes

        ### Snacks intelligents
        - Fruits à coque et fruits frais
        - Légumes crus et houmous
        - Yaourt grec et baies

        ### Déjeuner équilibré
        - Salade complète avec protéines
        - Bowl de légumes et céréales
        - Soupe et pain complet

        ## Hydratation optimale
        - 2L d'eau par jour minimum
        - Tisanes et thés verts
        - Limitez le café à 2 tasses maximum

        ## Gestion des fringales
        Les envies de sucre indiquent souvent une fatigue ou un stress. Essayez plutôt une courte marche ou quelques respirations profondes.

        En adoptant ces principes, vous maintiendrez un niveau d'énergie constant et améliorerez votre bien-être général.
        """,
        "image": "https://images.pexels.com/photos/7592499/pexels-photo-7592499.jpeg",
        "author": "Dr. Julie Martin",
        "date": "2025-01-08",
        "category": "nutrition",
        "read_time": "12 min",
        "views": 1500,
        "featured": False,
        "tags": ["nutrition", "énergie", "alimentation", "productivité"]
    }
]

newsletter_subscribers = []
contact_messages = []

# API Routes

@app.get("/api/")
async def root():
    return {"message": "ZenVie Blog API is running", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Articles endpoints
@app.get("/api/articles", response_model=List[Article])
async def get_articles(category: Optional[str] = None, featured: Optional[bool] = None, limit: Optional[int] = None):
    """Get all articles with optional filters"""
    filtered_articles = articles_db.copy()
    
    if category and category != 'all':
        filtered_articles = [a for a in filtered_articles if a['category'] == category]
    
    if featured is not None:
        filtered_articles = [a for a in filtered_articles if a['featured'] == featured]
    
    # Sort by date (newest first)
    filtered_articles.sort(key=lambda x: x['date'], reverse=True)
    
    if limit:
        filtered_articles = filtered_articles[:limit]
    
    return filtered_articles

@app.get("/api/articles/{article_id}", response_model=Article)
async def get_article(article_id: str):
    """Get a specific article by ID"""
    article = next((a for a in articles_db if a['id'] == article_id), None)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Increment views
    article['views'] += 1
    
    return article

@app.get("/api/articles/search/{query}")
async def search_articles(query: str):
    """Search articles by title, excerpt, or content"""
    query_lower = query.lower()
    results = []
    
    for article in articles_db:
        if (query_lower in article['title'].lower() or 
            query_lower in article['excerpt'].lower() or
            query_lower in article.get('content', '').lower() or
            any(query_lower in tag.lower() for tag in article.get('tags', []))):
            results.append(article)
    
    return results

@app.get("/api/categories")
async def get_categories():
    """Get all available categories"""
    categories = [
        {"id": "all", "name": "Tous", "count": len(articles_db)},
        {"id": "meditation", "name": "Méditation", "count": len([a for a in articles_db if a['category'] == 'meditation'])},
        {"id": "sommeil", "name": "Sommeil", "count": len([a for a in articles_db if a['category'] == 'sommeil'])},
        {"id": "nutrition", "name": "Nutrition", "count": len([a for a in articles_db if a['category'] == 'nutrition'])},
        {"id": "developpement", "name": "Développement personnel", "count": len([a for a in articles_db if a['category'] == 'developpement'])}
    ]
    return categories

# Newsletter endpoints
@app.post("/api/newsletter/subscribe")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    """Subscribe to newsletter"""
    # Check if email already exists
    if any(sub['email'] == subscription.email for sub in newsletter_subscribers):
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    subscription.subscribed_at = datetime.now().isoformat()
    newsletter_subscribers.append(subscription.dict())
    
    return {"message": "Successfully subscribed to newsletter", "email": subscription.email}

@app.get("/api/newsletter/subscribers")
async def get_subscribers():
    """Get newsletter subscribers count"""
    return {"count": len(newsletter_subscribers)}

# Contact endpoints
@app.post("/api/contact")
async def send_contact_message(message: ContactMessage):
    """Send contact message"""
    message.sent_at = datetime.now().isoformat()
    contact_messages.append(message.dict())
    
    return {"message": "Message sent successfully"}

@app.get("/api/stats")
async def get_stats():
    """Get blog statistics"""
    total_views = sum(article['views'] for article in articles_db)
    total_articles = len(articles_db)
    total_subscribers = len(newsletter_subscribers)
    
    return {
        "total_articles": total_articles,
        "total_views": total_views,
        "total_subscribers": total_subscribers,
        "featured_articles": len([a for a in articles_db if a['featured']]),
        "categories": {
            "meditation": len([a for a in articles_db if a['category'] == 'meditation']),
            "sommeil": len([a for a in articles_db if a['category'] == 'sommeil']),
            "nutrition": len([a for a in articles_db if a['category'] == 'nutrition']),
            "developpement": len([a for a in articles_db if a['category'] == 'developpement'])
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)