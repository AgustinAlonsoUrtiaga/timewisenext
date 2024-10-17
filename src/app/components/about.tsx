'use client';
import "../styles/About.css";
import Link from 'next/link';

export default function About() {
  return (
    <div className="about-page">
      <h2 className="title">About Me</h2>

      <div className="about-content">
        <p>
          I see you&apos;re checking out my page—how exciting! Let me quickly introduce myself. 
          I&apos;m a systems engineering student who started out as a junior developer at a startup in Buenos Aires, Argentina. 
          There, I worked with <strong>Node.js</strong>, <strong>Next.js</strong>, and <strong>Angular</strong>, 
          all within the <strong>Redux</strong> ecosystem.
        </p>
        <p>
          Currently, I&apos;m working for <strong>Ignitix</strong>, a company based in Vienna, Austria, while living in Germany. 
          In my current role, I primarily use <strong>Next.js</strong> and <strong>Node.js</strong>. 
          I&apos;m well-versed in <strong>Scrum</strong> practices, including daily standups, planning, and retrospectives. 
          I&apos;ve also gained experience creating <strong>Dockerfiles</strong>, managing code with <strong>Git</strong>, 
          and maintaining comprehensive documentation.
        </p>
        <p>
          If you&apos;d like to know more (and trust me, there&apos;s plenty more to share), feel free to <Link href="/contact">contact me</Link>.
        </p>
      </div>

      {/* Nueva sección de habilidades */}
      <div className="skills-section">
        <h3 className="skills-title">My Skills</h3>
        <div className="skills-grid">
          <div className="skill-item">
            <img src="/icons/react.svg" alt="React" />
            <p>React</p>
          </div>
          <div className="skill-item">
            <img src="/icons/angular.svg" alt="Angular" />
            <p>Angular</p>
          </div>
          <div className="skill-item">
            <img src="/icons/nodejs.svg" alt="Node.js" />
            <p>Node.js</p>
          </div>
          <div className="skill-item">
            <img src="/icons/nextjs.svg" alt="Next.js" />
            <p>Next.js</p>
          </div>
          <div className="skill-item">
            <img src="/icons/git.svg" alt="Git" />
            <p>Git</p>
          </div>
          <div className="skill-item">
            <img src="/icons/docker.svg" alt="Docker" />
            <p>Docker</p>
          </div>
          <div className="skill-item">
            <img src="/icons/linux.svg" alt="Linux" />
            <p>Linux</p>
          </div>
          <div className="skill-item">
            <img src="/icons/java.svg" alt="Java" />
            <p>Java</p>
          </div>
          <div className="skill-item">
            <img src="/icons/springboot.svg" alt="SpringBoot" />
            <p>SpringBoot</p>
          </div>
          <div className="skill-item">
            <img src="/icons/postgresql.svg" alt="PostgreSQL" />
            <p>Postgres</p>
          </div>
          <div className="skill-item">
            <img src="/icons/mysql.svg" alt="MySQL" />
            <p>MySQL</p>
          </div>
          <div className="skill-item">
            <img src="/icons/redux.svg" alt="Redux" />
            <p>Redux</p>
          </div>
        </div>
      </div>
    </div>
  );
}