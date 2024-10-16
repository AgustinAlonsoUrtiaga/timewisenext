'use client';
import "../styles/About.css";
import Link from 'next/link';

export default function About() {
  return (
    <div className="about-page">
      <h2 className="title">About Me</h2>

      <div className="about-content">
        <p>
          I see you're checking out my page—how exciting! Let me quickly introduce myself. 
          I'm a systems engineering student who started out as a junior developer at a startup in Buenos Aires, Argentina. 
          There, I worked with <strong>Node.js</strong>, <strong>Next.js</strong>, and <strong>Angular</strong>, 
          all within the <strong>Redux</strong> ecosystem.
        </p>
        <p>
          Currently, I’m working for <strong>Ignitix</strong>, a company based in Vienna, Austria, while living in Germany. 
          In my current role, I primarily use <strong>Next.js</strong> and <strong>Node.js</strong>. 
          I'm well-versed in <strong>Scrum</strong> practices, including daily standups, planning, and retrospectives. 
          I’ve also gained experience creating <strong>Dockerfiles</strong>, managing code with <strong>Git</strong>, 
          and maintaining comprehensive documentation.
        </p>
        <p>
          If you'd like to know more (and trust me, there's plenty more to share), feel free to <Link href="/contact">contact me</Link>.
        </p>
      </div>
    </div>
  );
}