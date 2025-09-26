import mongoose from 'mongoose'
import { CrisisResource } from './models/CrisisResource.js'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zenzone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

async function initializeCrisisResources() {
  try {
    console.log('Checking existing crisis resources...')
    const existingCount = await CrisisResource.countDocuments()
    console.log(`Found ${existingCount} existing crisis resources`)
    
    if (existingCount > 0) {
      console.log('Crisis resources already exist. Skipping initialization.')
      return
    }

    console.log('Initializing comprehensive crisis resources...')

    const comprehensiveCrisisResources = [
      // EMERGENCY RESOURCES
      {
        title: "National Suicide Prevention Lifeline",
        description: "24/7 free and confidential support for people in distress, prevention and crisis resources. Connects to local crisis centers nationwide.",
        type: "hotline",
        category: "suicide_prevention",
        contact: {
          phone: "988",
          website: "https://suicidepreventionlifeline.org",
          chatUrl: "https://suicidepreventionlifeline.org/chat/"
        },
        availability: "24/7",
        languages: ["English", "Spanish", "Other languages via translation"],
        region: "us",
        isVerified: true,
        priority: 10,
        isActive: true,
        tags: ["suicide", "crisis", "emergency", "24/7", "lifeline"]
      },
      {
        title: "Crisis Text Line",
        description: "Free 24/7 crisis support via text message. Trained crisis counselors available for immediate help.",
        type: "text",
        category: "crisis_support",
        contact: {
          textNumber: "741741",
          website: "https://www.crisistextline.org"
        },
        availability: "24/7",
        languages: ["English", "Spanish"],
        region: "us",
        isVerified: true,
        priority: 9,
        isActive: true,
        tags: ["text", "crisis", "24/7", "youth", "anonymous"]
      },
      {
        title: "911 Emergency Services",
        description: "Call 911 for immediate emergency response. For life-threatening situations requiring police, fire, or medical assistance.",
        type: "hotline",
        category: "emergency",
        contact: {
          phone: "911"
        },
        availability: "24/7",
        languages: ["English", "Translation services available"],
        region: "us",
        isVerified: true,
        priority: 10,
        isActive: true,
        tags: ["emergency", "911", "police", "medical", "fire"]
      },

      // MENTAL HEALTH SUPPORT
      {
        title: "SAMHSA National Helpline",
        description: "Treatment referral and information service for individuals and families facing mental health and/or substance use disorders. Confidential, free, 24/7.",
        type: "hotline",
        category: "mental_health",
        contact: {
          phone: "1-800-662-4357",
          website: "https://www.samhsa.gov/find-help/national-helpline"
        },
        availability: "24/7",
        languages: ["English", "Spanish"],
        region: "us",
        isVerified: true,
        priority: 8,
        isActive: true,
        tags: ["mental health", "substance abuse", "treatment", "referral"]
      },
      {
        title: "NAMI HelpLine",
        description: "National Alliance on Mental Illness support and information for people with mental health conditions and their families.",
        type: "hotline",
        category: "mental_health",
        contact: {
          phone: "1-800-950-6264",
          website: "https://www.nami.org/help",
          email: "info@nami.org"
        },
        availability: "business_hours",
        hours: "Monday-Friday, 10 AM - 10 PM ET",
        languages: ["English"],
        region: "us",
        isVerified: true,
        priority: 7,
        isActive: true,
        tags: ["mental health", "family support", "education", "advocacy"]
      },

      // DOMESTIC VIOLENCE
      {
        title: "National Domestic Violence Hotline",
        description: "24/7 confidential support for domestic violence survivors and anyone seeking resources and information. Safety planning and local referrals available.",
        type: "hotline",
        category: "domestic_violence",
        contact: {
          phone: "1-800-799-7233",
          website: "https://www.thehotline.org",
          textNumber: "22522",
          chatUrl: "https://www.thehotline.org/get-help/domestic-violence-local-resources/"
        },
        availability: "24/7",
        languages: ["English", "Spanish", "200+ languages via interpretation"],
        region: "us",
        isVerified: true,
        priority: 9,
        isActive: true,
        tags: ["domestic violence", "abuse", "safety", "shelter"]
      },

      // LGBTQ+ SUPPORT
      {
        title: "Trevor Lifeline",
        description: "Crisis intervention and suicide prevention for LGBTQ young people under 25. Trained counselors available 24/7.",
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
        priority: 9,
        isActive: true,
        tags: ["lgbtq", "youth", "suicide prevention", "coming out"]
      },
      {
        title: "LGBT National Hotline",
        description: "Peer-support, community connections and resource information for people with questions regarding sexual orientation and/or gender identity.",
        type: "hotline",
        category: "lgbtq_support",
        contact: {
          phone: "1-888-843-4564",
          website: "https://www.lgbthotline.org"
        },
        availability: "business_hours",
        hours: "Monday-Friday, 4 PM - 12 AM PT; Saturday, 9 AM - 2 PM PT",
        languages: ["English"],
        region: "us",
        isVerified: true,
        priority: 7,
        isActive: true,
        tags: ["lgbtq", "peer support", "community", "resources"]
      },

      // SUBSTANCE ABUSE
      {
        title: "Substance Abuse and Mental Health Services Administration",
        description: "Free, confidential, 24/7 treatment referral and information service for individuals and families facing substance abuse disorders.",
        type: "hotline",
        category: "substance_abuse",
        contact: {
          phone: "1-800-662-4357",
          website: "https://www.samhsa.gov/find-treatment"
        },
        availability: "24/7",
        languages: ["English", "Spanish"],
        region: "us",
        isVerified: true,
        priority: 8,
        isActive: true,
        tags: ["substance abuse", "addiction", "treatment", "recovery"]
      },

      // EATING DISORDERS
      {
        title: "National Eating Disorders Association Helpline",
        description: "Support, resources, and treatment options for eating disorders. Screening tool and recovery resources available.",
        type: "hotline",
        category: "eating_disorders",
        contact: {
          phone: "1-800-931-2237",
          website: "https://www.nationaleatingdisorders.org",
          textNumber: "Text NEDA to 741741"
        },
        availability: "business_hours",
        hours: "Monday-Thursday, 11 AM - 9 PM ET; Friday, 11 AM - 5 PM ET",
        languages: ["English"],
        region: "us",
        isVerified: true,
        priority: 7,
        isActive: true,
        tags: ["eating disorders", "anorexia", "bulimia", "body image"]
      },

      // VETERAN SUPPORT
      {
        title: "Veterans Crisis Line",
        description: "Free, confidential support for veterans in crisis and their families and friends. Connects veterans with qualified responders.",
        type: "hotline",
        category: "veteran_support",
        contact: {
          phone: "988, Press 1",
          website: "https://www.veteranscrisisline.net",
          textNumber: "838255",
          chatUrl: "https://www.veteranscrisisline.net/get-help-now/chat"
        },
        availability: "24/7",
        languages: ["English"],
        region: "us",
        isVerified: true,
        priority: 9,
        isActive: true,
        tags: ["veterans", "military", "ptsd", "suicide prevention"]
      },

      // YOUTH SUPPORT
      {
        title: "Boys Town National Hotline",
        description: "Crisis, resource and referral line for teens and parents. Trained counselors help with family problems, depression, suicide, and more.",
        type: "hotline",
        category: "youth_support",
        contact: {
          phone: "1-800-448-3000",
          website: "https://www.boystown.org/hotline",
          email: "hotline@boystown.org"
        },
        availability: "24/7",
        languages: ["English", "Spanish"],
        region: "us",
        isVerified: true,
        priority: 8,
        isActive: true,
        tags: ["youth", "teens", "family", "parenting", "school"]
      },
      {
        title: "National Runaway Safeline",
        description: "Crisis intervention and support for youth who have run away or are thinking about running away, and their families.",
        type: "hotline",
        category: "youth_support",
        contact: {
          phone: "1-800-786-2929",
          website: "https://www.1800runaway.org"
        },
        availability: "24/7",
        languages: ["English"],
        region: "us",
        isVerified: true,
        priority: 8,
        isActive: true,
        tags: ["runaway", "homeless youth", "family reunification"]
      },

      // ELDER ABUSE
      {
        title: "Eldercare Locator",
        description: "Connects older adults and their caregivers with local services including elder abuse reporting and support.",
        type: "hotline",
        category: "crisis_support",
        contact: {
          phone: "1-800-677-1116",
          website: "https://eldercare.acl.gov"
        },
        availability: "business_hours",
        hours: "Monday-Friday, 9 AM - 8 PM ET",
        languages: ["English", "Spanish"],
        region: "us",
        isVerified: true,
        priority: 7,
        isActive: true,
        tags: ["elder abuse", "seniors", "caregivers", "aging"]
      },

      // INTERNATIONAL RESOURCES
      {
        title: "International Association for Suicide Prevention",
        description: "Global directory of crisis centers and suicide prevention resources worldwide.",
        type: "website",
        category: "suicide_prevention",
        contact: {
          website: "https://www.iasp.info/resources/Crisis_Centres/"
        },
        availability: "varies",
        languages: ["Multiple languages"],
        region: "global",
        isVerified: true,
        priority: 6,
        isActive: true,
        tags: ["international", "global", "suicide prevention", "directory"]
      },

      // ONLINE RESOURCES
      {
        title: "Crisis Chat Support",
        description: "Online chat support for people in crisis. Anonymous and confidential support from trained volunteers.",
        type: "chat",
        category: "crisis_support",
        contact: {
          website: "https://www.imalive.org",
          chatUrl: "https://www.imalive.org"
        },
        availability: "varies",
        languages: ["English"],
        region: "global",
        isVerified: true,
        priority: 6,
        isActive: true,
        tags: ["online", "chat", "anonymous", "volunteers"]
      }
    ]

    await CrisisResource.insertMany(comprehensiveCrisisResources)
    
    console.log(`🎉 Successfully initialized ${comprehensiveCrisisResources.length} crisis resources!`)
    console.log('\nResources created by category:')
    
    const categories = [...new Set(comprehensiveCrisisResources.map(r => r.category))]
    categories.forEach(category => {
      const count = comprehensiveCrisisResources.filter(r => r.category === category).length
      console.log(`  ${category}: ${count} resources`)
    })
    
  } catch (error) {
    console.error('Error initializing crisis resources:', error)
  } finally {
    mongoose.connection.close()
  }
}

initializeCrisisResources()
