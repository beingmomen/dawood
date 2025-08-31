# Backend Schema for Express and Mongoose

This document outlines the data models based on the existing JSON data files. Each model corresponds to a MongoDB collection, with fields inferred from the data structures. Relationships are minimal as the data appears mostly independent, but potential references are noted where applicable.

## 1. Article Model
- **Collection**: articles
- **Fields**:
  - id: Number (unique identifier)
  - title: String
  - excerpt: String
  - content: String (optional, rich text)
  - image: String (URL, optional)
  - date: Date
  - views: String (e.g., '12.5K')
  - category: String
  - readTime: String (e.g., '8 دقائق')
  - author: String
  - tags: Array of Strings
- **Relationships**: None explicit; author is consistent across documents.

## 2. Event Model
- **Collection**: events
- **Fields**:
  - id: Number
  - title: String
  - description: String
  - fullDescription: String (optional, rich text)
  - image: String (URL, optional)
  - date: Date
  - time: String
  - endTime: String (optional)
  - location: String
  - attendees: Number
  - status: String
  - organizer: String
  - contact: Object { phone: String, email: String }
- **Relationships**: None.

## 3. Media Models
Media is structured with separate arrays for images, videos, and documents. Suggest separate models for each.

### Image Model
- **Collection**: images
- **Fields**:
  - id: Number
  - src: String (URL)
  - title: String
  - description: String
  - date: Date
  - category: String

### Video Model
- **Collection**: videos
- **Fields**:
  - id: Number
  - videoId: String
  - title: String
  - description: String
  - duration: String
  - views: String
  - date: Date

### Document Model
- **Collection**: documents
- **Fields**:
  - id: Number
  - title: String
  - description: String
  - type: String (e.g., 'PDF')
  - size: String (e.g., '2.5 MB')
  - downloads: String (e.g., '1.2K')
  - date: Date
- **Relationships**: None.

## 4. MediaCoverage Model
- **Collection**: mediaCoverages
- **Fields**:
  - id: Number
  - title: String
  - outlet: String
  - date: Date
  - type: String
  - description: String
  - thumbnail: String (URL)
  - link: String
  - views: String
  - duration: String (optional)
- **Relationships**: None.

## 5. PersonalInfo Model
- **Collection**: personalInfos (likely singleton)
- **Fields**:
  - name: String
  - title: String
  - email: String
  - phone: String
  - location: String
  - summary: String
  - image: String (URL)
  - education: Array of Objects { degree: String, institution: String, year: String, description: String }
  - experience: Array of Objects { position: String, organization: String, period: String, responsibilities: Array of Strings }
  - achievements: Array of Schema.Types.ObjectId (ref: 'Achievement')
  - languages: Array of Objects { name: String, level: String }
- **Relationships**: References Achievement model; could reference in other models (e.g., author in Articles), but not implemented in data.

## 6. PressStatement Model
- **Collection**: pressStatements
- **Fields**:
  - id: Number
  - title: String
  - excerpt: String
  - content: String (rich text)
  - date: Date
  - category: String
  - urgent: Boolean
  - views: String
  - shares: String
  - author: String
  - tags: Array of Strings
- **Relationships**: None.

## 7. Achievement Model
- **Collection**: achievements
- **Fields**:
  - id: Number
  - title: String
  - organization: String
  - year: String
- **Relationships**: Referenced in PersonalInfo.

### Notes
- All models should use Mongoose Schema with appropriate types (e.g., Schema.Types.ObjectId for _id).
- Add timestamps for createdAt and updatedAt.
- For rich text fields (content, fullDescription), consider using String or a rich text plugin.
- Relationships can be added if needed, e.g., reference PersonalInfo _id in author fields.