/**
 * Kalyan Ayurvedic Production CMS Pages Content
 * Includes About Us, Contact & Store Locator, Ayurvedic Blog & Wellness Guides, and FAQ.
 *
 * @module stores/kalyan-ayurvedic/cms/pages.cms
 */

export const KALYAN_ABOUT_CMS = {
  title: 'Our Heritage & Philosophy',
  subtitle: 'Handcrafted Herbal Excellence from Bhilai, Chhattisgarh',
  story: 'Founded in 1984 in the heart of Bhilai, Kalyan Ayurvedic began with a singular mission: to preserve and bottle ancient Ayurvedic wisdom in its purest, most potent form. Guided by classical texts and supervised by experienced Vaidyas, every oil, elixir, and Rasayana is slow-cooked over traditional brass vessels.',
  milestones: [
    { year: 1984, event: 'First Ayurvedic Pharmacy established in Bhilai Sector 6' },
    { year: 2002, event: 'GMP & AYUSH Ministry Certification granted' },
    { year: 2018, event: 'Expanded to organic herbal farming reserves across Chhattisgarh' },
    { year: 2026, event: 'Launched direct-to-consumer digital commerce platform' },
  ],
  vaidyaTeam: [
    {
      name: 'Dr. Vaidya Rajendra Sharma',
      role: 'Chief Medical Officer & Senior Physician',
      experience: '35+ Years in Classical Ayurvedic Pharmacology',
      bio: 'BAMS, MD (Ayurveda). Pioneer in classical herb extraction and customized Panchakarma formulations.',
    },
    {
      name: 'Dr. Ananya Mishra',
      role: 'Head of Herbal R&D and Quality Control',
      experience: '18 Years in Phytochemistry & Botanical Safety',
      bio: 'PhD in Ayurvedic Botany. Oversees heavy metal testing and purity certification for all raw botanicals.',
    },
  ],
};

export const KALYAN_CONTACT_CMS = {
  title: 'Connect with Our Ayurvedic Care Team',
  subtitle: 'Have a question about your Dosha or need personal product recommendations? Our team in Bhilai is here to assist you.',
  phone: '+91 788 234 5678',
  whatsapp: '+91 98271 09876',
  email: 'care@kalyanayurvedic.com',
  businessHours: 'Monday – Saturday: 9:00 AM – 8:00 PM IST',
  storeAddress: {
    building: 'Kalyan Ayurvedic Bhavan',
    street: 'Plot 12, Commercial Complex, Sector 6',
    city: 'Bhilai',
    district: 'Durg',
    state: 'Chhattisgarh',
    pincode: '490006',
  },
};

export const KALYAN_BLOG_POSTS = [
  {
    id: 'blog_1',
    slug: 'kumkumadi-tailam-benefits-glowing-skin',
    title: 'The Miracle of Saffron: Why Kumkumadi Tailam is Ayurveda’s Greatest Beauty Secret',
    category: 'Skincare',
    author: 'Dr. Ananya Mishra',
    readTime: '5 min read',
    date: '2026-07-28',
    excerpt: 'Discover how 26 botanical herbs and Kashmiri Saffron work synergistically to restore youthful skin radiance.',
  },
  {
    id: 'blog_2',
    slug: 'ashwagandha-cortisol-stress-management',
    title: 'Mastering Stress & Vitality: The Science of KSM-66 Ashwagandha',
    category: 'Wellness',
    author: 'Dr. Vaidya Rajendra Sharma',
    readTime: '6 min read',
    date: '2026-07-20',
    excerpt: 'Understand how adaptogenic Ashwagandha lowers cortisol levels and restores deep, restful sleep cycles.',
  },
  {
    id: 'blog_3',
    slug: 'bhringraj-oil-hair-growth-routine',
    title: 'How to Prevent Premature Greying and Hair Fall with Cold-Pressed Bhringraj Oil',
    category: 'Hair Care',
    author: 'Dr. Ananya Mishra',
    readTime: '4 min read',
    date: '2026-07-15',
    excerpt: 'Step-by-step scalpmassage techniques for maximum nutrient absorption and hair follicle stimulation.',
  },
];
