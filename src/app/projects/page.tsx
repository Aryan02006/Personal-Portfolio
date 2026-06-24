'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import ProjectCard from '@/components/project/ProjectCard';
import usePageLoading from '@/hooks/usePageLoading';
import Breadcrumb from '@/components/ui/breadcrumb';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FadeInWhenVisible = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Extended projects data (includes all projects from home page plus more)
const allProjects = [
  {
    id: 'normalizerpro',
    title: 'Normalizer-Pro | AI-Native Database Schema Automation Platform',
    description: 'A production-grade AI-native platform that transforms unstructured data and product ideas into fully normalized relational database schemas, dramatically reducing backend development time and design complexity.',
    image: '/NormalizerPro.png',
    tags: ['AI Platform', 'Database Design', 'Schema Automation', 'SQL', 'React', 'Flask', 'TypeScript', 'RAG-like Systems', 'Developer Tools', 'SaaS'],
    liveUrl: 'https://normalizer-pro.vercel.app/',
    featured: true,
    category: 'AI / Developer Tooling Platform',
  },
  {
    id: 'smartmess',
    title: 'SmartMess | AI-Ready Mess Automation & Management Platform',
    description: 'A modern SaaS-based mess management system that automates meal planning, subscription handling, and billing workflows. Features role-based dashboards, real-time data tracking, and a responsive UI, reducing manual overhead and improving operational efficiency for hostels and institutions.',
    image: '/smartmess.png',
    tags: ['SaaS', 'Full Stack', 'React', 'Node.js', 'MongoDB', 'Role-Based Access', 'Dashboard', 'Automation'],
    liveUrl: 'https://smart-mess-blond.vercel.app/',
    featured: true,
    category: 'SaaS / Management Platform',
  },
  {
    id: 'insightflow',
    title: 'InsightFlow – AI-Powered Data Analysis Platform',
    description: 'An enterprise-grade AI-powered data analytics platform that enables non-technical users to analyze datasets through natural language queries, automated visualizations, and intelligent insights. Built with Next.js 16, Google Gemini AI, and LIDA-inspired architecture (Microsoft Research), the platform features 8+ interactive chart types with AI-powered chart recommendations, forecasting, anomaly detection, and Redis caching for optimal performance. Features include drag-and-drop file upload supporting CSV, Excel, JSON, and TSV formats, natural language query processing using Google Gemini API with RAG architecture, AI-powered chart recommendations suggesting optimal visualizations for data, 8+ interactive chart types (line, bar, scatter, heatmap, sankey, funnel) with Recharts and Nivo, real-time trend forecasting and anomaly detection with alerts, LIDA-inspired architecture for intelligent data summarization, multi-API key load balancing with circuit breaker pattern supporting 1000+ daily requests, Redis caching (Upstash) for 10x faster dataset loading, Supabase PostgreSQL with Row-Level Security for multi-user support, and dashboard sharing with export functionality (PNG/PDF/CSV/Excel).',
    image: '/insight.png',
    tags: ['Next.js 16', 'Google Gemini AI', 'Supabase', 'Redis', 'Upstash', 'LIDA Architecture', 'RAG', 'TypeScript', 'Recharts', 'Nivo', 'Data Analytics', 'BI Platform'],
    liveUrl: 'https://insight-flow-sandy.vercel.app/',
    featured: true,
    category: 'AI / Data Analytics',
  },
  {
    id: 'startupops',
    title: 'StartupOps – AI-Powered Startup Management Platform',
    description: 'A next-generation AI-powered operating system for startups that transforms how founders launch, manage, and scale their businesses through intelligent automation, predictive analytics, and real-time strategic insights.',
    image: '/StartupOps.png',
    tags: ['Next.js 16', 'Google Gemini AI', 'Supabase', 'Redis', 'Upstash', 'RAG', 'TypeScript', 'Startup Tools', 'AI SaaS', 'Analytics', 'Automation'],
    liveUrl: 'https://startupops.vercel.app/',
    featured: true,
    category: 'AI / SaaS Platform',
  },
  // {
  //   id: 'ootd',
  //   title: 'OOTD – AI-Powered Fashion Stylist',
  //   description: 'A comprehensive AI-powered fashion platform that analyzes outfits, generates style recommendations, and creates personalized fashion advice using Google Gemini AI. Features include advanced outfit image analysis with style scoring, AI image generation with multiple service fallbacks, secure user authentication with Clerk, professional image management via Cloudinary, interactive questionnaires with dynamic AI-generated questions, PDF export capabilities, and responsive design with dark/light mode support.',
  //   image: '/ootd.png',
  //   tags: ['Next.js 15', 'Google Gemini AI', 'Clerk', 'Supabase', 'Cloudinary', 'Hugging Face', 'TypeScript', 'Tailwind CSS'],
  //   liveUrl: 'https://ootd.vercel.app/',
  //   featured: true,
  //   category: 'AI',
  // },
  {
    id: 'homely',
    title: 'Homely – Full-Stack Food Delivery Platform',
    description: 'A comprehensive full-stack food delivery platform enabling customers to order from local sellers, track deliveries, and analyze nutrition, with robust admin and seller dashboards. Features include customer, seller, and delivery partner roles with secure authentication, real-time order tracking and chat using WebSockets, seller dashboard for menu, order, and payment management, Cloudinary integration for image uploads and optimization, advanced Nutrition Analyzer powered by Google Gemini AI, interactive, animated UI with Framer Motion and Shadcn UI, mobile responsive and accessible design, RESTful API for robust backend operations, payment and refund management for sellers and customers, and admin analytics and reporting dashboard.',
    image: '/homely.png',
    tags: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Cloudinary', 'WebSockets', 'Framer Motion', 'Shadcn UI', 'Google Gemini AI'],
    liveUrl: 'https://homely-frontend-opal.vercel.app',
    featured: true,
    category: 'Full Stack',
  },
  {
    id: 'studybuddy',
    title: 'StudyBuddy – AI-Powered Study Management',
    description: 'A comprehensive AI-powered study management application that helps students organize their learning with intelligent flashcards, adaptive quizzes, smart notes, and comprehensive analytics using Google Gemini AI. Features include smart notes management with rich text editing, interactive flashcards with spaced repetition algorithms, adaptive quizzes with AI-generated questions and multiple model fallbacks, real-time analytics dashboard with study streak tracking, modern responsive design with dark/light mode toggle, RESTful API architecture with Django REST Framework, JWT authentication with automatic token refresh, and production deployment on Vercel and Render.',
    image: '/sb.png',
    tags: ['Django 5.0.1', 'React 18', 'Google Gemini AI', 'PostgreSQL', 'JWT', 'Tailwind CSS', 'Recharts', 'Vite'],
    liveUrl: 'https://studybuddy-frontend-plum.vercel.app/',
    featured: true,
    category: 'AI',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website – Next.js Animated Portfolio',
    description: 'A modern, fully animated portfolio built using Next.js, showcasing projects, skills, and contact info, with smooth transitions and a professional UI. Features include fully responsive and modern UI, smooth animations using Framer Motion, integrated contact form with EmailJS, projects section with live links, and optimization for fast performance & SEO.',
    image: '/portfolio.png',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'EmailJS'],
    liveUrl: 'https://aryan-webdev.vercel.app/',
    featured: false,
    category: 'Web App',
  },
  {
    id: 'digital-evidence-viewer',
    title: 'Digital Evidence Metadata Viewer',
    description: 'A client-side digital forensics tool for securely analyzing files, extracting metadata, generating cryptographic hashes, and creating forensic reports - all without sending any data to a server. Features include secure client-side processing with no data uploads to servers, user authentication with Clerk, comprehensive file analysis (metadata, hashes, file signatures), case management for organizing multiple analyses, professional PDF report generation, and local browser storage using IndexedDB.',
    image: '/df.png',
    tags: ['Next.js', 'Clerk', 'TailwindCSS', 'Web Crypto API', 'ExifReader', 'jsPDF', 'IndexedDB'],
    liveUrl: 'https://df-project-nine.vercel.app',
    featured: true,
    category: 'Digital Forensics',
  }
];

// Extract unique categories and tags
const categories = ['All', ...Array.from(new Set(allProjects.map(project => project.category)))];
const allTags = Array.from(new Set(allProjects.flatMap(project => project.tags)));

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Use the page loading hook
  usePageLoading(isLoading, 'binary');

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <Breadcrumb />

        {/* Header */}
        <FadeInWhenVisible>
          <div className="mb-12">
            <Link
              href="/"
              className="project-link flex items-center text-accent mb-6 text-sm hover:text-accent-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              My Projects
            </h1>

            <p className="text-muted-foreground max-w-2xl">
              Explore my full portfolio of projects spanning web applications, mobile development,
              AI integrations, and more. Each project represents a unique challenge and solution.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Projects Display */}
        <FadeInWhenVisible>
          <div className="relative py-10">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 z-0 rounded-xl"></div>

            <div className="relative z-10">
              <motion.div
                className="flex flex-wrap gap-8 items-start justify-center"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {allProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="project-card-wrapper w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.5
                      }
                    }}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      tags={project.tags}
                      liveUrl={project.liveUrl}
                      featured={project.featured}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Back to Top */}
        <div className="text-center mt-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3 text-sm tracking-wider uppercase font-medium hover:bg-primary/5 transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
} 