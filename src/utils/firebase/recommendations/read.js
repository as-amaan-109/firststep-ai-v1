import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../config";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import toast from "react-hot-toast";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const promptTemplate = (assessmentData) => `
Based on the following assessment data, provide career recommendations in a structured JSON format.
Assessment data: ${JSON.stringify(assessmentData)}
`;

const careerAnalysisSchema = {
  description: "Career path analysis data structure",
  type: SchemaType.OBJECT,
  properties: {
    career_analysis: {
      type: SchemaType.OBJECT,
      properties: {
        career: {
          type: SchemaType.STRING,
          description: "The career path being analyzed",
          example: "Data Analyst",
        },
        matchScore: {
          type: SchemaType.NUMBER,
          description: "The match score of the career path with the user",
          example: 85,
        },
        reasonForMatch: {
          type: SchemaType.STRING,
          description: "The reason why the career path is a good match",
          example: "Strong interest in data analytics, programming skills, and academic performance in Physics.",
        },
        industryOutlook: {
          type: SchemaType.OBJECT,
          description: "Outlook of the industry related to the career path",
          properties: {
            growthRate: {
              type: SchemaType.STRING,
              description: "The growth rate of the industry",
              example: "High (projected 20% growth over the next 5 years)",
            },
            marketDemand: {
              type: SchemaType.STRING,
              description: "Demand for professionals in this industry",
              example: "Very High, companies across all sectors are seeking data analysts.",
            },
            futureProspects: {
              type: SchemaType.STRING,
              description: "Future prospects of the industry",
              example: "Excellent, as data volume and complexity continue to increase.",
            },
            topRecruiters: {
              type: SchemaType.ARRAY,
              description: "Top recruiters in the industry",
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  type: {
                    type: SchemaType.STRING,
                    description: "The type of companies recruiting",
                    example: "Tech Companies",
                  },
                  companies: {
                    type: SchemaType.ARRAY,
                    description: "List of companies hiring",
                    items: { type: SchemaType.STRING },
                    example: ["Google", "Amazon", "Microsoft", "Facebook"],
                  },
                  averagePackage: {
                    type: SchemaType.STRING,
                    description: "The average salary package offered",
                    example: "₹12 LPA - ₹25 LPA",
                  },
                },
                required: ["type", "companies", "averagePackage"],
              },
            },
          },
          required: ["growthRate", "marketDemand", "futureProspects", "topRecruiters"],
        },
        subFields: {
          type: SchemaType.ARRAY,
          description: "List of subfields within the career",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: {
                type: SchemaType.STRING,
                description: "The name of the subfield",
                example: "Business Intelligence Analyst",
              },
              description: {
                type: SchemaType.STRING,
                description: "Description of the subfield",
                example: "Focuses on analyzing business data to identify trends and insights to improve decision-making.",
              },
              currentTrends: {
                type: SchemaType.ARRAY,
                description: "Current trends in the subfield",
                items: { type: SchemaType.STRING },
                example: ["Data visualization tools (Tableau, Power BI)", "Cloud-based BI solutions", "AI-powered analytics"],
              },
              requiredSkills: {
                type: SchemaType.OBJECT,
                description: "Skills required for the subfield",
                properties: {
                  technical: {
                    type: SchemaType.ARRAY,
                    description: "Technical skills required",
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        skill: {
                          type: SchemaType.STRING,
                          description: "The skill required",
                          example: "SQL",
                        },
                        technologies: {
                          type: SchemaType.ARRAY,
                          description: "Technologies used for the skill",
                          items: { type: SchemaType.STRING },
                          example: ["MySQL", "PostgreSQL", "Oracle"],
                        },
                        proficiencyLevel: {
                          type: SchemaType.STRING,
                          description: "The proficiency level required for the skill",
                          enum: ["Beginner", "Intermediate", "Advanced"],
                          example: "Intermediate",
                        },
                      },
                      required: ["skill", "technologies", "proficiencyLevel"],
                    },
                  },
                  soft: {
                    type: SchemaType.ARRAY,
                    description: "Soft skills required",
                    items: { type: SchemaType.STRING },
                    example: ["Communication", "Problem-solving", "Critical Thinking", "Data Storytelling"],
                  },
                },
                required: ["technical", "soft"],
              },
              preparationResources: {
                type: SchemaType.OBJECT,
                description: "Resources to prepare for the subfield",
                properties: {
                  courses: {
                    type: SchemaType.ARRAY,
                    description: "Courses to prepare for the subfield",
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        name: {
                          type: SchemaType.STRING,
                          description: "Course name",
                          example: "Google Data Analytics Professional Certificate",
                        },
                        platform: {
                          type: SchemaType.STRING,
                          description: "Platform offering the course",
                          example: "Coursera",
                        },
                        duration: {
                          type: SchemaType.STRING,
                          description: "Duration of the course",
                          example: "6 months",
                        },
                        cost: {
                          type: SchemaType.STRING,
                          description: "Cost of the course",
                          example: "₹1500 per month",
                        },
                        certification: {
                          type: SchemaType.BOOLEAN,
                          description: "Whether the course provides certification",
                          example: true,
                        },
                        link: {
                          type: SchemaType.STRING,
                          description: "Link to the course",
                          example: "https://www.coursera.org/professional-certificates/google-data-analytics",
                        },
                      },
                      required: ["name", "platform", "duration", "cost", "certification", "link"],
                    },
                  },
                },
                required: ["courses"],
              },
            },
            required: ["name", "description", "currentTrends", "requiredSkills", "preparationResources"],
          },
        },
      },
      required: ["career", "matchScore", "reasonForMatch", "industryOutlook", "subFields"],
    },
  },
  required: ["career_analysis"],
};


export const getRecommendations = async ({ uid, assessmentData }) => {
  try {
    // // Fetch the user document which contains the assessment data
    // const userDoc = await getDoc(doc(db, `users/${uid}`));
    // console.log("💪🏼", userDoc)

    // if (!userDoc.exists()) {
    //     throw new Error("User not found");
    // }

    // const userData = userDoc.data()?.assessment;
    // console.log("🧠", userData)

    // // Check if assessment data exists
    // if (!userData) {
    //     throw new Error("No assessment data found");
    // }

    // Get recommendations from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",generationConfig: {
      responseMimeType: "application/json",
      responseSchema: careerAnalysisSchema,
    }, });
    const prompt = promptTemplate(assessmentData);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the response text as JSON
    let recommendations = null;
    try {
      recommendations = JSON.parse(text);
    } catch (err) {
      console.error("Error parsing AI response:", err);
      console.error("Raw response:", text);
      throw new Error("Failed to parse recommendations from AI response");
    }

    console.log("Ai Response::", recommendations?.career_analysis);

    // Store recommendations back in the user document
    await setDoc(
      doc(db, `users/${uid}`),
      {
        career_analysis:recommendations.career_analysis,
       generatedAt: Timestamp.now(),
      },
      { merge: true }
    );
    toast.success("Roadmap Inserted in DB Successfully");
    console.log("🔥", recommendations?.career_analysis);

    return recommendations;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
};

export const getRoadmap = async ({ uid }) => {
  const res = await getDoc(doc(db, `users/${uid}`));
  if (await res.exists()) {
    return res.data()?.recommendations?.career_analysis;
  } else {
    return null;
    // throw new Error("Assessment is Not Submitted");
  }
};

