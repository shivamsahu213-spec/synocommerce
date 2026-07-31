/**
 * Kalyan Ayurvedic Production Catalog Dataset
 * @module stores/kalyan-ayurvedic/products/catalog.data
 */

export interface AyurvedicProduct {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly category: string;
  readonly priceInr: number;
  readonly originalPriceInr?: number | undefined;
  readonly rating: number;
  readonly reviewsCount: number;
  readonly healthGoal: string;
  readonly keyIngredients: readonly string[];
  readonly benefits: readonly string[];
  readonly description: string;
  readonly usageInstructions: string;
  readonly inStock: boolean;
}

export const KALYAN_CATEGORIES = [
  'Hair Care',
  'Skin & Facial Oils',
  'Immunity & Vitality',
  'Joint & Pain Care',
  'Digestion & Wellness',
] as const;

export const KALYAN_HEALTH_GOALS = [
  'Hair Growth & Scalp Nourishment',
  'Glowing Radiant Skin',
  'Immunity & Energy Boost',
  'Joint Mobility & Pain Relief',
  'Stress Relief & Rejuvenation',
] as const;

export const KALYAN_PRODUCTS: readonly AyurvedicProduct[] = [
  {
    id: 'kalyan_prod_1',
    sku: 'KAL-HAIR-001',
    name: 'Kalyan Bhringraj & Amla Hair Vitalizer Oil (200ml)',
    category: 'Hair Care',
    priceInr: 899,
    originalPriceInr: 1099,
    rating: 4.9,
    reviewsCount: 142,
    healthGoal: 'Hair Growth & Scalp Nourishment',
    keyIngredients: ['Pure Bhringraj', 'Fresh Amla', 'Sesame Oil', 'Brahmi', 'Jatamansi'],
    benefits: ['Promotes dense hair growth', 'Prevents premature greying', 'Cools scalp and reduces stress'],
    description: 'Cold-pressed authentic Ayurvedic hair oil slow-cooked over 21 days with pure Bhringraj and organic Amla.',
    usageInstructions: 'Gently massage into scalp 2-3 times a week before bed. Rinse thoroughly with mild cleanser.',
    inStock: true,
  },
  {
    id: 'kalyan_prod_2',
    sku: 'KAL-SKIN-002',
    name: 'Kalyan Kumkumadi Tailam Radiance Elixir (30ml)',
    category: 'Skin & Facial Oils',
    priceInr: 1499,
    originalPriceInr: 1799,
    rating: 5.0,
    reviewsCount: 218,
    healthGoal: 'Glowing Radiant Skin',
    keyIngredients: ['Kashmiri Saffron (Kesar)', 'Sandalwood (Chandan)', 'Lotus Stamen', 'Licorice (Yashthimadhu)'],
    benefits: ['Illuminates complexion', 'Fades hyperpigmentation & spots', 'Deeply hydrates and plumps skin'],
    description: 'Miraculous night beauty elixir infused with pure Kashmiri Saffron and 26 precious Ayurvedic herbs.',
    usageInstructions: 'Apply 3-4 drops on cleansed face every night. Gently press into skin with fingertips.',
    inStock: true,
  },
  {
    id: 'kalyan_prod_3',
    sku: 'KAL-VITAL-003',
    name: 'Kalyan Pure Ashwagandha Gold Vitality Capsules (60 Veg Caps)',
    category: 'Immunity & Vitality',
    priceInr: 699,
    originalPriceInr: 799,
    rating: 4.8,
    reviewsCount: 96,
    healthGoal: 'Stress Relief & Rejuvenation',
    keyIngredients: ['KSM-66 Organic Ashwagandha Root', 'Gold Bhasma', 'Shilajit'],
    benefits: ['Reduces cortisol stress levels', 'Enhances stamina and daily energy', 'Supports restful sleep'],
    description: 'High-potency organic Ashwagandha extract fortified with Swarna Bhasma for peak vitality.',
    usageInstructions: 'Take 1 capsule twice daily after meals with warm water or milk.',
    inStock: true,
  },
  {
    id: 'kalyan_prod_4',
    sku: 'KAL-PAIN-004',
    name: 'Kalyan Mahanarayan Joint Relief Balm (100g)',
    category: 'Joint & Pain Care',
    priceInr: 499,
    originalPriceInr: 599,
    rating: 4.7,
    reviewsCount: 84,
    healthGoal: 'Joint Mobility & Pain Relief',
    keyIngredients: ['Mahanarayan Taila', 'Eucalyptus Oil', 'Camphor (Karpura)', 'Wintergreen Oil'],
    benefits: ['Relieves stiffness & arthritis discomfort', 'Improves joint flexibility', 'Fast-acting warm absorption'],
    description: 'Classical herbal joint relief balm formulated for instant soothing of muscular stiffness and joint soreness.',
    usageInstructions: 'Apply liberally over affected joint areas 2-3 times daily with light massage.',
    inStock: true,
  },
  {
    id: 'kalyan_prod_5',
    sku: 'KAL-IMMUNE-005',
    name: 'Kalyan Chyawanprash Supreme with Saffron (500g)',
    category: 'Immunity & Vitality',
    priceInr: 799,
    originalPriceInr: 899,
    rating: 4.9,
    reviewsCount: 165,
    healthGoal: 'Immunity & Energy Boost',
    keyIngredients: ['Wild Amla Concentrate', 'Wild Forest Honey', 'Pure Ghee', 'Saffron', 'Pippali'],
    benefits: ['Strengthens respiratory immune shield', 'Rich natural Vitamin C source', 'Rejuvenates digestive fire (Agni)'],
    description: 'Traditional Ayurvedic Rasayana prepared in small artisanal batches with organic wild Amla and raw forest honey.',
    usageInstructions: 'Consume 1 tablespoonful twice daily, preferably with warm milk.',
    inStock: true,
  },
];
