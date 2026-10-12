export type IngredientStatus = "available" | "low" | "missing" | "not_ready";
export type DishStatus = "available" | "sold_out" | "paused";

export type Ingredient = { id: string; name: string; status: IngredientStatus; reason?: string; };
export type Dish = { id: string; name: string; category: string; price: number; description: string; emoji: string; ingredientIds: string[]; manualStatus: DishStatus; };
export type Outlet = { id: string; slug: string; name: string; area: string; address: string; adminPin: string; updatedAt: string; categories: string[]; ingredients: Ingredient[]; dishes: Dish[]; };

function cafePreviewOutlet(id: string, name: string, area: string, address: string, dishes: Dish[]): Outlet {
  return {
    id,
    slug: id,
    name,
    area,
    address,
    adminPin: "1234",
    updatedAt: "demo",
    categories: Array.from(new Set(dishes.map((dish) => dish.category))),
    ingredients: [],
    dishes
  };
}


export const demoOutlet: Outlet = {
  id: "lilys-cafe",
  slug: "lilys-cafe",
  name: "Lily's Cafe",
  area: "Tapovan, Rishikesh",
  address: "Tapovan Road, near yoga hostels and guest houses",
  adminPin: "1234",
  updatedAt: "just now",
  categories: ["Available Now", "Warmth in the cup", "Cool & Refreshing", "Blended Garden", "Lily's Kitchen", "Toast House", "Mediterranean", "Sold Out"],
  ingredients: [
    { id: "milk", name: "Milk", status: "low", reason: "Low stock" },
    { id: "banana", name: "Banana", status: "available" },
    { id: "dates", name: "Dates", status: "available" },
    { id: "seasonal-fruit", name: "Seasonal Fruits", status: "missing", reason: "Seasonal fruit not delivered" },
    { id: "paneer", name: "Paneer", status: "missing", reason: "Paneer missing" },
    { id: "eggs", name: "Eggs", status: "available" },
    { id: "bread", name: "Bread", status: "available" },
    { id: "mushroom", name: "Mushroom", status: "not_ready", reason: "Mushrooms not prepped" },
    { id: "cheese", name: "Cheese", status: "available" },
    { id: "avocado", name: "Avocado", status: "missing", reason: "Avocado finished" },
    { id: "pita", name: "Pita Bread", status: "available" },
    { id: "hummus", name: "Hummus", status: "available" },
    { id: "tomato", name: "Tomato & Pepper Sauce", status: "available" },
    { id: "coffee", name: "Coffee", status: "available" },
    { id: "lemon", name: "Lemon", status: "available" }
  ],
  dishes: [
    { id: "lilys-masala-chai", name: "Lily's Masala Chai", category: "Warmth in the cup", price: 70, description: "Slow mountain-morning chai from Lily's drinks menu.", emoji: "☕", ingredientIds: ["milk"], manualStatus: "available" },
    { id: "honey-ginger-lemon-brew", name: "Honey Ginger Lemon Brew", category: "Warmth in the cup", price: 80, description: "Honey, ginger and lemon for post-yoga afternoons.", emoji: "🍋", ingredientIds: ["lemon"], manualStatus: "available" },
    { id: "himalayan-green-tea", name: "Himalayan Green Tea", category: "Warmth in the cup", price: 80, description: "Simple hot green tea for slow conversations.", emoji: "🍵", ingredientIds: [], manualStatus: "available" },
    { id: "hand-beaten-coffee", name: "Hand-Beaten Coffee", category: "Warmth in the cup", price: 100, description: "Creamy hand-beaten coffee served warm.", emoji: "☕", ingredientIds: ["milk", "coffee"], manualStatus: "available" },
    { id: "fresh-lemon-water", name: "Fresh Lemon Water", category: "Cool & Refreshing", price: 60, description: "Simple, bright and refreshing for sunny afternoons.", emoji: "🥤", ingredientIds: ["lemon"], manualStatus: "available" },
    { id: "sweet-lassi", name: "Sweet Lassi", category: "Cool & Refreshing", price: 100, description: "Classic chilled lassi.", emoji: "🥛", ingredientIds: ["milk"], manualStatus: "available" },
    { id: "iced-coffee", name: "Iced Coffee", category: "Cool & Refreshing", price: 140, description: "Cold coffee for post-hike thirst.", emoji: "🧋", ingredientIds: ["milk", "coffee"], manualStatus: "available" },
    { id: "banana-date-bliss-bowl", name: "Banana & Date Bliss Bowl", category: "Blended Garden", price: 250, description: "Creamy banana and date smoothie bowl, naturally sweet.", emoji: "🍌", ingredientIds: ["banana", "dates"], manualStatus: "available" },
    { id: "banana-cocoa-dream-bowl", name: "Banana Cocoa Dream Bowl", category: "Blended Garden", price: 280, description: "Banana and cocoa blended into a rich smoothie bowl.", emoji: "🍫", ingredientIds: ["banana"], manualStatus: "available" },
    { id: "seasonal-blossom-bowl", name: "Seasonal Blossom Bowl", category: "Blended Garden", price: 320, description: "Seasonal fruit smoothie bowl with fresh colours.", emoji: "🍓", ingredientIds: ["seasonal-fruit"], manualStatus: "available" },
    { id: "pahadi-aloo-paratha", name: "Pahadi Aloo Paratha", category: "Lily's Kitchen", price: 100, description: "Crisp golden paratha stuffed with spiced potato.", emoji: "🫓", ingredientIds: [], manualStatus: "available" },
    { id: "paneer-paratha", name: "Paneer Paratha", category: "Lily's Kitchen", price: 130, description: "Golden paratha filled with seasoned paneer and gentle spices.", emoji: "🫓", ingredientIds: ["paneer"], manualStatus: "available" },
    { id: "tomato-cheese-omelette", name: "Tomato & Cheese Omelette", category: "Lily's Kitchen", price: 140, description: "Fluffy omelette folded with tomato and melted cheese.", emoji: "🍳", ingredientIds: ["eggs", "tomato", "cheese"], manualStatus: "available" },
    { id: "mushroom-cheese-omelette", name: "Mushroom & Cheese Omelette", category: "Lily's Kitchen", price: 160, description: "Soft omelette with sautéed mushrooms and melted cheese.", emoji: "🍳", ingredientIds: ["eggs", "mushroom", "cheese"], manualStatus: "available" },
    { id: "garlic-butter-toast", name: "Garlic Butter Toast", category: "Toast House", price: 120, description: "Golden crisp toast for lazy café moments.", emoji: "🍞", ingredientIds: ["bread"], manualStatus: "available" },
    { id: "veggie-grilled-cheese", name: "Veggie Grilled Cheese", category: "Toast House", price: 180, description: "Grilled bread layered with vegetables and melted cheese.", emoji: "🥪", ingredientIds: ["bread", "cheese"], manualStatus: "available" },
    { id: "mushroom-cheese-melt", name: "Mushroom & Cheese Melt", category: "Toast House", price: 200, description: "Sautéed mushrooms and melted cheese grilled between crisp bread.", emoji: "🥪", ingredientIds: ["bread", "mushroom", "cheese"], manualStatus: "available" },
    { id: "avocado-toast", name: "Avocado Toast", category: "Toast House", price: 200, description: "Creamy avocado spread over toasted bread with simple seasoning.", emoji: "🥑", ingredientIds: ["bread", "avocado"], manualStatus: "available" },
    { id: "paneer-cheese-melt", name: "Paneer & Cheese Melt", category: "Toast House", price: 220, description: "Grilled bread filled with seasoned paneer and gooey melted cheese.", emoji: "🥪", ingredientIds: ["bread", "paneer", "cheese"], manualStatus: "available" },
    { id: "hummus-pita", name: "Hummus & Pita", category: "Mediterranean", price: 250, description: "Silky hummus served with warm pita bread.", emoji: "🧆", ingredientIds: ["hummus", "pita"], manualStatus: "available" },
    { id: "tahini-wrap", name: "Tahini Wrap", category: "Mediterranean", price: 280, description: "Creamy tahini and fresh vegetables in a warm wrap.", emoji: "🌯", ingredientIds: ["pita"], manualStatus: "available" },
    { id: "shakshuka", name: "Shakshuka", category: "Mediterranean", price: 300, description: "Eggs or paneer cooked in tomato and pepper sauce with warm pita.", emoji: "🍅", ingredientIds: ["eggs", "paneer", "tomato", "pita"], manualStatus: "available" },
    { id: "falafel-platter", name: "Falafel Platter", category: "Mediterranean", price: 330, description: "Crispy falafel served with hummus, pita and fresh accompaniments.", emoji: "🧆", ingredientIds: ["hummus", "pita"], manualStatus: "available" }
  ]
};


