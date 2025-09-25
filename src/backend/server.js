const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// Login endpoint (you already have this)
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'karthick' && password === 'raja@123') {
    res.json({ jwt_token: 'demo-jwt-for-karthick' })
  } else {
    res.status(401).json({ error_msg: "Invalid username or password" })
  }
})

// Profile endpoint
app.get('/profile', (req, res) => {

  res.json({
    profile_details: {
      name: "Karthick Raja",
      profile_image_url: "https://assets.ccbp.in/frontend/react-js/male-avatar-img.png",
      short_bio: "Full Stack Developer with expertise in MERN stack"
    }
  })
})

app.get('/jobs', (req, res) => {
  // Extract filter parameters from query string
  const { 
    employmentType = '', 
    minimumSalary = '', 
    searchInput = '' 
  } = req.query;
  
  console.log('Filter params:', { employmentType, minimumSalary, searchInput });
  
  // Define all jobs
  const allJobs = [
      {
        id: "1",
        title: "Frontend Developer",
        rating: 4.2,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
        location: "Chennai",
        job_description: "We are looking for a Frontend Developer proficient in React.js",
        employment_type: "Full Time",
        package_per_annum: "20 LPA"
      },
      {
        id: "2",
        title: "Backend Developer",
        rating: 4.0,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
        location: "Bangalore",
        job_description: "Looking for Node.js developers with experience in Express",
        employment_type: "Full Time",
        package_per_annum: "25 LPA"
      },
      {
        id: "3",
        title: "UI/UX Designer",
        rating: 4.5,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
        location: "Remote",
        job_description: "Create user interfaces and experiences for our products",
        employment_type: "Freelance",
        package_per_annum: "18 LPA"
      },
      {
        id: "4",
        title: "Full Stack Developer",
        rating: 4.7,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
        location: "Hyderabad",
        job_description: "Experienced full stack developer with knowledge of MERN stack",
        employment_type: "Full Time",
        package_per_annum: "30 LPA"
      },
      {
        id: "5",
        title: "DevOps Engineer",
        rating: 4.1,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/microsoft-img.png",
        location: "Pune",
        job_description: "Looking for DevOps engineers to build and maintain CI/CD pipelines",
        employment_type: "Full Time",
        package_per_annum: "28 LPA"
      },
      {
        id: "6",
        title: "Data Scientist",
        rating: 4.3,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
        location: "Bangalore",
        job_description: "Join our data science team to build ML models and analyze big data",
        employment_type: "Full Time",
        package_per_annum: "32 LPA"
      },
      {
        id: "7",
        title: "Mobile App Developer",
        rating: 4.0,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/swiggy-img.png",
        location: "Chennai",
        job_description: "Looking for React Native developers to build cross-platform apps",
        employment_type: "Full Time",
        package_per_annum: "22 LPA"
      },
      {
        id: "8",
        title: "Technical Content Writer",
        rating: 3.9,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
        location: "Remote",
        job_description: "Create technical documentation and tutorials for our developer platform",
        employment_type: "Part Time",
        package_per_annum: "12 LPA"
      },
      {
        id: "9",
        title: "QA Engineer",
        rating: 4.1,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/flipkart-img.png",
        location: "Bangalore",
        job_description: "Join our QA team to ensure product quality through automated testing",
        employment_type: "Full Time",
        package_per_annum: "18 LPA"
      },
      {
        id: "10",
        title: "Product Manager",
        rating: 4.6,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/zomato-img.png",
        location: "Gurgaon",
        job_description: "Lead product development and work with cross-functional teams",
        employment_type: "Full Time",
        package_per_annum: "35 LPA"
      },
      {
        id: "11",
        title: "Cybersecurity Analyst",
        rating: 4.2,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/microsoft-img.png",
        location: "Hyderabad",
        job_description: "Help secure our infrastructure and applications from threats",
        employment_type: "Full Time",
        package_per_annum: "26 LPA"
      },
      {
        id: "12",
        title: "Blockchain Developer",
        rating: 4.4,
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
        location: "Bangalore",
        job_description: "Develop blockchain solutions using Ethereum and Solidity",
        employment_type: "Contract",
        package_per_annum: "40 LPA"
      }
    ];

    // Filter jobs based on criteria
    let filteredJobs = [...allJobs];
    
    // Filter by employment type (comma-separated values)
    if (employmentType) {
      const employmentTypes = employmentType.split(',');
      filteredJobs = filteredJobs.filter(job => 
        employmentTypes.some(type => 
          job.employment_type.toUpperCase().replace(/\s+/g, '') === type
        )
      );
    }
    
    // Filter by minimum salary
    if (minimumSalary) {
      // minimumSalary is expected to be a number like 10, 20, 30, 40 (for LPA)
      const minPackage = parseInt(minimumSalary, 10);
      console.log('Minimum salary filter:', minPackage, 'LPA');
      
      filteredJobs = filteredJobs.filter(job => {
        // Extract the number part from strings like "20 LPA"
        const jobPackage = parseInt(job.package_per_annum.split(' ')[0], 10);
        console.log(`Job: ${job.title}, Salary: ${jobPackage} LPA, Passes filter: ${jobPackage >= minPackage}`);
        return jobPackage >= minPackage;
      });
    }
    
    // Filter by search input
    if (searchInput) {
      const searchTerm = searchInput.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) || 
        job.job_description.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      jobs: filteredJobs,
      total: filteredJobs.length
    });
})

