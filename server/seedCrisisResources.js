import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { CrisisResource } from './models/CrisisResource.js'

dotenv.config()

const crisisResources = [
  {
    title: "AASRA - Suicide Prevention Helpline",
    description: "24/7 free and confidential support for people in distress. One of India's leading suicide prevention helplines providing emotional support and crisis intervention.",
    type: "hotline",
    category: "suicide_prevention",
    contact: {
      phone: "9820466626",
      website: "http://www.aasra.info",
      email: "aasrahelpline@yahoo.com"
    },
    availability: "24/7",
    languages: ["English", "Hindi"],
    region: "india",
    isVerified: true,
    priority: 10,
    isActive: true,
    tags: ["suicide", "crisis", "emergency", "24/7", "aasra", "mental health"]
  },
  {
    title: "Vandrevala Foundation Helpline",
    description: "Free 24/7 mental health support and counseling helpline. Provides immediate help for mental health crises, depression, anxiety, and suicidal thoughts.",
    type: "hotline",
    category: "mental_health",
    contact: {
      phone: "1860-2662-345",
      alternatePhone: "1800-2333-330",
      website: "https://www.vandrevalafoundation.com"
    },
    availability: "24/7",
    languages: ["English", "Hindi"],
    region: "india",
    isVerified: true,
    priority: 10,
    isActive: true,
    tags: ["mental health", "counseling", "crisis", "24/7", "depression", "anxiety"]
  },
  {
    title: "iCall Psychosocial Helpline",
    description: "Professional counseling service by TISS providing emotional support for mental health issues, stress, anxiety, depression, and relationship problems.",
    type: "hotline",
    category: "mental_health",
    contact: {
      phone: "9152987821",
      website: "https://icallhelpline.org",
      email: "icall@tiss.edu"
    },
    availability: "specific_hours",
    hours: "Monday-Saturday 8am-10pm",
    languages: ["English", "Hindi", "Marathi"],
    region: "india",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["mental health", "counseling", "anxiety", "depression", "tiss", "stress"]
  },
  {
    title: "Snehi - Crisis Intervention Centre",
    description: "24/7 suicide prevention and emotional support helpline. Provides crisis intervention, emotional support, and referral services.",
    type: "hotline",
    category: "suicide_prevention",
    contact: {
      phone: "011-40769002",
      alternatePhone: "011-22520984",
      website: "http://snehiindia.org"
    },
    availability: "24/7",
    languages: ["English", "Hindi"],
    region: "india",
    isVerified: true,
    priority: 10,
    isActive: true,
    tags: ["suicide prevention", "crisis", "24/7", "delhi", "emotional support"]
  },
  {
    title: "KIRAN - National Mental Health Helpline",
    description: "Government of India's national mental health rehabilitation helpline. Provides support for mental health issues, psychological first aid, and referrals.",
    type: "hotline",
    category: "mental_health",
    contact: {
      phone: "1800-599-0019",
      website: "https://www.mohfw.gov.in",
      email: "dir-nimhans@gov.in"
    },
    availability: "24/7",
    languages: ["English", "Hindi", "13+ regional languages"],
    region: "india",
    isVerified: true,
    priority: 10,
    isActive: true,
    tags: ["mental health", "government", "24/7", "nimhans", "national helpline"]
  },
  {
    title: "Mitram Foundation",
    description: "Emotional support and suicide prevention helpline based in Chennai. Provides crisis counseling and mental health support.",
    type: "hotline",
    category: "suicide_prevention",
    contact: {
      phone: "080-25722573",
      alternatePhone: "080-25727850",
      website: "http://www.mitramfoundation.org",
      email: "mitramtrust@gmail.com"
    },
    availability: "specific_hours",
    hours: "10am-6pm",
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    region: "india",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["suicide prevention", "chennai", "crisis", "emotional support"]
  },
  {
    title: "Parivarthan Counseling Centre",
    description: "Free counseling services for mental health issues, stress, anxiety, and depression. Provides both phone and in-person counseling.",
    type: "hotline",
    category: "mental_health",
    contact: {
      phone: "7676602602",
      alternatePhone: "7676604102",
      website: "https://parivarthan.org",
      email: "info@parivarthan.org"
    },
    availability: "specific_hours",
    hours: "Monday-Friday 9am-6pm",
    languages: ["English", "Hindi", "Kannada"],
    region: "india",
    isVerified: true,
    priority: 8,
    isActive: true,
    tags: ["mental health", "counseling", "bangalore", "anxiety", "depression"]
  },
  {
    title: "Connecting Trust - Suicide Prevention",
    description: "Provides emotional support and crisis intervention for people experiencing suicidal thoughts or emotional distress.",
    type: "hotline",
    category: "suicide_prevention",
    contact: {
      phone: "9922001122",
      alternatePhone: "9922004305",
      website: "http://connectingngo.org",
      email: "connectingtrust@gmail.com"
    },
    availability: "24/7",
    languages: ["English", "Hindi", "Marathi"],
    region: "india",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["suicide prevention", "crisis", "24/7", "pune", "maharashtra"]
  },
  {
    title: "Fortis Stress Helpline",
    description: "Professional mental health support and stress management counseling. Part of Fortis Healthcare's mental health initiative.",
    type: "hotline",
    category: "mental_health",
    contact: {
      phone: "8376804102",
      website: "https://www.fortishealthcare.com",
    },
    availability: "24/7",
    languages: ["English", "Hindi"],
    region: "india",
    isVerified: true,
    priority: 8,
    isActive: true,
    tags: ["stress", "mental health", "counseling", "24/7", "fortis"]
  },
  {
    title: "Roshni Trust - Helpline",
    description: "Provides emotional support and intervention for people in crisis. Focuses on suicide prevention and mental health support.",
    type: "hotline",
    category: "suicide_prevention",
    contact: {
      phone: "040-66202000",
      alternatePhone: "040-66202001",
      website: "http://roshnihyd.org",
      email: "roshnitrust@gmail.com"
    },
    availability: "specific_hours",
    hours: "11am-9pm",
    languages: ["English", "Hindi", "Telugu"],
    region: "india",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["suicide prevention", "crisis", "hyderabad", "telangana", "emotional support"]
  },
  {
    title: "Sumaitri - Suicide Prevention Centre",
    description: "Delhi-based crisis intervention and suicide prevention center. Provides emotional support through phone and face-to-face counseling.",
    type: "hotline",
    category: "suicide_prevention",
    contact: {
      phone: "011-23389090",
      website: "http://www.sumaitri.net",
      email: "sumaitri@sumaitri.net"
    },
    availability: "specific_hours",
    hours: "2pm-10pm",
    languages: ["English", "Hindi"],
    region: "india",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["suicide prevention", "delhi", "crisis", "counseling"]
  },
  {
    title: "Lifeline Foundation",
    description: "Provides crisis intervention and suicide prevention services. Offers emotional support and mental health counseling.",
    type: "hotline",
    category: "crisis_support",
    contact: {
      phone: "033-24637401",
      alternatePhone: "033-24637432",
      website: "http://lifelinekolkata.org",
      email: "aradhana.lifelinekolkata@gmail.com"
    },
    availability: "specific_hours",
    hours: "10am-6pm",
    languages: ["English", "Hindi", "Bengali"],
    region: "india",
    isVerified: true,
    priority: 8,
    isActive: true,
    tags: ["crisis", "suicide prevention", "kolkata", "west bengal", "counseling"]
  },
  {
    title: "MPower 1-on-1 Helpline",
    description: "Professional mental health support and counseling by trained psychologists. Provides support for anxiety, depression, stress, and other mental health issues.",
    type: "hotline",
    category: "mental_health",
    contact: {
      phone: "1800-120-820050",
      website: "https://mpowerminds.com",
      chatUrl: "https://mpowerminds.com/1on1support"
    },
    availability: "specific_hours",
    hours: "Monday-Saturday 10am-6pm",
    languages: ["English", "Hindi"],
    region: "india",
    isVerified: true,
    priority: 8,
    isActive: true,
    tags: ["mental health", "counseling", "psychologist", "anxiety", "depression"]
  },
  {
    title: "Mann Talks - Mental Health Support",
    description: "Youth-focused mental health helpline providing peer support and professional counseling for young adults and teenagers.",
    type: "hotline",
    category: "youth_support",
    contact: {
      phone: "8686139139",
      website: "https://www.manntalks.org",
      email: "shout@manntalks.org"
    },
    availability: "specific_hours",
    hours: "Monday-Friday 10am-8pm",
    languages: ["English", "Hindi"],
    region: "india",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["youth", "mental health", "teenagers", "peer support", "counseling"]
  },
  {
    title: "Samaritans Mumbai",
    description: "Befriending service for people in distress. Provides emotional support and a listening ear for those experiencing loneliness, depression, or suicidal thoughts.",
    type: "hotline",
    category: "crisis_support",
    contact: {
      phone: "022-23092787",
      alternatePhone: "022-23093787",
      website: "http://www.samaritansmumbai.org",
      email: "talk2samaritansmumbai@gmail.com"
    },
    availability: "24/7",
    languages: ["English", "Hindi", "Marathi"],
    region: "india",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["crisis", "emotional support", "24/7", "mumbai", "befriending"]
  }
]

const seedCrisisResources = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Check if resources already exist
    const existingCount = await CrisisResource.countDocuments()
    console.log(`📊 Found ${existingCount} existing crisis resources`)

    if (existingCount > 0) {
      console.log('🗑️ Deleting existing resources...')
      await CrisisResource.deleteMany({})
      console.log('✅ Deleted existing resources')
    }

    console.log('🌱 Seeding crisis resources...')
    await CrisisResource.insertMany(crisisResources)
    
    const newCount = await CrisisResource.countDocuments()
    console.log(`✅ Successfully seeded ${newCount} crisis resources!`)
    console.log('\n📋 Resources by category:')
    
    const categories = await CrisisResource.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    
    categories.forEach(cat => {
      console.log(`   - ${cat._id}: ${cat.count}`)
    })

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding crisis resources:', error)
    process.exit(1)
  }
}

// Export for use in crisis routes
export { crisisResources }

// Run if executed directly
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  seedCrisisResources()
}
