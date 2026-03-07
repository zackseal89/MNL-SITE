export interface TeamMember {
  name: string;
  title: string;
  practice: string;
  image: string;
  bio?: string;
  linkedIn?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Mbula Nzuki',
    title: 'Managing Partner, Principal Attorney',
    practice: 'Corporate & Commercial Strategy',
    image: 'https://mnlegal.net/wp-content/uploads/2024/01/Mbula-Nzuki-team.jpg',
  },
  {
    name: 'Sebie Salim',
    title: 'Chief Operations, Strategy & Growth',
    practice: 'Operational Excellence',
    image: 'https://mnlegal.net/wp-content/uploads/2024/01/Sebie-Salim.jpg',
  },
  {
    name: 'Mutundu Chege',
    title: 'Litigation Department, Co-Head',
    practice: 'Dispute Resolution',
    image: 'https://mnlegal.net/wp-content/uploads/2024/01/Mutundu-Chege.jpg',
  },
  {
    name: 'Konstantina Zariou',
    title: 'Of - Counsel',
    practice: 'Legal Advisory',
    image: 'https://mnlegal.net/wp-content/uploads/2026/01/IMG_8790.jpeg',
  },
  {
    name: 'Husna (A.) Mohammed',
    title: 'Senior Associate',
    practice: 'Corporate Law',
    image: 'https://mnlegal.net/wp-content/uploads/2026/03/1771405050567.jpg',
  },
  {
    name: 'Zachary Ongeri',
    title: 'AI & Digital transformation Associate',
    practice: 'Legal Technology',
    image: 'https://mnlegal.net/wp-content/uploads/2026/01/1000053692.jpg',
  },
  {
    name: 'Nour Sheriff',
    title: 'Legal Research Assistant',
    practice: 'Legal Research & Analysis',
    image: 'https://mnlegal.net/wp-content/uploads/2024/01/Nour-Sheriff.jpg',
  },
];
