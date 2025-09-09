import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: 'ندوة حول التنمية المستدامة',
      description: 'ندوة تفاعلية لمناقشة استراتيجيات التنمية المستدامة والحلول البيئية المبتكرة',
      date: '2024-02-15',
      time: '10:00 ص',
      location: 'قاعة المؤتمرات الكبرى',
      attendees: 250,
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'قادم',
    },
    {
      id: 2,
      title: 'ورشة عمل حول حقوق الشباب',
      description: 'ورشة تدريبية متخصصة لتعزيز وعي الشباب بحقوقهم وواجباتهم المدنية',
      date: '2024-01-20',
      time: '2:00 م',
      location: 'مركز الشباب الثقافي',
      attendees: 120,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'منتهي',
    },
    {
      id: 3,
      title: 'مؤتمر الصحافة الاستقصائية',
      description: 'مؤتمر سنوي يجمع الصحفيين لمناقشة أحدث تقنيات الصحافة الاستقصائية',
      date: '2023-12-10',
      time: '9:00 ص',
      location: 'فندق الشيراتون',
      attendees: 180,
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'منتهي',
    },
  ];

  return (
    <section className="py-20 bg-background hide-activities-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            الأنشطة والفعاليات
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            مجموعة متنوعة من الفعاليات والأنشطة التي تهدف إلى خدمة المجتمع وتطوير الوعي العام
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    activity.status === 'قادم' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {activity.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {activity.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-reverse space-x-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 text-brand" />
                    <span>{new Date(activity.date).toLocaleDateString('ar-SA')}</span>
                  </div>
                  
                  <div className="flex items-center space-x-reverse space-x-3 text-sm text-gray-500">
                    <Clock className="w-4 h-4 text-brand" />
                    <span>{activity.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-reverse space-x-3 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-brand" />
                    <span>{activity.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-reverse space-x-3 text-sm text-gray-500">
                    <Users className="w-4 h-4 text-brand" />
                    <span>{activity.attendees} مشارك</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/event/${activity.id}`}
                    className="w-full bg-brand text-white py-3 rounded-lg font-medium hover:bg-brand-dark transition-colors block text-center"
                  >
                    {activity.status === 'قادم' ? 'عرض التفاصيل' : 'عرض التفاصيل'}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
            عرض جميع الفعاليات
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;