import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";

// Some local networks/ISPs block UDP SRV lookups needed for mongodb+srv://.
// Force a public resolver so `mongodb+srv` URIs resolve correctly.
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import { ProfileModel } from "../src/modules/profile/profile.model";
import { ProjectModel } from "../src/modules/projects/project.model";
import { ExperienceModel } from "../src/modules/experiences/experience.model";
import { SkillCategoryModel } from "../src/modules/skills/skill-category.model";
import { SkillModel } from "../src/modules/skills/skill.model";
import { IndustryModel } from "../src/modules/projects/industry.model";
import { ProjectTypeModel } from "../src/modules/projects/project-type.model";
import { SiteSettingsModel } from "../src/modules/settings/site-settings.model";
import { EducationModel } from "../src/modules/education/education.model";
import { AchievementModel } from "../src/modules/achievements/achievement.model";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  await mongoose.connect(uri, { dbName: process.env.MONGODB_DATABASE });
  console.log("Connected to MongoDB");

  // --- Site settings ------------------------------------------------
  await SiteSettingsModel.deleteMany({});
  await SiteSettingsModel.create({
    siteTitle: "Jidan Fatahillah — Full Stack Web Engineer",
    publicEmail: "jidanfatahillahreal123@gmail.com",
    socialLinks: {
      github: "https://github.com/theCrudify",
      linkedin: "https://linkedin.com/in/fatahillah18",
    },
    contactFormEnabled: true,
    resumeDownloadEnabled: true,
  });
  console.log("Seeded site settings");

  // --- Profile --------------------------------------------------------
  await ProfileModel.deleteMany({});
  await ProfileModel.create({
    fullName: "Jidan Fatahillah",
    professionalTitle: "Full Stack Web Engineer",
    shortSummary:
      "Delivering enterprise web applications end-to-end — from requirement gathering and business-process analysis to architecture, development, integration, deployment, and production support.",
    aboutContent:
      "Full Stack Web Engineer delivering enterprise web applications end-to-end, from requirement gathering, business-process analysis, and prototyping to architecture, database design, full-stack development, integration, deployment, and production support. Delivered seven projects across four enterprise clients in manufacturing, mining, procurement, supply chain, customs, and finance. Works across three backend ecosystems (Node.js/TypeScript, Go, and .NET/C#) with React.js and Angular frontends and optimized SQL Server databases. Integrated applications with SAP, Indonesia's CEISA customs platform (Bea Cukai), and the VIDA API for digital signatures and e-Meterai, and built a reusable enterprise full-stack template to standardize architecture and speed up delivery.",
    publicLocation: "Banten, Indonesia",
    publicEmail: "jidanfatahillahreal123@gmail.com",
    availabilityStatus: "open",
    primaryCTA: "View Projects",
    secondaryCTA: "Contact Me",
    statistics: [
      { label: "Enterprise Projects Delivered", value: "7+", order: 1 },
      { label: "Enterprise Clients", value: "4", order: 2 },
      { label: "Backend Ecosystems", value: "3", order: 3 },
      { label: "Internship Experience", value: "1 Year", order: 4 },
      { label: "Professional Experience", value: "1+ Year", order: 5 },
    ],
    isPublished: true,
  });
  console.log("Seeded profile");

  // --- Master / lookup data -------------------------------------------
  await SkillCategoryModel.deleteMany({});
  const skillCategories = await SkillCategoryModel.insertMany([
    {
      name: "Backend",
      slug: "backend",
      description:
        "Modular, layered backend architectures across Node.js/Express, Go, and .NET/C#, with RBAC, validation, and transaction-safe API design.",
      sortOrder: 1,
      isPublished: true,
    },
    {
      name: "Frontend",
      slug: "frontend",
      description:
        "Responsive, role-based interfaces in React.js and Angular with dashboards and approval workflows for enterprise users.",
      sortOrder: 2,
      isPublished: true,
    },
    {
      name: "Database",
      slug: "database",
      description:
        "Relational schema design, query optimization, and transaction-safe data access on SQL Server and MySQL.",
      sortOrder: 3,
      isPublished: true,
    },
    {
      name: "Enterprise Integration",
      slug: "enterprise-integration",
      description:
        "Connecting internal systems to SAP, Indonesia's CEISA customs platform, and the VIDA digital signature API with resilient error handling.",
      sortOrder: 4,
      isPublished: true,
    },
    {
      name: "DevOps & Deployment",
      slug: "devops-deployment",
      description:
        "Containerized delivery with Docker and CI/CD pipelines, deployed to Azure, Linux, on-premise, and client-hosted environments.",
      sortOrder: 5,
      isPublished: true,
    },
    {
      name: "Engineering Practices",
      slug: "engineering-practices",
      description:
        "Requirement gathering, business-process analysis, API documentation, and production support across the full delivery lifecycle.",
      sortOrder: 6,
      isPublished: true,
    },
  ]);
  const categoryIdByName = new Map(skillCategories.map((c) => [c.name, c._id]));
  console.log("Seeded skill categories");

  await SkillModel.deleteMany({});
  const skills = await SkillModel.insertMany([
    { name: "Node.js", slug: "nodejs", categoryId: categoryIdByName.get("Backend"), proficiency: "primary", sortOrder: 1 },
    { name: "Express.js", slug: "expressjs", categoryId: categoryIdByName.get("Backend"), proficiency: "primary", sortOrder: 2 },
    { name: "TypeScript", slug: "typescript", categoryId: categoryIdByName.get("Backend"), proficiency: "primary", sortOrder: 3 },
    { name: "Go", slug: "go", categoryId: categoryIdByName.get("Backend"), proficiency: "proficient", sortOrder: 4 },
    { name: ".NET", slug: "dotnet", categoryId: categoryIdByName.get("Backend"), proficiency: "proficient", sortOrder: 5 },
    { name: "C#", slug: "csharp", categoryId: categoryIdByName.get("Backend"), proficiency: "proficient", sortOrder: 6 },
    { name: "Prisma ORM", slug: "prisma-orm", categoryId: categoryIdByName.get("Backend"), proficiency: "proficient", sortOrder: 7 },
    { name: "REST API Design", slug: "rest-api-design", categoryId: categoryIdByName.get("Backend"), proficiency: "primary", sortOrder: 8 },

    { name: "React.js", slug: "reactjs", categoryId: categoryIdByName.get("Frontend"), proficiency: "primary", sortOrder: 1 },
    { name: "Angular", slug: "angular", categoryId: categoryIdByName.get("Frontend"), proficiency: "primary", sortOrder: 2 },
    { name: "JavaScript", slug: "javascript", categoryId: categoryIdByName.get("Frontend"), proficiency: "primary", sortOrder: 3 },

    { name: "SQL Server", slug: "sql-server", categoryId: categoryIdByName.get("Database"), proficiency: "primary", sortOrder: 1 },
    { name: "MySQL", slug: "mysql", categoryId: categoryIdByName.get("Database"), proficiency: "proficient", sortOrder: 2 },

    { name: "SAP", slug: "sap", categoryId: categoryIdByName.get("Enterprise Integration"), proficiency: "proficient", sortOrder: 1 },
    { name: "CEISA (Bea Cukai)", slug: "ceisa-bea-cukai", categoryId: categoryIdByName.get("Enterprise Integration"), proficiency: "proficient", sortOrder: 2 },
    { name: "VIDA API", slug: "vida-api", categoryId: categoryIdByName.get("Enterprise Integration"), proficiency: "working_knowledge", sortOrder: 3 },

    { name: "Docker", slug: "docker", categoryId: categoryIdByName.get("DevOps & Deployment"), proficiency: "proficient", sortOrder: 1 },
    { name: "GitHub Actions", slug: "github-actions", categoryId: categoryIdByName.get("DevOps & Deployment"), proficiency: "proficient", sortOrder: 2 },
    { name: "GitLab CI/CD", slug: "gitlab-cicd", categoryId: categoryIdByName.get("DevOps & Deployment"), proficiency: "proficient", sortOrder: 3 },
    { name: "Microsoft Azure", slug: "microsoft-azure", categoryId: categoryIdByName.get("DevOps & Deployment"), proficiency: "proficient", sortOrder: 4 },
    { name: "Linux", slug: "linux", categoryId: categoryIdByName.get("DevOps & Deployment"), proficiency: "working_knowledge", sortOrder: 5 },

    { name: "Git", slug: "git", categoryId: categoryIdByName.get("Engineering Practices"), proficiency: "primary", sortOrder: 1 },
    { name: "Swagger / OpenAPI", slug: "swagger-openapi", categoryId: categoryIdByName.get("Engineering Practices"), proficiency: "proficient", sortOrder: 2 },
  ]);
  const skillIdByName = new Map(skills.map((s) => [s.name, s._id]));
  console.log("Seeded skills");

  await IndustryModel.deleteMany({});
  const industries = await IndustryModel.insertMany([
    { name: "Manufacturing", slug: "manufacturing", sortOrder: 1 },
    { name: "Mining", slug: "mining", sortOrder: 2 },
    { name: "Human Resources", slug: "human-resources", sortOrder: 3 },
  ]);
  const industryIdByName = new Map(industries.map((i) => [i.name, i._id]));
  console.log("Seeded industries");

  await ProjectTypeModel.deleteMany({});
  const projectTypes = await ProjectTypeModel.insertMany([
    { name: "Procurement & Purchasing", slug: "procurement-purchasing", sortOrder: 1 },
    { name: "Customs & Compliance", slug: "customs-compliance", sortOrder: 2 },
    { name: "Manufacturing Operations", slug: "manufacturing-operations", sortOrder: 3 },
    { name: "Document Management", slug: "document-management", sortOrder: 4 },
    { name: "Quality Assurance", slug: "quality-assurance", sortOrder: 5 },
    { name: "HR Technology", slug: "hr-technology", sortOrder: 6 },
  ]);
  const projectTypeIdByName = new Map(projectTypes.map((p) => [p.name, p._id]));
  console.log("Seeded project types");

  // --- Experiences ------------------------------------------------------
  await ExperienceModel.deleteMany({});
  const [experienceProfessional, experienceFreelance, experienceInternship] =
    await ExperienceModel.insertMany([
      {
        companyName: "PT IDS Teknologi Indonesia",
        publicCompanyName: "PT IDS Teknologi Indonesia",
        position: "Full Stack Web Engineer — Enterprise Applications & Integration",
        employmentType: "professional",
        employmentBasis: "Fulltime, Permanent Employee",
        location: "Bogor, West Java",
        startDate: new Date("2025-07-01"),
        isCurrent: true,
        summary:
          "Delivered seven enterprise web projects across four clients in the first year, covering manufacturing, mining, procurement, inventory, production, customs, and digital-document approval, signature, and e-Meterai processes.",
        responsibilities: [
          "Own the full delivery lifecycle: client consultations, requirement gathering, business-process analysis, prototyping, architecture, development, integration, deployment, and production support.",
          "Design modular backend architectures and build enterprise APIs with Node.js, Express.js, TypeScript, Go, and .NET/C#, plus responsive React.js and Angular frontends.",
          "Design relational schemas and optimize SQL queries, database access, and backend workflows for performance, reliability, and data consistency.",
          "Integrate applications with SAP, CEISA, and VIDA, including digital signatures, e-Meterai, and role-based document approval workflows with robust integration error handling.",
          "Containerize and deploy with Docker, GitHub Actions, and GitLab CI/CD to Azure, Linux, on-premise, and client-hosted environments, and manage configuration, troubleshooting, and support.",
        ],
        achievements: [
          "Built a reusable enterprise full-stack template (architecture, auth/RBAC, API handling, logging, integration, deployment foundations) that standardizes setup and accelerates project initialization, onboarding, and delivery.",
          "Mentor and onboard new employees and interns in development practices, architecture standards, deployment workflows, and client business processes.",
        ],
        technologyIds: [
          skillIdByName.get("Node.js"),
          skillIdByName.get("Express.js"),
          skillIdByName.get("TypeScript"),
          skillIdByName.get("Go"),
          skillIdByName.get(".NET"),
          skillIdByName.get("C#"),
          skillIdByName.get("React.js"),
          skillIdByName.get("Angular"),
          skillIdByName.get("SQL Server"),
          skillIdByName.get("Docker"),
          skillIdByName.get("GitHub Actions"),
          skillIdByName.get("GitLab CI/CD"),
          skillIdByName.get("Microsoft Azure"),
          skillIdByName.get("Linux"),
        ],
        sortOrder: 1,
        isPublished: true,
      },
      {
        companyName: "Independent Freelancer",
        publicCompanyName: "Independent Freelancer",
        position: "Technical Consultant & Full Stack Web Engineer",
        employmentType: "freelance",
        location: "South Tangerang, Banten",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-04-30"),
        isCurrent: false,
        summary:
          "Delivered two web-based HR technology applications for business owners and HR stakeholders, covering requirement analysis, database design, full-stack development, deployment, and implementation support.",
        technologyIds: [],
        sortOrder: 2,
        isPublished: true,
      },
      {
        companyName: "PT Amerta Indah Otsuka",
        publicCompanyName: "PT Amerta Indah Otsuka",
        position: "Full Stack Web Developer Internship — Technical Department",
        employmentType: "internship",
        location: "Sukabumi, West Java",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2025-01-31"),
        isCurrent: false,
        summary:
          "Delivered three internal enterprise web applications in a one-year internship using Angular, Node.js, Express.js, Prisma ORM, and SQL Server, working with department heads, operational users, and Japanese expatriate management.",
        technologyIds: [
          skillIdByName.get("Angular"),
          skillIdByName.get("Node.js"),
          skillIdByName.get("Express.js"),
          skillIdByName.get("Prisma ORM"),
          skillIdByName.get("SQL Server"),
        ],
        sortOrder: 3,
        isPublished: true,
      },
    ]);
  console.log("Seeded experiences");

  // --- Projects -----------------------------------------------------
  await ProjectModel.deleteMany({});
  await ProjectModel.insertMany([
    {
      title: "Purchasing System & Supplier Portal",
      slug: "purchasing-system-supplier-portal",
      shortDescription:
        "Web-based purchasing system with procurement transactions, role-based approval flows, document management, and reporting, integrated with SAP.",
      overview:
        "Includes a supplier-facing portal giving vendors transparent, auditable access to transactions, documents, and status, aligned with internal procurement and SAP data.",
      publicClientLabel: "Japanese Multinational Paint Manufacturer",
      industryId: industryIdByName.get("Manufacturing"),
      projectTypeId: projectTypeIdByName.get("Procurement & Purchasing"),
      employmentType: "professional",
      role: "Full Stack Web Engineer",
      relatedExperienceId: experienceProfessional._id,
      technologyIds: [],
      integrationIds: [skillIdByName.get("SAP")],
      visibility: "anonymized",
      status: "published",
      isFeatured: true,
      featuredOrder: 1,
      sortOrder: 1,
      publishedAt: new Date(),
    },
    {
      title: "CEISA Customs Integration",
      slug: "ceisa-customs-integration",
      shortDescription:
        "Customs application covering the full Bea Cukai document lifecycle across three systems (web app, SAP, and CEISA): data retrieval, mapping, preparation, validation, submission, and status monitoring.",
      overview:
        "Includes SAP-connected master-data modules with validation and synchronization to keep web and SAP data consistent.",
      publicClientLabel: "Global Manufacturing Company (Bonded Zone)",
      industryId: industryIdByName.get("Manufacturing"),
      projectTypeId: projectTypeIdByName.get("Customs & Compliance"),
      employmentType: "professional",
      role: "Full Stack Web Engineer",
      relatedExperienceId: experienceProfessional._id,
      technologyIds: [],
      integrationIds: [skillIdByName.get("SAP"), skillIdByName.get("CEISA (Bea Cukai)")],
      visibility: "anonymized",
      status: "published",
      isFeatured: true,
      featuredOrder: 2,
      sortOrder: 2,
      publishedAt: new Date(),
    },
    {
      title: "Purchasing & PO Contract Monitoring",
      slug: "purchasing-po-contract-monitoring",
      shortDescription:
        "Purchasing, PO contract monitoring, transaction tracking, approval, and reporting functionality integrated with SAP.",
      overview:
        "Started as a functional prototype that secured client approval and converted the opportunity into an active project, delivered end-to-end through go-live.",
      publicClientLabel: "Mining-Sector Procurement Client",
      industryId: industryIdByName.get("Mining"),
      projectTypeId: projectTypeIdByName.get("Procurement & Purchasing"),
      employmentType: "professional",
      role: "Full Stack Web Engineer",
      relatedExperienceId: experienceProfessional._id,
      technologyIds: [],
      integrationIds: [skillIdByName.get("SAP")],
      visibility: "anonymized",
      status: "published",
      isFeatured: false,
      sortOrder: 3,
      publishedAt: new Date(),
    },
    {
      title: "Sales, Purchasing, Inventory & Production",
      slug: "sales-purchasing-inventory-production",
      shortDescription:
        "Four interconnected modules covering sales, purchasing, inventory, and production with cross-module transaction flows, dashboards, and approval workflows, integrated with SAP.",
      overview:
        "Designed business-process flows spanning the four modules for a telecommunication and utility manufacturer.",
      publicClientLabel: "Telecommunication & Utility Manufacturer",
      industryId: industryIdByName.get("Manufacturing"),
      projectTypeId: projectTypeIdByName.get("Manufacturing Operations"),
      employmentType: "professional",
      role: "Full Stack Web Engineer",
      relatedExperienceId: experienceProfessional._id,
      technologyIds: [],
      integrationIds: [skillIdByName.get("SAP")],
      visibility: "anonymized",
      status: "published",
      isFeatured: false,
      sortOrder: 4,
      publishedAt: new Date(),
    },
    {
      title: "GoDoc — Technical Document Management",
      slug: "godoc-technical-document-management",
      shortDescription:
        "Centralized document management system improving accessibility, organization, searchability, and access control for technical documents.",
      publicClientLabel: "PT Amerta Indah Otsuka",
      industryId: industryIdByName.get("Manufacturing"),
      projectTypeId: projectTypeIdByName.get("Document Management"),
      employmentType: "internship",
      role: "Full Stack Web Developer Intern",
      relatedExperienceId: experienceInternship._id,
      technologyIds: [
        skillIdByName.get("Angular"),
        skillIdByName.get("Node.js"),
        skillIdByName.get("Express.js"),
        skillIdByName.get("Prisma ORM"),
        skillIdByName.get("SQL Server"),
      ],
      integrationIds: [],
      visibility: "public",
      status: "published",
      isFeatured: false,
      sortOrder: 5,
      publishedAt: new Date(),
    },
    {
      title: "Packaging Label Validation System",
      slug: "packaging-label-validation-system",
      shortDescription:
        "OCR-powered application with multilingual text recognition and a four-stage validation flow to detect packaging errors before mass production.",
      overview:
        "Reduced operational, compliance, and financial risk by catching label errors prior to production runs.",
      publicClientLabel: "PT Amerta Indah Otsuka",
      industryId: industryIdByName.get("Manufacturing"),
      projectTypeId: projectTypeIdByName.get("Quality Assurance"),
      employmentType: "internship",
      role: "Full Stack Web Developer Intern",
      relatedExperienceId: experienceInternship._id,
      technologyIds: [
        skillIdByName.get("Angular"),
        skillIdByName.get("Node.js"),
        skillIdByName.get("Express.js"),
        skillIdByName.get("Prisma ORM"),
        skillIdByName.get("SQL Server"),
      ],
      integrationIds: [],
      visibility: "public",
      status: "published",
      isFeatured: true,
      featuredOrder: 3,
      sortOrder: 6,
      publishedAt: new Date(),
    },
    {
      title: "Halal Quality Assurance Portal",
      slug: "halal-quality-assurance-portal",
      shortDescription:
        "Digitized halal certification and QA workflows for submission, review, approval, and status monitoring.",
      overview: "Improved transparency and traceability across the certification process.",
      publicClientLabel: "PT Amerta Indah Otsuka",
      industryId: industryIdByName.get("Manufacturing"),
      projectTypeId: projectTypeIdByName.get("Quality Assurance"),
      employmentType: "internship",
      role: "Full Stack Web Developer Intern",
      relatedExperienceId: experienceInternship._id,
      technologyIds: [
        skillIdByName.get("Angular"),
        skillIdByName.get("Node.js"),
        skillIdByName.get("Express.js"),
        skillIdByName.get("Prisma ORM"),
        skillIdByName.get("SQL Server"),
      ],
      integrationIds: [],
      visibility: "public",
      status: "published",
      isFeatured: false,
      sortOrder: 7,
      publishedAt: new Date(),
    },
    {
      title: "Human Resources Information System",
      slug: "human-resources-information-system",
      shortDescription:
        "Centralized HRIS covering employee records, attendance, leave, and performance evaluation with role-based workflows for HR, employees, and management.",
      publicClientLabel: "Freelance Client (Confidential)",
      industryId: industryIdByName.get("Human Resources"),
      projectTypeId: projectTypeIdByName.get("HR Technology"),
      employmentType: "freelance",
      role: "Technical Consultant & Full Stack Web Engineer",
      relatedExperienceId: experienceFreelance._id,
      technologyIds: [],
      integrationIds: [],
      visibility: "anonymized",
      status: "published",
      isFeatured: false,
      sortOrder: 8,
      publishedAt: new Date(),
    },
    {
      title: "Applicant Tracking System",
      slug: "applicant-tracking-system",
      shortDescription:
        "Recruitment platform covering job postings, applications, screening, interview scheduling, and candidate pipelines for recruiters, candidates, and management.",
      publicClientLabel: "Freelance Client (Confidential)",
      industryId: industryIdByName.get("Human Resources"),
      projectTypeId: projectTypeIdByName.get("HR Technology"),
      employmentType: "freelance",
      role: "Technical Consultant & Full Stack Web Engineer",
      relatedExperienceId: experienceFreelance._id,
      technologyIds: [],
      integrationIds: [],
      visibility: "anonymized",
      status: "published",
      isFeatured: true,
      featuredOrder: 4,
      sortOrder: 9,
      publishedAt: new Date(),
    },
  ]);
  console.log("Seeded projects");

  // --- Education ------------------------------------------------------
  await EducationModel.deleteMany({});
  await EducationModel.create({
    institution: "IPB University",
    degree: "Applied Bachelor's Degree (D4)",
    fieldOfStudy: "Software Engineering Technology",
    location: "Bogor, West Java",
    startDate: new Date("2021-08-01"),
    endDate: new Date("2025-08-01"),
    gpa: 3.74,
    maximumGpa: 4.0,
    sortOrder: 1,
    isPublished: true,
  });
  console.log("Seeded education");

  // --- Achievements -----------------------------------------------------
  await AchievementModel.deleteMany({});
  await AchievementModel.insertMany([
    {
      title: "1st Place — Logo & Visual Identity Design Competition",
      type: "competition",
      issuer: "HIMAVO Micro IT",
      date: new Date("2022-01-01"),
      sortOrder: 1,
      isPublished: true,
    },
    {
      title: "2nd Place — Business Model Canvas Competition",
      type: "competition",
      issuer: "BKIM IPB",
      date: new Date("2023-01-01"),
      sortOrder: 2,
      isPublished: true,
    },
    {
      title: "3rd Place — Strategic Marketing Competition",
      type: "competition",
      issuer: "CFest UNY",
      date: new Date("2024-01-01"),
      sortOrder: 3,
      isPublished: true,
    },
    {
      title: "Bangkit Academy — Android Developer Track",
      type: "certification",
      issuer: "Bangkit Academy",
      date: new Date("2023-01-01"),
      description:
        "8-month program building and prototyping Android applications with clean architecture and user-centered design.",
      sortOrder: 4,
      isPublished: true,
    },
    {
      title: "BNSP Professional Certification — Software Engineering, Level 6",
      type: "certification",
      issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
      date: new Date("2025-01-01"),
      endDate: new Date("2028-01-01"),
      description: "Valid 2025–2028.",
      sortOrder: 5,
      isPublished: true,
    },
    {
      title: "Project Leader — IT Knowledge 2023",
      type: "leadership",
      issuer: "Campus Technology Conference",
      date: new Date("2023-04-01"),
      endDate: new Date("2023-05-31"),
      description:
        "Led planning, committee coordination, and end-to-end execution of a campus technology conference.",
      sortOrder: 6,
      isPublished: true,
    },
    {
      title: "Web & Digital Team — IT Fest 2022",
      type: "organization",
      issuer: "IT Fest",
      date: new Date("2022-01-01"),
      endDate: new Date("2022-08-31"),
      description: "Developed the event livestreaming, design room, and graphic set.",
      sortOrder: 7,
      isPublished: true,
    },
    {
      title: "Event Leader — Webinar 19",
      type: "organization",
      issuer: "Micro IT Community",
      date: new Date("2022-05-01"),
      endDate: new Date("2023-05-31"),
      description:
        "Organized a virtual knowledge-sharing event and coordinated committee, speakers, and operations.",
      sortOrder: 8,
      isPublished: true,
    },
  ]);
  console.log("Seeded achievements");

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
