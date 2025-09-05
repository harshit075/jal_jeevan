import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Users, BookUser } from "lucide-react";

const teamMembers = [
  {
    name: "Harshit Borana",
    role: "Team Lead",
    avatar: "/images/team-Harshit.jpeg",
  },
  {
    name: "Parth Sharma",
    role: "Co-Lead",
    avatar: "/images/team-bikram-singh.jpg",
  },
  {
    name: "Nitin Purohit",
    role: "Member",
    avatar: "/images/team-priya-das.jpg",
  },
  {
    name: "Snigdha Gupta",
    role: "Member",
    avatar: "/images/team-rohan-gupta.jpg",
  },
  {
    name: "Umang Pahuja",
    role: "Member",
    avatar: "/images/team-sameer-khan.jpg",
  },
  {
    name: "Mohit Joshi",
    role: "Member",
    avatar: "/images/team-anjali-desai.jpg",
  }
];

const mentors = [
  {
    name: "Dr. Mayank Patel",
    role: "HOD CSE",
    avatar: "/images/mentor-rajesh-kumar.jpg",
  },
  {
    name: "Prof. ABC",
    role: "Environmental Scientist",
    avatar: "/images/mentor-meena-kumari.jpg",
  },
  {
    name: "Mr. ABC",
    role: "Social Entrepreneurship Mentor",
    avatar: "/images/mentor-vijay-thapa.jpg",
  }
];


export default function AboutPage() {
  return (
    <div className="space-y-12">
      <Card className="overflow-hidden shadow-lg">
        <div className="relative h-64 w-full">
            <Image 
                src="/images/mission-hero.png"
                alt="A lush green landscape in NorthEast India during monsoon."
                fill
                style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-8">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-white">Our Mission</h1>
                <p className="mt-2 max-w-3xl text-lg text-white/90">
                    To empower communities with the knowledge and tools to ensure access to safe drinking water and promote public health, especially in regions vulnerable to waterborne diseases.
                </p>
            </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-3xl">Meet the Team</CardTitle>
          </div>
          <CardDescription className="text-base pt-2">
            We are a dedicated team of six public health experts, engineers, and community organizers passionate about making a difference.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 border-4 border-primary/20 transition-transform hover:scale-105">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <BookUser className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="font-headline text-3xl">Our Mentors</CardTitle>
          </div>
          <CardDescription className="text-base pt-2">
            We are grateful for the guidance and support of our experienced mentors.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <div key={mentor.name} className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 border-4 border-accent/20 transition-transform hover:scale-105">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold">{mentor.name}</h3>
              <p className="text-accent">{mentor.role}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
