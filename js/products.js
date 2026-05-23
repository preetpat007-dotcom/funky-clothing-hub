// 15 Clothing Products with different preferences
const clothingProducts = [
    {
        id: 1,
        name: "Pastel Dream Hoodie",
        emoji: "🧥",
        description: "Soft pastel hoodie with cozy vibes",
        price: "$45",
        size: "XS-XL",
        style: "casual",
        color: "pastel",
        vibe: "cozy",
        tags: ["Casual", "Pastel", "Cozy"]
    },
    {
        id: 2,
        name: "Neon Vibes T-Shirt",
        emoji: "👕",
        description: "Eye-catching vibrant tee with bold graphics",
        price: "$25",
        size: "XS-XXL",
        style: "casual",
        color: "vibrant",
        vibe: "bold",
        tags: ["Casual", "Vibrant", "Bold"]
    },
    {
        id: 3,
        name: "Classic Formal Shirt",
        emoji: "👔",
        description: "Elegant formal shirt for professional settings",
        price: "$65",
        size: "S-XXL",
        style: "formal",
        color: "neutral",
        vibe: "minimalist",
        tags: ["Formal", "Neutral", "Minimalist"]
    },
    {
        id: 4,
        name: "Sporty Performance Jacket",
        emoji: "🏃",
        description: "High-performance athletic jacket for active days",
        price: "$89",
        size: "XS-XL",
        style: "sporty",
        color: "vibrant",
        vibe: "bold",
        tags: ["Sporty", "Vibrant", "Athletic"]
    },
    {
        id: 5,
        name: "Vintage Denim Jacket",
        emoji: "🧵",
        description: "Timeless vintage-inspired denim with character",
        price: "$79",
        size: "S-XXL",
        style: "vintage",
        color: "neutral",
        vibe: "artistic",
        tags: ["Vintage", "Denim", "Artistic"]
    },
    {
        id: 6,
        name: "Minimalist Basics Tank",
        emoji: "🎽",
        description: "Simple and versatile tank top for everyday wear",
        price: "$18",
        size: "XS-XXL",
        style: "casual",
        color: "neutral",
        vibe: "minimalist",
        tags: ["Casual", "Minimalist", "Basics"]
    },
    {
        id: 7,
        name: "Dark Aesthetic Hoodie",
        emoji: "🖤",
        description: "Sleek dark hoodie with modern aesthetic",
        price: "$52",
        size: "XS-XL",
        style: "casual",
        color: "dark",
        vibe: "minimalist",
        tags: ["Casual", "Dark", "Modern"]
    },
    {
        id: 8,
        name: "Artistic Print Tee",
        emoji: "🎨",
        description: "Unique artistic print that tells a story",
        price: "$32",
        size: "XS-XXL",
        style: "casual",
        color: "vibrant",
        vibe: "artistic",
        tags: ["Casual", "Artistic", "Print"]
    },
    {
        id: 9,
        name: "Formal Blazer Pro",
        emoji: "🎩",
        description: "Professional blazer for business meetings",
        price: "$120",
        size: "S-XXL",
        style: "formal",
        color: "dark",
        vibe: "minimalist",
        tags: ["Formal", "Professional", "Blazer"]
    },
    {
        id: 10,
        name: "Pastel Color-Block Sweatshirt",
        emoji: "🧶",
        description: "Soft pastel color blocks for cozy relaxation",
        price: "$48",
        size: "XS-XL",
        style: "casual",
        color: "pastel",
        vibe: "cozy",
        tags: ["Casual", "Pastel", "Cozy"]
    },
    {
        id: 11,
        name: "Sporty Leggings",
        emoji: "🤸",
        description: "Comfortable and stylish athletic leggings",
        price: "$42",
        size: "XS-XL",
        style: "sporty",
        color: "vibrant",
        vibe: "bold",
        tags: ["Sporty", "Athletic", "Comfortable"]
    },
    {
        id: 12,
        name: "Vintage Band Tee",
        emoji: "🎸",
        description: "Retro vintage band merchandise style",
        price: "$35",
        size: "XS-XXL",
        style: "vintage",
        color: "dark",
        vibe: "artistic",
        tags: ["Vintage", "Band", "Retro"]
    },
    {
        id: 13,
        name: "Soft Pastel Cardigan",
        emoji: "🧥",
        description: "Dreamy pastel cardigan for layering",
        price: "$55",
        size: "S-XXL",
        style: "casual",
        color: "pastel",
        vibe: "cozy",
        tags: ["Casual", "Pastel", "Layering"]
    },
    {
        id: 14,
        name: "Bold Pattern Button-Up",
        emoji: "👗",
        description: "Statement button-up with bold patterns",
        price: "$58",
        size: "XS-XXL",
        style: "casual",
        color: "vibrant",
        vibe: "bold",
        tags: ["Casual", "Bold", "Pattern"]
    },
    {
        id: 15,
        name: "Formal Evening Dress",
        emoji: "👠",
        description: "Elegant formal dress for special occasions",
        price: "$145",
        size: "S-XXL",
        style: "formal",
        color: "dark",
        vibe: "minimalist",
        tags: ["Formal", "Elegant", "Evening"]
    }
];

// Function to filter products based on preferences
function getMatchingProducts(preferences) {
    return clothingProducts.filter(product => {
        const styleMatch = !preferences.style || product.style === preferences.style;
        const colorMatch = !preferences.color || product.color === preferences.color;
        const vibeMatch = !preferences.vibe || product.vibe === preferences.vibe;
        
        return styleMatch && colorMatch && vibeMatch;
    });
}

// Function to get partial matches
function getPartialMatches(preferences) {
    return clothingProducts.filter(product => {
        let matches = 0;
        if (preferences.style && product.style === preferences.style) matches++;
        if (preferences.color && product.color === preferences.color) matches++;
        if (preferences.vibe && product.vibe === preferences.vibe) matches++;
        
        return matches >= 2; // At least 2 matches
    });
}

// Get recommendations with fallback
function getRecommendations(preferences) {
    let results = getMatchingProducts(preferences);
    
    if (results.length === 0) {
        results = getPartialMatches(preferences);
    }
    
    if (results.length === 0) {
        results = clothingProducts;
    }
    
    return results;
}