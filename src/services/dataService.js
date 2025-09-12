import ApiService from "./api.js";

class DataService {
  // Get paginated articles from dedicated endpoint
  async getArticles(params = {}) {
    try {
      const { page = 1, limit = 12, ...otherParams } = params;
      const response = await ApiService.get("/articles", {
        page,
        limit,
        ...otherParams,
      });

      // console.warn("response", response);

      if (
        response.status === "success" &&
        response.data &&
        Array.isArray(response.data)
      ) {
        const data = {
          data:
            response.data.map((article) => ({
              id: article._id || article.id,
              title: article.title,
              excerpt:
                article.description ||
                article.content?.substring(0, 200) + "...",
              content: article.content,
              image: article.image,
              date: article.date,
              views: article.views || "0",
              category: article.tags?.[0] || "عام",
              readTime: `${article.readTime || 5} دقائق`,
              author: article.author || "محمد عبدالعليم داود",
              tags: article.tags || [],
            })) || [],
          pagination: {
            currentPage: page,
            totalPages: Math.ceil((response.total || 0) / limit),
            totalItems: response.total || 0,
            hasNext: page * limit < (response.total || 0),
            hasPrev: page > 1,
          },
        };

        // console.warn("data", data);

        return data;
      }

      throw new Error("Invalid API response format");
    } catch (error) {
      console.warn("Articles API unavailable, this is expected in development");
      // Return sample data structure for development
      const sampleArticles = [
        {
          id: "1",
          title: "مقال تجريبي أول",
          excerpt: "هذا مقال تجريبي للاختبار...",
          content: "محتوى المقال التجريبي الأول",
          image: "/api/placeholder/400/250",
          date: "2024-01-15",
          views: "150",
          category: "سياسة",
          readTime: "5 دقائق",
          author: "محمد عبدالعليم داود",
          tags: ["سياسة", "تحليل"],
        },
        {
          id: "2",
          title: "مقال تجريبي ثاني",
          excerpt: "هذا مقال تجريبي آخر للاختبار...",
          content: "محتوى المقال التجريبي الثاني",
          image: "/api/placeholder/400/250",
          date: "2024-01-10",
          views: "200",
          category: "اقتصاد",
          readTime: "7 دقائق",
          author: "محمد عبدالعليم داود",
          tags: ["اقتصاد", "تحليل"],
        },
      ];

      return {
        data: sampleArticles,
        pagination: {
          currentPage: params.page || 1,
          totalPages: 3,
          totalItems: 25,
          hasNext: (params.page || 1) < 3,
          hasPrev: (params.page || 1) > 1,
        },
      };
    }
  }

  async getArticle(id) {
    try {
      const response = await ApiService.get(`/articles/${id}`);

      if (response.success && response.data) {
        const article = response.data;
        return {
          data: {
            id: article._id || article.id,
            title: article.title,
            excerpt:
              article.description || article.content?.substring(0, 200) + "...",
            content: article.content,
            image: article.image,
            date: article.date,
            views: article.views || "0",
            category: article.tags?.[0] || "عام",
            readTime: `${article.readTime || 5} دقائق`,
            author: article.author || "محمد عبدالعليم داود",
            tags: article.tags || [],
          },
        };
      }

      throw new Error("Article not found");
    } catch (error) {
      console.warn("Article API unavailable, this is expected in development");
      return { data: null };
    }
  }

  // Get all data from API endpoint (for other components)
  async getAllData() {
    try {
      const response = await ApiService.get("/data/all");
      // Transform the response to match expected format
      if (response && response.data && Array.isArray(response.data)) {
        return {
          articles: response.data.map((article) => ({
            _id: article._id || article.id,
            title: article.title,
            description: article.description,
            content: article.content,
            image: article.image,
            date: article.date,
            views: article.views || 0,
            author: article.author,
            tags: article.tags || [],
            published: article.published,
            readTime: article.readTime || 1,
            documentNumber: article.documentNumber,
          })),
        };
      }
      return response;
    } catch (error) {
      console.warn("API unavailable, this is expected in development");
      // Return mock data when API is unavailable
      return {
        articles: [
          {
            _id: "1",
            title: "مقال تجريبي أول",
            description:
              "هذا وصف للمقال التجريبي الأول يحتوي على معلومات مفيدة ومهمة للقارئ",
            image: "https://via.placeholder.com/400x300",
            date: new Date().toISOString(),
            views: 150,
            category: "سياسة",
          },
          {
            _id: "2",
            title: "مقال تجريبي ثاني",
            description:
              "هذا وصف للمقال التجريبي الثاني يتناول موضوعات اجتماعية مهمة",
            image: "https://via.placeholder.com/400x300",
            date: new Date(Date.now() - 86400000).toISOString(),
            views: 200,
            category: "اجتماعي",
          },
          {
            _id: "3",
            title: "مقال تجريبي ثالث",
            description:
              "هذا وصف للمقال التجريبي الثالث يناقش قضايا اقتصادية معاصرة",
            image: "https://via.placeholder.com/400x300",
            date: new Date(Date.now() - 172800000).toISOString(),
            views: 120,
            category: "اقتصاد",
          },
          {
            _id: "4",
            title: "مقال تجريبي رابع",
            description:
              "هذا وصف للمقال التجريبي الرابع يتحدث عن التطورات التكنولوجية",
            image: "https://via.placeholder.com/400x300",
            date: new Date(Date.now() - 259200000).toISOString(),
            views: 180,
            category: "تكنولوجيا",
          },
          {
            _id: "5",
            title: "مقال تجريبي خامس",
            description:
              "هذا وصف للمقال التجريبي الخامس يناقش قضايا ثقافية متنوعة",
            image: "https://via.placeholder.com/400x300",
            date: new Date(Date.now() - 345600000).toISOString(),
            views: 95,
            category: "ثقافة",
          },
          {
            _id: "6",
            title: "مقال تجريبي سادس",
            description:
              "هذا وصف للمقال التجريبي السادس يتناول موضوعات رياضية مختلفة",
            image: "https://via.placeholder.com/400x300",
            date: new Date(Date.now() - 432000000).toISOString(),
            views: 220,
            category: "رياضة",
          },
        ],
      };
    }
  }

