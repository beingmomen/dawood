import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Languages, 
  Phone, 
  Mail, 
  MapPin,
  Download,
  Calendar
} from 'lucide-react';
import personalInfo from '../data/personalInfo.json';

const CVPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            السيرة الذاتية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نظرة شاملة على المسيرة المهنية والإنجازات في مجالي الصحافة والعمل البرلماني
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-center mb-6">
                <img
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand/20"
                />
                <h2 className="text-2xl font-bold text-brand-dark mb-2">{personalInfo.name}</h2>
                <p className="text-brand font-medium">{personalInfo.title}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-reverse space-x-3">
                  <Mail className="w-5 h-5 text-brand" />
                  <span className="text-gray-600">{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-reverse space-x-3">
                  <Phone className="w-5 h-5 text-brand" />
                  <span className="text-gray-600">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-reverse space-x-3">
                  <MapPin className="w-5 h-5 text-brand" />
                  <span className="text-gray-600">{personalInfo.location}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors flex items-center justify-center space-x-reverse space-x-2">
                <Download className="w-5 h-5" />
                <span>تحميل السيرة الذاتية</span>
              </button>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center space-x-reverse space-x-2">
                <Languages className="w-6 h-6 text-brand" />
                <span>اللغات</span>
              </h3>
              <div className="space-y-3">
                {personalInfo.languages.map((language, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium text-gray-700">{language.name}</span>
                    <span className="text-brand">{language.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-brand-dark mb-6">نبذة شخصية</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{personalInfo.summary}</p>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-brand-dark mb-8 flex items-center space-x-reverse space-x-2">
                <Briefcase className="w-6 h-6 text-brand" />
                <span>الخبرة المهنية</span>
              </h3>
              <div className="space-y-8">
                {personalInfo.experience.map((job, index) => (
                  <div key={index} className="relative">
                    {index !== personalInfo.experience.length - 1 && (
                      <div className="absolute right-4 top-12 w-0.5 h-full bg-gray-200"></div>
                    )}
                    <div className="flex space-x-reverse space-x-6">
                      <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-reverse space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-brand font-medium">{job.period}</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{job.position}</h4>
                        <p className="text-brand mb-4">{job.organization}</p>
                        <ul className="space-y-2">
                          {job.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="text-gray-600 flex items-start space-x-reverse space-x-2">
                              <span className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0"></span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-brand-dark mb-8 flex items-center space-x-reverse space-x-2">
                <GraduationCap className="w-6 h-6 text-brand" />
                <span>التعليم</span>
              </h3>
              <div className="space-y-6">
                {personalInfo.education.map((edu, index) => (
                  <div key={index} className="border-r-4 border-brand pr-6">
                    <div className="flex items-center space-x-reverse space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-brand font-medium">{edu.year}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{edu.degree}</h4>
                    <p className="text-brand mb-2">{edu.institution}</p>
                    <p className="text-gray-600">{edu.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-brand-dark mb-8 flex items-center space-x-reverse space-x-2">
                <Award className="w-6 h-6 text-brand" />
                <span>الجوائز والتكريمات</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalInfo.achievements.map((achievement, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-brand" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{achievement.title}</h4>
                    <p className="text-brand mb-1">{achievement.organization}</p>
                    <p className="text-gray-500 text-sm">{achievement.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPage;