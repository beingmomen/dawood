// Types converted to JSDoc comments for documentation

/**
 * @typedef {Object} PersonalInfo
 * @property {string} id
 * @property {string} name
 * @property {string} title
 * @property {string} summary
 * @property {string} [bio]
 * @property {string} [image]
 * @property {Object} [contact]
 * @property {string} [contact.email]
 * @property {string} [contact.phone]
 * @property {Object} [contact.social]
 * @property {string} [contact.social.facebook]
 * @property {string} [contact.social.twitter]
 * @property {string} [contact.social.linkedin]
 */

/**
 * @typedef {Object} Article
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} [excerpt]
 * @property {string} publishedAt
 * @property {string} [updatedAt]
 * @property {string} [category]
 * @property {string[]} [tags]
 * @property {string} [image]
 * @property {string} [slug]
 */

/**
 * @typedef {Object} PressStatement
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} [excerpt]
 * @property {string} publishedAt
 * @property {string} [updatedAt]
 * @property {string} [category]
 * @property {string[]} [tags]
 * @property {string} [image]
 * @property {string} [slug]
 */

/**
 * @typedef {Object} MediaItem
 * @property {string} id
 * @property {string} title
 * @property {'image'|'video'|'audio'|'document'} type
 * @property {string} url
 * @property {string} [thumbnail]
 * @property {string} [description]
 * @property {string} publishedAt
 * @property {string} [category]
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} date
 * @property {string} [category]
 * @property {string} [image]
 */

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} date
 * @property {'meeting'|'event'|'speech'|'visit'|'other'} type
 * @property {string} [location]
 * @property {string} [image]
 */

/**
 * @typedef {Object} GlobalData
 * @property {Object} personalInfo
 * @property {PersonalInfo[]} personalInfo.items
 * @property {Article[]} articles
 * @property {PressStatement[]} pressStatements
 * @property {MediaItem[]} [media]
 * @property {Achievement[]} [achievements]
 * @property {Activity[]} [activities]
 */

/**
 * @typedef {Object} APIResponse
 * @property {*} data
 * @property {string} [message]
 * @property {number} [status]
 */

/**
 * @typedef {Object} PaginationData
 * @property {*[]} items
 * @property {number} total
 * @property {number} page
 * @property {number} limit
 * @property {number} totalPages
 */