  // Transform API data to match component expectations
  transformApiData(apiData) {
    if (!apiData.success || !apiData.data) {
      throw new Error("Invalid API response format");
    }

    const { data } = apiData;

    return {
      articles:
        data.articles?.items?.map((article) => ({
          id: article._id || article.id,
          title: article.title,
          excerpt:
            article.description || article.content?.substring(0, 200) + "...",
          content: article.content,
          image: article.image,
          date: article.date,
          views: article.views || "0",
          category: article.tags?.[0] || "عام",
          readTime: `${article.readTime || 5} دقائق`,
          author: article.author || "محمد عبدالعليم داود",
          tags: article.tags || [],
        })) || [],

      achievements:
        data.achievements?.items?.map((achievement) => ({
          id: achievement._id || achievement.id,
          iconName: achievement.iconName || "award",
          title: achievement.title,
          description: achievement.content || achievement.description,
          year: achievement.year
            ? new Date(achievement.year).getFullYear().toString()
            : "2023",
          colorName: achievement.colorName || "yellow",
        })) || [],

      personalInfo: data.personalInfo?.items?.[0]
        ? {
            name: data.personalInfo.items[0].name,
            title: data.personalInfo.items[0].title,
            email: data.personalInfo.items[0].email,
            phone: data.personalInfo.items[0].phone,
            location: data.personalInfo.items[0].location,
            summary: data.personalInfo.items[0].summary,
            image: data.personalInfo.items[0].image,
            education:
              data.personalInfo.items[0].education?.map((edu) => ({
                degree: edu.degree,
                institution: edu.institution,
                year: `${new Date(edu.startDate).getFullYear()}${
                  edu.endDate
                    ? ` - ${new Date(edu.endDate).getFullYear()}`
                    : " - حتى الآن"
                }`,
                description: edu.description,
              })) || [],
            experience:
              data.personalInfo.items[0].experience?.map((exp) => ({
                position: exp.position,
                organization: exp.company,
                period: `${new Date(exp.startDate).getFullYear()}${
                  exp.current ? " - حتى الآن" : ""
                }`,
                responsibilities: [exp.description],
              })) || [],
            languages: data.personalInfo.items[0].languages || [],
          }
        : null,

      pressStatements:
        data.pressStatements?.items?.map((statement) => ({
          id: statement._id || statement.id,
          title: statement.title,
          excerpt: statement.excerpt || statement.description,
          content: statement.content,
          date: statement.date,
          category: statement.categoryId?.name || statement.category || "عام",
          urgent: statement.urgent || false,
          views: statement.views || "0",
          shares: statement.shares || "0",
          author: statement.author || "محمد عبدالعليم داود",
          tags: statement.tags || [],
        })) || [],

      media: {
        images:
          data.media?.items
            ?.filter((item) => item.type === "image")
            ?.map((item) => ({
              id: item._id || item.id,
              src: item.src,
              title: item.title,
              description: item.description,
              date: item.date,
              category: item.tags?.[0] || "عام",
            })) || [],
        videos:
          data.media?.items
            ?.filter((item) => item.type === "video")
            ?.map((item) => ({
              id: item._id || item.id,
              videoId: item.src,
              title: item.title,
              description: item.description,
              duration: item.duration || "0:00",
              views: item.views || "0",
              date: item.date,
            })) || [],
        documents:
          data.media?.items
            ?.filter((item) => item.type === "document")
            ?.map((item) => ({
              id: item._id || item.id,
              title: item.title,
              description: item.description,
              type: item.fileType || "PDF",
              size: item.size || "0 MB",
              downloads: item.downloads || "0",
              date: item.date,
            })) || [],
      },
    };
  }

  // Personal Info
  async getPersonalInfo() {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.personalInfo };
  }

  // Achievements
  async getAchievements() {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.achievements };
  }

  // Events (empty for now since not in API)
  async getEvents(params = {}) {
    return { data: [] };
  }

  async getEvent(id) {
    return { data: null };
  }

  // Media
  async getMedia(type = null) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);

    if (type) {
      return { data: transformedData.media[type] || [] };
    }

    return { data: transformedData.media };
  }

  // Press Statements
  async getPressStatements(params = {}) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    return { data: transformedData.pressStatements };
  }

  async getPressStatement(id) {
    const allData = await this.getAllData();
    const transformedData = this.transformApiData(allData);
    const statement = transformedData.pressStatements.find((s) => s.id === id);
    return { data: statement };
  }

  // Media Coverage (empty for now since not in API)
  async getMediaCoverage(params = {}) {
    return { data: [] };
  }
}

export default new DataService();
