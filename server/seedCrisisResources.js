import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { CrisisResource } from './models/CrisisResource.js'

dotenv.config()

const crisisResources = [
  {
    title: "988 Suicide & Crisis Lifeline",
    description: "24/7 free and confidential support for people in distress, prevention and crisis resources for you or your loved ones, and best practices for professionals.",
    type: "hotline",
    category: "suicide_prevention",
    contact: {
      phone: "988",
      website: "https://988lifeline.org",
      chatUrl: "https://988lifeline.org/chat"
    },
    availability: "24/7",
    languages: ["English", "Spanish", "200+ languages via interpretation"],
    region: "us",
    isVerified: true,
    priority: 10,
    isActive: true,
    tags: ["suicide", "crisis", "emergency", "24/7", "lifeline"]
  },
  {
    title: "Crisis Text Line",
    description: "Free 24/7 crisis support via text message. Text HOME to 741741 to connect with a Crisis Counselor.",
    type: "text",
    category: "crisis_support",
    contact: {
      textNumber: "741741",
      website: "https://www.crisistextline.org",
      chatUrl: "https://www.crisistextline.org"
    },
    availability: "24/7",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 10,
    isActive: true,
    tags: ["text", "crisis", "24/7", "youth", "texting"]
  },
  {
    title: "National Alliance on Mental Illness (NAMI) Helpline",
    description: "Information, resource referrals and support to people living with a mental health condition, their family members and caregivers, mental health providers and the public.",
    type: "hotline",
    category: "mental_health",
    contact: {
      phone: "1-800-950-6264",
      website: "https://www.nami.org",
      textNumber: "62640"
    },
    availability: "specific_hours",
    hours: "Monday-Friday 10am-10pm ET",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["mental health", "support", "information", "nami"]
  },
  {
    title: "SAMHSA National Helpline",
    description: "Treatment referral and information service for individuals and families facing mental health and/or substance use disorders. 24/7 confidential, free help.",
    type: "hotline",
    category: "substance_abuse",
    contact: {
      phone: "1-800-662-4357",
      website: "https://www.samhsa.gov/find-help/national-helpline"
    },
    availability: "24/7",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["mental health", "substance abuse", "treatment", "24/7", "samhsa"]
  },
  {
    title: "National Domestic Violence Hotline",
    description: "24/7 confidential support for domestic violence survivors and anyone seeking resources and information. Trained advocates available to talk confidentially.",
    type: "hotline",
    category: "domestic_violence",
    contact: {
      phone: "1-800-799-7233",
      website: "https://www.thehotline.org",
      textNumber: "22522",
      chatUrl: "https://www.thehotline.org/get-help/"
    },
    availability: "24/7",
    languages: ["English", "Spanish", "200+ languages via interpretation"],
    region: "us",
    isVerified: true,
    priority: 10,
    isActive: true,
    tags: ["domestic violence", "abuse", "safety", "24/7"]
  },
  {
    title: "The Trevor Project Lifeline",
    description: "Crisis intervention and suicide prevention services for LGBTQ young people under 25. Trained counselors available 24/7.",
    type: "hotline",
    category: "lgbtq_support",
    contact: {
      phone: "1-866-488-7386",
      website: "https://www.thetrevorproject.org",
      chatUrl: "https://www.thetrevorproject.org/get-help/",
      textNumber: "678678"
    },
    availability: "24/7",
    languages: ["English"],
    region: "us",
    isVerified: true,
    priority: 10,
    isActive: true,
    tags: ["lgbtq", "youth", "suicide prevention", "24/7", "trevor"]
  },
  {
    title: "Veterans Crisis Line",
    description: "Connect with caring, qualified responders from the Department of Veterans Affairs, many of them Veterans themselves. Free and confidential support for Veterans and their families.",
    type: "hotline",
    category: "veteran_support",
    contact: {
      phone: "988",
      website: "https://www.veteranscrisisline.net",
      textNumber: "838255",
      chatUrl: "https://www.veteranscrisisline.net/get-help-now/chat/"
    },
    availability: "24/7",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["veterans", "military", "crisis", "24/7", "va"]
  },
  {
    title: "National Eating Disorders Association Helpline",
    description: "Support, resources and treatment options for those struggling with eating disorders. Trained volunteers provide information and support.",
    type: "hotline",
    category: "eating_disorders",
    contact: {
      phone: "1-800-931-2237",
      website: "https://www.nationaleatingdisorders.org",
      textNumber: "22333"
    },
    availability: "specific_hours",
    hours: "Monday-Thursday 11am-9pm ET, Friday 11am-5pm ET",
    languages: ["English"],
    region: "us",
    isVerified: true,
    priority: 8,
    isActive: true,
    tags: ["eating disorders", "anorexia", "bulimia", "support"]
  },
  {
    title: "Boys Town National Hotline",
    description: "Crisis, resource and referral line for children and parents. Specially trained counselors assist callers with family problems, school issues, teen pregnancy, and more.",
    type: "hotline",
    category: "youth_support",
    contact: {
      phone: "1-800-448-3823",
      website: "https://www.boystown.org/hotline",
      textNumber: "202-TXT-HLP1"
    },
    availability: "24/7",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 8,
    isActive: true,
    tags: ["youth", "children", "teens", "family", "24/7"]
  },
  {
    title: "Disaster Distress Helpline",
    description: "24/7 crisis counseling and support for people experiencing emotional distress related to natural or human-caused disasters.",
    type: "hotline",
    category: "crisis_support",
    contact: {
      phone: "1-800-985-5990",
      website: "https://www.samhsa.gov/find-help/disaster-distress-helpline",
      textNumber: "66746"
    },
    availability: "24/7",
    languages: ["English", "Spanish", "150+ languages via interpretation"],
    region: "us",
    isVerified: true,
    priority: 8,
    isActive: true,
    tags: ["disaster", "trauma", "ptsd", "crisis", "24/7"]
  },
  {
    title: "Trans Lifeline",
    description: "Peer support hotline run by and for trans people. Provides emotional and financial support to trans people in crisis.",
    type: "hotline",
    category: "lgbtq_support",
    contact: {
      phone: "1-877-565-8860",
      website: "https://translifeline.org"
    },
    availability: "specific_hours",
    hours: "Daily 7am-1am PT",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["transgender", "trans", "lgbtq", "peer support"]
  },
  {
    title: "National Sexual Assault Hotline (RAINN)",
    description: "Free, confidential support for sexual assault survivors. Connects you with a trained staff member from a local sexual assault service provider.",
    type: "hotline",
    category: "crisis_support",
    contact: {
      phone: "1-800-656-4673",
      website: "https://www.rainn.org",
      chatUrl: "https://hotline.rainn.org/online"
    },
    availability: "24/7",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["sexual assault", "rape", "abuse", "trauma", "24/7"]
  },
  {
    title: "National Maternal Mental Health Hotline",
    description: "Free, confidential hotline providing support for pregnant and new mothers experiencing mental health challenges. Staffed by trained counselors.",
    type: "hotline",
    category: "mental_health",
    contact: {
      phone: "1-833-852-6262",
      website: "https://mchb.hrsa.gov/national-maternal-mental-health-hotline",
      textNumber: "1-833-852-6262"
    },
    availability: "24/7",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 8,
    isActive: true,
    tags: ["maternal health", "postpartum", "pregnancy", "mothers"]
  },
  {
    title: "National Suicide Prevention Lifeline for Deaf/Hard of Hearing",
    description: "24/7 suicide prevention and crisis intervention services for deaf and hard of hearing individuals via TTY.",
    type: "hotline",
    category: "suicide_prevention",
    contact: {
      phone: "1-800-799-4889",
      website: "https://suicidepreventionlifeline.org/help-yourself/for-deaf-hard-of-hearing/"
    },
    availability: "24/7",
    languages: ["ASL", "English"],
    region: "us",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["deaf", "hard of hearing", "tty", "suicide prevention", "24/7"]
  },
  {
    title: "National Runaway Safeline",
    description: "24/7 crisis support and referrals for runaway and homeless youth, teens in crisis, and their families.",
    type: "hotline",
    category: "youth_support",
    contact: {
      phone: "1-800-786-2929",
      website: "https://www.1800runaway.org",
      chatUrl: "https://www.1800runaway.org/youth-teens/chat/",
      textNumber: "66008"
    },
    availability: "24/7",
    languages: ["English", "Spanish"],
    region: "us",
    isVerified: true,
    priority: 9,
    isActive: true,
    tags: ["runaway", "homeless", "youth", "teens", "24/7"]
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

seedCrisisResources()
