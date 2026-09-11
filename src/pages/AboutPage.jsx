function AboutPage() {
  return (
    <div className="page card">
      <h2>About This App</h2>
      <p>
        A todo application for creating, tracking, and completing tasks, built
        as part of the Code the Dream React curriculum.
      </p>
      <h3>Features</h3>
      <ul>
        <li>Create, edit, and complete todos</li>
        <li>Filter todos by status and search by text</li>
        <li>Sort todos by title or creation date</li>
        <li>User authentication with protected pages</li>
      </ul>

      <h3>Built With</h3>
      <ul>
        <li>React</li>
        <li>React Router</li>
        <li>Vite</li>
      </ul>
    </div>
  );
}

export default AboutPage;