export const demoOutlets: Outlet[] = [
  demoOutlet,
  cafePreviewOutlet("ganga-bliss-cafe", "Ganga Bliss Cafe", "Laxman Jhula", "River-view cafe near the bridge", [
    { id: "ganga-lemon-mint", name: "Lemon Mint Cooler", category: "Coolers", price: 90, description: "Fresh lemon, mint and chilled soda.", emoji: "🍋", ingredientIds: [], manualStatus: "available" },
    { id: "ganga-veggie-sandwich", name: "Veggie Sandwich", category: "Quick Bites", price: 160, description: "Grilled bread with vegetables and cheese.", emoji: "🥪", ingredientIds: [], manualStatus: "available" },
    { id: "ganga-banana-pancake", name: "Banana Pancake", category: "Breakfast", price: 180, description: "Soft pancake with banana and honey.", emoji: "🥞", ingredientIds: [], manualStatus: "available" }
  ]),
  cafePreviewOutlet("tapovan-roastery", "Tapovan Roastery", "Tapovan Market", "Small-batch coffee bar on the main lane", [
    { id: "roastery-americano", name: "Americano", category: "Coffee", price: 120, description: "Clean black coffee, hot or iced.", emoji: "☕", ingredientIds: [], manualStatus: "available" },
    { id: "roastery-cappuccino", name: "Cappuccino", category: "Coffee", price: 160, description: "Espresso with steamed milk foam.", emoji: "☕", ingredientIds: [], manualStatus: "available" },
    { id: "roastery-croissant", name: "Butter Croissant", category: "Bakery", price: 140, description: "Flaky morning croissant.", emoji: "🥐", ingredientIds: [], manualStatus: "available" }
  ]),
  cafePreviewOutlet("sadhu-bowl-house", "Sadhu Bowl House", "Upper Tapovan", "Healthy bowls and juices near yoga stays", [
    { id: "sadhu-sattvic-bowl", name: "Sattvic Bowl", category: "Bowls", price: 240, description: "Rice, dal, seasonal vegetables and chutney.", emoji: "🥣", ingredientIds: [], manualStatus: "available" },
    { id: "sadhu-green-juice", name: "Green Juice", category: "Juices", price: 140, description: "Cucumber, mint, lemon and greens.", emoji: "🥤", ingredientIds: [], manualStatus: "available" },
    { id: "sadhu-fruit-bowl", name: "Fruit Bowl", category: "Bowls", price: 180, description: "Fresh cut seasonal fruits.", emoji: "🍓", ingredientIds: [], manualStatus: "available" }
  ]),
  cafePreviewOutlet("namaste-breakfast-club", "Namaste Breakfast Club", "Tapovan Road", "All-day breakfast and chai spot", [
    { id: "namaste-masala-omelette", name: "Masala Omelette", category: "Breakfast", price: 140, description: "Egg omelette with onion, tomato and herbs.", emoji: "🍳", ingredientIds: [], manualStatus: "available" },
    { id: "namaste-aloo-toast", name: "Aloo Toast", category: "Toast", price: 120, description: "Spiced potato toast with chutney.", emoji: "🍞", ingredientIds: [], manualStatus: "available" },
    { id: "namaste-cutting-chai", name: "Cutting Chai", category: "Tea", price: 50, description: "Strong roadside-style chai.", emoji: "☕", ingredientIds: [], manualStatus: "available" }
  ])
];
