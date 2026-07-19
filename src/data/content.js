// Single source of truth for all portfolio content.
// Pulled from Darsh Thakkar's resume + existing site.

export const profile = {
  name: 'Darsh Thakkar',
  first: 'Darsh',
  roles: ['ML Engineer', 'AI Systems', 'Robotics', 'Full-Stack'],
  tagline: 'Building at the intersection of AI, computer vision, and robotics.',
  summary:
    'Software and ML engineer building AI systems, voice assistants, and full-stack applications. I work across Python, C++, React, and PyTorch — shipping LLM systems, robotics interfaces, and privacy-focused, offline-first AI tools.',
  location: 'Madison, WI',
  // Drop your photo at public/profile.jpg (or change this path). Falls back to
  // "DT" initials automatically if the file isn't there yet.
  photo: '/profile.jpg',
  email: '5darshthakkar@gmail.com',
  academicEmail: 'dkthakkar@wisc.edu',
  phone: '+1 608-239-5713',
  resume: '/Darsh-Thakkar-Resume.pdf',
  resumeFile: 'Darsh-Thakkar-Resume.pdf',
  socials: {
    github: 'https://github.com/unity-darshthakkar',
    linkedin: 'https://www.linkedin.com/in/darshthakkar99/',
    site: 'https://unity-darshthakkar.github.io/',
  },
}