// Job details endpoint
app.get('/jobs/:id', (req, res) => {
  const jobId = req.params.id
  
  // Define job details based on ID
  const jobDetailsMap = {
    "1": {
      job_details: {
        id: "1",
        title: "Frontend Developer",
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
        company_website_url: "https://www.facebook.com/",
        rating: 4.2,
        location: "Chennai",
        package_per_annum: "20 LPA",
        job_description: "Meta is seeking a talented Frontend Developer to join our team. You will be responsible for developing and implementing user interface components using React.js and related technologies. The ideal candidate should have experience with modern JavaScript frameworks and a strong understanding of web design principles.",
        skills: [
          {
            name: "HTML",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
          },
          {
            name: "CSS",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
          },
          {
            name: "JavaScript",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
          },
          {
            name: "React",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
          }
        ],
        life_at_company: {
          description: "We have a great work culture with flexible hours and remote options. Our team is collaborative and supportive, with regular team events and professional development opportunities.",
          image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/life-at-company-img.png"
        },
        employment_type: "Full Time"
      }
    },
    "2": {
      job_details: {
        id: "2",
        title: "Backend Developer",
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
        company_website_url: "https://www.google.com/",
        rating: 4.0,
        location: "Bangalore",
        package_per_annum: "25 LPA",
        job_description: "Google is looking for Node.js developers with experience in Express. You will design and implement scalable APIs and services, working with databases and cloud infrastructure.",
        skills: [
          {
            name: "Node.js",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/nodejs-img.png"
          },
          {
            name: "Express",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/express-img.png"
          },
          {
            name: "MongoDB",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/mongodb-img.png"
          },
          {
            name: "REST API",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/restapi-img.png"
          }
        ],
        life_at_company: {
          description: "At Google, we believe in innovation and collaboration. We offer a dynamic work environment with various perks, learning opportunities, and the chance to work on projects that impact millions of users.",
          image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/life-at-company-img.png"
        },
        employment_type: "Full Time"
      }
    },
    "3": {
      job_details: {
        id: "3",
        title: "UI/UX Designer",
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
        company_website_url: "https://www.netflix.com/",
        rating: 4.5,
        location: "Remote",
        package_per_annum: "18 LPA",
        job_description: "Create user interfaces and experiences for our products. You will work closely with product managers and developers to translate business requirements into engaging designs.",
        skills: [
          {
            name: "Figma",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/figma-img.png"
          },
          {
            name: "Adobe XD",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/adobe-xd-img.png"
          },
          {
            name: "Sketch",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/sketch-img.png"
          },
          {
            name: "UX Research",
            image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/ux-research-img.png"
          }
        ],
        life_at_company: {
          description: "Netflix values creativity and innovation. We have a flexible work environment with opportunities to work remotely. Our design team collaborates across multiple disciplines.",
          image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/life-at-company-img.png"
        },
        employment_type: "Freelance"
      }
    }
  }
  
  // Default job details for IDs that don't have specific data
  const defaultJobDetails = {
    job_details: {
      id: jobId,
      title: "Software Developer",
      company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
      company_website_url: "https://www.amazon.com/",
      rating: 4.1,
      location: "Hyderabad",
      package_per_annum: "24 LPA",
      job_description: "We're looking for passionate software developers to join our team and help build innovative solutions.",
      skills: [
        {
          name: "Java",
          image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/java-img.png"
        },
        {
          name: "Python",
          image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png"
        },
        {
          name: "AWS",
          image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png"
        }
      ],
      life_at_company: {
        description: "We offer a great work environment with opportunities for growth and learning.",
        image_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/life-at-company-img.png"
      },
      employment_type: "Full Time"
    },
    similar_jobs: [
      {
        id: "2",
        title: "Frontend Developer",
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
        location: "Hyderabad",
        rating: 4.0,
        job_description: "Google is looking for Frontend Developers with React experience...",
        employment_type: "Full Time"
      },
      {
        id: "3",
        title: "Frontend Engineer",
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
        location: "Bangalore",
        rating: 4.1,
        job_description: "Amazon is hiring Frontend Engineers with React experience...",
        employment_type: "Full Time"
      }
    ]
  }
  
  // Return job details for the requested ID or default if not found
  const jobDetails = jobDetailsMap[jobId] || defaultJobDetails
  
  // Add similar jobs to all responses
  if (!jobDetails.similar_jobs) {
    jobDetails.similar_jobs = [
      {
        id: String(Math.max(1, parseInt(jobId) - 1)),
        title: "Similar Developer Role",
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
        location: "Hyderabad",
        rating: 4.0,
        job_description: "Similar position with comparable skills and experience requirements.",
        employment_type: "Full Time"
      },
      {
        id: String(parseInt(jobId) + 1),
        title: "Related Technical Position",
        company_logo_url: "https://assets.ccbp.in/frontend/react-js/jobby-app/amazon-img.png",
        location: "Bangalore",
        rating: 4.1,
        job_description: "Another opportunity in the same field with similar requirements.",
        employment_type: "Full Time"
      }
    ]
  }
  
  res.json(jobDetails)
})

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000')
})