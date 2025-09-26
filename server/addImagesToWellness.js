import mongoose from 'mongoose'
import WellnessResource from './models/WellnessResource.js'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/zenzone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

async function addImagesToWellnessResources() {
  try {
    console.log('Adding images to wellness resources...\n')

    // Define image mappings based on resource titles and categories
    const imageUpdates = [
      {
        title: 'Understanding Anxiety: A Beginner\'s Guide',
        imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Guided Meditation for Stress Relief',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Building Healthy Sleep Habits',
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Breathing Exercises for Anxiety',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Managing Depression: Self-Care Strategies',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Mindful Walking Meditation',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Digital Detox: Reclaiming Your Mental Space',
        imageUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Emotional Regulation Techniques',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Building Healthy Boundaries',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Mindful Eating for Mental Wellness',
        imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Stress Management in Daily Life',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Nature Connection for Mental Health',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop&q=80'
      },
      {
        title: 'Self-Compassion and Inner Kindness',
        imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop&q=80'
      }
    ]

    let updatedCount = 0
    let skippedCount = 0

    for (const imageUpdate of imageUpdates) {
      console.log(`Processing: ${imageUpdate.title}...`)
      
      // Find resource by title and check if it already has an image
      const resource = await WellnessResource.findOne({ title: imageUpdate.title })
      
      if (!resource) {
        console.log(`⚠️ Resource not found: ${imageUpdate.title}`)
        continue
      }

      if (resource.imageUrl) {
        console.log(`⏭️ Already has image: ${imageUpdate.title}`)
        skippedCount++
        continue
      }

      // Update resource with image URL
      try {
        await WellnessResource.findByIdAndUpdate(
          resource._id,
          { imageUrl: imageUpdate.imageUrl },
          { new: true }
        )
        console.log(`✅ Added image to: ${imageUpdate.title}`)
        updatedCount++
      } catch (error) {
        console.error(`❌ Error updating ${imageUpdate.title}:`, error.message)
      }
    }

    console.log(`\n🎉 Image update complete!`)
    console.log(`✅ Updated: ${updatedCount} resources`)
    console.log(`⏭️ Already had images: ${skippedCount} resources`)
    
    // Display all resources with their image status
    const allResources = await WellnessResource.find({}, 'title imageUrl category').lean()
    console.log(`\n📚 All wellness resources image status:`)
    allResources.forEach(resource => {
      const hasImage = resource.imageUrl ? '🖼️' : '❌'
      console.log(`${hasImage} ${resource.title} (${resource.category})`)
    })

  } catch (error) {
    console.error('Error updating wellness resource images:', error)
  } finally {
    mongoose.connection.close()
  }
}

addImagesToWellnessResources()
