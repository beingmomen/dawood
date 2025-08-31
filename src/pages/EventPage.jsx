import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Share2, Facebook, Twitter, Linkedin, ArrowRight, User, Phone, Mail } from 'lucide-react';

const EventPage = () => {
  const { id } = useParams();

  // Mock event data
  const event = {
    id: 1,
    title: 'ندوة حول التنمية المستدامة',
    description: 'ندوة تفاعلية شاملة لمناقشة استراتيجيات التنمية المستدامة والحلول البيئية المبتكرة في جمهورية مصر العربية، بمشاركة خبراء محليين ودوليين في مجال البيئة والتنمية.',
    fullDescription: `
      <p>تأتي هذه الندوة في إطار الجهود المستمرة لتعزيز الوعي البيئي وتطوير استراتيجيات التنمية المستدامة في جمهورية مصر العربية. ستركز الندوة على عدة محاور رئيسية تشمل:</p>

      <h3>محاور الندوة:</h3>
      <ul>
        <li><strong>الطاقة المتجددة:</strong> استعراض أحدث التقنيات والمشاريع في مجال الطاقة الشمسية وطاقة الرياح</li>
        <li><strong>الاقتصاد الأخضر:</strong> كيفية تحويل الاقتصاد التقليدي إلى اقتصاد مستدام وصديق للبيئة</li>
        <li><strong>التخطيط الحضري المستدام:</strong> تطوير المدن الذكية والمستدامة</li>
        <li><strong>إدارة المياه:</strong> استراتيجيات الحفاظ على الموارد المائية وتطوير تقنيات التحلية</li>
      </ul>

      <h3>المتحدثون:</h3>
      <p>ستضم الندوة نخبة من الخبراء والمتخصصين في مجال التنمية المستدامة من داخل مصر وخارجها، بالإضافة إلى ممثلين من القطاع الحكومي والخاص والمجتمع المدني.</p>

      <h3>الأهداف:</h3>
      <ul>
        <li>رفع مستوى الوعي البيئي في المجتمع</li>
        <li>تبادل الخبرات والتجارب الناجحة في مجال التنمية المستدامة</li>
        <li>وضع توصيات عملية لتطبيق مبادئ التنمية المستدامة</li>
        <li>تعزيز الشراكة بين القطاعات المختلفة</li>
      </ul>
    `,
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200',
    date: '2024-02-15',
    time: '10:00 ص',
    endTime: '4:00 م',
    location: 'قاعة المؤتمرات الكبرى - فندق النيل ريتز كارلتون القاهرة',
    attendees: 250,
    maxAttendees: 300,
    status: 'قادم',
    organizer: 'محمد عبدالعليم داود',
    contact: {
      phone: '+20 10 123 4567',
      email: 'events@mohammed-journalist.com',
    },
    agenda: [
      { time: '10:00 - 10:30', activity: 'التسجيل واستقبال المشاركين' },
      { time: '10:30 - 11:00', activity: 'كلمة الافتتاح' },
      { time: '11:00 - 12:00', activity: 'الجلسة الأولى: الطاقة المتجددة في مصر' },
      { time: '12:00 - 12:15', activity: 'استراحة' },
      { time: '12:15 - 1:15', activity: 'الجلسة الثانية: الاقتصاد الأخضر' },
      { time: '1:15 - 2:15', activity: 'استراحة الغداء' },
      { time: '2:15 - 3:15', activity: 'الجلسة الثالثة: التخطيط الحضري المستدام' },
      { time: '3:15 - 4:00', activity: 'جلسة النقاش والتوصيات' },
    ],
    speakers: [
      {
        name: 'د. سارة العتيبي',
        title: 'خبيرة الطاقة المتجددة',
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'م. خالد الأحمد',
        title: 'مستشار التخطيط الحضري',
        image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      {
        name: 'د. فاطمة النجار',
        title: 'خبيرة إدارة المياه',
        image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    ],
  };

  const relatedEvents = [
    {
      id: 2,
      title: 'ورشة عمل حول حقوق الشباب',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-20',
    },
    {
      id: 3,
      title: 'مؤتمر الصحافة الاستقصائية',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2023-12-10',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-brand">الرئيسية</Link>
            <span>/</span>
            <span className="text-brand">الفعاليات</span>
            <span>/</span>
            <span className="text-brand">{event.title}</span>
          </div>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Event Header */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-2 rounded-full font-medium ${
                    event.status === 'قادم' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="p-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">
                  {event.title}
                </h1>

                {/* Event Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-reverse space-x-3">
                      <Calendar className="w-5 h-5 text-brand" />
                      <span className="text-gray-700">{new Date(event.date).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-3">
                      <Clock className="w-5 h-5 text-brand" />
                      <span className="text-gray-700">{event.time} - {event.endTime}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-reverse space-x-3">
                      <MapPin className="w-5 h-5 text-brand" />
                      <span className="text-gray-700">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-3">
                      <Users className="w-5 h-5 text-brand" />
                      <span className="text-gray-700">{event.attendees} مشارك متوقع</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">نبذة عن الفعالية</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
                  <div 
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: event.fullDescription }}
                  />
                </div>

                {/* Agenda */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-dark mb-6">جدول الأعمال</h2>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex space-x-reverse space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-24 text-brand font-medium text-sm flex-shrink-0">
                          {item.time}
                        </div>
                        <div className="text-gray-700">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Speakers */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-dark mb-6">المتحدثون</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="text-center">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                        />
                        <h3 className="font-bold text-gray-800">{speaker.name}</h3>
                        <p className="text-gray-600 text-sm">{speaker.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold mb-4">شارك الفعالية</h3>
                  <div className="flex space-x-reverse space-x-4">
                    <button className="flex items-center space-x-reverse space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Facebook className="w-5 h-5" />
                      <span>فيسبوك</span>
                    </button>
                    <button className="flex items-center space-x-reverse space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                      <Twitter className="w-5 h-5" />
                      <span>تويتر</span>
                    </button>
                    <button className="flex items-center space-x-reverse space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                      <Linkedin className="w-5 h-5" />
                      <span>لينكد إن</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-8"
            >
              <h3 className="text-xl font-bold text-brand-dark mb-6">معلومات التواصل</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-reverse space-x-3">
                  <User className="w-5 h-5 text-brand" />
                  <span className="text-gray-700">{event.organizer}</span>
                </div>
                <div className="flex items-center space-x-reverse space-x-3">
                  <Phone className="w-5 h-5 text-brand" />
                  <span className="text-gray-700">{event.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-reverse space-x-3">
                  <Mail className="w-5 h-5 text-brand" />
                  <span className="text-gray-700">{event.contact.email}</span>
                </div>
              </div>
            </motion.div>

            {/* Related Events */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-brand-dark mb-6">فعاليات أخرى</h3>
              <div className="space-y-4">
                {relatedEvents.map((relatedEvent) => (
                  <Link
                    key={relatedEvent.id}
                    to={`/event/${relatedEvent.id}`}
                    className="flex space-x-reverse space-x-4 group"
                  >
                    <img
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 group-hover:text-brand transition-colors line-clamp-2">
                        {relatedEvent.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(relatedEvent.date).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-reverse space-x-2 bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowRight className="w-5 h-5" />
            <span>العودة إلى الرئيسية</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default EventPage;