// Opens Gmail's compose window pre-addressed to Darsh (works when signed into Gmail).
export const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email,
)}&su=${encodeURIComponent('Hello Darsh — reaching out from your portfolio')}`

export const stats = [
  { value: '3', label: 'Internships & research roles' },
  { value: '5+', label: 'Shipped AI / ML projects' },
  { value: '3.4', label: 'GPA · 2× Dean’s List' },
  { value: '2027', label: 'B.S. CS + Data Science' },
]

export const experience = [
  {
    role: 'Undergraduate Research Assistant',
    org: 'People and Robots Lab, UW–Madison',
    location: 'Madison, WI',
    period: 'Feb 2026 — Present',
    current: true,
    points: [
      'Built a user-feedback canvas for a robot programming interface with a Flask backend, enabling real-time message transmission and status visualization.',
      'Implemented status animations and blur effects for the programming workflow, including submit-button behavior and retry-state handling.',
      'Developed React front-end components with status panels, user-satisfaction tracking, and condition switching.',
      'Programmed the Temi robot for text display and scenario fallbacks using Docker and WSL deployment environments.',
    ],
    stack: ['React', 'Flask', 'Python', 'Docker', 'WSL'],
  },
  {
    role: 'AI & Software Engineer Intern',
    org: 'LexLegis AI',
    location: 'Mumbai, India',
    period: 'May 2025 — Jul 2025',
    points: [
      'Developed a fully offline AI legal assistant with chat, OCR, multilingual translation, and semantic search to guarantee data privacy.',
      'Built cross-platform desktop features in C++, Python, and Qt/QML; integrated local LLM inference via llama.cpp and Llama Server.',
      'Implemented RAG architectures (RAG + BM25 + embeddings) for grounded answer retrieval across large document collections.',
    ],
    stack: ['C++', 'Qt/QML', 'llama.cpp', 'RAG', 'OCR'],
  },
  {
    role: 'Software Development Intern',
    org: 'Yodaplus',
    location: 'Mumbai, India',
    period: 'Jun 2024 — Aug 2024',
    points: [
      'Reviewed SQL queries and backend behavior to identify bugs and propose fixes, collaborating with engineers to resolve issues.',
      'Wrote Pandas-based data cleaning and validation scripts to improve data quality for downstream analytics and APIs.',
      'Developed full-stack features using Python, REST APIs, PostgreSQL, and React.',
    ],
    stack: ['Python', 'PostgreSQL', 'REST', 'React', 'Pandas'],
  },
]

export const projects = [
  {
    name: 'Voix',
    subtitle: 'AI Voice Copilot for Windows',
    award: 'CalHacks 12.0',
    year: '2025',
    blurb:
      'A voice operating system that controls Windows apps, generates documents, and orchestrates workflows through natural conversation.',
    points: [
      'On-device STT with Faster-Whisper; reasoning via Groq + Claude; app control through Python COM automation (Word / Excel / Chrome).',
      'Floating desktop widget built with asyncio, SoundDevice, and Silero VAD — plus local meeting recording, transcription, and action-item extraction.',
      'Sub-second response latency while staying fully offline-capable across multi-app orchestration.',
    ],
    tags: ['Faster-Whisper', 'Groq', 'Claude', 'COM Automation', 'asyncio'],
    accent: 'from-cyan-400 to-blue-500',
    featured: true,
  },
  {
    name: 'YouTube Gesture Remote',
    subtitle: 'Computer Vision',
    year: '2024',
    blurb:
      'A real-time, offline gesture controller with hand-pose recognition for playback control and an on-screen HUD.',
    points: [
      'Gesture set for play / pause, volume, full screen, and navigation.',
      'Tuned gesture-to-action mapping for stability under noisy camera input.',
    ],
    tags: ['OpenCV', 'MediaPipe', 'Python'],
    accent: 'from-violet-400 to-fuchsia-500',
    featured: true,
  },
  {
    name: 'RL Agent',
    subtitle: 'Reinforcement Learning',
    year: '2024',
    blurb:
      'Q-Learning and SARSA agents implemented from scratch to explore value-based control and exploration strategies.',
    points: [],
    tags: ['Python', 'RL', 'NumPy'],
    accent: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Climate Trend Prediction',
    subtitle: 'Time-Series Analysis',
    year: '2024',
    blurb:
      'Time-series modeling to surface long-range climate trends from historical data.',
    points: [],
    tags: ['Python', 'Pandas', 'scikit-learn'],
    accent: 'from-amber-400 to-orange-500',
  },
  {
    name: 'LeNet-5 CNN',
    subtitle: 'CIFAR-100 Classification',
    year: '2024',
    blurb:
      'A LeNet-5 convolutional network trained for image classification on CIFAR-100.',
    points: [],
    tags: ['PyTorch', 'CNN', 'CIFAR-100'],
    accent: 'from-rose-400 to-pink-500',
  },
]

export const skills = [
  {
    group: 'Languages',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'SQL', 'R', 'C'],
  },
  {
    group: 'ML / AI',
    items: ['PyTorch', 'scikit-learn', 'OpenCV', 'MediaPipe', 'NLP', 'CNNs', 'Reinforcement Learning'],
  },
  {
    group: 'LLMs / RAG',
    items: ['llama.cpp', 'GGUF', 'Embeddings', 'BM25', 'Tesseract OCR', 'RAG Architectures'],
  },
  {
    group: 'Systems / Web',
    items: ['React', 'Flask', 'Qt/QML', 'REST APIs', 'PostgreSQL', 'SQLite', 'Docker', 'Git', 'asyncio', 'FFmpeg'],
  },
]

export const certifications = [
  {
    name: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'DeepLearning.AI · Stanford University',
    year: 'Feb 2025',
  },
]

export const education = {
  school: 'University of Wisconsin–Madison',
  degree: 'B.S. Computer Science & Data Science',
  detail: 'Expected 2027 · GPA 3.4 · Dean’s List: Fall 2023, Fall 2024',
}

export const involvement = [
  {
    role: 'Founding Father',
    org: 'Sigma Phi Epsilon (β-WI)',
    detail: 'Recruitment, Chaplain / Standards',
    period: 'Oct 2024 — Present',
  },
  {
    role: 'Member',
    org: 'Wisconsin Robotics',
    detail: 'Battle-bot CAD (Onshape)',
    period: 'Sept 2023 — Present',
  },
  {
    role: 'DoE Bronze',
    org: 'Duke of Edinburgh',
    detail: 'Skills, physical, adventure & social service',
    period: 'Jan — Apr 2022',
  },
  {
    role: 'Captain',
    org: 'Student Council',
    detail: '',
    period: 'Aug 2019 — May 2020',
  },
]

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'involvement', label: 'Involvement' },
  { id: 'contact', label: 'Contact' },
]
